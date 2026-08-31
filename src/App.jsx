import "./styles/app.css";
import { Analytics } from "@vercel/analytics/react";
import { IntroOverlay } from "@/components/IntroOverlay";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { Marquee } from "@/components/sections/Marquee";
import { Process } from "@/components/sections/Process";
import { WhyItMatters } from "@/components/sections/WhyItMatters";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <IntroOverlay />
      <CustomCursor />
      <div className="grain-overlay" aria-hidden="true" />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Problem />
        <WhatWeDo />
        <Marquee />
        <Process />
        <WhyItMatters />
        <ClosingCTA />
      </main>
      <Footer />
      <Analytics />
    </>
  );
}
