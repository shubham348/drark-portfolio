import React, { useEffect, useState } from "react";
import ArrowUp from "lucide-react/icons/arrow-up";
import { Link } from "react-router-dom";
import { UserProvider } from "../../context/UserContext";
import ScrollVideoCanvas from "./component/ScrollVideoCanvas";
import HeroSection from "./component/HeroSection";
import FieldNotesSection from "./component/FieldNotesSection";
import ArticlesSection from "./component/ArticlesSection";
import AboutSection from "./component/AboutSection";
import ContactSection from "./component/ContactSection";
import TravelPhotosSection from "./component/TravelPhotosSection";
import "./home.scss";

export default function Home() {
  const [showTop, setShowTop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
      setShowTop(window.scrollY > window.innerHeight * 0.7);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    if (window.__lenis) {
      window.__lenis.scrollTo(targetId, { offset: -80 });
    } else {
      document.querySelector(targetId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <UserProvider>
      <main className="final-site">
        {/* Full-page fixed scroll-scrubbing video background */}
        <ScrollVideoCanvas
          videoSrc="/videos/hero-scroll.mp4"
          triggerSelector=".final-site"
        />

        {/* Fixed Navigation Bar */}
        <nav
          className={`final-nav ${isScrolled ? "scrolled" : ""}`}
          aria-label="Primary navigation"
        >
          <Link className="final-logo" to="/" onClick={handleScrollToTop}>
            SG<span>•</span>
          </Link>
          <div>
            <a href="#field-notes" onClick={(e) => handleNavClick(e, "#field-notes")}>
              Field Notes
            </a>
                <a href="#about" onClick={(e) => handleNavClick(e, "#about")}>
              About
            </a>
            <a href="#notes" onClick={(e) => handleNavClick(e, "#notes")}>
              Articles
            </a>
            <a href="#travel" onClick={(e) => handleNavClick(e, "#travel")}>
              Travel
            </a>
            <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>
              Contact
            </a>
          </div>
        </nav>

        <div className="final-content-layer">
          <HeroSection />
          <FieldNotesSection />
          <ArticlesSection />
          <AboutSection />
          <TravelPhotosSection />
          <ContactSection />
        </div>

        <button
          className={`to-top ${showTop ? "visible" : ""}`}
          onClick={handleScrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      </main>
    </UserProvider>
  );
}