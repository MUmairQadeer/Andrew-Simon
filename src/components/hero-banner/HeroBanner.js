import { useEffect } from "react";
import "./HeroBanner.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";
import BgVideo from "./bg-video.mp4";

gsap.registerPlugin(ScrollTrigger);

export default function HeroBanner() {
  // Determine which headline to show based on screen size
  const [isTablet, setIsTablet] = useState(
    window.matchMedia("(min-width: 620px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 620px)");
    const handleChange = (e) => setIsTablet(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const splitTextIntoChars = (element) => {
    const text = element.textContent;
    element.innerHTML = "";
    const words = text.split(" ");
    const spans = [];
    words.forEach((word, idx) => {
      const span = document.createElement("span");
      span.textContent = word;
      span.style.display = "inline-block";
      span.style.opacity = 0;
      span.style.transform = "translateY(100px) rotateX(90deg)";
      element.appendChild(span);
      spans.push(span);
      if (idx < words.length - 1) {
        element.appendChild(document.createTextNode("\u00A0"));
      }
    });
    return spans;
  };

  const startHeroAnimation = () => {
    // Hero section elements
    const heroVideo = document.querySelector(".hero-video");
    const headlineLines = document.querySelectorAll(
      ".hero-headline .headline-line"
    );
    const heroCta = document.querySelector(".hero-cta");

    const tl = gsap.timeline({ defaults: { ease: "back.out(1.7)" } });
    const heroHeadline = document.querySelector(".hero-headline");

    gsap.set(heroCta, { opacity: 0, y: 30, scale: 0.8 });
    gsap.set(heroHeadline, { opacity: 1 });

    if (!heroVideo || headlineLines.length === 0 || !heroCta) {
      console.error("Essential elements not found");
      return;
    }

    // Animate text with 3D transforms and stagger
    const allWords = [];
    headlineLines.forEach((line) => {
      const words = splitTextIntoChars(line);
      allWords.push(...words);
    });

    // Animate all words together with continuous stagger
    tl.to(
      allWords,
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.6,
        stagger: {
          each: 0.1,
          from: "start",
        },
      },
      0.3
    );

    // CTA with bounce effect
    tl.to(
      heroCta,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      }
      // "+=0.3"
    );

    // Continuous floating animation for CTA
    gsap.to(heroCta, {
      y: 0,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      //   delay: 0.25,
    });

    // Video expansion with elastic effect
    tl.to(
      heroVideo,
      {
        clipPath: "circle(150% at 50% 50%)",
        duration: 2.5,
        ease: "elastic.out(1, 0.5)",
      },
      "+=0.5"
    );
  };

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      startHeroAnimation();
    }, 100);

    return () => clearTimeout(timer);
  }, [isTablet]);

  return (
    <section id="about">
      <section className="hero-section" id="home">
        <div className="hero-video-container">
          <video className="hero-video" autoPlay muted loop playsInline>
            <source src={BgVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="hero-video-overlay"></div>
        <div className="hero-content">
          {!isTablet ? (
            <h1 className="hero-headline headline-mobile">
              <span className="headline-line">Have a World Public</span>
              <span className="headline-line">Speaking Champion</span>
              <span className="headline-line">as your own personal,</span>
              <span className="headline-line">speech coach,</span>
              <span className="headline-line">speech writer, and more.</span>
            </h1>
          ) : (
            <h1 className="hero-headline headline-tablet">
              <span className="headline-line">
                Have a World Public Speaking Champion
              </span>
              <span className="headline-line">
                as your own personal speech coach,
              </span>
              <span className="headline-line">speech writer, and more.</span>
            </h1>
          )}
          <a
            href="https://calendly.com/speak-with-simon/discovery-session"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary hero-cta"
          >
            Schedule a free consultation
          </a>
        </div>
      </section>
    </section>
  );
}
