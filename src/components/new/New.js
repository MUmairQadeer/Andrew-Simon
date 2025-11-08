import React, { useState, useEffect, useRef } from 'react';
import {
    motion,
    AnimatePresence,
    useScroll,
} from 'framer-motion';
import { CheckCircle2 } from 'lucide-react'; // Added for cleaner bullets

// Define color palette based on speakwithsimon.com inspiration
const colors = {
    primaryBlue: '#0A2B4C', // Deep Navy
    accentGold: '#D4AF37', // Gold
    lightText: '#F9FAFB', // gray-50
    darkText: '#1F2937', // gray-800
};

// --- Data for the sticky scroll section ---
const featureData = [
    {
        title: 'Faster',
        bullets: [
            'Our VIP service means your needs and deadlines receive our undivided attention.',
            'No wasted time. Every minute is focused entirely on you—your challenges, your goals, and your dream outcome.',
            'Speeches ready in days, not weeks.',
        ],
        // Placeholder image with theme colors
        image: `https://placehold.co/800x600/${colors.primaryBlue.substring(
            1
        )}/${colors.lightText.substring(1)}?text=Faster+VIP+Service&font=inter`,
    },
    {
        title: 'Simpler',
        bullets: [
            'Every step of the process is designed to eliminate stress, anxiety, and wasted time.',
            'Friendly, personal VIP care that supports you every step of the way.',
            'Nothing left to chance—clear, actionable advice on your content, clarity, deliverable, and more.',
        ],
        image: `https://placehold.co/800x600/${colors.primaryBlue.substring(
            1
        )}/${colors.lightText.substring(1)}?text=Simpler+Process&font=inter`,
    },
    {
        title: 'Better',
        bullets: [
            'Take advantage of 20+ years of public speaking and speech writing experience',
            '1-on-1 VIP service means speeches and solutions specifically tailored to your style, personality, audience, and goals.',
            'Combining real-time expert feedback with extensive tools and resources for truly transformative results.',
        ],
        image: `https://placehold.co/800x600/${colors.primaryBlue.substring(
            1
        )}/${colors.lightText.substring(1)}?text=Better+Results&font=inter`,
    },
];

// --- Animation Variants for Lists ---
const listVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.4, // Time between each bullet point
            delayChildren: 0.3, // Wait before starting the stagger
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

// --- Section 1: Hero Component ---
function HeroSection() {
    return (
        <div
            className="w-full text-center"
            style={{
                backgroundColor: colors.primaryBlue,
                color: colors.lightText,
            }}
        >
            <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">
                <motion.h1
                    className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight" // Responsive text
                    style={{ color: colors.accentGold }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    Better Results.
                    <br />
                    Less Time.
                </motion.h1>
                <motion.p
                    className="text-base sm:text-lg md:text-xl mt-6 text-gray-200" // Responsive text
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                >
                    Public speaking coaching, speech writing services, and
                    last-minute tune-ups. Providing you the fully personalized,
                    1-on-1 concierge service you deserve.
                </motion.p>
            </div>
        </div>
    );
}

// --- Section 2: Sticky Scroll Feature Component ---
function StickyScrollFeature() {
    const [activeSection, setActiveSection] = useState(0);
    const scrollRef = useRef(null);
    
    // --- New for Highlight Bar ---
    const headingRefs = useRef([]);
    const [highlightStyle, setHighlightStyle] = useState({ top: 0, height: 0 });
    // --- End New ---

    // 1. useScroll to track scroll progress of the scrollRef container
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ['start start', 'end end'], // Track from start of container to end
    });

    // 2. Update activeSection state based on scroll progress
    useEffect(() => {
        const unsubscribe = scrollYProgress.onChange((latest) => {
            const numSections = featureData.length;
            const newSection = Math.min(
                numSections - 1,
                Math.floor(latest * numSections)
            );

            // Use functional update to get the most recent state
            setActiveSection((currentActiveSection) => {
                if (newSection !== currentActiveSection) {
                    return newSection; // Set the new state
                }
                return currentActiveSection; // Keep the current state
            });
        });

        // Cleanup function to unsubscribe
        return () => unsubscribe();
    }, [scrollYProgress]);

    // --- New Effect to update highlight bar ---
    useEffect(() => {
        if (headingRefs.current[activeSection]) {
            const activeRef = headingRefs.current[activeSection];
            setHighlightStyle({
                top: activeRef.offsetTop,
                height: activeRef.offsetHeight,
            });
        }
    }, [activeSection]);
    // --- End New Effect ---


    // 3. Handle clicking on a heading
    const handleHeadingClick = (index) => {
        setActiveSection(index);

        if (scrollRef.current) {
            const numSections = featureData.length;
            // Calculate total scrollable height *within the ref element*
            const containerScrollHeight =
                scrollRef.current.offsetHeight - window.innerHeight;
            // Get the scroll position for the start of the clicked section
            const sectionScrollTop = (containerScrollHeight / numSections) * index;
            // Get the absolute top position of the container itself
            const containerTop = scrollRef.current.offsetTop;

            // Scroll the window to the container's top + the section's scroll position
            window.scrollTo({
                top: containerTop + sectionScrollTop,
                behavior: 'smooth',
            });
        }
    };

    return (
        // This parent container defines the scrollable height (300vh for 3 sections)
        <div
            ref={scrollRef}
            className="relative"
            // Set height to be 100vh per section
                style={{ height: `${featureData.length * 100}vh` }}
        >
            {/* This div sticks to the top and holds the 100vh content */}
            <div
                className="sticky top-0 h-screen w-full overflow-hidden"
                style={{
                    backgroundColor: colors.primaryBlue,
                    color: colors.lightText,
                }}
            >
                {/* 2-Column Grid Layout */}
                <div className="max-w-7xl mx-auto h-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-24 items-center px-6 md:px-8">
                    {/* --- LEFT COLUMN (Image/Video Box) --- */}
                    <div className="w-full h-[250px] sm:h-[300px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSection} // Change key to trigger AnimatePresence
                                className="relative w-full h-full"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {/* Background Image */}
                                <img
                                    src={featureData[activeSection].image}
                                    alt={featureData[activeSection].title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src =
                                            'https://placehold.co/800x600/1f2937/f9fafb?text=Image+Not+Found&font=inter';
                                    }}
                                />

                                {/* Semi-transparent overlay - FIX was here */}
                                <div className="absolute inset-0 bg-black/60"></div>

                                {/* Animated Bullet Points */}
                                <motion.ul
                                    className="absolute inset-0 z-10 flex flex-col justify-center p-6 sm:p-8 md:p-12 text-white" // Responsive padding
                                    variants={listVariants}
                                    initial="hidden"
                                    animate="visible"
                                    key={`list-${activeSection}`} // Ensure list re-animates
                                >
                                    {featureData[activeSection].bullets.map(
                                        (bullet, i) => (
                                            <motion.li
                                                key={i}
                                                variants={itemVariants}
                                                className="text-sm sm:text-base md:text-xl mb-4 flex items-start" // Responsive text
                                                style={{
                                                    textShadow:
                                                        '0 1px 3px rgba(0,0,0,0.5)',
                                                }}
                                            >
                                                <CheckCircle2
                                                    className="w-5 h-5 md:w-6 md:h-6 mr-3 mt-1 flex-shrink-0"
                                                    style={{ color: colors.accentGold }}
                                                />
                                                <span>{bullet}</span>
                                            </motion.li>
                                        )
                                    )}
                                </motion.ul>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* --- RIGHT COLUMN (Headings & Text) --- */}
                    <div className="flex flex-col justify-between py-8 md:py-24 md:h-full">
                        
                        {/* Headings - Added 'relative' and 'pl-6' */}
                        <div className="relative space-y-6 pl-6">
                            
                            {/* --- New Animated Highlight Bar --- */}
                            <motion.div
                                className="absolute left-0 w-1.5 rounded-full"
                                style={{ backgroundColor: colors.accentGold }}
                                animate={highlightStyle}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            />
                            {/* --- End New Bar --- */}
                            
                            {featureData.map((item, index) => (
                                <h2
                                    key={index}
                                    // --- Added ref for highlight bar ---
                                    ref={(el) => (headingRefs.current[index] = el)}
                                    // --- End ref ---
                                    className="text-2xl sm:text-3xl md:text-5xl font-bold cursor-pointer transition-all duration-300" // Responsive text
                                    style={{
                                        color:
                                            activeSection === index
                                                ? colors.accentGold
                                                : 'rgba(249, 250, 251, 0.5)', // gray-50 with opacity
                                        opacity:
                                            activeSection === index ? 1 : 0.7,
                                    }}
                                    onClick={() => handleHeadingClick(index)}
                                >
                                    {item.title}
                                </h2>
                            ))}
                        </div>

                        {/* Spacer */}
                        <div className="flex-grow"></div>

                        {/* Bottom Text & Button */}
                        <div>
                            <p className="text-base text-gray-300">
                                All services supported by our money-back 100%
                                satisfaction guarantee.
                            </p>
                            <motion.button
                                className="font-bold py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg mt-4 sm:mt-6 shadow-lg" // Responsive text/padding
                                style={{
                                    backgroundColor: colors.accentGold,
                                    color: colors.primaryBlue,
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 400,
                                    damping: 17,
                                }}
                            >
                                Book Your Free Session
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Main App Component ---
export default function New() {
    return (
        <div
            className="min-h-screen"
            style={{ backgroundColor: colors.primaryBlue }}
        >
            <HeroSection />
            <StickyScrollFeature />
            {/* Add a final section to allow scrolling past the sticky feature */}
            {/* <div
                className="h-screen flex items-center justify-center text-center"
                style={{ backgroundColor: '#08223f' /* Slightly lighter blue */ }
            {/* > */} *
                {/* <h2
                    className="text-4xl font-bold"
                    style={{ color: colors.accentGold }}
                >
                    Ready to transform your speaking?
                </h2> */}
            {/* </div> */}
        </div>
    );
}