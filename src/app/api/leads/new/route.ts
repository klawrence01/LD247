import { NextResponse } from "next/server";
import QRCode from "qrcode";

// POST /api/leads/new
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // whatever you’re sending from the form
    const {
      name,
      email,
      phone,
      city,
      notes,
    }: {
      name?: string;
      email?: string;
      phone?: string;
      city?: string;
      notes?: string;
    } = body || {};

    // maybe create a QR payload (you were already importing qrcode)
    const qrPayload = JSON.stringify({
      name,
      email,
      city,
    });

    const qrDataUrl = await QRCode.toDataURL(qrPayload);

    // 🚫 no nodemailer right now
    // if you later install it, wrap that here
    // if (process.env.SMTP_HOST) {
    //   const transporter = nodemailer.createTransport({ ... });
    //   await transporter.sendMail({ ... });
    // }

    return NextResponse.json(
      {
        ok: true,
        message: "Lead captured.",
        qr: qrDataUrl,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("POST /api/leads/new error", err);
    return NextResponse.json(
      { ok: false, message: "Failed to create lead." },
      { status: 500 }
    );
  }
}
