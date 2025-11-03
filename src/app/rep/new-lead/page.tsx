"use client";

import { useState } from "react";

/**
 * Region inference: matches a city to the marketing region / county.
 * This is only for preview in the form. The final write happens in the API.
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

    // NYC boroughs
    "Brooklyn": "Brooklyn",
    "Queens": "Queens",
    "Bronx": "Bronx",
    "Manhattan": "Manhattan",
    "Staten Island": "Staten Island",
  };

  return map[city] ?? city;
}

/**
 * Calls our API route to create the lead.
 * The route will:
 *  - insert vendor_leads row
 *  - return { lead_id, region_tag, qr, setup_link, message }
 */
async function submitLead(formData: {
  rep_id: string;
  business_name: string;
  owner_name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
}) {
  const res = await fetch("/api/leads/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    throw new Error("Failed to create lead");
  }

  return res.json();
}

export default function NewLeadPage() {
  // form fields
  const [repId, setRepId] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [stateVal, setStateVal] = useState("Connecticut");

  // UI state
  const [submitting, setSubmitting] = useState(false);

  // results from API after save
  const [resultMsg, setResultMsg] = useState<string | null>(null);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [regionTagPreview, setRegionTagPreview] = useState<string>("");

  // new: from API response
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [setupLink, setSetupLink] = useState<string | null>(null);

  function handleCityChange(val: string) {
    setCity(val);
    setRegionTagPreview(getRegionTagForCity(val));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setResultMsg(null);

    try {
      const payload = {
        rep_id: repId,
        business_name: businessName,
        owner_name: ownerName,
        email,
        phone,
        city,
        state: stateVal,
      };

      const data = await submitLead(payload);

      // we expect: { lead_id, region_tag, qr, setup_link, message }
      setLeadId(data.lead_id || null);
      setRegionTagPreview(data.region_tag || regionTagPreview);
      setQrDataUrl(data.qr || null);
      setSetupLink(data.setup_link || null);
      setResultMsg(data.message || "Lead saved. QR code is next.");
    } catch (err: any) {
      console.error(err);
      setResultMsg("There was a problem saving this lead.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        New Business Lead
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        Stand with the owner, get their info, hit Save. We’ll generate their page,
        show them a QR they can scan right now, and email their setup link.
      </p>

      {/* FORM CARD */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-gray-200 bg-white shadow-sm p-4"
      >
        {/* Rep ID */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Your Rep ID
          </label>
          <input
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            placeholder="REP001 or UUU.12345"
            value={repId}
            onChange={(e) => setRepId(e.target.value)}
            required
          />
          <p className="text-[11px] text-gray-500 mt-1">
            This ties the business to you for follow-up and commission.
          </p>
        </div>

        {/* Business Name */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Business Name
          </label>
          <input
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            placeholder="Sizemore Auto Parts"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
          />
        </div>

        {/* Owner Name */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Owner / Decision Maker
          </label>
          <input
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            placeholder="Henry Hicks"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Email (Setup Link Will Be Sent Here)
          </label>
          <input
            type="email"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            placeholder="owner@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <p className="text-[11px] text-gray-500 mt-1">
            We email them their dashboard login link and onboarding steps.
          </p>
        </div>

        {/* Phone (optional) */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Phone (optional)
          </label>
          <input
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            placeholder="(203) 555-1234"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <p className="text-[11px] text-gray-500 mt-1">
            Helps the system remind them when their trial is ending.
          </p>
        </div>

        {/* City / State */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="Meriden"
              value={city}
              onChange={(e) => handleCityChange(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              State
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="CT"
              value={stateVal}
              onChange={(e) => setStateVal(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Region Preview */}
        <div className="text-[11px] text-gray-600 -mt-2">
          Region Tag (auto):{" "}
          <span className="font-medium text-gray-900">
            {regionTagPreview || "—"}
          </span>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-orange-600 text-white font-semibold text-sm py-2 hover:bg-orange-700 disabled:opacity-50"
        >
          {submitting ? "Saving..." : "Save Lead"}
        </button>
      </form>

      {/* RESULT CARD */}
      {resultMsg && (
        <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-800">
          <div className="font-semibold mb-1">{resultMsg}</div>

          {/* lead info */}
          {leadId && (
            <div className="text-xs text-gray-700 mb-3">
              <div>
                <span className="font-medium text-gray-900">Lead ID:</span>{" "}
                {leadId}
              </div>
              <div>
                <span className="font-medium text-gray-900">Region:</span>{" "}
                {regionTagPreview}
              </div>
            </div>
          )}

          {/* setup link */}
          {setupLink && (
            <div className="text-xs text-gray-700 mb-3">
              <div className="font-medium text-gray-900">
                Vendor Setup Link:
              </div>
              <div className="break-all">{setupLink}</div>
              <div className="text-[11px] text-gray-500 mt-1">
                Tell them: “This link was just emailed to you. Tap it later to
                finish setup.”
              </div>
            </div>
          )}

          {/* QR live scan */}
          {qrDataUrl && (
            <div className="text-center">
              <div className="text-xs font-medium text-gray-900 mb-2">
                Scan This To View Your Page Now
              </div>
              <div className="inline-block bg-white p-3 rounded-lg border border-gray-300 shadow-sm">
                {/* qrDataUrl is a base64 data URL from the API */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrDataUrl}
                  alt="QR Code"
                  className="w-40 h-40 object-contain"
                />
              </div>
              <div className="text-[11px] text-gray-500 mt-2">
                Have the owner scan this with their phone camera so they can
                see what went live for them.
              </div>
            </div>
          )}
        </div>
      )}

      {/* SCRIPT REMINDER */}
      <div className="mt-10 text-[11px] text-gray-500 leading-relaxed">
        <div className="font-semibold text-gray-700 text-xs mb-2">
          Script Reminder:
        </div>
        <div className="mb-2">
          “We help small businesses increase their business by 30 to 90%. In
          some cases their slowest days became their busiest. And we do it
          without you spending thousands on ads.”
        </div>
        <div>
          “What’s the best email to send your setup link to? I’ll build your
          page right now.”
        </div>
      </div>
    </div>
  );
}
