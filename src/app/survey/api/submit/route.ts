import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// We use a service role client here because this route runs on the server.
// IMPORTANT: you MUST use the service role key here, NOT the anon key.
// Put it in .env.local as NEXT_PRIVATE_SUPABASE_SERVICE_KEY and NEVER expose it to the browser.
function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const serviceKey = process.env.NEXT_PRIVATE_SUPABASE_SERVICE_KEY as string;
  return createClient(url, serviceKey);
}

// helper: basic "is this an email" check
function looksLikeEmail(str: string) {
  return /\S+@\S+\.\S+/.test(str);
}

// helper: basic "is this a phone" guess
function looksLikePhone(str: string) {
  return /\d{3,}/.test(str.replace(/\D/g, ""));
}

// POST /survey/api/submit
export async function POST(req: Request) {
  try {
    const supabase = getServiceClient();

    const body = await req.json();
    const {
      businessRef, // business slug or id passed from client
      rating,
      comment,
      name,
      contact,
    } = body ?? {};

    // For now, assume businessRef is literally the business_id UUID in businesses table.
    const business_id = businessRef;

    if (!business_id) {
      return NextResponse.json(
        { error: "Missing business." },
        { status: 400 }
      );
    }

    // 1. Find or create customer in public.customers
    // We try to match by email or phone if provided, else create anonymous.
    let customer_id: string | null = null;

    if (contact && contact.trim() !== "") {
      const isEmail = looksLikeEmail(contact);
      const isPhone = looksLikePhone(contact);

      // try to find existing
      let existing;
      if (isEmail) {
        const { data } = await supabase
          .from("customers")
          .select("id")
          .eq("email", contact.toLowerCase())
          .limit(1)
          .single();
        existing = data;
      } else if (isPhone) {
        const justDigits = contact.replace(/\D/g, "");
        const { data } = await supabase
          .from("customers")
          .select("id")
          .eq("phone", justDigits)
          .limit(1)
          .single();
        existing = data;
      }

      if (existing && existing.id) {
        customer_id = existing.id;
      } else {
        // create
        const cleanPhone = isPhone ? contact.replace(/\D/g, "") : null;
        const cleanEmail = isEmail ? contact.toLowerCase() : null;

        const { data: insertedCustomer, error: insertCustErr } =
          await supabase
            .from("customers")
            .insert([
              {
                name: name || null,
                email: cleanEmail,
                phone: cleanPhone,
              },
            ])
            .select("id")
            .single();

        if (insertCustErr) {
          console.error(insertCustErr);
        } else if (insertedCustomer?.id) {
          customer_id = insertedCustomer.id;
        }
      }
    } else {
      // No contact given, anonymous but still we could create a row if we wanted.
      // For now we won't create a blank customer row unless you want 100% traceability.
      customer_id = null;
    }

    // 2. Insert survey_responses (feedback / rating)
    const { error: surveyErr, data: surveyData } = await supabase
      .from("survey_responses")
      .insert([
        {
          business_id,
          customer_id,
          rating,
          comment,
        },
      ])
      .select("id, created_at")
      .single();

    if (surveyErr) {
      console.error("survey_responses insert error:", surveyErr);
      // We don't bail here because we can still proceed with reward capture
    }

    // 3. Upsert followers (customer auto-follows this business)
    // Only do this if we actually have a customer_id.
    if (customer_id) {
      const { error: followerErr } = await supabase
        .from("followers")
        .upsert(
          [
            {
              business_id,
              customer_id,
              source: "survey",
            },
          ],
          {
            onConflict: "business_id,customer_id",
            ignoreDuplicates: true,
          }
        );

      if (followerErr) {
        console.error("followers upsert error:", followerErr);
      }
    }

    // 4. Create reward_claims entry (this powers the /thanks screen)
    // We generate a simple code like "TP-3914". In real life you'd want unique per-claim.
    const code = generateShortCode();
    const reward_text = "10% OFF your next order TODAY";

    // default expires_at: now + 10 minutes
    const expires_at = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    const { data: rewardRow, error: rewardErr } = await supabase
      .from("reward_claims")
      .insert([
        {
          business_id,
          customer_id,
          reward_text,
          code,
          expires_at,
        },
      ])
      .select("id")
      .single();

    if (rewardErr) {
      console.error("reward_claims insert error:", rewardErr);
      return NextResponse.json(
        { error: "Could not create reward." },
        { status: 500 }
      );
    }

    // Success: tell the browser what reward_claim row we just created
    return NextResponse.json(
      {
        rewardClaimId: rewardRow?.id,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("submit survey route error:", err);
    return NextResponse.json(
      { error: "Unhandled server error." },
      { status: 500 }
    );
  }
}

// helper to generate a short readable reward code
function generateShortCode() {
  // ex: "TP-3914"
  const prefix = "LD"; // you can swap for business initials later
  const rand = Math.floor(1000 + Math.random() * 9000); // 4-digit
  return `${prefix}-${rand}`;
}
