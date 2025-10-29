import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App";
import GalleryPage from "./pages/GalleryPage";

function RouteError() {
  return (
    <div style={{ padding: 24, color: "white" }}>
      <h1>Something went wrong</h1>
      <p>Open DevTools → Console to see the error.</p>
    </div>
  );
}

const router = createBrowserRouter([
  { path: "/", element: <App />, errorElement: <RouteError /> },
  { path: "/gallery", element: <GalleryPage />, errorElement: <RouteError /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
