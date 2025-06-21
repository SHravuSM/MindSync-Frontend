import { useState } from 'react';
import api1 from '../utils/api1';
import PostSubmitLoader from './PostSubmitLoader';

const Post = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const maxChars = 280;

  const user = {
    name: "Shravan",
    email: "shravan@example.com",
    photo: "https://i.pravatar.cc/100?u=shravan", // placeholder
  };

  const handleTagAdd = (e) => {
    e.preventDefault();
    const newTag = tagInput.trim().toLowerCase();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const post = {
      title,
      content,
      tags,
      user,
      createdAt: new Date(),
      likes: [],
      impressions: [],
      comments: [],
    };

    const res = await api1.post('/posts', post);
    console.log(res)

    console.log(res);

    // Reset form
    setTitle('');
    setContent('');
    setTags([]);
    setTagInput('');
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Composer */}
      <form onSubmit={handleSubmit} className=" border-gray-200 rounded-md p-6 space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">Share a new Idea</h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Title"
          maxLength={100}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-black"
        />

        <textarea
          rows={3}
          maxLength={maxChars}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's your idea?"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md resize-y text-base focus:outline-none focus:ring-2 focus:ring-black"
        />
        <div className="text-sm text-right text-gray-500">{content.length}/{maxChars}</div>

        {/* Tags */}
        <div>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add a tag (e.g. tech)"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              onClick={handleTagAdd}
              className="px-4 py-2 text-sm font-medium bg-black text-white rounded-md hover:bg-gray-800 transition"
              disabled={!tagInput.trim()}
            >
              Add
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-2"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleTagRemove(tag)}
                  className="text-gray-600 hover:text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition"
            disabled={!title.trim() || !content.trim()}
          >
            {!loading ? "Post" : <PostSubmitLoader />}
          </button>
        </div>
      </form>

      {/* Preview */}
      {(title.trim() || content.trim()) && (
        <div className="bg-white border border-gray-200 shadow-md rounded-2xl mt-8 p-6">
          <div className="flex items-start gap-4">
            <img
              src={user.photo}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
              <p className="text-gray-800 whitespace-pre-wrap mt-1">{content}</p>

              {tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-xs text-gray-500 mt-3">
                by {user.name} • {new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
