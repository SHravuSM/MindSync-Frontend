// import { Link, useNavigate } from "react-router-dom";
// import useThemeStore from "../store/themeStore";
// import useAuthStore from "../store/authStore";
// import {
//   CircleUser,
//   House,
//   LogOut,
//   PenTool,
//   Search,
//   SquarePen,
//   TextSearch,
// } from "lucide-react";

// const BottomNav = () => {
//   const navigate = useNavigate();

//   const user = useAuthStore((s) => s.user);
//   const logOut = useAuthStore((s) => s.logOut);

//   const dark = useThemeStore((s) => s.dark);
//   const setYes = useThemeStore((s) => s.setYes);
//   const setState = useThemeStore((s) => s.setState);

//   return (
//     <div
//       className={`bottom-0 bg-transparent mb-1 fixed flex z-100 w-full items-center justify-center transition-transform duration-500 drop-shadow-xl ${
//         !dark ? "text-black" : "text-white"
//       }`}
//     >
//       <form className="w-full h-full" action="#">
//         <ul
//           className={`flex items-center w-full justify-center bg-transparent shadow-lg overflow-hidden lg:space-x-10 space-x-5`}
//         >
//           <input
//             defaultChecked
//             name="rad"
//             id="choose1"
//             type="radio"
//             className="hidden peer/one"
//           />
//           <label htmlFor="choose1">
//             <Link to="." className="inline-block">
//               <House strokeWidth={1.5} />
//             </Link>
//           </label>

//           <input
//             name="rad"
//             id="choose2"
//             type="radio"
//             className="hidden peer/two"
//           />
//           <label htmlFor="choose2">
//             <Link to="profile" className="inline-block">
//               <Search strokeWidth={1.35} />
//             </Link>
//           </label>

//           {user?.role === "user" && (
//             <>
//               <input
//                 name="rad"
//                 id="choose3"
//                 type="radio"
//                 className="hidden peer/three"
//               />
//               <label htmlFor="choose3">
//                 <button
//                   onClick={setYes}
//                   className="text-xl flex items-center pb-1 justify-center"
//                 >
//                   <Link to="createpost">
//                     <PenTool size={25} strokeWidth={1.25} className="-rotate-90" />
//                   </Link>
//                 </button>
//               </label>
//             </>
//           )}

//           <input
//             name="rad"
//             id="choose5"
//             type="radio"
//             className="hidden peer/five"
//           />

//           <label htmlFor="choose5">
//             <Link
//               to={
//                 user && user.role == "user"
//                   ? `/user/${user.id}/profile`
//                   : `/investor/${user.id}/profile`
//               }
//               className="inline-block"
//             >
//               <CircleUser strokeWidth={1.4} />
//             </Link>
//           </label>

//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               logOut();
//               navigate("/");
//             }}
//           >
//             <LogOut />
//           </button>
//         </ul>
//       </form>
//     </div>
//   );
// };

// export default BottomNav;

// import { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import useThemeStore from "../store/themeStore";
// import useAuthStore from "../store/authStore";
// import {
//   CircleUser,
//   House,
//   LogOut,
//   PenTool,
//   Search,
//   Fullscreen,
//   SplinePointer,
//   SquareChevronUp,
//   SquareMousePointer,
//   LogIn,
//   ArrowDownToDot,
// } from "lucide-react";
// import { FullscreenContext } from "../context/FullscreenContext"; // your fullscreen provider

// const BottomNav = () => {
//   const navigate = useNavigate();

//   const user = useAuthStore((s) => s.user);
//   const logOut = useAuthStore((s) => s.logOut);

//   const dark = useThemeStore((s) => s.dark);
//   const setYes = useThemeStore((s) => s.setYes);

//   const { enterFullscreen, isFullscreen, exitFullscreen } =
//     useContext(FullscreenContext);

//   const [showMenu, setShowMenu] = useState(false);

//   return (
//     <div
//       className={`bottom-0 bg-transparent mb-1 fixed flex z-100 w-full items-center justify-center transition-transform duration-500 drop-shadow-xl ${
//         !dark ? "text-black" : "text-white"
//       }`}
//     >
//       <form className="w-full h-full" action="#">
//         <ul
//           className={`flex items-center w-full justify-center bg-transparent shadow-lg overflow-hidden lg:space-x-10 space-x-5`}
//         >
//           <input
//             defaultChecked
//             name="rad"
//             id="choose1"
//             type="radio"
//             className="hidden peer/one"
//           />
//           <label htmlFor="choose1">
//             <Link to="." className="inline-block">
//               <House strokeWidth={1.5} />
//             </Link>
//           </label>

//           <input
//             name="rad"
//             id="choose2"
//             type="radio"
//             className="hidden peer/two"
//           />
//           <label htmlFor="choose2">
//             <Link to="profile" className="inline-block">
//               <Search strokeWidth={1.35} />
//             </Link>
//           </label>

//           {user?.role === "user" && (
//             <>
//               <input
//                 name="rad"
//                 id="choose3"
//                 type="radio"
//                 className="hidden peer/three"
//               />
//               <label htmlFor="choose3">
//                 <button
//                   onClick={setYes}
//                   className="text-xl flex items-center pb-1 justify-center"
//                 >
//                   <Link to="createpost">
//                     <PenTool
//                       size={25}
//                       strokeWidth={1.25}
//                       className="-rotate-90"
//                     />
//                   </Link>
//                 </button>
//               </label>
//             </>
//           )}

//           <input
//             name="rad"
//             id="choose5"
//             type="radio"
//             className="hidden peer/five"
//           />
//           <label htmlFor="choose5">
//             <Link
//               to={
//                 user && user.role === "user"
//                   ? `/user/${user.id}/profile`
//                   : `/investor/${user.id}/profile`
//               }
//               className="inline-block"
//             >
//               <CircleUser strokeWidth={1.4} />
//             </Link>
//           </label>

//           {/* Menu button */}
//           <div className="relative">
//             <button
//               onClick={(e) => {
//                 e.preventDefault();
//                 setShowMenu((prev) => !prev);
//               }}
//               className="mb-2"
//             >
//               <SplinePointer size={25} strokeWidth={1.25} />
//             </button>

//             {/* {showMenu && (
//               <div
//                 className={`absolute z-10 h-20 w-32 border-black bottom-full mb-20 bg-black shadow-lg rounded-lg border`}
//               >
//                 <button
//                   onClick={() => {
//                     logOut();
//                     navigate("/");
//                   }}
//                   className="flex items-center px-4 py-2 w-full hover:bg-gray-200 dark:hover:bg-gray-700"
//                 >
//                   <LogOut className="mr-2" size={18} /> Logout
//                 </button>
//                 <button
//                   onClick={() => {
//                     if (isFullscreen) enterFullscreen();
//                     else exitFullscreen();
//                   }}
//                   className="flex items-center px-4 py-2 w-full hover:bg-gray-200 dark:hover:bg-gray-700"
//                 >
//                   <SplinePointer strokeWidth={1} />{" "}
//                   {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
//                 </button>
//               </div>
//             )} */}

//             {showMenu && (
//               <div className="fixed bottom-full mb-4 w-40 bg-black border border-gray-700 shadow-lg rounded-lg z-10 overflow-hidden">
//                 <button
//                   onClick={() => {
//                     logOut();
//                     navigate("/");
//                   }}
//                   className="flex items-center px-2 py-2 w-full text-white hover:bg-gray-800 transition-colors"
//                 >
//                   <ArrowDownToDot className="mr-2 -rotate-90" strokeWidth={1} />{" "}
//                   Logout
//                 </button>

//                 <div className="border-t border-gray-700" />

//                 <button
//                   onClick={(e) => {
//                     e.preventDefault();
//                     if (isFullscreen) exitFullscreen();
//                     else enterFullscreen();
//                   }}
//                   className="flex items-center px-2 py-2 w-full text-white hover:bg-gray-800 transition-colors"
//                 >
//                   <SquareMousePointer className="mr-2" strokeWidth={1} />
//                   {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
//                 </button>
//               </div>
//             )}
//           </div>
//         </ul>
//       </form>
//     </div>
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
//       className={`bottom-0 fixed flex z-100 w-full items-center justify-center mb-1 transition-transform duration-500 drop-shadow-xl ${
//         !dark ? "text-black" : "text-white"
//       }`}
//     >
//       <form className="w-full h-full">
//         <ul className="flex items-center w-full justify-center bg-transparent shadow-lg overflow-hidden lg:space-x-10 space-x-5">
//           {/* Home */}
//           <input
//             defaultChecked
//             name="rad"
//             id="choose1"
//             type="radio"
//             className="hidden peer/one"
//           />
//           <label htmlFor="choose1">
//             <Link to="." className="inline-block">
//               <House strokeWidth={1.5} />
//             </Link>
//           </label>

//           {/* Search */}
//           <input
//             name="rad"
//             id="choose2"
//             type="radio"
//             className="hidden peer/two"
//           />
//           <label htmlFor="choose2">
//             <Link to="profile" className="inline-block">
//               <Search strokeWidth={1.35} />
//             </Link>
//           </label>

//           {/* Create post */}
//           {user?.role === "user" && (
//             <>
//               <input
//                 name="rad"
//                 id="choose3"
//                 type="radio"
//                 className="hidden peer/three"
//               />
//               <label htmlFor="choose3">
//                 <button
//                   onClick={setYes}
//                   className="text-xl flex items-center pb-1 justify-center"
//                 >
//                   <Link to="createpost">
//                     <PenTool
//                       size={25}
//                       strokeWidth={1.25}
//                       className="-rotate-90"
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
//           <label htmlFor="choose5">
//             <Link
//               to={
//                 user && user.role === "user"
//                   ? `/user/${user.id}/profile`
//                   : `/investor/${user.id}/profile`
//               }
//               className="inline-block"
//             >
//               <CircleUser strokeWidth={1.4} />
//             </Link>
//           </label>

//           {/* Menu */}
//           <div
//             onClick={(e) => {
//               e.preventDefault();
//               setShowMenu((prev) => !prev);
//             }}
//             className="relative"
//           >
//             <button
//               onClick={(e) => {
//                 if (!isDesktop) {
//                   e.preventDefault();
//                   setShowMenu((prev) => !prev);
//                 }
//               }}
//               className="mb-2"
//             >
//               <SplinePointer size={25} strokeWidth={1.25} />
//             </button>

//             {showMenu && (
//               <div className="fixed bottom-full mb-1 border-red-500 w-40 bg-black border shadow-lg rounded-lg z-10 overflow-hidden">
//                 <button
//                   onClick={() => {
//                     logOut();
//                     navigate("/");
//                   }}
//                   className="flex items-center px-2 py-2 w-full text-white hover:bg-gray-800 transition-colors"
//                 >
//                   <ArrowDownToDot className="mr-2 -rotate-90" strokeWidth={1} />{" "}
//                   Logout
//                 </button>

//                 <div className="border-t border-gray-700" />

//                 <button
//                   onClick={(e) => {
//                     e.preventDefault();
//                     if (isFullscreen) exitFullscreen();
//                     else enterFullscreen();
//                   }}
//                   className="flex items-center px-2 py-2 w-full text-white hover:bg-gray-800 transition-colors"
//                 >
//                   <SquareMousePointer className="mr-2" strokeWidth={1} />
//                   {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
//                 </button>
//               </div>
//             )}
//           </div>
//         </ul>
//       </form>
//     </div>
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
  SplinePointer,
  SquareMousePointer,
  ArrowDownToDot,
} from "lucide-react";
import { FullscreenContext } from "../context/FullscreenContext";

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

  // Detect desktop
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`bottom-0 fixed flex z-100 w-full items-center justify-center transition-transform duration-500 drop-shadow-xl ${
        !dark ? "text-black" : "text-white"
      }`}
    >
      <form className="w-full relative h-full">
        <ul className="flex items-center w-full justify-center bg-transparent shadow-lg overflow-hidden lg:space-x-12 space-x-8">
          {/* Home */}
          <input
            defaultChecked
            name="rad"
            id="choose1"
            type="radio"
            className="hidden peer/one"
          />
          <label
            htmlFor="choose1"
            className="transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Link
              to={`/${user.id}/feed`}
              className="inline-block transition-colors duration-200 hover:opacity-80"
            >
              <House
                strokeWidth={1.5}
                className="transition-transform duration-200 hover:rotate-3"
              />
            </Link>
          </label>

          {/* Search */}
          <div className="lg:hidden">
            <Link
              to="profile"
              className="inline-block transition-colors duration-200 hover:opacity-80"
            >
              <Search
                strokeWidth={1.35}
                className="transition-transform duration-200 hover:rotate-12"
              />
            </Link>
          </div>

          {/* Create post */}
          {user?.role === "user" && (
            <>
              <input
                name="rad"
                id="choose3"
                type="radio"
                className="hidden peer/three"
              />
              <label
                htmlFor="choose3"
                className="transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <button
                  onClick={setYes}
                  className="text-xl flex items-center pb-1 justify-center transition-colors duration-200 hover:opacity-80"
                >
                  <Link to="createpost">
                    <PenTool
                      size={25}
                      strokeWidth={1.25}
                      className="-rotate-90 transition-transform duration-200 hover:rotate-[-85deg]"
                    />
                  </Link>
                </button>
              </label>
            </>
          )}

          {/* Profile */}
          <input
            name="rad"
            id="choose5"
            type="radio"
            className="hidden peer/five"
          />
          <label
            htmlFor="choose5"
            className="transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Link
              to={`/${user.id}`}
              className="inline-block transition-colors duration-200 hover:opacity-80"
            >
              <CircleUser
                strokeWidth={1.4}
                className="transition-transform duration-200 hover:rotate-6"
              />
            </Link>
          </label>

          {/* Menu */}

          <button
            onClick={(e) => {
              e.preventDefault();
              setShowMenu((prev) => !prev);
            }}
            className={`mb-2 transition-all duration-200 hover:scale-105 active:scale-95 ${
              showMenu ? "rotate-35" : ""
            }`}
          >
            <SplinePointer
              size={25}
              strokeWidth={1.25}
              className="transition-transform duration-300 hover:rotate-35"
            />
          </button>
        </ul>
        {showMenu && (
          <div
            className={`
                absolute bottom-9 lg:right-4/12 right-1 w-40 bg-black shadow-lg rounded-lg z-10 overflow-hidden
                transition-all duration-300 ease-out transform 
                animate-in slide-in-from-bottom-2 fade-in
                // ${showMenu ? "opacity-100 scale-100" : "opacity-0 scale-95"}
              `}
          >
            <button
              onClick={() => {
                logOut();
                navigate("/");
              }}
              className="flex items-center hover:text-red-500 px-2 py-2 w-full text-white transition-all duration-200 hover:scale-95 hover:translate-x-1"
            >
              <LogOut className="mr-2 " strokeWidth={1} />
              Logout
            </button>

            <div className="border-t border-gray-700" />

            <button
              onClick={(e) => {
                e.preventDefault();
                if (isFullscreen) exitFullscreen();
                else enterFullscreen();
              }}
              className="flex items-center  hover:text-blue-500 px-2 py-2 w-full text-white transition-all duration-200 hover:scale-95"
            >
              <SquareMousePointer
                className="mr-2 transition-transform duration-200"
                strokeWidth={1}
              />
              {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default BottomNav;
