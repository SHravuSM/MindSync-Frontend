// import React, { useEffect, useState } from "react";
// import {
//   Plus,
//   Bookmark,
//   Users,
//   Calendar,
//   Newspaper,
//   Crown,
//   SquareMousePointer,
//   ArrowDownToDot,
//   SplinePointer,
//   House,
//   PenTool,
// } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import Tabs from "./Tabs";
// import api from "../utils/api1";
// import useAuthStore from "../store/authStore";
// import useThemeStore from "../store/themeStore";
// import USER from "../assets/user.png";

// const LSidebar = () => {
//   const user = useAuthStore((s) => s.user);
//   const logOut = useAuthStore((s) => s.logOut);
//   const { dark } = useThemeStore();
//   const id = user?.id;
//   const [profileData, setProfileData] = useState(null);

//   async function me() {
//     try {
//       const res = await api.get("/user/me");
//       console.log(res.data);
//       setProfileData(res.data);
//     } catch (error) {
//       logOut();
//     }
//   }

//   useEffect(() => {
//     me();
//   }, []);

//   const navigationItems = [
//     {
//       icon: <Bookmark size={16} className="text-gray-700" />,
//       label: "Saved items",
//       href: "/my-items/",
//     },
//     {
//       icon: <Users size={16} className="text-gray-700" />,
//       label: "Groups",
//       href: "/groups",
//     },
//     {
//       icon: <Newspaper size={16} className="text-gray-700" />,
//       label: "Newsletters",
//       href: "/newsletters",
//     },
//     {
//       icon: <Calendar size={16} className="text-gray-700" />,
//       label: "Events",
//       href: "/events",
//     },
//   ];

//   return profileData ? (
//     <div
//       role="region"
//       aria-label="Side Bar"
//       className="w-56 hidden lg:block space-y-2"
//     >
//       {/* Profile Card */}
//       <div
//         className={`${
//           !dark ? "bg-white border-gray-200" : "bg-black border-gray-800"
//         } rounded-md border overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200`}
//       >
//         {/* Background and Profile Picture */}
//         <span
//           className="block relative group"
//           aria-label={`Background photo of ${profileData.name}`}
//         >
//           <div
//             className="h-16 sm:h-20 bg-gradient-to-r from-blue-400 to-blue-600 bg-cover bg-center"
//             style={{ backgroundImage: `url(${profileData.backgroundImage})` }}
//           />

//           <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
//             <img
//               width="72"
//               height="72"
//               src={USER}
//               loading="lazy"
//               alt={`Photo of ${profileData.name}`}
//               className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-200"
//             />
//           </div>
//         </span>

//         {/* Profile Details */}
//         <div className="pt-8 px-4 pb-4">
//           <Link to={`/${id}`} className="block group">
//             <div className="text-center">
//               <h3
//                 className={`text-lg font-semibold ${
//                   !dark ? "text-gray-900" : "text-white"
//                 } group-hover:text-blue-600 transition-colors duration-200 line-clamp-2`}
//               >
//                 {profileData.name}
//               </h3>
//               <p className="text-xs text-gray-600 mt-1 line-clamp-2">
//                 {profileData.headline}
//               </p>
//               <p className="text-xs text-gray-500 mt-1">
//                 {profileData.location}
//               </p>
//             </div>
//           </Link>

//           {/* Add Experience Button */}
//           <button
//             className={`w-full mt-3 py-2 px-3 ${
//               !dark
//                 ? "bg-gray-50 hover:bg-gray-100 border-gray-200"
//                 : "bg-gray-300 hover:bg-white"
//             } border  rounded-md transition-colors duration-200 group`}
//             aria-label="Add Experience"
//             type="button"
//           >
//             <div className="flex items-center justify-center space-x-2">
//               <Plus
//                 size={16}
//                 className="text-gray-600 group-hover:text-gray-800"
//               />
//               <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900">
//                 Experience
//               </span>
//             </div>
//           </button>
//         </div>
//       </div>

//       <Tabs />

//       {/* Premium Upsell Card */}
//       <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
//         <a
//           href="/premium/products"
//           className="block group"
//           aria-label="Premium subscription offer"
//         >
//           <h3 className="text-xs text-gray-600 font-normal pb-2">
//             Accelerate your career
//           </h3>
//           <div className="flex items-start space-x-2">
//             <Crown size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
//             <span className="text-xs font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
//               Try Premium for ₹0
//             </span>
//           </div>
//         </a>
//       </div>

//       {/* Navigation Links Card */}
//       <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
//         <ul className="space-y-4">
//           {navigationItems.map((item, index) => (
//             <li key={index}>
//               <a
//                 href={item.href}
//                 className="block group"
//                 aria-label={item.label}
//               >
//                 <div className="flex items-center space-x-3">
//                   <div className="flex-shrink-0">{item.icon}</div>
//                   <span className="text-xs font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
//                     {item.label}
//                   </span>
//                 </div>
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   ) : (
//     <></>
//   );
// };

// export default LSidebar;

import React, { useEffect, useState } from "react";
import {
  Plus,
  Bookmark,
  Users,
  Calendar,
  Newspaper,
  Crown,
  SquareMousePointer,
  ArrowDownToDot,
  SplinePointer,
  House,
  PenTool,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Tabs from "./Tabs";
import api from "../utils/api1";
import useAuthStore from "../store/authStore";
import useThemeStore from "../store/themeStore";
import USER from "../assets/user.png";

const LSidebar = () => {
  const user = useAuthStore((s) => s.user);
  const logOut = useAuthStore((s) => s.logOut);
  const { dark } = useThemeStore();
  const id = user?.id;
  const [profileData, setProfileData] = useState(null);

  async function me() {
    try {
      const res = await api.get("/user");
      console.log(res.data);
      setProfileData(res.data);
    } catch (error) {
      logOut();
    }
  }

  useEffect(() => {
    me();
  }, []);

  const navigationItems = [
    {
      icon: (
        <Bookmark
          size={16}
          className={dark ? "text-gray-300" : "text-gray-700"}
        />
      ),
      label: "Saved items",
      href: "/my-items/",
    },
    {
      icon: (
        <Users size={16} className={dark ? "text-gray-300" : "text-gray-700"} />
      ),
      label: "Groups",
      href: "/groups",
    },
    {
      icon: (
        <Newspaper
          size={16}
          className={dark ? "text-gray-300" : "text-gray-700"}
        />
      ),
      label: "Newsletters",
      href: "/newsletters",
    },
    {
      icon: (
        <Calendar
          size={16}
          className={dark ? "text-gray-300" : "text-gray-700"}
        />
      ),
      label: "Events",
      href: "/events",
    },
  ];

  return profileData ? (
    <div
      role="region"
      aria-label="Side Bar"
      className="w-56 hidden lg:block space-y-2"
    >
      {/* Profile Card */}
      <div
        className={`${
          dark ? "bg-black border-gray-700" : "bg-white border-gray-200"
        } rounded-md border overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200`}
      >
        {/* Background and Profile Picture */}
        <span
          className="block relative group"
          aria-label={`Background photo of ${profileData.name}`}
        >
          <div
            className="h-16 sm:h-20 bg-gradient-to-r from-blue-400 to-blue-600 bg-cover bg-center"
            style={{ backgroundImage: `url(${profileData.backgroundImage})` }}
          />

          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
            <img
              width="72"
              height="72"
              src={USER}
              loading="lazy"
              alt={`Photo of ${profileData.name}`}
              className={`w-16 h-16 sm:w-18 sm:h-18 rounded-full border-4 shadow-md group-hover:scale-105 transition-transform duration-200 ${
                dark ? "border-gray-800" : "border-white"
              }`}
            />
          </div>
        </span>

        {/* Profile Details */}
        <div className="pt-8 px-4 pb-4">
          <Link to={`/${id}`} className="block group">
            <div className="text-center">
              <h3
                className={`text-lg font-semibold ${
                  dark ? "text-white" : "text-gray-900"
                } group-hover:text-blue-600 transition-colors duration-200 line-clamp-2`}
              >
                {profileData.name}
              </h3>
              <p
                className={`text-xs mt-1 line-clamp-2 ${
                  dark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {profileData.headline}
              </p>
              <p
                className={`text-xs mt-1 ${
                  dark ? "text-gray-500" : "text-gray-500"
                }`}
              >
                {profileData.location}
              </p>
            </div>
          </Link>

          {/* Add Experience Button */}
          {/* <button
            className={`w-full mt-3 py-2 px-3 border rounded-md transition-colors duration-200 group ${
              dark
                ? "bg-gray-700 hover:bg-gray-600 border-gray-600"
                : "bg-gray-50 hover:bg-gray-100 border-gray-200"
            }`}
            aria-label="Add Experience"
            type="button"
          >
            <div className="flex items-center justify-center space-x-2">
              <Plus
                size={16}
                className={`transition-colors ${
                  dark
                    ? "text-gray-300 group-hover:text-gray-100"
                    : "text-gray-600 group-hover:text-gray-800"
                }`}
              />
              <span
                className={`text-xs font-medium transition-colors ${
                  dark
                    ? "text-gray-300 group-hover:text-gray-100"
                    : "text-gray-700 group-hover:text-gray-900"
                }`}
              >
                Experience
              </span>
            </div>
          </button> */}
        </div>
      </div>

      <Tabs />

      {/* Premium Upsell Card */}
      <div
        className={`rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow duration-200 ${
          dark ? "bg-black border-gray-900" : "bg-white border-gray-200"
        }`}
      >
        <a
          href="/premium/products"
          className="block group"
          aria-label="Premium subscription offer"
        >
          <h3
            className={`text-xs font-normal pb-2 ${
              dark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Accelerate your career
          </h3>
          <div className="flex items-start space-x-2">
            <Crown size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <span
              className={`text-xs font-medium group-hover:text-blue-600 transition-colors duration-200 ${
                dark ? "text-gray-200" : "text-gray-900"
              }`}
            >
              Try Premium for ₹0
            </span>
          </div>
        </a>
      </div>

      {/* Navigation Links Card */}
      <div
        className={`rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow duration-200 ${
          dark ? "bg-black border-gray-900" : "bg-white border-gray-200"
        }`}
      >
        <ul className="space-y-4">
          {navigationItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className="block group"
                aria-label={item.label}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">{item.icon}</div>
                  <span
                    className={`text-xs font-semibold group-hover:text-blue-600 transition-colors duration-200 ${
                      dark ? "text-gray-200" : "text-gray-900"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default LSidebar;
