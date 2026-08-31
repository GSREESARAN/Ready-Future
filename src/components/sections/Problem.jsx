import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReveal } from "@/hooks/useReveal";
import { useWordReveal } from "@/hooks/useWordReveal";
import { useParallax } from "@/hooks/useParallax";
import { CheckBadge, UncertainBadge } from "@/components/ui/Icons";

gsap.registerPlugin(ScrollTrigger);

const blind = [
  "Too many paths, no way to test them.",
  "Interest without exposure is a guess dressed up as a decision.",
  "The same handful of familiar jobs, chosen because they're the only ones anyone's seen.",
  "Real potential, spent on the wrong assumption.",
];

const clarity = [
  "See the job before you choose it.",
  "Confidence built on experience, not assumption.",
  "A path chosen on purpose, not by chance.",
  "Real advice from people already doing the work.",
];

function useRowReveal(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const icon = ref.current.querySelector(".row-icon");
    const text = ref.current.querySelector(".row-text");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          toggleActions: "restart none restart none",
        },
        defaults: { ease: "power3.out" },
      });
      tl.fromTo(
        text,
        { opacity: 0, x: reduceMotion ? 0 : -10 },
        { opacity: 1, x: 0, duration: reduceMotion ? 0 : 0.5 },
        delay
      ).fromTo(
        icon,
        { opacity: 0, scale: 0.4, rotate: -20 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: reduceMotion ? 0 : 0.5,
          ease: "back.out(2.2)",
          clearProps: "transform",
        },
        delay
      );
    }, ref);
    return () => ctx.revert();
  }, [delay]);
  return ref;
}

function Row({ text, delay, variant }) {
  const ref = useRowReveal(delay);
  return (
    <div ref={ref} className={`compare-row compare-row--${variant}`}>
      <span className="row-icon">
        {variant === "blind" ? <UncertainBadge size={24} /> : <CheckBadge size={24} />}
      </span>
      <span className="row-text">{text}</span>
    </div>
  );
}

// six directions out of the same starting point, none of them marked —
// two run into a dead end, the rest just trail off
const RAYS = [
  { x: 160, y: 45, dead: false },
  { x: 255, y: 82, dead: true },
  { x: 250, y: 245, dead: false },
  { x: 160, y: 278, dead: false },
  { x: 70, y: 245, dead: true },
  { x: 65, y: 80, dead: false },
];

export function Problem() {
  const sectionRef = useRef(null);
  const tiltRef = useRef(null);
  const pillRef = useReveal({ distance: 14 });
  const ledeRef = useReveal({ distance: 14, delay: 0.32 });
  const visualRef = useReveal({ delay: 0.15, distance: 20 });
  const barWrapRef = useReveal({ distance: 26, delay: 0.1 });
  const h2Ref = useWordReveal({ delay: 0.12 });
  const glowRefC = useParallax(24);
  const glowRefF = useParallax(-20);

  // ambient tilt on the crossroads card, following the cursor anywhere in
  // the section — not just on direct hover
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const section = sectionRef.current;
    const card = tiltRef.current;
    if (reduceMotion || isTouch || !section || !card) return;

    const setRX = gsap.quickTo(card, "rotationX", { duration: 0.7, ease: "power3.out" });
    const setRY = gsap.quickTo(card, "rotationY", { duration: 0.7, ease: "power3.out" });

    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      setRX(py * -3);
      setRY(px * 4);
    };
    const onLeave = () => {
      setRX(0);
      setRY(0);
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} aria-label="The problem" className="section section--soft problem" data-nav-theme="light">
      <div ref={glowRefC} className="section-glow section-glow--c" aria-hidden="true" />
      <div ref={glowRefF} className="section-glow section-glow--f" aria-hidden="true" />

      <div className="problem-top">
        <div className="section-header">
          <span ref={pillRef} className="pill pill--dark">The Problem</span>
          <h2 ref={h2Ref} className="h2">Most students choose in the dark.</h2>
          <p ref={ledeRef} className="lede">
            No mentors to ask. No workplace to walk into. No real sense of what a job feels like
            from the inside. Just a guess, made early, that has to last for years.
          </p>
        </div>

        <div
          ref={(el) => {
            visualRef.current = el;
            tiltRef.current = el;
          }}
          className="problem-visual"
          aria-hidden="true"
        >
          <div className="problem-card">
            <div className="problem-card-fog" />
            <div className="problem-card-grain" />
            <div className="problem-card-orbit" />
            <svg className="problem-card-svg" viewBox="0 0 320 320">
              {RAYS.map((r, i) => (
                <line
                  key={i}
                  className="problem-ray"
                  style={{ animationDelay: `${i * 1.5}s` }}
                  x1="160"
                  y1="160"
                  x2={r.x}
                  y2={r.y}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              ))}
              {RAYS.map((r, i) =>
                r.dead ? (
                  <g key={i} opacity="0.75">
                    <line x1={r.x - 7} y1={r.y - 7} x2={r.x + 7} y2={r.y + 7} stroke="#4A4238" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1={r.x - 7} y1={r.y + 7} x2={r.x + 7} y2={r.y - 7} stroke="#4A4238" strokeWidth="2.5" strokeLinecap="round" />
                  </g>
                ) : (
                  <circle key={i} cx={r.x} cy={r.y} r="6" fill="#F3EBDA" stroke="#6B5A3E" strokeWidth="2" />
                )
              )}
              <circle className="problem-ping" cx="160" cy="160" r="12" />
              <circle cx="160" cy="160" r="12" fill="#221E1A" />
              <circle cx="160" cy="160" r="12" fill="none" stroke="#F3EBDA" strokeWidth="2.5" />
            </svg>
          </div>
        </div>
      </div>

      <div ref={barWrapRef} className="compare-bar">
        <div className="compare-col compare-col--blind">
          <span className="compare-label">Choosing In The Dark</span>
          {blind.map((line, i) => (
            <Row key={line} text={line} delay={i * 0.1} variant="blind" />
          ))}
        </div>
        <div className="compare-divider">
          <div className="compare-connector">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </div>
        </div>
        <div className="compare-col compare-col--clarity">
          <span className="compare-label compare-label--clarity">Choosing With Clarity</span>
          {clarity.map((line, i) => (
            <Row key={line} text={line} delay={i * 0.1} variant="clarity" />
          ))}
        </div>
      </div>
    </section>
  );
}
