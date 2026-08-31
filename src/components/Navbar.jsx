import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrolled } from "@/hooks/useScrolled";
import { useSectionTheme } from "@/hooks/useSectionTheme";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useMagnetic } from "@/hooks/useMagnetic";
import { LogoMark } from "@/components/ui/Icons";
import { LetterSwap } from "@/components/ui/LetterSwap";

const NAV_HEIGHT = 76;
const links = [
  { label: "Programs", href: "#programs" },
  { label: "Process", href: "#process" },
  { label: "Why READY", href: "#why" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const scrolled = useScrolled(40);
  const sectionTheme = useSectionTheme(NAV_HEIGHT);
  const progress = useScrollProgress();
  const magnet = useMagnetic(0.3);
  const { ref: magnetRef, style: magnetStyle, onMouseMove: magnetOnMouseMove, onMouseLeave: magnetOnMouseLeave } = magnet;
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const dark = sectionTheme === "dark";

  const goTo = (href) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className={`navbar navbar-in ${scrolled || menuOpen ? "is-scrolled" : ""} ${dark ? "is-dark" : ""}`}>
      <div className="navbar-progress" style={{ transform: `scaleX(${progress / 100})` }} />

      <div className="navbar-inner">
        <a href="#top" className="navbar-brand" onClick={goTo("#top")}>
          <LogoMark className="navbar-logo-mark" />
          <span className="navbar-wordmark">READY</span>
        </a>

        <nav aria-label="Primary" className="navbar-links" onMouseLeave={() => setHoveredLink(null)}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              onMouseEnter={() => setHoveredLink(link.href)}
              onClick={goTo(link.href)}
            >
              {hoveredLink === link.href && (
                <motion.span
                  layoutId="nav-hover-pill"
                  className="nav-hover-pill"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="nav-link-text">
                <LetterSwap label={link.label} />
              </span>
            </a>
          ))}
        </nav>

        <div className="navbar-actions">
          <motion.a
            ref={magnetRef}
            href="#contact"
            style={magnetStyle}
            onMouseMove={magnetOnMouseMove}
            onMouseLeave={magnetOnMouseLeave}
            onClick={goTo("#contact")}
            className="btn btn-primary navbar-cta"
          >
            Partner With Us
          </motion.a>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="navbar-toggle"
          >
            <span className={`navbar-toggle-bars${menuOpen ? " is-open" : ""}`}>
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            className="navbar-mobile"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={goTo(link.href)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.06, duration: 0.3 }}
                className="navbar-mobile-link"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={goTo("#contact")}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + links.length * 0.06, duration: 0.3 }}
              className="btn btn-primary navbar-mobile-cta"
            >
              Partner With Us
            </motion.a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
