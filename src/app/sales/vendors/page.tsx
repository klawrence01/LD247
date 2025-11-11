"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabaseBrowser";

type VendorRow = {
  id: string;
  name: string | null;
  city: string | null;
  state: string | null;
  plan: string | null;
  status: string | null;
  rep_id: string | null;
  public_url: string | null;
};

export default function VendorsPage() {
  const [vendors, setVendors] = useState<VendorRow[]>([]);
  const [filtered, setFiltered] = useState<VendorRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showMine, setShowMine] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVendor, setSelectedVendor] = useState<VendorRow | null>(null);

  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    async function loadVendors() {
      try {
        const supabase = getSupabaseBrowserClient();
        const { data, error } = await supabase.from("vendors").select("*");

        if (error) {
          console.error("Error loading vendors:", error);
          setErrorMsg(error.message || "Unknown error");
          setVendors([]);
          setFiltered([]);
        } else {
          // data is VendorRow[]
          const rows = (data || []) as VendorRow[];
          setVendors(rows);
          setFiltered(rows);
        }
      } catch (err: any) {
        console.error("Unexpected error:", err);
        setErrorMsg(err?.message || "Unexpected error");
        setVendors([]);
        setFiltered([]);
      } finally {
        setLoading(false);
      }
    }

    loadVendors();
  }, []);

  // filter when search or "my vendors" changes
  useEffect(() => {
    let list = [...vendors];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter((v) => {
        const name = v.name || "";
        const city = v.city || "";
        return name.toLowerCase().includes(q) || city.toLowerCase().includes(q);
      });
    }

    // later: if you have auth and know the logged-in rep, filter by that
    if (showMine) {
      list = list.filter((v) => v.rep_id === "ken"); // placeholder
    }

    setFiltered(list);

    // if current selection is filtered out, clear it
    if (selectedVendor && !list.find((v) => v.id === selectedVendor.id)) {
      setSelectedVendor(null);
    }
  }, [searchTerm, showMine, vendors, selectedVendor]);

  function handleSelect(v: VendorRow) {
    setSelectedVendor(v);
  }

  function handleSendNote() {
    if (!selectedVendor) return;
    if (!noteText.trim()) return;

    // later: insert into supabase vendor_notes
    console.log("Rep note to save:", {
      vendor_id: selectedVendor.id,
      note: noteText,
    });

    setNoteText("");
    alert("Note captured (wire to supabase later).");
  }

  return (
    <div className="flex gap-6 pr-6">
      {/* left column */}
      <div className="flex-1">
        <h1 className="text-2xl font-semibold mb-2">Vendors</h1>
        <p className="text-sm text-gray-600 mb-4">
          Find your businesses, see their plan and status, and message them.
        </p>

        <div className="flex items-center gap-3 mb-4">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or city..."
            className="border rounded-md px-3 py-2 w-64 text-sm"
          />
          <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showMine}
              onChange={(e) => setShowMine(e.target.checked)}
            />
            Show only my vendors
          </label>
        </div>

        <div className="bg-white border rounded-md overflow-hidden">
          <div className="grid grid-cols-6 px-4 py-2 text-xs font-semibold text-gray-500 border-b">
            <div className="col-span-2">Business</div>
            <div>City</div>
            <div>Plan</div>
            <div>Status</div>
            <div className="text-right">Action</div>
          </div>

          {loading ? (
            <div className="p-4 text-sm text-gray-500">Loading…</div>
          ) : errorMsg ? (
            <div className="p-4 text-sm text-red-500">{errorMsg}</div>
          ) : filtered.length === 0 ? (
            <div className="p-4 text-sm text-gray-500">
              No vendors match that search.
            </div>
          ) : (
            filtered.map((v) => (
              <button
                key={v.id}
                onClick={() => handleSelect(v)}
                className={`grid grid-cols-6 px-4 py-3 text-sm w-full text-left border-b last:border-b-0 hover:bg-orange-50 transition ${
                  selectedVendor?.id === v.id ? "bg-orange-100" : ""
                }`}
              >
                <div className="col-span-2">
                  <div className="font-medium">{v.name || "—"}</div>
                  <div className="text-xs text-gray-400">
                    {v.public_url || ""}
                  </div>
                </div>
                <div>
                  {v.city ? (
                    <>
                      {v.city}
                      {v.state ? `, ${v.state}` : ""}
                    </>
                  ) : (
                    "—"
                  )}
                </div>
                <div>{v.plan || "—"}</div>
                <div>
                  {v.status ? (
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        v.status === "active"
                          ? "bg-green-100 text-green-700"
                          : v.status === "paused"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {v.status}
                    </span>
                  ) : (
                    "—"
                  )}
                </div>
                <div className="text-right">
                  <span className="text-blue-500 text-xs">Open →</span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* right column – detail */}
      <div className="w-80">
        {!selectedVendor ? (
          <div className="border border-dashed rounded-md p-4 text-sm text-gray-400">
            Select a vendor to view / add rep notes.
          </div>
        ) : (
          <div className="bg-white border rounded-md p-4 space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-1">
                {selectedVendor.name}
              </h2>
              <p className="text-xs text-gray-500">
                {selectedVendor.city
                  ? `${selectedVendor.city}${
                      selectedVendor.state ? ", " + selectedVendor.state : ""
                    }`
                  : "Location unknown"}
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Plan:</span>{" "}
                {selectedVendor.plan || "—"}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                {selectedVendor.status || "—"}
              </p>
              <p>
                <span className="font-medium">Rep:</span>{" "}
                {selectedVendor.rep_id || "—"}
              </p>
              {selectedVendor.public_url ? (
                <p>
                  <span className="font-medium">Public page:</span>{" "}
                  <a
                    href={selectedVendor.public_url}
                    target="_blank"
                    className="text-blue-500 underline"
                  >
                    {selectedVendor.public_url}
                  </a>
                </p>
              ) : null}
            </div>

            <div className="pt-2 border-t">
              <label className="text-xs font-medium text-gray-700">
                Rep note
              </label>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="mt-1 w-full border rounded-md text-sm px-2 py-1 min-h-[80px]"
                placeholder="Called, left VM. Wants to start on trial next week…"
              />
              <button
                onClick={handleSendNote}
                className="mt-2 bg-orange-500 text-white text-sm px-3 py-1 rounded-md"
              >
                Save note
              </button>
            </div>

            <div className="pt-2 border-t">
              <p className="text-xs text-gray-400">
                Later: pull last messages, last appointment, and payments into
                this panel.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
