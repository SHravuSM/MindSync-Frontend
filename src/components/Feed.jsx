import { useEffect, useState } from "react";
import CreatePost from "./Post";
import api from "../utils/api1";
import { useAuthStore } from "../context/AuthContext";
import Card from "./Card";
import Loader from "./PostLoader";

const Feed = () => {
  const { user, setYes, dark } = useAuthStore();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
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
        const res = await api.get(`/tags/${tag}`);
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

  return (
    <div className="flex flex-col h-full items-center justify-start w-full p-0">

      {/* Tag Selector */}
      <div className="px-2 py-1 mt-0 w-full rounded-sm overflow-x-auto scrollbar-hide flex gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            onClick={() => handleTAG(tag)}
            className={`shrink-0 text-sm font-medium px-4 py-1.5 rounded-full shadow cursor-pointer transition-colors duration-200 ${selectedTag === tag
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
          >
            #{tag}
          </span>
        ))}
      </div>

      {loading ? (
        <div className=" absolute left-1/2 top-52 text-center text-gray-500">
          <Loader />
        </div>
      ) : posts.length === 0 ? (
        <div className="lg:flex lg:items-center lg:justify-center lg:min-h-screen text-center text-gray-400 mt-10">
          No posts to show. Be the first to share something!
        </div>
      ) : (
        <div className="h-full mt-0 p-0 pb-12 lg:pb-14 w-full scrollbar-hidden flex flex-col overflow-y-auto items-center justify-start space-y-1 ">
          {posts.map((post) => (
            <Card key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;