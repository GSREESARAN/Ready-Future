import { useEffect, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Each letter cycles through random glyphs before locking onto its real
 * character, staggered left to right — a "decrypting" text reveal.
 */
export function ScrambleText({ text, className, duration = 650, stagger = 55 }) {
  const letters = text.split("");
  const [display, setDisplay] = useState(() => letters.map(() => ""));

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setDisplay(letters);
      return;
    }

    const settleAt = letters.map((_, i) => i * stagger + duration * 0.45 + Math.random() * 140);
    const totalDuration = Math.max(...settleAt);
    const start = performance.now();
    let frame;

    const tick = (now) => {
      const elapsed = now - start;
      setDisplay(
        letters.map((ch, i) => {
          if (ch === " ") return " ";
          if (elapsed >= settleAt[i]) return ch;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
      );
      if (elapsed < totalDuration) {
        frame = requestAnimationFrame(tick);
      } else {
        setDisplay(letters);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span className={className} aria-label={text}>
      {display.map((ch, i) => (
        <span key={i} className="scramble-letter" aria-hidden="true">
          {ch || " "}
        </span>
      ))}
    </span>
  );
}
