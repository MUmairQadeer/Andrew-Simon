// src/gsapSetup.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger once, globally
gsap.registerPlugin(ScrollTrigger);

// Tame iOS/Android momentum & address-bar resize
try { ScrollTrigger.normalizeScroll(true); } catch(e){}
// Slightly anticipate pin to reduce jumps on mobile
ScrollTrigger.config({ anticipatePin: 0 });

// (Optional) export gsap so you can import it from here everywhere
export { gsap, ScrollTrigger };
