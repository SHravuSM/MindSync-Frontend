import React, { useState, useRef } from "react";
import { Forward, Heart, MessageCircle } from "lucide-react";
import { useAuthStore } from "../context/AuthContext";
import api from "../utils/api1";

const PostCard = ({ post, onLike, onImpressed }) => {
  const { user } = useAuthStore();
  console.log(user)
  const liked = post.likes.includes(user.uid);

  const [commentText, setCommentText] = useState("");
  console.log(post)
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
      comment: trimmed,
      photo: user.photo,
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
      {user.role == 'creator' && <div className="mt-2 mb-2 flex gap-4 items-center text-sm">
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
      </div>}

      {user.role == 'investor' && <div className="mt-2 mb-2 flex gap-4 items-center text-sm">
        <button
          onClick={() => onImpressed(post._id)}
          className={`flex items-center gap-2 px-3 py-1 rounded-full transition ${liked ? "text-red-500 bg-red-50 hover:bg-red-100" : "text-gray-600 hover:bg-gray-100"
            }`}
        >
          {/* <Heart className={`w-4 h-4 transition ${liked ? "fill-red-500 stroke-red-500" : ""}`} /> */}
          Show impression
          {post.impressions}
        </button>
      </div>}

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