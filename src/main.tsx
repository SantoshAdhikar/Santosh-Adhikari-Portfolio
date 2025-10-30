import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";

const GalleryPage = lazy(() => import("./pages/GalleryPage"));
// const BlueShaderBackground = lazy(() => import("./components/BlueShaderBackground"));

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/gallery", element:
      <Suspense fallback={<div className="p-6 text-white/80">Loading…</div>}>
        <GalleryPage />
      </Suspense>
    }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<div className="p-6 text-white/80">Loading…</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
