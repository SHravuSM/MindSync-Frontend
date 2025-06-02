// import React from "react";
// import { Link } from "react-router-dom";
// import { useAuthContext } from "../context/AuthContext";
// import notification from "./notification.png";

// const Navbar = () => {
//   const { user } = useAuthContext();

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
// import { useAuthContext } from "../context/AuthContext";
// import notification from "./notification.png";
// import Sidebar from "./Sidebar";

// const Navbar = () => {
//   const { user } = useAuthContext();
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
// import { useAuthContext } from "../context/AuthContext";
// import notification from "./notification.png";
// // import Sidebar from "./Sidebar";

// const Navbar = () => {
//   const { user } = useAuthContext();
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

import React from "react";
import { useAuthContext } from "../context/AuthContext";
import USER from "./user.png";

const Navbar = ({ setOpen }) => {
  const { logout } = useAuthContext();
  // console.log(user);

  return (
    <header className="bg-black text-white py-4 px-6 shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Avatar (only on small screens) */}
        <div className="cursor-pointer flex items-center gap-2">
          <img
            className="h-8 lg:h-10 rounded-full"
            src={USER}
            alt=""
            onClick={() => setOpen((pre) => !pre)}
          />
        </div>
        {/* Brand */}
        <div className="text-2xl lg:text-4xl font-semibold">
          ManoSangam<span className="text-blue-500 text-3xl">.</span>
        </div>
        <div className="h-10 flex items-center p-1 bg-black hover:bg-white hover:text-black rounded-lg">
          {/* <FiLogIn
          onClick={logout}
          className=" hover:scale-110 duration-500 h-7 w-7"
        /> */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
