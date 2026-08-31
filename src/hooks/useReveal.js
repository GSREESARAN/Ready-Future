import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fades + slides an element up as it scrolls into view, and replays the
 * animation every time it re-enters (from either direction).
 */
export function useReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: options.distance ?? 28 },
        {
          opacity: 1,
          y: 0,
          duration: reduceMotion ? 0 : 0.9,
          delay: options.delay ?? 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "restart none restart none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [options.delay, options.distance]);

  return ref;
}
