import "./BottomContent.css";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
export default function BottomContent() {
  useEffect(() => {
    let cleanupParticles = () => {};
    let btnCleanupFns = [];
    let parallaxST;
    let section = null;

    // Function to create and animate particles
    function createReadyParticles() {
      const particlesContainer = document.querySelector(".ready-particles");
      if (!particlesContainer) return () => {};
      const particleCount = 40;
      const particles = [];

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "ready-particle";

        const size = Math.random() * 6 + 2;
        particle.style.width = size + "px";
        particle.style.height = size + "px";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";
        particle.style.opacity = Math.random() * 0.6 + 0.2;

        particlesContainer.appendChild(particle);
        particles.push(particle);

        // Animate particles
        gsap.to(particle, {
          y: -150,
          x: Math.random() * 300 - 150,
          duration: Math.random() * 15 + 15,
          repeat: -1,
          ease: "none",
          delay: Math.random() * 8,
        });

        gsap.to(particle, {
          opacity: Math.random() * 0.8 + 0.2,
          duration: Math.random() * 4 + 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Cleanup function for particles
      return () => {
        particles.forEach((p) => p.remove());
      };
    }

    // Animation timeline for ready section
    const readySectionTL = gsap.timeline({ paused: true });
    readySectionTL
      .to([".ready-section-bg", ".ready-section-bg-anim"], {
        opacity: 1,
        duration: 1.5,
        delay: 1,
        ease: "power2.inOut",
      })
      .fromTo(
        ".ready-section h2",
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1, ease: "power3.out" }
      )
      .fromTo(
        ".ready-section p",
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1, ease: "power3.out" },
        "+=0.3"
      )
      .fromTo(
        ".btn-cta",
        { y: "100%", opacity: 0, scale: 0.8 },
        {
          y: "0%",
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.3)",
        },
        "+=0.3"
      );

    // Enhanced button interactions
    function setupBtnInteractions() {
      const btns = document.querySelectorAll(".btn-cta");
      btns.forEach((btn) => {
        const mouseEnter = function () {
          gsap.to(this, {
            scale: 1.05,
            y: -5,
            duration: 0.3,
            ease: "back.out(1.7)",
          });

          // Create ripple effect
          const ripple = document.createElement("div");
          ripple.style.position = "absolute";
          ripple.style.borderRadius = "50%";
          ripple.style.background = "rgba(102, 126, 234, 0.3)";
          ripple.style.transform = "scale(0)";
          ripple.style.left = "50%";
          ripple.style.top = "50%";
          ripple.style.width = "20px";
          ripple.style.height = "20px";
          ripple.style.marginLeft = "-10px";
          ripple.style.marginTop = "-10px";
          ripple.style.pointerEvents = "none";
          ripple.className = "btn-cta-ripple";

          this.style.position = "relative";
          this.appendChild(ripple);

          gsap.to(ripple, {
            scale: 6,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => ripple.remove(),
          });
        };

        const mouseLeave = function () {
          gsap.to(this, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const click = function (e) {
          gsap.to(this, {
            scale: 0.95,
            duration: 0.1,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
            onComplete: () => {
              const contactSection = document.querySelector("#contact");
              if (contactSection) {
                gsap.to(window, {
                  duration: 1.5,
                  scrollTo: contactSection,
                  ease: "power2.inOut",
                });
              }
            },
          });
        };

        btn.addEventListener("mouseenter", mouseEnter);
        btn.addEventListener("mouseleave", mouseLeave);
        btn.addEventListener("click", click);

        btnCleanupFns.push(() => {
          btn.removeEventListener("mouseenter", mouseEnter);
          btn.removeEventListener("mouseleave", mouseLeave);
          btn.removeEventListener("click", click);
        });
      });
    }

    // Parallax effect for the section
    function setupParallax() {
      parallaxST = gsap.to(".ready-section", {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".ready-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Mouse movement parallax effect
    const mouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      const mouseY = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(".ready-section .container", {
        x: mouseX * 30,
        y: mouseY * 20,
        duration: 1,
        ease: "power2.out",
      });

      gsap.to(".ready-particles", {
        x: mouseX * 50,
        y: mouseY * 30,
        duration: 2,
        ease: "power2.out",
      });
    };
    const mouseLeave = () => {
      gsap.to(".ready-section .container", {
        x: 0,
        y: 0,
        duration: 1,
        ease: "power2.out",
      });

      gsap.to(".ready-particles", {
        x: 0,
        y: 0,
        duration: 2,
        ease: "power2.out",
      });
    };

    cleanupParticles = createReadyParticles();
    // Intersection Observer to trigger animations only once when in view
    let hasAnimated = false;
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            // Play the timeline only when the section is fully in view (threshold met)
            readySectionTL.play();
            setupBtnInteractions();
            setupParallax();
            section = document.querySelector(".ready-section");
            section && section.addEventListener("mousemove", mouseMove);
            section && section.addEventListener("mouseleave", mouseLeave);
            observer.disconnect(); // Only run once
          }
        });
      },
      { threshold: 0.6 }
    );

    const readySection = document.querySelector(".ready-section");
    if (readySection) observer.observe(readySection);

    return () => {
      observer.disconnect();
      cleanupParticles();
      btnCleanupFns.forEach((fn) => fn());
      btnCleanupFns = [];
      if (parallaxST && parallaxST.scrollTrigger) {
        parallaxST.scrollTrigger.kill();
        parallaxST.kill();
      }
      section && section.removeEventListener("mousemove", mouseMove);
      section && section.removeEventListener("mouseleave", mouseLeave);
    };
  }, []);
  return (
    <section className="ready-section" id="ready">
      <div className="ready-section-bg"></div>
      <div className="ready-section-bg-anim"></div>
      {/* Floating particles background */}
      <div className="ready-particles"></div>

      <div className="container">
        {/* Text for masking effect */}
        <div className="text-mask-wrapper">
          <h2 className="masked-text glow-pulse">
            GREAT SPEAKERS AREN'T BORN, THEY'RE TRAINED
          </h2>
        </div>
        <div className="text-mask-wrapper">
          <p className="masked-text">
            When you're ready to say it better, connect more deeply, and show up
            with real presence, I'm here to help you get there.
          </p>
        </div>
        <div className="text-mask-wrapper">
          <a
            href="https://calendly.com/speak-with-simon/discovery-session"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-cta masked-text"
          >
            Let's Get Started
          </a>
        </div>
      </div>
    </section>
  );
}
