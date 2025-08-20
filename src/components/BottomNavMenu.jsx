
// import React, { useState, useEffect } from "react";
// import {
//   Menu,
//   X,
//   Plus,
//   Bookmark,
//   Users,
//   Calendar,
//   Newspaper,
//   Crown,
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import useThemeStore from "../store/themeStore";
// import useAuthStore from "../store/authStore";
// import DarkModeToggle from "./DarkModeToggle";
// import Tabs_F_Mob from "./Tab_F_Mob.jsx";
// import api from "../utils/api1";

// const Navbar = () => {
//   const dark = useThemeStore((e) => e.dark);
//   const user = useAuthStore((s) => s.user);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [profileData, setProfileData] = useState(null);
//   const id = user?.id;

//   // Fetch profile data
//   async function me() {
//     try {
//       const res = await api.get("/user/me");
//       setProfileData(res.data);
//     } catch (error) {
//       console.error("Failed to fetch profile data:", error);
//     }
//   }

//   useEffect(() => {
//     if (user) {
//       me();
//     }
//   }, [user]);

//   // Close menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isMenuOpen && !event.target.closest(".mobile-menu-container")) {
//         setIsMenuOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isMenuOpen]);

//   // Prevent body scroll when menu is open
//   useEffect(() => {
//     if (isMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }

//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isMenuOpen]);

//   const navigationItems = [
//     {
//       icon: (
//         <Bookmark
//           size={18}
//           className={dark ? "text-gray-300" : "text-gray-700"}
//         />
//       ),
//       label: "Saved items",
//       href: "/my-items/",
//     },
//     {
//       icon: (
//         <Users size={18} className={dark ? "text-gray-300" : "text-gray-700"} />
//       ),
//       label: "Groups",
//       href: "/groups",
//     },
//     {
//       icon: (
//         <Newspaper
//           size={18}
//           className={dark ? "text-gray-300" : "text-gray-700"}
//         />
//       ),
//       label: "Newsletters",
//       href: "/newsletters",
//     },
//     {
//       icon: (
//         <Calendar
//           size={18}
//           className={dark ? "text-gray-300" : "text-gray-700"}
//         />
//       ),
//       label: "Events",
//       href: "/events",
//     },
//   ];

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };

//   return (
//     <>
//       <header
//         className={`${
//           dark
//             ? "bg-black text-white border-b-[0.1px] border-white/20"
//             : "bg-white text-black border-none border-gray-200"
//         } flex items-center justify-between px-5 text-3xl lg:text-4xl py-1 w-full lg:py-3 lg:pt-1 relative z-50`}
//       >
//         {/* Mobile Hamburger Menu Button */}
//         <div className="w-16 flex justify-start">
//           <button
//             onClick={toggleMenu}
//             className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${
//               dark ? "hover:bg-gray-800" : "hover:bg-gray-100"
//             }`}
//             aria-label="Toggle menu"
//           >
//             {isMenuOpen ? (
//               <X size={24} className={dark ? "text-white" : "text-black"} />
//             ) : (
//               <Menu size={24} className={dark ? "text-white" : "text-black"} />
//             )}
//           </button>
//         </div>

//         <div className="flex-1 flex justify-center">
//           <h1 className="text-center">
//             Mano
//             <span className="text-blue-500">Sangama</span>
//             <span className="lg:text-4xl text-orange-500">.</span>
//           </h1>
//         </div>

//         <div className="w-16 flex justify-end">
//           <DarkModeToggle />
//         </div>
//       </header>

//       {/* Mobile Menu Overlay */}
//       {isMenuOpen && (
//         <div
//           className="fixed inset-0 bg-transparent bg-opacity-50 z-40 lg:hidden"
//           onClick={closeMenu}
//         />
//       )}

//       {/* Mobile Slide-out Menu */}
//       <div
//         className={`mobile-menu-container fixed top-0 left-0 h-full w-67 max-w-[85vw] ${
//           dark
//             ? "bg-black border-r border-gray-800"
//             : "bg-white border-r border-gray-200"
//         } transform transition-transform duration-300 ease-in-out z-50 lg:hidden overflow-y-auto ${
//           isMenuOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         {/* Menu Header */}
//         <div
//           className={`flex items-center justify-between p-4 border-b ${
//             dark ? "border-gray-800" : "border-gray-200"
//           }`}
//         >
//           <h2
//             className={`text-xl font-semibold ${
//               dark ? "text-white" : "text-gray-900"
//             }`}
//           >
//             Menu
//           </h2>
//           <button
//             onClick={closeMenu}
//             className={`p-2 rounded-lg transition-colors ${
//               dark ? "hover:bg-gray-800" : "hover:bg-gray-100"
//             }`}
//             aria-label="Close menu"
//           >
//             <X size={20} className={dark ? "text-white" : "text-gray-900"} />
//           </button>
//         </div>

//         <div className="p-4 space-y-4">
//           {/* Profile Card */}
//           {profileData && (
//             <div
//               className={`${
//                 dark
//                   ? "bg-gray-900 border-gray-800"
//                   : "bg-white border-gray-200"
//               } rounded-lg border overflow-hidden shadow-sm`}
//             >
//               {/* Background and Profile Picture */}
//               <div className="relative">
//                 <div
//                   className="h-16 bg-gradient-to-r from-blue-400 to-blue-600 bg-cover bg-center"
//                   style={{
//                     backgroundImage: `url(${profileData.backgroundImage})`,
//                   }}
//                 />
//                 <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
//                   <img
//                     width="48"
//                     height="48"
//                     src={profileData.profileImage}
//                     loading="lazy"
//                     alt={`Photo of ${profileData.name}`}
//                     className="w-12 h-12 rounded-full border-4 border-white shadow-md"
//                   />
//                 </div>
//               </div>

//               {/* Profile Details */}
//               <div className="pt-8 px-4 pb-4">
//                 <Link to={`/${id}`} className="block" onClick={closeMenu}>
//                   <div className="text-center">
//                     <h3
//                       className={`text-base font-semibold ${
//                         dark
//                           ? "text-white hover:text-blue-400"
//                           : "text-gray-900 hover:text-blue-600"
//                       } transition-colors duration-200 line-clamp-2`}
//                     >
//                       {profileData.name}
//                     </h3>
//                     <p
//                       className={`text-sm ${
//                         dark ? "text-gray-400" : "text-gray-600"
//                       } mt-1 line-clamp-2`}
//                     >
//                       {profileData.headline}
//                     </p>
//                     <p
//                       className={`text-sm ${
//                         dark ? "text-gray-500" : "text-gray-500"
//                       } mt-1`}
//                     >
//                       {profileData.location}
//                     </p>
//                   </div>
//                 </Link>

//                 {/* Add Experience Button */}
//                 <button
//                   className={`w-full mt-3 py-2 px-3 ${
//                     dark
//                       ? "bg-gray-800 hover:bg-gray-700 border-gray-700"
//                       : "bg-gray-50 hover:bg-gray-100 border-gray-200"
//                   } border rounded-md transition-colors duration-200 group`}
//                   aria-label="Add Experience"
//                   type="button"
//                 >
//                   <div className="flex items-center justify-center space-x-2">
//                     <Plus
//                       size={16}
//                       className={
//                         dark
//                           ? "text-gray-400 group-hover:text-gray-200"
//                           : "text-gray-600 group-hover:text-gray-800"
//                       }
//                     />
//                     <span
//                       className={`text-sm font-medium ${
//                         dark
//                           ? "text-gray-300 group-hover:text-gray-100"
//                           : "text-gray-700 group-hover:text-gray-900"
//                       }`}
//                     >
//                       Experience
//                     </span>
//                   </div>
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Tabs Component */}
//           <div
//             className={`${
//               dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
//             } rounded-lg p-2`}
//           >
//             <Tabs_F_Mob />
//           </div>

//           {/* Premium Upsell Card */}
//           <div
//             className={`${
//               dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
//             } rounded-lg border p-4 shadow-sm`}
//           >
//             <a
//               href="/premium/products"
//               className="block group"
//               aria-label="Premium subscription offer"
//               onClick={closeMenu}
//             >
//               <h3
//                 className={`text-sm ${
//                   dark ? "text-gray-400" : "text-gray-600"
//                 } font-normal pb-2`}
//               >
//                 Accelerate your career
//               </h3>
//               <div className="flex items-start space-x-2">
//                 <Crown
//                   size={20}
//                   className="text-amber-500 flex-shrink-0 mt-0.5"
//                 />
//                 <span
//                   className={`text-sm font-medium ${
//                     dark
//                       ? "text-white group-hover:text-blue-400"
//                       : "text-gray-900 group-hover:text-blue-600"
//                   } transition-colors duration-200`}
//                 >
//                   Try Premium for ₹0
//                 </span>
//               </div>
//             </a>
//           </div>

//           {/* Navigation Links Card */}
//           <div
//             className={`${
//               dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
//             } rounded-lg border p-4 shadow-sm`}
//           >
//             <ul className="space-y-4">
//               {navigationItems.map((item, index) => (
//                 <li key={index}>
//                   <a
//                     href={item.href}
//                     className="block group"
//                     aria-label={item.label}
//                     onClick={closeMenu}
//                   >
//                     <div className="flex items-center space-x-3">
//                       <div className="flex-shrink-0">{item.icon}</div>
//                       <span
//                         className={`text-sm font-medium ${
//                           dark
//                             ? "text-white group-hover:text-blue-400"
//                             : "text-gray-900 group-hover:text-blue-600"
//                         } transition-colors duration-200`}
//                       >
//                         {item.label}
//                       </span>
//                     </div>
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;
