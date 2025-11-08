import "./VideoService.css";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function VideoService() {
  const containerRef = useRef(null);
  const currentIndexRef = useRef(0);
  const debounceRef = useRef(null);

  useEffect(() => {
    const createdST = [];
    const videos = gsap.utils.toArray(".video-bg");
    videos.forEach((video) => {
      video.play().catch((error) => {
        const section = video.closest(".video-section");
        if (section) section.style.backgroundImage = "";
      });
      try { const st = ScrollTrigger.getById("master-st"); if (st) createdST.push(st); } catch(e){}
    });

    let masterTimeline;
    const length = () => {
      const el = containerRef.current;
      if (!el) return window.innerHeight * 4;
      const rectHeight = el.scrollHeight || el.offsetHeight || 4000;
      return Math.max(1000, rectHeight - window.innerHeight);
    };


    const createMasterTimeline = (scrollEnd) => {
      if (masterTimeline) masterTimeline.kill();
      masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: `+=${scrollEnd}`,
          id: "master-st",
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 3,
        },
      });
      try { const st = ScrollTrigger.getById("master-st"); if (st) createdST.push(st); } catch(e){}

      const animateSection = (selector) =>
        gsap
          .timeline()
          .to(`${selector} .service-heading, ${selector} .service-title`, {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            ease: "power3.out",
          })
          .to({}, { duration: 3 });

      masterTimeline
        .addLabel("startSection1")
        .add(animateSection("#section1"))

        // desc animations for section1
        .to("#section1 .service-desc:nth-child(1)", { opacity: 1, y: 0, duration: 5, ease: "power4.inOut" })
        .to("#section1 .service-desc:nth-child(1)", { opacity: 0, y: -25, duration: 3, ease: "power4.inOut" })
        .to("#section1 .service-desc:nth-child(2)", { opacity: 1, y: 0, duration: 5, ease: "power4.inOut" })
        .to("#section1 .service-desc:nth-child(2)", { opacity: 0, y: -25, duration: 3, ease: "power4.inOut" })
        .to("#section1 .service-desc:nth-child(3)", { opacity: 1, y: 0, duration: 5, ease: "power4.inOut" })
        .to("#section1 .service-desc:nth-child(3)", { opacity: 0, y: -25, duration: 3, ease: "power4.inOut" })
        .to("#section1 .service-desc:nth-child(4)", { opacity: 1, y: 0, duration: 5, ease: "power4.inOut" })

        // price and cta for section1
        .to("#section1 .price-box, #section1 .cta-button", {
          opacity: 1,
          y: 0,
          stagger: 0.6,
          duration: 4,
          ease: "power4.out",
        })

        .addLabel("startSection2")
        .to("#section1", { opacity: 0, duration: 2, ease: "power3.inOut" }, "-=1")
        .to("#section2", { opacity: 1, duration: 2, ease: "power3.inOut" }, "<")
        .add(animateSection("#section2"))

        // desc animations for section2
        .to("#section2 .service-desc:nth-child(1)", { opacity: 1, y: 0, duration: 5, ease: "power4.inOut" })
        .to("#section2 .service-desc:nth-child(1)", { opacity: 0, y: -25, duration: 3, ease: "power4.inOut" })
        .to("#section2 .service-desc:nth-child(2)", { opacity: 1, y: 0, duration: 5, ease: "power4.inOut" })
        .to("#section2 .service-desc:nth-child(2)", { opacity: 0, y: -25, duration: 3, ease: "power4.inOut" })
        .to("#section2 .service-desc:nth-child(3)", { opacity: 1, y: 0, duration: 5, ease: "power4.inOut" })
        .to("#section2 .service-desc:nth-child(3)", { opacity: 0, y: -25, duration: 3, ease: "power4.inOut" })
        .to("#section2 .service-desc:nth-child(4)", { opacity: 1, y: 0, duration: 5, ease: "power4.inOut" })
        .to("#section2 .service-desc:nth-child(4)", { opacity: 0, y: -25, duration: 3, ease: "power4.inOut" })
        .to("#section2 .service-desc:nth-child(5)", { opacity: 1, y: 0, duration: 5, ease: "power4.inOut" })

        // price and cta for section2
        .to("#section2 .price-box, #section2 .cta-button", {
          opacity: 1,
          y: 0,
          stagger: 0.6,
          duration: 4,
          ease: "power4.out",
        })

        .addLabel("startSection3")
        .to("#section2", { opacity: 0, duration: 2, ease: "power3.inOut" }, "-=1")
        .to("#section3", { opacity: 1, duration: 2, ease: "power3.inOut" }, "<")
        .add(animateSection("#section3"))

        // desc animations for section3
        .to("#section3 .service-desc:nth-child(1)", { opacity: 1, y: 0, duration: 5, ease: "power4.inOut" })
        .to("#section3 .service-desc:nth-child(1)", { opacity: 0, y: -25, duration: 3, ease: "power4.inOut" })
        .to("#section3 .service-desc:nth-child(2)", { opacity: 1, y: 0, duration: 5, ease: "power4.inOut" })
        .to("#section3 .service-desc:nth-child(2)", { opacity: 0, y: -25, duration: 3, ease: "power4.inOut" })
        .to("#section3 .service-desc:nth-child(3)", { opacity: 1, y: 0, duration: 5, ease: "power4.inOut" })
        .to("#section3 .service-desc:nth-child(3)", { opacity: 0, y: -25, duration: 3, ease: "power4.inOut" })
        .to("#section3 .service-desc:nth-child(4)", { opacity: 1, y: 0, duration: 5, ease: "power4.inOut" })
        .to("#section3 .service-desc:nth-child(4)", { opacity: 0, y: -25, duration: 3, ease: "power4.inOut" })
        .to("#section3 .service-desc:nth-child(5)", { opacity: 1, y: 0, duration: 5, ease: "power4.inOut" })

        // price and cta for section3
        .to("#section3 .price-box, #section3 .cta-button", {
          opacity: 1,
          y: 0,
          stagger: 0.6,
          duration: 4,
          ease: "power4.out",
        })

        .addLabel("startFinalSection");
    };

    const setupTimeline = () => {
      ScrollTrigger.matchMedia({
        "(min-width: 769px)": () => createMasterTimeline(length()),
        "(max-width: 768px)": () => createMasterTimeline(Math.max(1200, length())),
      });
      try { const st = ScrollTrigger.getById("master-st"); if (st) createdST.push(st); } catch(e){}
    };

    setupTimeline();

    let resizeTO;
    const handleResize = () => {
      clearTimeout(resizeTO);
      resizeTO = setTimeout(() => {
      createdST.forEach(st => { try { st && st.kill(true); } catch(e){} });
      createdST.length = 0;
      setupTimeline();
      ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    ScrollTrigger.addEventListener("scrollEnd", () => {
      const masterST = ScrollTrigger.getById("master-st");
      if (!masterST) return;

      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        const progress = masterST.progress;
        const final = document.querySelector("#final-section");

        if (window.scrollY >= (final?.offsetTop || 0) - window.innerHeight) {
          currentIndexRef.current = 3;
        } else if (progress < 0.33) {
          currentIndexRef.current = 0;
        } else if (progress < 0.66) {
          currentIndexRef.current = 1;
        } else {
          currentIndexRef.current = 2;
        }
      }, 50);
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      createdST.forEach(st => { try { st && st.kill(true); } catch(e){} });
    };
  }, []);

  return (
    <main ref={containerRef} className="video-container" id="video-service">
      <section id="section1" className="video-section">
        <video
          className="video-bg"
          src="./media/4254581-uhd_3840_2160_25fps.mp4"
          autoPlay
          muted
          loop
          playsInline
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/1920x1080/000000/ffffff?text=Video+Error";
          }}
        ></video>
        <div className="text-content">
          <h4 className="line service-heading">Our Services</h4>
          <h2 className="line service-title">Coaching</h2>
          <div className="desc-container">
            <p className="service-desc">
              Get one-on-one training, coaching, and mentorship with a world public speaking champion. Coaching is ideal for situations where you're looking to elevate your communication skills ASAP.
            </p>
            <p className="service-desc">
              Choose between over 30 unique coaching programs, each focused on particular goals, priorities, and challenges.
            </p>
            <p className="service-desc">
              Each session will be supported with follow-up material, resources, exercises, guides, and more.
            </p>
            <p className="service-desc">
              Click on the button below to jump onto a FREE coaching session, and take the next step in your public speaking journey.
            </p>
          </div>
          <div className="line price-box">
            <span className="price">$997/Month</span>
            <span className="price-subtext">Limited spaces available.</span>
          </div>
          <a
            href="https://calendly.com/speak-with-simon/discovery-session"
            target="_blank"
            rel="noopener noreferrer"
            className="line cta-button"
            style={{ pointerEvents: 'auto' }}
          >
            LET'S GET STARTED
          </a>
        </div>
      </section>

      <section id="section2" className="video-section">
        <video
          className="video-bg"
          src="./media/4053048-uhd_3840_2160_25fps.mp4"
          autoPlay
          muted
          loop
          playsInline
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/1920x1080/000000/ffffff?text=Video+Error";
          }}
        ></video>
        <div className="text-content">
          <h4 className="line service-heading">Our Services</h4>
          <h2 className="line service-title">Tune Up</h2>
          <div className="desc-container">
            <p className="service-desc">
              Expert public speaking support that can be booked by the hour. How we use our tune-up time is completely up to you, and fully flexible for your needs—perfect for feedback, rehearsals, or refining your presentation style.
            </p>
            <p className="service-desc">
              Tune-up bookings are ideal for last minute-jitters, finding opportunities to quickly bring your speech to the next level, eliminating any bad habits in your tone or delivery that might distract audiences or take away from your message, and much more.
            </p>
            <p className="service-desc">
              When people around you are telling you to “just speak from your heart,” “just wing it,” or that “it sounds fine!”…but you KNOW it has the potential to be so much better…that where I’m here to help.
            </p>
            <p className="service-desc">
              Best of all, our time together has a 100% money back guarantee. If, at the end of our call, you can’t see or feel the difference for yourself, you don’t pay—it’s as simple as that.
            </p>
            <p className="service-desc">
              Click on the button below for a FREE discovery session—you can share your goals and challenges, and together we’ll put together a plan and a timeline of how to get you the training and feeding back you need as quickly as possible.
            </p>
          </div>
          <div className="line price-box">
            <span className="price">$250/hr</span>
            {/* <span className="price-subtext">
              Additional detail or selling point goes here.
            </span> */}
          </div>
          <a
            href="https://calendly.com/speak-with-simon/discovery-session"
            target="_blank"
            rel="noopener noreferrer"
            className="line cta-button"
            style={{ pointerEvents: 'auto' }}
          >
            LET'S GET STARTED
          </a>
        </div>
      </section>

      <section id="section3" className="video-section">
        <video
          className="video-bg"
          src="./media/8847879-hd_1920_1080_25fps.mp4"
          autoPlay
          muted
          loop
          playsInline
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/1920x1080/000000/ffffff?text=Video+Error";
          }}
        ></video>
        <div className="text-content">
          <h4 className="line service-heading">Our Services</h4>
          <h2 className="line service-title">Presentations</h2>
          <div className="desc-container">
            <p className="service-desc">
              Perfect for TEDx Talks, keynotes, award speeches, investment pitches, and other high-stakes presentations. By having "all-in" pricing, we're able to provide you with everything you'll need to go from "the page to the stage."
            </p>
            <p className="service-desc">
              I’ll help you to take your notes, ideas, and rough drafts, and transform them into a clear, concise and compelling experience—that you and your audience are going to love.
            </p>
            <p className="service-desc">
              Our time together will include taking you from “ideas” to “first draft,” to “final presentation,” and then through extensive rehearsals and training to get you confident and stage-ready.
            </p>
            <p className="service-desc">
              Whether you’re just short on time, or you’re working on a presentation that’s too important to leave to chance, and want expert support to raise it to the next level, I’m here for you.
            </p>
            <p className="service-desc">
              Click on the button below for a FREE discovery session, where we can discuss where you’re at, what success looks like, and how we’ll get you there.
            </p>
          </div>
          <div className="line price-box">
            <span className="price">$100/minute of speaking time</span>
            <span className="price-subtext">
              (ie 10 minute speech - $1000). Includes first draft, edits, and
              presentation training.
            </span>
          </div>
          <a
            href="https://calendly.com/speak-with-simon/discovery-session"
            target="_blank"
            rel="noopener noreferrer"
            className="line cta-button"
            style={{ pointerEvents: 'auto' }}
          >
            LET'S GET STARTED
          </a>
        </div>
      </section>
    </main>
  );
}
