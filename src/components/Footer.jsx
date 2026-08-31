import { LogoMark } from "@/components/ui/Icons";
import { useReveal } from "@/hooks/useReveal";

const links = [
  { label: "Programs", href: "#programs" },
  { label: "Process", href: "#process" },
  { label: "Why READY", href: "#why" },
  { label: "Contact", href: "#contact" },
];

const goTo = (href) => (e) => {
  e.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export function Footer() {
  const innerRef = useReveal({ distance: 20 });
  const bottomRef = useReveal({ distance: 14, delay: 0.1 });

  return (
    <footer className="footer">
      <div ref={innerRef} className="footer-inner">
        <div className="footer-brand">
          <div className="footer-brand-row">
            <LogoMark size={30} />
            <span className="footer-wordmark">READY</span>
          </div>
          <span className="footer-tagline">Future Skills For Children</span>
        </div>

        <nav aria-label="Footer" className="footer-links">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={goTo(link.href)}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div ref={bottomRef} className="footer-bottom">
        <span>© {new Date().getFullYear()} READY. Career readiness for students.</span>
      </div>
    </footer>
  );
}
