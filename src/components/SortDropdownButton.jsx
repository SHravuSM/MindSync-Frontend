// import { ChevronDown } from "lucide-react";
// import { useState, useRef, useEffect } from "react";
// import useThemeStore from "../store/themeStore";

// function SortDropdownButton({
//   sortBy = "Top",
//   onSortChange,
//   disabled = false,
//   variant = "default",
//   className = "",
// }) {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const dropdownRef = useRef(null);
//   const setTop = useThemeStore((s) => s.setTop);
//   const top = useThemeStore((s) => s.top);
//   const sortOptions = ["Top", "Recent"];

//   const variants = {
//     default: {
//       text: "text-black",
//       lightText: "text-gray-600",
//       border: "border-gray-300",
//       icon: "text-gray-600",
//       dropdown: "bg-white border-gray-200 shadow-lg",
//       option: "hover:bg-gray-50 text-gray-900",
//     },
//     dark: {
//       text: "text-white",
//       lightText: "text-gray-400",
//       border: "border-gray-600",
//       icon: "text-gray-400",
//       dropdown: "bg-gray-800 border-gray-600 shadow-xl",
//       option: "hover:bg-gray-700 text-gray-100",
//     },
//   };

//   const styles = variants[variant];

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsExpanded(false);
//       }
//     };

//     if (isExpanded) {
//       document.addEventListener("mousedown", handleClickOutside);
//       return () =>
//         document.removeEventListener("mousedown", handleClickOutside);
//     }
//   }, [isExpanded]);

//   const handleToggle = () => {
//     if (!disabled) {
//       setIsExpanded(!isExpanded);
//     }
//   };

//   const handleOptionSelect = (option) => {
//     const be = option == "Top" ? "Top" : "Recent";
//     setTop(be);
//     onSortChange?.(option);
//     setIsExpanded(false);
//   };

//   return (
//     <div className="relative my-1.0 mb-1.5" ref={dropdownRef}>
//       <button
//         aria-expanded={isExpanded}
//         aria-label="Sort order dropdown button"
//         className={`
//           flex items-center w-full border-0 bg-transparent p-0 cursor-pointer
//           disabled:opacity-50 disabled:cursor-not-allowed
//           hover:opacity-80 transition-opacity
//           ${className}
//         `}
//         type="button"
//         tabIndex={disabled ? -1 : 0}
//         onClick={handleToggle}
//         disabled={disabled}
//       >
//         {/* Divider Line */}
//         <hr className={`flex-grow border-t ${styles.border} mr-2 my-0`} />

//         {/* Content */}
//         <div className={`flex items-center ${styles.text}`}>
//           <span className={`text-xs ${styles.lightText} font-normal`}>
//             Sort by:
//           </span>
//           <span className="text-xs font-bold mx-1">{sortBy}</span>
//           <ChevronDown
//             size={16}
//             className={`${styles.icon} transition-transform ${
//               isExpanded ? "rotate-180" : ""
//             }`}
//             aria-hidden="true"
//           />
//         </div>
//       </button>

//       {/* Dropdown Menu */}
//       {isExpanded && (
//         <div
//           className={`
//           absolute right-0 top-full mt-1 w-32 rounded-md border z-50
//           ${styles.dropdown}
//         `}
//         >
//           {sortOptions.map((option) => (
//             <button
//               key={option}
//               className={`
//                 w-full px-3 py-2 text-left text-xs font-medium rounded-md
//                 ${
//                   option === sortBy ? "bg-blue-50 text-blue-600" : styles.option
//                 }
//                 ${
//                   variant === "dark" && option === sortBy
//                     ? "bg-blue-900 text-blue-300"
//                     : ""
//                 }
//               `}
//               onClick={() => handleOptionSelect(option)}
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default SortDropdownButton;

// import { ChevronDown } from "lucide-react";
// import { useState, useRef, useEffect } from "react";
// import useThemeStore from "../store/themeStore";

// function SortDropdownButton({
//   disabled = false,
//   variant = "default",
//   className = "",
//   onSortChange,
// }) {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const dropdownRef = useRef(null);

//   // Global store state
//   const top = useThemeStore((s) => s.top);
//   const setTop = useThemeStore((s) => s.setTop);

//   const sortOptions = ["Top", "Recent"];

//   const variants = {
//     default: {
//       text: "text-black",
//       lightText: "text-gray-600",
//       border: "border-gray-300",
//       icon: "text-gray-600",
//       dropdown: "bg-white border-gray-200 shadow-lg",
//       option: "hover:bg-gray-50 text-gray-900",
//     },
//     dark: {
//       text: "text-white",
//       lightText: "text-gray-400",
//       border: "border-gray-600",
//       icon: "text-gray-400",
//       dropdown: "bg-gray-800 border-gray-600 shadow-xl",
//       option: "hover:bg-gray-700 text-gray-100",
//     },
//   };

//   const styles = variants[variant];

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsExpanded(false);
//       }
//     };

//     if (isExpanded) {
//       document.addEventListener("mousedown", handleClickOutside);
//       return () =>
//         document.removeEventListener("mousedown", handleClickOutside);
//     }
//   }, [isExpanded]);

//   const handleToggle = () => {
//     if (!disabled) {
//       setIsExpanded(!isExpanded);
//     }
//   };

//   const handleOptionSelect = (option) => {
//     setTop(option); // update store
//     onSortChange?.(option); // callback if parent needs it
//     setIsExpanded(false);
//   };

//   return (
//     <div className="relative my-1 mb-1.5" ref={dropdownRef}>
//       <button
//         aria-expanded={isExpanded}
//         aria-label="Sort order dropdown button"
//         className={`
//           flex items-center w-full border-0 bg-transparent p-0 cursor-pointer
//           disabled:opacity-50 disabled:cursor-not-allowed
//           hover:opacity-80 transition-opacity
//           ${className}
//         `}
//         type="button"
//         tabIndex={disabled ? -1 : 0}
//         onClick={handleToggle}
//         disabled={disabled}
//       >
//         {/* Divider Line */}
//         <hr className={`flex-grow border-t ${styles.border} mr-2 my-0`} />

//         {/* Content */}
//         <div className={`flex items-center ${styles.text}`}>
//           <span className={`text-xs ${styles.lightText} font-normal`}>
//             Sort by:
//           </span>
//           <span className="text-xs font-bold mx-1">{top}</span>
//           <ChevronDown
//             size={16}
//             className={`${styles.icon} transition-transform ${
//               isExpanded ? "rotate-180" : ""
//             }`}
//             aria-hidden="true"
//           />
//         </div>
//       </button>

//       {/* Dropdown Menu */}
//       {isExpanded && (
//         <div
//           className={`
//           absolute right-0 top-full mt-1 w-32 rounded-md border z-50
//           ${styles.dropdown}
//         `}
//         >
//           {sortOptions.map((option) => (
//             <button
//               key={option}
//               className={`
//                 w-full px-3 py-2 text-left text-xs font-medium rounded-md
//                 ${
//                   option === top
//                     ? variant === "dark"
//                       ? "bg-blue-900 text-blue-300"
//                       : "bg-blue-50 text-blue-600"
//                     : styles.option
//                 }
//               `}
//               onClick={() => handleOptionSelect(option)}
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default SortDropdownButton;

// import { ChevronDown } from "lucide-react";
// import { useState, useRef, useEffect, useCallback } from "react";
// import useThemeStore from "../store/themeStore";

// function SortDropdownButton({
//   disabled = false,
//   variant = "default",
//   className = "",
//   onSortChange,
// }) {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const dropdownRef = useRef(null);

//   // ✅ FIX: Split selectors to avoid infinite loop
//   const top = useThemeStore((s) => s.top);
//   const dark = useThemeStore((s) => s.dark);
//   console.log(top);
//   const setTop = useThemeStore((s) => s.setTop);

//   const sortOptions = ["Top", "Recent"];

//   const variants = {
//     default: {
//       text: "text-black",
//       lightText: "text-gray-600",
//       border: "border-gray-300",
//       icon: "text-gray-600",
//       dropdown: "bg-white border-gray-200 shadow-lg",
//       option: "hover:bg-gray-50 text-gray-900",
//       active: "bg-blue-50 text-blue-600",
//     },
//     dark: {
//       text: "text-white",
//       lightText: "text-gray-400",
//       border: "border-gray-600",
//       icon: "text-gray-400",
//       dropdown: "bg-gray-800 border-gray-600 shadow-xl",
//       option: "hover:bg-gray-700 text-gray-100",
//       active: "bg-blue-900 text-blue-300",
//     },
//   }[variant];

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     if (!isExpanded) return;
//     const handleClickOutside = (e) => {
//       if (!dropdownRef.current?.contains(e.target)) setIsExpanded(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isExpanded]);

//   const handleToggle = useCallback(() => {
//     if (!disabled) setIsExpanded((prev) => !prev);
//   }, [disabled]);

//   const handleOptionSelect = useCallback(
//     (option) => {
//       setTop(option);
//       onSortChange?.(option);
//       setIsExpanded(false);
//     },
//     [onSortChange, setTop]
//   );

//   return (
//     <div className="relative my-1 mb-1.5" ref={dropdownRef}>
//       <button
//         aria-expanded={isExpanded}
//         aria-label="Sort order dropdown button"
//         type="button"
//         disabled={disabled}
//         tabIndex={disabled ? -1 : 0}
//         onClick={handleToggle}
//         className={`
//           flex items-center w-full border-0 bg-transparent p-0 cursor-pointer
//           hover:opacity-80 transition-opacity
//           disabled:opacity-50 disabled:cursor-not-allowed
//           ${className}
//         `}
//       >
//         {/* Divider Line */}
//         <hr className={`flex-grow border-t ${variants.border} mr-2`} />

//         {/* Content */}
//         <div className={`flex items-center ${variants.text}`}>
//           <span className={`text-xs ${variants.lightText}`}>Sort by:</span>
//           <span className="text-xs font-bold mx-1">{top}</span>
//           <ChevronDown
//             size={16}
//             aria-hidden="true"
//             className={`${variants.icon} transition-transform ${
//               isExpanded ? "rotate-180" : ""
//             }`}
//           />
//         </div>
//       </button>

//       {/* Dropdown */}
//       {isExpanded && (
//         <div
//           className={`
//             absolute right-0 top-full mt-1 w-32 rounded-md border z-50
//             ${variants.dropdown}
//           `}
//         >
//           {sortOptions.map((option) => (
//             <button
//               key={option}
//               onClick={() => handleOptionSelect(option)}
//               className={`
//                 w-full px-3 py-2 text-left text-xs font-medium rounded-md
//                 ${option === top ? variants.active : variants.option}
//               `}
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default SortDropdownButton;

import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import useThemeStore from "../store/themeStore";

function SortDropdownButton({
  disabled = false,
  className = "",
  onSortChange,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const dropdownRef = useRef(null);

  // Get theme values from store
  const top = useThemeStore((s) => s.top);
  const dark = useThemeStore((s) => s.dark);
  const setTop = useThemeStore((s) => s.setTop);

  const sortOptions = ["Top", "Recent"];

  // Theme-aware styles that automatically switch based on dark mode
  const getStyles = () => ({
    text: dark ? "text-white" : "text-black",
    lightText: dark ? "text-gray-400" : "text-gray-600",
    border: dark ? "border-gray-600" : "border-gray-300",
    icon: dark ? "text-gray-400" : "text-gray-600",
    dropdown: dark
      ? "bg-gray-800 border-gray-600 shadow-xl"
      : "bg-white border-gray-200 shadow-lg",
    option: dark
      ? "hover:bg-gray-700 text-gray-100"
      : "hover:bg-gray-50 text-gray-900",
    active: dark ? "bg-blue-900 text-blue-300" : "bg-blue-50 text-blue-600",
  });

  const styles = getStyles();

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isExpanded) return;
    const handleClickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) setIsExpanded(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isExpanded]);

  const handleToggle = useCallback(() => {
    if (!disabled) setIsExpanded((prev) => !prev);
  }, [disabled]);

  const handleOptionSelect = useCallback(
    (option) => {
      setTop(option);
      onSortChange?.(option);
      setIsExpanded(false);
    },
    [onSortChange, setTop]
  );

  return (
    <div className="relative my-1 mb-1.5" ref={dropdownRef}>
      <button
        aria-expanded={isExpanded}
        aria-label="Sort order dropdown button"
        type="button"
        disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={handleToggle}
        className={`
          flex items-center w-full border-0 bg-transparent p-0 cursor-pointer
          hover:opacity-80 transition-opacity
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
      >
        {/* Divider Line */}
        <hr className={`flex-grow border-t ${styles.border} mr-2`} />

        {/* Content */}
        <div className={`flex items-center ${styles.text}`}>
          <span className={`text-xs ${styles.lightText}`}>Sort by:</span>
          <span className="text-xs font-bold mx-1">{top}</span>
          <ChevronDown
            size={16}
            aria-hidden="true"
            className={`${styles.icon} transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Dropdown */}
      {isExpanded && (
        <div
          className={`
            absolute right-0 top-full mt-1 w-32 rounded-md border z-50
            ${styles.dropdown}
          `}
        >
          {sortOptions.map((option) => (
            <button
              key={option}
              onClick={() => handleOptionSelect(option)}
              className={`
                w-full px-3 py-2 text-left text-xs font-medium rounded-md
                transition-colors duration-150
                ${option === top ? styles.active : styles.option}
              `}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SortDropdownButton;
