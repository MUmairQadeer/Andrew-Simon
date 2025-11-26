import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PromoVideo from './Promo.mp4';
import VIDEO_THUMBNAIL from './video-thumbnail.png';

// --- Config ---
const TYPING_WORDS = ["Pitch", "Speech", "Presentation", "Moment", "Talk"];
const FONT_FAMILY = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif';

// --- Gradient Text Style ---
const headTextStyle = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textFillColor: 'transparent',
};

// --- SVG Icons ---
const PlayIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const MuteIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
  </svg>
);

const UnmuteIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
  </svg>
);

// --- Typing Effect ---
const TypingEffect = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = TYPING_WORDS[wordIndex];
    const typeSpeed = isDeleting ? 75 : 150;

    const handleTyping = () => {
      if (isDeleting) {
        setText(currentWord.substring(0, text.length - 1));
      } else {
        setText(currentWord.substring(0, text.length + 1));
      }

      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % TYPING_WORDS.length);
      }
    };

    const timer = setTimeout(handleTyping, typeSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

  return (
    <span className="inline-block transition-all duration-100 min-h-[1em]" style={headTextStyle}>
      {text}
      <span className="opacity-50 animate-pulse" style={{ color: '#764ba2' }}>_</span>
    </span>
  );
};

// --- Main Cinematic Promo ---
export default function CinematicPromo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  const videoRef = useRef(null);
  const targetRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  // --- 1. Detect Screen Size ---
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // --- 2. Animations Config ---
  const TEXT_FADE_OUT_END = 0.3;
  const CARD_ANIMATION_END = 0.8;

  const text1Y = useTransform(scrollYProgress, [0, TEXT_FADE_OUT_END], ["0vh", "-50vh"]);
  const text1Opacity = useTransform(scrollYProgress, [0, TEXT_FADE_OUT_END], [1, 0]);

  // --- Video Scaling & Positioning ---
  const targetScale = isMobile ? 0.95 : 0.75; 
  const initialScale = isMobile ? 0.6 : 0.5;
  
  const initialY = isMobile ? "15vh" : "60vh";

  const videoCardY = useTransform(
    scrollYProgress, 
    [0, CARD_ANIMATION_END], 
    [initialY, "0vh"]
  );
  
  const videoCardScale = useTransform(
    scrollYProgress, 
    [0, CARD_ANIMATION_END], 
    [initialScale, targetScale]
  );

  const overlayOpacity = useTransform(scrollYProgress, [0.4, CARD_ANIMATION_END], [0, 0.4]);

  // --- Controls Logic ---
  const showAndAutoHideControls = () => {
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    setShowControls(true);
    controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 2500);
  };

  const handleVideoAction = async (e) => {
    if(e) e.stopPropagation();
    showAndAutoHideControls();

    if (videoRef.current) {
      if (videoRef.current.muted && isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
      try {
        if (videoRef.current.paused) {
          await videoRef.current.play();
          setIsPlaying(true);
        } else {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      } catch (err) {
        console.error("Playback error:", err);
      }
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    showAndAutoHideControls();
    if (videoRef.current) {
      const currentMuted = videoRef.current.muted;
      videoRef.current.muted = !currentMuted;
      setIsMuted(!currentMuted);
    }
  };

  return (
    <div
      ref={targetRef}
      className="relative h-[150vh] md:h-[300vh]"
      style={{ fontFamily: FONT_FAMILY }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #000000 20%, #2a2a4e 100%)' }}
      >

        {/* Hero Text */}
        <motion.div
          style={{ y: text1Y, opacity: text1Opacity }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-start md:justify-center pt-16 md:pt-0 pointer-events-none"
        >
          <h1 className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center leading-tight drop-shadow-2xl mb-2 md:mb-0">
            Make Your
            <br />
            <TypingEffect />
            <br />
            Unforgettable
          </h1>
        </motion.div>

        {/* Video Card Container */}
        <motion.div
          style={{ y: videoCardY, scale: videoCardScale }}
          className="absolute top-0 w-full h-full flex items-center justify-center will-change-transform"
        >
          {/* Mobile height h-[55vh] */}
          <div
            className="relative w-full h-[55vh] md:w-[90%] md:h-[90%] overflow-hidden rounded-2xl shadow-2xl cursor-pointer group"
            onClick={(e) => handleVideoAction(e)}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover" 
              playsInline
              webkit-playsinline="true"
              muted={isMuted}
              loop
              poster={VIDEO_THUMBNAIL}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setShowControls(true)}
            >
              <source src={PromoVideo} type="video/mp4" />
              Your browser does not support HTML video.
            </video>

            <motion.div 
              style={{ opacity: overlayOpacity }} 
              className="absolute inset-0 bg-black/40 pointer-events-none z-10" 
            />

            {/* Custom Controls Bar */}
            <motion.div
              // Re-added 'y' animation for a nice slide up effect since it's bottom-anchored again
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: showControls ? 1 : 0, 
                y: showControls ? 0 : 20 
              }}
              transition={{ duration: 0.3 }}
              // CHANGE HERE: Removed all md: classes that were centering it.
              // It is now strictly 'absolute bottom-6 left-6' for ALL screens.
              className="absolute bottom-6 left-6 z-30 flex items-center gap-6 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-2xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()} 
            >
              <button
                onClick={(e) => handleVideoAction(e)}
                className="text-white hover:text-purple-400 transition-colors transform active:scale-95"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <PauseIcon className="w-8 h-8" /> : <PlayIcon className="w-8 h-8" />}
              </button>
              
              <div className="w-px h-6 bg-white/20"></div>

              <button
                onClick={toggleMute}
                className="text-white hover:text-purple-400 transition-colors transform active:scale-95"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <MuteIcon className="w-8 h-8" /> : <UnmuteIcon className="w-8 h-8" />}
              </button>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}
