import { useEffect, useState } from "react";

/**
 * Tracks which section is currently sitting directly under the fixed navbar
 * (elements carry `data-nav-theme="light" | "dark"`), so the navbar can
 * swap its frosted background/text to match.
 *
 * Computed directly from live geometry on every scroll frame rather than
 * via IntersectionObserver's own enter/exit events — a single fast or
 * programmatic scroll can batch multiple sections' intersection changes
 * into one callback, and processing that batch in DOM order (rather than
 * the order sections were actually crossed) can leave the theme stuck on
 * a stale section. Reading "what's at the line right now" on each frame
 * sidesteps that entirely.
 */
export function useSectionTheme(navHeight) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("[data-nav-theme]"));
    if (!sections.length) return;

    const lineY = navHeight + 1;
    let ticking = false;

    const measure = () => {
      ticking = false;
      let next = "light";
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= lineY && rect.bottom > lineY) {
          next = section.getAttribute("data-nav-theme") || "light";
          break;
        }
      }
      setTheme((prev) => (prev === next ? prev : next));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [navHeight]);

  return theme;
}
