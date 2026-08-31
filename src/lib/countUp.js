import { useEffect, useRef, useState } from "react";

/** Animates 0 → `value` once the element scrolls into view. `done` flips
 * true right as the count lands, for a one-shot "landing" flourish. */
export function useCountUp(value, { duration = 1100 } = {}) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const [done, setDone] = useState(false);
  const played = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const run = () => {
      if (played.current) return;
      played.current = true;
      if (reduceMotion) {
        setDisplay(value);
        setDone(true);
        return;
      }
      let start = null;
      const step = (ts) => {
        if (start === null) start = ts;
        const p = Math.min(1, (ts - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(Math.round(value * eased));
        if (p < 1) {
          requestAnimationFrame(step);
        } else {
          setDone(true);
        }
      };
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && run()),
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return { ref, display, done };
}
