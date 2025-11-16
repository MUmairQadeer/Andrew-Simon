import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// --- Config ---
// NOTE: I've replaced your local video with a placeholder.
// Just swap this URL back to your './Promo.mp4' import.
import PromoVideo from './Promo.mp4';
import VIDEO_THUMBNAIL from './video-thumbnail.png';
// const PromoVideo = "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4";
// const VIDEO_THUMBNAIL = "https://via.placeholder.com/1920x1080/000000/FFFFFF?text=Video+Thumbnail"; // Placeholder thumbnail

const TYPING_WORDS = ["Pitch", "Speech", "Presentation", "Moment", "Talk"];
const FONT_FAMILY = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

// --- Gradient Text Style ---
const headTextStyle = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textFillColor: 'transparent',
};

// --- SVG Icons for Controls ---
const PlayIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
  </svg>
);

const PauseIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
  </svg>
);

const MuteIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.5 5.05a7 7 0 014.242 12.428M11.5 5.05V19m0-13.95a7 7 0 00-4.243 12.428m4.242-12.428L9 3m2.5 2.05L15 3m-3.5 2.05V1m0 4.05L9 7m2.5-1.95L15 7M3 10v4c0 1.105.895 2 2 2h2l5 5V3L7 8H5c-1.105 0-2 .895-2 2zm16 0l-4 4m0-4l4 4" />
  </svg>
);

const UnmuteIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M17.657 6.343a9 9 0 010 12.728M3 10v4c0 1.105.895 2 2 2h2l5 5V3L7 8H5c-1.105 0-2 .895-2 2z" />
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
    <span
      className="inline-block transition-all duration-100 min-h-[1em]"
      style={headTextStyle} // Applied gradient text style
    >
      {text}
      <span className="opacity-50 animate-pulse" style={{ color: '#764ba2' }}>_</span>
    </span>
  );
};

// --- Main Cinematic Promo ---
export default function CinematicPromo() {
  // const [showPlayButton, setShowPlayButton] = useState(true); // REMOVED
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Start muted
  const [showControls, setShowControls] = useState(true); // CHANGED: Show controls from start
  const videoRef = useRef(null);
  const targetRef = useRef(null);
  const controlsTimeoutRef = useRef(null); // Ref for the auto-hide timer

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // --- Animation keyframes ---
  const TEXT_FADE_OUT_END = 0.4;
  const CARD_ANIMATION_START = 0.0;
  const CARD_ANIMATION_END = 0.7;
  const SLIDE_TEXT_ANIMATION_START = 0.6;
  const SLIDE_TEXT_ANIMATION_END = 0.8;

  // Hero text moves up and fades
  const text1Y = useTransform(scrollYProgress, [0, TEXT_FADE_OUT_END], ["0vh", "-50vh"]);
  const text1Opacity = useTransform(scrollYProgress, [0, TEXT_FADE_OUT_END], [1, 0]);

  // Video card position & scale
  const videoCardY = useTransform(scrollYProgress, [CARD_ANIMATION_START, CARD_ANIMATION_END], ["60vh", "0vh"]);
  const videoCardScale = useTransform(scrollYProgress, [CARD_ANIMATION_START, CARD_ANIMATION_END], [0.5, 1]);

  // Dark overlay opacity
  const overlayOpacity = useTransform(scrollYProgress, [0.4, CARD_ANIMATION_END], [0, 0.6]);

  // Sliding text transforms
  const textTopX = useTransform(scrollYProgress, [SLIDE_TEXT_ANIMATION_START, SLIDE_TEXT_ANIMATION_END], ["-100%", "0%"]);
  const textBottomX = useTransform(scrollYProgress, [SLIDE_TEXT_ANIMATION_START, SLIDE_TEXT_ANIMATION_END], ["100%", "0%"]);

  // Separate opacity for top & bottom text
  const textTopOpacity = useTransform(scrollYProgress, [SLIDE_TEXT_ANIMATION_START, SLIDE_TEXT_ANIMATION_END], [0, 1]);
  const textBottomOpacity = useTransform(scrollYProgress, [SLIDE_TEXT_ANIMATION_START, SLIDE_TEXT_ANIMATION_END], [0, 1]);

  // --- Controls Visibility Logic ---
  const showAndAutoHideControls = () => {
    // Clear any existing timer
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    // Show the controls
    setShowControls(true);
    // Set a new timer to hide them
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 500); // CHANGED: Hide after 0.5 seconds
  };

  // --- Video Control Handlers ---
  // const handlePlay = async () => { ... }; // REMOVED: This logic is merged into handleVideoContainerClick

  const togglePlayPause = async (e) => {
    e.stopPropagation(); // Stop click from bubbling to container
    showAndAutoHideControls(); // Reset the auto-hide timer
    if (videoRef.current) {
      try {
        if (videoRef.current.paused) {
          await videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log("Video toggle aborted (this is often fine)");
        } else {
          console.error("Error toggling video:", err);
        }
      }
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation(); // Stop click from bubbling to container
    showAndAutoHideControls(); // Reset the auto-hide timer
    if (videoRef.current) {
      const currentMuted = videoRef.current.muted;
      videoRef.current.muted = !currentMuted;
      setIsMuted(!currentMuted);
    }
  };

  const handleVideoContainerClick = async () => {
    // if (showPlayButton) return; // REMOVED
    
    // 1. Show/Reset timer for mute button
    showAndAutoHideControls(); 

    // 2. Perform the play/pause logic
    if (videoRef.current) {
      try {
        // NEW: Unmute on first play
        if (videoRef.current.muted) {
          videoRef.current.muted = false;
          setIsMuted(false);
        }
        
        // Toggle play/pause
        if (videoRef.current.paused) {
          await videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log("Video toggle aborted (this is often fine)");
        } else {
          console.error("Error toggling video:", err);
        }
      }
    }
  };

  return (
    <div
      ref={targetRef}
      className="h-[300vh] relative"
      style={{ fontFamily: FONT_FAMILY }}
    >
      {/* Sticky Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden"
           style={{ background: 'linear-gradient(180deg, #000000 20%, #2a2a4e 100%)' }}
      >

        {/* Hero Text */}
        <motion.div
          style={{ y: text1Y, opacity: text1Opacity }}
          className="absolute inset-0 z-30 flex items-center justify-center will-change-transform"
        >
          <h1 className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center leading-tight">
            Make Your
            <br />
            <TypingEffect />
            <br />
            Unforgettable
          </h1>
        </motion.div>

        {/* Video Card */}
        <motion.div
          style={{ y: videoCardY, scale: videoCardScale }}
          className="absolute top-0 w-full h-full flex items-center justify-center will-change-transform"
        >
          <div
            className="relative w-full h-full overflow-hidden rounded-lg cursor-pointer" // Added cursor-pointer
            onClick={handleVideoContainerClick} // Click handler on the whole container
          >

            {/* Video */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              controls={false}
              playsInline
              muted={isMuted}
              loop
              poster={VIDEO_THUMBNAIL}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => {
                setIsPlaying(false);
                // CHANGED: Show controls and keep them visible on end
                if (controlsTimeoutRef.current) {
                  clearTimeout(controlsTimeoutRef.current);
                }
                setShowControls(true);
              }}
            >
              <source src={PromoVideo} type="video/mp4" />
              Your browser does not support HTML video.
            </video>

            {/* Dark overlay */}
            <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-black z-10 will-change-transform" />

            {/* Sliding Text (Above overlay) */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              <motion.h2
                className="absolute top-20 left-8 md:top-24 md:left-12 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold will-change-transform whitespace-nowrap"
                style={{
                  x: textTopX,
                  opacity: textTopOpacity,
                  ...headTextStyle,
                }}
              >
                It’s Time
              </motion.h2>

              <motion.h2
                className="absolute bottom-20 right-8 sm:bottom-12 sm:right-12 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold will-change-transform whitespace-nowrap"
                style={{
                  x: textBottomX,
                  opacity: textBottomOpacity,
                  ...headTextStyle,
                }}
              >
                To Level Up
              </motion.h2>
            </div>

            {/* Play Button (Large, Initial) */}
            {/* REMOVED this entire block */}

            {/* Custom Controls (Small, Centered, Auto-hide) */}
            {/* CHANGED: Removed '!showPlayButton' check */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showControls ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center gap-4 bg-black/50 backdrop-blur-sm p-3 rounded-full shadow-lg pointer-events-auto"
              onClick={(e) => e.stopPropagation()} // Clicks on the control bar itself shouldn't bubble
            >
              <button
                onClick={togglePlayPause}
                className="text-white p-2 rounded-full transition-colors hover:bg-white/30"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button
                onClick={toggleMute}
                className="text-white p-2 rounded-full transition-colors hover:bg-white/30"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <MuteIcon /> : <UnmuteIcon />}
              </button>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}