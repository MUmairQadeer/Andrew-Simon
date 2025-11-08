import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import "./BeforeWeBeginCard.css";
import Corporate from "./corporate.jpg";
import Ted from "./ted-style.jpg";
import Entrepreneurs from "./founder.jpg";
import JobSeekers from "./job-seekers.jpg";
import Coaches from "./coaches.jpg";
import Academics from "./academic.jpg";
import Career from "./career-professional.jpg";

const clientTypes = [
  {
    key: "corporate",
    title: "Corporate Leaders",
    image: Corporate,
    paragraphs: [
      "When you're leading teams, negotiating deals, or shaping culture, your voice isn’t just a tool — it’s a signal. It tells people whether they can trust you, follow you, or bet on you.",
      "If you're stepping into higher stakes, larger rooms, or moments where clarity, composure, and presence are non-negotiable — then this is exactly the work you need.",
    ],
  },
  {
    key: "ted",
    title: "TED-Style Speakers",
    image: Ted,
    paragraphs: [
      "You have something inside you worth saying. A message. A story. A truth the world needs to hear — but maybe you don’t yet know how to shape it. Or deliver it with the power it deserves.",
      "If you're not just chasing applause, but aiming to move people — to spark new thinking, shift paradigms, or ignite action — this is where that transformation begins.",
    ],
  },
  {
    key: "entrepreneurs",
    title: "Entrepreneurs and Founders",
    image: Entrepreneurs,
    paragraphs: [
      "You’re not just pitching a product. You’re pitching a vision, a future — a version of the world that only exists if people believe in what you’re building. That takes more than confidence. It takes clarity, conviction, and a way of speaking that cuts through the noise.",
      "If you're ready to sharpen the way you pitch, persuade, and lead — not just for investors, but for your team, your market, and yourself — then we’re a perfect match.",
    ],
  },
  {
    key: "jobseekers",
    title: "Job Seekers and Ivy League Applicants",
    image: JobSeekers,
    paragraphs: [
      "Job interviews aren’t just about answering questions — they are about owning your story. Most people don’t struggle because they lack skills — they struggle because they don’t know how to speak with presence and clarity when it counts.",
      "If you’re ready to stop hoping you’ll come across well — and start ensuring it — then we’re a great fit.",
    ],
  },
  {
    key: "coaches",
    title: "Coaches and Consultants",
    image: Coaches,
    paragraphs: [
      "When your business is built on trust, how you speak is your brand. The most successful professionals don’t just deliver results — they communicate value, authority, and alignment in every interaction.",
      "If you’re ready to sound like the expert you already are — and get clients to feel that from the very first word — let’s work together.",
    ],
  },
  {
    key: "academics",
    title: "Academics, Experts, and Thought-Leaders",
    image: Academics,
    paragraphs: [
      "Expertise is only half the battle. The other half? Making people care. I work with researchers who struggle to translate their knowledge into messages that resonate outside their field.",
      "If you're ready to bridge the gap between what you know and what others hear — and to make complexity feel clear, urgent, and human — then yes, we’re a great fit.",
    ],
  },
  {
    key: "career",
    title: "Early-Mid Career Professionals",
    image: Career,
    paragraphs: [
      "Maybe you’ve got the ideas and the drive — but in meetings, you freeze up, ramble, or go unheard. It’s not that you’re not capable. It’s that you’ve never been shown how to speak in a way that makes people listen.",
      "If you're done letting fear be the loudest voice in your head, this work will change you. Not just how you speak — but how you see yourself.",
    ],
  },
];

export default function BeforeWeBeginCard() {
  const [clientActive, setClientActive] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });

  // Refs for each client list item
  const itemRefs = useRef([]);

  // Scroll detection logic
  // This logic automatically drives the active client based on which 
  // item is closest to the center of the viewport (or sticky container's center).
  useEffect(() => {
    const handleScroll = () => {
      let closestIdx = 0;
      let closestDistance = Infinity;
      
      // Calculate the center of the viewport
      const viewportCenter = window.innerHeight / 2;

      itemRefs.current.forEach((el, idx) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          // Distance from the item's top edge to the center of the viewport
          const distance = Math.abs(rect.top - viewportCenter);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIdx = idx;
          }
        }
      });

      setClientActive((prev) => (prev !== closestIdx ? closestIdx : prev));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    // The main section is ref'd for the fadeUp animation trigger
    <section ref={ref} className="bwgc-section bwgc-final-section">
      <motion.h2
        animate={isInView ? "visible" : "hidden"}
        variants={fadeUp}
        className="bwgc-final-content-title"
      >
        Are We a Good Fit?
      </motion.h2>

      {/* bwgc-scroll-driver is the key to the scroll lock effect. 
          It provides a large vertical space to scroll through. */}
      <div className="bwgc-scroll-driver">
        <motion.div
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          // bwgc-final-container is sticky inside the scroll driver
          className="bwgc-final-container"
        >
          <div className="bwgc-final-content">
            <ul className="bwgc-client-types">
              {clientTypes.map((client, idx) => (
                <li
                  key={client.key}
                  // Item refs for scroll position detection
                  ref={(el) => (itemRefs.current[idx] = el)}
                  onClick={() => setClientActive(idx)}
                  className={`bwgc-client-type ${
                    idx === clientActive ? "bwgc-active" : ""
                  }`}
                  data-client={client.key}
                >
                  {client.title}
                  {/* Mobile Content (Accordion) */}
                  <motion.div
                    animate={idx === clientActive ? "expand" : "collapse"}
                    initial="collapse"
                    variants={{
                      expand: { height: "auto", opacity: 1 },
                      collapse: { height: 0, opacity: 0 },
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="bwgc-client-content-wrapper-mobile"
                  >
                    <div className="bwgc-client-content-mobile">
                      {client.paragraphs.map((text, i) => (
                        <p key={i}>{text}</p>
                      ))}
                    </div>
                    <img
                      className="bwgc-client-image-mobile"
                      src={client.image}
                      alt={client.title}
                    />
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Content (Image/Text Pane) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={clientTypes[clientActive].key}
              className="bwgc-client-content-wrapper-desktop"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="bwgc-client-image-container">
                <img
                  className="bwgc-client-image"
                  alt={clientTypes[clientActive].title}
                  src={clientTypes[clientActive].image}
                />
              </div>
              <div className="bwgc-client-description">
                <div className="bwgc-client-text">
                  <h3>{clientTypes[clientActive].title}</h3>
                  {clientTypes[clientActive].paragraphs.map((text, i) => (
                    <p key={i}>{text}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}