import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { LogoMark } from "@/components/ui/Icons";
import { ScrambleText } from "@/components/ui/ScrambleText";

/** A brief branded beat before the page settles in. */
export function IntroOverlay() {
  const [visible, setVisible] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const overlayRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    if (!overlayRef.current || !logoRef.current) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = prevOverflow;
        setVisible(false);
      },
    });
    tl.set(logoRef.current, { opacity: 0, scale: 0.7, rotate: -8 })
      .to(logoRef.current, { opacity: 1, scale: 1, rotate: 0, duration: 0.55, ease: "back.out(1.8)" })
      .to(logoRef.current, { scale: 1.06, duration: 0.25, ease: "power1.inOut" }, "+=0.15")
      .to(overlayRef.current, { opacity: 0, duration: 0.5, ease: "power2.inOut" }, "+=0.7");

    return () => {
      tl.kill();
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <div ref={overlayRef} aria-hidden="true" className="intro-overlay">
      <div ref={logoRef} className="intro-mark">
        <div className="intro-logo-wrap">
          <LogoMark size={68} />
          <div className="intro-shine" />
        </div>
        <ScrambleText text="READY" className="intro-wordmark" />
        <span className="intro-tagline">Future Skills For Children</span>
      </div>
    </div>
  );
}
