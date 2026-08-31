import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";
import { useWordReveal } from "@/hooks/useWordReveal";
import { useParallax } from "@/hooks/useParallax";
import { useCountUp } from "@/lib/countUp";
import { OrbitIcon, PulseIcon, SealIcon, CheckIcon } from "@/components/ui/Icons";

const stats = [
  {
    value: 85,
    suffix: "%",
    text: "of jobs that will exist in 2030 haven't been invented yet",
    source: "World Economic Forum",
    Icon: OrbitIcon,
    tint: "orange",
  },
  {
    value: 2,
    suffix: "×",
    text: "more likely to stay engaged when learning connects to the real world",
    source: "Attendance Works",
    Icon: PulseIcon,
    tint: "green",
  },
  {
    value: 70,
    suffix: "%",
    text: "of employers value practical experience as much as grades",
    source: "NACE",
    Icon: SealIcon,
    tint: "orange",
  },
];

const pillars = [
  "Broader perspective",
  "Stronger learning",
  "Career clarity",
  "Future-ready skills",
  "Stronger communities",
];

function StatCard({ value, suffix, text, source, Icon, tint, delay }) {
  const { ref: countRef, display, done } = useCountUp(value);
  const revealRef = useReveal({ delay });
  const tiltRef = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 18 });
  const sry = useSpring(ry, { stiffness: 220, damping: 18 });
  const transform = useTransform([srx, sry], ([x, y]) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg)`);

  const onMove = (e) => {
    const el = tiltRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rx.set(py * -8);
    ry.set(px * 10);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div
      ref={(el) => {
        revealRef.current = el;
        tiltRef.current = el;
        countRef.current = el;
      }}
      className="card stat-card"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div className="card-inner" style={{ transform }}>
        <div className={`card-icon card-icon--${tint}`}>
          <Icon />
        </div>
        <span className={`stat-num${done ? " stat-num--landed" : ""}`}>
          {display}
          {suffix}
        </span>
        <p className="stat-text">{text}</p>
        <span className="stat-source">{source}</span>
      </motion.div>
    </div>
  );
}

export function WhyItMatters() {
  const pillRef = useReveal({ distance: 14 });
  const ledeRef = useReveal({ distance: 14, delay: 0.32 });
  const glowRefE = useParallax(26);
  const glowRefB = useParallax(-24);
  const pillarsRef = useReveal({ delay: 0.15, distance: 20 });
  const h2Ref = useWordReveal({ delay: 0.12 });

  return (
    <section id="why" aria-label="Why it matters" className="section" data-nav-theme="light">
      <div ref={glowRefE} className="section-glow section-glow--e" aria-hidden="true" />
      <div ref={glowRefB} className="section-glow section-glow--b" aria-hidden="true" />
      <div className="section-header section-header--center">
        <span ref={pillRef} className="pill pill--tint">Why It Matters</span>
        <h2 ref={h2Ref} className="h2">One exposure can change a trajectory.</h2>
        <p ref={ledeRef} className="lede lede--center">
          This isn't a nice-to-have. Early exposure changes outcomes, and the research backs it
          up.
        </p>
      </div>

      <div className="stat-grid">
        {stats.map((s, i) => (
          <StatCard key={s.text} {...s} delay={i * 0.1} />
        ))}
      </div>

      <div ref={pillarsRef} className="pillars-row">
        {pillars.map((p) => (
          <span key={p} className="pillar-chip">
            <CheckIcon size={14} color="#1E8F62" />
            {p}
          </span>
        ))}
      </div>
    </section>
  );
}
