import React, { useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import Input from "./Input";
import pen from "./feather-pen.png";
import api from "../utils/api1";
import { useAuthContext } from "../context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";

const Feed = () => {
  const { user } = useAuthContext();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appear, setAppear] = useState(false);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null); // 👈 New state to track selected tag

  const currentUser = {
    email: user.email,
    name: user.name,
    photo: user.photo,
  };

  const handleTAG = async (tag) => {
    const isSameTag = selectedTag === tag;
    setSelectedTag(isSameTag ? null : tag);

    try {
      if (isSameTag) {
        fetchPosts(); // If same tag clicked again, reset to all posts
      } else {
        const tagg = tag.replace("#", "");
        const res = await api.get(`/tags/${tagg}`);
        setPosts(res.data);
      }
    } catch (err) {
      console.error("Failed to load posts", err);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to load posts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await api.get("/tags/all");
        setTags(res.data);
      } catch (err) {
        console.error("Failed to fetch tags:", err);
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleLike = async (postId) => {
    try {
      const res = await api.patch(`/posts/like/${postId}`, {
        uid: user.uid,
      });
      setPosts((prev) => prev.map((p) => (p._id === postId ? res.data : p)));
    } catch (err) {
      console.error("Failed to like post", err);
    }
  };

  return (
    <div className="h-full py-2">
      {/* Tag Selector */}
      <div className="w-full px-2 py-2 rounded-sm overflow-x-auto scrollbar-hide flex gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            onClick={() => handleTAG(tag)}
            className={`shrink-0 text-sm font-medium px-4 py-1.5 rounded-full shadow cursor-pointer transition-colors duration-200 ${selectedTag === tag
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Floating Create Button */}
      {/* <button
        onClick={() => setAppear((pre) => !pre)}
        className="fixed p-4 bg-blue-500 rounded-full bottom-7 right-5 lg:right-12 z-30"
      >
        <img
          src={pen}
          alt="Write"
          className="h-10 w-10 lg:h-14 lg:w-14 transition-transform duration-500 hover:scale-125 drop-shadow-xl"
        />
      </button> */}

      <button
        onClick={() => setAppear((pre) => !pre)}
        className="fixed bottom-4 right-4 lg:bottom-7 lg:right-12 z-30 group"
      >
        {/* Glow & Pulse */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 blur-md opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-500 animate-pulse"></div>

        {/* Button Container */}
        <div className="relative p-2 sm:p-3 lg:p-4 bg-blue-600 hover:bg-blue-700 rounded-full shadow-xl transition-all duration-300 scale-100 hover:scale-105 active:scale-95">
          <img
            src={pen}
            alt="Write"
            className="h-7 w-7 sm:h-9 sm:w-9 lg:h-9 lg:w-9 transition-transform duration-500 hover:rotate-[15deg] drop-shadow-xl"
          />
        </div>

        {/* Tooltip */}
        <span className="absolute right-full mr-2 sm:mr-3 bottom-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-1 rounded shadow-md">
        New idea
        </span>
      </button>


      {/* Floating Input */}
      <div className="fixed bottom-7 left-1/2 transform -translate-x-1/2 w-[50%] sm:w-2/3 md:w-1/2 lg:w-1/3 z-20">
        {/* <Input setAppear={setAppear} /> */}
      </div>

      {/* Create Post Animation */}
      <AnimatePresence>
        {appear && (
          <motion.div
            key="create-post"
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.5,
            }}
          >
            <CreatePost
              onPostCreated={handlePostCreated}
              currentUser={currentUser}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Post Feed */}
      {loading ? (
        <div className="text-center text-gray-500 mt-10 animate-pulse">
          Loading posts...
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">
          No posts to show. Be the first to share something!
        </div>
      ) : (
        <div className="mt-2 space-y-2">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} onLike={handleLike} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;