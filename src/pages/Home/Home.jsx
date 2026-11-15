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

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.7);
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

  return (
    <UserProvider>
      <main className="final-site">
        {/* Full-page fixed scroll-scrubbing video background */}
        <ScrollVideoCanvas
          videoSrc="/videos/hero-scroll.mp4"
          triggerSelector=".final-site"
        />

        <div className="final-content-layer">
          <nav className="final-nav" aria-label="Primary navigation">
            <Link className="final-logo" to="/">
              SG<span>•</span>
            </Link>
            <div>
              <a href="#field-notes">About</a>
              <a href="#notes">Articles</a>
              <a href="#contact">Contact</a>
              <a href="#notes">My works</a>
            </div>
          </nav>

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