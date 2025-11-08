import { useRef } from "react";
import "./Book.css";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import BoxCover from "./book-cover.png";

export default function Book() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <section className="book-section" id="book">
      <div className="floating-elements">
        <div
          className="floating-circle"
          style={{
            width: "100px",
            height: "100px",
            top: "10%",
            left: "10%",
            position: "absolute",
          }}
        ></div>
        <div
          className="floating-circle"
          style={{
            width: "150px",
            height: "150px",
            top: "60%",
            right: "10%",
            position: "absolute",
          }}
        ></div>
        <div
          className="floating-circle"
          style={{
            width: "80px",
            height: "80px",
            bottom: "20%",
            left: "20%",
            position: "absolute",
          }}
        ></div>
      </div>

      <div className="book-content" ref={ref}>
        <motion.div
          className="book-cover"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
          variants={fadeUp}
        >
          <img src={BoxCover} alt="Book Cover" className="book-cover-image" />
        </motion.div>

        <div>
          <motion.h1
            className="book-main-title"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.2}
            variants={fadeUp}
          >
            THE ULTIMATE GUIDE TO PUBLIC SPEAKING
          </motion.h1>

          <motion.div
            className="book-description"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {[
              `Master the complete blueprint for unforgettable speaking—from a world champion with 20 years of experience.`,
              `At 344 pages, The Art (and Science) of Public Speaking is a comprehensive, step-by-step guide to crafting compelling content, sharpening your message, and delivering it with lasting impact. Learn how to emotionally engage any audience and persuade with confidence, clarity, and purpose.`,
              `Whether you're prepping for a TEDx talk, investor pitch, or major keynote, this practical, no-fluff digital book gives you proven tools to speak with power—even under pressure.`,
              `Your digital ebook (PDF) will be delivered instantly to the email you use at checkout.`,
            ].map((text, i) => (
              <motion.p key={i} custom={0.3 + i * 0.1} variants={fadeUp}>
                {text}
              </motion.p>
            ))}
          </motion.div>

          <a
            href="https://www.paypal.com/ncp/payment/QQMT5WW5G4RKW"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              className="book-cta-button"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.5}
              variants={fadeUp}
            >
              Buy Now
            </motion.button>
          </a>
        </div>
      </div>
    </section>
  );
}
