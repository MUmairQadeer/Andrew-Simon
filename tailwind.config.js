/** @type {import('tailwindcss').Config} */
module.exports = {
  // Scan EVERY html/js/tsx file so Tailwind doesn't purge needed styles
  content: ["./**/*.{html,js,jsx,ts,tsx}"],

  theme: { extend: {} },

  // Safelist classes that often get built dynamically and break scrolling/layout
  safelist: [
    "overflow-y-auto","overflow-y-scroll","overflow-hidden",
    "sticky","top-0","fixed","absolute","relative",
    "snap-y","snap-x","snap-mandatory","snap-start","snap-center",
    "h-screen","min-h-screen","w-screen","max-h-screen"
  ],
};
