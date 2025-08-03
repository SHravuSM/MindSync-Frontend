import { useState } from "react";
import api1 from "../utils/api1";
import PostSubmitLoader from "./PostSubmitLoader";
import useThemeStore from "../store/themeStore";
import useAuthStore from "../store/authStore";

const Post = () => {
  const dark = useThemeStore((s) => s.dark);
  const user = useAuthStore((s) => s.user);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const maxChars = 280;

  const authorId = user._id;
  console.log(authorId, "user id");

  const handleTagAdd = (e) => {
    e.preventDefault();
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setTagInput("");
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const post = {
      title,
      content,
      tags,
      authorId,
      createdAt: new Date(),
      likes: [],
      impressions: [],
      comments: [],
    };
    setLoading(true);
    const res = await api1.post("/user/posts/create-post", post);
    // console.log(res.data.authorId == authorId);
    res.data.authorId == authorId && setLoading(false);

    setTitle("");
    setContent("");
    setTags([]);
    setTagInput("");
  };

  return (
    <div
      className={`max-w-2xl mx-auto px-4 py-6 ${
        dark ? "text-black" : "text-white"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`rounded-md p-6 space-y-4 border ${
          dark ? "border-gray-300 bg-white" : "border-gray-700 bg-[#1f1f1f]"
        }`}
      >
        <h2 className="text-xl font-semibold">Share a new Idea</h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Title"
          maxLength={100}
          required
          className={`w-full px-4 py-2 rounded-md text-base border focus:outline-none focus:ring-2 ${
            dark
              ? "bg-white border-gray-300 text-black focus:ring-black"
              : "bg-[#2a2a2a] border-gray-600 text-white focus:ring-white"
          }`}
        />

        <textarea
          rows={3}
          maxLength={maxChars}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's your idea?"
          required
          className={`w-full px-4 py-3 rounded-md resize-y text-base border focus:outline-none focus:ring-2 ${
            dark
              ? "bg-white border-gray-300 text-black focus:ring-black"
              : "bg-[#2a2a2a] border-gray-600 text-white focus:ring-white"
          }`}
        />
        <div className="text-sm text-right text-gray-500">
          {content.length}/{maxChars}
        </div>

        <div>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add a tag (e.g. tech)"
              className={`flex-grow px-4 py-2 rounded-md text-sm border focus:outline-none focus:ring-2 ${
                dark
                  ? "bg-white border-gray-300 text-black focus:ring-black"
                  : "bg-[#2a2a2a] border-gray-600 text-white focus:ring-white"
              }`}
            />
            <button
              onClick={handleTagAdd}
              className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                dark
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
              disabled={!tagInput.trim()}
            >
              Add
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className={`px-3 py-1 text-sm rounded-full flex items-center gap-2 ${
                  dark ? "bg-gray-200 text-black" : "bg-gray-700 text-white"
                }`}
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleTagRemove(tag)}
                  className={`${
                    dark
                      ? "text-gray-600 hover:text-red-500"
                      : "text-gray-300 hover:text-red-400"
                  }`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className={`px-6 py-2 font-medium rounded-md transition ${
              dark
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-white text-black hover:bg-gray-100"
            }`}
            disabled={!title.trim() || !content.trim()}
          >
            {!loading ? "Post" : <PostSubmitLoader />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Post;
