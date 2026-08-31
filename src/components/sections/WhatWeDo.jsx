import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";
import { useWordReveal } from "@/hooks/useWordReveal";
import { useParallax } from "@/hooks/useParallax";
import { BriefcaseIcon, CalendarIcon, TaskIcon, TrophyIcon } from "@/components/ui/Icons";

const programs = [
  {
    title: "Career Camps",
    desc: "One immersive day inside an industry, guided by the people who actually work in it.",
    Icon: BriefcaseIcon,
    tint: "orange",
  },
  {
    title: "Experience Days",
    desc: "Shadow a professional. Sit in their meetings. See the job exactly as it is, not as it sounds.",
    Icon: CalendarIcon,
    tint: "green",
  },
  {
    title: "Internships",
    desc: "Real projects, real deadlines, real accountability: the first line on a resume that means something.",
    Icon: TaskIcon,
    tint: "orange",
  },
  {
    title: "Competitions & Beyond",
    desc: "Ongoing challenges that keep the momentum going long after the first spark.",
    Icon: TrophyIcon,
    tint: "green",
  },
];

function Card({ title, desc, Icon, tint, delay }) {
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
    <div ref={(el) => { ref.current = el; tiltRef.current = el; }} className="card" onMouseMove={onMove} onMouseLeave={onLeave}>
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

export function WhatWeDo() {
  const pillRef = useReveal({ distance: 14 });
  const ledeRef = useReveal({ distance: 14, delay: 0.32 });
  const glowRefA = useParallax(28);
  const glowRefB = useParallax(-22);
  const h2Ref = useWordReveal({ delay: 0.12 });

  return (
    <section id="programs" aria-label="What we do" className="section section--dark" data-nav-theme="dark" data-cursor-dark>
      <div ref={glowRefA} className="section-glow section-glow--a" aria-hidden="true" />
      <div ref={glowRefB} className="section-glow section-glow--b" aria-hidden="true" />
      <div className="section-header section-header--center">
        <span ref={pillRef} className="pill pill--tint">What We Do</span>
        <h2 ref={h2Ref} className="h2">Four ways in.</h2>
        <p ref={ledeRef} className="lede lede--center">
          Every program is built around one idea: put students in front of the real thing, not a
          description of it.
        </p>
      </div>

      <div className="card-grid">
        {programs.map((p, i) => (
          <Card key={p.title} {...p} delay={i * 0.08} />
        ))}
      </div>
    </section>
  );
}
