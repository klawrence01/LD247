'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

type Vendor = {
  id: string;
  name: string;
  city?: string | null;
  state?: string | null;
  public_url?: string | null;
};

type SavedQR = {
  id: string;
  label: string;
  target_url: string;
  audience: string;
  owner_id: string | null;
  notes: string | null;
  created_at: string;
};

export default function AdminQRPage() {
  const supabase = createClientComponentClient();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [savedQrs, setSavedQrs] = useState<SavedQR[]>([]);
  const [loading, setLoading] = useState(true);

  // form state
  const [selectedVendorId, setSelectedVendorId] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [label, setLabel] = useState('CT Sales Page - dropoff');
  const [targetUrl, setTargetUrl] = useState('https://your-domain.com/vendor/join');
  const [audience, setAudience] = useState<'generic' | 'vendor' | 'rep'>('generic');
  const [ownerId, setOwnerId] = useState('');
  const [notes, setNotes] = useState('');

  // preview state
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [previewLabel, setPreviewLabel] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      // vendors
      const { data: vendorData } = await supabase
        .from('vendors')
        .select('id,name,city,state,public_url')
        .order('name', { ascending: true });

      if (vendorData) {
        setVendors(vendorData);
      }

      // existing qr codes
      const { data: qrData } = await supabase
        .from('admin_qr_codes')
        .select('*')
        .order('created_at', { ascending: false });

      if (qrData) {
        setSavedQrs(qrData as SavedQR[]);
      }

      setLoading(false);
    };

    loadData();
  }, [supabase]);

  // when user clicks "Use in form below" in quick vendor box
  const applyQuickVendor = () => {
    if (!selectedVendorId) return;
    const vendor = vendors.find((v) => v.id === selectedVendorId);
    const city = selectedCity || vendor?.city || 'hartford';

    // this is the pattern we talked about:
    // /vendor/join?v=<vendorId>&city=<city-slug>
    const builtUrl = `https://your-domain.com/vendor/join?v=${selectedVendorId}&city=${encodeURIComponent(
      city.toLowerCase()
    )}`;

    setTargetUrl(builtUrl);
    setLabel(vendor ? `${vendor.name} intro QR` : 'Vendor QR');
    setAudience('vendor');
    setOwnerId(selectedVendorId);
    setNotes(`QR auto-built for vendor ${vendor?.name ?? ''}, city ${city}`);
  };

  const handleSave = async () => {
    const payload = {
      label,
      target_url: targetUrl,
      audience,
      owner_id: ownerId || null,
      notes: notes || null,
    };

    const { data, error } = await supabase.from('admin_qr_codes').insert([payload]).select().single();

    if (!error && data) {
      setSavedQrs((prev) => [data as SavedQR, ...prev]);
    }
  };

  const openPreview = () => {
    if (!targetUrl) return;
    setPreviewUrl(targetUrl);
    setPreviewLabel(label || 'QR code');
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
  };

  return (
    <div className="flex min-h-screen bg-neutral-900 text-white">
      {/* left nav is already handled in layout, so this is just the page body */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">QR Manager</h1>
              <p className="text-sm text-neutral-300 mt-1">
                Create and manage QR codes for sales reps and vendors.
              </p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-neutral-800 border border-neutral-700">
              Using table: <span className="text-orange-400">admin_qr_codes</span>
            </span>
          </div>

          {/* Quick vendor QR */}
          <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Quick vendor QR</h2>
            <p className="text-sm text-neutral-300 mb-4">
              Build <code className="bg-black/30 px-1 rounded">/vendor/join?v=...&city=...</code> automatically
              so a scan can either follow the vendor or view daily deals for that city.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1.2fr_auto] gap-4">
              <div>
                <label className="block text-sm mb-2">Vendor</label>
                <select
                  value={selectedVendorId}
                  onChange={(e) => setSelectedVendorId(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-3 py-2 outline-none"
                >
                  <option value="">Select vendor...</option>
                  {vendors.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2">City (for daily deals)</label>
                <input
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  placeholder="hartford, new-haven, etc."
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-3 py-2 outline-none"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={applyQuickVendor}
                  className="w-full bg-orange-500 hover:bg-orange-600 rounded-xl px-4 py-2 font-medium transition"
                >
                  Use in form below
                </button>
              </div>
            </div>
          </div>

          {/* Create QR */}
          <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Create QR</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-2">Label</label>
                <input
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-3 py-2 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Audience</label>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value as 'generic' | 'vendor' | 'rep')}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-3 py-2 outline-none"
                >
                  <option value="generic">Generic</option>
                  <option value="vendor">Vendor</option>
                  <option value="rep">Rep</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2">Target URL</label>
              <input
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-3 py-2 outline-none"
              />
              <p className="text-xs text-neutral-400 mt-1">
                This is where the scan goes — your “choose vendor or daily deals” page can live here.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm mb-2">Owner (optional)</label>
                <input
                  value={ownerId}
                  onChange={(e) => setOwnerId(e.target.value)}
                  placeholder="rep id or vendor id"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-3 py-2 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Notes</label>
                <input
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Drop-off QR, good through 12/31"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-3 py-2 outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="bg-orange-500 hover:bg-orange-600 rounded-xl px-5 py-2 font-medium transition"
              >
                Save QR
              </button>
              <button
                onClick={openPreview}
                className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-xl px-5 py-2 font-medium transition"
              >
                Preview QR
              </button>
            </div>
          </div>

          {/* Saved QRs */}
          <div className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">All QR codes</h2>
            </div>
            {loading ? (
              <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 text-neutral-300">
                Loading...
              </div>
            ) : savedQrs.length === 0 ? (
              <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 text-neutral-300">
                No QR codes saved yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedQrs.map((qr) => {
                  const imgSrc = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
                    qr.target_url
                  )}`;
                  return (
                    <div
                      key={qr.id}
                      className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-4 flex gap-4 items-center"
                    >
                      <img
                        src={imgSrc}
                        alt={qr.label}
                        className="w-20 h-20 rounded-lg bg-white/5 object-contain"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{qr.label}</p>
                        <p className="text-xs text-neutral-400 break-all">{qr.target_url}</p>
                        <p className="text-xs mt-1 text-neutral-500">
                          {qr.audience} • {new Date(qr.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PREVIEW MODAL */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl w-full max-w-md p-6 relative">
            <button
              onClick={closePreview}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center"
            >
              ×
            </button>
            <h3 className="text-lg font-semibold mb-4">QR Preview</h3>
            <div className="flex flex-col items-center gap-4">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
                  previewUrl
                )}`}
                alt={previewLabel}
                className="w-56 h-56 rounded-lg bg-white"
              />
              <p className="text-sm font-medium">{previewLabel}</p>
              <p className="text-xs text-neutral-400 break-all text-center">{previewUrl}</p>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(previewUrl);
                }}
                className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-xl px-4 py-2 text-sm"
              >
                Copy URL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
