// @ts-nocheck
import { useState } from "react";

type Props = {
  /** Called after a successful upload so parent can refresh the gallery */
  onUploaded?: () => void;
};

export default function PhotoUploader({ onUploaded }: Props) {
  const CLOUD  = import.meta.env.VITE_CLOUDINARY_CLOUD;
  const PRESET = import.meta.env.VITE_CLOUDINARY_PRESET;

  if (!CLOUD || !PRESET) {
  console.error("Missing Cloudinary client config (VITE_CLOUDINARY_*).");
  // Show a friendly UI error if you want
}

  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;

    if (!CLOUD || !PRESET) {
      setMsg("Missing Cloudinary client config (VITE_CLOUDINARY_*).");
      return;
    }

    setBusy(true);
    setMsg(null);

    try {
      const fd = new FormData();
      fd.append("file", f);
      fd.append("upload_preset", PRESET);
      // Optional: fd.append("folder", "community");

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error?.message || JSON.stringify(data));

      setMsg("Upload received! It will display once approved.");
      e.target.value = ""; // reset input

      // notify parent to re-fetch
      onUploaded?.();
    } catch (err: any) {
      setMsg("Upload failed: " + (err.message || String(err)));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <label className="px-4 py-2 rounded-lg border border-white/40 hover:bg-white hover:text-blue-700 cursor-pointer">
        {busy ? "Uploading..." : "Upload Photo"}
        <input type="file" accept="image/*" className="hidden" onChange={onChange} disabled={busy} />
      </label>
      {msg && <span className="text-white/80 text-sm">{msg}</span>}
    </div>
  );
}
