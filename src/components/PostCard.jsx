// import React from "react";
// import { useAuthContext } from "../context/AuthContext";

// const PostCard = ({ post, onLike }) => {
//   const { user } = useAuthContext();
//   const liked = post.likes.includes(user.uid); // Replace with currentUser.uid in real app

//   return (
//     <div className="bg-white p-4 rounded shadow mb-4">
//       <div className="flex items-start gap-3">
//         <img
//           src={post.user.photo}
//           alt="avatar"
//           className="h-10 w-10 rounded-full"
//         />
//         <div>
//           <p className="font-semibold">{post.user.name}</p>
//           <p className="text-gray-700">{post.content}</p>
//           <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
//             <button onClick={() => onLike(post._id)}>
//               {liked ? "❤️" : "🤍"} ({post.likes.length})
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostCard;

// import React from "react";
// import { useAuthContext } from "../context/AuthContext";
// import { Heart } from "lucide-react"; // You can use Lucide or Heroicons

// const PostCard = ({ post, onLike }) => {
//   const { user } = useAuthContext();
//   const liked = post.likes.includes(user.uid);

//   return (
//     <div className="bg-white rounded-md shadow-md p-5 mb-6 transition-all hover:shadow-lg">
//       {/* Header: Avatar + Name + Timestamp */}
//       <div className="flex items-start justify-between">
//         <div className="flex items-center gap-3">
//           <img
//             src={post.user.photo}
//             alt="avatar"
//             className="w-11 h-11 rounded-full object-cover border border-gray-200"
//           />
//           <div>
//             <p className="font-semibold text-gray-800">{post.user.name}</p>
//             <p className="text-xs text-gray-400">
//               {new Date(post.createdAt).toLocaleString()}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Post Content */}
//       <p className="mt-4 text-gray-700 text-[15px] leading-relaxed">
//         {post.content}
//       </p>

//       {/* Tags */}
//       {post.tags && post.tags.length > 0 && (
//         <div className="mt-3 flex flex-wrap gap-2">
//           {post.tags.map((tag, index) => (
//             <span
//               key={index}
//               className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full"
//             >
//               #{tag}
//             </span>
//           ))}
//         </div>
//       )}

//       {/* Footer: Like & Actions */}
//       <div className="mt-4 flex items-center justify-start gap-4 text-sm text-gray-600">
//         <button
//           onClick={() => onLike(post._id)}
//           className={`flex items-center gap-1 px-3 py-1 rounded-full transition hover:bg-red-50 ${
//             liked ? "text-red-500 font-semibold" : "text-gray-600"
//           }`}
//         >
//           <Heart
//             className={`w-4 h-4 ${liked ? "fill-red-500 stroke-red-500" : ""}`}
//           />
//           {post.likes.length}
//         </button>
//         {/* You can add comment or share icons here */}
//       </div>
//     </div>
//   );
// };

// export default PostCard;

// import React from "react";
// import { useAuthContext } from "../context/AuthContext";
// import { Heart } from "lucide-react";
// import close from "./close.png";

// const PostCard = ({ post, onLike }) => {
//   const { user } = useAuthContext();
//   const liked = post.likes.includes(user.uid);

//   return (
//     <div className="bg-white w-full relative rounded-md shadow-md pb-3 p-4 sm:p-5 mb-6 transition-all hover:shadow-lg">
//       {/* Header */}
//       <img className="h-4 absolute right-1 top-1" src={close} alt="" />
//       <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
//         <div className="flex items-center gap-3">
//           <img
//             src={post.user.photo}
//             alt="avatar"
//             className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border border-gray-200"
//           />
//           <div>
//             <p className="text-sm sm:text-base font-semibold text-gray-800">
//               {post.user.name}
//             </p>
//             <p className="text-xs text-gray-400">
//               {new Date(post.createdAt).toLocaleString()}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Post Content */}
//       <p className="mt-4 text-sm sm:text-[15px] text-gray-700 leading-relaxed break-words">
//         {post.content}
//       </p>

//       {/* Footer */}
//       <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
//         <button
//           onClick={() => onLike(post._id)}
//           className={`flex items-center gap-1 px-3 py-1 rounded-full transition hover:bg-red-50 ${
//             liked ? "text-red-500 font-semibold" : "text-gray-600"
//           }`}
//         >
//           <Heart
//             className={`w-4 h-4 ${liked ? "fill-red-500 stroke-red-500" : ""}`}
//           />
//           {post.likes.length}
//         </button>
//         <button>// comment icon</button>
//       </div>
//       {post.tags.map((e) => {
//         return (
//           <span className="font-semibold text-sm mt-3 px-2 py-1 rounded-lg bg-indigo-50 m-[2px]">
//             {e}{" "}
//           </span>
//         );
//       })}
//     </div>
//   );
// };

// export default PostCard;

// import React from "react";
// import { useAuthContext } from "../context/AuthContext";
// import { Heart, MessageCircle, X } from "lucide-react";

// const PostCard = ({ post, onLike }) => {
//   const { user } = useAuthContext();
//   const liked = post.likes.includes(user.uid);

//   const formatDate = (date) => new Date(date).toLocaleString();

//   return (
//     <div className="bg-white w-full rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all p-3 relative mb-2">
//       {/* Header */}
//       <div className="flex items-start gap-4">
//         <img
//           src={post.user.photo}
//           alt="User"
//           className="w-11 h-11 rounded-full object-cover border"
//         />

//         <div className="flex-1">
//           <h2 className="text-sm font-semibold text-gray-800">
//             {post.user.name}
//           </h2>
//           <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
//         </div>
//       </div>

//       {/* Content */}
//       <p className="m-2 text-md text-gray-800 leading-relaxed whitespace-pre-wrap break-words">
//         {post.content}
//       </p>

//       {/* Footer */}
//       <div className="mt-3 mb-2 flex gap-4 items-center text-sm">
//         <button
//           onClick={() => onLike(post._id)}
//           className={`flex items-center gap-2 px-3 py-1 rounded-full transition ${
//             liked
//               ? "text-red-500 bg-red-50 hover:bg-red-100"
//               : "text-gray-600 hover:bg-gray-100"
//           }`}
//         >
//           <Heart
//             className={`w-4 h-4 transition ${
//               liked ? "fill-red-500 stroke-red-500" : ""
//             }`}
//           />
//           {post.likes.length}
//         </button>

//         <button className="flex items-center gap-2 px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-full">
//           <MessageCircle className="w-4 h-4" />
//           Comment
//         </button>
//       </div>
//       {post.tags?.length > 0 && (
//         <div className="flex flex-wrap gap-1 lg:gap-2">
//           {post.tags.map((tag, index) => (
//             <span
//               key={index}
//               className="text-xs font-medium bg-black/80 text-white px-2 py-1 rounded-full"
//             >
//               {tag}
//             </span>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostCard;



// import React, { useState } from "react";
// import { Heart, MessageCircle } from "lucide-react";
// import { useAuthContext } from "../context/AuthContext";
// import api from "../utils/api2";

// const PostCard = ({ post, onLike }) => {
//   const { user } = useAuthContext();
//   const liked = post.likes.includes(user.uid);

//   const [commentText, setCommentText] = useState("");
//   const [showInput, setShowInput] = useState(false);
//   const [comments, setComments] = useState(post.comments || []);

//   const formatDate = (date) => new Date(date).toLocaleString();

//   const handleCommentSubmit = async () => {
//     if (!commentText.trim()) return;

//     try {
//       const res = await api.post(`/posts/comment/${post._id}`, {
//         uid: user.uid,
//         name: user.name,
//         photo: user.photo,
//         comment: commentText,
//       });

//       setComments(res.data); // updated comments
//       setCommentText("");
//       setShowInput(false);
//     } catch (err) {
//       console.error("Failed to post comment", err);
//     }
//   };

//   return (
//     <div className="bg-white w-full rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all p-3 relative">
//       {/* Header */}
//       <div className="flex items-start gap-4">
//         <img
//           src={post.user.photo}
//           alt="User"
//           className="w-11 h-11 rounded-full object-cover border"
//         />
//         <div className="flex-1">
//           <h2 className="text-sm font-semibold text-gray-800">{post.user.name}</h2>
//           <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
//         </div>
//       </div>

//       {/* Content */}
//       <p className="m-2 text-md text-gray-800 leading-relaxed whitespace-pre-wrap break-words">
//         {post.content}
//       </p>

//       {/* Footer */}
//       <div className="mt-3 mb-2 flex gap-4 items-center text-sm">
//         <button
//           onClick={() => onLike(post._id)}
//           className={`flex items-center gap-2 px-3 py-1 rounded-full transition ${liked ? "text-red-500 bg-red-50 hover:bg-red-100" : "text-gray-600 hover:bg-gray-100"
//             }`}
//         >
//           <Heart className={`w-4 h-4 transition ${liked ? "fill-red-500 stroke-red-500" : ""}`} />
//           {post.likes.length}
//         </button>

//         <button
//           onClick={() => setShowInput(!showInput)}
//           className="flex items-center gap-2 px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-full"
//         >
//           <MessageCircle className="w-4 h-4" />
//           Comment
//         </button>
//       </div>

//       {/* Comment Input */}
//       {showInput && (
//         <div className="mb-2">
//           <input
//             type="text"
//             placeholder="Write a comment..."
//             value={commentText}
//             onChange={(e) => setCommentText(e.target.value)}
//             className="w-full p-2 border rounded-lg text-sm"
//           />
//           <button
//             onClick={handleCommentSubmit}
//             className="mt-1 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1 rounded-lg"
//           >
//             Post
//           </button>
//         </div>
//       )}

//       {/* Comment List */}
//       {comments.length > 0 && (
//         <div className="mt-2 space-y-2">
//           {comments.map((c, index) => (
//             <div key={index} className="flex items-start gap-2">
//               <img src={c.photo} alt="User" className="w-8 h-8 rounded-full" />
//               <div className="bg-gray-100 px-3 py-2 rounded-lg w-full">
//                 <p className="text-sm font-semibold">{c.name}</p>
//                 <p className="text-sm text-gray-700">{c.comment}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Tags */}
//       {post.tags?.length > 0 && (
//         <div className="flex flex-wrap gap-1 lg:gap-2 mt-3">
//           {post.tags.map((tag, index) => (
//             <span
//               key={index}
//               className="text-xs font-medium bg-black/80 text-white px-2 py-1 rounded-full"
//             >
//               {tag}
//             </span>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostCard;


// import React, { useState, useRef, useEffect } from "react";
// import { Heart, MessageCircle } from "lucide-react";
// import { useAuthContext } from "../context/AuthContext";
// import api from "../utils/api2";

// const PostCard = ({ post, onLike }) => {
//   const { user } = useAuthContext();
//   const liked = post.likes.includes(user.uid);

//   const [commentText, setCommentText] = useState("");
//   const [showInput, setShowInput] = useState(false);
//   const [comments, setComments] = useState(post.comments || []);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     if (showInput && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [showInput]);

//   const formatDate = (date) => new Date(date).toLocaleString();

//   const handleCommentSubmit = async () => {
//     const trimmed = commentText.trim();
//     if (!trimmed) return;

//     // Optimistic UI update
//     const newComment = {
//       uid: user.uid,
//       name: user.name,
//       photo: user.photo,
//       comment: trimmed,
//     };
//     setComments([...comments, newComment]);
//     setCommentText("");

//     try {
//       const res = await api.post(`/posts/comment/${post._id}`, newComment);
//       setComments(res.data); // Set latest comments from server
//     } catch (err) {
//       console.error("Failed to post comment", err);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleCommentSubmit();
//     }
//   };

//   return (
//     <div className="bg-white w-full rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all p-4 relative">
//       {/* Header */}
//       <div className="flex items-start gap-4">
//         <img
//           src={post.user.photo}
//           alt="User"
//           className="w-11 h-11 rounded-full object-cover border"
//         />
//         <div className="flex-1">
//           <h2 className="text-sm font-semibold text-gray-800">{post.user.name}</h2>
//           <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
//         </div>
//       </div>

//       {/* Content */}
//       <p className="mt-3 mb-2 text-md text-gray-800 leading-relaxed whitespace-pre-wrap break-words">
//         {post.content}
//       </p>

//       {/* Actions */}
//       <div className="mt-2 mb-2 flex gap-4 items-center text-sm">
//         <button
//           onClick={() => onLike(post._id)}
//           className={`flex items-center gap-2 px-3 py-1 rounded-full transition ${liked ? "text-red-500 bg-red-50 hover:bg-red-100" : "text-gray-600 hover:bg-gray-100"
//             }`}
//         >
//           <Heart className={`w-4 h-4 transition ${liked ? "fill-red-500 stroke-red-500" : ""}`} />
//           {post.likes.length}
//         </button>

//         <button
//           onClick={() => setShowInput((prev) => !prev)}
//           className="flex items-center gap-2 px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-full"
//         >
//           <MessageCircle className="w-4 h-4" />
//           Comment
//         </button>
//       </div>

//       {/* Comment Input */}
//       {showInput && (
//         <div className="mb-2">
//           <div className="flex gap-2 items-start">
//             <img
//               src={user.photo}
//               alt="You"
//               className="w-9 h-9 rounded-full border object-cover"
//             />
//             <div className="flex-1">
//               <textarea
//                 ref={inputRef}
//                 rows={1}
//                 placeholder="Write a comment..."
//                 value={commentText}
//                 onChange={(e) => setCommentText(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 className="w-full resize-none p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <div className="flex justify-end mt-1">
//                 <button
//                   onClick={handleCommentSubmit}
//                   className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1 rounded-lg transition"
//                 >
//                   Post
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Comment List */}
//       {comments.length > 0 && (
//         <div className="mt-3 max-h-64 overflow-y-auto pr-1 space-y-3">
//           {comments.map((c, index) => (
//             <div key={index} className="flex items-start gap-2">
//               <img src={c.photo} alt="User" className="w-8 h-8 rounded-full object-cover border" />
//               <div className="bg-gray-100 px-3 py-2 rounded-xl max-w-[85%]">
//                 <p className="text-sm font-semibold">{c.name}</p>
//                 <p className="text-sm text-gray-800">{c.comment}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Tags */}
//       {post.tags?.length > 0 && (
//         <div className="flex flex-wrap gap-1 lg:gap-2 mt-4">
//           {post.tags.map((tag, index) => (
//             <span
//               key={index}
//               className="text-xs font-medium bg-black/80 text-white px-2 py-1 rounded-full"
//             >
//               {tag}
//             </span>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostCard;


import React, { useState, useRef, useEffect } from "react";
import { Forward, Heart, MessageCircle, Send } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";
import api from "../utils/api2";

const PostCard = ({ post, onLike }) => {
  const { user } = useAuthContext();
  const liked = post.likes.includes(user.uid);

  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const inputRef = useRef(null);

  useEffect(() => {
    if (showComments && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showComments]);

  const formatDate = (date) => new Date(date).toLocaleString();

  const handleCommentSubmit = async () => {
    const trimmed = commentText.trim();
    if (!trimmed) return;

    const newComment = {
      uid: user.uid,
      name: user.name,
      photo: user.photo,
      comment: trimmed,
    };

    setComments((prev) => [...prev, newComment]);
    setCommentText("");

    try {
      const res = await api.post(`/posts/comment/${post._id}`, newComment);
      setComments(res.data);
    } catch (err) {
      console.error("Comment post failed", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  return (
    <div className="bg-white w-full border rounded-sm border-gray-200 shadow-sm hover:shadow-lg transition-all p-4 relative">
      {/* Post Header */}
      <div className="flex items-start gap-4">
        <img
          src={post.user.photo}
          alt="User"
          className="w-11 h-11 rounded-full object-cover border"
        />
        <div className="flex-1">
          <h2 className="text-sm font-semibold text-gray-800">{post.user.name}</h2>
          <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
        </div>
      </div>

      {/* Post Content */}
      <p className="mt-3 mb-2 text-md text-gray-800 leading-relaxed whitespace-pre-wrap break-words">
        {post.content}
      </p>

      {/* Actions */}
      <div className="mt-2 mb-2 flex gap-4 items-center text-sm">
        <button
          onClick={() => onLike(post._id)}
          className={`flex items-center gap-2 px-3 py-1 rounded-full transition ${liked ? "text-red-500 bg-red-50 hover:bg-red-100" : "text-gray-600 hover:bg-gray-100"
            }`}
        >
          <Heart className={`w-4 h-4 transition ${liked ? "fill-red-500 stroke-red-500" : ""}`} />
          {post.likes.length}
        </button>

        <button
          onClick={() => setShowComments((prev) => !prev)}
          className="flex items-center gap-2 px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-full"
        >
          <MessageCircle className="w-4 h-4" />
          Comment
        </button>
      </div>

      {/* Comments Section (conditionally rendered) */}
      {showComments && (
        <div className="transition-all duration-200 ease-in-out space-y-4 m-4">
          {/* Comment List */}
          {comments.length > 0 && (
            <div className="max-h-64 overflow-y-auto pr-1 space-y-3">
              {comments.map((c, index) => (
                <div key={index} className="flex items-start gap-2">
                  <img
                    src={c.photo}
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover border"
                  />
                  <div className="bg-gray-100 px-3 py-2 rounded-xl max-w-[85%]">
                    <p className="text-sm font-semibold">{c.name}</p>
                    <p className="text-sm text-gray-800">{c.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Comment Input */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-full px-2 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
            <img
              src={user.photo}
              alt="You"
              className="w-8 h-8 rounded-full object-cover border"
            />
            <input
              ref={inputRef}
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add a comment..."
              className="flex-1 text-sm focus:outline-none placeholder-gray-400 bg-transparent"
            />
            <button onClick={handleCommentSubmit} className="text-blue-500 hover:text-blue-600">
              <Forward className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 lg:gap-2 mt-4">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs font-medium bg-black/80 text-white px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;
