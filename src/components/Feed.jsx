import { useEffect, useState } from "react";
import CreatePost from "./Post";
import api from "../utils/api1";
import { useAuthStore } from "../context/AuthContext";
import Card from "./Card";

const Feed = () => {
  const { user, setYes } = useAuthStore();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appear, setAppear] = useState(false);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null); // 👈 New state to track selected tag

  useEffect(() => {
    setYes(false)
  }, [])

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
      const res = await api.get("/posts/posts");
      console.log(res.data)
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

  const onImpressed = async (postId) => {
    const res = await api.patch(`/posts/impression/${postId}`, {
      uid: user.uid
    })
    setPosts((prev) => prev.map((p) => (p._id === postId ? res.data : p)));
  }

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
    <div className="h-full overflow-y-auto w-full p-2">

      {/* Tag Selector */}
      <div className="w-full px-2 py-1 mt-0 rounded-sm overflow-x-auto scrollbar-hide flex gap-2">
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

      {/* Post Feed */}
      {/* {loading ? (
        <div className="text-center text-gray-500 mt-10 animate-pulse">
          Loading posts...
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">
          No posts to show. Be the first to share something!
        </div>
      ) : (
        <div className="mt-2 relative space-y-2">
          {posts.map((post) => (
            <Card key={post._id} post={post} onImpressed={onImpressed} handleLike={handleLike} />
          ))}
        </div>
      )} */}

      {loading ? (
        <div className="flex items-center justify-center min-h-screen text-center text-gray-500 mt-10 animate-pulse">
          Loading posts...
        </div>
      ) : posts.length === 0 ? (
        <div className="lg:flex lg:items-center lg:justify-center lg:min-h-screen text-center text-gray-400 mt-10">
          No posts to show. Be the first to share something!
        </div>
      ) : (
        <div className="mt-2 flex flex-col items-center justify-center relative space-y-2">
          {posts.map((post) => (
            <Card key={post._id} post={post} onImpressed={onImpressed} handleLike={handleLike} />
          ))}
        </div>
      )}


    </div>
  );
};

export default Feed;