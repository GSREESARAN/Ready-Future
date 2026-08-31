import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Subtle scroll-linked parallax drift for purely decorative elements
 * (ambient background glows). Moves the element a few px as its section
 * scrolls through the viewport, giving the page a sense of depth instead
 * of flat, frozen backgrounds. Not for elements that already carry their
 * own transform-based CSS animation (e.g. the hero blobs' `breathe`
 * keyframe) — GSAP would overwrite that transform every tick.
 */
export function useParallax(amount = 30) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y: -amount },
        {
          y: amount,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [amount]);

  return ref;
}
