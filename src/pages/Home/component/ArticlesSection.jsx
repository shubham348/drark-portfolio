import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ArrowLeft from "lucide-react/icons/arrow-left";
import ArrowRight from "lucide-react/icons/arrow-right";
import ArrowUpRight from "lucide-react/icons/arrow-up-right";
import gsap from "gsap";
import UserContext from "../../../context/UserContext";
import "./articleSection.scss"

const fallback = [
  "Building a scalable UI system from scratch",
  "Rethinking component APIs for modern design systems",
  "Performance wins that compound across large React apps",
  "Design tokens in practice: bridging Figma and production",
  "A simpler approach to client-side state management",
  "Making UI accessible by default without slowing down",
  "From Figma to production: pixel-perfect workflows",
  "How I structure a production-ready React project",
  "Small micro-interactions, bigger user experience",
  "Lessons learned from shipping 10+ frontend builds",
];

// Extracts the first image URL from Medium RSS HTML content/description
function extractArticleImage(article, index) {
  if (article?.thumbnail && article.thumbnail.startsWith("http")) {
    return article.thumbnail;
  }
  const html = article?.content || article?.description || "";
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (match && match[1]) {
    return match[1];
  }

  // Fallback brutalist SVG cover using your exact color palette if no image exists
  const palettes = [
    { bg: "%23a91d24", accent: "%23d99b52", ring: "%23f8dfba" },
    { bg: "%236e0f14", accent: "%23f8dfba", ring: "%23d99b52" },
    { bg: "%232b2523", accent: "%23d93232", ring: "%23f8dfba" },
    { bg: "%23b83634", accent: "%23fff9ef", ring: "%23171515" },
  ];
  const p = palettes[index % palettes.length];
  const num = String(index + 1).padStart(2, "0");

  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
    <rect width="800" height="450" fill="${p.bg}"/>
    <circle cx="650" cy="225" r="160" fill="none" stroke="${p.ring}" stroke-width="3" stroke-dasharray="10 8" opacity="0.5"/>
    <circle cx="650" cy="225" r="95" fill="${p.accent}" opacity="0.85"/>
    <path d="M 60 380 L 740 380" stroke="${p.ring}" stroke-width="2" opacity="0.3"/>
    <text x="60" y="130" font-family="Inter, sans-serif" font-weight="900" font-size="96" fill="${p.ring}" opacity="0.18">NOTE // ${num}</text>
    <rect x="60" y="330" width="110" height="12" fill="${p.accent}"/>
  </svg>`;
}

export default function ArticlesSection() {
  const { articles, userData, isLoading } = useContext(UserContext);

  const items = articles?.length
    ? articles.slice(0, 10)
    : fallback.map((title, index) => ({
        title,
        guid: `#article-${index + 1}`,
        pubDate: "2026",
      }));

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    skipSnaps: false,
  });

  const [selected, setSelected] = useState(0);
  const stageRef = useRef(null);

  const onSelect = useCallback((api) => {
    const idx = api.selectedScrollSnap();
    setSelected(idx);

    // Subtle GSAP brutalist pop animation when active card settles
    if (stageRef.current) {
      const activeSlide = stageRef.current.querySelector(
        `.brutal-slide[data-index="${idx}"] .brutal-folder-card`
      );
      if (activeSlide) {
        gsap.fromTo(
          activeSlide,
          { y: 8, scale: 0.985 },
          { y: 0, scale: 1, duration: 0.35, ease: "back.out(2)" }
        );
      }
    }
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, onSelect]);

  const progressPercent = ((selected + 1) / items.length) * 100;

  return (
    <section className="final-section articles" id="notes">
      <header className="section-intro">
        <p>02 / Articles</p>
        <h2>ARTICLES</h2>
        <span>
          Notes on frontend, interfaces, and building for the web — from design
          systems to performance and accessibility.
        </span>
      </header>

      {isLoading ? (
        <div className="brutal-loading">LOADING ARCHIVE // …</div>
      ) : (
        <div className="brutal-showcase" ref={stageRef}>
          {/* Single-Card Embla Viewport */}
          <div className="brutal-viewport" ref={emblaRef}>
            <div className="brutal-track">
              {items.map((article, index) => {
                const indexStr = String(index + 1).padStart(2, "0");
                const coverUrl = extractArticleImage(article, index);
                const isSelected = index === selected;

                return (
                  <div
                    className={`brutal-slide ${isSelected ? "is-active" : ""}`}
                    data-index={index}
                    key={article.guid || index}
                  >
                    <a
                      className="brutal-folder-wrap"
                      href={article.guid || userData?.mediumLink || "#notes"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {/* Top Brutalist Folder Tab */}
                      <div className="brutal-folder-tab">
                        <span className="tab-dot" />
                        <span>ARTICLE // {indexStr}</span>
                      </div>

                      {/* Main Neo-Shadow Card Body */}
                      <article className="brutal-folder-card">
                        {/* Cover Image Frame */}
                        <div className="brutal-image-box">
                          <img
                            src={coverUrl}
                            alt={article.title}
                            loading="lazy"
                          />
                          <span className="brutal-tag">READ NOTE</span>
                        </div>

                        {/* Bottom Bar: Locked 2-Line Title + Action Corner */}
                        <div className="brutal-card-footer">
                          <h3 className="brutal-title" title={article.title}>
                            {article.title}
                          </h3>
                          <span className="brutal-arrow-box" aria-hidden="true">
                            <ArrowUpRight size={24} strokeWidth={2.5} />
                          </span>
                        </div>
                      </article>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Controls + Progress Bar + Dedicated View More Button */}
          <div className="brutal-bottom-bar">
            <div className="brutal-nav-group">
              <button
                type="button"
                className="brutal-nav-btn"
                onClick={() => emblaApi?.scrollPrev()}
                aria-label="Previous article"
              >
                <ArrowLeft size={20} strokeWidth={2.5} />
              </button>

              <div className="brutal-counter">
                <span className="brutal-count-text">
                  {String(selected + 1).padStart(2, "0")} /{" "}
                  {String(items.length).padStart(2, "0")}
                </span>
                <div className="brutal-progress-rail">
                  <div
                    className="brutal-progress-fill"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <button
                type="button"
                className="brutal-nav-btn"
                onClick={() => emblaApi?.scrollNext()}
                aria-label="Next article"
              >
                <ArrowRight size={20} strokeWidth={2.5} />
              </button>
            </div>

            <a
              className="brutal-view-more-btn"
              href={userData?.mediumLink || "https://medium.com"}
              target="_blank"
              rel="noreferrer"
            >
              <span>VIEW MORE ARTICLES</span>
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      )}
    </section>
  );
}