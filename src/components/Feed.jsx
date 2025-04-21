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
  const [tags, setTags] = useState([])

  console.log(user)
  const currentUser = {
    email: user.email,
    name: user.name,
    photo: user.photo,
  };

  const handleTAG = async (tag) => {
    try {
      const tagg = tag.replace("#", "");
      console.log(tag);
      const res = await api.get(`/tags/${tagg}`);
      console.log(res.data);
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to load posts", err);
    }
  }

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");
      setPosts(res.data);
      // console.log(res.data);
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
      {/* Post Creation with MacOS style animation */}
      <div className="w-full px-2 py-2 rounded-sm overflow-x-auto scrollbar-hide flex gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            onClick={() => handleTAG(tag)}
            className="shrink-0 bg-white text-gray-800 text-sm font-medium px-4 py-1.5 rounded-full shadow hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
          >
            {tag}
          </span>
        ))}
      </div>
      <button
        onClick={() => setAppear((pre) => !pre)}
        className="fixed bottom-7 right-5 lg:right-12 z-30"
      >
        <img
          src={pen}
          alt="Write"
          className="h-12 w-12 lg:h-14 lg:w-14 transition-transform duration-500 hover:scale-125 drop-shadow-xl"
        />
      </button>

      {/* Floating Input Field (Bottom-Center) */}
      <div className="fixed bottom-7 left-1/2 transform -translate-x-1/2 w-[50%] sm:w-2/3 md:w-1/2 lg:w-1/3 z-20">
        <Input setAppear={setAppear} />
      </div>
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

      {/* Loading State */}
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
