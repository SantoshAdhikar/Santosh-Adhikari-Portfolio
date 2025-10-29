import { useEffect, useState } from "react";

type PhotoItem = { id: string; url: string; w: number; h: number; created_at: string };

export default function Photos({ refreshKey = 0 }: { refreshKey?: number }) {
  const [items, setItems] = useState<PhotoItem[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("/api/gallery");
        const txt = await r.text();
        if (!r.ok) throw new Error(`API ${r.status}: ${txt}`);
        const data = JSON.parse(txt || "{}");
        const arr = Array.isArray(data?.items) ? data.items : [];
        if (!cancelled) setItems(arr);
      } catch (e: any) {
        if (!cancelled) setErr(e?.message || "Failed to load gallery.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [refreshKey]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {new Array(8).fill(0).map((_, i) => (
          <div key={i} className="h-40 rounded-lg bg-white/10 animate-pulse border border-white/10" />
        ))}
      </div>
    );
  }

  if (err) {
    return (
      <div className="text-red-300 bg-red-900/20 border border-red-500/40 rounded p-3">
        Couldn’t load the gallery.
        <div className="text-red-200 text-sm mt-1">{err}</div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return <p className="text-white/70">No photos yet.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {items.map((p) => (
        <a
          key={p.id}
          href={p.url}
          target="_blank"
          rel="noreferrer"
          className="group block overflow-hidden rounded-lg border border-white/10 bg-white/5"
        >
          <img
            src={p.url}
            alt={p.id}
            className="w-full h-40 object-cover group-hover:scale-[1.02] transition-transform"
            loading="lazy"
          />
          <div className="px-2 py-1 text-[11px] text-white/70 border-t border-white/10">
            {new Date(p.created_at).toLocaleString()}
          </div>
        </a>
      ))}
    </div>
  );
}
