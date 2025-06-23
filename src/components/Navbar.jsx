// import React from "react";
// import { Link } from "react-router-dom";
// import { useAuthStore } from "../context/AuthContext";
// import notification from "./notification.png";

import { useAuthStore } from "../context/AuthContext";

// const Navbar = () => {
//   const { user } = useAuthStore();

//   return (
//     <header className="bg-black text-white py-4 px-6 shadow-md">
//       <div className="max-w-screen-xl mx-auto flex justify-between items-center">
//         {/* User Avatar */}
//         <Link to="/profile" className="flex items-center gap-2">
//           {user?.photo ? (
//             <img
//               src={user.photo}
//               alt="User Avatar"
//               className="h-8 w-8 rounded-full object-cover"
//             />
//           ) : (
//             <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm">
//               ?
//             </div>
//           )}
//         </Link>
//         {/* Logo */}
//         <div className="flex items-center gap-3">
//           <span className="text-2xl font-semibold">MindSync<span className="text-blue-500 text-3xl">.</span></span>
//         </div>

//         {/* Right Section */}
//         {/* Notification Icon */}
//         <img
//           className="h-6 w-6 cursor-pointer"
//           src={notification}
//           alt="Notifications"
//         />
//       </div>
//     </header>
//   );
// };

// export default Navbar;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useAuthStore } from "../context/AuthContext";
// import notification from "./notification.png";
// import Sidebar from "./Sidebar";

// const Navbar = () => {
//   const { user } = useAuthStore();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <>
//       <header className="bg-black text-white py-4 px-6 shadow-md lg:pl-64">
//         <div className="max-w-screen-xl mx-auto flex justify-between items-center">
//           {/* Left: Avatar (toggle sidebar on small screens) */}
//           <div
//             onClick={toggleSidebar}
//             className="cursor-pointer flex items-center gap-2"
//           >
//             {user?.photo ? (
//               <img
//                 src={user.photo}
//                 alt="User Avatar"
//                 className="h-8 w-8 rounded-full object-cover"
//               />
//             ) : (
//               <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm">
//                 ?
//               </div>
//             )}
//           </div>

//           {/* Center: Logo */}
//           <div className="text-2xl font-semibold">
//             MindSync<span className="text-blue-500 text-3xl">.</span>
//           </div>

//           {/* Right: Notification */}
//           <img
//             className="h-6 w-6 cursor-pointer"
//             src={notification}
//             alt="Notifications"
//           />
//         </div>
//       </header>

//       {/* Sidebar */}
//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
//     </>
//   );
// };

// export default Navbar;

// import React, { useState } from "react";
// import { useAuthStore } from "../context/AuthContext";
// import notification from "./notification.png";
// // import Sidebar from "./Sidebar";

// const Navbar = () => {
//   const { user } = useAuthStore();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <>
//       <header className="bg-black text-white py-4 px-6 shadow-md lg:pl-64">
//         <div className="max-w-screen-xl mx-auto flex justify-between items-center">
//           {/* Profile icon (opens sidebar on mobile) */}
//           <div
//             className="cursor-pointer flex items-center gap-2"
//             onClick={() => setSidebarOpen(true)}
//           >
//             {user?.photo ? (
//               <img
//                 src={user.photo}
//                 alt="User Avatar"
//                 className="h-8 w-8 rounded-full object-cover"
//               />
//             ) : (
//               <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm">
//                 ?
//               </div>
//             )}
//           </div>

//           {/* Brand Logo */}
//           <div className="text-2xl font-semibold">
//             MindSync<span className="text-blue-500 text-3xl">.</span>
//           </div>

//           {/* Notification icon */}
//           <img
//             className="h-6 w-6 cursor-pointer"
//             src={notification}
//             alt="Notifications"
//           />
//         </div>
//       </header>

//       {/* <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /> */}
//     </>
//   );
// };

// export default Navbar;

// import React from "react";
// import { useAuthStore } from "../context/AuthContext";
// import USER from "./user.png";

// const Navbar = () => {
//   const { logout } = useAuthStore();
//   // console.log(user);

//   return (
//     <header className="bg-black text-white py-4 px-6 shadow-md">
//       <div className="max-w-screen-xl mx-auto flex justify-between items-center">
//         {/* Avatar (only on small screens) */}
//         <div className="cursor-pointer flex items-center gap-2">
//         </div>
//         {/* Brand */}
//         <div className="text-2xl lg:text-4xl font-semibold">
//           Mano<span className="text-blue-500">Sangam</span><span className="text-orange-500 text-3xl">.</span>
//         </div>
//         <div className="h-10 flex items-center p-1 bg-black hover:bg-white hover:text-black rounded-lg">
//           {/* <FiLogIn
//           onClick={logout}
//           className=" hover:scale-110 duration-500 h-7 w-7"
//         /> */}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;


// import LogoutWhite from "./LogoutWhite.jsx";

// const Navbar = () => {
//   return (
//     <header className="bg-black text-white shadow-md">
//       <div className="max-w-screen-xl mx-auto px-6 py-4 flex justify-between items-center">
//         {/* Left Spacer or Avatar for small screens (expand if needed) */}
//         <div className="flex items-center gap-2 cursor-pointer">
//           {/* Reserved space — could add an avatar, back button, or drawer trigger here */}
//         </div>

//         {/* Brand */}
//         <h1 className="text-2xl lg:text-4xl font-bold text-center select-none">
//           Mano
//           <span className="text-blue-500">Sangam</span>
//           <span className="text-orange-500 text-3xl align-top">.</span>
//         </h1>

//         {/* Logout or Action Button */}
//         <LogoutWhite />
//       </div>
//     </header>
//   );
// };

// export default Navbar;


const Navbar = () => {
  const { setDark } = useAuthStore();
  return (
    <header className="bg-black font-normal border text-white text-3xl lg:text-4xl w-full shadow-md">
      <h1 className="text-center p-3 pt-0">
        Mano
        <span className="text-blue-500">Sangam</span>
        <span className="text-5xl text-orange-500">.</span>
      </h1>
    </header>
  );
};

export default Navbar;
