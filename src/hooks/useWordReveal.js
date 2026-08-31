import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Splits a heading's text into per-word spans and reveals them with a
 * scroll-triggered stagger — the same word-by-word treatment Hero's H1
 * uses, extended to every other section's headline so the big moment
 * doesn't just flat-fade as one block. Attach the returned ref directly
 * to the heading element (plain text content only).
 */
export function useWordReveal({ delay = 0 } = {}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const originalText = el.textContent;
    if (reduceMotion) return;

    // build the per-word spans with DOM APIs (not innerHTML) so nothing
    // here depends on the heading text being free of HTML-special
    // characters
    const words = originalText.trim().split(/\s+/);
    const fragment = document.createDocumentFragment();
    words.forEach((w, i) => {
      const span = document.createElement("span");
      span.className = "word-reveal-word";
      span.textContent = w;
      fragment.appendChild(span);
      if (i < words.length - 1) fragment.appendChild(document.createTextNode(" "));
    });
    el.replaceChildren(fragment);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".word-reveal-word"),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.06,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "restart none restart none",
          },
        }
      );
    }, el);

    return () => {
      ctx.revert();
      el.textContent = originalText;
    };
  }, [delay]);

  return ref;
}
