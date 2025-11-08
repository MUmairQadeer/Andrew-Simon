import "./ClientCarousel.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function ClientCarouselStatItem({ label, target, unit }) {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut" },
      });

      // Animate value count up to target in 1s
      const end = Number(target);
      const duration = 1000; // ms
      const frameDuration = 1000 / 60;
      const totalFrames = Math.round(duration / frameDuration);
      let frame = 0;

      const counter = setInterval(() => {
        frame++;
        const progress = Math.min(frame / totalFrames, 1);
        setValue(Math.round(progress * end));
        if (progress === 1) {
          clearInterval(counter);
        }
      }, frameDuration);

      return () => clearInterval(counter);
    }
  }, [inView, controls, target]);

  return (
    <motion.div
      className="stat-item"
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.5 }}
      animate={controls}
    >
      <div className="stat-number" data-target={target}>
        {value}
        {unit}
      </div>
      <div className="stat-label">{label}</div>
    </motion.div>
  );
}
