// @ts-nocheck
import { useState } from "react";
import PhotoUploader from "./PhotoUploader";
import Photos from "./Photos";

export default function GallerySection() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <section id="gallery" className="scroll-mt-24 py-16 px-4 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold">Community Gallery</h2>
            <p className="text-white/70 text-sm mt-1">
              Anyone can upload a clean (non-NSFW) picture. New uploads appear below.
            </p>
          </div>

          {/* Public upload button */}
          <PhotoUploader onUploaded={() => setRefreshKey(k => k + 1)} />
        </div>

        {/* The grid of photos */}
        <Photos refreshKey={refreshKey} />
      </div>
    </section>
  );
}
