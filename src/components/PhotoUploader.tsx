import { useRef, useState } from "react";

type Props = { onUploaded?: () => void };

export default function PhotoUploader({ onUploaded }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD;
  const PRESET = import.meta.env.VITE_CLOUDINARY_PRESET;

  function choose() {
    setMsg(null);
    fileRef.current?.click();
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;

    if (!f.type.startsWith("image/")) return setMsg("Only image files are allowed.");
    if (f.size > 8 * 1024 * 1024) return setMsg("Max file size is 8MB.");
    if (!CLOUD || !PRESET) return setMsg("Missing Cloudinary client config.");

    try {
      setBusy(true);
      const fd = new FormData();
      fd.append("file", f);
      fd.append("upload_preset", PRESET);

      const r = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, {
        method: "POST",
        body: fd,
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error?.message || "Upload failed");

      setMsg("Uploaded!");
      onUploaded?.();
    } catch (err: any) {
      setMsg(err?.message || "Upload failed");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={choose}
        disabled={busy}
        className="px-4 py-2 rounded-lg border border-white/40 hover:bg-white hover:text-blue-700 transition disabled:opacity-60"
      >
        {busy ? "Uploading…" : "Upload Photo"}
      </button>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
      {msg && <span className="text-xs text-white/70">{msg}</span>}
    </div>
  );
}
