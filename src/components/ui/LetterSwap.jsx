import { useMemo, useState } from "react";
import { motion } from "framer-motion";

/**
 * Text that swaps its letters vertically on hover, staggered in a
 * shuffled (rather than left-to-right) order per letter — each letter is
 * two stacked copies; on hover the top copy slides up and out while a
 * fresh copy slides up from below to take its place.
 */
export function LetterSwap({ label, className, staggerDuration = 0.025, transition, as: As = "span" }) {
  const [hovered, setHovered] = useState(false);
  const letters = useMemo(() => label.split(""), [label]);

  // shuffle the stagger order so letters animate in a random cascade
  // rather than strictly left-to-right
  const staggerOrder = useMemo(() => {
    const order = letters.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      // oxlint flags Math.random as impure-during-render, but this whole
      // block only runs inside useMemo when `letters` changes — not on
      // every render — so the shuffle is stable per label as intended
      // oxlint-disable-next-line react/purity
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    const positionByIndex = [];
    order.forEach((originalIndex, shufflePosition) => {
      positionByIndex[originalIndex] = shufflePosition;
    });
    return positionByIndex;
  }, [letters]);

  const t = transition ?? { type: "spring", duration: 0.6, bounce: 0.15 };

  return (
    <As
      className={className}
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {letters.map((char, i) => {
        const delay = staggerOrder[i] * staggerDuration;
        const display = char === " " ? " " : char;
        return (
          <span key={i} className="letter-swap-slot">
            <span className="letter-swap-ghost" aria-hidden="true">
              {display}
            </span>
            <motion.span
              aria-hidden="true"
              className="letter-swap-layer"
              animate={{ y: hovered ? "-100%" : "0%" }}
              transition={{ ...t, delay }}
            >
              {display}
            </motion.span>
            <motion.span
              aria-hidden="true"
              className="letter-swap-layer"
              initial={{ y: "100%" }}
              animate={{ y: hovered ? "0%" : "100%" }}
              transition={{ ...t, delay }}
            >
              {display}
            </motion.span>
          </span>
        );
      })}
    </As>
  );
}
