import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReveal } from "@/hooks/useReveal";
import { useWordReveal } from "@/hooks/useWordReveal";
import { useParallax } from "@/hooks/useParallax";
import { useMagnetic } from "@/hooks/useMagnetic";
import { MailIcon, PhoneIcon, SparkIcon } from "@/components/ui/Icons";

gsap.registerPlugin(ScrollTrigger);

const goTo = (href) => (e) => {
  e.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export function ClosingCTA() {
  const pillRef = useReveal({ distance: 14 });
  const subRef = useReveal({ distance: 14, delay: 0.32 });
  const rowRef = useReveal({ distance: 14, delay: 0.42 });
  const pathsRef = useReveal({ delay: 0.15, distance: 20 });
  const magnet = useMagnetic(0.28);
  const { ref: magnetRef, style: magnetStyle, onMouseMove: magnetOnMouseMove, onMouseLeave: magnetOnMouseLeave } = magnet;
  const glowRefA = useParallax(22);
  const glowRefB = useParallax(-26);
  const h2Ref = useWordReveal({ delay: 0.12 });
  const dividerRef = useRef(null);

  useEffect(() => {
    if (!dividerRef.current) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        dividerRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: dividerRef.current,
            start: "top 90%",
            toggleActions: "restart none restart none",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" aria-label="Contact" className="closing" data-nav-theme="dark" data-cursor-dark>
      <div ref={glowRefA} className="closing-glow" aria-hidden="true" />
      <div ref={glowRefB} className="closing-glow closing-glow--b" aria-hidden="true" />
      <div className="closing-ring" aria-hidden="true" />
      <div className="closing-ring closing-ring--inner" aria-hidden="true" />
      <div className="closing-sparkle closing-sparkle--a" aria-hidden="true">
        <SparkIcon size={18} color="#FFF6E8" />
      </div>
      <div className="closing-sparkle closing-sparkle--b" aria-hidden="true">
        <SparkIcon size={12} color="#FFF6E8" />
      </div>
      <div className="closing-sparkle closing-sparkle--c" aria-hidden="true">
        <SparkIcon size={14} color="#FFF6E8" />
      </div>

      <div className="closing-inner">
        <span ref={pillRef} className="pill pill--ghost">Let's Shape Tomorrow, Together</span>
        <h2 ref={h2Ref} className="h2 closing-h2">Let's make it real.</h2>
        <p ref={subRef} className="closing-sub">
          Students who are better prepared build a better future, for themselves and everyone
          around them.
        </p>
        <div id="get-in-touch" ref={rowRef} className="closing-row">
          <a href="mailto:readyfutureskills@gmail.com" className="chip">
            <MailIcon />
            readyfutureskills@gmail.com
          </a>
          <a href="tel:+918121427231" className="chip">
            <PhoneIcon />
            +91 81214 27231
          </a>
          <motion.a
            ref={magnetRef}
            href="mailto:readyfutureskills@gmail.com"
            style={magnetStyle}
            onMouseMove={magnetOnMouseMove}
            onMouseLeave={magnetOnMouseLeave}
            className="btn btn-primary cta-pulse"
          >
            Get In Touch
          </motion.a>
        </div>
      </div>

      <div ref={dividerRef} className="closing-divider" aria-hidden="true" />

      <div ref={pathsRef} className="closing-paths">
        <div className="closing-path-card">
          <h3 className="closing-path-title">Students &amp; Families</h3>
          <p className="closing-path-text">
            See what a real workday feels like before you have to choose a path.
          </p>
          <a href="#programs" onClick={goTo("#programs")} className="closing-path-link">
            Explore Programs →
          </a>
        </div>
        <div className="closing-path-card closing-path-card--green">
          <h3 className="closing-path-title">Schools &amp; Partners</h3>
          <p className="closing-path-text">
            Bring real-world exposure to your students, or collaborate with us directly.
          </p>
          <a href="#get-in-touch" onClick={goTo("#get-in-touch")} className="closing-path-link">
            Partner With Us →
          </a>
        </div>
      </div>
    </section>
  );
}
