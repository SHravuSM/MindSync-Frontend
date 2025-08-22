// // import { Link, useNavigate } from "react-router-dom";
// // import useThemeStore from "../store/themeStore";
// // import useAuthStore from "../store/authStore";
// // import {
// //   CircleUser,
// //   House,
// //   LogOut,
// //   PenTool,
// //   Search,
// //   SquarePen,
// //   TextSearch,
// // } from "lucide-react";

// // const BottomNav = () => {
// //   const navigate = useNavigate();

// //   const user = useAuthStore((s) => s.user);
// //   const logOut = useAuthStore((s) => s.logOut);

// //   const dark = useThemeStore((s) => s.dark);
// //   const setYes = useThemeStore((s) => s.setYes);
// //   const setState = useThemeStore((s) => s.setState);

// //   return (
// //     <div
// //       className={`bottom-0 bg-transparent mb-1 fixed flex z-100 w-full items-center justify-center transition-transform duration-500 drop-shadow-xl ${
// //         !dark ? "text-black" : "text-white"
// //       }`}
// //     >
// //       <form className="w-full h-full" action="#">
// //         <ul
// //           className={`flex items-center w-full justify-center bg-transparent shadow-lg overflow-hidden lg:space-x-10 space-x-5`}
// //         >
// //           <input
// //             defaultChecked
// //             name="rad"
// //             id="choose1"
// //             type="radio"
// //             className="hidden peer/one"
// //           />
// //           <label htmlFor="choose1">
// //             <Link to="." className="inline-block">
// //               <House strokeWidth={1.5} />
// //             </Link>
// //           </label>

// //           <input
// //             name="rad"
// //             id="choose2"
// //             type="radio"
// //             className="hidden peer/two"
// //           />
// //           <label htmlFor="choose2">
// //             <Link to="profile" className="inline-block">
// //               <Search strokeWidth={1.35} />
// //             </Link>
// //           </label>

// //           {user?.role === "user" && (
// //             <>
// //               <input
// //                 name="rad"
// //                 id="choose3"
// //                 type="radio"
// //                 className="hidden peer/three"
// //               />
// //               <label htmlFor="choose3">
// //                 <button
// //                   onClick={setYes}
// //                   className="text-xl flex items-center pb-1 justify-center"
// //                 >
// //                   <Link to="createpost">
// //                     <PenTool size={25} strokeWidth={1.25} className="-rotate-90" />
// //                   </Link>
// //                 </button>
// //               </label>
// //             </>
// //           )}

// //           <input
// //             name="rad"
// //             id="choose5"
// //             type="radio"
// //             className="hidden peer/five"
// //           />

// //           <label htmlFor="choose5">
// //             <Link
// //               to={
// //                 user && user.role == "user"
// //                   ? `/user/${user.id}/profile`
// //                   : `/investor/${user.id}/profile`
// //               }
// //               className="inline-block"
// //             >
// //               <CircleUser strokeWidth={1.4} />
// //             </Link>
// //           </label>

// //           <button
// //             onClick={(e) => {
// //               e.preventDefault();
// //               logOut();
// //               navigate("/");
// //             }}
// //           >
// //             <LogOut />
// //           </button>
// //         </ul>
// //       </form>
// //     </div>
// //   );
// // };

// // export default BottomNav;

// // import { useState, useContext } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import useThemeStore from "../store/themeStore";
// // import useAuthStore from "../store/authStore";
// // import {
// //   CircleUser,
// //   House,
// //   LogOut,
// //   PenTool,
// //   Search,
// //   Fullscreen,
// //   SplinePointer,
// //   SquareChevronUp,
// //   SquareMousePointer,
// //   LogIn,
// //   ArrowDownToDot,
// // } from "lucide-react";
// // import { FullscreenContext } from "../context/FullscreenContext"; // your fullscreen provider

// // const BottomNav = () => {
// //   const navigate = useNavigate();

// //   const user = useAuthStore((s) => s.user);
// //   const logOut = useAuthStore((s) => s.logOut);

// //   const dark = useThemeStore((s) => s.dark);
// //   const setYes = useThemeStore((s) => s.setYes);

// //   const { enterFullscreen, isFullscreen, exitFullscreen } =
// //     useContext(FullscreenContext);

// //   const [showMenu, setShowMenu] = useState(false);

// //   return (
// //     <div
// //       className={`bottom-0 bg-transparent mb-1 fixed flex z-100 w-full items-center justify-center transition-transform duration-500 drop-shadow-xl ${
// //         !dark ? "text-black" : "text-white"
// //       }`}
// //     >
// //       <form className="w-full h-full" action="#">
// //         <ul
// //           className={`flex items-center w-full justify-center bg-transparent shadow-lg overflow-hidden lg:space-x-10 space-x-5`}
// //         >
// //           <input
// //             defaultChecked
// //             name="rad"
// //             id="choose1"
// //             type="radio"
// //             className="hidden peer/one"
// //           />
// //           <label htmlFor="choose1">
// //             <Link to="." className="inline-block">
// //               <House strokeWidth={1.5} />
// //             </Link>
// //           </label>

// //           <input
// //             name="rad"
// //             id="choose2"
// //             type="radio"
// //             className="hidden peer/two"
// //           />
// //           <label htmlFor="choose2">
// //             <Link to="profile" className="inline-block">
// //               <Search strokeWidth={1.35} />
// //             </Link>
// //           </label>

// //           {user?.role === "user" && (
// //             <>
// //               <input
// //                 name="rad"
// //                 id="choose3"
// //                 type="radio"
// //                 className="hidden peer/three"
// //               />
// //               <label htmlFor="choose3">
// //                 <button
// //                   onClick={setYes}
// //                   className="text-xl flex items-center pb-1 justify-center"
// //                 >
// //                   <Link to="createpost">
// //                     <PenTool
// //                       size={25}
// //                       strokeWidth={1.25}
// //                       className="-rotate-90"
// //                     />
// //                   </Link>
// //                 </button>
// //               </label>
// //             </>
// //           )}

// //           <input
// //             name="rad"
// //             id="choose5"
// //             type="radio"
// //             className="hidden peer/five"
// //           />
// //           <label htmlFor="choose5">
// //             <Link
// //               to={
// //                 user && user.role === "user"
// //                   ? `/user/${user.id}/profile`
// //                   : `/investor/${user.id}/profile`
// //               }
// //               className="inline-block"
// //             >
// //               <CircleUser strokeWidth={1.4} />
// //             </Link>
// //           </label>

// //           {/* Menu button */}
// //           <div className="relative">
// //             <button
// //               onClick={(e) => {
// //                 e.preventDefault();
// //                 setShowMenu((prev) => !prev);
// //               }}
// //               className="mb-2"
// //             >
// //               <SplinePointer size={25} strokeWidth={1.25} />
// //             </button>

// //             {/* {showMenu && (
// //               <div
// //                 className={`absolute z-10 h-20 w-32 border-black bottom-full mb-20 bg-black shadow-lg rounded-lg border`}
// //               >
// //                 <button
// //                   onClick={() => {
// //                     logOut();
// //                     navigate("/");
// //                   }}
// //                   className="flex items-center px-4 py-2 w-full hover:bg-gray-200 dark:hover:bg-gray-700"
// //                 >
// //                   <LogOut className="mr-2" size={18} /> Logout
// //                 </button>
// //                 <button
// //                   onClick={() => {
// //                     if (isFullscreen) enterFullscreen();
// //                     else exitFullscreen();
// //                   }}
// //                   className="flex items-center px-4 py-2 w-full hover:bg-gray-200 dark:hover:bg-gray-700"
// //                 >
// //                   <SplinePointer strokeWidth={1} />{" "}
// //                   {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
// //                 </button>
// //               </div>
// //             )} */}

// //             {showMenu && (
// //               <div className="fixed bottom-full mb-4 w-40 bg-black border border-gray-700 shadow-lg rounded-lg z-10 overflow-hidden">
// //                 <button
// //                   onClick={() => {
// //                     logOut();
// //                     navigate("/");
// //                   }}
// //                   className="flex items-center px-2 py-2 w-full text-white hover:bg-gray-800 transition-colors"
// //                 >
// //                   <ArrowDownToDot className="mr-2 -rotate-90" strokeWidth={1} />{" "}
// //                   Logout
// //                 </button>

// //                 <div className="border-t border-gray-700" />

// //                 <button
// //                   onClick={(e) => {
// //                     e.preventDefault();
// //                     if (isFullscreen) exitFullscreen();
// //                     else enterFullscreen();
// //                   }}
// //                   className="flex items-center px-2 py-2 w-full text-white hover:bg-gray-800 transition-colors"
// //                 >
// //                   <SquareMousePointer className="mr-2" strokeWidth={1} />
// //                   {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         </ul>
// //       </form>
// //     </div>
// //   );
// // };

// // export default BottomNav;

// // import { useState, useContext, useEffect } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import useThemeStore from "../store/themeStore";
// // import useAuthStore from "../store/authStore";
// // import {
// //   CircleUser,
// //   House,
// //   LogOut,
// //   PenTool,
// //   Search,
// //   SplinePointer,
// //   SquareMousePointer,
// //   ArrowDownToDot,
// // } from "lucide-react";
// // import { FullscreenContext } from "../context/FullscreenContext";

// // const BottomNav = () => {
// //   const navigate = useNavigate();
// //   const user = useAuthStore((s) => s.user);
// //   const logOut = useAuthStore((s) => s.logOut);
// //   const dark = useThemeStore((s) => s.dark);
// //   const setYes = useThemeStore((s) => s.setYes);
// //   const { enterFullscreen, isFullscreen, exitFullscreen } =
// //     useContext(FullscreenContext);

// //   const [showMenu, setShowMenu] = useState(false);
// //   const [isDesktop, setIsDesktop] = useState(false);

// //   // Detect desktop
// //   useEffect(() => {
// //     const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
// //     handleResize();
// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   return (
// //     <div
// //       className={`bottom-0 fixed flex z-100 w-full items-center justify-center mb-1 transition-transform duration-500 drop-shadow-xl ${
// //         !dark ? "text-black" : "text-white"
// //       }`}
// //     >
// //       <form className="w-full h-full">
// //         <ul className="flex items-center w-full justify-center bg-transparent shadow-lg overflow-hidden lg:space-x-10 space-x-5">
// //           {/* Home */}
// //           <input
// //             defaultChecked
// //             name="rad"
// //             id="choose1"
// //             type="radio"
// //             className="hidden peer/one"
// //           />
// //           <label htmlFor="choose1">
// //             <Link to="." className="inline-block">
// //               <House strokeWidth={1.5} />
// //             </Link>
// //           </label>

// //           {/* Search */}
// //           <input
// //             name="rad"
// //             id="choose2"
// //             type="radio"
// //             className="hidden peer/two"
// //           />
// //           <label htmlFor="choose2">
// //             <Link to="profile" className="inline-block">
// //               <Search strokeWidth={1.35} />
// //             </Link>
// //           </label>

// //           {/* Create post */}
// //           {user?.role === "user" && (
// //             <>
// //               <input
// //                 name="rad"
// //                 id="choose3"
// //                 type="radio"
// //                 className="hidden peer/three"
// //               />
// //               <label htmlFor="choose3">
// //                 <button
// //                   onClick={setYes}
// //                   className="text-xl flex items-center pb-1 justify-center"
// //                 >
// //                   <Link to="createpost">
// //                     <PenTool
// //                       size={25}
// //                       strokeWidth={1.25}
// //                       className="-rotate-90"
// //                     />
// //                   </Link>
// //                 </button>
// //               </label>
// //             </>
// //           )}

// //           {/* Profile */}
// //           <input
// //             name="rad"
// //             id="choose5"
// //             type="radio"
// //             className="hidden peer/five"
// //           />
// //           <label htmlFor="choose5">
// //             <Link
// //               to={
// //                 user && user.role === "user"
// //                   ? `/user/${user.id}/profile`
// //                   : `/investor/${user.id}/profile`
// //               }
// //               className="inline-block"
// //             >
// //               <CircleUser strokeWidth={1.4} />
// //             </Link>
// //           </label>

// //           {/* Menu */}
// //           <div
// //             onClick={(e) => {
// //               e.preventDefault();
// //               setShowMenu((prev) => !prev);
// //             }}
// //             className="relative"
// //           >
// //             <button
// //               onClick={(e) => {
// //                 if (!isDesktop) {
// //                   e.preventDefault();
// //                   setShowMenu((prev) => !prev);
// //                 }
// //               }}
// //               className="mb-2"
// //             >
// //               <SplinePointer size={25} strokeWidth={1.25} />
// //             </button>

// //             {showMenu && (
// //               <div className="fixed bottom-full mb-1 border-red-500 w-40 bg-black border shadow-lg rounded-lg z-10 overflow-hidden">
// //                 <button
// //                   onClick={() => {
// //                     logOut();
// //                     navigate("/");
// //                   }}
// //                   className="flex items-center px-2 py-2 w-full text-white hover:bg-gray-800 transition-colors"
// //                 >
// //                   <ArrowDownToDot className="mr-2 -rotate-90" strokeWidth={1} />{" "}
// //                   Logout
// //                 </button>

// //                 <div className="border-t border-gray-700" />

// //                 <button
// //                   onClick={(e) => {
// //                     e.preventDefault();
// //                     if (isFullscreen) exitFullscreen();
// //                     else enterFullscreen();
// //                   }}
// //                   className="flex items-center px-2 py-2 w-full text-white hover:bg-gray-800 transition-colors"
// //                 >
// //                   <SquareMousePointer className="mr-2" strokeWidth={1} />
// //                   {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         </ul>
// //       </form>
// //     </div>
// //   );
// // };

// // export default BottomNav;

// import { useState, useContext, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import useThemeStore from "../store/themeStore";
// import useAuthStore from "../store/authStore";
// import {
//   CircleUser,
//   House,
//   LogOut,
//   PenTool,
//   Search,
//   SplinePointer,
//   SquareMousePointer,
//   ArrowDownToDot,
// } from "lucide-react";
// import { FullscreenContext } from "../context/FullscreenContext";

// const BottomNav = () => {
//   const navigate = useNavigate();
//   const user = useAuthStore((s) => s.user);
//   const logOut = useAuthStore((s) => s.logOut);
//   const dark = useThemeStore((s) => s.dark);
//   const setYes = useThemeStore((s) => s.setYes);
//   const { enterFullscreen, isFullscreen, exitFullscreen } =
//     useContext(FullscreenContext);

//   const [showMenu, setShowMenu] = useState(false);
//   const [isDesktop, setIsDesktop] = useState(false);

//   // Detect desktop
//   useEffect(() => {
//     const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div
//       className={`lg:bottom-1 bottom-1.5 fixed flex z-100 w-full items-center justify-center ${
//         !dark ? "text-black" : "text-white"
//       } `}
//     >
//       <form className="w-full relative h-full">
//         <ul className="flex items-center w-full justify-center bg-transparent overflow-hidden lg:space-x-14 space-x-8">
//           {/* Home */}
//           <input
//             defaultChecked
//             name="rad"
//             id="choose1"
//             type="radio"
//             className="hidden peer/one"
//           />
//           <label
//             htmlFor="choose1"
//             className="transition-all duration-200 hover:scale-105 active:scale-95"
//           >
//             <Link
//               to={`/${user.id}/feed`}
//               className="inline-block transition-colors duration-200 hover:opacity-80"
//             >
//               <House
//                 strokeWidth={1.5}
//                 className="transition-transform duration-200 hover:rotate-3"
//               />
//             </Link>
//           </label>

//           {/* Search */}
//           <div className="lg:hidden">
//             <Link
//               to="search"
//               className="inline-block transition-colors duration-200 hover:opacity-80"
//             >
//               <Search
//                 strokeWidth={1.35}
//                 className="transition-transform duration-200 hover:rotate-12"
//               />
//             </Link>
//           </div>

//           {/* Create post */}
//           {user?.role === "user" && (
//             <>
//               <input
//                 name="rad"
//                 id="choose3"
//                 type="radio"
//                 className="hidden peer/three"
//               />
//               <label
//                 htmlFor="choose3"
//                 className="transition-all duration-200 hover:scale-105 active:scale-95"
//               >
//                 <button
//                   onClick={setYes}
//                   className="text-xl flex items-center pb-1 justify-center transition-colors duration-200 hover:opacity-80"
//                 >
//                   <Link to="createpost">
//                     <PenTool
//                       size={25}
//                       strokeWidth={1.25}
//                       className="-rotate-90 transition-transform duration-200 hover:rotate-[-85deg]"
//                     />
//                   </Link>
//                 </button>
//               </label>
//             </>
//           )}

//           {/* Profile */}
//           <input
//             name="rad"
//             id="choose5"
//             type="radio"
//             className="hidden peer/five"
//           />
//           <label
//             htmlFor="choose5"
//             className="transition-all duration-200 hover:scale-105 active:scale-95"
//           >
//             <Link
//               to={`/${user.id}`}
//               className="inline-block transition-colors duration-200 hover:opacity-80"
//             >
//               <CircleUser
//                 strokeWidth={1.4}
//                 className="transition-transform duration-200 hover:rotate-6"
//               />
//             </Link>
//           </label>

//           {/* Menu */}

//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               setShowMenu((prev) => !prev);
//             }}
//             className={`mb-2 transition-all duration-200 hover:scale-105 active:scale-95 ${
//               showMenu ? "rotate-35" : ""
//             }`}
//           >
//             <SplinePointer
//               size={25}
//               strokeWidth={1.25}
//               className="transition-transform duration-300 hover:rotate-35"
//             />
//           </button>
//         </ul>
//         {showMenu && (
//           <div
//             className={`
//                 absolute bottom-9 lg:right-4/12 right-1 w-40 bg-black shadow-lg rounded-lg z-10 overflow-hidden
//                 transition-all duration-300 ease-out transform
//                 animate-in slide-in-from-bottom-2 fade-in
//                 // ${showMenu ? "opacity-100 scale-100" : "opacity-0 scale-95"}
//               `}
//           >
//             <button
//               onClick={() => {
//                 logOut();
//                 navigate("/");
//               }}
//               className="flex items-center hover:text-red-500 px-2 py-2 w-full text-white transition-all duration-200 hover:scale-95 hover:translate-x-1"
//             >
//               <LogOut className="mr-2 " strokeWidth={1} />
//               Logout
//             </button>

//             <div className="border-t border-gray-700" />

//             <button
//               onClick={(e) => {
//                 e.preventDefault();
//                 if (isFullscreen) exitFullscreen();
//                 else enterFullscreen();
//               }}
//               className="flex items-center  hover:text-blue-500 px-2 py-2 w-full text-white transition-all duration-200 hover:scale-95"
//             >
//               <SquareMousePointer
//                 className="mr-2 transition-transform duration-200"
//                 strokeWidth={1}
//               />
//               {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
//             </button>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default BottomNav;

// import { useState, useContext, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import useThemeStore from "../store/themeStore.js";
// import useAuthStore from "../store/authStore.js";
// import {
//   CircleUser,
//   House,
//   LogOut,
//   PenTool,
//   Search,
//   Menu,
//   X,
//   Plus,
//   Bookmark,
//   Users,
//   Calendar,
//   Newspaper,
//   Crown,
//   SquareMousePointer,
// } from "lucide-react";
// import { FullscreenContext } from "../context/FullscreenContext.jsx";
// import Tabs_F_Mob from "./Tab_F_Mob.jsx";
// import api from "../utils/api1.js";

// const BottomNav = () => {
//   const navigate = useNavigate();
//   const user = useAuthStore((s) => s.user);
//   const logOut = useAuthStore((s) => s.logOut);
//   const dark = useThemeStore((s) => s.dark);
//   const setYes = useThemeStore((s) => s.setYes);
//   const { enterFullscreen, isFullscreen, exitFullscreen } =
//     useContext(FullscreenContext);

//   const [isDesktop, setIsDesktop] = useState(false);

//   // Hamburger menu states
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

//   // Detect desktop
//   useEffect(() => {
//     const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

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
//       <div
//         className={`lg:bottom-1 bottom-1.5 fixed flex z-100 w-full items-center justify-center ${
//           !dark ? "text-black" : "text-white"
//         } `}
//       >
//         <form className="w-full relative h-full">
//           <ul className="flex items-center w-full justify-center bg-transparent overflow-hidden lg:space-x-14 space-x-8">
//             {/* Home */}
//             <input
//               defaultChecked
//               name="rad"
//               id="choose1"
//               type="radio"
//               className="hidden peer/one"
//             />
//             <label
//               htmlFor="choose1"
//               className="transition-all duration-200 hover:scale-105 active:scale-95"
//             >
//               <Link
//                 to={`/${user.id}/feed`}
//                 className="inline-block transition-colors duration-200 hover:opacity-80"
//               >
//                 <House
//                   strokeWidth={1.5}
//                   className="transition-transform duration-200 hover:rotate-3"
//                 />
//               </Link>
//             </label>

//             {/* Search */}
//             <div className="lg:hidden">
//               <Link
//                 to="search"
//                 className="inline-block transition-colors duration-200 hover:opacity-80"
//               >
//                 <Search
//                   strokeWidth={1.35}
//                   className="transition-transform duration-200 hover:rotate-12"
//                 />
//               </Link>
//             </div>

//             {/* Create post */}
//             {user?.role === "user" && (
//               <>
//                 <input
//                   name="rad"
//                   id="choose3"
//                   type="radio"
//                   className="hidden peer/three"
//                 />
//                 <label
//                   htmlFor="choose3"
//                   className="transition-all duration-200 hover:scale-105 active:scale-95"
//                 >
//                   <button
//                     onClick={setYes}
//                     className="text-xl flex items-center pb-1 justify-center transition-colors duration-200 hover:opacity-80"
//                   >
//                     <Link to="createpost">
//                       <PenTool
//                         size={25}
//                         strokeWidth={1.25}
//                         className="-rotate-90 transition-transform duration-200 hover:rotate-[-85deg]"
//                       />
//                     </Link>
//                   </button>
//                 </label>
//               </>
//             )}

//             {/* Profile */}
//             <input
//               name="rad"
//               id="choose5"
//               type="radio"
//               className="hidden peer/five"
//             />
//             <label
//               htmlFor="choose5"
//               className="transition-all duration-200 hover:scale-105 active:scale-95"
//             >
//               <Link
//                 to={`/${user.id}`}
//                 className="inline-block transition-colors duration-200 hover:opacity-80"
//               >
//                 <CircleUser
//                   strokeWidth={1.4}
//                   className="transition-transform duration-200 hover:rotate-6"
//                 />
//               </Link>
//             </label>

//             {/* Hamburger Menu - Last Option */}
//             <div className="w-16 flex justify-end">
//               <button
//                 onClick={toggleMenu}
//                 className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${
//                   dark ? "hover:bg-gray-800" : "hover:bg-gray-100"
//                 }`}
//                 aria-label="Toggle menu"
//               >
//                 {isMenuOpen ? (
//                   <X size={24} className={dark ? "text-white" : "text-black"} />
//                 ) : (
//                   <Menu size={24} className={dark ? "text-white" : "text-black"} />
//                 )}
//               </button>
//             </div>
//           </ul>
//         </form>
//       </div>

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

//           {/* Additional Menu Options */}
//           <div
//             className={`${
//               dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
//             } rounded-lg border p-4 shadow-sm`}
//           >
//             <ul className="space-y-4">
//               <li>
//                 <button
//                   onClick={() => {
//                     if (isFullscreen) exitFullscreen();
//                     else enterFullscreen();
//                   }}
//                   className="flex items-center space-x-3 w-full group"
//                   aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
//                 >
//                   <div className="flex-shrink-0">
//                     <SquareMousePointer
//                       size={18}
//                       className={dark ? "text-gray-300" : "text-gray-700"}
//                     />
//                   </div>
//                   <span
//                     className={`text-sm font-medium ${
//                       dark
//                         ? "text-white group-hover:text-blue-400"
//                         : "text-gray-900 group-hover:text-blue-600"
//                     } transition-colors duration-200`}
//                   >
//                     {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
//                   </span>
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => {
//                     logOut();
//                     navigate("/");
//                     closeMenu();
//                   }}
//                   className="flex items-center space-x-3 w-full group"
//                   aria-label="Logout"
//                 >
//                   <div className="flex-shrink-0">
//                     <LogOut
//                       size={18}
//                       className={dark ? "text-gray-300" : "text-gray-700"}
//                     />
//                   </div>
//                   <span
//                     className={`text-sm font-medium ${
//                       dark
//                         ? "text-white group-hover:text-red-400"
//                         : "text-gray-900 group-hover:text-red-600"
//                     } transition-colors duration-200`}
//                   >
//                     Logout
//                   </span>
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BottomNav;

// import { useState, useContext, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import useThemeStore from "../store/themeStore";
// import useAuthStore from "../store/authStore";
// import {
//   CircleUser,
//   House,
//   LogOut,
//   PenTool,
//   Search,
//   Menu,
//   X,
//   Plus,
//   Bookmark,
//   Users,
//   Calendar,
//   Newspaper,
//   Crown,
//   SquareMousePointer,
//   SplinePointer,
// } from "lucide-react";
// import { FullscreenContext } from "../context/FullscreenContext";
// import Tabs_F_Mob from "./Tab_F_Mob.jsx";
// import api from "../utils/api1";

// const BottomNav = () => {
//   const navigate = useNavigate();
//   const user = useAuthStore((s) => s.user);
//   const logOut = useAuthStore((s) => s.logOut);
//   const dark = useThemeStore((s) => s.dark);
//   const setYes = useThemeStore((s) => s.setYes);
//   const { enterFullscreen, isFullscreen, exitFullscreen } =
//     useContext(FullscreenContext);

//   const [showMenu, setShowMenu] = useState(false);
//   const [isDesktop, setIsDesktop] = useState(false);

//   // Hamburger menu states
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [profileData, setProfileData] = useState(null);
//   const id = user?.id;

//   // Fetch profile data
//   const fetchProfileData = async () => {
//     if (!user) return;

//     try {
//       const res = await api.get("/user/me");
//       setProfileData(res.data);
//     } catch (error) {
//       console.error("Failed to fetch profile data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProfileData();
//   }, [user]);

//   // Detect desktop
//   useEffect(() => {
//     const handleResize = () => {
//       const desktop = window.innerWidth >= 1024;
//       setIsDesktop(desktop);
//       // Close menu on desktop
//       if (desktop && isMenuOpen) {
//         setIsMenuOpen(false);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [isMenuOpen]);

//   // Close menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         isMenuOpen &&
//         !event.target.closest(".mobile-menu-container") &&
//         !event.target.closest(".hamburger-button")
//       ) {
//         setIsMenuOpen(false);
//       }
//     };

//     if (isMenuOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//       document.addEventListener("touchstart", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("touchstart", handleClickOutside);
//     };
//   }, [isMenuOpen]);

//   // Prevent body scroll when menu is open
//   useEffect(() => {
//     if (isMenuOpen) {
//       document.body.style.overflow = "hidden";
//       document.body.style.position = "fixed";
//       document.body.style.width = "100%";
//     } else {
//       document.body.style.overflow = "";
//       document.body.style.position = "";
//       document.body.style.width = "";
//     }

//     return () => {
//       document.body.style.overflow = "";
//       document.body.style.position = "";
//       document.body.style.width = "";
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

//   const toggleMenu = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };

//   const handleMenuItemClick = (callback) => {
//     return (e) => {
//       if (callback) callback(e);
//       closeMenu();
//     };
//   };

//   // Don't render if no user
//   if (!user) return null;

//   return (
//     <>
//       <div
//         className={`lg:bottom-1 bottom-1.5 fixed flex z-100 w-full items-center justify-center ${
//           !dark ? "text-black" : "text-white"
//         }`}
//       >
//         <div className="w-full relative h-full">
//           <ul className="flex items-center w-full justify-center bg-transparent overflow-hidden lg:space-x-14 space-x-8">
//             {/* Home */}
//             <li className="transition-all duration-200 hover:scale-105 active:scale-95">
//               <Link
//                 to={`/${user.id}/feed`}
//                 className="inline-block transition-colors duration-200 hover:opacity-80"
//               >
//                 <House
//                   strokeWidth={1.5}
//                   className="transition-transform duration-200 hover:rotate-3"
//                 />
//               </Link>
//             </li>

//             {/* Search */}
//             <li className="lg:hidden">
//               <Link
//                 to={`/${user.id}/search`}
//                 className="inline-block transition-colors duration-200 hover:opacity-80"
//               >
//                 <Search
//                   strokeWidth={1.35}
//                   className="transition-transform duration-200 hover:rotate-12"
//                 />
//               </Link>
//             </li>

//             {/* Create post */}
//             {user?.role === "user" && (
//               <li className="transition-all duration-200 hover:scale-105 active:scale-95">
//                 <button
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setYes();
//                     navigate(`/${user.id}/createpost`);
//                   }}
//                   className="text-xl flex items-center pb-1 justify-center transition-colors duration-200 hover:opacity-80"
//                 >
//                   <PenTool
//                     size={25}
//                     strokeWidth={1.25}
//                     className="-rotate-90 transition-transform duration-200 hover:rotate-[-85deg]"
//                   />
//                 </button>
//               </li>
//             )}

//             {/* Profile */}
//             <li className="transition-all duration-200 hover:scale-105 active:scale-95">
//               <Link
//                 to={`/${user.id}`}
//                 className="inline-block transition-colors duration-200 hover:opacity-80"
//               >
//                 <CircleUser
//                   strokeWidth={1.4}
//                   className="transition-transform duration-200 hover:rotate-6"
//                 />
//               </Link>
//             </li>

//             <div className="relative hidden lg:block">
//               <button
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setShowMenu((prev) => !prev);
//                 }}
//                 className="mb-2"
//               >
//                 <SplinePointer size={25} strokeWidth={1.25} />
//               </button>

//               {showMenu && (
//                 <div className="fixed bottom-full mb-4 w-40 bg-black border border-gray-700 shadow-lg rounded-lg z-10 overflow-hidden">
//                   <button
//                     onClick={() => {
//                       logOut();
//                       navigate("/");
//                     }}
//                     className="flex items-center px-2 py-2 w-full text-white hover:bg-gray-800 transition-colors"
//                   >
//                     <ArrowDownToDot
//                       className="mr-2 -rotate-90"
//                       strokeWidth={1}
//                     />
//                     Logout
//                   </button>

//                   <div className="border-t border-gray-700" />

//                   <button
//                     onClick={(e) => {
//                       e.preventDefault();
//                       if (isFullscreen) exitFullscreen();
//                       else enterFullscreen();
//                     }}
//                     className="flex items-center px-2 py-2 w-full text-white hover:bg-gray-800 transition-colors"
//                   >
//                     <SquareMousePointer className="mr-2" strokeWidth={1} />
//                     {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Hamburger Menu - Last Option */}
//             <li className="lg:hidden">
//               <button
//                 onClick={toggleMenu}
//                 className={`hamburger-button p-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 ${
//                   dark ? "hover:bg-gray-800" : "hover:bg-gray-100"
//                 } ${isMenuOpen ? "bg-gray-800" : ""}`}
//                 aria-label="Toggle menu"
//                 aria-expanded={isMenuOpen}
//               >
//                 {isMenuOpen ? (
//                   <X
//                     size={24}
//                     className={`${
//                       dark ? "text-white" : "text-black"
//                     } transition-transform duration-200`}
//                   />
//                 ) : (
//                   <Menu
//                     size={24}
//                     className={`${
//                       dark ? "text-white" : "text-black"
//                     } transition-transform duration-200`}
//                   />
//                 )}
//               </button>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Mobile Menu Overlay */}
//       {isMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-110 lg:hidden"
//           onClick={closeMenu}
//           aria-hidden="true"
//         />
//       )}

//       {/* Mobile Slide-out Menu - FROM RIGHT */}
//       <div
//         className={`mobile-menu-container fixed top-0 right-0 h-full w-68 max-w-[85vw] ${
//           dark
//             ? "bg-black border-l border-gray-800"
//             : "bg-white border-l border-gray-200"
//         } transform transition-transform duration-300 ease-in-out z-120 lg:hidden overflow-y-auto ${
//           isMenuOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="menu-title"
//       >
//         <div className="p-4 space-y-4 pb-20">
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
//                     backgroundImage: profileData.backgroundImage
//                       ? `url(${profileData.backgroundImage})`
//                       : undefined,
//                   }}
//                 />
//                 <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
//                   <img
//                     width="48"
//                     height="48"
//                     src={profileData.profileImage || "/default-avatar.png"}
//                     loading="lazy"
//                     alt={`Photo of ${profileData.name || "User"}`}
//                     className="w-12 h-12 rounded-full border-4 border-white shadow-md object-cover"
//                     onError={(e) => {
//                       e.target.src = "/default-avatar.png";
//                     }}
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
//                       {profileData.name || "User"}
//                     </h3>
//                     <p
//                       className={`text-sm ${
//                         dark ? "text-gray-400" : "text-gray-600"
//                       } mt-1 line-clamp-2`}
//                     >
//                       {profileData.headline || "No headline"}
//                     </p>
//                     <p
//                       className={`text-sm ${
//                         dark ? "text-gray-500" : "text-gray-500"
//                       } mt-1`}
//                     >
//                       {profileData.location || "Location not set"}
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
//             <Link
//               to="/premium/products"
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
//             </Link>
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
//                   <Link
//                     to={item.href}
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
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Additional Menu Options */}
//           <div
//             className={`${
//               dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
//             } rounded-lg border p-4 shadow-sm`}
//           >
//             <ul className="space-y-4">
//               <li>
//                 <button
//                   onClick={handleMenuItemClick(() => {
//                     if (isFullscreen) exitFullscreen();
//                     else enterFullscreen();
//                   })}
//                   className="flex items-center space-x-3 w-full group text-left"
//                   aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
//                 >
//                   <div className="flex-shrink-0">
//                     <SquareMousePointer
//                       size={18}
//                       className={dark ? "text-gray-300" : "text-gray-700"}
//                     />
//                   </div>
//                   <span
//                     className={`text-sm font-medium ${
//                       dark
//                         ? "text-white group-hover:text-blue-400"
//                         : "text-gray-900 group-hover:text-blue-600"
//                     } transition-colors duration-200`}
//                   >
//                     {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
//                   </span>
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={handleMenuItemClick(() => {
//                     logOut();
//                     navigate("/");
//                   })}
//                   className="flex items-center space-x-3 w-full group text-left"
//                   aria-label="Logout"
//                 >
//                   <div className="flex-shrink-0">
//                     <LogOut
//                       size={18}
//                       className={dark ? "text-gray-300" : "text-gray-700"}
//                     />
//                   </div>
//                   <span
//                     className={`text-sm font-medium ${
//                       dark
//                         ? "text-white group-hover:text-red-400"
//                         : "text-gray-900 group-hover:text-red-600"
//                     } transition-colors duration-200`}
//                   >
//                     Logout
//                   </span>
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BottomNav;

import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useThemeStore from "../store/themeStore";
import useAuthStore from "../store/authStore";
import {
  CircleUser,
  House,
  LogOut,
  PenTool,
  Search,
  Menu,
  X,
  Plus,
  Bookmark,
  Users,
  Calendar,
  Newspaper,
  Crown,
  SquareMousePointer,
  SplinePointer,
  ArrowDownToDot, // Added missing import
} from "lucide-react";
import { FullscreenContext } from "../context/FullscreenContext";
import Tabs_F_Mob from "./Tab_F_Mob.jsx";
import api from "../utils/api1";

const BottomNav = () => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logOut = useAuthStore((s) => s.logOut);
  const dark = useThemeStore((s) => s.dark);
  const setYes = useThemeStore((s) => s.setYes);
  const { enterFullscreen, isFullscreen, exitFullscreen } =
    useContext(FullscreenContext);

  const [showMenu, setShowMenu] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Hamburger menu states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const id = user?.id;

  // Fetch profile data
  const fetchProfileData = async () => {
    if (!user) return;

    try {
      const res = await api.get("/user/me");
      setProfileData(res.data);
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [user]);

  // Detect desktop
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      // Close menu on desktop
      if (desktop && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        !event.target.closest(".mobile-menu-container") &&
        !event.target.closest(".hamburger-button")
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isMenuOpen]);

  const navigationItems = [
    {
      icon: (
        <Bookmark
          size={18}
          className={dark ? "text-gray-300" : "text-gray-700"}
        />
      ),
      label: "Saved items",
      href: "/my-items/",
    },
    {
      icon: (
        <Users size={18} className={dark ? "text-gray-300" : "text-gray-700"} />
      ),
      label: "Groups",
      href: "/groups",
    },
    {
      icon: (
        <Newspaper
          size={18}
          className={dark ? "text-gray-300" : "text-gray-700"}
        />
      ),
      label: "Newsletters",
      href: "/newsletters",
    },
    {
      icon: (
        <Calendar
          size={18}
          className={dark ? "text-gray-300" : "text-gray-700"}
        />
      ),
      label: "Events",
      href: "/events",
    },
  ];

  const toggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleMenuItemClick = (callback) => {
    return (e) => {
      if (callback) callback(e);
      closeMenu();
    };
  };

  // Don't render if no user
  if (!user) return null;

  return (
    <>
      <div
        className={`lg:bottom-1 lg:hidden bottom-1.5 fixed flex z-100 w-full items-center justify-center ${
          !dark ? "text-black" : "text-white"
        }`}
      >
        <div className="w-full relative h-full">
          <ul className="flex items-center w-full justify-center bg-transparent overflow-hidden lg:space-x-14 space-x-8">
            {/* Home */}
            <li className="transition-all duration-200 hover:scale-105 active:scale-95">
              <Link
                to={`/${user.id}/feed`}
                className="inline-block transition-colors duration-200 hover:opacity-80"
              >
                <House
                  strokeWidth={2.5}
                  size={30}
                  className="transition-transform duration-200 hover:rotate-3"
                />
              </Link>
            </li>

            {/* Search */}
            <li className="lg:hidden">
              <Link
                to={`/${user.id}/search`}
                className="inline-block transition-colors duration-200 hover:opacity-80"
              >
                <Search
                  strokeWidth={2.5}
                  size={30}
                  className="transition-transform duration-200 hover:rotate-12"
                />
              </Link>
            </li>

            {/* Create post */}
            {user?.role === "user" && (
              <li className="transition-all duration-200 hover:scale-105 active:scale-95">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setYes();
                    navigate(`/${user.id}/createpost`);
                  }}
                  className="text-xl flex items-center pb-1 justify-center transition-colors duration-200 hover:opacity-80"
                >
                  <PenTool
                    strokeWidth={2.5}
                  size={30}
                    className="-rotate-90 transition-transform duration-200 hover:rotate-[-85deg]"
                  />
                </button>
              </li>
            )}

            {/* Profile */}
            <li className="transition-all duration-200 hover:scale-105 active:scale-95">
              <Link
                to={`/${user.id}`}
                className="inline-block transition-colors duration-200 hover:opacity-80"
              >
                <CircleUser
                  strokeWidth={2.5}
                  size={30}
                  className="transition-transform duration-200 hover:rotate-6"
                />
              </Link>
            </li>

            <div className="relative hidden lg:block">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowMenu((prev) => !prev);
                }}
                className="mb-2"
              >
                <SplinePointer size={25} strokeWidth={2} />
              </button>

              {showMenu && (
                <div className="fixed bottom-11 h-20 w-40 bg-black border border-gray-700 shadow-lg rounded-lg z-10 overflow-hidden">
                  <button
                    onClick={() => {
                      logOut();
                      navigate("/");
                    }}
                    className="flex items-center px-2 py-2 w-full text-white hover:bg-gray-800 transition-colors"
                  >
                    <ArrowDownToDot
                      className="mr-2 -rotate-90"
                      strokeWidth={1}
                    />
                    Logout
                  </button>

                  <div className="border-t border-gray-700" />

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (isFullscreen) exitFullscreen();
                      else enterFullscreen();
                    }}
                    className="flex items-center px-2 py-2 w-full text-white hover:bg-gray-800 transition-colors"
                  >
                    <SquareMousePointer className="mr-2" strokeWidth={1} />
                    {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                  </button>
                </div>
              )}
            </div>

            {/* Hamburger Menu - Last Option */}
            <li className="lg:hidden">
              <button
                onClick={toggleMenu}
                className={`hamburger-button scale-120 rounded-lg transition-all duration-200 active:scale-95 ${isMenuOpen ? "bg-gray-800" : ""}`}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <X
                    strokeWidth={2.5}
                  size={30}
                    className={`${
                      dark ? "text-white" : "text-black"
                    } transition-transform duration-200`}
                  />
                ) : (
                  <Menu
                    strokeWidth={2.5}
                  size={30}
                    className={`${
                      dark ? "text-white" : "text-black"
                    } transition-transform duration-200`}
                  />
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-20 h-screen backdrop-blur-sm z-110 lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Slide-out Menu - FROM RIGHT */}
      <div
        className={`mobile-menu-container fixed top-0 right-0 w-68 max-w-[85vw] ${
          dark
            ? "bg-transparent border-l border-none"
            : "bg-transparent border-l border-none"
        } transform transition-transform duration-300 ease-in-out z-120 lg:hidden overflow-y-auto ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-title"
      >
        <div className="p-4 space-y-3 pb-20">
          {/* Profile Card */}
          {profileData && (
            <div
              className={`${
                dark
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-gray-200"
              } rounded-lg border overflow-hidden shadow-sm`}
            >
              {/* Background and Profile Picture */}
              <div className="relative">
                <div
                  className="h-16 bg-gradient-to-r from-blue-400 to-blue-600 bg-cover bg-center"
                  style={{
                    backgroundImage: profileData.backgroundImage
                      ? `url(${profileData.backgroundImage})`
                      : undefined,
                  }}
                />
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                  <img
                    width="48"
                    height="48"
                    src={profileData.profileImage || "/default-avatar.png"}
                    loading="lazy"
                    alt={`Photo of ${profileData.name || "User"}`}
                    className="w-12 h-12 rounded-full border-4 border-white shadow-md object-cover"
                    onError={(e) => {
                      e.target.src = "/default-avatar.png";
                    }}
                  />
                </div>
              </div>

              {/* Profile Details */}
              <div className="pt-8 px-4 pb-4">
                <Link to={`/${id}`} className="block" onClick={closeMenu}>
                  <div className="text-center">
                    <h3
                      className={`text-base font-semibold ${
                        dark
                          ? "text-white hover:text-blue-400"
                          : "text-gray-900 hover:text-blue-600"
                      } transition-colors duration-200 line-clamp-2`}
                    >
                      {profileData.name || "User"}
                    </h3>
                    <p
                      className={`text-sm ${
                        dark ? "text-gray-400" : "text-gray-600"
                      } mt-1 line-clamp-2`}
                    >
                      {profileData.headline || "No headline"}
                    </p>
                    <p
                      className={`text-sm ${
                        dark ? "text-gray-500" : "text-gray-500"
                      } mt-1`}
                    >
                      {profileData.location || "Location not set"}
                    </p>
                  </div>
                </Link>

                {/* Add Experience Button */}
                <button
                  className={`w-full mt-3 py-2 px-3 ${
                    dark
                      ? "bg-gray-800 hover:bg-gray-700 border-gray-700"
                      : "bg-gray-50 hover:bg-gray-100 border-gray-200"
                  } border rounded-md transition-colors duration-200 group`}
                  aria-label="Add Experience"
                  type="button"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Plus
                      size={16}
                      className={
                        dark
                          ? "text-gray-400 group-hover:text-gray-200"
                          : "text-gray-600 group-hover:text-gray-800"
                      }
                    />
                    <span
                      className={`text-sm font-medium ${
                        dark
                          ? "text-gray-300 group-hover:text-gray-100"
                          : "text-gray-700 group-hover:text-gray-900"
                      }`}
                    >
                      Experience
                    </span>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Tabs Component */}
          <div
            className={`${
              dark ? "bg-gray-900 border-gray-800" : " border-gray-200"
            } rounded-lg p-2`}
          >
            <Tabs_F_Mob />
          </div>

          {/* Premium Upsell Card */}
          <div
            className={`${
              dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
            } rounded-lg border p-4 shadow-sm`}
          >
            <Link
              to="/premium/products"
              className="block group"
              aria-label="Premium subscription offer"
              onClick={closeMenu}
            >
              <h3
                className={`text-sm ${
                  dark ? "text-gray-400" : "text-gray-600"
                } font-normal pb-2`}
              >
                Accelerate your career
              </h3>
              <div className="flex items-start space-x-2">
                <Crown
                  size={20}
                  className="text-amber-500 flex-shrink-0 mt-0.5"
                />
                <span
                  className={`text-sm font-medium ${
                    dark
                      ? "text-white group-hover:text-blue-400"
                      : "text-gray-900 group-hover:text-blue-600"
                  } transition-colors duration-200`}
                >
                  Try Premium for ₹0
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links Card */}
          <div
            className={`${
              dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
            } rounded-lg border p-4 shadow-sm`}
          >
            <ul className="space-y-4">
              {navigationItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.href}
                    className="block group"
                    aria-label={item.label}
                    onClick={closeMenu}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">{item.icon}</div>
                      <span
                        className={`text-sm font-medium ${
                          dark
                            ? "text-white group-hover:text-blue-400"
                            : "text-gray-900 group-hover:text-blue-600"
                        } transition-colors duration-200`}
                      >
                        {item.label}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Menu Options */}
          <div
            className={`${
              dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
            } rounded-lg border p-4 shadow-sm`}
          >
            <ul className="space-y-4">
              <li>
                <button
                  onClick={handleMenuItemClick(() => {
                    if (isFullscreen) exitFullscreen();
                    else enterFullscreen();
                  })}
                  className="flex items-center space-x-3 w-full group text-left"
                  aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                >
                  <div className="flex-shrink-0">
                    <SquareMousePointer
                      size={18}
                      className={dark ? "text-gray-300" : "text-gray-700"}
                    />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      dark
                        ? "text-white group-hover:text-blue-400"
                        : "text-gray-900 group-hover:text-blue-600"
                    } transition-colors duration-200`}
                  >
                    {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={handleMenuItemClick(() => {
                    logOut();
                    navigate("/");
                  })}
                  className="flex items-center space-x-3 w-full group text-left"
                  aria-label="Logout"
                >
                  <div className="flex-shrink-0">
                    <LogOut
                      size={18}
                      className={dark ? "text-gray-300" : "text-gray-700"}
                    />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      dark
                        ? "text-white group-hover:text-red-400"
                        : "text-gray-900 group-hover:text-red-600"
                    } transition-colors duration-200`}
                  >
                    Logout
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomNav;
