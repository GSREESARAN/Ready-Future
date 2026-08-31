import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const SPARKLE_GLYPHS = ["✦", "✺", "✧"];
const INTERACTIVE_SELECTOR = "a, button, .card, .nav-link";
const DOT_HALF = 5;
const RING_HALF = 17;

/** Desktop-only, motion-safe cursor: a dot + trailing ring, plus a
 * sparkle trail while moving through the dark closing section. */
export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (reduceMotion || isTouch || !dot || !ring) return;

    const setDotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const setDotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const setRingX = gsap.quickTo(ring, "x", { duration: 0.32, ease: "power3.out" });
    const setRingY = gsap.quickTo(ring, "y", { duration: 0.32, ease: "power3.out" });

    const spawnSparkle = (x, y, variant = "dark") => {
      const el = document.createElement("span");
      el.className = variant === "light" ? "cursor-sparkle cursor-sparkle--light" : "cursor-sparkle";
      el.textContent = SPARKLE_GLYPHS[Math.floor(Math.random() * SPARKLE_GLYPHS.length)];
      el.style.left = `${x - 7}px`;
      el.style.top = `${y - 7}px`;
      document.body.appendChild(el);
      const peakOpacity = variant === "light" ? 0.55 : 1;
      gsap.fromTo(
        el,
        { opacity: peakOpacity, scale: 0.5, x: 0, y: 0 },
        {
          opacity: 0,
          scale: 1.1,
          x: (Math.random() - 0.5) * 26,
          y: -20 - Math.random() * 18,
          duration: 0.7,
          ease: "power2.out",
          onComplete: () => el.remove(),
        }
      );
    };

    let hasMoved = false;
    let lastSparkle = 0;
    const onMove = (e) => {
      if (!hasMoved) {
        hasMoved = true;
        // only hide the native cursor once the custom one is about to
        // take its place — otherwise a user who hasn't moved the mouse
        // yet sees no cursor at all
        document.documentElement.classList.add("custom-cursor-active");
        gsap.set(dot, { x: e.clientX - DOT_HALF, y: e.clientY - DOT_HALF });
        gsap.set(ring, { x: e.clientX - RING_HALF, y: e.clientY - RING_HALF });
        gsap.to([dot, ring], { opacity: 1, duration: 0.25 });
      }
      setDotX(e.clientX - DOT_HALF);
      setDotY(e.clientY - DOT_HALF);
      setRingX(e.clientX - RING_HALF);
      setRingY(e.clientY - RING_HALF);

      const inDarkSection = !!e.target?.closest?.('[data-cursor-dark]');
      const inMain = !!e.target?.closest?.('main');
      const now = performance.now();
      if (inDarkSection && now - lastSparkle > 100) {
        lastSparkle = now;
        spawnSparkle(e.clientX, e.clientY, "dark");
      } else if (!inDarkSection && inMain && now - lastSparkle > 220) {
        lastSparkle = now;
        spawnSparkle(e.clientX, e.clientY, "light");
      }
    };

    const onOver = (e) => {
      if (e.target?.closest?.(INTERACTIVE_SELECTOR)) {
        gsap.to(ring, { scale: 1.7, opacity: 0.5, duration: 0.3, ease: "power2.out" });
        gsap.to(dot, { scale: 0, duration: 0.2, ease: "power2.out" });
      }
    };
    const onOut = (e) => {
      if (e.target?.closest?.(INTERACTIVE_SELECTOR)) {
        gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
        gsap.to(dot, { scale: 1, duration: 0.2, ease: "power2.out" });
      }
    };
    const onLeaveWindow = () => gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    const onEnterWindow = () => gsap.to([dot, ring], { opacity: 1, duration: 0.2 });

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);
    document.documentElement.addEventListener("mouseenter", onEnterWindow);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      document.documentElement.removeEventListener("mouseenter", onEnterWindow);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
    </>
  );
}
