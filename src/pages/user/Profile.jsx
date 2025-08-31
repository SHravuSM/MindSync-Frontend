// import { useEffect, useState } from "react";
// import useThemeStore from "../../store/themeStore";
// import api from "../../utils/api1";
// import Loader from "../../components/PostLoader";

// export default function Profile() {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [isEditing, setIsEditing] = useState(false);
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const dark = useThemeStore((e) => e.dark);

//   const fetchUser = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/user");
//       const userData = res.data;
//       console.log(userData);
//       setData(userData);
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   // Show loading state
//   if (loading) {
//     return (
//       <div
//         className={`min-h-screen flex items-center justify-center ${
//           dark ? "bg-black text-white" : "bg-white text-gray-900"
//         }`}
//       >
//         <div className="text-center">
//           <Loader />
//           {/* <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div> */}
//         </div>
//       </div>
//     );
//   }

//   // Show error state if no data
//   if (!data) {
//     return (
//       <div
//         className={`min-h-screen flex items-center justify-center ${
//           dark ? "bg-black text-white" : "bg-white text-gray-900"
//         }`}
//       >
//         <div className="text-center">
//           <p>Failed to load profile data</p>
//         </div>
//       </div>
//     );
//   }

//   // Create userData object with fallbacks for missing properties
//   const userData = {
//     name: data.name || "User",
//     // title: data.title || "Community Member",
//     bio:
//       data.bio ||
//       "Welcome to my profile! I'm excited to be part of the ManoSangam community.",
//     location: data.location || "Not specified",
//     // joinedDate: new Date(data.joinedDate).toLocaleDateString("en-US", {
//       // year: "numeric",
//       // month: "long",
//     // }),
//     skills: data.tags || [],
//     stats: {
//       ideasShared: data.stats?.ideasShared || 0,
//       collaborations: data.stats?.collaborations || 0,
//       followers: data.stats?.followers || 0,
//       following: data.stats?.following || 0,
//     },
//   };

//   const recentIdeas = data.recentIdeas || [
//     {
//       id: 1,
//       title: "Neural-Powered Climate Intelligence Platform",
//       description:
//         "Revolutionary AI system that predicts and mitigates environmental challenges through quantum-enhanced data processing and global sensor networks.",
//       likes: 245,
//       comments: 67,
//       date: "2 days ago",
//       tags: ["Climate Tech", "Neural Networks", "Quantum AI"],
//       status: "In Development",
//     },
//     {
//       id: 2,
//       title: "Immersive Learning Ecosystem for Global Education",
//       description:
//         "Next-generation educational platform leveraging AR/VR technologies to democratize world-class learning experiences across emerging markets.",
//       likes: 178,
//       comments: 43,
//       date: "5 days ago",
//       tags: ["EdTech", "AR/VR", "Social Impact"],
//       status: "Prototype",
//     },
//     {
//       id: 3,
//       title: "Blockchain-Native Supply Chain Revolution",
//       description:
//         "Transparent, sustainable supply chain infrastructure built on advanced blockchain architecture with real-time impact verification.",
//       likes: 198,
//       comments: 52,
//       date: "1 week ago",
//       tags: ["Blockchain", "Sustainability", "Supply Chain"],
//       status: "Funded",
//     },
//   ];

//   const collaborations = [
//     {
//       id: 1,
//       title: "EcoTech Solutions Consortium",
//       role: "Founding Visionary",
//       status: "Active",
//       members: 24,
//       description:
//         "Building the next generation of sustainable technology solutions through collaborative innovation and strategic partnerships.",
//     },
//     {
//       id: 2,
//       title: "AI for Humanity Initiative",
//       role: "Technical Strategist",
//       status: "Active",
//       members: 45,
//       description:
//         "Global initiative developing ethical AI frameworks and tools for social impact organizations worldwide.",
//     },
//   ];

//   return (
//     <div
//       className={`min-h-screen transition-colors duration-200 ${
//         dark ? "bg-black text-white" : "bg-white text-gray-900"
//       } pb-20`}
//     >
//       {/* Main Container */}
//       <div className="max-w-7xl mx-auto">
//         {/* Desktop Layout */}
//         <div className="hidden lg:flex lg:space-x-8 p-8">
//           {/* Left Sidebar - Desktop Only */}
//           <aside className="w-80 flex-shrink-0">
//             <div
//               className={`rounded-xl border p-6 sticky top-8 transition-colors duration-200 ${
//                 dark ? "bg-black border-gray-700" : "bg-white border-gray-200"
//               }`}
//             >
//               {/* Edit Icon - Top Right */}
//               <div className="flex justify-end mb-4">
//                 <button
//                   onClick={() => setIsEditing(!isEditing)}
//                   className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors group ${
//                     dark
//                       ? "bg-black hover:bg-black"
//                       : "bg-gray-100 hover:bg-gray-200"
//                   }`}
//                   title={isEditing ? "Save Changes" : "Edit Profile"}
//                 >
//                   {isEditing ? (
//                     <svg
//                       className={`w-5 h-5 transition-colors ${
//                         dark
//                           ? "text-gray-300 group-hover:text-white"
//                           : "text-gray-600 group-hover:text-gray-800"
//                       }`}
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M5 13l4 4L19 7"
//                       />
//                     </svg>
//                   ) : (
//                     <svg
//                       className={`w-5 h-5 transition-colors ${
//                         dark
//                           ? "text-gray-300 group-hover:text-white"
//                           : "text-gray-600 group-hover:text-gray-800"
//                       }`}
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//                       />
//                     </svg>
//                   )}
//                 </button>
//               </div>

//               {/* Profile Header */}
//               <div className="text-center mb-8">
//                 <div className="relative inline-block mb-4">
//                   <div
//                     className={`w-24 h-24 rounded-full flex items-center justify-center text-2xl font-semibold ${
//                       dark ? "bg-blue-600 text-white" : "bg-black text-white"
//                     }`}
//                   >
//                     {userData.name
//                       .split(" ")
//                       .map((n) => n[0])
//                       .join("")}
//                   </div>
//                 </div>

//                 <h1
//                   className={`text-xl font-bold mb-1 ${
//                     dark ? "text-white" : "text-gray-900"
//                   }`}
//                 >
//                   {userData.name}
//                 </h1>
//                 <p
//                   className={`text-sm mb-6 ${
//                     dark ? "text-gray-300" : "text-gray-600"
//                   }`}
//                 >
//                   {userData.title}
//                 </p>

//                 {/* Location and Date */}
//                 <div
//                   className={`space-y-2 text-xs mb-6 ${
//                     dark ? "text-gray-400" : "text-gray-500"
//                   }`}
//                 >
//                   <div className="flex items-center justify-center space-x-1">
//                     <svg
//                       className="w-4 h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                       />
//                     </svg>
//                     <span>{userData.location}</span>
//                   </div>
//                   <div className="flex items-center justify-center space-x-1">
//                     <svg
//                       className="w-4 h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v1a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2h2z"
//                       />
//                     </svg>
//                     <span>Joined {userData.joinedDate}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Stats Grid */}
//               <div className="grid grid-cols-2 gap-3 mb-8">
//                 <div
//                   className={`text-center p-4 rounded-lg transition-colors cursor-pointer ${
//                     dark
//                       ? "bg-gray-700 hover:bg-gray-600"
//                       : "bg-gray-50 hover:bg-gray-100"
//                   }`}
//                 >
//                   <div
//                     className={`text-xl font-bold ${
//                       dark ? "text-white" : "text-gray-900"
//                     }`}
//                   >
//                     {userData.stats.ideasShared}
//                   </div>
//                   <div
//                     className={`text-xs ${
//                       dark ? "text-gray-400" : "text-gray-600"
//                     }`}
//                   >
//                     Ideas
//                   </div>
//                 </div>
//                 <div
//                   className={`text-center p-4 rounded-lg transition-colors cursor-pointer ${
//                     dark
//                       ? "bg-gray-700 hover:bg-gray-600"
//                       : "bg-gray-50 hover:bg-gray-100"
//                   }`}
//                 >
//                   <div
//                     className={`text-xl font-bold ${
//                       dark ? "text-white" : "text-gray-900"
//                     }`}
//                   >
//                     {userData.stats.collaborations}
//                   </div>
//                   <div
//                     className={`text-xs ${
//                       dark ? "text-gray-400" : "text-gray-600"
//                     }`}
//                   >
//                     Projects
//                   </div>
//                 </div>
//                 <div
//                   className={`text-center p-4 rounded-lg transition-colors cursor-pointer ${
//                     dark
//                       ? "bg-gray-700 hover:bg-gray-600"
//                       : "bg-gray-50 hover:bg-gray-100"
//                   }`}
//                 >
//                   <div
//                     className={`text-xl font-bold ${
//                       dark ? "text-white" : "text-gray-900"
//                     }`}
//                   >
//                     {userData.stats.followers}
//                   </div>
//                   <div
//                     className={`text-xs ${
//                       dark ? "text-gray-400" : "text-gray-600"
//                     }`}
//                   >
//                     Followers
//                   </div>
//                 </div>
//                 <div
//                   className={`text-center p-4 rounded-lg transition-colors cursor-pointer ${
//                     dark
//                       ? "bg-gray-700 hover:bg-gray-600"
//                       : "bg-gray-50 hover:bg-gray-100"
//                   }`}
//                 >
//                   <div
//                     className={`text-xl font-bold ${
//                       dark ? "text-white" : "text-gray-900"
//                     }`}
//                   >
//                     {userData.stats.following}
//                   </div>
//                   <div
//                     className={`text-xs ${
//                       dark ? "text-gray-400" : "text-gray-600"
//                     }`}
//                   >
//                     Following
//                   </div>
//                 </div>
//               </div>

//               {/* Bio */}
//               <div className="mb-8">
//                 <h3
//                   className={`text-sm font-semibold mb-3 ${
//                     dark ? "text-white" : "text-gray-900"
//                   }`}
//                 >
//                   About
//                 </h3>
//                 <p
//                   className={`text-sm leading-relaxed ${
//                     dark ? "text-gray-300" : "text-gray-600"
//                   }`}
//                 >
//                   {userData.bio}
//                 </p>
//               </div>

//               {/* Skills */}
//               <div className="mb-8">
//                 <h3
//                   className={`text-sm font-semibold mb-3 ${
//                     dark ? "text-white" : "text-gray-900"
//                   }`}
//                 >
//                   Skills
//                 </h3>
//                 <div className="flex flex-wrap gap-2">
//                   {userData.skills.length > 0 ? (
//                     userData.skills.map((skill, index) => (
//                       <span
//                         key={index}
//                         className={`px-3 py-1 rounded-full text-xs border transition-colors ${
//                           dark
//                             ? "bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600"
//                             : "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200"
//                         }`}
//                       >
//                         {skill}
//                       </span>
//                     ))
//                   ) : (
//                     <span
//                       className={`text-xs ${
//                         dark ? "text-gray-400" : "text-gray-500"
//                       }`}
//                     >
//                       No skills added yet
//                     </span>
//                   )}
//                 </div>
//               </div>

//               {/* Monthly Stats */}
//               <div>
//                 <h3
//                   className={`text-sm font-semibold mb-4 ${
//                     dark ? "text-white" : "text-gray-900"
//                   }`}
//                 >
//                   This Month
//                 </h3>
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center text-sm">
//                     <span className={dark ? "text-gray-400" : "text-gray-600"}>
//                       Ideas Posted
//                     </span>
//                     <div className="flex items-center space-x-2">
//                       <div
//                         className={`w-16 h-1 rounded-full overflow-hidden ${
//                           dark ? "bg-gray-700" : "bg-gray-200"
//                         }`}
//                       >
//                         <div
//                           className={`w-3/4 h-full rounded-full ${
//                             dark ? "bg-blue-500" : "bg-gray-900"
//                           }`}
//                         ></div>
//                       </div>
//                       <span
//                         className={`font-semibold w-6 text-right ${
//                           dark ? "text-white" : "text-gray-900"
//                         }`}
//                       >
//                         12
//                       </span>
//                     </div>
//                   </div>
//                   <div className="flex justify-between items-center text-sm">
//                     <span className={dark ? "text-gray-400" : "text-gray-600"}>
//                       Collaborations
//                     </span>
//                     <div className="flex items-center space-x-2">
//                       <div
//                         className={`w-16 h-1 rounded-full overflow-hidden ${
//                           dark ? "bg-gray-700" : "bg-gray-200"
//                         }`}
//                       >
//                         <div
//                           className={`w-1/4 h-full rounded-full ${
//                             dark ? "bg-blue-500" : "bg-gray-900"
//                           }`}
//                         ></div>
//                       </div>
//                       <span
//                         className={`font-semibold w-6 text-right ${
//                           dark ? "text-white" : "text-gray-900"
//                         }`}
//                       >
//                         3
//                       </span>
//                     </div>
//                   </div>
//                   <div className="flex justify-between items-center text-sm">
//                     <span className={dark ? "text-gray-400" : "text-gray-600"}>
//                       Profile Views
//                     </span>
//                     <div className="flex items-center space-x-2">
//                       <div
//                         className={`w-16 h-1 rounded-full overflow-hidden ${
//                           dark ? "bg-gray-700" : "bg-gray-200"
//                         }`}
//                       >
//                         <div
//                           className={`w-full h-full rounded-full ${
//                             dark ? "bg-blue-500" : "bg-gray-900"
//                           }`}
//                         ></div>
//                       </div>
//                       <span
//                         className={`font-semibold w-6 text-right ${
//                           dark ? "text-white" : "text-gray-900"
//                         }`}
//                       >
//                         145
//                       </span>
//                     </div>
//                   </div>
//                   <div className="flex justify-between items-center text-sm">
//                     <span className={dark ? "text-gray-400" : "text-gray-600"}>
//                       New Connections
//                     </span>
//                     <div className="flex items-center space-x-2">
//                       <div
//                         className={`w-16 h-1 rounded-full overflow-hidden ${
//                           dark ? "bg-gray-700" : "bg-gray-200"
//                         }`}
//                       >
//                         <div
//                           className={`w-2/3 h-full rounded-full ${
//                             dark ? "bg-blue-500" : "bg-gray-900"
//                           }`}
//                         ></div>
//                       </div>
//                       <span
//                         className={`font-semibold w-6 text-right ${
//                           dark ? "text-white" : "text-gray-900"
//                         }`}
//                       >
//                         28
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </aside>

//           {/* Main Content - Desktop */}
//           <main className="flex-1">
//             {/* Navigation Tabs */}
//             <div
//               className={`rounded-xl mb-8 overflow-hidden transition-colors duration-200 ${
//                 dark
//                   ? "bg-black border border-gray-700"
//                   : "bg-white border border-gray-200"
//               }`}
//             >
//               <div className="flex">
//                 {[
//                   { id: "overview", label: "Overview", icon: "" },
//                   { id: "ideas", label: "Ideas", icon: "" },
//                   { id: "collaborations", label: "Collaborations", icon: "" },
//                   { id: "achievements", label: "Achievements", icon: "" },
//                 ].map((tab) => (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`flex-1 px-6 py-4 font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
//                       activeTab === tab.id
//                         ? dark
//                           ? "bg-gray-700 text-white border-b-2 border-blue-500"
//                           : "bg-gray-50 text-gray-900 border-b-2 border-gray-900"
//                         : dark
//                         ? "text-gray-400 hover:text-white hover:bg-gray-700"
//                         : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
//                     }`}
//                   >
//                     <span className="text-lg">{tab.icon}</span>
//                     <span>{tab.label}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Tab Content */}
//             <div>
//               {activeTab === "overview" && (
//                 <div className="space-y-8">
//                   {/* Recent Activity */}
//                   <div
//                     className={`rounded-xl border p-6 transition-colors duration-200 ${
//                       dark
//                         ? "bg-gray-800 border-gray-700"
//                         : "bg-white border-gray-200"
//                     }`}
//                   >
//                     <div className="flex justify-between items-center mb-6">
//                       <h2
//                         className={`text-xl font-semibold ${
//                           dark ? "text-white" : "text-gray-900"
//                         }`}
//                       >
//                         Recent Activity
//                       </h2>
//                       <button
//                         className={`font-medium text-sm transition-colors ${
//                           dark
//                             ? "text-gray-400 hover:text-white"
//                             : "text-gray-600 hover:text-gray-900"
//                         }`}
//                       >
//                         View All →
//                       </button>
//                     </div>
//                     <div className="space-y-6">
//                       {recentIdeas.slice(0, 3).map((idea) => (
//                         <article
//                           key={idea.id}
//                           className={`pb-6 border-b last:border-b-0 p-4 rounded-lg -m-4 transition-colors ${
//                             dark
//                               ? "border-gray-700 hover:bg-gray-700"
//                               : "border-gray-100 hover:bg-gray-50"
//                           }`}
//                         >
//                           <div className="flex justify-between items-start mb-3">
//                             <h3
//                               className={`font-semibold flex-1 pr-4 transition-colors cursor-pointer ${
//                                 dark
//                                   ? "text-white hover:text-blue-400"
//                                   : "text-gray-900 hover:text-blue-600"
//                               }`}
//                             >
//                               {idea.title}
//                             </h3>
//                             <span
//                               className={`text-sm whitespace-nowrap ${
//                                 dark ? "text-gray-400" : "text-gray-500"
//                               }`}
//                             >
//                               {idea.date}
//                             </span>
//                           </div>
//                           <p
//                             className={`leading-relaxed mb-4 ${
//                               dark ? "text-gray-300" : "text-gray-600"
//                             }`}
//                           >
//                             {idea.description}
//                           </p>
//                           <div className="flex justify-between items-center">
//                             <div className="flex space-x-2">
//                               {idea.tags.slice(0, 2).map((tag, index) => (
//                                 <span
//                                   key={index}
//                                   className={`px-3 py-1 text-xs rounded-full border transition-colors ${
//                                     dark
//                                       ? "bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600"
//                                       : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
//                                   }`}
//                                 >
//                                   {tag}
//                                 </span>
//                               ))}
//                             </div>
//                             <div
//                               className={`flex items-center space-x-4 text-sm ${
//                                 dark ? "text-gray-400" : "text-gray-500"
//                               }`}
//                             >
//                               <span className="flex items-center space-x-1 hover:text-red-500 transition-colors cursor-pointer">
//                                 <svg
//                                   className="w-4 h-4"
//                                   fill="none"
//                                   stroke="currentColor"
//                                   viewBox="0 0 24 24"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                                   />
//                                 </svg>
//                                 <span>{idea.likes}</span>
//                               </span>
//                               <span className="flex items-center space-x-1 hover:text-blue-500 transition-colors cursor-pointer">
//                                 <svg
//                                   className="w-4 h-4"
//                                   fill="none"
//                                   stroke="currentColor"
//                                   viewBox="0 0 24 24"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//                                   />
//                                 </svg>
//                                 <span>{idea.comments}</span>
//                               </span>
//                             </div>
//                           </div>
//                         </article>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Suggested Connections */}
//                   <div
//                     className={`rounded-xl border p-6 transition-colors duration-200 ${
//                       dark
//                         ? "bg-gray-800 border-gray-700"
//                         : "bg-white border-gray-200"
//                     }`}
//                   >
//                     <h2
//                       className={`text-xl font-semibold mb-6 ${
//                         dark ? "text-white" : "text-gray-900"
//                       }`}
//                     >
//                       Suggested Connections
//                     </h2>
//                     <div className="space-y-4">
//                       {[
//                         {
//                           name: "Dr. Arjun Krishnamurthy",
//                           role: "Quantum Computing Researcher",
//                           mutual: 12,
//                         },
//                         {
//                           name: "Sarah Chen",
//                           role: "Sustainable Design Director",
//                           mutual: 8,
//                         },
//                         {
//                           name: "Rajesh Kumar",
//                           role: "Venture Partner",
//                           mutual: 15,
//                         },
//                       ].map((person, index) => (
//                         <div
//                           key={index}
//                           className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
//                             dark
//                               ? "bg-gray-700 hover:bg-gray-600"
//                               : "bg-gray-50 hover:bg-gray-100"
//                           }`}
//                         >
//                           <div className="flex items-center space-x-3">
//                             <div
//                               className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
//                                 dark ? "bg-blue-600" : "bg-gray-900"
//                               }`}
//                             >
//                               {person.name
//                                 .split(" ")
//                                 .map((n) => n[0])
//                                 .join("")}
//                             </div>
//                             <div>
//                               <div
//                                 className={`font-medium text-sm ${
//                                   dark ? "text-white" : "text-gray-900"
//                                 }`}
//                               >
//                                 {person.name}
//                               </div>
//                               <div
//                                 className={`text-xs ${
//                                   dark ? "text-gray-400" : "text-gray-500"
//                                 }`}
//                               >
//                                 {person.role}
//                               </div>
//                               <div className="text-xs text-blue-600">
//                                 {person.mutual} mutual connections
//                               </div>
//                             </div>
//                           </div>
//                           <button
//                             className={`px-4 py-2 text-sm rounded-lg transition-colors ${
//                               dark
//                                 ? "bg-blue-600 text-white hover:bg-blue-700"
//                                 : "bg-gray-900 text-white hover:bg-gray-800"
//                             }`}
//                           >
//                             Connect
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Ideas Tab Content */}
//               {activeTab === "ideas" && (
//                 <div
//                   className={`rounded-xl border p-6 transition-colors duration-200 ${
//                     dark
//                       ? "bg-gray-800 border-gray-700"
//                       : "bg-white border-gray-200"
//                   }`}
//                 >
//                   <div className="flex justify-between items-center mb-6">
//                     <h2
//                       className={`text-xl font-semibold ${
//                         dark ? "text-white" : "text-gray-900"
//                       }`}
//                     >
//                       My Ideas ({recentIdeas.length})
//                     </h2>
//                     <button
//                       className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                         dark
//                           ? "bg-blue-600 text-white hover:bg-blue-700"
//                           : "bg-gray-900 text-white hover:bg-gray-800"
//                       }`}
//                     >
//                       + New Idea
//                     </button>
//                   </div>
//                   <div className="space-y-6">
//                     {recentIdeas.map((idea) => (
//                       <article
//                         key={idea.id}
//                         className={`p-6 rounded-xl border transition-all duration-200 ${
//                           dark
//                             ? "bg-gray-700 border-gray-600 hover:shadow-lg hover:shadow-gray-900/20"
//                             : "bg-gray-50 border-gray-100 hover:shadow-md"
//                         }`}
//                       >
//                         <div className="flex justify-between items-start mb-4">
//                           <div className="flex items-center space-x-3">
//                             <h3
//                               className={`text-lg font-semibold transition-colors cursor-pointer ${
//                                 dark
//                                   ? "text-white hover:text-blue-400"
//                                   : "text-gray-900 hover:text-blue-600"
//                               }`}
//                             >
//                               {idea.title}
//                             </h3>
//                             <span
//                               className={`px-3 py-1 rounded-full text-sm font-medium ${
//                                 idea.status === "Funded"
//                                   ? "bg-green-100 text-green-800"
//                                   : idea.status === "In Development"
//                                   ? "bg-blue-100 text-blue-800"
//                                   : "bg-orange-100 text-orange-800"
//                               }`}
//                             >
//                               {idea.status}
//                             </span>
//                           </div>
//                           <span
//                             className={`text-sm ${
//                               dark ? "text-gray-400" : "text-gray-500"
//                             }`}
//                           >
//                             {idea.date}
//                           </span>
//                         </div>
//                         <p
//                           className={`leading-relaxed mb-4 ${
//                             dark ? "text-gray-300" : "text-gray-600"
//                           }`}
//                         >
//                           {idea.description}
//                         </p>
//                         <div className="flex justify-between items-center">
//                           <div className="flex space-x-2">
//                             {idea.tags.map((tag, index) => (
//                               <span
//                                 key={index}
//                                 className={`px-3 py-1 border text-sm rounded-full transition-colors ${
//                                   dark
//                                     ? "bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-600"
//                                     : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
//                                 }`}
//                               >
//                                 {tag}
//                               </span>
//                             ))}
//                           </div>
//                           <div className="flex items-center space-x-6">
//                             <span
//                               className={`flex items-center space-x-1 hover:text-red-500 transition-colors cursor-pointer ${
//                                 dark ? "text-gray-400" : "text-gray-500"
//                               }`}
//                             >
//                               <svg
//                                 className="w-4 h-4"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth={2}
//                                   d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                                 />
//                               </svg>
//                               <span>{idea.likes}</span>
//                             </span>
//                             <span
//                               className={`flex items-center space-x-1 hover:text-blue-500 transition-colors cursor-pointer ${
//                                 dark ? "text-gray-400" : "text-gray-500"
//                               }`}
//                             >
//                               <svg
//                                 className="w-4 h-4"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth={2}
//                                   d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//                                 />
//                               </svg>
//                               <span>{idea.comments}</span>
//                             </span>
//                             <button
//                               className={`font-medium transition-colors ${
//                                 dark
//                                   ? "text-white hover:text-blue-400"
//                                   : "text-gray-900 hover:text-blue-600"
//                               }`}
//                             >
//                               View Details →
//                             </button>
//                           </div>
//                         </div>
//                       </article>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Collaborations Tab Content */}
//               {activeTab === "collaborations" && (
//                 <div
//                   className={`rounded-xl border p-6 transition-colors duration-200 ${
//                     dark
//                       ? "bg-gray-800 border-gray-700"
//                       : "bg-white border-gray-200"
//                   }`}
//                 >
//                   <div className="flex justify-between items-center mb-6">
//                     <h2
//                       className={`text-xl font-semibold ${
//                         dark ? "text-white" : "text-gray-900"
//                       }`}
//                     >
//                       Active Collaborations ({collaborations.length})
//                     </h2>
//                     <button
//                       className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                         dark
//                           ? "bg-blue-600 text-white hover:bg-blue-700"
//                           : "bg-gray-900 text-white hover:bg-gray-800"
//                       }`}
//                     >
//                       + New Project
//                     </button>
//                   </div>
//                   <div className="grid md:grid-cols-2 gap-6">
//                     {collaborations.map((collab) => (
//                       <article
//                         key={collab.id}
//                         className={`p-6 rounded-xl border transition-all duration-200 ${
//                           dark
//                             ? "bg-gray-700 border-gray-600 hover:shadow-lg hover:shadow-gray-900/20"
//                             : "bg-gray-50 border-gray-100 hover:shadow-md"
//                         }`}
//                       >
//                         <div className="flex justify-between items-start mb-4">
//                           <div>
//                             <h3
//                               className={`text-lg font-semibold mb-2 transition-colors cursor-pointer ${
//                                 dark
//                                   ? "text-white hover:text-blue-400"
//                                   : "text-gray-900 hover:text-blue-600"
//                               }`}
//                             >
//                               {collab.title}
//                             </h3>
//                             <div
//                               className={`flex items-center space-x-4 text-sm ${
//                                 dark ? "text-gray-300" : "text-gray-600"
//                               }`}
//                             >
//                               <span className="font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
//                                 {collab.role}
//                               </span>
//                               <span className="flex items-center space-x-1">
//                                 <svg
//                                   className="w-4 h-4"
//                                   fill="none"
//                                   stroke="currentColor"
//                                   viewBox="0 0 24 24"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"
//                                   />
//                                 </svg>
//                                 <span>{collab.members} members</span>
//                               </span>
//                             </div>
//                           </div>
//                           <span
//                             className={`px-3 py-1 rounded-full text-xs font-medium ${
//                               collab.status === "Active"
//                                 ? "bg-green-100 text-green-800"
//                                 : "bg-orange-100 text-orange-800"
//                             }`}
//                           >
//                             {collab.status}
//                           </span>
//                         </div>
//                         <p
//                           className={`leading-relaxed mb-4 ${
//                             dark ? "text-gray-300" : "text-gray-600"
//                           }`}
//                         >
//                           {collab.description}
//                         </p>
//                         <div className="flex justify-between items-center">
//                           <button
//                             className={`font-medium transition-colors ${
//                               dark
//                                 ? "text-white hover:text-blue-400"
//                                 : "text-gray-900 hover:text-blue-600"
//                             }`}
//                           >
//                             View Project →
//                           </button>
//                           <button
//                             className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
//                               dark
//                                 ? "bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-600"
//                                 : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
//                             }`}
//                           >
//                             Manage
//                           </button>
//                         </div>
//                       </article>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Achievements Tab Content */}
//               {activeTab === "achievements" && (
//                 <div
//                   className={`rounded-xl border p-6 transition-colors duration-200 ${
//                     dark
//                       ? "bg-gray-800 border-gray-700"
//                       : "bg-white border-gray-200"
//                   }`}
//                 >
//                   <h2
//                     className={`text-xl font-semibold mb-6 ${
//                       dark ? "text-white" : "text-gray-900"
//                     }`}
//                   >
//                     Achievements & Milestones
//                   </h2>
//                   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {[
//                       {
//                         title: "First Idea",
//                         description: "Posted your first idea on ManoSangam",
//                         date: "March 2024",
//                         icon: "🌱",
//                       },
//                       {
//                         title: "Collaborator",
//                         description: "Started 10+ successful collaborations",
//                         date: "April 2024",
//                         icon: "🤝",
//                       },
//                       {
//                         title: "Innovator",
//                         description: "100+ ideas shared with the community",
//                         date: "May 2024",
//                         icon: "💡",
//                       },
//                       {
//                         title: "Community Member",
//                         description: "Received 500+ likes on your ideas",
//                         date: "June 2024",
//                         icon: "❤️",
//                       },
//                       {
//                         title: "Mentor",
//                         description: "Guided 5+ community members",
//                         date: "July 2024",
//                         icon: "🎯",
//                       },
//                       {
//                         title: "Top Contributor",
//                         description: "Top 10% contributor this month",
//                         date: "August 2024",
//                         icon: "⭐",
//                       },
//                     ].map((achievement, index) => (
//                       <div
//                         key={index}
//                         className={`p-6 rounded-xl border transition-all duration-200 ${
//                           dark
//                             ? "bg-gray-700 border-gray-600 hover:shadow-lg hover:shadow-gray-900/20"
//                             : "bg-gray-50 border-gray-100 hover:shadow-md"
//                         }`}
//                       >
//                         <div className="text-3xl mb-3">{achievement.icon}</div>
//                         <h3
//                           className={`text-lg font-semibold mb-2 ${
//                             dark ? "text-white" : "text-gray-900"
//                           }`}
//                         >
//                           {achievement.title}
//                         </h3>
//                         <p
//                           className={`text-sm leading-relaxed mb-3 ${
//                             dark ? "text-gray-300" : "text-gray-600"
//                           }`}
//                         >
//                           {achievement.description}
//                         </p>
//                         <span
//                           className={`text-xs px-2 py-1 rounded-full ${
//                             dark
//                               ? "text-gray-400 bg-gray-800"
//                               : "text-gray-500 bg-gray-100"
//                           }`}
//                         >
//                           {achievement.date}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </main>
//         </div>

//         {/* Mobile Layout */}
//         <div className="lg:hidden">
//           {/* Mobile Profile Header */}
//           <div
//             className={`border-b relative transition-colors duration-200 ${
//               dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
//             }`}
//           >
//             {/* Edit Icon - Mobile Top Right */}
//             <div className="absolute top-4 right-4 z-10">
//               <button
//                 onClick={() => setIsEditing(!isEditing)}
//                 className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
//                   dark
//                     ? "bg-gray-700 hover:bg-gray-600"
//                     : "bg-gray-100 hover:bg-gray-200"
//                 }`}
//                 title={isEditing ? "Save Changes" : "Edit Profile"}
//               >
//                 {isEditing ? (
//                   <svg
//                     className={`w-5 h-5 ${
//                       dark ? "text-gray-300" : "text-gray-600"
//                     }`}
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M5 13l4 4L19 7"
//                     />
//                   </svg>
//                 ) : (
//                   <svg
//                     className={`w-5 h-5 ${
//                       dark ? "text-gray-300" : "text-gray-600"
//                     }`}
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//                     />
//                   </svg>
//                 )}
//               </button>
//             </div>

//             <div className="p-6 pt-16">
//               <div className="text-center">
//                 <div className="relative inline-block mb-4">
//                   <div
//                     className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-xl font-semibold ${
//                       dark ? "bg-blue-600" : "bg-gray-900"
//                     }`}
//                   >
//                     {userData.name
//                       .split(" ")
//                       .map((n) => n[0])
//                       .join("")}
//                   </div>
//                   <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
//                 </div>

//                 <h1
//                   className={`text-xl font-bold mb-1 ${
//                     dark ? "text-white" : "text-gray-900"
//                   }`}
//                 >
//                   {userData.name}
//                 </h1>
//                 <p
//                   className={`text-sm mb-6 ${
//                     dark ? "text-gray-300" : "text-gray-600"
//                   }`}
//                 >
//                   {userData.title}
//                 </p>

//                 {/* Mobile Stats */}
//                 <div className="grid grid-cols-4 gap-3">
//                   <div
//                     className={`text-center p-3 rounded-lg transition-colors ${
//                       dark ? "bg-gray-700" : "bg-gray-50"
//                     }`}
//                   >
//                     <div
//                       className={`text-lg font-bold ${
//                         dark ? "text-white" : "text-gray-900"
//                       }`}
//                     >
//                       {userData.stats.ideasShared}
//                     </div>
//                     <div
//                       className={`text-xs ${
//                         dark ? "text-gray-400" : "text-gray-600"
//                       }`}
//                     >
//                       Ideas
//                     </div>
//                   </div>
//                   <div
//                     className={`text-center p-3 rounded-lg transition-colors ${
//                       dark ? "bg-gray-700" : "bg-gray-50"
//                     }`}
//                   >
//                     <div
//                       className={`text-lg font-bold ${
//                         dark ? "text-white" : "text-gray-900"
//                       }`}
//                     >
//                       {userData.stats.collaborations}
//                     </div>
//                     <div
//                       className={`text-xs ${
//                         dark ? "text-gray-400" : "text-gray-600"
//                       }`}
//                     >
//                       Projects
//                     </div>
//                   </div>
//                   <div
//                     className={`text-center p-3 rounded-lg transition-colors ${
//                       dark ? "bg-gray-700" : "bg-gray-50"
//                     }`}
//                   >
//                     <div
//                       className={`text-lg font-bold ${
//                         dark ? "text-white" : "text-gray-900"
//                       }`}
//                     >
//                       {userData.stats.followers}
//                     </div>
//                     <div
//                       className={`text-xs ${
//                         dark ? "text-gray-400" : "text-gray-600"
//                       }`}
//                     >
//                       Followers
//                     </div>
//                   </div>
//                   <div
//                     className={`text-center p-3 rounded-lg transition-colors ${
//                       dark ? "bg-gray-700" : "bg-gray-50"
//                     }`}
//                   >
//                     <div
//                       className={`text-lg font-bold ${
//                         dark ? "text-white" : "text-gray-900"
//                       }`}
//                     >
//                       {userData.stats.following}
//                     </div>
//                     <div
//                       className={`text-xs ${
//                         dark ? "text-gray-400" : "text-gray-600"
//                       }`}
//                     >
//                       Following
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Mobile Bio & Skills */}
//           <div
//             className={`p-6 border-b space-y-6 transition-colors duration-200 ${
//               dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
//             }`}
//           >
//             <div>
//               <h3
//                 className={`text-sm font-semibold mb-2 ${
//                   dark ? "text-white" : "text-gray-900"
//                 }`}
//               >
//                 About
//               </h3>
//               <p
//                 className={`text-sm leading-relaxed ${
//                   dark ? "text-gray-300" : "text-gray-600"
//                 }`}
//               >
//                 {userData.bio}
//               </p>
//             </div>

//             <div>
//               <h3
//                 className={`text-sm font-semibold mb-3 ${
//                   dark ? "text-white" : "text-gray-900"
//                 }`}
//               >
//                 Skills
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {userData.skills.length > 0 ? (
//                   userData.skills.map((skill, index) => (
//                     <span
//                       key={index}
//                       className={`px-2 py-1 rounded-full text-xs border transition-colors ${
//                         dark
//                           ? "bg-gray-700 text-gray-200 border-gray-600"
//                           : "bg-gray-100 text-gray-800 border-gray-200"
//                       }`}
//                     >
//                       {skill}
//                     </span>
//                   ))
//                 ) : (
//                   <span
//                     className={`text-xs ${
//                       dark ? "text-gray-400" : "text-gray-500"
//                     }`}
//                   >
//                     No skills added yet
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Mobile Navigation Tabs */}
//           <div
//             className={`border-b px-4 transition-colors duration-200 ${
//               dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
//             }`}
//           >
//             <div className="flex overflow-x-auto">
//               {[
//                 { id: "overview", label: "Overview", icon: "👤" },
//                 { id: "ideas", label: "Ideas", icon: "💡" },
//                 { id: "collaborations", label: "Collaborations", icon: "🤝" },
//                 { id: "achievements", label: "Achievements", icon: "🏆" },
//               ].map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex-shrink-0 px-4 py-3 font-medium transition-all duration-200 whitespace-nowrap flex items-center space-x-2 ${
//                     activeTab === tab.id
//                       ? dark
//                         ? "text-white border-b-2 border-blue-500"
//                         : "text-gray-900 border-b-2 border-gray-900"
//                       : dark
//                       ? "text-gray-400"
//                       : "text-gray-600"
//                   }`}
//                 >
//                   <span>{tab.icon}</span>
//                   <span>{tab.label}</span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Mobile Content */}
//           <div className="p-4">
//             {activeTab === "overview" && (
//               <div className="space-y-6">
//                 {/* Recent Activity - Mobile */}
//                 <div
//                   className={`rounded-xl border p-4 transition-colors duration-200 ${
//                     dark
//                       ? "bg-gray-800 border-gray-700"
//                       : "bg-white border-gray-200"
//                   }`}
//                 >
//                   <h2
//                     className={`text-lg font-semibold mb-4 ${
//                       dark ? "text-white" : "text-gray-900"
//                     }`}
//                   >
//                     Recent Activity
//                   </h2>
//                   <div className="space-y-4">
//                     {recentIdeas.slice(0, 3).map((idea) => (
//                       <article
//                         key={idea.id}
//                         className={`pb-4 border-b last:border-b-0 ${
//                           dark ? "border-gray-700" : "border-gray-100"
//                         }`}
//                       >
//                         <div className="mb-2">
//                           <h3
//                             className={`font-semibold text-sm mb-1 ${
//                               dark ? "text-white" : "text-gray-900"
//                             }`}
//                           >
//                             {idea.title}
//                           </h3>
//                           <span
//                             className={`text-xs ${
//                               dark ? "text-gray-400" : "text-gray-500"
//                             }`}
//                           >
//                             {idea.date}
//                           </span>
//                         </div>
//                         <p
//                           className={`text-sm leading-relaxed mb-3 ${
//                             dark ? "text-gray-300" : "text-gray-600"
//                           }`}
//                         >
//                           {idea.description}
//                         </p>
//                         <div className="flex justify-between items-center">
//                           <div className="flex space-x-2">
//                             {idea.tags.slice(0, 1).map((tag, index) => (
//                               <span
//                                 key={index}
//                                 className={`px-2 py-1 text-xs rounded-full border ${
//                                   dark
//                                     ? "bg-gray-700 text-gray-200 border-gray-600"
//                                     : "bg-gray-100 text-gray-700 border-gray-200"
//                                 }`}
//                               >
//                                 {tag}
//                               </span>
//                             ))}
//                           </div>
//                           <div
//                             className={`flex items-center space-x-3 text-xs ${
//                               dark ? "text-gray-400" : "text-gray-500"
//                             }`}
//                           >
//                             <span className="flex items-center space-x-1">
//                               <svg
//                                 className="w-3 h-3"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth={2}
//                                   d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                                 />
//                               </svg>
//                               <span>{idea.likes}</span>
//                             </span>
//                             <span className="flex items-center space-x-1">
//                               <svg
//                                 className="w-3 h-3"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth={2}
//                                   d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//                                 />
//                               </svg>
//                               <span>{idea.comments}</span>
//                             </span>
//                           </div>
//                         </div>
//                       </article>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Monthly Stats - Mobile with Progress Bars */}
//                 <div
//                   className={`rounded-xl border p-4 transition-colors duration-200 ${
//                     dark
//                       ? "bg-gray-800 border-gray-700"
//                       : "bg-white border-gray-200"
//                   }`}
//                 >
//                   <h2
//                     className={`text-lg font-semibold mb-4 ${
//                       dark ? "text-white" : "text-gray-900"
//                     }`}
//                   >
//                     This Month
//                   </h2>
//                   <div className="space-y-4">
//                     <div className="flex justify-between items-center text-sm">
//                       <span
//                         className={dark ? "text-gray-400" : "text-gray-600"}
//                       >
//                         Ideas Posted
//                       </span>
//                       <div className="flex items-center space-x-2">
//                         <div
//                           className={`w-12 h-1 rounded-full overflow-hidden ${
//                             dark ? "bg-gray-700" : "bg-gray-200"
//                           }`}
//                         >
//                           <div
//                             className={`w-3/4 h-full rounded-full ${
//                               dark ? "bg-blue-500" : "bg-gray-900"
//                             }`}
//                           ></div>
//                         </div>
//                         <span
//                           className={`font-semibold w-4 text-right ${
//                             dark ? "text-white" : "text-gray-900"
//                           }`}
//                         >
//                           12
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex justify-between items-center text-sm">
//                       <span
//                         className={dark ? "text-gray-400" : "text-gray-600"}
//                       >
//                         Collaborations
//                       </span>
//                       <div className="flex items-center space-x-2">
//                         <div
//                           className={`w-12 h-1 rounded-full overflow-hidden ${
//                             dark ? "bg-gray-700" : "bg-gray-200"
//                           }`}
//                         >
//                           <div
//                             className={`w-1/4 h-full rounded-full ${
//                               dark ? "bg-blue-500" : "bg-gray-900"
//                             }`}
//                           ></div>
//                         </div>
//                         <span
//                           className={`font-semibold w-4 text-right ${
//                             dark ? "text-white" : "text-gray-900"
//                           }`}
//                         >
//                           3
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex justify-between items-center text-sm">
//                       <span
//                         className={dark ? "text-gray-400" : "text-gray-600"}
//                       >
//                         Profile Views
//                       </span>
//                       <div className="flex items-center space-x-2">
//                         <div
//                           className={`w-12 h-1 rounded-full overflow-hidden ${
//                             dark ? "bg-gray-700" : "bg-gray-200"
//                           }`}
//                         >
//                           <div
//                             className={`w-full h-full rounded-full ${
//                               dark ? "bg-blue-500" : "bg-gray-900"
//                             }`}
//                           ></div>
//                         </div>
//                         <span
//                           className={`font-semibold w-4 text-right ${
//                             dark ? "text-white" : "text-gray-900"
//                           }`}
//                         >
//                           145
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex justify-between items-center text-sm">
//                       <span
//                         className={dark ? "text-gray-400" : "text-gray-600"}
//                       >
//                         New Connections
//                       </span>
//                       <div className="flex items-center space-x-2">
//                         <div
//                           className={`w-12 h-1 rounded-full overflow-hidden ${
//                             dark ? "bg-gray-700" : "bg-gray-200"
//                           }`}
//                         >
//                           <div
//                             className={`w-2/3 h-full rounded-full ${
//                               dark ? "bg-blue-500" : "bg-gray-900"
//                             }`}
//                           ></div>
//                         </div>
//                         <span
//                           className={`font-semibold w-4 text-right ${
//                             dark ? "text-white" : "text-gray-900"
//                           }`}
//                         >
//                           28
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Mobile Ideas Tab */}
//             {activeTab === "ideas" && (
//               <div className="space-y-6">
//                 <div className="flex justify-between items-center">
//                   <h2
//                     className={`text-lg font-semibold ${
//                       dark ? "text-white" : "text-gray-900"
//                     }`}
//                   >
//                     My Ideas ({recentIdeas.length})
//                   </h2>
//                   <button
//                     className={`px-3 py-2 rounded-lg text-sm transition-colors ${
//                       dark
//                         ? "bg-blue-600 text-white hover:bg-blue-700"
//                         : "bg-gray-900 text-white hover:bg-gray-800"
//                     }`}
//                   >
//                     + New
//                   </button>
//                 </div>

//                 <div className="space-y-4">
//                   {recentIdeas.map((idea) => (
//                     <div
//                       key={idea.id}
//                       className={`rounded-xl border p-4 transition-colors duration-200 ${
//                         dark
//                           ? "bg-gray-800 border-gray-700"
//                           : "bg-white border-gray-200"
//                       }`}
//                     >
//                       <div className="flex justify-between items-start mb-2">
//                         <h3
//                           className={`font-semibold text-sm flex-1 pr-2 ${
//                             dark ? "text-white" : "text-gray-900"
//                           }`}
//                         >
//                           {idea.title}
//                         </h3>
//                         <span
//                           className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${
//                             idea.status === "Funded"
//                               ? "bg-green-100 text-green-800"
//                               : idea.status === "In Development"
//                               ? "bg-blue-100 text-blue-800"
//                               : "bg-orange-100 text-orange-800"
//                           }`}
//                         >
//                           {idea.status}
//                         </span>
//                       </div>
//                       <p
//                         className={`text-sm leading-relaxed mb-3 ${
//                           dark ? "text-gray-300" : "text-gray-600"
//                         }`}
//                       >
//                         {idea.description}
//                       </p>
//                       <div className="flex justify-between items-center">
//                         <div className="flex space-x-2">
//                           {idea.tags.slice(0, 2).map((tag, index) => (
//                             <span
//                               key={index}
//                               className={`px-2 py-1 border text-xs rounded-full ${
//                                 dark
//                                   ? "bg-gray-700 border-gray-600 text-gray-200"
//                                   : "bg-gray-100 border-gray-200 text-gray-700"
//                               }`}
//                             >
//                               {tag}
//                             </span>
//                           ))}
//                         </div>
//                         <div
//                           className={`flex items-center space-x-3 text-xs ${
//                             dark ? "text-gray-400" : "text-gray-500"
//                           }`}
//                         >
//                           <span className="flex items-center space-x-1">
//                             <svg
//                               className="w-3 h-3"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                               />
//                             </svg>
//                             <span>{idea.likes}</span>
//                           </span>
//                           <span className="flex items-center space-x-1">
//                             <svg
//                               className="w-3 h-3"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//                               />
//                             </svg>
//                             <span>{idea.comments}</span>
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Mobile Collaborations Tab */}
//             {activeTab === "collaborations" && (
//               <div className="space-y-6">
//                 <div className="flex justify-between items-center">
//                   <h2
//                     className={`text-lg font-semibold ${
//                       dark ? "text-white" : "text-gray-900"
//                     }`}
//                   >
//                     Collaborations ({collaborations.length})
//                   </h2>
//                   <button
//                     className={`px-3 py-2 rounded-lg text-sm transition-colors ${
//                       dark
//                         ? "bg-blue-600 text-white hover:bg-blue-700"
//                         : "bg-gray-900 text-white hover:bg-gray-800"
//                     }`}
//                   >
//                     + New
//                   </button>
//                 </div>

//                 <div className="space-y-4">
//                   {collaborations.map((collab) => (
//                     <div
//                       key={collab.id}
//                       className={`rounded-xl border p-4 transition-colors duration-200 ${
//                         dark
//                           ? "bg-gray-800 border-gray-700"
//                           : "bg-white border-gray-200"
//                       }`}
//                     >
//                       <div className="flex justify-between items-start mb-2">
//                         <h3
//                           className={`font-semibold text-sm flex-1 pr-2 ${
//                             dark ? "text-white" : "text-gray-900"
//                           }`}
//                         >
//                           {collab.title}
//                         </h3>
//                         <span
//                           className={`px-2 py-1 rounded-full text-xs ${
//                             collab.status === "Active"
//                               ? "bg-green-100 text-green-800"
//                               : "bg-orange-100 text-orange-800"
//                           }`}
//                         >
//                           {collab.status}
//                         </span>
//                       </div>
//                       <div
//                         className={`text-xs mb-2 ${
//                           dark ? "text-gray-400" : "text-gray-600"
//                         }`}
//                       >
//                         {collab.role} • {collab.members} members
//                       </div>
//                       <p
//                         className={`text-sm leading-relaxed mb-3 ${
//                           dark ? "text-gray-300" : "text-gray-600"
//                         }`}
//                       >
//                         {collab.description}
//                       </p>
//                       <div className="flex justify-between items-center">
//                         <button
//                           className={`font-medium text-sm transition-colors ${
//                             dark
//                               ? "text-white hover:text-blue-400"
//                               : "text-gray-900 hover:text-blue-600"
//                           }`}
//                         >
//                           View Project →
//                         </button>
//                         <button
//                           className={`px-3 py-1 border rounded text-xs transition-colors ${
//                             dark
//                               ? "bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
//                               : "bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-50"
//                           }`}
//                         >
//                           Manage
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Mobile Achievements Tab */}
//             {activeTab === "achievements" && (
//               <div className="space-y-6">
//                 <h2
//                   className={`text-lg font-semibold ${
//                     dark ? "text-white" : "text-gray-900"
//                   }`}
//                 >
//                   Achievements
//                 </h2>
//                 <div className="space-y-4">
//                   {[
//                     {
//                       title: "First Idea",
//                       description: "Posted your first idea on ManoSangam",
//                       date: "March 2024",
//                       icon: "🌱",
//                     },
//                     {
//                       title: "Collaborator",
//                       description: "Started 10+ successful collaborations",
//                       date: "April 2024",
//                       icon: "🤝",
//                     },
//                     {
//                       title: "Innovator",
//                       description: "100+ ideas shared with the community",
//                       date: "May 2024",
//                       icon: "💡",
//                     },
//                     {
//                       title: "Community Member",
//                       description: "Received 500+ likes on your ideas",
//                       date: "June 2024",
//                       icon: "❤️",
//                     },
//                     {
//                       title: "Mentor",
//                       description: "Guided 5+ community members",
//                       date: "July 2024",
//                       icon: "🎯",
//                     },
//                     {
//                       title: "Top Contributor",
//                       description: "Top 10% contributor this month",
//                       date: "August 2024",
//                       icon: "⭐",
//                     },
//                   ].map((achievement, index) => (
//                     <div
//                       key={index}
//                       className={`rounded-xl border p-4 transition-colors duration-200 ${
//                         dark
//                           ? "bg-gray-800 border-gray-700"
//                           : "bg-white border-gray-200"
//                       }`}
//                     >
//                       <div className="flex items-start space-x-3">
//                         <div className="text-2xl">{achievement.icon}</div>
//                         <div className="flex-1">
//                           <h3
//                             className={`font-semibold text-sm mb-1 ${
//                               dark ? "text-white" : "text-gray-900"
//                             }`}
//                           >
//                             {achievement.title}
//                           </h3>
//                           <p
//                             className={`text-xs leading-relaxed mb-2 ${
//                               dark ? "text-gray-300" : "text-gray-600"
//                             }`}
//                           >
//                             {achievement.description}
//                           </p>
//                           <span
//                             className={`text-xs px-2 py-1 rounded-full ${
//                               dark
//                                 ? "text-gray-400 bg-gray-700"
//                                 : "text-gray-500 bg-gray-100"
//                             }`}
//                           >
//                             {achievement.date}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import useThemeStore from "../../store/themeStore";
// import api from "../../utils/api1";
// import Loader from "../../components/PostLoader";

// export default function Profile() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const dark = useThemeStore((e) => e.dark);

//   const fetchUser = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/user");
//       setData(res.data);
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   if (loading) {
//     return (
//       <div
//         style={{
//           minHeight: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundColor: dark ? "#000" : "#fff",
//           color: dark ? "#fff" : "#000",
//           fontFamily: "Arial, sans-serif",
//         }}
//       >
//         <Loader />
//       </div>
//     );
//   }

//   if (!data) {
//     return (
//       <div
//         style={{
//           minHeight: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundColor: dark ? "#000" : "#fff",
//           color: dark ? "#fff" : "#000",
//           fontFamily: "Arial, sans-serif",
//         }}
//       >
//         <p>Failed to load profile data</p>
//       </div>
//     );
//   }

//   const joinedDate = data.createdAt
//     ? new Date(data.createdAt).toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "long",
//       })
//     : "N/A";

//   const title = data.headline || "Community Member";

//   const userData = {
//     name: data.name || "User",
//     title,
//     bio:
//       data.bio ||
//       "Welcome to my profile! I'm excited to be part of the ManoSangam community.",
//     location: data.location || "Not specified",
//     joinedDate,
//     skills: data.skills || [],
//     stats: {
//       ideasShared: data.stats?.ideasShared || 0,
//       collaborations: data.stats?.collaborations || 0,
//       followers: data.stats?.followers || 0,
//       following: data.stats?.following || 0,
//     },
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         padding: "20px",
//         backgroundColor: dark ? "#000" : "#fff",
//         color: dark ? "#fff" : "#000",
//         fontFamily: "Arial, sans-serif",
//         maxWidth: "600px",
//         margin: "0 auto",
//       }}
//     >
//       <div style={{ textAlign: "center", marginBottom: "20px" }}>
//         <div
//           style={{
//             width: 80,
//             height: 80,
//             borderRadius: "50%",
//             backgroundColor: dark ? "#005f99" : "#333",
//             color: "#fff",
//             fontSize: "32px",
//             fontWeight: "bold",
//             lineHeight: "80px",
//             margin: "0 auto 10px",
//             userSelect: "none",
//           }}
//         >
//           {userData.name
//             .split(" ")
//             .map((n) => n[0])
//             .join("")}
//         </div>
//         <h1 style={{ margin: "0 0 5px", fontSize: "24px" }}>{userData.name}</h1>
//         {/* <p style={{ margin: "0 0 10px", fontSize: "14px", color: dark ? "#bbb" : "#666" }}>
//           {userData.title}
//         </p> */}
//         <div style={{ fontSize: "12px", color: dark ? "#999" : "#555" }}>
//           <div>Place: {userData.location}</div>
//           <div>Joined {userData.joinedDate}</div>
//         </div>
//       </div>

//       <div
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "space-between",
//           marginBottom: "20px",
//           gap: "10px",
//         }}
//       >
//         <StatBlock label="Ideas" value={userData.stats.ideasShared} dark={dark} />
//         <StatBlock label="Projects" value={userData.stats.collaborations} dark={dark} />
//         <StatBlock label="Followers" value={userData.stats.followers} dark={dark} />
//         <StatBlock label="Following" value={userData.stats.following} dark={dark} />
//       </div>

//       <section style={{ marginBottom: "20px" }}>
//         <h2 style={{ fontSize: "18px", marginBottom: "8px" }}>About</h2>
//         <p style={{ fontSize: "14px", lineHeight: 1.4, color: dark ? "#ccc" : "#444" }}>
//           {userData.bio}
//         </p>
//       </section>

//       <section>
//         <h2 style={{ fontSize: "18px", marginBottom: "8px" }}>Skills</h2>
//         {userData.skills.length > 0 ? (
//           <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
//             {userData.skills.map((skill, idx) => (
//               <span
//                 key={idx}
//                 style={{
//                   padding: "4px 8px",
//                   borderRadius: "12px",
//                   border: `1px solid ${dark ? "#666" : "#ccc"}`,
//                   fontSize: "12px",
//                   color: dark ? "#ddd" : "#333",
//                   userSelect: "none",
//                 }}
//               >
//                 {skill}
//               </span>
//             ))}
//           </div>
//         ) : (
//           <p style={{ fontSize: "14px", color: dark ? "#999" : "#666" }}>
//             No skills added yet
//           </p>
//         )}
//       </section>
//     </div>
//   );
// }

// function StatBlock({ label, value, dark }) {
//   return (
//     <div
//       style={{
//         flex: "1 1 45%",
//         minWidth: 120,
//         backgroundColor: dark ? "#111" : "#f5f5f5",
//         padding: "12px",
//         borderRadius: "6px",
//         textAlign: "center",
//         userSelect: "none",
//       }}
//     >
//       <div style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "4px" }}>
//         {value}
//       </div>
//       <div style={{ fontSize: "12px", color: dark ? "#888" : "#666" }}>{label}</div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import useThemeStore from "../../store/themeStore";
import api from "../../utils/api1";
import Loader from "../../components/PostLoader";

export default function Profile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const dark = useThemeStore((e) => e.dark);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await api.get("/user");
      setData(res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: dark ? "#000" : "#fff",
          color: dark ? "#fff" : "#000",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Loader />
      </div>
    );
  }

  if (!data) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: dark ? "#000" : "#fff",
          color: dark ? "#fff" : "#000",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <p>Failed to load profile data</p>
      </div>
    );
  }

  const joinedDate = data.createdAt
    ? new Date(data.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "N/A";

  const title = data.headline || "Community Member";

  const userData = {
    name: data.name || "User",
    title,
    bio:
      data.bio ||
      "Welcome to my profile! I'm excited to be part of the ManoSangam community.",
    location: data.location || "Not specified",
    joinedDate,
    skills: Array.isArray(data.skills) ? data.skills : [],
    stats: {
      ideasShared: data.stats?.ideasShared || 0,
      projects: data.stats?.collaborations || 0,
      followers: data.stats?.followers || 0,
      following: data.stats?.following || 0,
      totalLikes: data.stats?.totalLikes || 0,
      totalImpressions: data.stats?.totalImpressions || 0,
      fundedProjects: data.stats?.fundedProjects || 0,
    },
    role: data.role,
    investor: data.investor || null,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        backgroundColor: dark ? "#000" : "#fff",
        color: dark ? "#fff" : "#000",
        fontFamily: "Arial, sans-serif",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            backgroundColor: dark ? "#005f99" : "#333",
            color: "#fff",
            fontSize: "32px",
            fontWeight: "bold",
            lineHeight: "80px",
            margin: "0 auto 10px",
            userSelect: "none",
          }}
        >
          {userData.name
            .split(" ")
            .filter(Boolean)
            .map((n) => n)
            .join("")}
        </div>
        <h1 style={{ margin: "0 0 5px", fontSize: "24px" }}>{userData.name}</h1>
        {/* <p style={{ margin: "0 0 10px", fontSize: "14px", color: dark ? "#bbb" : "#666" }}>
          {userData.title}
        </p> */}
        <div style={{ fontSize: "12px", color: dark ? "#999" : "#555" }}>
          <div>Place: {userData.location}</div>
          <div>Joined {userData.joinedDate}</div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <StatBlock
          label="Ideas"
          value={userData.stats.ideasShared}
          dark={dark}
        />
        <StatBlock
          label="Projects"
          value={userData.stats.projects}
          dark={dark}
        />
        <StatBlock
          label="Followers"
          value={userData.stats.followers}
          dark={dark}
        />
        <StatBlock
          label="Following"
          value={userData.stats.following}
          dark={dark}
        />
        <StatBlock
          label="Likes"
          value={userData.stats.totalLikes}
          dark={dark}
        />
        <StatBlock
          label="Views"
          value={userData.stats.totalImpressions}
          dark={dark}
        />
        {userData.role === "investor" ? (
          <StatBlock
            label="Funded"
            value={userData.stats.fundedProjects}
            dark={dark}
          />
        ) : null}
      </div>

      <section style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "18px", marginBottom: "8px" }}>About</h2>
        <p
          style={{
            fontSize: "14px",
            lineHeight: 1.4,
            color: dark ? "#ccc" : "#444",
          }}
        >
          {userData.bio}
        </p>
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "18px", marginBottom: "8px" }}>Skills</h2>
        {userData.skills.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {userData.skills.map((skill, idx) => (
              <span
                key={idx}
                style={{
                  padding: "4px 8px",
                  borderRadius: "12px",
                  border: `1px solid ${dark ? "#666" : "#ccc"}`,
                  fontSize: "12px",
                  color: dark ? "#ddd" : "#333",
                  userSelect: "none",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: "14px", color: dark ? "#999" : "#666" }}>
            No skills added yet
          </p>
        )}
      </section>

      {userData.role === "investor" && userData.investor ? (
        <section style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "8px" }}>Investor</h2>
          <div style={{ fontSize: "14px", color: dark ? "#ccc" : "#444" }}>
            <div>Organization: {userData.investor.organization || "—"}</div>
            <div>Position: {userData.investor.position || "—"}</div>
            <div>
              Interests:{" "}
              {Array.isArray(userData.investor.interests) &&
              userData.investor.interests.length
                ? userData.investor.interests.join(", ")
                : "—"}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function StatBlock({ label, value, dark }) {
  return (
    <div
      style={{
        backgroundColor: dark ? "#111" : "#f5f5f5",
        padding: "12px",
        borderRadius: "6px",
        textAlign: "center",
        userSelect: "none",
      }}
    >
      <div
        style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "4px" }}
      >
        {value}
      </div>
      <div style={{ fontSize: "12px", color: dark ? "#888" : "#666" }}>
        {label}
      </div>
    </div>
  );
}
