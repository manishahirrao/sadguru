"use client";

import { useEffect } from "react";

/**
 * Registers the service worker for PWA / "Add to Home Screen" support.
 * Runs once on mount, client-side only.
 */
export default function ServiceWorkerRegistrar() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .catch((err) => console.error("SW registration failed:", err));
    }
  }, []);

  return null;
}
