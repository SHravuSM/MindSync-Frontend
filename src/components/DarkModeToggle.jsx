// import React, { useEffect, useState } from "react";

// // Elegant Dark/Light Mode Toggle
// // - Uses `localStorage` to persist choice under key: 'theme'
// // - Respects OS preference on first load (prefers-color-scheme)
// // - Toggles the `dark` class on <html> (Tailwind classic 'class' strategy)
// // - Accessible button with animated thumb and icons

// export default function DarkModeToggle() {
//   const [theme, setTheme] = useState(() => {
//     try {
//       const saved = localStorage.getItem("theme");
//       if (saved === "light" || saved === "dark") return saved;
//     } catch (e) {
//       // ignore
//     }
//     // Default: follow OS preference
//     if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
//       return "dark";
//     }
//     return "light";
//   });

//   // apply theme by toggling `dark` class on <html>
//   useEffect(() => {
//     const root = document.documentElement;
//     if (theme === "dark") {
//       root.classList.add("dark");
//     } else {
//       root.classList.remove("dark");
//     }
//     try {
//       localStorage.setItem("theme", theme);
//     } catch (e) {
//       // ignore
//     }
//   }, [theme]);

//   // Optional: respond to system preference changes
//   useEffect(() => {
//     const mq = window.matchMedia("(prefers-color-scheme: dark)");
//     const handler = (e) => {
//       // only change if user hasn't explicitly chosen (we still persist choice though)
//       const saved = localStorage.getItem("theme");
//       if (!saved) setTheme(e.matches ? "dark" : "light");
//     };
//     if (mq?.addEventListener) mq.addEventListener("change", handler);
//     else if (mq?.addListener) mq.addListener(handler);
//     return () => {
//       if (mq?.removeEventListener) mq.removeEventListener("change", handler);
//       else if (mq?.removeListener) mq.removeListener(handler);
//     };
//   }, []);

//   const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

//   return (
//     <div className="flex items-center gap-4">
//       <div className="hidden sm:flex flex-col text-sm">
//         <span className="font-medium text-slate-700 dark:text-slate-200">Theme</span>
//         <span className="text-xs text-slate-500 dark:text-slate-400">{theme === "dark" ? "Dark mode" : "Light mode"}</span>
//       </div>

//       <button
//         onClick={toggle}
//         aria-pressed={theme === "dark"}
//         aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
//         className={
//           "relative w-14 h-8 flex items-center rounded-full transition-all duration-300 focus:outline-none ring-2 ring-transparent "+
//           "dark:ring-slate-600/40 focus-visible:ring-sky-400/40"
//         }
//       >
//         {/* track */}
//         <span
//           className={
//             "absolute inset-0 rounded-full bg-gradient-to-r from-white/90 to-slate-100/80 dark:from-slate-800/80 dark:to-slate-700/80 "+
//             "shadow-inner transition-colors duration-300"
//           }
//         />

//         {/* moving thumb */}
//         <span
//           className={
//             "relative z-10 inline-block w-7 h-7 rounded-full transform transition-transform duration-300 shadow-md "+
//             (theme === "dark" ? " translate-x-6 bg-slate-900" : " translate-x-1 bg-white")
//           }
//         >
//           {/* icons inside the thumb */}
//           <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
//             {theme === "dark" ? (
//               // moon
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
//                 <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" />
//               </svg>
//             ) : (
//               // sun
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
//                 <path d="M12 4V2M12 22v-2M4 12H2M22 12h-2M5 5l-1.5-1.5M20.5 20.5 19 19M5 19l-1.5 1.5M20.5 3.5 19 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                 <circle cx="12" cy="12" r="3" fill="currentColor" />
//               </svg>
//             )}
//           </span>
//         </span>

//         {/* subtle glow when dark */}
//         <span
//           className={
//             "absolute -left-1 -top-1 w-6 h-6 rounded-full opacity-0 transition-opacity duration-300 "+
//             (theme === "dark" ? " opacity-70 bg-yellow-400/20 blur-sm" : " opacity-0")
//           }
//         />
//       </button>
//     </div>
//   );
// }

// /*
// Usage:
// 1. Ensure Tailwind is configured with `darkMode: 'class'` in tailwind.config.js.
// 2. Import and render <DarkModeToggle /> anywhere in your app (header, settings, etc.).
// 3. The component will add/remove the `dark` class on the <html> element so Tailwind's dark: utilities work globally.

// Example: tailwind.config.js -> module.exports = { darkMode: 'class', ... }

// Accessibility notes:
// - The button uses aria-pressed and aria-label for screen readers.
// - Keyboard focus ring is preserved.

// Want it to toggle a data-theme attribute instead of `class` or to animate with Framer Motion? Tell me and I'll update it.
// */

// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function DarkModeToggle() {
//   const [theme, setTheme] = useState(() => {
//     const saved = localStorage.getItem("theme");
//     if (saved) return saved;
//     return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
//   });

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", theme === "dark");
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggle = () => setTheme(t => (t === "dark" ? "light" : "dark"));

//   return (
//     <motion.button
//       onClick={toggle}
//       aria-pressed={theme === "dark"}
//       aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
//       className="relative w-9 h-9 rounded-full flex items-center justify-center overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/40 border border-slate-300 dark:border-slate-600 shadow-lg"
//       whileTap={{ scale: 0.9, rotate: 15 }}
//       transition={{ type: "spring", stiffness: 400, damping: 18 }}
//     >
//       <AnimatePresence initial={false}>
//         <motion.div
//           key={theme}
//           className="absolute inset-0"
//           initial={{ scale: 0, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1, background: theme === "dark" ? "conic-gradient(from 180deg, #0f172a, #1e293b)" : "conic-gradient(from 0deg, #fefce8, #fde68a)" }}
//           exit={{ scale: 0, opacity: 0 }}
//           transition={{ duration: 0.6, type: "spring" }}
//         />
//       </AnimatePresence>

//       <motion.div
//         className="w-5 h-5 rounded-full flex items-center justify-center z-10 backdrop-blur-sm"
//         animate={{
//           rotate: theme === "dark" ? 360 : -360,
//           backgroundColor: theme === "dark" ? "#0f172a" : "#ffffff",
//           boxShadow: theme === "dark" ? "0 0 10px rgba(255,255,0,0.4)" : "0 0 10px rgba(255,200,0,0.6)"
//         }}
//         transition={{ type: "spring", stiffness: 300, damping: 20 }}
//       >
//         <AnimatePresence mode="wait" initial={false}>
//           {theme === "dark" ? (
//             <motion.svg
//               key="galaxy"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               width="14"
//               height="14"
//               fill="currentColor"
//               className="text-indigo-400"
//               initial={{ scale: 0, rotate: -180 }}
//               animate={{ scale: 1, rotate: 0 }}
//               exit={{ scale: 0, rotate: 180 }}
//               transition={{ duration: 0.5 }}
//             >
//               <path d="M12 3a9 9 0 0 0 0 18 9 9 0 0 0 0-18zm0 2a7 7 0 0 1 0 14 7 7 0 0 1 0-14z" />
//               <circle cx="12" cy="12" r="2" />
//             </motion.svg>
//           ) : (
//             <motion.svg
//               key="sunburst"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               width="14"
//               height="14"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.5"
//               className="text-orange-400"
//               initial={{ scale: 0, rotate: 180 }}
//               animate={{ scale: 1, rotate: 0 }}
//               exit={{ scale: 0, rotate: -180 }}
//               transition={{ duration: 0.5 }}
//             >
//               <circle cx="12" cy="12" r="3" fill="currentColor" />
//               <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
//             </motion.svg>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </motion.button>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function DarkModeToggle() {
//   const [theme, setTheme] = useState(() => {
//     const saved = localStorage.getItem("theme");
//     return saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
//   });

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", theme === "dark");
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   return (
//     <motion.button
//       onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//       className={`w-8 h-8 rounded-lg flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 ${
//         theme === "dark" ? "bg-slate-800 shadow-lg shadow-blue-500/20" : "bg-amber-100 shadow-lg shadow-amber-500/30"
//       }`}
//       whileTap={{ scale: 0.9 }}
//       whileHover={{ scale: 1.1 }}
//       transition={{ type: "spring", stiffness: 400, damping: 25 }}
//     >
//       <AnimatePresence mode="wait">
//         {theme === "dark" ? (
//           <motion.svg
//             key="moon"
//             width="14"
//             height="14"
//             viewBox="0 0 24 24"
//             fill="currentColor"
//             className="text-slate-300"
//             initial={{ scale: 0, rotate: -90 }}
//             animate={{ scale: 1, rotate: 0 }}
//             exit={{ scale: 0, rotate: 90 }}
//             transition={{ duration: 0.3 }}
//           >
//             <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
//           </motion.svg>
//         ) : (
//           <motion.svg
//             key="sun"
//             width="14"
//             height="14"
//             viewBox="0 0 24 24"
//             fill="currentColor"
//             className="text-amber-500"
//             initial={{ scale: 0, rotate: 90 }}
//             animate={{ scale: 1, rotate: 0 }}
//             exit={{ scale: 0, rotate: -90 }}
//             transition={{ duration: 0.3 }}
//           >
//             <circle cx="12" cy="12" r="5" />
//             <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42m12.72-12.72l1.42-1.42" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
//           </motion.svg>
//         )}
//       </AnimatePresence>
//     </motion.button>
//   );
// }

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useThemeStore from "../store/themeStore";

export default function DarkModeToggle() {
  const setDark = useThemeStore((e) => e.setDark);
  const dark = useThemeStore((e) => e.dark);
  //   const [theme, setTheme] = useState(() => {
  //     const saved = localStorage.getItem("theme");
  //     return saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  //   });

  //   useEffect(() => {
  //     document.documentElement.classList.toggle("dark", theme === "dark");
  //   }, [dark]);

  return (
    <motion.button
      onClick={() => setDark()}
      className={`lg:w-8 w-7 h-7 lg:h-8 rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-2 border transition-all duration-300 ${
        dark
          ? "bg-gray-900 border-gray-700 focus-visible:ring-blue-500/50 shadow-md shadow-blue-500/20"
          : "bg-white border-gray-200 focus-visible:ring-orange-500/50 shadow-md shadow-orange-500/20"
      }`}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <AnimatePresence mode="wait">
        {dark ? (
          <motion.svg
            key="moon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-orange-500"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </motion.svg>
        ) : (
          <motion.svg
            key="sun"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-orange-500"
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -180 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
          >
            <circle cx="12" cy="12" r="4" />
            <path
              d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M17.66 6.34l1.41-1.41"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
