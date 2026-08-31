import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";
import { useWordReveal } from "@/hooks/useWordReveal";
import { useParallax } from "@/hooks/useParallax";
import { CompassIcon, PeopleIcon, BulbIcon } from "@/components/ui/Icons";

const steps = [
  {
    n: "01",
    title: "Explore",
    desc: "See what's out there. Meet the industries, roles and people you didn't know existed.",
    Icon: CompassIcon,
    tint: "orange",
  },
  {
    n: "02",
    title: "Experience",
    desc: "Step into it. Shadow professionals, sit in on real work, feel what the job is actually like.",
    Icon: PeopleIcon,
    tint: "green",
  },
  {
    n: "03",
    title: "Discover",
    desc: "Know what fits. Reflect on the experience and choose with real information, not a guess.",
    Icon: BulbIcon,
    tint: "orange",
  },
];

function StepCard({ n, title, desc, Icon, tint, delay }) {
  const ref = useReveal({ delay });
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
        ref.current = el;
        tiltRef.current = el;
      }}
      className="card process-step-card"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <span className="process-num-ghost" style={{ animationDelay: `${delay}s` }}>{n}</span>
      <motion.div className="card-inner" style={{ transform }}>
        <div className={`card-icon card-icon--${tint}`}>
          <Icon />
        </div>
        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{desc}</p>
      </motion.div>
    </div>
  );
}

export function Process() {
  const pillRef = useReveal({ distance: 14 });
  const ledeRef = useReveal({ distance: 14, delay: 0.32 });
  const glowRef = useParallax(24);
  const h2Ref = useWordReveal({ delay: 0.12 });

  return (
    <section id="process" aria-label="The process" className="section section--soft" data-nav-theme="light">
      <div ref={glowRef} className="section-glow section-glow--d" aria-hidden="true" />
      <div className="section-header section-header--center">
        <span ref={pillRef} className="pill pill--dark">The Process</span>
        <h2 ref={h2Ref} className="h2">Explore. Experience. Discover.</h2>
        <p ref={ledeRef} className="lede lede--center">
          Not a lecture, not a video: a real sequence that starts with curiosity and ends with
          clarity.
        </p>
      </div>

      <div className="process-cards">
        <div className="process-track-wrap" aria-hidden="true">
          <div className="process-track" />
          <div className="process-traveler" />
        </div>
        {steps.map((s, i) => (
          <StepCard key={s.title} {...s} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}
