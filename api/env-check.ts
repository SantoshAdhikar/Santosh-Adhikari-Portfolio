// api/env-check.ts
export default function handler(req: any, res: any) {
  res.status(200).json({
    CLOUDINARY_CLOUD_NAME: !!process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: !!process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: !!process.env.CLOUDINARY_API_SECRET,
    // helpful to confirm we're on vercel dev, not raw vite
    RUNTIME: process.env.VERCEL ? "vercel" : "node",
  });
}
