// import React, { useEffect, useState } from "react";
// import CreatePost from "../components/CreatePost";
// import PostCard from "../components/PostCard";
// import Input from "./Input";
// import pen from "./feather-pen.png";
// import api from "../utils/api1";
// import { useAuthContext } from "../context/AuthContext";
// import { AnimatePresence, motion } from "framer-motion";

// const Feed = () => {
//   const { user } = useAuthContext();
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [appear, setAppear] = useState(false);
//   const [tags, setTags] = useState([]);
//   const [selectedTags, setSelectedTags] = useState([]); // ✅ Multi-select

//   const currentUser = {
//     email: user.email,
//     name: user.name,
//     photo: user.photo,
//   };

//   // 🔄 Toggle tag selection
//   const handleTAG = async (tag) => {
//     const updatedTags = selectedTags.includes(tag)
//       ? selectedTags.filter((t) => t !== tag)
//       : [...selectedTags, tag];

//     setSelectedTags(updatedTags);

//     try {
//       if (updatedTags.length === 0) {
//         fetchPosts();
//       } else {
//         const tagList = updatedTags.map((t) => t.replace("#", "")).join(",");
//         const res = await api.get(`/tags/multiple?tags=${tagList}`);
//         setPosts(res.data);
//       }
//     } catch (err) {
//       console.error("Failed to load posts for tags", err);
//     }
//   };

//   const fetchPosts = async () => {
//     try {
//       const res = await api.get("/posts");
//       setPosts(res.data);
//     } catch (err) {
//       console.error("Failed to load posts", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const fetchTags = async () => {
//       try {
//         const res = await api.get("/tags/all");
//         setTags(res.data);
//       } catch (err) {
//         console.error("Failed to fetch tags:", err);
//       }
//     };

//     fetchTags();
//   }, []);

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const handlePostCreated = (newPost) => {
//     setPosts((prev) => [newPost, ...prev]);
//   };

//   const handleLike = async (postId) => {
//     try {
//       const res = await api.patch(`/posts/like/${postId}`, {
//         uid: user.uid,
//       });
//       setPosts((prev) => prev.map((p) => (p._id === postId ? res.data : p)));
//     } catch (err) {
//       console.error("Failed to like post", err);
//     }
//   };

//   return (
//     <div className="h-full py-2">
//       {/* Tag Selector */}
//       <div className="w-full px-2 py-2 rounded-sm overflow-x-auto scrollbar-hide flex gap-2">
//         {tags.map((tag, index) => (
//           <span
//             key={index}
//             onClick={() => handleTAG(tag)}
//             className={`shrink-0 text-sm font-medium px-4 py-1.5 rounded-full shadow cursor-pointer transition-colors duration-200 ${
//               selectedTags.includes(tag)
//                 ? "bg-blue-600 text-white"
//                 : "bg-white text-gray-800 hover:bg-gray-100"
//             }`}
//           >
//             {tag}
//           </span>
//         ))}
//       </div>

//       {/* Floating Create Button */}
//       <button
//         onClick={() => setAppear((pre) => !pre)}
//         className="fixed bottom-7 right-5 lg:right-12 z-30"
//       >
//         <img
//           src={pen}
//           alt="Write"
//           className="h-12 w-12 lg:h-14 lg:w-14 transition-transform duration-500 hover:scale-125 drop-shadow-xl"
//         />
//       </button>

//       {/* Floating Input */}
//       <div className="fixed bottom-7 left-1/2 transform -translate-x-1/2 w-[50%] sm:w-2/3 md:w-1/2 lg:w-1/3 z-20">
//         <Input setAppear={setAppear} />
//       </div>

//       {/* Create Post Animation */}
//       <AnimatePresence>
//         {appear && (
//           <motion.div
//             key="create-post"
//             initial={{ opacity: 0, scale: 0.9, y: -20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.8, y: -20 }}
//             transition={{
//               type: "spring",
//               stiffness: 300,
//               damping: 20,
//               duration: 0.5,
//             }}
//           >
//             <CreatePost
//               onPostCreated={handlePostCreated}
//               currentUser={currentUser}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Post Feed */}
//       {loading ? (
//         <div className="text-center text-gray-500 mt-10 animate-pulse">
//           Loading posts...
//         </div>
//       ) : posts.length === 0 ? (
//         <div className="text-center text-gray-400 mt-10">
//           No posts to show. Be the first to share something!
//         </div>
//       ) : (
//         <div className="mt-2 space-y-2">
//           {posts.map((post) => (
//             <PostCard key={post._id} post={post} onLike={handleLike} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Feed;

import React, { useState, useRef } from "react";
import { Forward, Heart, MessageCircle } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";
import api from "../utils/api1";

const PostCard = ({ post, onLike }) => {
  const { user } = useAuthContext();
  const liked = post.likes.includes(user.uid);

  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const inputRef = useRef(null);

  const formatDate = (date) => new Date(date).toLocaleString();

  const handleCommentSubmit = async () => {
    const trimmed = commentText.trim();
    if (!trimmed) return;

    const newComment = {
      uid: user.uid,
      name: user.name,
      photo: user.photo,
      comment: trimmed,
      createdAt: new Date().toISOString(), // optional if needed
    };

    // Optimistically update UI
    setComments((prev) => [...prev, newComment]);
    setCommentText("");

    try {
      await api.post(`/posts/comment/${post._id}`, newComment);
      // Do not overwrite comments — backend may return only partial data
    } catch (err) {
      console.error("Comment post failed", err);
      // Optionally remove the new comment or show error toast
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
          className={`flex items-center gap-2 px-3 py-1 rounded-full transition ${
            liked ? "text-red-500 bg-red-50 hover:bg-red-100" : "text-gray-600 hover:bg-gray-100"
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

      {/* Comments Section */}
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
              <Forward className="w-7 h-7" />
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
