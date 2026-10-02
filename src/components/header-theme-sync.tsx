"use client";

import { useEffect } from "react";

const HEADER_PROBE_Y = 53;

/**
 * Keeps `<html data-header-theme>` in sync with whatever section is under the
 * fixed header. Sections opt in with `data-header-theme="dark"`; anything else
 * counts as light.
 */
export function HeaderThemeSync() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const sync = () => {
      frame = 0;
      const hit = document
        .elementsFromPoint(window.innerWidth / 2, HEADER_PROBE_Y)
        .find((el) => !el.closest("header"));
      const owner = hit?.closest<HTMLElement>("[data-header-theme]");
      root.dataset.headerTheme =
        owner?.dataset.headerTheme === "dark" ? "dark" : "light";
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };

    // Sections like the carousel flip their theme without a scroll, so watch the attribute too.
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ["data-header-theme"],
    });

    sync();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
