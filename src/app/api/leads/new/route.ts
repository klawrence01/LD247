// src/app/api/leads/new/route.ts

import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/utils/supabase/server";
import QRCode from "qrcode";
// We'll include nodemailer, but you can comment out the email block until creds are set.
import nodemailer from "nodemailer";

/**
 * Map a city to its coverage region (county / borough).
 * This drives visibility in search and rep region reporting.
 */
function getRegionTagForCity(city: string) {
  const map: { [key: string]: string } = {
    // New Haven County cluster
    "New Haven": "New Haven County",
    "Meriden": "New Haven County",
    "Hamden": "New Haven County",
    "Wallingford": "New Haven County",
    "West Haven": "New Haven County",
    "East Haven": "New Haven County",
    "North Haven": "New Haven County",
    "Milford": "New Haven County",

    // Hartford County cluster
    "Hartford": "Hartford County",
    "East Hartford": "Hartford County",
    "West Hartford": "Hartford County",
    "Newington": "Hartford County",
    "Wethersfield": "Hartford County",
    "Bloomfield": "Hartford County",

    // Fairfield County cluster
    "Bridgeport": "Fairfield County",
    "Fairfield": "Fairfield County",
    "Stratford": "Fairfield County",
    "Trumbull": "Fairfield County",
    "Shelton": "Fairfield County",

    // NYC boroughs (each borough is its own region)
    "Brooklyn": "Brooklyn",
    "Queens": "Queens",
    "Bronx": "Bronx",
    "Manhattan": "Manhattan",
    "Staten Island": "Staten Island",
  };

  return map[city] ?? city;
}

export async function POST(request: Request) {
  try {
    // 1. read body from the form submission
    const body = await request.json();

    const {
      rep_id,
      business_name,
      owner_name,
      email,
      phone,
      city,
      state,
    } = body;

    // 2. compute region tag from city
    const region_tag = getRegionTagForCity(city);

    // 3. insert into vendor_leads
    const supabase = createSupabaseServer();
    const { data, error } = await supabase
      .from("vendor_leads")
      .insert({
        rep_id,
        business_name,
        owner_name,
        email,
        phone,
        city,
        state,
        region_tag,
        status: "new",
      })
      .select("id, region_tag, owner_name, email")
      .single();

    if (error) {
      console.error("Insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 4. build their setup link using the lead ID
    // this is where the vendor will finish onboarding
    const setupLink = `https://localdeals247.com/vendor/lead/${data.id}`;

    // 5. generate a QR code (Data URL) that points to their setup link
    const qrDataUrl = await QRCode.toDataURL(setupLink);

    // 6. send welcome/setup email (can be commented out if not ready yet)
    // To enable this, you need two env vars in your Next.js env:
    // MAIL_USER=your_email_username
    // MAIL_PASS=your_email_password_or_app_password
    //
    // Then uncomment below.

    /*
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Local Deals 24/7" <no-reply@localdeals247.com>`,
      to: data.email,
      subject: "Your Local Deals 24/7 Setup Link",
      html: `
        <p>Hi ${data.owner_name},</p>

        <p>Thanks for speaking with Local Deals 24/7.</p>

        <p>We just created your starter page. You're now in our 30-day promotional period, where most local businesses see 30–90% more activity — often turning their slowest days into their busiest — without spending thousands on ads.</p>

        <p><strong>Finish your setup here:</strong><br/>
        <a href="${setupLink}">${setupLink}</a></p>

        <p>Or scan this QR code any time:</p>
        <img src="${qrDataUrl}" alt="QR Code" />

        <p>After 30 days, you’ll get a summary of your results and you’ll be able to keep going for either $49/mo (self-managed) or $99/mo (done-for-you).</p>

        <p>Welcome to Local Deals 24/7 — Empowering Local Heroes.</p>
      `,
    });
    */

    // 7. respond back to the browser.
    // we include qrDataUrl so the rep screen can show it right away.
    return NextResponse.json({
      lead_id: data.id,
      region_tag: data.region_tag,
      qr: qrDataUrl,
      setup_link: setupLink,
      message: "Lead saved. QR generated.",
    });
  } catch (err: any) {
    console.error("Route error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
