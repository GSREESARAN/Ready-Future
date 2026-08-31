import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useParallax } from "@/hooks/useParallax";
import { CompassIcon, PeopleIcon, BulbIcon, SparkIcon, LogoMark } from "@/components/ui/Icons";

// the journey path the badges sit on — starts near "Explore" (top),
// sweeps down through the left side (where the old circle layout left a
// dead gap), ends at "Discover" (bottom right)
const PATH_D = "M 400 40 C 220 60, 85 145, 105 260 C 130 380, 320 460, 470 400";

export function Hero() {
  const sectionRef = useRef(null);
  const decorRef = useRef(null);
  const primary = useMagnetic(0.25);
  const outline = useMagnetic(0.25);
  const { ref: primaryRef, style: primaryStyle, onMouseMove: primaryOnMouseMove, onMouseLeave: primaryOnMouseLeave } = primary;
  const { ref: outlineRef, style: outlineStyle, onMouseMove: outlineOnMouseMove, onMouseLeave: outlineOnMouseLeave } = outline;
  const glowRef = useParallax(26);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(".hero-word", { opacity: 1, y: 0, duration: 0.5, stagger: 0.07 })
        .fromTo(".hero-headline-underline path", { strokeDashoffset: 300 }, { strokeDashoffset: 0, duration: 0.6 }, "-=0.2")
        .to(".hero-sub", { opacity: 1, y: 0, duration: 0.45 }, "-=0.3")
        .to(".hero-cta-row > *", { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "back.out(1.7)" }, "-=0.15")
        .to(".hero-decor", { opacity: 1, duration: 0.6 }, "-=0.3")
        .fromTo(".hero-logo-ring", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.8)" }, "-=0.5")
        .to(".hero-logo-big", { scale: 1, rotate: -6, duration: 0.6, ease: "back.out(1.6)" }, "-=0.45")
        .fromTo(".hero-path", { strokeDashoffset: 900 }, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, "-=0.5")
        .fromTo(".hero-path-arrowhead", { opacity: 0 }, { opacity: 1, duration: 0.2 }, "-=0.15")
        .to(".hero-node", { scale: 1, duration: 0.35, stagger: 0.12, ease: "back.out(2)" }, "-=0.6");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ambient tilt on the decor card, following the cursor anywhere in the
  // hero — not just on direct hover — for a subtly "alive" feel
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const section = sectionRef.current;
    const decor = decorRef.current;
    if (reduceMotion || isTouch || !section || !decor) return;

    const setRX = gsap.quickTo(decor, "rotationX", { duration: 0.7, ease: "power3.out" });
    const setRY = gsap.quickTo(decor, "rotationY", { duration: 0.7, ease: "power3.out" });

    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      setRX(py * -4);
      setRY(px * 5);
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
    <section id="top" aria-label="Introduction" className="hero" ref={sectionRef} data-nav-theme="light">
      <div ref={glowRef} className="hero-glow hero-glow--a" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy">
          <h1 className="hero-h1">
            <span className="hero-word">Stop</span> <span className="hero-word">guessing.</span>
            <br />
            <span className="hero-word">Start</span>{" "}
            <span className="hero-word hero-word--underline">
              experiencing.
              <svg className="hero-headline-underline" viewBox="0 0 300 18" preserveAspectRatio="none" aria-hidden="true">
                <path d="M4 10 C 60 2, 130 16, 190 8 S 280 2, 296 9" fill="none" stroke="#EE5B24" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="hero-sub">
            Students step into real workplaces, meet real professionals and try real work, long
            before they have to choose a path.
          </p>

          <div className="hero-cta-row">
            <motion.a
              ref={primaryRef}
              href="#programs"
              style={primaryStyle}
              onMouseMove={primaryOnMouseMove}
              onMouseLeave={primaryOnMouseLeave}
              className="btn btn-primary"
            >
              Explore Programs
            </motion.a>
            <motion.a
              ref={outlineRef}
              href="#contact"
              style={outlineStyle}
              onMouseMove={outlineOnMouseMove}
              onMouseLeave={outlineOnMouseLeave}
              className="btn btn-outline"
            >
              Partner With Us
            </motion.a>
          </div>
        </div>

        <div ref={decorRef} className="hero-decor" aria-hidden="true">
          <div className="hero-blob hero-blob--a" />
          <div className="hero-blob hero-blob--b" />

          <svg className="hero-path-svg" viewBox="0 0 540 520">
            <path className="hero-path" d={PATH_D} fill="none" stroke="#E7B896" strokeWidth="2.5" strokeDasharray="7 8" strokeLinecap="round" />
            <path className="hero-path-arrowhead" d="M 458 384 L 480 398 L 456 412 Z" />
            <circle className="hero-node" cx="400" cy="46" r="5" fill="#EE5B24" />
            <circle className="hero-node" cx="108" cy="262" r="5" fill="#1E8F62" />
            <circle className="hero-node" cx="468" cy="398" r="5" fill="#EE5B24" />
          </svg>

          <div className="hero-logo-ring" />
          <div className="hero-logo-big">
            <LogoMark size={168} />
          </div>
          <div className="hero-grain" />

          <div className="hero-sparkle hero-sparkle--a">
            <SparkIcon size={20} color="#FFF6E8" />
          </div>
          <div className="hero-sparkle hero-sparkle--b">
            <SparkIcon size={13} color="#FFF6E8" />
          </div>
          <div className="hero-sparkle hero-sparkle--c">
            <SparkIcon size={11} color="#FFF6E8" />
          </div>

          <div className="hero-caption">3 steps. 1 real path.</div>

          <div className="hero-badge hero-badge--a hero-badge--orange">
            <CompassIcon size={20} />
            <span>Explore</span>
          </div>
          <div className="hero-badge hero-badge--b hero-badge--green">
            <PeopleIcon size={20} />
            <span>Experience</span>
          </div>
          <div className="hero-badge hero-badge--c hero-badge--orange">
            <BulbIcon size={20} />
            <span>Discover</span>
          </div>
        </div>
      </div>
    </section>
  );
}
