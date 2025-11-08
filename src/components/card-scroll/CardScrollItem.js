import { useRef } from "react";
import "./CardScroll.css";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CardScrollItem({
  project,
  idx,
  progress,
  range,
  targetScale,
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="card-container w-full flex justify-center"
    >
      <motion.div
        style={{ top: `calc(-4% + ${idx * 25}px)`, scale: scale }}
        className="card-content relative w-full max-w-4xl h-[350px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row items-center text-white border border-gray-800"
      >
        <div
          className="card-content-bg absolute inset-0"
          style={{ backgroundColor: project.color, zIndex: 0 }}
        ></div>
        <div className="card-content-text relative w-full md:w-3/5 p-4 md:p-8 flex flex-col justify-center h-full text-center md:text-left z-10">
          {/* <h2 className="text-xl md:text-2xl font-extrabold mb-2 xl:text-3xl xl:mb-4">
            {project.title}
          </h2> */}
          {project.description.map((line, index) => (
            <p
              key={index}
              className="text-sm md:text-lg !leading-normal opacity-90 mb-2 xl:mb-4 xl:text-[1.3rem] xl:!leading-tight"
            >
              {line}
            </p>
          ))}
          {project.linkText && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 px-6 py-3 bg-white text-gray-800 rounded-full shadow-lg hover:bg-gray-200 transition-colors duration-300 font-semibold self-center md:self-start w-fit"
            >
              {project.linkText}
            </a>
          )}
        </div>
        <div className="hidden md:block w-full md:w-2/5 relative h-full overflow-hidden rounded-r-3xl z-10">
          <motion.div
            style={{
              scale: imageScale,
            }}
            className="w-full h-full"
          >
            <img
              src={project.src}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/1000x500/CCCCCC/000000?text=Image+Not+Found";
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
