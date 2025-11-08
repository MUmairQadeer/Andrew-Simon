import React from 'react'; // Corrected this line
import { useState } from 'react';
import { motion } from 'framer-motion';

// --- Data for the service panels (UPDATED with your new content) ---
const servicesData = [
  {
    id: 1,
    title: "Coaching",
    description: "One-on-One training, coaching and mentorship with a world champion.",
    points: [
      "Fully customized for your goals, challenges, and opportunities",
      "Each session provides actionable tools and techniques you can apply immediately.",
      "Focus on storytelling, clarity, emotional engagement, persuasion, delivery, and more."
    ],
    hoverBg: "https://placehold.co/600x800/6D28D9/FFFFFF?text=Coaching+Media"
  },
  {
    id: 2,
    title: "Feedback",
    description: "Get expert feedback before your next big presentation",
    points: [
      "Book as much or as little time as you need",
      "Totally custom - focus on your top priorities",
      "Perfect for improving delivery, refining your message, and sharpening stories"
    ],
    hoverBg: "https://placehold.co/600x800/1D4ED8/FFFFFF?text=Feedback+Media"
  },
  {
    id: 3,
    title: "Presentations",
    description: "Page-to-stage support, taking you from rough notes to standing ovation",
    points: [
      "”All-in” VIP service that combines refining your message, writing/rewriting your speech, and perfecting your delivery.",
      "Proven systems and processes = rapid turnaround times",
      "Perfect for TEDx talks, keynotes, award speeches, pitches, and other high-stakes presentations."
    ],
    hoverBg: "https://placehold.co/600x800/047857/FFFFFF?text=Presentations+Media"
  },
  {
    id: 4,
    title: "Other Services",
    description: "Looking to improve your communication in other areas?",
    points: [
      "1-on-1 support with Interpersonal communication, presenting yourself with clarity and confidence and more.",
      "Enhancing critical skills: mastering high-stakes interviews, enhancing your persuasion and influence",
      "Communicating your unique value proposition—from investment pitches to online dating profiles.",
      "Let us know what you’re looking for—we’ll let you know if we can help you."
    ],
    hoverBg: "https://placehold.co/600x800/BE123C/FFFFFF?text=Other+Services"
  }
];

// This is the shared background image for all panels
const sharedBgImage = "https://placehold.co/1920x1080/555555/cccccc?text=Shared+Background+Image";


// --- Main App Component ---
export default function App() {
  const [activeIndex, setActiveIndex] = useState(null);

  // This is the title area height (h3 + padding)
  // We use it to calculate how much to hide the content
  const titleHeight = "80px"; 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-900 p-4 sm:p-10">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">Our Services</h2>
      
      {/* This is the main container for the panels.
        It no longer holds the background image itself.
      */}
      <div 
        className="flex h-[800px] sm:h-[700px] w-full max-w-7xl mx-auto rounded-xl overflow-hidden bg-gray-800"
        // Reset active index when mouse leaves the whole container
        onMouseLeave={() => setActiveIndex(null)}
      >
        {servicesData.map((service, index) => (
          <ServicePanel
            key={service.id}
            service={service}
            isActive={activeIndex === index}
            onHover={() => setActiveIndex(index)}
            titleHeight={titleHeight}
            index={index} // Pass index for bg positioning
            totalPanels={servicesData.length} // Pass total for bg positioning
          />
        ))}
      </div>
    </div>
  );
}

// --- ServicePanel Component ---
function ServicePanel({ service, isActive, onHover, titleHeight, index, totalPanels }) {
 
  // 1. Panel expansion animation (unchanged)
  const panelVariants = {
    inactive: { flex: 1 },
    active: { flex: 2.5 }
  };

  // 2. NEW: Hover background SLIDES in from top
  const backgroundVariants = {
    inactive: { y: "-100%" },
    active: { y: "0%" }
  };

  // 3. Content slide-up animation (unchanged)
  const contentVariants = {
    inactive: { y: `calc(100% - ${titleHeight})` },
    active: { y: 0 }
  };

  // 4. NEW: Calculate background-position for the shared image slice
  // This makes each panel show a different "slice" of the sharedBgImage
  const sharedBgPosition = `${(index / (totalPanels - 1)) * 100}% center`;

  return (
    <motion.div
      className="relative h-full overflow-hidden cursor-pointer"
      initial={false}
      animate={isActive ? 'active' : 'inactive'}
      variants={panelVariants}
      transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
      onMouseEnter={onHover}
      onClick={onHover}
    >
      {/* LAYER 1: Shared Background Slice (z-0)
        This is the grayscale image "slice" visible by default.
      */}
      <div
        className="absolute inset-0 z-0 transition-all duration-700"
        style={{
          backgroundImage: `url(${sharedBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: sharedBgPosition,
          filter: 'grayscale(100%)', // Always grayscale
        }}
      />

      {/* LAYER 2: Hover Background (z-10)
        This slides in from the top on hover.
      */}
      <motion.div
        className="absolute inset-0 z-10"
        variants={backgroundVariants}
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
      >
        {/* The actual hover image/video */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${service.hoverBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        {/* Semi-transparent overlay (sits on top of hover image) */}
        <div className="absolute inset-0 bg-black/60"></div>
      </motion.div>

      {/* LAYER 3: Text Content (z-20)
        This slides up from the bottom.
      */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-6 text-white h-full"
        style={{ overflowY: isActive ? 'auto' : 'hidden' }}
        variants={contentVariants}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ minHeight: '40px' }}>
          {service.title}
        </h3>
        
        {/* This content is hidden until the panel is active */}
        <div className="space-y-3 pr-2">
          <p className="text-sm sm:text-base">{service.description}</p>
          <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
            {service.points.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}