import { useState } from "react";
import Photos from "../components/Photos";
import PhotoUploader from "../components/PhotoUploader";

export default function GalleryPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <section className="min-h-screen pt-24 pb-16 px-4 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">Community Gallery</h1>
            <p className="text-white/70 text-sm mt-1">
              Upload a clean, non-NSFW picture. It will appear for everyone.
            </p>
          </div>
          <PhotoUploader onUploaded={() => setRefreshKey(k => k + 1)} />
        </header>

        <Photos refreshKey={refreshKey} />
      </div>
    </section>
  );
}
