import React, { useCallback, useContext, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ArrowLeft from "lucide-react/icons/arrow-left";
import ArrowRight from "lucide-react/icons/arrow-right";
import UserContext from "../../../context/UserContext";
import { extractFirstParagraphText } from "../../../utils/getDataFromHtml";

const fallback = [
  "Building a scalable UI system from scratch",
  "Rethinking component APIs",
  "Performance wins that compound",
  "Design tokens in practice",
  "A simpler approach to state",
  "Making UI accessible by default",
  "From Figma to production",
  "How I structure a React project",
  "Small details, bigger experience",
  "Lessons from 10+ builds",
];

export default function ArticlesSection() {
  const { articles, userData, isLoading } = useContext(UserContext);
  const items = articles.length
    ? articles.slice(0, 10)
    : fallback.map((title, index) => ({
        title,
        guid: `#article-${index + 1}`,
      }));
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
  });
  const [selected, setSelected] = useState(0);
  const onSelect = useCallback(
    (api) => setSelected(api.selectedScrollSnap()),
    [],
  );
  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, onSelect]);

  const slides = [...items, { viewMore: true }];
  
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
        <p>Loading articles…</p>
      ) : (
        <>
          <div className="article-slider" ref={emblaRef}>
            <div className="article-track">
              {slides.map((article, index) =>
                article.viewMore ? (
                  <a
                    className="view-more article-slide"
                    href={userData?.mediumLink}
                    target="_blank"
                    rel="noreferrer"
                    key="view-more"
                  >
                    View more
                  </a>
                ) : (
                  <a
                    className={`article-card article-slide ${index === 0 ? "feature" : ""}`}
                    href={article.guid || userData?.mediumLink}
                    target="_blank"
                    rel="noreferrer"
                    key={article.guid || index}
                  >
                    <h3>{article.title}</h3>
                    <p>
                      {(
                        extractFirstParagraphText(article.content) ||
                        article.description ||
                        "Practical notes on building clearer, faster, and more resilient interfaces."
                      )
                        .replace(/\s+/g, " ")
                        .trim()
                        .slice(0, 120)}
                      …
                    </p>
                  </a>
                ),
              )}
            </div>
          </div>
          <div className="article-controls">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={selected === 0}
              aria-label="Previous articles"
            >
              <ArrowLeft size={18} />
            </button>
            <span>
              {String(Math.min(selected + 1, slides.length)).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              disabled={selected >= slides.length - 1}
              aria-label="Next articles"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </>
      )}
    </section>
  );
}
