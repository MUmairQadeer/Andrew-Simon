import "./BeforeWeBegin.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- UTILITY: TEXT SPLITTING ---
function splitTextIntoLines(selector) {
  document.querySelectorAll(selector).forEach((p) => {
    const text = p.innerHTML;
    p.innerHTML = `<span className="line-inner">${text}</span>`;
  });
}

function splitTextIntoChars(selector) {
  const element = document.querySelector(selector);
  if (element) {
    const text = element.textContent.trim();
    element.innerHTML = text
      .split(" ")
      .map(
        (char) =>
          `<span className="char" style="display:inline-block;">${char.trim() === "" ? "&nbsp;" : char
          }</span><span> </span>`
      )
      .join("");
    return element.querySelectorAll(".char");
  }
  return [];
}

export default function BeforeWeBegin() {
  const mainRef = useRef(null);

  useEffect(() => {
    // Detect mobile device
    const isMobile = window.innerWidth < 768;

    // Wait for fonts and images to load
    const initWithDelay = () => {
      function initPageAnimations() {
        // Split text for animations
        splitTextIntoLines(".bwg-client-text p");

        // --- HERO SECTION ---
        const heroTitleChars = splitTextIntoChars(".bwg-hero-title");
        const heroSubtitleChars = splitTextIntoChars(".bwg-hero-subtitle");

        gsap.fromTo(".bwg-hero", { opacity: 0 }, { opacity: 1, duration: 0.5 });

        // Set initial states for cards to ensure they're visible
        gsap.set(".bwg-card", { opacity: 1, y: 0, rotationX: 0 });
        gsap.set(".bwg-section-title", { opacity: 1 });

        // Hide rejection text and new content initially to prevent overlap
        gsap.set(".bwg-rejection-text-wrapper", { opacity: 0, y: 50 });
        gsap.set(".bwg-rejection-text", { scale: 0.3 });
        gsap.set(".bwg-new-content", { opacity: 0 });

        // Optimized scroll trigger settings for mobile vs desktop
        const heroScrollTrigger = {
          trigger: ".bwg-hero",
          start: isMobile ? "top top" : "top top",
          end: isMobile ? "bottom top" : "bottom top",
          scrub: 4,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        };

        gsap
          .timeline({
            scrollTrigger: heroScrollTrigger,
          })
          .from(heroTitleChars, {
            y: "100%",
            rotationX: -90,
            opacity: 0,
            stagger: isMobile ? 20 : 0.3,
            duration: isMobile ? 20 : 8,
            ease: "power2.out",
          })
          .from(
            heroSubtitleChars,
            {
              y: "100%",
              rotationX: -90,
              opacity: 0,
              stagger: isMobile ? 12 : 0.25,
              duration: isMobile ? 16 : 8,
              ease: "power2.out",
            },
            "<"
          )
          .to(
            ".bwg-hero-content",
            {
              scale: 0.9,
              opacity: 0,
              filter: "blur(5px)",
              duration: isMobile ? 8 : 6,
              ease: "power1.out",
            },
            "-=0.5"
          )
          .to(
            ".bwg-main-container",
            {
              backgroundColor: "transparent",
              duration: isMobile ? 8 : 6,
              ease: "power1.out",
            },
            "<"
          );

        // --- CARDS SECTION ---
        const rejectionChars = splitTextIntoChars(".bwg-rejection-text");
        const newContentChars = splitTextIntoChars(".bwg-new-content-text");

        let cardsTimeline;
        ScrollTrigger.create({
          trigger: ".bwg-cards-section",
          start: "top bottom",
          onEnter: () => {
            if (cardsTimeline) return; // Prevent duplicate timelines

            // Optimized scroll trigger for mobile vs desktop
            const cardsScrollTrigger = {
              trigger: ".bwg-cards-section",
              start: "top 10%",
              end: isMobile ? "+=1200vh" : "+=800vh",
              scrub: 5,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              // markers: true,
            };

            cardsTimeline = gsap.timeline({
              scrollTrigger: cardsScrollTrigger,
            });

            cardsTimeline
              .from(".bwg-cards-container .bwg-section-title", {
                opacity: 0,
                y: isMobile ? 30 : 50,
                duration: isMobile ? 25 : 25,
                ease: "power2.out",
              })
              .from(
                ".bwg-card",
                {
                  opacity: 0,
                  y: isMobile ? 60 : 100,
                  rotationX: -45,
                  stagger: isMobile ? 20 : 12,
                  duration: isMobile ? 50 : 12,
                  ease: "power2.out",
                },
                "<12"
              )
              .to(
                ".bwg-card .bwg-x-mark",
                {
                  opacity: 1,
                  scale: 1,
                  rotation: 0,
                  duration: isMobile ? 50 : 30,
                  ease: "power2.out",
                  stagger: isMobile ? 25 : 20,
                },
                isMobile ? ">30" : ">35"
              )
              .to(
                ".bwg-rejection-text-wrapper",
                {
                  opacity: 1,
                  y: 0,
                  duration: isMobile ? 20 : 18,
                  ease: "power2.out",
                }
              )
              .from(
                rejectionChars,
                {
                  opacity: 0,
                  y: isMobile ? 15 : 20,
                  rotationX: -90,
                  stagger: isMobile ? 12 : 8,
                  duration: isMobile ? 25 : 12,
                  ease: "power2.out",
                },
                "<12"
              )
              .to(
                [".bwg-cards-grid", ".bwg-cards-container .bwg-section-title"],
                {
                  opacity: 0,
                  y: isMobile ? -30 : -50,
                  duration: isMobile ? 25 : 20,
                  ease: "power1.out"
                },
                ">25"
              )
              .to(
                ".bwg-rejection-text-wrapper",
                {
                  y: isMobile ? "-=300" : "-=300",
                  duration: isMobile ? 15 : 25,
                  ease: "power1.out"
                }
              )
              .to(
                ".bwg-rejection-text",
                {
                  scale: 1,
                  duration: isMobile ? 25 : 35,
                  ease: "power2.out",
                }
              )
              .to(".bwg-new-content", {
                opacity: 1,
                duration: isMobile ? 25 : 20,
                ease: "power2.out"
              }, ">25")
              .from(newContentChars, {
                opacity: 0,
                y: isMobile ? 25 : 20,
                stagger: isMobile ? 12 : 10,
                duration: isMobile ? 18 : 12,
                ease: "power2.out",
              })
              .to(".bwg-main-container", {
                backgroundColor: "#000000",
                duration: isMobile ? 12 : 25,
                ease: "power1.out",
              });
          },
        });

        // force refresh for mobile viewport issues
        ScrollTrigger.refresh();
        window.addEventListener("resize", () => {
          ScrollTrigger.refresh();
        });
      }

      initPageAnimations();
    };

    // Desktop only - init animations
    initWithDelay();

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      window.removeEventListener("resize", ScrollTrigger.refresh);
    };
  }, []);

  return (
    <section className="bwg-main-container" ref={mainRef}>
      <section className="bwg-section bwg-hero">
        <div className="bwg-hero-content">
          <h1 className="bwg-hero-title">Before We Begin...</h1>
          <p className="bwg-hero-subtitle">
            If we're going to work together, I want to make sure that I can help
            you get the progress you need, as quickly as possible.
          </p>
        </div>
      </section>

      {/* Cards Section */}
      <section className="bwg-section bwg-cards-section">
        <div className="bwg-cards-container">
          <h2 className="bwg-section-title">If you're looking for...</h2>
          <div className="bwg-cards-grid">
            <div className="bwg-card" data-card="1">
              <div className="bwg-card-icon">🚀</div>
              <h3 className="bwg-card-title">A quick fix</h3>
              <p className="bwg-card-description">
                Looking for an overnight transformation without the work
              </p>
              <div className="bwg-x-overlay">
                <div className="bwg-x-mark">✗</div>
              </div>
            </div>
            <div className="bwg-card" data-card="2">
              <div className="bwg-card-icon">🔄</div>
              <h3 className="bwg-card-title">Resistant to feedback</h3>
              <p className="bwg-card-description">
                Not open to critique or new ways of thinking
              </p>
              <div className="bwg-x-overlay">
                <div className="bwg-x-mark">✗</div>
              </div>
            </div>
            <div className="bwg-card" data-card="3">
              <div className="bwg-card-icon">👀</div>
              <h3 className="bwg-card-title">Passive participation</h3>
              <p className="bwg-card-description">
                Expecting transformation just by showing up
              </p>
              <div className="bwg-x-overlay">
                <div className="bwg-x-mark">✗</div>
              </div>
            </div>
            <div className="bwg-card" data-card="4">
              <div className="bwg-card-icon">🎲</div>
              <h3 className="bwg-card-title">Winging it</h3>
              <p className="bwg-card-description">
                Relying on luck instead of strategy
              </p>
              <div className="bwg-x-overlay">
                <div className="bwg-x-mark">✗</div>
              </div>
            </div>
          </div>
          <div className="bwg-rejection-text-wrapper">
            <p className="bwg-rejection-text">
              ...then I'd rather not waste your time and money.
            </p>
          </div>

          <div className="bwg-new-content">
            <p className="bwg-new-content-text">
              But if you're looking for someone who listens, challenges, and
              helps you to craft your unique voice — you're in the right place.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
