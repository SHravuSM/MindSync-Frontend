// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Home, Compass, Bell, User, Settings } from "lucide-react"; // lucide-react icons
// import clsx from "clsx";
// import { LogOut } from "lucide-react";
// import { useAuthStore } from "../context/AuthContext";

// const navItems = [
//   { label: "Home", to: ".", icon: <Home size={22} /> },
//   // { label: "Explore", to: "/explore", icon: <Compass size={22} /> },
//   { label: "Notifications", to: "notifications", icon: <Bell size={22} /> },
//   { label: "Profile", to: "profile", icon: <User size={22} /> },
//   { label: "Settings", to: "settings", icon: <Settings size={22} /> },
// ];

// const Sidebar = ({ open, setOpen }) => {
//   const { logout } = useAuthStore();
//   const location = useLocation();

//   return (
//     <>
//       {/* Overlay on mobile */}
//       {open && (
//         <div
//           onClick={() => setOpen((pre) => !pre)}
//           className="fixed inset-0 bg-black/40 z-30 lg:hidden"
//         />
//       )}

//       {/* Sidebar container */}
//       <div
//         className={clsx(
//           "fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-40 transition-transform duration-300 ease-in-out",
//           {
//             "-translate-x-full": !open,
//             "translate-x-0": open,
//             "lg:translate-x-0 lg:static lg:block": true,
//           }
//         )}
//       >
//         <div className="flex flex-col h-full py-6 px-4">
//           {/* Header / Close button (only visible on mobile) */}
//           <div className="flex justify-between items-center mb-6 lg:hidden">
//             <h2 className="text-xl flex justify-center items-center w-full font-light">Menu</h2>
//           </div>

//           <nav className="flex flex-col gap-4">
//             {navItems.map(({ label, to, icon }) => (
//               <Link
//                 key={to}
//                 to={to}
//                 className={clsx(
//                   "flex items-center gap-4 px-4 py-2 rounded-md transition hover:bg-gray-100",
//                   location.pathname === to ? "bg-gray-200 font-semibold" : ""
//                 )}
//               >
//                 {icon}
//                 <span className="text-md" onClick={() => setOpen((pre) => !pre)}>{label}</span>
//               </Link>
//             ))}
//             <button
//               onClick={logout}
//               className="w-full flex items-center gap-3 text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-all"
//             >
//               <LogOut size={18} className="group-hover:translate-x-1 transition-all" />
//               Logout
//             </button>
//           </nav>


//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;
