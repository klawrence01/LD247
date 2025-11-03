import { createSupabaseServer } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import RichEditor from "@/components/RichEditor";

export const metadata = { title: "Send a Note" };

async function persistMessage(formData: FormData, status: "draft" | "sent") {
  const supabase = createSupabaseServer();
  const subject   = String(formData.get("subject") || "").trim();
  const body_html = String(formData.get("body_html") || "");
  const body_text = String(formData.get("body_text") || "");
  const ids       = String(formData.get("recipient_ids") || "");
  const imageIds  = String(formData.get("image_ids") || "");
  if (!subject) return;

  const { data: inserted } = await supabase
    .from("messages")
    .insert({ subject, body_text, body_html, status })
    .select("id")
    .single();
  if (!inserted) return;

  // recipients
  const contactIds = ids.split(",").map(s => s.trim()).filter(Boolean);
  if (contactIds.length) {
    const { data: contacts } = await supabase
      .from("contacts").select("id,email").in("id", contactIds);
    if (contacts?.length) {
      await supabase.from("message_recipients").insert(
        contacts.map(c => ({ message_id: inserted.id, contact_id: c.id, email: c.email }))
      );
    }
  }

  // attachments (from gallery)
  const galleryIds = imageIds.split(",").map(s => s.trim()).filter(Boolean);
  if (galleryIds.length) {
    const { data: imgs } = await supabase
      .from("gallery_images").select("id,url,caption").in("id", galleryIds);
    if (imgs?.length) {
      await supabase.from("message_attachments").insert(
        imgs.map((g, idx) => ({
          message_id: inserted.id,
          url: g.url,
          caption: g.caption,
          sort_order: idx,
        }))
      );
    }
  }

  revalidatePath(
    status === "sent"
      ? "/dashboard/merchant/messaging/sent"
      : "/dashboard/merchant/messaging"
  );
}

export default async function NewMessagePage() {
  const supabase = createSupabaseServer();
  const [{ data: contacts }, { data: gallery }] = await Promise.all([
    supabase
      .from("contacts")
      .select("id,name,email")
      .order("created_at", { ascending: false }),
    supabase
      .from("gallery_images")
      .select("id,url,caption,created_at")
      .order("created_at", { ascending: false }),
  ]);

  async function saveDraft(formData: FormData) {
    "use server";
    await persistMessage(formData, "draft");
  }

  async function sendNow(formData: FormData) {
    "use server";
    await persistMessage(formData, "sent");
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Send a Note</h1>
        <div className="flex gap-3">
          <Link
            href="/dashboard/merchant/messaging"
            className="text-sm underline"
          >
            Back
          </Link>
          <Link
            href="/dashboard/merchant/messaging/gallery"
            className="text-sm underline"
          >
            Open Gallery
          </Link>
        </div>
      </div>

      <form className="mt-6 space-y-4">
        {/* recipients */}
        <div>
          <label className="text-sm font-medium">Recipients</label>
          <div className="mt-2 rounded-lg border">
            <div className="max-h-48 overflow-auto">
              <ul>
                {(contacts ?? []).map((c) => (
                  <li
                    key={c.id}
                    className="px-3 py-2 border-b last:border-b-0 flex items-center gap-3"
                  >
                    <input
                      type="checkbox"
                      name="recipients"
                      value={c.id}
                      className="h-4 w-4"
                    />
                    <div>
                      <div className="font-medium">{c.name || c.email}</div>
                      <div className="text-xs text-gray-500">{c.email}</div>
                    </div>
                  </li>
                ))}
                {(contacts ?? []).length === 0 && (
                  <li className="px-3 py-2 text-sm text-gray-500">
                    No contacts yet.
                  </li>
                )}
              </ul>
            </div>
          </div>
          <input type="hidden" name="recipient_ids" id="recipient_ids" />
        </div>

        {/* subject */}
        <div>
          <label className="text-sm font-medium">Subject</label>
          <input
            name="subject"
            className="mt-1 w-full border rounded-lg px-3 py-2"
            placeholder="Short headline"
            required
          />
        </div>

        {/* rich text note */}
        <div>
          <label className="text-sm font-medium">Note</label>
          <div className="mt-1">
            <RichEditor />
          </div>
        </div>

        {/* image picker */}
        <div>
          <label className="text-sm font-medium">
            Attach Images (from Gallery)
          </label>
          <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {(gallery ?? []).map((img) => (
              <label
                key={img.id}
                className="rounded-lg border overflow-hidden cursor-pointer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.caption || "gallery"}
                  className="w-full h-28 object-cover"
                />
                <div className="flex items-center gap-2 px-2 py-2 text-xs">
                  <input type="checkbox" name="gallery" value={img.id} />
                  <span className="line-clamp-1">
                    {img.caption || "Image"}
                  </span>
                </div>
              </label>
            ))}
            {(gallery ?? []).length === 0 && (
              <div className="text-gray-500 text-sm">
                No images yet. Add some in the Gallery.
              </div>
            )}
          </div>
          <input type="hidden" name="image_ids" id="image_ids" />
        </div>

        {/* buttons */}
        <div className="flex gap-3">
          <button
            className="rounded-lg border px-4 py-2"
            formAction={saveDraft}
          >
            Save Draft
          </button>
          <button
            className="rounded-lg bg-black text-white px-4 py-2"
            formAction={sendNow}
          >
            Send Now
          </button>
        </div>
      </form>

      {/* gather checked ids into hidden fields on submit */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          (function(){
            const form=document.currentScript.closest('div').querySelector('form');
            const hidRec=form.querySelector('#recipient_ids');
            const hidImg=form.querySelector('#image_ids');
            form.addEventListener('submit',function(){
              hidRec.value = Array.from(form.querySelectorAll('input[name="recipients"]:checked')).map(i=>i.value).join(',');
              hidImg.value = Array.from(form.querySelectorAll('input[name="gallery"]:checked')).map(i=>i.value).join(',');
            });
          })();
        `,
        }}
      />
    </div>
  );
}
