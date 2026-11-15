import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollVideoCanvas({
  videoSrc = "/vedios/hero-scroll.mp4", // keep /vedios/ or /videos/ matching your public folder
  triggerSelector = ".final-site",
}) {
  const videoRef = useRef(null);
  const bgWrapperRef = useRef(null);

  useEffect(() => {
    // 1. Setup Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tickerUpdate = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    const video = videoRef.current;
    const bgWrapper = bgWrapperRef.current;
    const triggerEl = document.querySelector(triggerSelector);
    if (!video || !bgWrapper || !triggerEl) return;

    let tl;

    const setupScrollTimeline = () => {
      if (tl) tl.kill();

      const duration = video.duration || 10;
      const playhead = { frameTime: 0 };

      video.pause();
      video.currentTime = 0;

      // Create master timeline tied to the FULL height of .final-site
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6, // Smooth catch-up
          invalidateOnRefresh: true,
        },
      });

      /* 
       * KEY FIX: Stretch the active portrait transformation (0s -> 5.2s of the video)
       * across 85% of the entire website scroll (Hero -> Field Notes -> Articles -> About),
       * and play the settled monolith (5.2s -> end) in the final 15% (Contact section).
       */
      tl.to(
        playhead,
        {
          keyframes: [
            // Hero Section (0% -> 25% of page scroll): Portrait & Orbits begin shifting (0s -> 1.8s)
            { frameTime: Math.min(1.8, duration), duration: 0.25, ease: "none" },
            // Field Notes & Articles (25% -> 65% of page scroll): Face shatters in mid-air (1.8s -> 3.6s)
            { frameTime: Math.min(3.6, duration), duration: 0.40, ease: "none" },
            // About Section (65% -> 85% of page scroll): Geometric blocks assemble (3.6s -> 5.2s)
            { frameTime: Math.min(5.2, duration), duration: 0.20, ease: "none" },
            // Contact Section (85% -> 100% of page scroll): Final 3D Monolith settles (5.2s -> duration)
            { frameTime: Math.max(duration - 0.1, 5.2), duration: 0.15, ease: "none" },
          ],
          onUpdate: () => {
            if (video.readyState >= 2) {
              video.currentTime = playhead.frameTime;
            }
          },
        },
        0
      );

      // Sync the left-side background color to match the remapped video timestamps
      tl.to(
        bgWrapper,
        {
          keyframes: [
            { backgroundColor: "#a91d24", duration: 0.25, ease: "none" }, // Deep red while in Hero
            { backgroundColor: "#b83634", duration: 0.30, ease: "none" }, // Warm crimson in Field Notes
            { backgroundColor: "#cf6c59", duration: 0.25, ease: "none" }, // Coral transition in Articles/About
            { backgroundColor: "#d67e67", duration: 0.20, ease: "none" }, // Terracotta salmon in Contact
          ],
        },
        0
      );

      ScrollTrigger.refresh();
    };

    if (video.readyState >= 1) {
      setupScrollTimeline();
    } else {
      video.addEventListener("loadedmetadata", setupScrollTimeline, {
        once: true,
      });
    }

    // 2. Automatically recalculate scroll height whenever Articles or DOM content changes height
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(triggerEl);

    return () => {
      window.__lenis = null;
      resizeObserver.disconnect();
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      if (tl) tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [triggerSelector]);

  return (
    <div ref={bgWrapperRef} className="scroll-video-stage" aria-hidden="true">
      <div className="scroll-video-frame">
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload="auto"
          className="scroll-video-el"
        />
      </div>
    </div>
  );
}