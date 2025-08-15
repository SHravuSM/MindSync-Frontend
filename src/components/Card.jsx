// import { useCallback, useEffect, useState, useRef } from "react";
// import api from "../utils/api1";
// import bulb from "../assets/bulb2.png";
// import USER from "../assets/user.png";
// import useAuthStore from "../store/authStore";
// import useThemeStore from "../store/themeStore";
// import {
//   Heart,
//   Lightbulb,
//   MessageSquareDot,
//   User,
//   User2,
//   UserRoundCheck,
//   ChevronDown,
//   ChevronUp,
//   Clock,
//   Eye,
//   EyeOff,
//   Sparkles,
// } from "lucide-react";

// const Card = ({ post }) => {
//   const user = useAuthStore((s) => s.user);
//   const dark = useThemeStore((s) => s.dark);
//   const [Post, setPost] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [showOptions, setShowOptions] = useState(false);
//   const [collaborators, setCollaborators] = useState([]);
//   const [suggestions, setSuggestions] = useState([]);
//   const [newComment, setNewComment] = useState("");

//   // Enhanced animation states
//   const [isContentExpanded, setIsContentExpanded] = useState(false);
//   const [showExpandButton, setShowExpandButton] = useState(false);
//   const [isHovering, setIsHovering] = useState(false);
//   const [isLiking, setIsLiking] = useState(false);
//   const [isCommenting, setIsCommenting] = useState(false);
//   const [isCollabbing, setIsCollabbing] = useState(false);

//   // Refs for smooth animations
//   const contentRef = useRef(null);
//   const cardRef = useRef(null);

//   const userId = user?.id || user?._id;
//   const [hiddenComments, setHiddenComments] = useState(new Set());

//   const toggleCommentVisibility = (commentId) => {
//     setHiddenComments((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(commentId)) {
//         newSet.delete(commentId);
//       } else {
//         newSet.add(commentId);
//       }
//       return newSet;
//     });
//   };

//   // Enhanced content expansion logic with better height calculation
//   useEffect(() => {
//     if (Post?.content && contentRef.current) {
//       const element = contentRef.current;

//       // Create a temporary element to measure content properly
//       const temp = document.createElement("div");
//       temp.style.cssText = `
//         position: absolute;
//         visibility: hidden;
//         font-size: ${window.getComputedStyle(element).fontSize};
//         font-family: ${window.getComputedStyle(element).fontFamily};
//         line-height: ${window.getComputedStyle(element).lineHeight};
//         width: ${element.offsetWidth}px;
//         word-break: break-word;
//         white-space: pre-wrap;
//       `;
//       temp.textContent = Post.content;
//       document.body.appendChild(temp);

//       const fullHeight = temp.scrollHeight;
//       const lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
//       const maxLines = 5;
//       const collapsedHeight = lineHeight * maxLines;

//       document.body.removeChild(temp);

//       const needsExpansion =
//         fullHeight > collapsedHeight || Post.content.length > 350;
//       setShowExpandButton(needsExpansion);
//     }
//   }, [Post?.content]);

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     if (!newComment.trim()) return;

//     setIsCommenting(true);

//     const postId = Post._id;
//     const commentData = {
//       userId: userId,
//       content: newComment,
//     };

//     try {
//       const res = await api.post(
//         `user/posts/suggestions/${postId}`,
//         commentData
//       );
//       setSuggestions(res.data.suggestions || []);
//       setPost(res.data.post);
//       setNewComment("");

//       // Success animation
//       setTimeout(() => setIsCommenting(false), 800);
//     } catch (err) {
//       console.error("Failed to add comment:", err);
//       setIsCommenting(false);
//     }
//   };

//   const fetchSuggestions = useCallback(async () => {
//     if (!Post?._id) return;

//     try {
//       const id = Post._id;
//       const res = await api.get(`/user/posts/suggestions/${id}`);
//       setSuggestions(res.data.suggestion || []);
//     } catch (err) {
//       console.error("Failed to fetch suggestions:", err);
//     }
//   }, [Post?._id]);

//   useEffect(() => {
//     if (open === true && Post?._id) {
//       fetchSuggestions();
//     }
//   }, [open, fetchSuggestions]);

//   useEffect(() => {
//     setPost(post);
//   }, [post]);

//   const collabUsers = async () => {
//     try {
//       const id = post._id;
//       const res = await api.get(`/posts/collab-users/${id}`);
//       setCollaborators(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch collaborators:", err);
//     }
//   };

//   useEffect(() => {
//     if (open === "collab" && post._id) {
//       collabUsers();
//     }
//   }, [open, post._id]);

//   const handleLike = async (postId) => {
//     setIsLiking(true);
//     try {
//       const res = await api.patch(`/user/posts/like/${postId}`, {
//         userId,
//       });
//       setPost(res.data);

//       // Heart animation effect
//       setTimeout(() => setIsLiking(false), 800);
//     } catch (err) {
//       console.error("Failed to like post", err);
//       setIsLiking(false);
//     }
//   };

//   const onNotImpressed = async (postId) => {
//     setIsCollabbing(true);
//     try {
//       const res = await api.patch(`/user/posts/impression/${postId}`, {
//         userId,
//       });
//       setPost(res.data);
//       setTimeout(() => setIsCollabbing(false), 600);
//     } catch (err) {
//       console.error("Failed to update impression:", err);
//       setIsCollabbing(false);
//     }
//   };

//   const handleContentExpand = (e) => {
//     e.stopPropagation();
//     setIsContentExpanded(!isContentExpanded);
//   };

//   // Close options when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (showOptions && !event.target.closest(".options-menu")) {
//         setShowOptions(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [showOptions]);

//   function timeAgo(date) {
//     const seconds = Math.floor((new Date() - new Date(date)) / 1000);
//     const intervals = [
//       { label: "year", seconds: 31536000 },
//       { label: "month", seconds: 2592000 },
//       { label: "week", seconds: 604800 },
//       { label: "day", seconds: 86400 },
//       { label: "hour", seconds: 3600 },
//       { label: "minute", seconds: 60 },
//       { label: "second", seconds: 1 },
//     ];

//     for (let interval of intervals) {
//       const count = Math.floor(seconds / interval.seconds);
//       if (count >= 1) {
//         return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
//       }
//     }
//     return "just now";
//   }

//   if (!Post) return null;

//   return (
//     <div
//       ref={cardRef}
//       className={`lg:max-w-xl rounded-xl relative max-w-lg lg:pt-1 w-full transition-all duration-700 ease-out`}
//       onMouseEnter={() => setIsHovering(true)}
//       onMouseLeave={() => setIsHovering(false)}
//     >
//       <div
//         className={`relative ${
//           !dark ? "bg-white/95 text-black" : "bg-black/95 text-white"
//         } backdrop-blur-xl p-4 pt-2 pb-3 rounded-xl shadow-lg border transition-all duration-700 ease-out ${
//           isHovering
//             ? `shadow-2xl ${
//                 dark
//                   ? "shadow-white/10 border-blue-400/40"
//                   : "shadow-black/10 border-blue-400/40"
//               }`
//             : `shadow-md ${
//                 dark
//                   ? "border-gray-700/30 hover:border-gray-600/50"
//                   : "border-gray-200/30 hover:border-gray-300/50"
//               }`
//         } cursor-pointer overflow-hidden group`}
//         draggable="true"
//       >
//         {/* Elegant background gradient on hover */}
//         <div
//           className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none ${
//             dark
//               ? "from-blue-950/20 via-purple-950/20 to-pink-950/20"
//               : "from-blue-50/60 via-purple-50/60 to-pink-50/60"
//           }`}
//         />

//         {/* Header with enhanced animations */}
//         <div className="flex items-center w-full justify-between z-10 relative py-2">
//           <h1
//             className={`text-lg font-bold overflow-hidden text-ellipsis whitespace-nowrap flex-1 mr-4 transition-all duration-500 ${
//               isHovering
//                 ? "transform translate-x-1 text-blue-600 dark:text-blue-400"
//                 : ""
//             }`}
//           >
//             {Post.title}
//           </h1>

//           <div
//             className={`flex items-center justify-end gap-3 text-xs transition-all duration-500 ${
//               dark ? "text-gray-300" : "text-gray-600"
//             } ${isHovering ? "transform -translate-x-1" : ""}`}
//           >
//             <span className="transition-all duration-300 hover:scale-105 whitespace-nowrap">
//               {new Date(Post.createdAt).toLocaleDateString("en-US", {
//                 year: "numeric",
//                 month: "short",
//                 day: "numeric",
//               })}
//             </span>

//             <div className="relative options-menu">
//               <button
//                 className={`bg-transparent text-lg transition-all duration-300 hover:scale-125 active:scale-95 hover:rotate-90 p-1 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-800/50 ${
//                   !dark ? "text-gray-600" : "text-gray-300"
//                 }`}
//                 aria-label="Post Options"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setShowOptions((prev) => !prev);
//                 }}
//               >
//                 <svg
//                   viewBox="0 0 41.915 41.916"
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-4 h-4 fill-current transition-all duration-300"
//                 >
//                   <path d="M11.214,20.956c0,3.091-2.509,5.589-5.607,5.589C2.51,26.544,0,24.046,0,20.956c0-3.082,2.511-5.585,5.607-5.585C8.705,15.371,11.214,17.874,11.214,20.956z" />
//                   <path d="M26.564,20.956c0,3.091-2.509,5.589-5.606,5.589c-3.097,0-5.607-2.498-5.607-5.589c0-3.082,2.511-5.585,5.607-5.585C24.056,15.371,26.564,17.874,26.564,20.956z" />
//                   <path d="M41.915,20.956c0,3.091-2.509,5.589-5.607,5.589c-3.097,0-5.606-2.498-5.606-5.589c0-3.082,2.511-5.585,5.606-5.585C39.406,15.371,41.915,17.874,41.915,20.956z" />
//                 </svg>
//               </button>

//               {/* Enhanced dropdown */}
//               {showOptions && (
//                 <div className="absolute right-0 top-full mt-2 w-40 bg-white/95 dark:bg-black/95 backdrop-blur-xl shadow-2xl rounded-xl z-30 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-300 animate-in slide-in-from-top-2 fade-in">
//                   <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-all duration-200 hover:translate-x-1 text-gray-700 dark:text-gray-300 text-sm hover:font-medium flex items-center gap-2">
//                     <span>✏️</span> Edit Post
//                   </div>
//                   <div className="px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer transition-all duration-200 hover:translate-x-1 text-red-600 dark:text-red-400 text-sm hover:font-medium flex items-center gap-2">
//                     <span>🗑️</span> Delete
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* FIXED Content Section - Removed low opacity */}
//         <div className="relative overflow-hidden">
//           <div
//             ref={contentRef}
//             className={`transition-all duration-700 ease-out overflow-hidden ${
//               !isContentExpanded && showExpandButton ? "max-h-32" : "max-h-none"
//             }`}
//           >
//             {/* FIXED: Removed opacity issues, content now has full opacity */}
//             <p
//               className={`text-sm leading-relaxed whitespace-pre-wrap transition-colors duration-300 ${
//                 !isContentExpanded && showExpandButton ? "line-clamp-5" : ""
//               } ${dark ? "text-gray-100" : "text-gray-800"}`}
//             >
//               {Post.content}
//             </p>
//           </div>

//           {/* Enhanced gradient fade - only shows when collapsed */}
//           {isContentExpanded && showExpandButton && (
//             <div
//               className={`absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t pointer-events-none transition-all duration-500`}
//             />
//           )}

//           {/* Right-aligned read more button */}

//           {showExpandButton && (
//             <div className="flex justify-end mt-3">
//               <button
//                 onClick={handleContentExpand}
//                 className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all duration-500 transform hover:scale-105 focus:outline-none focus:scale-100 active:scale-95 ${
//                   dark
//                     ? "text-blue-400 hover:text-blue-300 bg-blue-900/20 hover:bg-blue-800/30 border border-blue-700/30 hover:border-blue-600/50"
//                     : "text-blue-600 hover:text-blue-700 bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200/60 hover:border-blue-300/80"
//                 } group relative overflow-hidden`}
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />

//                 <span className="relative z-10 flex items-center gap-2">
//                   {isContentExpanded ? (
//                     <>
//                       <ChevronUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
//                       Show less
//                     </>
//                   ) : (
//                     <>
//                       <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
//                       Read more
//                     </>
//                   )}
//                 </span>
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Enhanced Reading Time with better positioning */}
//         {showExpandButton && (
//           <div
//             className={`flex items-center justify-between text-xs mt-2 mb-3 transition-all duration-500 ${
//               dark ? "text-gray-400" : "text-gray-500"
//             }`}
//           >
//             <div className="flex items-center gap-2"></div>
//             {isContentExpanded && (
//               <span className="px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs animate-in fade-in duration-500 flex items-center gap-1">
//                 <Sparkles className="w-3 h-3" />
//                 Expanded
//               </span>
//             )}
//           </div>
//         )}

//         {/* Elegant Tags */}
//         {Post.tags && Post.tags.length > 0 && (
//           <div className="flex flex-wrap gap-2 mb-4">
//             {Post.tags.slice(0, 3).map((tag, idx) => (
//               <span
//                 key={idx}
//                 className={`px-3 py-1 text-xs rounded-full transition-all duration-500 hover:scale-110 cursor-pointer transform ${
//                   dark
//                     ? "bg-gradient-to-r from-gray-800/80 to-gray-700/80 text-gray-300 hover:from-gray-700 hover:to-gray-600 shadow-lg border border-gray-600/30"
//                     : "bg-gradient-to-r from-gray-100/80 to-gray-200/80 text-gray-700 hover:from-gray-200 hover:to-gray-300 shadow-md border border-gray-300/30"
//                 } hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm`}
//               >
//                 <span className="mr-1 opacity-70">#</span>
//                 {tag}
//               </span>
//             ))}
//             {Post.tags.length > 3 && (
//               <span
//                 className={`px-3 py-1 text-xs rounded-full transition-all duration-300 hover:scale-105 cursor-pointer ${
//                   dark
//                     ? "bg-gray-800/50 text-gray-400 border border-gray-600/20"
//                     : "bg-gray-100/70 text-gray-500 border border-gray-300/20"
//                 } backdrop-blur-sm`}
//               >
//                 +{Post.tags.length - 3} more
//               </span>
//             )}
//           </div>
//         )}

//         {/* Enhanced action buttons */}
//         <div className="flex items-center justify-between text-sm z-10 relative">
//           <div className="flex gap-5 text-md">
//             {/* Comments button */}
//             <button
//               className={`flex items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 group ${
//                 !dark ? "text-gray-700" : "text-gray-300"
//               } ${open ? "text-blue-500 scale-110" : "hover:text-blue-500"}`}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setOpen((pre) => !pre);
//               }}
//             >
//               <Lightbulb
//                 className={`w-5 h-5 transition-all duration-300 ${
//                   open ? "animate-pulse" : ""
//                 }`}
//               />
//               <span className="font-medium text-sm">
//                 {Post.comments?.length || 0}
//               </span>
//             </button>

//             {/* Enhanced like button */}
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleLike(Post._id);
//               }}
//               className={`flex focus:outline-none items-center gap-2 cursor-pointer transition-all duration-300 active:scale-95 group relative ${
//                 !dark ? "text-gray-700" : "text-gray-300"
//               } ${
//                 Post.likes?.includes(userId)
//                   ? "text-red-500"
//                   : "hover:text-red-500"
//               }`}
//               aria-label="Toggle Like"
//             >
//               <div className="relative">
//                 <svg
//                   className={`w-5 h-5 transition-all duration-500`}
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill={Post.likes?.includes(userId) ? "red" : "none"}
//                   stroke={
//                     Post.likes?.includes(userId)
//                       ? "red"
//                       : !dark
//                       ? "#374151"
//                       : "#D1D5DB"
//                   }
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
//                 </svg>
//               </div>
//               <span className="font-medium text-sm">
//                 {Post.likes?.length || 0}
//               </span>
//             </button>
//           </div>

//           {/* IMPROVED COLLAB/WITHDRAW BUTTON - Clean and Professional */}
//           <div className="flex items-center gap-0">
//             <button
//               onClick={(e) => onNotImpressed(Post._id)}
//               className={`${
//                 !dark ? "text-black" : "text-white"
//               } text-sm mr-2 border font-medium rounded-full px-4 py-1.5 transition-all duration-300 hover:scale-110 active:scale-95 transform hover:shadow-lg ${
//                 Post.impressions.includes(userId)
//                   ? "hover:bg-blue-50 text-blue-500 dark:hover:bg-blue-900/20 border-blue-300 hover:border-blue-500"
//                   : "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
//               }  ${
//                 dark
//                   ? "text-blue-600 hover:text-blue-700 bg-blue-90/20 hover:bg-blue-800/30 border border-blue-700/30 hover:border-blue-600/50"
//                   : "text-blue-600 hover:text-blue-700 bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200/60 hover:border-blue-300/80"
//               }`}
//             >
//               {Post.impressions.includes(userId) ? "✓ Withdraw" : "Collab"}
//             </button>

//             {/* Enhanced avatar stack */}
//             <div className="flex items-center -space-x-2">
//               {Array(Post.impressions.length < 4 ? Post.impressions.length : 3)
//                 .fill(0)
//                 .map((e, idx) => (
//                   <div
//                     key={idx}
//                     className="relative h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-sm font-bold border-2 border-white shadow-lg transition-all duration-300 hover:scale-125 hover:z-10 cursor-pointer transform hover:rotate-12"
//                     style={{
//                       animationDelay: `${idx * 100}ms`,
//                       zIndex: 3 - idx,
//                     }}
//                   >
//                     <img
//                       src={USER}
//                       alt=""
//                       className="w-6 h-6 rounded-full object-cover"
//                     />
//                     <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/10 to-transparent" />
//                   </div>
//                 ))}

//               <div className="relative h-8 w-8 rounded-full bg-gradient-to-br from-white to-gray-100 text-black transform flex items-center justify-center text-xs font-bold shadow-lg transition-all duration-300 hover:scale-125 cursor-pointer border-2 border-white hover:bg-gradient-to-br hover:from-blue-100 hover:to-purple-100">
//                 {Post.impressions.length}
//                 {isHovering && (
//                   <div className="absolute inset-0 rounded-full animate-ping bg-blue-400/30" />
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Enhanced comments section */}
//         {open && (
//           <div
//             className={`mt-4 mb-1 ${
//               dark ? "text-white" : "text-black"
//             } relative max-h-80 z-10 max-w-2xl transition-all duration-700 ease-out animate-in slide-in-from-top-4 fade-in`}
//           >
//             <div className="flex items-center gap-2 mb-4">
//               <h3 className="text-sm font-semibold text-blue-500 flex items-center gap-2">
//                 <Lightbulb className="w-4 h-4" />
//                 Suggestions
//               </h3>
//               <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
//             </div>

//             <div className="relative max-h-60 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-blue-500/30 scrollbar-track-transparent">
//               {!Post.comments?.length ? (
//                 <div
//                   className={`text-center py-8 ${
//                     dark ? "text-gray-400" : "text-gray-500"
//                   }`}
//                 >
//                   <MessageSquareDot className="w-12 h-12 mx-auto mb-3 opacity-50" />
//                   <p className="text-sm">
//                     No suggestions yet. Be the first to share your thoughts!
//                   </p>
//                 </div>
//               ) : (
//                 suggestions.length > 0 &&
//                 suggestions.map((e, index) => {
//                   const commentId = e._id;
//                   const isHidden = hiddenComments.has(commentId);

//                   return (
//                     <div
//                       key={commentId}
//                       className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-500 hover:bg-black/5 dark:hover:bg-white/5 ${
//                         dark ? "text-white" : "text-black"
//                       } group animate-in slide-in-from-left-2 fade-in`}
//                       style={{ animationDelay: `${index * 100}ms` }}
//                     >
//                       {e.photo ? (
//                         <img
//                           src={e.photo}
//                           alt={e.name}
//                           className="w-9 h-9 rounded-full object-cover border-2 border-gray-300 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:border-blue-400 active:scale-95"
//                         />
//                       ) : (
//                         <div className="w-9 h-9 mt-1 cursor-pointer transition-all duration-300 hover:scale-110 hover:text-blue-600 active:scale-95 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
//                           <User className="w-5 h-5" />
//                         </div>
//                       )}

//                       <div className="flex-1">
//                         <div className="flex justify-between items-center mb-1">
//                           <button
//                             onClick={() => toggleCommentVisibility(commentId)}
//                             className="text-sm font-medium hover:text-blue-500 transition-colors duration-200 flex items-center gap-2"
//                           >
//                             {e.name}
//                             {isHidden ? (
//                               <EyeOff className="w-3 h-3" />
//                             ) : (
//                               <Eye className="w-3 h-3" />
//                             )}
//                           </button>
//                           <p className="text-xs text-gray-500">
//                             {timeAgo(e.createdAt)}
//                           </p>
//                         </div>

//                         <div
//                           className={`transition-all duration-700 ease-out overflow-hidden ${
//                             isHidden
//                               ? "max-h-0 opacity-0 transform scale-y-0 -translate-y-2"
//                               : "max-h-96 opacity-100 transform scale-y-100 translate-y-0"
//                           }`}
//                         >
//                           <p className="text-sm leading-relaxed whitespace-pre-wrap bg-gray-50/50 dark:bg-gray-800/30 rounded-lg p-3 border border-gray-200/20 dark:border-gray-700/20">
//                             {e.comment}
//                           </p>
//                         </div>

//                         {isHidden && (
//                           <p className="text-xs text-gray-400 italic animate-pulse mt-2 flex items-center gap-1">
//                             <EyeOff className="w-3 h-3" />
//                             Comment hidden • Click to show
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })
//               )}
//             </div>

//             {/* Enhanced comment form */}
//             <form
//               onSubmit={handleCommentSubmit}
//               className={`mt-6 ${
//                 !dark ? "bg-white/95" : "bg-black/95"
//               } backdrop-blur-xl rounded-2xl border border-gray-200/30 dark:border-gray-700/30 p-4 shadow-xl transition-all duration-500 hover:shadow-2xl transform hover:scale-[1.01]`}
//             >
//               <div className="flex items-center gap-4">
//                 {user?.photo ? (
//                   <img
//                     src={user.photo}
//                     alt={user.name}
//                     className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200/50 dark:ring-gray-700/50 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:ring-4 hover:ring-blue-400/30 cursor-pointer"
//                   />
//                 ) : (
//                   <div className="w-10 h-10 rounded-full border-2 border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center ring-2 ring-gray-200/50 dark:ring-gray-700/50 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:ring-4 hover:ring-blue-400/30 cursor-pointer bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
//                     <User
//                       className={`w-5 h-5 ${
//                         dark ? "text-white" : "text-black"
//                       }`}
//                     />
//                   </div>
//                 )}

//                 <input
//                   type="text"
//                   value={newComment}
//                   onChange={(e) => setNewComment(e.target.value)}
//                   placeholder="Share your brilliant suggestion..."
//                   className={`flex-1 px-4 py-3 text-sm bg-transparent rounded-xl border border-gray-200/30 dark:border-gray-700/30 ${
//                     !dark ? "text-gray-800" : "text-white"
//                   } placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20 transition-all duration-500 focus:scale-[1.02] focus:shadow-lg backdrop-blur-sm`}
//                   required
//                 />

//                 <button
//                   type="submit"
//                   disabled={!newComment.trim() || isCommenting}
//                   className={`px-6 py-3 text-sm font-semibold text-white rounded-xl transition-all duration-500 transform hover:scale-110 active:scale-95 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:hover:scale-100 relative overflow-hidden group ${
//                     isCommenting
//                       ? "bg-green-500 hover:bg-green-600"
//                       : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
//                   }`}
//                 >
//                   {/* Shimmer effect */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-out" />

//                   <span className="relative z-10 flex items-center gap-2">
//                     {isCommenting ? (
//                       <>
//                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         Posting...
//                       </>
//                     ) : (
//                       <>
//                         <svg
//                           className="w-4 h-4"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//                           />
//                         </svg>
//                         Post
//                       </>
//                     )}
//                   </span>
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>

//       {/* Custom styles */}
//       <style jsx>{`
//         .scrollbar-thin::-webkit-scrollbar {
//           width: 4px;
//         }

//         .scrollbar-thin::-webkit-scrollbar-track {
//           background: transparent;
//         }

//         .scrollbar-thin::-webkit-scrollbar-thumb {
//           background: rgba(59, 130, 246, 0.3);
//           border-radius: 2px;
//         }

//         .scrollbar-thin::-webkit-scrollbar-thumb:hover {
//           background: rgba(59, 130, 246, 0.5);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Card;

// import { useCallback, useEffect, useState, useRef } from "react";
// import api from "../utils/api1";
// import bulb from "../assets/bulb2.png";
// import USER from "../assets/user.png";
// import useAuthStore from "../store/authStore";
// import useThemeStore from "../store/themeStore";
// import {
//   Heart,
//   Lightbulb,
//   MessageSquareDot,
//   User,
//   User2,
//   UserRoundCheck,
//   ChevronDown,
//   ChevronUp,
//   Clock,
//   Eye,
//   EyeOff,
//   Sparkles,
// } from "lucide-react";

// const Card = ({ post }) => {
//   const user = useAuthStore((s) => s.user);
//   const dark = useThemeStore((s) => s.dark);
//   const [Post, setPost] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [showOptions, setShowOptions] = useState(false);
//   const [collaborators, setCollaborators] = useState([]);
//   const [suggestions, setSuggestions] = useState([]);
//   const [newComment, setNewComment] = useState("");

//   // Enhanced animation states
//   const [isContentExpanded, setIsContentExpanded] = useState(false);
//   const [showExpandButton, setShowExpandButton] = useState(false);
//   const [isHovering, setIsHovering] = useState(false);
//   const [isLiking, setIsLiking] = useState(false);
//   const [isCommenting, setIsCommenting] = useState(false);
//   const [isCollabbing, setIsCollabbing] = useState(false);

//   // Refs for smooth animations
//   const contentRef = useRef(null);
//   const cardRef = useRef(null);

//   const userId = user?.id || user?._id;
//   const [hiddenComments, setHiddenComments] = useState(new Set());

//   const toggleCommentVisibility = (commentId) => {
//     setHiddenComments((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(commentId)) {
//         newSet.delete(commentId);
//       } else {
//         newSet.add(commentId);
//       }
//       return newSet;
//     });
//   };

//   // Enhanced content expansion logic with better height calculation
//   useEffect(() => {
//     if (Post?.content && contentRef.current) {
//       const element = contentRef.current;

//       // Create a temporary element to measure content properly
//       const temp = document.createElement("div");
//       temp.style.cssText = `
//         position: absolute;
//         visibility: hidden;
//         font-size: ${window.getComputedStyle(element).fontSize};
//         font-family: ${window.getComputedStyle(element).fontFamily};
//         line-height: ${window.getComputedStyle(element).lineHeight};
//         width: ${element.offsetWidth}px;
//         word-break: break-word;
//         white-space: pre-wrap;
//       `;
//       temp.textContent = Post.content;
//       document.body.appendChild(temp);

//       const fullHeight = temp.scrollHeight;
//       const lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
//       const maxLines = 5;
//       const collapsedHeight = lineHeight * maxLines;

//       document.body.removeChild(temp);

//       const needsExpansion =
//         fullHeight > collapsedHeight || Post.content.length > 350;
//       setShowExpandButton(needsExpansion);
//     }
//   }, [Post?.content]);

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     if (!newComment.trim()) return;

//     setIsCommenting(true);

//     const postId = Post._id;
//     const commentData = {
//       userId: userId,
//       content: newComment,
//     };

//     try {
//       const res = await api.post(
//         `user/posts/suggestions/${postId}`,
//         commentData
//       );
//       setSuggestions(res.data.suggestions || []);
//       setPost(res.data.post);
//       setNewComment("");

//       // Success animation
//       setTimeout(() => setIsCommenting(false), 800);
//     } catch (err) {
//       console.error("Failed to add comment:", err);
//       setIsCommenting(false);
//     }
//   };

//   const fetchSuggestions = useCallback(async () => {
//     if (!Post?._id) return;

//     try {
//       const id = Post._id;
//       const res = await api.get(`/user/posts/suggestions/${id}`);
//       setSuggestions(res.data.suggestion || []);
//     } catch (err) {
//       console.error("Failed to fetch suggestions:", err);
//     }
//   }, [Post?._id]);

//   useEffect(() => {
//     if (open === true && Post?._id) {
//       fetchSuggestions();
//     }
//   }, [open, fetchSuggestions]);

//   useEffect(() => {
//     setPost(post);
//   }, [post]);

//   const collabUsers = async () => {
//     try {
//       const id = post._id;
//       const res = await api.get(`/posts/collab-users/${id}`);
//       setCollaborators(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch collaborators:", err);
//     }
//   };

//   useEffect(() => {
//     if (open === "collab" && post._id) {
//       collabUsers();
//     }
//   }, [open, post._id]);

//   const handleLike = async (postId) => {
//     setIsLiking(true);
//     try {
//       const res = await api.patch(`/user/posts/like/${postId}`, {
//         userId,
//       });
//       setPost(res.data);

//       // Heart animation effect
//       setTimeout(() => setIsLiking(false), 800);
//     } catch (err) {
//       console.error("Failed to like post", err);
//       setIsLiking(false);
//     }
//   };

//   const onNotImpressed = async (postId) => {
//     setIsCollabbing(true);
//     try {
//       const res = await api.patch(`/user/posts/impression/${postId}`, {
//         userId,
//       });
//       setPost(res.data);
//       setTimeout(() => setIsCollabbing(false), 600);
//     } catch (err) {
//       console.error("Failed to update impression:", err);
//       setIsCollabbing(false);
//     }
//   };

//   const handleContentExpand = (e) => {
//     e.stopPropagation();
//     setIsContentExpanded(!isContentExpanded);
//   };

//   // Close options when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (showOptions && !event.target.closest(".options-menu")) {
//         setShowOptions(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [showOptions]);

//   function timeAgo(date) {
//     const seconds = Math.floor((new Date() - new Date(date)) / 1000);
//     const intervals = [
//       { label: "year", seconds: 31536000 },
//       { label: "month", seconds: 2592000 },
//       { label: "week", seconds: 604800 },
//       { label: "day", seconds: 86400 },
//       { label: "hour", seconds: 3600 },
//       { label: "minute", seconds: 60 },
//       { label: "second", seconds: 1 },
//     ];

//     for (let interval of intervals) {
//       const count = Math.floor(seconds / interval.seconds);
//       if (count >= 1) {
//         return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
//       }
//     }
//     return "just now";
//   }

//   if (!Post) return null;

//   return (
//     <div
//       ref={cardRef}
//       className={`lg:max-w-xl rounded-xl relative max-w-lg lg:pt-1 w-full transition-all duration-700 ease-out`}
//       onMouseEnter={() => setIsHovering(true)}
//       onMouseLeave={() => setIsHovering(false)}
//     >
//       <div
//         className={`relative ${
//           !dark ? "bg-white/95 text-black" : "bg-black/95 text-white"
//         } backdrop-blur-xl p-4 pt-2 pb-3 rounded-xl shadow-lg border transition-all duration-700 ease-out ${
//           isHovering
//             ? `shadow-2xl ${
//                 dark
//                   ? "shadow-white/10 border-blue-400/40"
//                   : "shadow-black/10 border-blue-400/40"
//               }`
//             : `shadow-md ${
//                 dark
//                   ? "border-gray-700/30 hover:border-gray-600/50"
//                   : "border-gray-200/30 hover:border-gray-300/50"
//               }`
//         } cursor-pointer overflow-hidden group`}
//         draggable="true"
//       >
//         {/* Elegant background gradient on hover */}
//         <div
//           className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none ${
//             dark
//               ? "from-blue-950/20 via-purple-950/20 to-pink-950/20"
//               : "from-blue-50/60 via-purple-50/60 to-pink-50/60"
//           }`}
//         />

//         {/* Header with enhanced animations */}
//         <div className="flex items-center w-full justify-between z-10 relative py-2">
//           <h1
//             className={`text-lg font-bold overflow-hidden text-ellipsis whitespace-nowrap flex-1 mr-4 transition-all duration-500 ${
//               isHovering
//                 ? "transform translate-x-1 text-blue-600 dark:text-blue-400"
//                 : ""
//             }`}
//           >
//             {Post.title}
//           </h1>

//           <div
//             className={`flex items-center justify-end gap-3 text-xs transition-all duration-500 ${
//               dark ? "text-gray-300" : "text-gray-600"
//             } ${isHovering ? "transform -translate-x-1" : ""}`}
//           >
//             <span className="transition-all duration-300 hover:scale-105 whitespace-nowrap">
//               {new Date(Post.createdAt).toLocaleDateString("en-US", {
//                 year: "numeric",
//                 month: "short",
//                 day: "numeric",
//               })}
//             </span>

//             <div className="relative options-menu">
//               <button
//                 className={`bg-transparent text-lg transition-all duration-300 hover:scale-125 active:scale-95 hover:rotate-90 p-1 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-800/50 ${
//                   !dark ? "text-gray-600" : "text-gray-300"
//                 }`}
//                 aria-label="Post Options"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setShowOptions((prev) => !prev);
//                 }}
//               >
//                 <svg
//                   viewBox="0 0 41.915 41.916"
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-4 h-4 fill-current transition-all duration-300"
//                 >
//                   <path d="M11.214,20.956c0,3.091-2.509,5.589-5.607,5.589C2.51,26.544,0,24.046,0,20.956c0-3.082,2.511-5.585,5.607-5.585C8.705,15.371,11.214,17.874,11.214,20.956z" />
//                   <path d="M26.564,20.956c0,3.091-2.509,5.589-5.606,5.589c-3.097,0-5.607-2.498-5.607-5.589c0-3.082,2.511-5.585,5.607-5.585C24.056,15.371,26.564,17.874,26.564,20.956z" />
//                   <path d="M41.915,20.956c0,3.091-2.509,5.589-5.607,5.589c-3.097,0-5.606-2.498-5.606-5.589c0-3.082,2.511-5.585,5.606-5.585C39.406,15.371,41.915,17.874,41.915,20.956z" />
//                 </svg>
//               </button>

//               {/* Enhanced dropdown */}
//               {showOptions && (
//                 <div className="absolute right-0 top-full mt-2 w-40 bg-white/95 dark:bg-black/95 backdrop-blur-xl shadow-2xl rounded-xl z-30 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-300 animate-in slide-in-from-top-2 fade-in">
//                   <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-all duration-200 hover:translate-x-1 text-gray-700 dark:text-gray-300 text-sm hover:font-medium flex items-center gap-2">
//                     <span>✏️</span> Edit Post
//                   </div>
//                   <div className="px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer transition-all duration-200 hover:translate-x-1 text-red-600 dark:text-red-400 text-sm hover:font-medium flex items-center gap-2">
//                     <span>🗑️</span> Delete
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* FIXED Content Section - Removed low opacity */}
//         <div className="relative overflow-hidden">
//           <div
//             ref={contentRef}
//             className={`transition-all duration-700 ease-out overflow-hidden ${
//               !isContentExpanded && showExpandButton ? "max-h-32" : "max-h-none"
//             }`}
//           >
//             {/* FIXED: Removed opacity issues, content now has full opacity */}
//             <p
//               className={`text-sm leading-relaxed whitespace-pre-wrap transition-colors duration-300 ${
//                 !isContentExpanded && showExpandButton ? "line-clamp-5" : ""
//               } ${dark ? "text-gray-100" : "text-gray-800"}`}
//             >
//               {Post.content}
//             </p>
//           </div>

//           {/* Enhanced gradient fade - only shows when collapsed */}
//           {!isContentExpanded && showExpandButton && (
//             <div
//               className={`absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t pointer-events-none transition-all duration-500 ${
//                 dark
//                   ? "from-black/95 via-black/80 to-transparent"
//                   : "from-white/95 via-white/80 to-transparent"
//               }`}
//             />
//           )}
//         </div>

//         {/* OPTIMIZED: Tags and Read More Button on the same horizontal row */}
//         {((Post.tags && Post.tags.length > 0) || showExpandButton) && (
//           <div className="flex items-center justify-between gap-3 mt-3 mb-4">
//             {/* Tags Section - Left Side */}
//             {Post.tags && Post.tags.length > 0 && (
//               <div className="flex flex-wrap gap-2 flex-1 min-w-0">
//                 {Post.tags.slice(0, 3).map((tag, idx) => (
//                   <span
//                     key={idx}
//                     className={`px-3 py-1 text-xs rounded-full transition-all duration-500 hover:scale-110 cursor-pointer transform ${
//                       dark
//                         ? "bg-gradient-to-r from-gray-800/80 to-gray-700/80 text-gray-300 hover:from-gray-700 hover:to-gray-600 shadow-lg border border-gray-600/30"
//                         : "bg-gradient-to-r from-gray-100/80 to-gray-200/80 text-gray-700 hover:from-gray-200 hover:to-gray-300 shadow-md border border-gray-300/30"
//                     } hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm`}
//                   >
//                     <span className="mr-1 opacity-70">#</span>
//                     {tag}
//                   </span>
//                 ))}
//                 {Post.tags.length > 3 && (
//                   <span
//                     className={`px-3 py-1 text-xs rounded-full transition-all duration-300 hover:scale-105 cursor-pointer ${
//                       dark
//                         ? "bg-gray-800/50 text-gray-400 border border-gray-600/20"
//                         : "bg-gray-100/70 text-gray-500 border border-gray-300/20"
//                     } backdrop-blur-sm`}
//                   >
//                     +{Post.tags.length - 3} more
//                   </span>
//                 )}
//               </div>
//             )}

//             {/* Read More Button - Right Side */}
//             {showExpandButton && (
//               <div className="flex-shrink-0">
//                 <button
//                   onClick={handleContentExpand}
//                   className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all duration-500 transform hover:scale-105 focus:outline-none focus:scale-100 active:scale-95 ${
//                     dark
//                       ? "text-blue-400 hover:text-blue-300 bg-blue-900/20 hover:bg-blue-800/30 border border-blue-700/30 hover:border-blue-600/50"
//                       : "text-blue-600 hover:text-blue-700 bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200/60 hover:border-blue-300/80"
//                   } group relative overflow-hidden`}
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />

//                   <span className="relative z-10 flex items-center gap-2">
//                     {isContentExpanded ? (
//                       <>
//                         <ChevronUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
//                         Show less
//                       </>
//                     ) : (
//                       <>
//                         <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
//                         Read more
//                       </>
//                     )}
//                   </span>
//                 </button>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Enhanced Reading Time with better positioning - Only show when expanded */}
//         {showExpandButton && isContentExpanded && (
//           <div
//             className={`flex items-center justify-end text-xs mb-3 transition-all duration-500 ${
//               dark ? "text-gray-400" : "text-gray-500"
//             }`}
//           >
//             <span className="px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs animate-in fade-in duration-500 flex items-center gap-1">
//               <Sparkles className="w-3 h-3" />
//               Expanded
//             </span>
//           </div>
//         )}

//         {/* Enhanced action buttons */}
//         <div className="flex items-center justify-between text-sm z-10 relative">
//           <div className="flex gap-5 text-md">
//             {/* Comments button */}
//             <button
//               className={`flex items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 group ${
//                 !dark ? "text-gray-700" : "text-gray-300"
//               } ${open ? "text-blue-500 scale-110" : "hover:text-blue-500"}`}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setOpen((pre) => !pre);
//               }}
//             >
//               <Lightbulb
//                 className={`w-5 h-5 transition-all duration-300 ${
//                   open ? "animate-pulse" : ""
//                 }`}
//               />
//               <span className="font-medium text-sm">
//                 {Post.comments?.length || 0}
//               </span>
//             </button>

//             {/* Enhanced like button */}
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleLike(Post._id);
//               }}
//               className={`flex focus:outline-none items-center gap-2 cursor-pointer transition-all duration-300 active:scale-95 group relative ${
//                 !dark ? "text-gray-700" : "text-gray-300"
//               } ${
//                 Post.likes?.includes(userId)
//                   ? "text-red-500"
//                   : "hover:text-red-500"
//               }`}
//               aria-label="Toggle Like"
//             >
//               <div className="relative">
//                 <svg
//                   className={`w-5 h-5 transition-all duration-500`}
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill={Post.likes?.includes(userId) ? "red" : "none"}
//                   stroke={
//                     Post.likes?.includes(userId)
//                       ? "red"
//                       : !dark
//                       ? "#374151"
//                       : "#D1D5DB"
//                   }
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
//                 </svg>
//               </div>
//               <span className="font-medium text-sm">
//                 {Post.likes?.length || 0}
//               </span>
//             </button>
//           </div>

//           {/* IMPROVED COLLAB/WITHDRAW BUTTON - Clean and Professional */}
//           <div className="flex items-center gap-0">
//             <button
//               onClick={(e) => onNotImpressed(Post._id)}
//               className={`${
//                 !dark ? "text-black" : "text-white"
//               } text-sm mr-2 border font-medium rounded-full px-4 py-1.5 transition-all duration-300 hover:scale-110 active:scale-95 transform hover:shadow-lg ${
//                 Post.impressions.includes(userId)
//                   ? "hover:bg-blue-50 text-blue-500 dark:hover:bg-blue-900/20 border-blue-300 hover:border-blue-500"
//                   : "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
//               }  ${
//                 dark
//                   ? "text-blue-600 hover:text-blue-700 bg-blue-90/20 hover:bg-blue-800/30 border border-blue-700/30 hover:border-blue-600/50"
//                   : "text-blue-600 hover:text-blue-700 bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200/60 hover:border-blue-300/80"
//               }`}
//             >
//               {Post.impressions.includes(userId) ? "✓ Withdraw" : "Collab"}
//             </button>

//             {/* Enhanced avatar stack */}
//             <div className="flex items-center -space-x-2">
//               {Array(Post.impressions.length < 4 ? Post.impressions.length : 3)
//                 .fill(0)
//                 .map((e, idx) => (
//                   <div
//                     key={idx}
//                     className="relative h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-sm font-bold border-2 border-white shadow-lg transition-all duration-300 hover:scale-125 hover:z-10 cursor-pointer transform hover:rotate-12"
//                     style={{
//                       animationDelay: `${idx * 100}ms`,
//                       zIndex: 3 - idx,
//                     }}
//                   >
//                     <img
//                       src={USER}
//                       alt=""
//                       className="w-6 h-6 rounded-full object-cover"
//                     />
//                     <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/10 to-transparent" />
//                   </div>
//                 ))}

//               <div className="relative h-8 w-8 rounded-full bg-gradient-to-br from-white to-gray-100 text-black transform flex items-center justify-center text-xs font-bold shadow-lg transition-all duration-300 hover:scale-125 cursor-pointer border-2 border-white hover:bg-gradient-to-br hover:from-blue-100 hover:to-purple-100">
//                 {Post.impressions.length}
//                 {isHovering && (
//                   <div className="absolute inset-0 rounded-full animate-ping bg-blue-400/30" />
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Enhanced comments section */}
//         {open && (
//           <div
//             className={`mt-4 mb-1 ${
//               dark ? "text-white" : "text-black"
//             } relative max-h-80 z-10 max-w-2xl transition-all duration-700 ease-out animate-in slide-in-from-top-4 fade-in`}
//           >
//             <div className="flex items-center gap-2 mb-4">
//               <h3 className="text-sm font-semibold text-blue-500 flex items-center gap-2">
//                 <Lightbulb className="w-4 h-4" />
//                 Suggestions
//               </h3>
//               <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
//             </div>

//             <div className="relative max-h-60 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-blue-500/30 scrollbar-track-transparent">
//               {!Post.comments?.length ? (
//                 <div
//                   className={`text-center py-8 ${
//                     dark ? "text-gray-400" : "text-gray-500"
//                   }`}
//                 >
//                   <MessageSquareDot className="w-12 h-12 mx-auto mb-3 opacity-50" />
//                   <p className="text-sm">
//                     No suggestions yet. Be the first to share your thoughts!
//                   </p>
//                 </div>
//               ) : (
//                 suggestions.length > 0 &&
//                 suggestions.map((e, index) => {
//                   const commentId = e._id;
//                   const isHidden = hiddenComments.has(commentId);

//                   return (
//                     <div
//                       key={commentId}
//                       className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-500 hover:bg-black/5 dark:hover:bg-white/5 ${
//                         dark ? "text-white" : "text-black"
//                       } group animate-in slide-in-from-left-2 fade-in`}
//                       style={{ animationDelay: `${index * 100}ms` }}
//                     >
//                       {e.photo ? (
//                         <img
//                           src={e.photo}
//                           alt={e.name}
//                           className="w-9 h-9 rounded-full object-cover border-2 border-gray-300 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:border-blue-400 active:scale-95"
//                         />
//                       ) : (
//                         <div className="w-9 h-9 mt-1 cursor-pointer transition-all duration-300 hover:scale-110 hover:text-blue-600 active:scale-95 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
//                           <User className="w-5 h-5" />
//                         </div>
//                       )}

//                       <div className="flex-1">
//                         <div className="flex justify-between items-center mb-1">
//                           <button
//                             onClick={() => toggleCommentVisibility(commentId)}
//                             className="text-sm font-medium hover:text-blue-500 transition-colors duration-200 flex items-center gap-2"
//                           >
//                             {e.name}
//                             {isHidden ? (
//                               <EyeOff className="w-3 h-3" />
//                             ) : (
//                               <Eye className="w-3 h-3" />
//                             )}
//                           </button>
//                           <p className="text-xs text-gray-500">
//                             {timeAgo(e.createdAt)}
//                           </p>
//                         </div>

//                         <div
//                           className={`transition-all duration-700 ease-out overflow-hidden ${
//                             isHidden
//                               ? "max-h-0 opacity-0 transform scale-y-0 -translate-y-2"
//                               : "max-h-96 opacity-100 transform scale-y-100 translate-y-0"
//                           }`}
//                         >
//                           <p className="text-sm leading-relaxed whitespace-pre-wrap bg-gray-50/50 dark:bg-gray-800/30 rounded-lg p-3 border border-gray-200/20 dark:border-gray-700/20">
//                             {e.comment}
//                           </p>
//                         </div>

//                         {isHidden && (
//                           <p className="text-xs text-gray-400 italic animate-pulse mt-2 flex items-center gap-1">
//                             <EyeOff className="w-3 h-3" />
//                             Comment hidden • Click to show
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })
//               )}
//             </div>

//             {/* Enhanced comment form */}
//             <form
//               onSubmit={handleCommentSubmit}
//               className={`mt-6 ${
//                 !dark ? "bg-white/95" : "bg-black/95"
//               } backdrop-blur-xl rounded-2xl border border-gray-200/30 dark:border-gray-700/30 p-4 shadow-xl transition-all duration-500 hover:shadow-2xl transform hover:scale-[1.01]`}
//             >
//               <div className="flex items-center gap-4">
//                 {user?.photo ? (
//                   <img
//                     src={user.photo}
//                     alt={user.name}
//                     className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200/50 dark:ring-gray-700/50 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:ring-4 hover:ring-blue-400/30 cursor-pointer"
//                   />
//                 ) : (
//                   <div className="w-10 h-10 rounded-full border-2 border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center ring-2 ring-gray-200/50 dark:ring-gray-700/50 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:ring-4 hover:ring-blue-400/30 cursor-pointer bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
//                     <User
//                       className={`w-5 h-5 ${
//                         dark ? "text-white" : "text-black"
//                       }`}
//                     />
//                   </div>
//                 )}

//                 <input
//                   type="text"
//                   value={newComment}
//                   onChange={(e) => setNewComment(e.target.value)}
//                   placeholder="Share your brilliant suggestion..."
//                   className={`flex-1 px-4 py-3 text-sm bg-transparent rounded-xl border border-gray-200/30 dark:border-gray-700/30 ${
//                     !dark ? "text-gray-800" : "text-white"
//                   } placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20 transition-all duration-500 focus:scale-[1.02] focus:shadow-lg backdrop-blur-sm`}
//                   required
//                 />

//                 <button
//                   type="submit"
//                   disabled={!newComment.trim() || isCommenting}
//                   className={`px-6 py-3 text-sm font-semibold text-white rounded-xl transition-all duration-500 transform hover:scale-110 active:scale-95 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:hover:scale-100 relative overflow-hidden group ${
//                     isCommenting
//                       ? "bg-green-500 hover:bg-green-600"
//                       : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
//                   }`}
//                 >
//                   {/* Shimmer effect */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-out" />

//                   <span className="relative z-10 flex items-center gap-2">
//                     {isCommenting ? (
//                       <>
//                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         Posting...
//                       </>
//                     ) : (
//                       <>
//                         <svg
//                           className="w-4 h-4"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//                           />
//                         </svg>
//                         Post
//                       </>
//                     )}
//                   </span>
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>

//       {/* Custom styles */}
//       <style jsx>{`
//         .scrollbar-thin::-webkit-scrollbar {
//           width: 4px;
//         }

//         .scrollbar-thin::-webkit-scrollbar-track {
//           background: transparent;
//         }

//         .scrollbar-thin::-webkit-scrollbar-thumb {
//           background: rgba(59, 130, 246, 0.3);
//           border-radius: 2px;
//         }

//         .scrollbar-thin::-webkit-scrollbar-thumb:hover {
//           background: rgba(59, 130, 246, 0.5);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Card;

// import { useCallback, useEffect, useState, useRef } from "react";
// import api from "../utils/api1";
// import bulb from "../assets/bulb2.png";
// import USER from "../assets/user.png";
// import useAuthStore from "../store/authStore";
// import useThemeStore from "../store/themeStore";
// import {
//   Heart,
//   Lightbulb,
//   MessageSquareDot,
//   User,
//   User2,
//   UserRoundCheck,
//   ChevronDown,
//   ChevronUp,
//   Clock,
//   Eye,
//   EyeOff,
//   Sparkles,
// } from "lucide-react";

// const Card = ({ post }) => {
//   const user = useAuthStore((s) => s.user);
//   const dark = useThemeStore((s) => s.dark);
//   const [Post, setPost] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [showOptions, setShowOptions] = useState(false);
//   const [collaborators, setCollaborators] = useState([]);
//   const [suggestions, setSuggestions] = useState([]);
//   const [newComment, setNewComment] = useState("");

//   // Enhanced animation states
//   const [isContentExpanded, setIsContentExpanded] = useState(false);
//   const [showExpandButton, setShowExpandButton] = useState(false);
//   const [isHovering, setIsHovering] = useState(false);
//   const [isLiking, setIsLiking] = useState(false);
//   const [isCommenting, setIsCommenting] = useState(false);
//   const [isCollabbing, setIsCollabbing] = useState(false);

//   // Refs for smooth animations
//   const contentRef = useRef(null);
//   const cardRef = useRef(null);

//   const userId = user?.id || user?._id;
//   const [hiddenComments, setHiddenComments] = useState(new Set());

//   const toggleCommentVisibility = (commentId) => {
//     setHiddenComments((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(commentId)) {
//         newSet.delete(commentId);
//       } else {
//         newSet.add(commentId);
//       }
//       return newSet;
//     });
//   };

//   // Enhanced content expansion logic with better height calculation
//   useEffect(() => {
//     if (Post?.content && contentRef.current) {
//       const element = contentRef.current;

//       // Create a temporary element to measure content properly
//       const temp = document.createElement("div");
//       temp.style.cssText = `
//         position: absolute;
//         visibility: hidden;
//         font-size: ${window.getComputedStyle(element).fontSize};
//         font-family: ${window.getComputedStyle(element).fontFamily};
//         line-height: ${window.getComputedStyle(element).lineHeight};
//         width: ${element.offsetWidth}px;
//         word-break: break-word;
//         white-space: pre-wrap;
//       `;
//       temp.textContent = Post.content;
//       document.body.appendChild(temp);

//       const fullHeight = temp.scrollHeight;
//       const lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
//       const maxLines = 5;
//       const collapsedHeight = lineHeight * maxLines;

//       document.body.removeChild(temp);

//       const needsExpansion =
//         fullHeight > collapsedHeight || Post.content.length > 350;
//       setShowExpandButton(needsExpansion);
//     }
//   }, [Post?.content]);

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     if (!newComment.trim()) return;

//     setIsCommenting(true);

//     const postId = Post._id;
//     const commentData = {
//       userId: userId,
//       content: newComment,
//     };

//     try {
//       const res = await api.post(
//         `user/posts/suggestions/${postId}`,
//         commentData
//       );
//       setSuggestions(res.data.suggestions || []);
//       setPost(res.data.post);
//       setNewComment("");

//       // Success animation
//       setTimeout(() => setIsCommenting(false), 800);
//     } catch (err) {
//       console.error("Failed to add comment:", err);
//       setIsCommenting(false);
//     }
//   };

//   const fetchSuggestions = useCallback(async () => {
//     if (!Post?._id) return;

//     try {
//       const id = Post._id;
//       const res = await api.get(`/user/posts/suggestions/${id}`);
//       setSuggestions(res.data.suggestion || []);
//     } catch (err) {
//       console.error("Failed to fetch suggestions:", err);
//     }
//   }, [Post?._id]);

//   useEffect(() => {
//     if (open === true && Post?._id) {
//       fetchSuggestions();
//     }
//   }, [open, fetchSuggestions]);

//   useEffect(() => {
//     setPost(post);
//   }, [post]);

//   const collabUsers = async () => {
//     try {
//       const id = post._id;
//       const res = await api.get(`/posts/collab-users/${id}`);
//       setCollaborators(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch collaborators:", err);
//     }
//   };

//   useEffect(() => {
//     if (open === "collab" && post._id) {
//       collabUsers();
//     }
//   }, [open, post._id]);

//   const handleLike = async (postId) => {
//     setIsLiking(true);
//     try {
//       const res = await api.patch(`/user/posts/like/${postId}`, {
//         userId,
//       });
//       setPost(res.data);

//       // Heart animation effect
//       setTimeout(() => setIsLiking(false), 800);
//     } catch (err) {
//       console.error("Failed to like post", err);
//       setIsLiking(false);
//     }
//   };

//   const onNotImpressed = async (postId) => {
//     setIsCollabbing(true);
//     try {
//       const res = await api.patch(`/user/posts/impression/${postId}`, {
//         userId,
//       });
//       setPost(res.data);
//       setTimeout(() => setIsCollabbing(false), 600);
//     } catch (err) {
//       console.error("Failed to update impression:", err);
//       setIsCollabbing(false);
//     }
//   };

//   const handleContentExpand = (e) => {
//     e.stopPropagation();
//     setIsContentExpanded(!isContentExpanded);
//   };

//   // Close options when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (showOptions && !event.target.closest(".options-menu")) {
//         setShowOptions(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [showOptions]);

//   function timeAgo(date) {
//     const seconds = Math.floor((new Date() - new Date(date)) / 1000);
//     const intervals = [
//       { label: "year", seconds: 31536000 },
//       { label: "month", seconds: 2592000 },
//       { label: "week", seconds: 604800 },
//       { label: "day", seconds: 86400 },
//       { label: "hour", seconds: 3600 },
//       { label: "minute", seconds: 60 },
//       { label: "second", seconds: 1 },
//     ];

//     for (let interval of intervals) {
//       const count = Math.floor(seconds / interval.seconds);
//       if (count >= 1) {
//         return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
//       }
//     }
//     return "just now";
//   }

//   if (!Post) return null;

//   return (
//     <div
//       ref={cardRef}
//       className={`lg:max-w-xl rounded-xl relative max-w-lg lg:pt-1 w-full transition-all duration-700 ease-out`}
//       onMouseEnter={() => setIsHovering(true)}
//       onMouseLeave={() => setIsHovering(false)}
//     >
//       <div
//         className={`relative ${
//           !dark ? "bg-white/95 text-black" : "bg-black/95 text-white"
//         } backdrop-blur-xl p-4 pt-2 pb-3 rounded-xl shadow-lg border transition-all duration-700 ease-out ${
//           isHovering
//             ? `shadow-2xl ${
//                 dark
//                   ? "shadow-white/10 border-blue-400/40"
//                   : "shadow-black/10 border-blue-400/40"
//               }`
//             : `shadow-md ${
//                 dark
//                   ? "border-gray-700/30 hover:border-gray-600/50"
//                   : "border-gray-200/30 hover:border-gray-300/50"
//               }`
//         } cursor-pointer overflow-hidden group`}
//         draggable="true"
//       >
//         {/* Elegant background gradient on hover */}
//         <div
//           className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none ${
//             dark
//               ? "from-blue-950/20 via-purple-950/20 to-pink-950/20"
//               : "from-blue-50/60 via-purple-50/60 to-pink-50/60"
//           }`}
//         />

//         {/* Header with enhanced animations */}
//         <div className="flex items-center w-full justify-between z-10 relative py-2">
//           <h1
//             className={`text-lg font-bold overflow-hidden text-ellipsis whitespace-nowrap flex-1 mr-4 transition-all duration-500 ${
//               isHovering
//                 ? "transform translate-x-1 text-blue-600 dark:text-blue-400"
//                 : ""
//             }`}
//           >
//             {Post.title}
//           </h1>

//           <div
//             className={`flex items-center justify-end gap-3 text-xs transition-all duration-500 ${
//               dark ? "text-gray-300" : "text-gray-600"
//             } ${isHovering ? "transform -translate-x-1" : ""}`}
//           >
//             <span className="transition-all duration-300 hover:scale-105 whitespace-nowrap">
//               {new Date(Post.createdAt).toLocaleDateString("en-US", {
//                 year: "numeric",
//                 month: "short",
//                 day: "numeric",
//               })}
//             </span>

//             <div className="relative options-menu">
//               <button
//                 className={`bg-transparent text-lg transition-all duration-300 hover:scale-125 active:scale-95 hover:rotate-90 p-1 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-800/50 ${
//                   !dark ? "text-gray-600" : "text-gray-300"
//                 }`}
//                 aria-label="Post Options"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setShowOptions((prev) => !prev);
//                 }}
//               >
//                 <svg
//                   viewBox="0 0 41.915 41.916"
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-4 h-4 fill-current transition-all duration-300"
//                 >
//                   <path d="M11.214,20.956c0,3.091-2.509,5.589-5.607,5.589C2.51,26.544,0,24.046,0,20.956c0-3.082,2.511-5.585,5.607-5.585C8.705,15.371,11.214,17.874,11.214,20.956z" />
//                   <path d="M26.564,20.956c0,3.091-2.509,5.589-5.606,5.589c-3.097,0-5.607-2.498-5.607-5.589c0-3.082,2.511-5.585,5.607-5.585C24.056,15.371,26.564,17.874,26.564,20.956z" />
//                   <path d="M41.915,20.956c0,3.091-2.509,5.589-5.607,5.589c-3.097,0-5.606-2.498-5.606-5.589c0-3.082,2.511-5.585,5.606-5.585C39.406,15.371,41.915,17.874,41.915,20.956z" />
//                 </svg>
//               </button>

//               {/* Enhanced dropdown */}
//               {showOptions && (
//                 <div className="absolute right-0 top-full mt-2 w-40 bg-white/95 dark:bg-black/95 backdrop-blur-xl shadow-2xl rounded-xl z-30 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-300 animate-in slide-in-from-top-2 fade-in">
//                   <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-all duration-200 hover:translate-x-1 text-gray-700 dark:text-gray-300 text-sm hover:font-medium flex items-center gap-2">
//                     <span>✏️</span> Edit Post
//                   </div>
//                   <div className="px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer transition-all duration-200 hover:translate-x-1 text-red-600 dark:text-red-400 text-sm hover:font-medium flex items-center gap-2">
//                     <span>🗑️</span> Delete
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* FIXED Content Section - Removed low opacity */}
//         <div className="relative overflow-hidden">
//           <div
//             ref={contentRef}
//             className={`transition-all duration-700 ease-out overflow-hidden ${
//               !isContentExpanded && showExpandButton ? "max-h-32" : "max-h-none"
//             }`}
//           >
//             {/* FIXED: Removed opacity issues, content now has full opacity */}
//             <p
//               className={`text-sm leading-relaxed whitespace-pre-wrap transition-colors duration-300 ${
//                 !isContentExpanded && showExpandButton ? "line-clamp-5" : ""
//               } ${dark ? "text-gray-100" : "text-gray-800"}`}
//             >
//               {Post.content}
//             </p>
//           </div>

//           {/* Enhanced gradient fade - only shows when collapsed */}
//           {!isContentExpanded && showExpandButton && (
//             <div
//               className={`absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t pointer-events-none transition-all duration-500 ${
//                 dark
//                   ? "from-black/95 via-black/80 to-transparent"
//                   : "from-white/95 via-white/80 to-transparent"
//               }`}
//             />
//           )}
//         </div>

//         {/* ELEGANT: Tags and Compact Read More Button on the same horizontal row */}
//         {((Post.tags && Post.tags.length > 0) || showExpandButton) && (
//           <div className="flex items-center justify-between gap-3 mt-3 mb-4">
//             {/* Tags Section - Left Side */}
//             {Post.tags && Post.tags.length > 0 && (
//               <div className="flex flex-wrap gap-2 flex-1 min-w-0">
//                 {Post.tags.slice(0, 3).map((tag, idx) => (
//                   <span
//                     key={idx}
//                     className={`px-3 py-1 text-xs rounded-full transition-all duration-500 hover:scale-110 cursor-pointer transform ${
//                       dark
//                         ? "bg-gradient-to-r from-gray-800/80 to-gray-700/80 text-gray-300 hover:from-gray-700 hover:to-gray-600 shadow-lg border border-gray-600/30"
//                         : "bg-gradient-to-r from-gray-100/80 to-gray-200/80 text-gray-700 hover:from-gray-200 hover:to-gray-300 shadow-md border border-gray-300/30"
//                     } hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm`}
//                   >
//                     <span className="mr-1 opacity-70">#</span>
//                     {tag}
//                   </span>
//                 ))}
//                 {Post.tags.length > 3 && (
//                   <span
//                     className={`px-3 py-1 text-xs rounded-full transition-all duration-300 hover:scale-105 cursor-pointer ${
//                       dark
//                         ? "bg-gray-800/50 text-gray-400 border border-gray-600/20"
//                         : "bg-gray-100/70 text-gray-500 border border-gray-300/20"
//                     } backdrop-blur-sm`}
//                   >
//                     +{Post.tags.length - 3} more
//                   </span>
//                 )}
//               </div>
//             )}

//             {/* Enhanced Reading Time with better positioning - Only show when expanded */}
//             {showExpandButton && isContentExpanded && (
//               <div
//                 className={`flex items-center justify-end text-xs transition-all duration-500 ${
//                   dark ? "text-gray-400" : "text-gray-500"
//                 }`}
//               >
//                 <span className="px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs animate-in fade-in duration-500 flex items-center gap-1">
//                   <Sparkles className="w-3 h-3" />
//                   Expanded
//                 </span>
//               </div>
//             )}

//             {/* Elegant, minimal Read more/Show less button */}
//             {showExpandButton && (
//               <div className="relative group flex-shrink-0">
//                 <button
//                   onClick={handleContentExpand}
//                   title={isContentExpanded ? "Show less" : "Read more"}
//                   aria-label={isContentExpanded ? "Show less" : "Read more"}
//                   className={`flex items-center justify-center w-8 h-8 rounded-sm transition-all duration-1000 hover:shadow-md backdrop-blur-sm`}
//                   style={{ minWidth: "2rem", minHeight: "2rem" }}
//                   type="button"
//                 >
//                   {isContentExpanded ? (
//                     <ChevronUp className="w-4 h-4 animate-bounce transition-transform hover:scale-110" />
//                   ) : (
//                     <ChevronDown className="w-4 h-4 animate-bounce transition-transform hover:scale-110" />
//                   )}
//                   <span className="sr-only">
//                     {isContentExpanded ? "Show less" : "Read more"}
//                   </span>
//                 </button>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Enhanced action buttons */}
//         <div className="flex items-center justify-between text-sm z-10 relative">
//           <div className="flex gap-5 text-md">
//             {/* Comments button */}
//             <button
//               className={`flex items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 group ${
//                 !dark ? "text-gray-700" : "text-gray-300"
//               } ${open ? "text-blue-500 scale-110" : "hover:text-blue-500"}`}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setOpen((pre) => !pre);
//               }}
//             >
//               <Lightbulb
//                 className={`w-5 h-5 transition-all duration-300 ${
//                   open ? "animate-pulse" : ""
//                 }`}
//               />
//               <span className="font-medium text-sm">
//                 {Post.comments?.length || 0}
//               </span>
//             </button>

//             {/* Enhanced like button */}
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleLike(Post._id);
//               }}
//               className={`flex focus:outline-none items-center gap-2 cursor-pointer transition-all duration-300 active:scale-95 group relative ${
//                 !dark ? "text-gray-700" : "text-gray-300"
//               } ${
//                 Post.likes?.includes(userId)
//                   ? "text-red-500"
//                   : "hover:text-red-500"
//               }`}
//               aria-label="Toggle Like"
//             >
//               <div className="relative">
//                 <svg
//                   className={`w-5 h-5 transition-all duration-500`}
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill={Post.likes?.includes(userId) ? "red" : "none"}
//                   stroke={
//                     Post.likes?.includes(userId)
//                       ? "red"
//                       : !dark
//                       ? "#374151"
//                       : "#D1D5DB"
//                   }
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
//                 </svg>
//               </div>
//               <span className="font-medium text-sm">
//                 {Post.likes?.length || 0}
//               </span>
//             </button>
//           </div>

//           {/* IMPROVED COLLAB/WITHDRAW BUTTON - Clean and Professional */}
//           <div className="flex items-center gap-0">
//             <button
//               onClick={(e) => onNotImpressed(Post._id)}
//               className={`${
//                 !dark ? "text-black" : "text-white"
//               } text-sm mr-2 border font-medium rounded-full px-4 py-1.5 transition-all duration-300 hover:scale-110 active:scale-95 transform hover:shadow-lg ${
//                 Post.impressions.includes(userId)
//                   ? "hover:bg-blue-50 text-blue-500 dark:hover:bg-blue-900/20 border-blue-300 hover:border-blue-500"
//                   : "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
//               }  ${
//                 dark
//                   ? "text-blue-600 hover:text-blue-700 bg-blue-90/20 hover:bg-blue-800/30 border border-blue-700/30 hover:border-blue-600/50"
//                   : "text-blue-600 hover:text-blue-700 bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200/60 hover:border-blue-300/80"
//               }`}
//             >
//               {Post.impressions.includes(userId) ? "✓ Withdraw" : "Collab"}
//             </button>

//             {/* Enhanced avatar stack */}
//             <div className="flex items-center -space-x-2">
//               {Array(Post.impressions.length < 4 ? Post.impressions.length : 3)
//                 .fill(0)
//                 .map((e, idx) => (
//                   <div
//                     key={idx}
//                     className="relative h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-sm font-bold border-2 border-white shadow-lg transition-all duration-300 hover:scale-125 hover:z-10 cursor-pointer transform hover:rotate-12"
//                     style={{
//                       animationDelay: `${idx * 100}ms`,
//                       zIndex: 3 - idx,
//                     }}
//                   >
//                     <img
//                       src={USER}
//                       alt=""
//                       className="w-6 h-6 rounded-full object-cover"
//                     />
//                     <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/10 to-transparent" />
//                   </div>
//                 ))}

//               <div className="relative h-8 w-8 rounded-full bg-gradient-to-br from-white to-gray-100 text-black transform flex items-center justify-center text-xs font-bold shadow-lg transition-all duration-300 hover:scale-125 cursor-pointer border-2 border-white hover:bg-gradient-to-br hover:from-blue-100 hover:to-purple-100">
//                 {Post.impressions.length}
//                 {isHovering && (
//                   <div className="absolute inset-0 rounded-full animate-ping bg-blue-400/30" />
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Enhanced comments section */}
//         {open && (
//           <div
//             className={`mt-4 mb-1 ${
//               dark ? "text-white" : "text-black"
//             } relative max-h-80 z-10 max-w-2xl transition-all duration-700 ease-out animate-in slide-in-from-top-4 fade-in`}
//           >
//             <div className="flex items-center gap-2 mb-4">
//               <h3 className="text-sm font-semibold text-blue-500 flex items-center gap-2">
//                 <Lightbulb className="w-4 h-4" />
//                 Suggestions
//               </h3>
//               <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
//             </div>

//             {/* Ultra-minimal comments list */}
//             <div className="space-y-4">
//               {!Post.comments?.length ? (
//                 <div className="text-center py-12 text-gray-400">
//                   <p className="text-sm">No comments</p>
//                 </div>
//               ) : (
//                 suggestions.map((comment) => (
//                   <div key={comment._id} className="flex gap-3">
//                     <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2 mb-1">
//                         <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
//                           {comment.name}
//                         </span>
//                         <span className="text-xs text-gray-400">
//                           {timeAgo(comment.createdAt)}
//                         </span>
//                       </div>
//                       <p className="text-sm text-gray-600 dark:text-gray-300">
//                         {comment.comment}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>

//             {/* Ultra-minimal form */}
//             <form onSubmit={handleCommentSubmit} className="mt-6">
//               <div className="flex gap-3">
//                 <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 mt-1" />
//                 <div className="flex-1">
//                   <input
//                     type="text"
//                     value={newComment}
//                     onChange={(e) => setNewComment(e.target.value)}
//                     placeholder="Add a comment..."
//                     className="w-full px-0 py-2 text-sm bg-transparent border-0 border-b border-gray-200 dark:border-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-400"
//                     required
//                   />
//                   <button
//                     type="submit"
//                     disabled={!newComment.trim() || isCommenting}
//                     className="mt-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 disabled:opacity-50"
//                   >
//                     {isCommenting ? "Posting..." : "Post comment"}
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>

//       {/* Custom styles */}
//       <style jsx>{`
//         .scrollbar-thin::-webkit-scrollbar {
//           width: 4px;
//         }

//         .scrollbar-thin::-webkit-scrollbar-track {
//           background: transparent;
//         }

//         .scrollbar-thin::-webkit-scrollbar-thumb {
//           background: rgba(59, 130, 246, 0.3);
//           border-radius: 2px;
//         }

//         .scrollbar-thin::-webkit-scrollbar-thumb:hover {
//           background: rgba(59, 130, 246, 0.5);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Card;

import { useCallback, useEffect, useState, useRef } from "react";
import api from "../utils/api1";
import bulb from "../assets/bulb2.png";
import USER from "../assets/user.png";
import useAuthStore from "../store/authStore";
import useThemeStore from "../store/themeStore";
import {
  Heart,
  Lightbulb,
  MessageSquareDot,
  User,
  User2,
  UserRoundCheck,
  ChevronDown,
  ChevronUp,
  Clock,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";

const Card = ({ post }) => {
  const user = useAuthStore((s) => s.user);
  const dark = useThemeStore((s) => s.dark);
  const [Post, setPost] = useState(null);
  const [open, setOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  // Enhanced animation states
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [isCollabbing, setIsCollabbing] = useState(false);

  // Refs for smooth animations
  const contentRef = useRef(null);
  const cardRef = useRef(null);
  const commentInputRef = useRef(null);

  const userId = user?.id || user?._id;
  const [hiddenComments, setHiddenComments] = useState(new Set());

  const toggleCommentVisibility = (commentId) => {
    setHiddenComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  // Enhanced content expansion logic with better height calculation
  useEffect(() => {
    if (Post?.content && contentRef.current) {
      const element = contentRef.current;
      // Create a temporary element to measure content properly
      const temp = document.createElement("div");
      temp.style.cssText = `
        position: absolute;
        visibility: hidden;
        font-size: ${window.getComputedStyle(element).fontSize};
        font-family: ${window.getComputedStyle(element).fontFamily};
        line-height: ${window.getComputedStyle(element).lineHeight};
        width: ${element.offsetWidth}px;
        word-break: break-word;
        white-space: pre-wrap;
      `;
      temp.textContent = Post.content;
      document.body.appendChild(temp);

      const fullHeight = temp.scrollHeight;
      const lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
      const maxLines = 5;
      const collapsedHeight = lineHeight * maxLines;

      document.body.removeChild(temp);

      const needsExpansion =
        fullHeight > collapsedHeight || Post.content.length > 350;
      setShowExpandButton(needsExpansion);
    }
  }, [Post?.content]);

  // FIXED: Improved comment submission with proper state management
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || isCommenting) return;

    setIsCommenting(true);
    const postId = Post._id;
    const commentData = {
      userId: userId,
      content: newComment.trim(),
    };

    try {
      const res = await api.post(
        `user/posts/suggestions/${postId}`,
        commentData
      );

      // FIXED: Update both suggestions and post state properly
      if (res.data.suggestions) {
        setSuggestions(res.data.suggestions);
      }
      if (res.data.post) {
        setPost(res.data.post);
      }

      // FIXED: Clear input only after successful submission
      setNewComment("");

      // Keep focus on input for better UX
      setTimeout(() => {
        if (commentInputRef.current) {
          commentInputRef.current.focus();
        }
      }, 100);
    } catch (err) {
      console.error("Failed to add comment:", err);
      // Don't clear input on error
    } finally {
      // FIXED: Always reset loading state
      setIsCommenting(false);
    }
  };

  // FIXED: Improved fetchSuggestions with better error handling
  const fetchSuggestions = useCallback(async () => {
    if (!Post?._id) return;

    setIsLoadingComments(true);
    try {
      const id = Post._id;
      const res = await api.get(`/user/posts/suggestions/${id}`);
      // FIXED: Handle different response structures
      setSuggestions(res.data.suggestion || res.data.suggestions || []);
    } catch (err) {
      console.error("Failed to fetch suggestions:", err);
      setSuggestions([]); // Set empty array on error
    } finally {
      setIsLoadingComments(false);
    }
  }, [Post?._id]);

  // FIXED: Only fetch when opening comments section
  useEffect(() => {
    if (open === true && Post?._id && !suggestions.length) {
      fetchSuggestions();
    }
  }, [open, fetchSuggestions, Post?._id, suggestions.length]);

  // FIXED: Initialize post state properly
  useEffect(() => {
    if (post) {
      setPost(post);
      // Reset suggestions when post changes
      setSuggestions([]);
    }
  }, [post]);

  const collabUsers = async () => {
    try {
      const id = Post._id;
      const res = await api.get(`/posts/collab-users/${id}`);
      setCollaborators(res.data || []);
    } catch (err) {
      console.error("Failed to fetch collaborators:", err);
    }
  };

  useEffect(() => {
    if (open === "collab" && Post?._id) {
      collabUsers();
    }
  }, [open, Post?._id]);

  const handleLike = async (postId) => {
    if (isLiking) return; // Prevent double clicks

    setIsLiking(true);
    try {
      const res = await api.patch(`/user/posts/like/${postId}`, {
        userId,
      });
      setPost(res.data);
    } catch (err) {
      console.error("Failed to like post", err);
    } finally {
      setTimeout(() => setIsLiking(false), 800);
    }
  };

  const onNotImpressed = async (postId) => {
    if (isCollabbing) return; // Prevent double clicks

    setIsCollabbing(true);
    try {
      const res = await api.patch(`/user/posts/impression/${postId}`, {
        userId,
      });
      setPost(res.data);
    } catch (err) {
      console.error("Failed to update impression:", err);
    } finally {
      setTimeout(() => setIsCollabbing(false), 600);
    }
  };

  const handleContentExpand = (e) => {
    e.stopPropagation();
    setIsContentExpanded(!isContentExpanded);
  };

  // Close options when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showOptions && !event.target.closest(".options-menu")) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showOptions]);

  function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "week", seconds: 604800 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    for (let interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
      }
    }
    return "just now";
  }

  if (!Post) return null;

  return (
    <div
      ref={cardRef}
      className={`lg:max-w-xl rounded-xl relative max-w-lg lg:pt-1 w-full transition-all duration-700 ease-out`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className={`relative ${
          !dark ? "bg-white/95 text-black" : "bg-black/95 text-white"
        } backdrop-blur-xl p-4 pt-2 pb-3 rounded-xl shadow-lg border transition-all duration-700 ease-out ${
          isHovering
            ? `shadow-2xl ${
                dark
                  ? "shadow-white/10 border-blue-400/40"
                  : "shadow-black/10 border-blue-400/40"
              }`
            : `shadow-md ${
                dark
                  ? "border-gray-700/30 hover:border-gray-600/50"
                  : "border-gray-200/30 hover:border-gray-300/50"
              }`
        } cursor-pointer overflow-hidden group`}
        draggable="true"
      >
        {/* Elegant background gradient on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none ${
            dark
              ? "from-blue-950/20 via-purple-950/20 to-pink-950/20"
              : "from-blue-50/60 via-purple-50/60 to-pink-50/60"
          }`}
        />

        {/* Header with enhanced animations */}
        <div className="flex items-center w-full justify-between z-10 relative py-2">
          <h1
            className={`text-lg font-bold overflow-hidden text-ellipsis whitespace-nowrap flex-1 mr-4 transition-all duration-500 ${
              isHovering
                ? "transform translate-x-1 text-blue-600 dark:text-blue-400"
                : ""
            }`}
          >
            {Post.title}
          </h1>
          <div
            className={`flex items-center justify-end gap-3 text-xs transition-all duration-500 ${
              dark ? "text-gray-300" : "text-gray-600"
            } ${isHovering ? "transform -translate-x-1" : ""}`}
          >
            <span className="transition-all duration-300 hover:scale-105 whitespace-nowrap">
              {new Date(Post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <div className="relative options-menu">
              <button
                className={`bg-transparent text-lg transition-all duration-300 hover:scale-125 active:scale-95 hover:rotate-90 p-1 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-800/50 ${
                  !dark ? "text-gray-600" : "text-gray-300"
                }`}
                aria-label="Post Options"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowOptions((prev) => !prev);
                }}
              >
                <svg
                  viewBox="0 0 41.915 41.916"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 fill-current transition-all duration-300"
                >
                  <path d="M11.214,20.956c0,3.091-2.509,5.589-5.607,5.589C2.51,26.544,0,24.046,0,20.956c0-3.082,2.511-5.585,5.607-5.585C8.705,15.371,11.214,17.874,11.214,20.956z" />
                  <path d="M26.564,20.956c0,3.091-2.509,5.589-5.606,5.589c-3.097,0-5.607-2.498-5.607-5.589c0-3.082,2.511-5.585,5.607-5.585C24.056,15.371,26.564,17.874,26.564,20.956z" />
                  <path d="M41.915,20.956c0,3.091-2.509,5.589-5.607,5.589c-3.097,0-5.606-2.498-5.606-5.589c0-3.082,2.511-5.585,5.606-5.585C39.406,15.371,41.915,17.874,41.915,20.956z" />
                </svg>
              </button>
              {/* Enhanced dropdown */}
              {showOptions && (
                <div className="absolute right-0 top-full mt-2 w-40 bg-white/95 dark:bg-black/95 backdrop-blur-xl shadow-2xl rounded-xl z-30 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-300 animate-in slide-in-from-top-2 fade-in">
                  <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-all duration-200 hover:translate-x-1 text-gray-700 dark:text-gray-300 text-sm hover:font-medium flex items-center gap-2">
                    <span>✏️</span> Edit Post
                  </div>
                  <div className="px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer transition-all duration-200 hover:translate-x-1 text-red-600 dark:text-red-400 text-sm hover:font-medium flex items-center gap-2">
                    <span>🗑️</span> Delete
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FIXED Content Section - Removed low opacity */}
        <div className="relative overflow-hidden">
          <div
            ref={contentRef}
            className={`transition-all duration-700 ease-out overflow-hidden ${
              !isContentExpanded && showExpandButton ? "max-h-32" : "max-h-none"
            }`}
          >
            {/* FIXED: Removed opacity issues, content now has full opacity */}
            <p
              className={`text-sm leading-relaxed whitespace-pre-wrap transition-colors duration-300 ${
                !isContentExpanded && showExpandButton ? "line-clamp-5" : ""
              } ${dark ? "text-gray-100" : "text-gray-800"}`}
            >
              {Post.content}
            </p>
          </div>
          {/* Enhanced gradient fade - only shows when collapsed */}
          {!isContentExpanded && showExpandButton && (
            <div
              className={`absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t pointer-events-none transition-all duration-500 ${
                dark
                  ? "from-black/95 via-black/80 to-transparent"
                  : "from-white/95 via-white/80 to-transparent"
              }`}
            />
          )}
        </div>

        {/* ELEGANT: Tags and Compact Read More Button on the same horizontal row */}
        {((Post.tags && Post.tags.length > 0) || showExpandButton) && (
          <div className="flex items-center justify-between gap-3 mt-3 mb-4">
            {/* Tags Section - Left Side */}
            {Post.tags && Post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 flex-1 min-w-0">
                {Post.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 text-xs rounded-full transition-all duration-500 hover:scale-110 cursor-pointer transform ${
                      dark
                        ? "bg-gradient-to-r from-gray-800/80 to-gray-700/80 text-gray-300 hover:from-gray-700 hover:to-gray-600 shadow-lg border border-gray-600/30"
                        : "bg-gradient-to-r from-gray-100/80 to-gray-200/80 text-gray-700 hover:from-gray-200 hover:to-gray-300 shadow-md border border-gray-300/30"
                    } hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm`}
                  >
                    <span className="mr-1 opacity-70">#</span>
                    {tag}
                  </span>
                ))}
                {Post.tags.length > 3 && (
                  <span
                    className={`px-3 py-1 text-xs rounded-full transition-all duration-300 hover:scale-105 cursor-pointer ${
                      dark
                        ? "bg-gray-800/50 text-gray-400 border border-gray-600/20"
                        : "bg-gray-100/70 text-gray-500 border border-gray-300/20"
                    } backdrop-blur-sm`}
                  >
                    +{Post.tags.length - 3} more
                  </span>
                )}
              </div>
            )}
            {/* Enhanced Reading Time with better positioning - Only show when expanded */}
            {showExpandButton && isContentExpanded && (
              <div
                className={`flex items-center justify-end text-xs transition-all duration-500 ${
                  dark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <span className="px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs animate-in fade-in duration-500 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Expanded
                </span>
              </div>
            )}
            {/* Elegant, minimal Read more/Show less button */}
            {showExpandButton && (
              <div className="relative group flex-shrink-0">
                <button
                  onClick={handleContentExpand}
                  title={isContentExpanded ? "Show less" : "Read more"}
                  aria-label={isContentExpanded ? "Show less" : "Read more"}
                  className={`flex items-center justify-center w-8 h-8 rounded-sm transition-all duration-1000 hover:shadow-md backdrop-blur-sm`}
                  style={{ minWidth: "2rem", minHeight: "2rem" }}
                  type="button"
                >
                  {isContentExpanded ? (
                    <ChevronUp className="w-4 h-4 animate-bounce transition-transform hover:scale-110" />
                  ) : (
                    <ChevronDown className="w-4 h-4 animate-bounce transition-transform hover:scale-110" />
                  )}
                  <span className="sr-only">
                    {isContentExpanded ? "Show less" : "Read more"}
                  </span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Enhanced action buttons */}
        <div className="flex items-center justify-between text-sm z-10 relative">
          <div className="flex gap-5 text-md">
            {/* Comments button */}
            <button
              className={`flex items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 group ${
                !dark ? "text-gray-700" : "text-gray-300"
              } ${open ? "text-blue-500 scale-110" : "hover:text-blue-500"}`}
              onClick={(e) => {
                e.stopPropagation();
                setOpen((pre) => !pre);
              }}
            >
              <Lightbulb
                className={`w-5 h-5 transition-all duration-300 ${
                  open ? "animate-pulse" : ""
                }`}
              />
              <span className="font-medium text-sm">
                {suggestions.length || Post.comments?.length || 0}
              </span>
            </button>
            {/* Enhanced like button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLike(Post._id);
              }}
              disabled={isLiking}
              className={`flex focus:outline-none items-center gap-2 cursor-pointer transition-all duration-300 active:scale-95 group relative disabled:opacity-50 ${
                !dark ? "text-gray-700" : "text-gray-300"
              } ${
                Post.likes?.includes(userId)
                  ? "text-red-500"
                  : "hover:text-red-500"
              }`}
              aria-label="Toggle Like"
            >
              <div className="relative">
                <svg
                  className={`w-5 h-5 transition-all duration-500 ${
                    isLiking ? "animate-pulse" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={Post.likes?.includes(userId) ? "red" : "none"}
                  stroke={
                    Post.likes?.includes(userId)
                      ? "red"
                      : !dark
                      ? "#374151"
                      : "#D1D5DB"
                  }
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                </svg>
              </div>
              <span className="font-medium text-sm">
                {Post.likes?.length || 0}
              </span>
            </button>
          </div>
          {/* IMPROVED COLLAB/WITHDRAW BUTTON - Clean and Professional */}
          <div className="flex items-center gap-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNotImpressed(Post._id);
              }}
              disabled={isCollabbing}
              className={`${
                !dark ? "text-black" : "text-white"
              } text-sm mr-2 border font-medium rounded-full px-4 py-1.5 transition-all duration-300 hover:scale-110 active:scale-95 transform hover:shadow-lg disabled:opacity-50 ${
                Post.impressions.includes(userId)
                  ? "hover:bg-blue-50 text-blue-500 dark:hover:bg-blue-900/20 border-blue-300 hover:border-blue-500"
                  : "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
              }  ${
                dark
                  ? "text-blue-600 hover:text-blue-700 bg-blue-90/20 hover:bg-blue-800/30 border border-blue-700/30 hover:border-blue-600/50"
                  : "text-blue-600 hover:text-blue-700 bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200/60 hover:border-blue-300/80"
              }`}
            >
              {isCollabbing
                ? "Processing..."
                : Post.impressions.includes(userId)
                ? "✓ Withdraw"
                : "Collab"}
            </button>
            {/* Enhanced avatar stack */}
            <div className="flex items-center -space-x-2">
              {Array(Post.impressions.length < 4 ? Post.impressions.length : 3)
                .fill(0)
                .map((e, idx) => (
                  <div
                    key={idx}
                    className="relative h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-sm font-bold border-2 border-white shadow-lg transition-all duration-300 hover:scale-125 hover:z-10 cursor-pointer transform hover:rotate-12"
                    style={{
                      animationDelay: `${idx * 100}ms`,
                      zIndex: 3 - idx,
                    }}
                  >
                    <img
                      src={USER}
                      alt=""
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/10 to-transparent" />
                  </div>
                ))}
              <div className="relative h-8 w-8 rounded-full bg-gradient-to-br from-white to-gray-100 text-black transform flex items-center justify-center text-xs font-bold shadow-lg transition-all duration-300 hover:scale-125 cursor-pointer border-2 border-white hover:bg-gradient-to-br hover:from-blue-100 hover:to-purple-100">
                {Post.impressions.length}
                {isHovering && (
                  <div className="absolute inset-0 rounded-full animate-ping bg-blue-400/30" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* FIXED: Enhanced comments section with perfect theme matching */}
        {open && (
          <div
            className={`mt-4 mb-1 ${
              dark ? "text-white" : "text-black"
            } relative z-10 max-w-2xl transition-all duration-700 ease-out animate-in slide-in-from-top-4 fade-in`}
          >
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-sm font-semibold text-blue-500 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Suggestions ({suggestions.length})
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
            </div>

            {/* FIXED: Improved form with perfect theme matching */}
            <form
              onSubmit={handleCommentSubmit}
              className={`mb-4 sticky top-0 z-10 pb-2 ${
                dark ? "bg-black/95" : "bg-white/95"
              } backdrop-blur-sm`}
            >
              <div className="flex gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex-shrink-0 mt-1 ${
                    dark ? "bg-gray-700" : "bg-gray-200"
                  }`}
                />
                <div className="flex-1">
                  <input
                    ref={commentInputRef}
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a suggestion..."
                    className={`w-full px-0 py-2 text-sm bg-transparent border-0 border-b transition-all duration-200 focus:outline-none ${
                      dark
                        ? "border-gray-700 text-white placeholder-gray-500 focus:border-blue-400"
                        : "border-gray-200 text-black placeholder-gray-400 focus:border-blue-400"
                    }`}
                    disabled={isCommenting}
                    maxLength={280}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <button
                      type="submit"
                      disabled={!newComment.trim() || isCommenting}
                      className="text-sm px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                      {isCommenting ? "Posting..." : "Post comment"}
                    </button>
                    <span
                      className={`text-xs ${
                        dark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {newComment.length}/280
                    </span>
                  </div>
                </div>
              </div>
            </form>

            {/* FIXED: Perfectly themed scrollable comments list */}
            <div
              className={`space-y-4 overflow-y-auto scrollbar-thin ${
                suggestions.length > 3 ? "max-h-64" : "max-h-fit"
              } pr-2`}
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: dark
                  ? "#4B5563 transparent"
                  : "#D1D5DB transparent",
              }}
            >
              {isLoadingComments ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                </div>
              ) : !suggestions.length ? (
                <div
                  className={`text-center py-8 ${
                    dark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <Lightbulb className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No suggestions yet</p>
                  <p className="text-xs mt-1">
                    Be the first to share your thoughts!
                  </p>
                </div>
              ) : (
                <>
                  {suggestions.map((comment, index) => (
                    <div
                      key={comment._id || index}
                      className={`flex gap-3 animate-in slide-in-from-left duration-300 py-2 border-b last:border-b-0 transition-all duration-200 hover:bg-opacity-50 rounded-lg hover:px-2 hover:-mx-2 ${
                        dark
                          ? "border-gray-800 hover:bg-gray-800/30"
                          : "border-gray-100 hover:bg-gray-50/50"
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0 flex items-center justify-center">
                        <img
                          src={USER}
                          alt=""
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-sm font-medium truncate ${
                              dark ? "text-gray-100" : "text-gray-900"
                            }`}
                          >
                            {comment.name || comment.userName || "Anonymous"}
                          </span>
                          <span
                            className={`text-xs flex-shrink-0 ${
                              dark ? "text-gray-500" : "text-gray-400"
                            }`}
                          >
                            {timeAgo(comment.createdAt)}
                          </span>
                        </div>
                        <p
                          className={`text-sm break-words leading-relaxed ${
                            dark ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {comment.comment || comment.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced custom styles with perfect theme support */}
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: ${dark
            ? "rgba(75, 85, 99, 0.5)"
            : "rgba(209, 213, 219, 0.5)"};
          border-radius: 2px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: ${dark
            ? "rgba(75, 85, 99, 0.8)"
            : "rgba(209, 213, 219, 0.8)"};
        }

        @keyframes slide-in-from-left {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-in {
          animation-fill-mode: both;
        }

        .slide-in-from-left {
          animation-name: slide-in-from-left;
        }
      `}</style>
    </div>
  );
};

export default Card;
