import React from "react";
import ArrowDown from "lucide-react/icons/arrow-down";
import portrait from "../../../assets/images/shubham-portrait.png";
const Stars = () => (
  <div className="final-stars" aria-hidden="true">
    {Array.from({ length: 16 }, (_, i) => (
      <i key={i} />
    ))}
  </div>
);
export default function HeroSection() {
  return (
    <section className="final-hero" id="top">
      <Stars />
      <div className="hero-copy">
        <p className="final-label">Frontend developer / India</p>
        <h1>
          SHUBHAM
          <br />
          <strong>GUPTA</strong>
        </h1>
        <p className="hero-role">
          FRONTEND DEVELOPER <span>/</span> INTERFACE BUILDER
        </p>
        <p className="hero-stack">
          REACT <span>/</span> UI SYSTEMS <span>/</span> PERFORMANCE
        </p>
      </div>
      <div className="hero-art">
        <span className="orbit orbit-a" />
        <span className="orbit orbit-b" />
        <img src={portrait} alt="Illustrated portrait of Shubham Gupta" />
      </div>
      <a
        className="scroll-cue"
        href="#field-notes"
        aria-label="Scroll to Field Notes"
      >
        <ArrowDown size={20} />
      </a>
    </section>
  );
}
