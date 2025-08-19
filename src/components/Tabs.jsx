// import { Link, useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
// import useThemeStore from "../store/themeStore";

// const Tabs = () => {
//   const location = useLocation();
//   const dark = useThemeStore(s=>s.dark);
//   const active = location.pathname.includes("pitch") ? "pitch" : "posts";

//   return (
//     <div className="relative flex w-full max-w-md mx-auto  overflow-hidden">
//       {/* Sliding Highlight Background */}
//       <motion.div
//         layout
//         transition={{ type: "spring", stiffness: 400, damping: 30 }}
//         className="absolute top-1 bottom-1 left-2 w-24 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg shadow-md"
//         initial={false}
//         animate={{
//           x: active === "posts" ? "0%" : "113%",
//         }}
//       />

//       {/* Posts Tab */}
//       <Link
//         to="."
//         className={`relative w-1/2 flex-1 py-3 text-sm font-semibold text-center z-10 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
//           active === "posts"
//             ? "text-white"
//             : "text-gray-600 hover:text-gray-900"
//         }`}
//       >
//         Posts
//       </Link>

//       {/* Pitches Tab */}
//       <Link
//         to="pitch"
//         className={`relative w-1/2 flex-1 py-3 text-sm font-semibold text-center z-10 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
//           active === "pitch"
//             ? "text-white"
//             : "text-gray-600 hover:text-gray-900"
//         }`}
//       >
//         Pitches
//       </Link>
//     </div>
//   );
// };

// export default Tabs;

import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import useThemeStore from "../store/themeStore";

const Tabs = () => {
  const location = useLocation();
  const dark = useThemeStore((s) => s.dark);
  const active = location.pathname.includes("pitch") ? "pitch" : "posts";

  return (
    <div
      className={`relative flex w-[95%] max-w-md mx-auto overflow-hidden ${
        dark ? "bg-black" : "bg-gray-100"
      } rounded-md`}
    >
      {/* Sliding Highlight Background */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={`absolute top-1 bottom-1 left-1 w-24 rounded-sm shadow-md ${
          dark
            ? "bg-gradient-to-r from-blue-500 to-blue-400"
            : "bg-gradient-to-r from-blue-600 to-blue-500"
        }`}
        initial={false}
        animate={{
          x: active === "posts" ? "0%" : "113%",
        }}
      />

      {/* Posts Tab */}
      <Link
        to="."
        className={`relative w-1/2 flex-1 py-3 text-sm font-semibold text-center z-10 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
          active === "posts"
            ? "text-white"
            : dark
            ? "text-white hover:text-gray-100"
            : "text-black hover:text-gray-900"
        }`}
      >
        Posts
      </Link>

      {/* Pitches Tab */}
      <Link
        to="pitch"
        className={`relative w-1/2 flex-1 py-3 text-sm font-semibold text-center z-10 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
          active === "pitch"
            ? "text-white"
            : dark
            ? "text-white hover:text-gray-100"
            : "text-black hover:text-gray-900"
        }`}
      >
        Pitches
      </Link>
    </div>
  );
};

export default Tabs;


// border-gray-200 bg-white shadow-sm rounded-md