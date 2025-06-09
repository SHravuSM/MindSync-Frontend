import React, { useState } from "react";
import api from "../utils/api1";
import { useAuthStore } from "../context/AuthContext";

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const { user } = useAuthStore();
  const [tags, setTags] = useState();

  const handlePost = async () => {
    if (!content.trim()) return;

    const processedTags = tags
      .split(",")
      .map((tag) => tag.trim().replace(/^/, ""))
      .filter((tag) => tag.length > 0);

    try {
      console.log("Creating post with content:", content, "and tags:", processedTags);
      const res = await api.post("/posts", {
        content,
        tags: processedTags,
        user: {
          name: user.name,
          uid: user.uid,
          photo: user.photo,
        },
      });
      onPostCreated(res.data);
      setContent("");
      setTags("");
    } catch (err) {
      console.error("Failed to post", err);
    }
  };

  return (
    <div className="bg-white p-4 duration-700 rounded shadow mb-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's happening?"
        className="w-full p-2 border rounded mb-2 resize-none"
      />
      <input
        type="text"
        placeholder="ex: #AI, #Startup"
        className="w-full p-2 border rounded mb-2 resize-none"
        onChange={(e) => setTags(e.target.value)}
        value={tags}
      />
      <button
        onClick={handlePost}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Post
      </button>
    </div>
  );
};

export default CreatePost;

// import React, { useState } from "react";
// import api from "../utils/api2";
// import { useAuthStore } from "../context/AuthContext";

// const CreatePost = ({ onPostCreated }) => {
//   const { user } = useAuthStore();
//   const [content, setContent] = useState("");
//   const [tags, setTags] = useState("");

//   return (
//     <div className="bg-white rounded-xl shadow-sm border p-5 mb-6">
//       <textarea
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         placeholder="What's on your mind?"
//         className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md p-3 resize-none text-sm mb-3"
//         rows={4}
//       />
//       <input
//         type="text"
//         value={tags}
//         onChange={(e) => setTags(e.target.value)}
//         placeholder="Add tags separated by commas (e.g., AI, Startup)"
//         className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md p-3 text-sm mb-3"
//       />
//       <div className="flex justify-end">
//         <button
//           onClick={handlePost}
//           className="bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
//           disabled={!content.trim()}
//         >
//           Post
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreatePost;
