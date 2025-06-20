// import { useEffect, useState } from 'react';
// import { useAuthStore } from '../context/AuthContext';

// const CreatePost = () => {
//   const [content, setContent] = useState('');
//   const [tags, setTags] = useState([]);
//   const [tagInput, setTagInput] = useState('');

//   const maxChars = 280;

//   const handleTagAdd = (e) => {
//     e.preventDefault();
//     const newTag = tagInput.trim();
//     if (newTag && !tags.includes(newTag)) {
//       setTags([...tags, newTag]);
//       setTagInput('');
//     }
//   };

//   const handleTagRemove = (tagToRemove) => {
//     setTags(tags.filter((tag) => tag !== tagToRemove));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const post = {
//       content,
//       tags,
//       createdAt: new Date(),
//       likes: [],
//       impressions: [],
//       comments: [],
//     };

//     console.log('Post submitted:', post);
//     alert('Post created! Check console.');

//     // Reset form
//     setContent('');
//     setTags([]);
//     setTagInput('');
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 px-4">
//       {/* Post Composer */}
//       <div className="bg-white shadow-md rounded-xl p-6 mb-8">
//         Idea
//         <form onSubmit={handleSubmit}>
//           <div className="flex gap-4 items-start">
//             {/* Avatar */}
//             <div className="flex-shrink-0">
//             </div>

//             {/* Post Input */}
//             <div className="flex-grow">
//               <textarea
//                 rows={3}
//                 maxLength={maxChars}
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 placeholder="What's happening?"
//                 className="w-full text-lg px-3 py-2 border border-gray-300 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               <div className="text-sm text-right text-gray-500 mt-1">{content.length}/{maxChars}</div>

//               {/* Tags */}
//               <div className="mt-4">
//                 <div className="flex gap-2">
//                   <input
//                     type="text"
//                     value={tagInput}
//                     onChange={(e) => setTagInput(e.target.value)}
//                     placeholder="Add tag (e.g. tech)"
//                     className="flex-grow px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   <button
//                     onClick={handleTagAdd}
//                     className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
//                   >
//                     Add
//                   </button>
//                 </div>
//                 <div className="mt-2 flex flex-wrap gap-2">
//                   {tags.map((tag, idx) => (
//                     <span
//                       key={idx}
//                       className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-2"
//                     >
//                       #{tag}
//                       <button
//                         type="button"
//                         onClick={() => handleTagRemove(tag)}
//                         className="text-red-500 font-bold"
//                       >
//                         ×
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Submit */}
//               <div className="mt-4 text-right">
//                 <button
//                   type="submit"
//                   className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition shadow-sm"
//                 >
//                   Post
//                 </button>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>

//       {/* Live Post Preview */}
//       {content.trim() && (
//         <div className="bg-white shadow rounded-xl p-6">
//           <div className="flex gap-4 items-start">
//             {/* Avatar */}
//             <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white text-lg font-bold">
//               🧑
//             </div>

//             {/* Post Content */}
//             <div className="flex-grow">
//               <div className="text-gray-800 text-base mb-2 whitespace-pre-wrap">{content}</div>
//               {tags.length > 0 && (
//                 <div className="mt-2 flex flex-wrap gap-2">
//                   {tags.map((tag, idx) => (
//                     <span
//                       key={idx}
//                       className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
//                     >
//                       #{tag}
//                     </span>
//                   ))}
//                 </div>
//               )}
//               <p className="text-xs text-gray-500 mt-3">
//                 {new Date().toLocaleString()}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreatePost;

import { useState } from 'react';

const Post = () => {
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const maxChars = 280;

  const handleTagAdd = (e) => {
    e.preventDefault();
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const post = {
      content,
      tags,
      createdAt: new Date(),
    };

    console.log('Post submitted:', post);
    alert('Post created! Check console.');

    setContent('');
    setTags([]);
    setTagInput('');
  };

  return (
    <div className=" mx-auto px-4 py-5">
      {/* Composer */}
      <div className="bg-white/70 backdrop-blur-md border-gray-200 shadow-md rounded-2xl p-6">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Start an Idea</h2>

          <textarea
            rows={4}
            maxLength={maxChars}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your idea..."
            className="w-full text-base px-4 py-3 border border-gray-300 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-gray-600 bg-white text-gray-800"
            required
          />
          <div className="text-sm text-right text-gray-500 mt-1">{content.length}/{maxChars}</div>

          {/* Tags */}
          <div className="mt-5">
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add tag"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-600 bg-white"
              />
              <button
                onClick={handleTagAdd}
                className="px-4 py-2 text-sm font-medium bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
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
          <div className="mt-6 text-right">
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition"
            >
              Post
            </button>
          </div>
        </form>
      </div>

      {/* Preview */}
      {content.trim() && (
        <div className="bg-white border border-gray-200 shadow-md rounded-2xl mt-8 p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white text-lg font-semibold">👤</div>
            <div className="flex-1">
              <p className="text-gray-800 whitespace-pre-wrap">{content}</p>
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
                {new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
