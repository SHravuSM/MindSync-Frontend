// import { useEffect, useState } from "react";
// import api from "../utils/api1";
// import bulb from "../assets/bulb2.png";
// import USER from "../assets/user.png";
// import useAuthStore from "../store/authStore";
// import useThemeStore from "../store/themeStore";

// const Card = ({ post }) => {
//   const { user } = useAuthStore((s) => s.user);
//   const { dark } = useThemeStore((s) => s.dark);
//   const [Post, setPost] = useState(null);
//   const [open, setOpen] = useState();
//   const [showOptions, setShowOptions] = useState(false);
//   const [collaborators, setCollaborators] = useState([]);

//   const [newComment, setNewComment] = useState("");
//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     const commentData = {
//       uid: user.uid,
//       name: user.name,
//       photo: user.photo,
//       comment: newComment,
//     };

//     try {
//       const res = await api.patch(`user/posts/comment/${post._id}`, commentData);
//       // console.log(res.data)
//       setPost(res.data);
//       setNewComment("");
//     } catch (err) {
//       console.error("Failed to add comment:", err);
//     }
//   };

//   useEffect(() => {
//     setPost(post);
//   }, []);

//   const collabUsers = async (id) => {
//     console.log(id._id);
//     const ID = id._id;
//     setOpen((pre) => (pre === "collab" ? "" : "collab"));
//     const res = await api.get(`/posts/collab-users/${ID}`);
//     console.log(res.data);
//   };

//   const handleLike = async (postId) => {
//     try {
//       const res = await api.patch(`/posts/like/${postId}`, {
//         uid: user.uid,
//       });
//       setPost(res.data);
//     } catch (err) {
//       console.error("Failed to like post", err);
//     }
//   };

//   const onNotImpressed = async (postId) => {
//     const res = await api.patch(`/posts/notimpression/${postId}`, {
//       uid: user.uid,
//     });
//     setPost(res.data);
//   };
//   const onImpressed = async (postId) => {
//     const res = await api.patch(`/posts/impression/${postId}`, {
//       uid: user.uid,
//     });
//     setPost(res.data);
//   };
//   return (
//     <>
//       {Post && (
//         <div
//           className={`lg:max-w-xl rounded-lg relative hover:z-1 max-w-lg lg:pt-1 w-full`}
//         >
//           <div
//             className={`relative ${
//               dark ? "bg-white text-black" : "bg-black text-white"
//             } backdrop-blur-md p-3 pt-0 pb-2 rounded-lg shadow-md transform hover:scale-100 ${
//               !dark && "hover:border-none lg:hover:scale-110"
//             } perspective-midrange hover:shadow-xl ${
//               !dark && "hover:shadow-white/50"
//             } border hover:my-2 border-blue-500/10 transition-all duration-500 ease-in-out cursor-pointer`}
//             draggable="true"
//           >
//             {/* Shine Overlay */}
//             <div className="absolute top-0 left-0 w-full h-full rounded-lg pointer-events-none overflow-hidden">
//               <div
//                 className={`absolute -top-1/2 left-0 w-full h-full bg-gradient-to-br from-black/80 via-transparent to-white transform rotate-0 translate-y-8/12 blur-sm opacity-20`}
//               ></div>
//             </div>

//             {/* Tags & Options */}
//             <div className="flex items-center w-full justify-between z-10 relative py-1">
//               <span className="text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
//                 {Post.title || Post.user.name}
//               </span>

//               <div
//                 className={`flex items-center justify-end lg:gap-x-4 gap-x-2 lg:w-3/12 w-5/12 py-1 text-xs cursor-pointer ${
//                   dark ? "text-black" : "text-white"
//                 }`}
//               >
//                 <span>
//                   on{" "}
//                   {new Date(Post.createdAt).toLocaleDateString("en-US", {
//                     year: "numeric",
//                     month: "short",
//                     day: "numeric",
//                   })}
//                 </span>

//                 <button
//                   className={`bg-transparent text-lg transition ${
//                     !dark ? "text-white" : "text-black"
//                   }`}
//                   aria-label="Post Options"
//                   onClick={() => setShowOptions((prev) => !prev)}
//                 >
//                   <svg
//                     viewBox="0 0 41.915 41.916"
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="w-5 h-5 fill-current"
//                   >
//                     <path d="M11.214,20.956c0,3.091-2.509,5.589-5.607,5.589C2.51,26.544,0,24.046,0,20.956c0-3.082,2.511-5.585,5.607-5.585C8.705,15.371,11.214,17.874,11.214,20.956z" />
//                     <path d="M26.564,20.956c0,3.091-2.509,5.589-5.606,5.589c-3.097,0-5.607-2.498-5.607-5.589c0-3.082,2.511-5.585,5.607-5.585C24.056,15.371,26.564,17.874,26.564,20.956z" />
//                     <path d="M41.915,20.956c0,3.091-2.509,5.589-5.607,5.589c-3.097,0-5.606-2.498-5.606-5.589c0-3.082,2.511-5.585,5.606-5.585C39.406,15.371,41.915,17.874,41.915,20.956z" />
//                   </svg>
//                 </button>
//               </div>

//               {showOptions && (
//                 <div className="absolute right-0 top-full mt-2 w-32 bg-black shadow-lg rounded z-10 text-white text-sm">
//                   <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//                     Edit
//                   </div>
//                   <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//                     Delete
//                   </div>
//                 </div>
//               )}
//             </div>

//             <p className="text-sm mt-1 line-clamp-5 mb-2 z-10 relative whitespace-pre-wrap">
//               {Post.content}
//             </p>

//             <div className="flex items-center justify-between text-sm text-white/70 z-10 relative">
//               <div className="flex gap-4 text-md">
//                 <div
//                   className={`flex items-center text-lg cursor-pointer ${
//                     dark ? "text-black" : "text-white"
//                   }`}
//                   onClick={(e) =>
//                     setOpen((pre) => (pre === "comment" ? "" : "comment"))
//                   }
//                 >
//                   <img
//                     width="19px"
//                     style={{ marginRight: "3px" }}
//                     src={bulb}
//                     alt=""
//                   />
//                   {Post.comments.length}
//                 </div>

//                 <button
//                   onClick={() => {
//                     handleLike(Post._id);
//                   }}
//                   className={`flex focus:outline-none text-lg items-center cursor-pointer ${
//                     dark ? "text-black" : "text-white"
//                   }`}
//                   aria-label="Toggle Like"
//                 >
//                   <svg
//                     className={`w-${5} h-${5}  transition-colors duration-200`}
//                     style={{ marginRight: "2px" }}
//                     viewBox="0 0 24 24"
//                     strokeWidth="1"
//                     fill={Post.likes.includes(user.uid) ? "red" : "none"}
//                     stroke={
//                       Post.likes.includes(user.uid)
//                         ? "red"
//                         : dark
//                         ? "black"
//                         : "white"
//                     }
//                   >
//                     <path
//                       d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
//                  2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
//                  C13.09 3.81 14.76 3 16.5 3
//                  19.58 3 22 5.42 22 8.5
//                  c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
//                     />
//                   </svg>
//                   {Post.likes.length}
//                 </button>
//               </div>

//               <div className="flex items-center cursor-pointer">
//                 {Post.impressions.includes(user.uid) ? (
//                   <h2
//                     onClick={(e) => onNotImpressed(Post._id)}
//                     className={`${
//                       dark ? "text-black" : "text-white"
//                     } text-md mr-1 border font-extralight rounded-full p-1 px-2`}
//                   >
//                     Withdraw
//                   </h2>
//                 ) : (
//                   <h2
//                     onClick={(e) => onImpressed(Post._id)}
//                     className={`${
//                       dark ? "text-black" : "text-white"
//                     } text-md mr-1 border font-extralight rounded-full p-1 px-2`}
//                   >
//                     Collab
//                   </h2>
//                 )}
//                 {Array(
//                   Post.impressions.length < 4 ? Post.impressions.length : 3
//                 )
//                   .fill(0)
//                   .map((_, idx) => (
//                     <span
//                       onClick={(e) =>
//                         setOpen((pre) => (pre === "collab" ? "" : "collab"))
//                       }
//                       key={idx}
//                       className="h-[30px] w-[30px] rounded-full bg-blue-200 flex items-center justify-center text-sm font-bold border border-white -mr-2 shadow-sm"
//                     >
//                       <img src={USER} alt="" />
//                     </span>
//                   ))}
//                 <span
//                   onClick={(e) => {
//                     Post.impressions.length > 0 && collabUsers(Post);
//                   }}
//                   className="h-[30px] w-[30px] rounded-full bg-white text-black transform flex items-center justify-center text-xs font-bold shadow-sm"
//                 >
//                   {Post.impressions.length}
//                 </span>
//               </div>
//             </div>

//             {open === "comment" && (
//               <div
//                 className={`mt-1 mb-0.5 ${
//                   dark ? "text-black" : "text-white"
//                 } relative max-h-72 z-10 max-w-2xl`}
//               >
//                 <h3 className="text-sm font-semibold text-blue-500 mb-3">
//                   Suggestions
//                 </h3>

//                 {/* Comments List */}
//                 <ul className="space-y-4 relative max-h-52 overflow-y-auto pr-1">
//                   {Post.comments.length === 0 ? (
//                     <p className="text-gray-500 dark:text-gray-400">
//                       No comments yet. Be the first!
//                     </p>
//                   ) : (
//                     Post.comments.map((e, idx) => (
//                       <li key={e._id || idx} className="flex items-start gap-2">
//                         <img
//                           src={e.photo}
//                           alt={e.name}
//                           className="w-8 h-8 rounded-full object-cover border border-gray-300"
//                         />
//                         <div className="flex-1">
//                           <div className="flex justify-between items-center">
//                             <p className="text-xs font-medium">{e.name}</p>
//                             <p className="text-[8px]">
//                               {new Date(e.createdAt).toLocaleString()}
//                             </p>
//                           </div>
//                           <p className="text-sm mt-0 mb-1 z-10 relative whitespace-pre-wrap">
//                             {e.comment}
//                           </p>
//                         </div>
//                       </li>
//                     ))
//                   )}
//                 </ul>

//                 {/* Add New Comment */}
//                 <form
//                   onSubmit={handleCommentSubmit}
//                   className="mt-4 flex items-start gap-2"
//                 >
//                   <img
//                     src={user.photo}
//                     alt={user.name}
//                     className="w-8 h-8 rounded-full object-cover mt-1"
//                   />
//                   <div className="flex-1">
//                     <input
//                       type="text"
//                       value={newComment}
//                       onChange={(e) => setNewComment(e.target.value)}
//                       placeholder="Write a comment..."
//                       className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//                   >
//                     Post
//                   </button>
//                 </form>
//               </div>
//             )}

//             {open === "collab" && (
//               <div
//                 className={`mt-1 mb-0.5 ${
//                   dark ? "text-black" : "text-white"
//                 } relative max-h-72 z-10 max-w-2xl`}
//               >
//                 <h3 className="text-sm font-semibold text-blue-500 mb-3">
//                   Suggestions
//                 </h3>

//                 {/* Comments List */}
//                 <ul className="space-y-4 relative max-h-52 overflow-y-auto pr-1">
//                   {Post.comments.length === 0 ? (
//                     <p className="text-gray-500 dark:text-gray-400">
//                       No comments yet. Be the first!
//                     </p>
//                   ) : (
//                     Post.comments.map((e, idx) => (
//                       <li key={e._id || idx} className="flex items-start gap-2">
//                         <img
//                           src={e.photo}
//                           alt={e.name}
//                           className="w-8 h-8 rounded-full object-cover border border-gray-300"
//                         />
//                         <div className="flex-1">
//                           <div className="flex justify-between items-center">
//                             <p className="text-xs font-medium">{e.name}</p>
//                             <p className="text-xs">
//                               {new Date(e.createdAt).toLocaleString()}
//                             </p>
//                           </div>
//                           <p className="text-sm mt-0 mb-1 z-10 relative whitespace-pre-wrap">
//                             {e.comment}
//                           </p>
//                         </div>
//                       </li>
//                     ))
//                   )}
//                 </ul>

//                 {/* Add New Comment */}
//                 <form
//                   onSubmit={handleCommentSubmit}
//                   className="mt-4 flex items-start gap-2"
//                 >
//                   <img
//                     src={user.photo}
//                     alt={user.name}
//                     className="w-8 h-8 rounded-full object-cover mt-1"
//                   />
//                   <div className="flex-1">
//                     <input
//                       type="text"
//                       value={newComment}
//                       onChange={(e) => setNewComment(e.target.value)}
//                       placeholder="Write a comment..."
//                       className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//                   >
//                     Post
//                   </button>
//                 </form>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Card;

// import { useEffect, useState } from "react";
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
// } from "lucide-react";

// const Card = ({ post }) => {
//   const user = useAuthStore((s) => s.user);
//   const dark = useThemeStore((s) => s.dark);
//   const [Post, setPost] = useState(null);
//   const [open, setOpen] = useState();
//   const [showOptions, setShowOptions] = useState(false);
//   const [collaborators, setCollaborators] = useState([]);
//   const [newComment, setNewComment] = useState("");

//   const userId = user._id;

//   // Add state to track hidden comments
//   const [hiddenComments, setHiddenComments] = useState(new Set());

//   // Toggle function for comment visibility
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

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     const commentData = {
//       id: userId,
//       comment: newComment,
//     };

//     try {
//       const res = await api.patch(
//         `user/posts/comment/${post._id}`,
//         commentData
//       );
//       setPost(res.data);
//       setNewComment("");
//     } catch (err) {
//       console.error("Failed to add comment:", err);
//     }
//   };

//   useEffect(() => {
//     setPost(post);
//   }, [post]);

//   const collabUsers = async (id) => {
//     console.log(id._id);
//     const ID = id._id;
//     setOpen((pre) => (pre === "collab" ? "" : "collab"));
//     const res = await api.get(`/posts/collab-users/${ID}`);
//     console.log(res.data);
//   };

//   const handleLike = async (postId) => {
//     try {
//       const res = await api.patch(`/user/posts/like/${postId}`, {
//         userId,
//       });
//       setPost(res.data);
//     } catch (err) {
//       console.error("Failed to like post", err);
//     }
//   };

//   const onNotImpressed = async (postId) => {
//     const res = await api.patch(`/user/posts/impression/${postId}`, {
//       userId,
//     });
//     console.log(res.data);
//     setPost(res.data);
//   };

//   return (
//     <>
//       {Post && (
//         <div
//           className={`lg:max-w-xl rounded-lg relative hover:z-1 max-w-lg lg:pt-1 w-full`}
//         >
//           <div
//             className={`relative ${
//               dark ? "bg-white text-black" : "bg-black text-white"
//             } backdrop-blur-md p-3 pt-0 pb-2 rounded-lg shadow-md transform hover:scale-100 ${
//               !dark && "hover:border-none lg:hover:scale-110"
//             } perspective-midrange hover:shadow-xl ${
//               !dark && "hover:shadow-white/50"
//             } border hover:my-2 border-blue-500/10 transition-all duration-500 ease-in-out cursor-pointer`}
//             draggable="true"
//           >
//             {/* <div className="absolute top-0 left-0 w-full h-full rounded-lg pointer-events-none overflow-hidden">
//               <div
//                 className={`absolute -top-1/2 left-0 w-full h-full bg-gradient-to-br from-black/80 via-transparent to-white transform rotate-0 translate-y-8/12 blur-sm opacity-20`}
//               ></div>
//             </div> */}
//             <div className="flex items-center w-full justify-between z-10 relative py-1">
//               <span className="text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
//                 {Post.title}
//               </span>

//               <div
//                 className={`flex items-center justify-end lg:gap-x-4 gap-x-2 lg:w-3/12 w-5/12 py-1 text-xs cursor-pointer ${
//                   dark ? "text-black" : "text-white"
//                 }`}
//               >
//                 <span>
//                   on{" "}
//                   {new Date(Post.createdAt).toLocaleDateString("en-US", {
//                     year: "numeric",
//                     month: "short",
//                     day: "numeric",
//                   })}
//                 </span>

//                 <button
//                   className={`bg-transparent text-lg transition ${
//                     !dark ? "text-white" : "text-black"
//                   }`}
//                   aria-label="Post Options"
//                   onClick={() => setShowOptions((prev) => !prev)}
//                 >
//                   <svg
//                     viewBox="0 0 41.915 41.916"
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="w-5 h-5 fill-current"
//                   >
//                     <path d="M11.214,20.956c0,3.091-2.509,5.589-5.607,5.589C2.51,26.544,0,24.046,0,20.956c0-3.082,2.511-5.585,5.607-5.585C8.705,15.371,11.214,17.874,11.214,20.956z" />
//                     <path d="M26.564,20.956c0,3.091-2.509,5.589-5.606,5.589c-3.097,0-5.607-2.498-5.607-5.589c0-3.082,2.511-5.585,5.607-5.585C24.056,15.371,26.564,17.874,26.564,20.956z" />
//                     <path d="M41.915,20.956c0,3.091-2.509,5.589-5.607,5.589c-3.097,0-5.606-2.498-5.606-5.589c0-3.082,2.511-5.585,5.606-5.585C39.406,15.371,41.915,17.874,41.915,20.956z" />
//                   </svg>
//                 </button>
//               </div>

//               {showOptions && (
//                 <div className="absolute right-0 top-full mt-2 w-32 bg-black shadow-lg rounded z-10 text-white text-sm">
//                   <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//                     Edit
//                   </div>
//                   <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//                     Delete
//                   </div>
//                 </div>
//               )}
//             </div>
//             <p className="text-sm mt-1 line-clamp-5 mb-2 z-10 relative whitespace-pre-wrap">
//               {Post.content}
//             </p>
//             <div className="flex items-center justify-between text-sm text-white/70 z-10 relative">
//               <div className="flex gap-4 text-md">
//                 <button
//                   className={`flex items-center gap-1 text-lg cursor-pointer ${
//                     dark ? "text-black" : "text-white"
//                   }`}
//                   onClick={(e) =>
//                     setOpen((pre) => (pre === "comment" ? "" : "comment"))
//                   }
//                 >
//                   <Lightbulb />
//                   {Post.comments.length}
//                 </button>
//                 <button
//                   onClick={() => {
//                     handleLike(Post._id);
//                   }}
//                   className={`flex focus:outline-none text-lg items-center gap-1 cursor-pointer ${
//                     dark ? "text-black" : "text-white"
//                   }`}
//                   aria-label="Toggle Like"
//                 >
//                   <svg
//                     className={`w-${5} h-${5}  transition-colors duration-200`}
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill={Post.likes.includes(userId) ? "red" : "none"}
//                     stroke={
//                       Post.likes.includes(userId)
//                         ? "red"
//                         : dark
//                         ? "black"
//                         : "white"
//                     }
//                     stroke-width="2"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     class="lucide lucide-heart-icon lucide-heart"
//                   >
//                     <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
//                   </svg>
//                   {Post.likes.length}
//                 </button>
//               </div>

//               <div className="flex items-center cursor-pointer">
//                 <h2
//                   onClick={(e) => onNotImpressed(Post._id)}
//                   className={`${
//                     dark ? "text-black" : "text-white"
//                   } text-md mr-1 border font-extralight rounded-full p-1 px-2`}
//                 >
//                   {Post.impressions.includes(userId) ? "Withdraw" : "Collab"}
//                 </h2>
//                 {Array(
//                   Post.impressions.length < 4 ? Post.impressions.length : 3
//                 )
//                   .fill(0)
//                   .map((_, idx) => (
//                     <span
//                       onClick={(e) =>
//                         setOpen((pre) => (pre === "collab" ? "" : "collab"))
//                       }
//                       key={idx}
//                       className="h-[30px] w-[30px] rounded-full bg-blue-200 flex items-center justify-center text-sm font-bold border border-white -mr-2 shadow-sm"
//                     >
//                       <img src={USER} alt="" />
//                     </span>
//                   ))}
//                 <span
//                   onClick={(e) => {
//                     Post.impressions.length > 0 && collabUsers(Post);
//                   }}
//                   className="h-[30px] w-[30px] rounded-full bg-white text-black transform flex items-center justify-center text-xs font-bold shadow-sm"
//                 >
//                   {Post.impressions.length}
//                 </span>
//               </div>
//             </div>
//             {open === "comment" && (
//               <div
//                 className={`mt-1 mb-0.5 ${
//                   dark ? "text-black" : "text-white"
//                 } relative max-h-72 z-10 max-w-2xl`}
//               >
//                 <h3 className="text-sm font-semibold text-blue-500 mb-3">
//                   Suggestions
//                 </h3>
//                 <ul className="space-y-4 relative max-h-52 overflow-y-auto pr-1">
//                   {Post.comments.length === 0 ? (
//                     <p className="text-gray-500 dark:text-gray-400">
//                       No comments yet. Be the first!
//                     </p>
//                   ) : (
//                     // Updated comment rendering with toggle functionality
//                     Post.comments.map((e, idx) => {
//                       const commentId = e._id || idx;
//                       const isHidden = hiddenComments.has(commentId);

//                       return (
//                         <li key={commentId} className="flex items-start gap-2">
//                           {/* Clickable Avatar/Icon */}
//                           {e.photo ? (
//                             <img
//                               src={e.photo}
//                               alt={e.name}
//                               onClick={() => toggleCommentVisibility(commentId)}
//                               className="w-8 h-8 rounded-full object-cover border border-gray-300 cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-md hover:border-blue-400 active:scale-95"
//                             />
//                           ) : (
//                             <div
//                               onClick={() => toggleCommentVisibility(commentId)}
//                               className="mt-3 cursor-pointer transition-all duration-200 hover:scale-110 hover:text-blue-600 active:scale-95"
//                             >
//                               <User />
//                             </div>
//                           )}

//                           <div className="flex-1">
//                             <div className="flex justify-between items-center">
//                               <p className="text-xs font-medium">{e.name}</p>
//                               <p className="text-[10px]">
//                                 {new Date(e.createdAt).toLocaleString()}
//                               </p>
//                             </div>

//                             {/* Conditionally rendered comment with smooth animation */}
//                             <div
//                               className={`transition-all duration-300 overflow-hidden ${
//                                 isHidden
//                                   ? "max-h-0 opacity-0"
//                                   : "max-h-96 opacity-100"
//                               }`}
//                             >
//                               <p className="text-sm mt-0 mb-1 z-10 relative whitespace-pre-wrap">
//                                 {e.comment}
//                               </p>
//                             </div>

//                             {/* Optional: Show collapsed indicator when hidden */}
//                             {isHidden && (
//                               <p className="text-xs text-gray-400 italic animate-pulse">
//                                 Comment hidden • Click avatar to show
//                               </p>
//                             )}
//                           </div>
//                         </li>
//                       );
//                     })
//                   )}
//                 </ul>
//                 <form
//                   onSubmit={handleCommentSubmit}
//                   className={`mt-6 ${
//                     dark ? "bg-white/90" : "bg-black/90"
//                   } backdrop-blur-lg rounded-xl border border-white/10 p-4 shadow-sm transition-all duration-200 hover:shadow-md`}
//                 >
//                   <div className="flex items-center gap-3">
//                     {/* Avatar */}
//                     {user.photo ? (
//                       <img
//                         src={user.photo}
//                         alt={user.name}
//                         className="w-9 h-9 rounded-full object-cover ring-1 ring-white/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:ring-2 hover:ring-blue-400/30 cursor-pointer"
//                       />
//                     ) : (
//                       <div className="w-9 h-9 p-2 rounded-full border flex items-center justify-center ring-1 ring-white/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:ring-2 hover:ring-blue-400/30 cursor-pointer">
//                         <User
//                           className={`${
//                             dark ? "text-black" : "text-white/50"
//                           } transition-colors duration-300`}
//                         />
//                       </div>
//                     )}

//                     {/* Input */}
//                     <input
//                       type="text"
//                       value={newComment}
//                       onChange={(e) => setNewComment(e.target.value)}
//                       placeholder="Express your suggestion..."
//                       className="flex-1 px-4 py-2.5 text-sm bg-transparent rounded-sm text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/30 transition-all duration-300 focus:scale-[1.02] focus:shadow-sm"
//                       required
//                     />

//                     {/* Submit Button */}
//                     <button
//                       type="submit"
//                       disabled={!newComment.trim()}
//                       className="px-2 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:hover:scale-100"
//                     >
//                       <span className="inline-flex items-center">Post</span>
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             )}
//             {open === "collab" && (
//               <div
//                 className={`mt-1 mb-0.5 ${
//                   dark ? "text-black" : "text-white"
//                 } relative max-h-72 z-10 max-w-2xl`}
//               >
//                 <h3 className="text-sm font-semibold text-blue-500 mb-3">
//                   Collaborators
//                 </h3>

//                 <ul className="space-y-4 relative max-h-52 overflow-y-auto pr-1">
//                   {Post.impressions.length === 0 ? (
//                     <p className="text-gray-500 dark:text-gray-400">
//                       No collaborators yet.
//                     </p>
//                   ) : (
//                     Post.impressions.map((impression, idx) => (
//                       <li
//                         key={impression._id || idx}
//                         className="flex items-start gap-2"
//                       >
//                         <img
//                           src={impression.photo || USER}
//                           alt={impression.name || "User"}
//                           className="w-8 h-8 rounded-full object-cover border border-gray-300"
//                         />
//                         <div className="flex-1">
//                           <div className="flex justify-between items-center">
//                             <p className="text-xs font-medium">
//                               {impression.name || "Anonymous"}
//                             </p>
//                             <p className="text-xs">
//                               {impression.createdAt
//                                 ? new Date(
//                                     impression.createdAt
//                                   ).toLocaleString()
//                                 : ""}
//                             </p>
//                           </div>
//                           <p className="text-sm mt-0 mb-1 z-10 relative whitespace-pre-wrap">
//                             Interested in collaborating
//                           </p>
//                         </div>
//                       </li>
//                     ))
//                   )}
//                 </ul>
//               </div>
//             )}{" "}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Card;

// import { useEffect, useState } from "react";
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
// } from "lucide-react";

// const Card = ({ post }) => {
//   const user = useAuthStore((s) => s.user);
//   const dark = useThemeStore((s) => s.dark);
//   const [Post, setPost] = useState(null);
//   const [open, setOpen] = useState();
//   const [showOptions, setShowOptions] = useState(false);
//   const [collaborators, setCollaborators] = useState([]);
//   const [newComment, setNewComment] = useState("");

//   const userId = user._id;

//   // Add state to track hidden comments
//   const [hiddenComments, setHiddenComments] = useState(new Set());

//   // Toggle function for comment visibility
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

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     let postId = post._id;
//     const commentData = {
//       id: userId,
//       content: newComment,
//       postId,
//     };

//     try {
//       const res = await api.patch(`user/posts/comment/${postId}`, commentData);
//       setPost(res.data);
//       setNewComment("");
//     } catch (err) {
//       console.error("Failed to add comment:", err);
//     }
//   };

//   useEffect(() => {
//     setPost(post);
//   }, [post]);

//   const collabUsers = async (Post) => {
//     let id = post._id;
//     const res = await api.get(`/user/posts/collabusers/${id}`);
//     console.log(res.data);
//     setCollaborators(res.data);
//   };

//   useEffect(() => {
//     collabUsers(Post);
//   }, [open == "collab"]);

//   const handleLike = async (postId) => {
//     try {
//       const res = await api.patch(`/user/posts/like/${postId}`, {
//         userId,
//       });
//       setPost(res.data);
//     } catch (err) {
//       console.error("Failed to like post", err);
//     }
//   };

//   // let fetchCollaborators = async () => {
//   //   try {
//   //     const res = await api.get(`/user/posts/collab-users`);
//   //     setCollaborators(res.data);
//   //   } catch (err) {
//   //     console.error("Failed to fetch collaborators", err);
//   //   }
//   // };
//   // useEffect(() => {
//   //   fetchCollaborators();
//   // }, [open == "collab"]);

//   const onNotImpressed = async (postId) => {
//     const res = await api.patch(`/user/posts/impression/${postId}`, {
//       userId,
//     });
//     console.log(res.data);
//     setPost(res.data);
//   };

//   return (
//     <>
//       {Post && (
//         <div
//           className={`lg:max-w-xl rounded-lg relative hover:z-1 max-w-lg lg:pt-1 w-full`}
//         >
//           <div
//             className={`relative ${
//               dark ? "bg-white text-black" : "bg-black text-white"
//             } backdrop-blur-md p-3 pt-0 pb-2 rounded-lg shadow-md transform hover:scale-100 ${
//               !dark && "hover:border-none lg:hover:scale-110"
//             } perspective-midrange hover:shadow-xl ${
//               !dark && "hover:shadow-white/50"
//             } border hover:my-2 border-blue-500/10 transition-all duration-500 ease-in-out cursor-pointer`}
//             draggable="true"
//           >
//             <div className="flex items-center w-full justify-between z-10 relative py-1">
//               <span className="text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
//                 {Post.title}
//               </span>

//               <div
//                 className={`flex items-center justify-end lg:gap-x-4 gap-x-2 lg:w-3/12 w-5/12 py-1 text-xs cursor-pointer ${
//                   dark ? "text-black" : "text-white"
//                 }`}
//               >
//                 <span>
//                   on{" "}
//                   {new Date(Post.createdAt).toLocaleDateString("en-US", {
//                     year: "numeric",
//                     month: "short",
//                     day: "numeric",
//                   })}
//                 </span>

//                 <button
//                   className={`bg-transparent text-lg transition-all duration-200 hover:scale-110 active:scale-95 ${
//                     !dark ? "text-white" : "text-black"
//                   }`}
//                   aria-label="Post Options"
//                   onClick={() => setShowOptions((prev) => !prev)}
//                 >
//                   <svg
//                     viewBox="0 0 41.915 41.916"
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="w-5 h-5 fill-current"
//                   >
//                     <path d="M11.214,20.956c0,3.091-2.509,5.589-5.607,5.589C2.51,26.544,0,24.046,0,20.956c0-3.082,2.511-5.585,5.607-5.585C8.705,15.371,11.214,17.874,11.214,20.956z" />
//                     <path d="M26.564,20.956c0,3.091-2.509,5.589-5.606,5.589c-3.097,0-5.607-2.498-5.607-5.589c0-3.082,2.511-5.585,5.607-5.585C24.056,15.371,26.564,17.874,26.564,20.956z" />
//                     <path d="M41.915,20.956c0,3.091-2.509,5.589-5.607,5.589c-3.097,0-5.606-2.498-5.606-5.589c0-3.082,2.511-5.585,5.606-5.585C39.406,15.371,41.915,17.874,41.915,20.956z" />
//                   </svg>
//                 </button>
//               </div>

//               {showOptions && (
//                 <div className="absolute right-0 top-full mt-2 w-32 bg-black dark:bg-white shadow-lg rounded z-10 text-white dark:text-black text-sm transition-all duration-200 animate-in slide-in-from-top-2">
//                   <div className="px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-100 cursor-pointer transition-colors duration-150">
//                     Edit
//                   </div>
//                   <div className="px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-100 cursor-pointer transition-colors duration-150">
//                     Delete
//                   </div>
//                 </div>
//               )}
//             </div>
//             <p className="text-sm mt-1 line-clamp-5 mb-2 z-10 relative whitespace-pre-wrap">
//               {Post.content}
//             </p>
//             <div className="flex items-center justify-between text-sm text-white/70 z-10 relative">
//               <div className="flex gap-4 text-md">
//                 <button
//                   className={`flex items-center gap-1 text-lg cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 ${
//                     dark ? "text-black" : "text-white"
//                   }`}
//                   onClick={(e) =>
//                     setOpen((pre) => (pre === "comment" ? "" : "comment"))
//                   }
//                 >
//                   <Lightbulb />
//                   {Post.comments.length}
//                 </button>
//                 <button
//                   onClick={() => {
//                     handleLike(Post._id);
//                   }}
//                   className={`flex focus:outline-none text-lg items-center gap-1 cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 ${
//                     dark ? "text-black" : "text-white"
//                   }`}
//                   aria-label="Toggle Like"
//                 >
//                   <svg
//                     className={`w-5 h-5 transition-all duration-200 ${
//                       Post.likes.includes(userId) ? "animate-pulse" : ""
//                     }`}
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill={Post.likes.includes(userId) ? "red" : "none"}
//                     stroke={
//                       Post.likes.includes(userId)
//                         ? "red"
//                         : dark
//                         ? "black"
//                         : "white"
//                     }
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
//                   </svg>
//                   {Post.likes.length}
//                 </button>
//               </div>

//               <div className="flex items-center cursor-pointer">
//                 <h2
//                   onClick={(e) => onNotImpressed(Post._id)}
//                   className={`${
//                     dark ? "text-black" : "text-white"
//                   } text-md mr-1 border font-extralight rounded-full p-1 px-2 transition-all duration-200 hover:scale-105 active:scale-95`}
//                 >
//                   {Post.impressions.includes(userId) ? "Withdraw" : "Collab"}
//                 </h2>
//                 {Array(
//                   Post.impressions.length < 4 ? Post.impressions.length : 3
//                 )
//                   .fill(0)
//                   .map((_, idx) => (
//                     <span
//                       key={idx}
//                       className="h-[30px] w-[30px] rounded-full bg-blue-200 flex items-center justify-center text-sm font-bold border border-white -mr-2 shadow-sm transition-all duration-200 hover:scale-110 hover:z-10 cursor-pointer"
//                     >
//                       <img src={USER} alt="" />
//                     </span>
//                   ))}
//                 <span className="h-[30px] w-[30px] rounded-full bg-white text-black transform flex items-center justify-center text-xs font-bold shadow-sm transition-all duration-200 hover:scale-110 cursor-pointer">
//                   {Post.impressions.length}
//                 </span>
//               </div>
//             </div>
//             {open === "comment" && (
//               <div
//                 className={`mt-1 mb-0.5 ${
//                   dark ? "text-black" : "text-white"
//                 } relative max-h-72 z-10 max-w-2xl transition-all duration-300 animate-in slide-in-from-top`}
//               >
//                 <h3 className="text-sm font-semibold mt-4 text-blue-500 mb-3">
//                   Suggestions
//                 </h3>
//                 <ul className="space-y-4 relative max-h-52 overflow-y-auto pr-1">
//                   {Post.comments.length === 0 ? (
//                     <p className="text-gray-500 dark:text-gray-400">
//                       No suggestion yet. Be the first
//                     </p>
//                   ) : (
//                     Post.comments.map((e, idx) => {
//                       const commentId = e._id || idx;
//                       const isHidden = hiddenComments.has(commentId);

//                       return (
//                         <li key={commentId} className="flex items-start gap-2">
//                           {/* Clickable Avatar/Icon */}
//                           {e.photo ? (
//                             <img
//                               src={e.photo}
//                               alt={e.name}
//                               onClick={() => toggleCommentVisibility(commentId)}
//                               className="w-8 h-8 rounded-full object-cover border border-gray-300 cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-md hover:border-blue-400 active:scale-95"
//                             />
//                           ) : (
//                             <div
//                               onClick={() => toggleCommentVisibility(commentId)}
//                               className="mt-3 cursor-pointer transition-all duration-200 hover:scale-110 hover:text-blue-600 active:scale-95"
//                             >
//                               <User />
//                             </div>
//                           )}

//                           <div className="flex-1">
//                             <div className="flex justify-between items-center">
//                               <p className="text-xs font-medium">{e.name}</p>
//                               <p className="text-[10px]">
//                                 {new Date(e.createdAt).toLocaleString()}
//                               </p>
//                             </div>

//                             {/* Conditionally rendered comment with smooth animation */}
//                             <div
//                               className={`transition-all duration-500 ease-out overflow-hidden ${
//                                 isHidden
//                                   ? "max-h-0 opacity-0 transform scale-y-0"
//                                   : "max-h-96 opacity-100 transform scale-y-100"
//                               }`}
//                             >
//                               <p className="text-sm mt-0 mb-1 z-10 relative whitespace-pre-wrap">
//                                 {e.comment}
//                               </p>
//                             </div>

//                             {/* Optional: Show collapsed indicator when hidden */}
//                             {isHidden && (
//                               <p className="text-xs text-gray-400 italic animate-pulse">
//                                 Comment hidden • Click avatar to show
//                               </p>
//                             )}
//                           </div>
//                         </li>
//                       );
//                     })
//                   )}
//                 </ul>
//                 <form
//                   onSubmit={handleCommentSubmit}
//                   className={`mt-6 ${
//                     dark ? "bg-white/90" : "bg-black/90"
//                   } backdrop-blur-lg rounded-xl border border-white/10 p-4 shadow-sm transition-all duration-200 hover:shadow-md`}
//                 >
//                   <div className="flex items-center gap-3">
//                     {/* Avatar */}
//                     {user.photo ? (
//                       <img
//                         src={user.photo}
//                         alt={user.name}
//                         className="w-9 h-9 rounded-full object-cover ring-1 ring-white/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:ring-2 hover:ring-blue-400/30 cursor-pointer"
//                       />
//                     ) : (
//                       <div className="w-9 h-9 p-2 rounded-full border flex items-center justify-center ring-1 ring-white/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:ring-2 hover:ring-blue-400/30 cursor-pointer">
//                         <User
//                           className={`${
//                             dark ? "text-black" : "text-white/50"
//                           } transition-colors duration-300`}
//                         />
//                       </div>
//                     )}

//                     {/* Input */}
//                     <input
//                       type="text"
//                       value={newComment}
//                       onChange={(e) => setNewComment(e.target.value)}
//                       placeholder="Express your suggestion..."
//                       className={`flex-1 px-4 py-2.5 text-sm bg-transparent rounded-sm ${
//                         dark ? "text-gray-800" : "text-white"
//                       }  placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/30 transition-all duration-300 focus:scale-[1.02] focus:shadow-sm`}
//                       required
//                     />

//                     {/* Submit Button */}
//                     <button
//                       type="submit"
//                       disabled={!newComment.trim()}
//                       className="px-2 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:hover:scale-100"
//                     >
//                       <span className="inline-flex items-center">Post</span>
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             )}
//             {/* {open === "collab" && (
//               <div
//                 className={`mt-1 mb-0.5 ${
//                   dark ? "text-black" : "text-white"
//                 } relative max-h-72 z-10 max-w-2xl transition-all duration-300 animate-in slide-in-from-top`}
//               >
//                 <h3 className="text-sm font-semibold text-blue-500 mb-3">
//                   Collaborators
//                 </h3>

//                 <ul className="space-y-4 relative max-h-52 overflow-y-auto pr-1">
//                   {Post.impressions.length === 0 ? (
//                     <p className="text-gray-500 dark:text-gray-400">
//                       No collaborators yet.
//                     </p>
//                   ) : (
//                     collaborators.map((c) => (
//                       <li
//                         key={c._id}
//                         className="flex items-center border gap-2"
//                       >
//                         <img
//                           src={c.photo || USER}
//                           alt={c.name}
//                           className="w-8 h-8 rounded-full object-cover border border-gray-300 transition-all duration-200 hover:scale-110 hover:shadow-md"
//                         />
//                         <div className="flex justify-between items-center">
//                           <p className="text-xs font-medium">
//                             {c.name || "Anonymous"}
//                           </p>
//                         </div>
//                       </li>
//                     ))
//                   )}
//                 </ul>
//               </div>
//             )} */}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Card;

import { useEffect, useState } from "react";
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
} from "lucide-react";
import { data } from "react-router-dom";

const Card = ({ post }) => {
  const user = useAuthStore((s) => s.user);
  const dark = useThemeStore((s) => s.dark);
  const [Post, setPost] = useState(null);
  const [open, setOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const [suggestions, setSuggestions] = useState(null);
  const [newComment, setNewComment] = useState("");

  const userId = user._id;

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

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    let postId = Post._id;
    const commentData = {
      userId: userId,
      content: newComment,
    };

    try {
      const res = await api.post(
        `user/posts/suggestions/${postId}`,
        commentData
      );
      console.log(res.data.suggestions);
      console.log(res.data.post);
      setSuggestions(res.data.suggestions);
      setPost(res.data.post);
      setNewComment("");
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  const fetchSuggestions = async () => {
    try {
      let id = Post._id;
      const res = await api.get(`/user/posts/suggestions/${id}`);
      console.log(res.data.suggestion);
      setSuggestions(res.data.suggestion);
    } catch (err) {
      console.error("Failed to fetch suggestions:", err);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, [open]);

  useEffect(() => {
    setPost(post);
  }, [post]);

  // ✅ Fixed: Corrected API endpoint to match backend
  const collabUsers = async () => {
    try {
      let id = post._id;
      const res = await api.get(`/posts/collab-users/${id}`); // Fixed endpoint
      console.log(res.data);
      setCollaborators(res.data);
    } catch (err) {
      console.error("Failed to fetch collaborators:", err);
    }
  };

  useEffect(() => {
    if (open === "collab" && post._id) {
      collabUsers();
    }
  }, [open, post._id]); // Fixed dependency

  const handleLike = async (postId) => {
    try {
      const res = await api.patch(`/user/posts/like/${postId}`, {
        userId,
      });
      setPost(res.data);
    } catch (err) {
      console.error("Failed to like post", err);
    }
  };

  const onNotImpressed = async (postId) => {
    try {
      const res = await api.patch(`/user/posts/impression/${postId}`, {
        userId,
      });
      console.log(res.data);
      setPost(res.data);
    } catch (err) {
      console.error("Failed to update impression:", err);
    }
  };

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

  return (
    <>
      {Post && (
        <div
          className={`lg:max-w-xl rounded-lg relative hover:z-1 max-w-lg lg:pt-1 w-full`}
        >
          <div
            className={`relative ${
              dark ? "bg-white text-black" : "bg-black text-white"
            } backdrop-blur-md p-3 pt-0 pb-2 rounded-lg shadow-md transform hover:scale-100 ${
              !dark && "hover:border-none lg:hover:scale-100"
            } perspective-midrange hover:shadow-xl ${
              !dark && "hover:shadow-white/10"
            } border hover:my-2 border-blue-500/10 transition-all duration-500 ease-in-out cursor-pointer`}
            draggable="true"
          >
            <div className="flex items-center w-full justify-between z-10 relative py-1">
              <span className="text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
                {Post.title}
              </span>

              <div
                className={`flex items-center justify-end lg:gap-x-4 gap-x-2 lg:w-3/12 w-5/12 py-1 text-xs cursor-pointer ${
                  dark ? "text-black" : "text-white"
                }`}
              >
                <span>
                  on{" "}
                  {new Date(Post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>

                <button
                  className={`bg-transparent text-lg transition-all duration-200 hover:scale-110 active:scale-95 ${
                    !dark ? "text-white" : "text-black"
                  }`}
                  aria-label="Post Options"
                  onClick={() => setShowOptions((prev) => !prev)}
                >
                  <svg
                    viewBox="0 0 41.915 41.916"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 fill-current"
                  >
                    <path d="M11.214,20.956c0,3.091-2.509,5.589-5.607,5.589C2.51,26.544,0,24.046,0,20.956c0-3.082,2.511-5.585,5.607-5.585C8.705,15.371,11.214,17.874,11.214,20.956z" />
                    <path d="M26.564,20.956c0,3.091-2.509,5.589-5.606,5.589c-3.097,0-5.607-2.498-5.607-5.589c0-3.082,2.511-5.585,5.607-5.585C24.056,15.371,26.564,17.874,26.564,20.956z" />
                    <path d="M41.915,20.956c0,3.091-2.509,5.589-5.607,5.589c-3.097,0-5.606-2.498-5.606-5.589c0-3.082,2.511-5.585,5.606-5.585C39.406,15.371,41.915,17.874,41.915,20.956z" />
                  </svg>
                </button>
              </div>

              {showOptions && (
                <div className="absolute right-0 top-full mt-2 w-32 bg-black dark:bg-white shadow-lg rounded z-10 text-white dark:text-black text-sm transition-all duration-200 animate-in slide-in-from-top-2">
                  <div className="px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-100 cursor-pointer transition-colors duration-150">
                    Edit
                  </div>
                  <div className="px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-100 cursor-pointer transition-colors duration-150">
                    Delete
                  </div>
                </div>
              )}
            </div>
            <p className="text-sm mt-1 line-clamp-5 mb-2 z-10 relative whitespace-pre-wrap">
              {Post.content}
            </p>
            <div className="flex items-center justify-between text-sm text-white/70 z-10 relative">
              <div className="flex gap-4 text-md">
                <button
                  className={`flex items-center gap-1 text-lg cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 ${
                    dark ? "text-black" : "text-white"
                  }`}
                  onClick={(e) => setOpen((pre) => !pre)}
                >
                  <Lightbulb />
                  {Post.comments.length}
                </button>
                <button
                  onClick={() => {
                    handleLike(Post._id);
                  }}
                  className={`flex focus:outline-none text-lg items-center gap-1 cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 ${
                    dark ? "text-black" : "text-white"
                  }`}
                  aria-label="Toggle Like"
                >
                  <svg
                    className={`w-5 h-5 transition-all duration-200 ${
                      Post.likes.includes(userId) ? "animate-pulse" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={Post.likes.includes(userId) ? "red" : "none"}
                    stroke={
                      Post.likes.includes(userId)
                        ? "red"
                        : dark
                        ? "black"
                        : "white"
                    }
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                  </svg>
                  {Post.likes.length}
                </button>
              </div>

              <div className="flex items-center cursor-pointer">
                <h2
                  onClick={(e) => onNotImpressed(Post._id)}
                  className={`${
                    dark ? "text-black" : "text-white"
                  } text-md mr-1 border font-extralight rounded-full p-1 px-2 transition-all duration-200 hover:scale-105 active:scale-95`}
                >
                  {Post.impressions.includes(userId) ? "Withdraw" : "Collab"}
                </h2>
                {Array(
                  Post.impressions.length < 4 ? Post.impressions.length : 3
                )
                  .fill(0)
                  .map((_, idx) => (
                    <span
                      key={idx}
                      className="h-[30px] w-[30px] rounded-full bg-blue-200 flex items-center justify-center text-sm font-bold border border-white -mr-2 shadow-sm transition-all duration-200 hover:scale-110 hover:z-10 cursor-pointer"
                    >
                      <img src={USER} alt="" />
                    </span>
                  ))}
                <span className="h-[30px] w-[30px] rounded-full bg-white text-black transform flex items-center justify-center text-xs font-bold shadow-sm transition-all duration-200 hover:scale-110 cursor-pointer">
                  {Post.impressions.length}
                </span>
              </div>
            </div>
            {open && (
              <div
                className={`mt-1 mb-0.5 ${
                  dark ? "text-black" : "text-white"
                } relative max-h-72 z-10 max-w-2xl transition-all duration-300 animate-in slide-in-from-top`}
              >
                <h3 className="text-sm font-semibold mt-4 text-blue-500 mb-3">
                  Suggestions
                </h3>
                <ul className="space-y-4 relative max-h-52 overflow-y-auto pr-1">
                  {Post.comments.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">
                      No suggestion yet. Be the first
                    </p>
                  ) : (
                    suggestions &&
                    suggestions?.map((e) => {
                      const commentId = e._id;
                      const isHidden = hiddenComments.has(commentId);

                      return (
                        <li key={commentId} className="flex items-start gap-2">
                          {e.photo ? (
                            <img
                              src={e.photo}
                              alt={e.name}
                              className="w-8 h-8 rounded-full object-cover border border-gray-300 cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-md hover:border-blue-400 active:scale-95"
                            />
                          ) : (
                            <div className="mt-3 cursor-pointer transition-all duration-200 hover:scale-110 hover:text-blue-600 active:scale-95">
                              <User />
                            </div>
                          )}

                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <p
                                onClick={() =>
                                  toggleCommentVisibility(commentId)
                                }
                                className="text-xs font-medium"
                              >
                                {e.name}
                              </p>
                              <p className="text-[10px] text-gray-500">
                                {timeAgo(e.createdAt)}
                              </p>
                            </div>

                            {/* Conditionally rendered comment with smooth animation */}
                            <div
                              className={`transition-all duration-500 ease-out overflow-hidden ${
                                isHidden
                                  ? "max-h-0 opacity-0 transform scale-y-0"
                                  : "max-h-96 opacity-100 transform scale-y-100"
                              }`}
                            >
                              <p className="text-sm mt-0 mb-1 z-10 relative whitespace-pre-wrap">
                                {e.comment}
                              </p>
                            </div>

                            {/* Optional: Show collapsed indicator when hidden */}
                            {isHidden && (
                              <p className="text-xs text-gray-400 italic animate-pulse">
                                Comment hidden • Click user name to show
                              </p>
                            )}
                          </div>
                        </li>
                      );
                    })
                  )}
                </ul>
                <form
                  onSubmit={handleCommentSubmit}
                  className={`mt-6 ${
                    dark ? "bg-white/90" : "bg-black/90"
                  } backdrop-blur-lg rounded-xl border border-white/10 p-4 shadow-sm transition-all duration-200 hover:shadow-md`}
                >
                  <div className="flex items-center gap-3">
                    {user.photo ? (
                      <img
                        src={user.photo}
                        alt={user.name}
                        className="w-9 h-9 rounded-full object-cover ring-1 ring-white/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:ring-2 hover:ring-blue-400/30 cursor-pointer"
                      />
                    ) : (
                      <div className="w-9 h-9 p-2 rounded-full border flex items-center justify-center ring-1 ring-white/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:ring-2 hover:ring-blue-400/30 cursor-pointer">
                        <User
                          className={`${
                            dark ? "text-black" : "text-white/50"
                          } transition-colors duration-300`}
                        />
                      </div>
                    )}

                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Express your suggestion..."
                      className={`flex-1 px-4 py-2.5 text-sm bg-transparent rounded-sm ${
                        dark ? "text-gray-800" : "text-white"
                      }  placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/30 transition-all duration-300 focus:scale-[1.02] focus:shadow-sm`}
                      required
                    />

                    <button
                      type="submit"
                      disabled={!newComment.trim()}
                      className="px-2 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:hover:scale-100"
                    >
                      <span className="inline-flex items-center">Post</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
