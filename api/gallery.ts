// api/gallery.ts
import path from "node:path";
import { config as loadEnv } from "dotenv";

// Load .env.local first, then .env (works with vercel dev on Windows)
loadEnv({ path: path.join(process.cwd(), ".env.local") });
loadEnv(); // fallback to .env

type CloudinaryResource = {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  created_at: string;
};

export default async function handler(req: any, res: any) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey    = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    res.status(500).json({
      error: "Missing Cloudinary config on server.",
      hint: "Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in .env.local for vercel dev",
      seen: {
        CLOUDINARY_CLOUD_NAME: !!cloudName,
        CLOUDINARY_API_KEY: !!apiKey,
        CLOUDINARY_API_SECRET: !!apiSecret,
      },
    });
    return;
  }

  const adminUrl =
    `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload?max_results=100&direction=desc`;

  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
  const r = await fetch(adminUrl, { headers: { Authorization: `Basic ${auth}` } });

  if (!r.ok) {
    const txt = await r.text();
    res.status(r.status).json({ error: "Cloudinary API error", detail: txt });
    return;
  }
  

  const data = await r.json();
  const items = (data.resources as CloudinaryResource[]).map(it => ({
    id: it.public_id,
    url: it.secure_url,
    w: it.width,
    h: it.height,
    created_at: it.created_at,
  }));

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
  res.status(200).send(JSON.stringify({ items }));
}
