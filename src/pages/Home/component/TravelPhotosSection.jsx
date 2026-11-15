import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import ArrowLeft from "lucide-react/icons/arrow-left";
import ArrowRight from "lucide-react/icons/arrow-right";
import ArrowUpRight from "lucide-react/icons/arrow-up-right";
import Pause from "lucide-react/icons/pause";
import Play from "lucide-react/icons/play";
import "./travelPhotos.scss";

const GOOGLE_PHOTOS_ALBUM_URL = "https://photos.app.goo.gl/3g6k1Z7v5y8Q9x2A9";

let cachedAlbumPhotos = null;
let inflightPromise = null;

async function fetchAlbumPhotos() {
  if (cachedAlbumPhotos) return cachedAlbumPhotos;
  if (inflightPromise) return inflightPromise;

  inflightPromise = fetch("/.netlify/functions/travel-photos")
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      if (!data.success || !data.photos?.length) {
        throw new Error("No photos returned from Google Photos");
      }

      cachedAlbumPhotos = data.photos;
      return cachedAlbumPhotos;
    })
    .catch((error) => {
      console.error("Travel photos loading failed:", error);
      inflightPromise = null;
      return [];
    });

  return inflightPromise;
}

export default function TravelPhotosSection() {
  const [photos, setPhotos] = useState(cachedAlbumPhotos || []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const cardsRef = useRef([]);
  const progressFillRef = useRef(null);
  const autoplayTweenRef = useRef(null);
  const stageRef = useRef(null);

  const AUTOPLAY_SECONDS = 3.8;

  useEffect(() => {
    let isMounted = true;

    fetchAlbumPhotos().then((list) => {
      if (isMounted && list.length > 0) {
        setPhotos(list);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const total = photos.length;

  const goNext = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // GSAP 3D Stacked Deck Animation whenever activeIndex or photos change
  useEffect(() => {
    if (total === 0 || !cardsRef.current.length) return;

    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      const offset = index;

      if (offset === 0) {
        gsap.to(card, {
          xPercent: 0,
          y: 0,
          scale: 1,
          rotationZ: 0,
          rotationY: 0,
          opacity: 1,
          zIndex: 10,
          filter: "brightness(1) blur(0px)",
          duration: 0.75,
          ease: "power3.out",
          overwrite: "auto",
        });
      } else if (offset === 1 && total > 1) {
        gsap.to(card, {
          xPercent: 7,
          y: 16,
          scale: 0.92,
          rotationZ: 3.5,
          rotationY: -6,
          opacity: 0.78,
          zIndex: 9,
          filter: "brightness(0.85) blur(0.5px)",
          duration: 0.75,
          ease: "power3.out",
          overwrite: "auto",
        });
      } else if (offset === 2 && total > 2) {
        gsap.to(card, {
          xPercent: 13,
          y: 32,
          scale: 0.84,
          rotationZ: 6.5,
          rotationY: -10,
          opacity: 0.45,
          zIndex: 8,
          filter: "brightness(0.7) blur(1.5px)",
          duration: 0.75,
          ease: "power3.out",
          overwrite: "auto",
        });
      } else if (offset === 3 && total > 3) {
        gsap.to(card, {
          xPercent: -16,
          y: 12,
          scale: 0.88,
          rotationZ: -5,
          rotationY: 8,
          opacity: 0,
          zIndex: 7,
          filter: "brightness(0.7) blur(4px)",
          duration: 0.65,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else {
        gsap.to(card, {
          xPercent: 0,
          y: 40,
          scale: 0.78,
          rotationZ: 0,
          opacity: 0,
          zIndex: 1,
          duration: 0.5,
          overwrite: "auto",
        });
      }
    });
  }, [activeIndex, total]);

  // GSAP Autoplay Timer Bar + Slide Advance
  useEffect(() => {
    if (total === 0) return;

    if (autoplayTweenRef.current) {
      autoplayTweenRef.current.kill();
    }
    if (!progressFillRef.current) return;

    gsap.set(progressFillRef.current, {
      scaleX: 0,
      transformOrigin: "left center",
    });

    if (!isPaused) {
      autoplayTweenRef.current = gsap.to(progressFillRef.current, {
        scaleX: 1,
        duration: AUTOPLAY_SECONDS,
        ease: "none",
        onComplete: goNext,
      });
    }

    return () => {
      if (autoplayTweenRef.current) autoplayTweenRef.current.kill();
    };
  }, [activeIndex, isPaused, goNext, total]);

  const handleMouseMove = (e) => {
    const activeCard = cardsRef.current[activeIndex];
    if (!activeCard || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(activeCard, {
      rotationY: x * 10,
      rotationX: -y * 10,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    const activeCard = cardsRef.current[activeIndex];
    if (!activeCard) return;
    gsap.to(activeCard, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  };

  if (total === 0) {
    return null;
  }

  return (
    <section className="final-section travel-section" id="travel">
      <header className="section-intro">
        <p>04 / Visual Log</p>
        <h2>TRAVEL SHOTS</h2>
        <span>
          Moments captured on the road — auto-playing from my Google Photos
          album.
        </span>
      </header>

      <div className="travel-deck-wrap">
        <div
          className="travel-deck-stage"
          ref={stageRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={goNext}
        >
          {Array.from({ length: Math.min(total, 4) }, (_, offset) => {
            const photoIndex =
              offset === 3 && total > 3
                ? (activeIndex - 1 + total) % total
                : (activeIndex + offset) % total;

            const imgUrl = photos[photoIndex];

            return (
              <div
                className="travel-card"
                key={offset}
                ref={(el) => (cardsRef.current[offset] = el)}
              >
                <div className="travel-card-inner">
                  <img className="travel-card-bg" src={imgUrl} alt="" />

                  <img
                    src={imgUrl}
                    alt={`Travel frame ${photoIndex + 1}`}
                    loading="eager"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="travel-card-main"
                  />

                  <div className="travel-card-badge">
                    <span className="live-dot" />
                    <span>
                      FRAME // {String(photoIndex + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="travel-controls-bar">
          <div className="travel-nav-left">
            <button
              type="button"
              className="travel-icon-btn"
              onClick={goPrev}
              aria-label="Previous photo"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              type="button"
              className="travel-icon-btn"
              onClick={() => setIsPaused((p) => !p)}
              aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
            >
              {isPaused ? <Play size={17} /> : <Pause size={17} />}
            </button>

            <button
              type="button"
              className="travel-icon-btn"
              onClick={goNext}
              aria-label="Next photo"
            >
              <ArrowRight size={18} />
            </button>

            <div className="travel-timer-box">
              <span className="travel-count">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </span>
              <div className="travel-timer-rail">
                <div ref={progressFillRef} className="travel-timer-fill" />
              </div>
            </div>
          </div>

          <a
            className="travel-album-btn"
            href={GOOGLE_PHOTOS_ALBUM_URL}
            target="_blank"
            rel="noreferrer"
          >
            <span>VIEW GOOGLE ALBUM</span>
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
