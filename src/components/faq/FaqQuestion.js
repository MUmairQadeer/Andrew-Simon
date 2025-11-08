import "./Faq.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// function splitTextIntoWords(text) {
//   return text.split(" ").map((word, i) => (
//     <span className="word" key={i}>
//       {word.split("").map((char, j) => (
//         <span className="char" key={j}>
//           {char}
//         </span>
//       ))}{" "}
//     </span>
//   ));
// }

gsap.registerPlugin(ScrollTrigger);
export default function FaqQuestion({ item, idx }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2, once: true });
  const questionTextRef = useRef(null);
  const answerRef = useRef(null);
  const answerLineRef = useRef(null);

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    gsap.to(ref.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      onComplete: () => {
        const questionText = questionTextRef.current;
        if (questionText) {
          gsap.fromTo(
            questionText.querySelectorAll(".char"),
            { yPercent: 100, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              stagger: 0.02,
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto",
            }
          );
        }
      },
    });
  }, [isInView, idx]);

  useEffect(() => {
    if (isActive) {
      // Open answer animation
      gsap
        .timeline()
        .to(answerRef.current, {
          maxHeight: "500px",
          duration: 0.5,
          ease: "power3.inOut",
        })
        .from(
          answerLineRef.current,
          {
            yPercent: 120,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.2"
        );
    } else {
      // Close answer animation
      gsap.to(answerRef.current, {
        maxHeight: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
    }
  }, [isActive]);

  const handleAccordion = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div
      ref={ref}
      className={`faq-item${isActive ? " active" : ""}`}
      key={idx}
      style={{ opacity: 0, transform: "translateY(40px)" }}
    >
      <div className="faq-question" onClick={handleAccordion}>
        <span className="faq-question-text" ref={questionTextRef}>
          {item.question}
        </span>
        <span className="faq-icon">+</span>
      </div>
      <div className="faq-answer" ref={answerRef}>
        <p>
          <span className="line-inner" ref={answerLineRef}>
            {item.answer}
          </span>
        </p>
      </div>
    </div>
  );
}
