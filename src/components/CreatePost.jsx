// // import Post from "./Post";
// // import Pitch from "./Pitch";
// // import useThemeStore from "../store/themeStore";

// // export default function CreatePost() {
// //   const { yes, setYes, dark } = useThemeStore();

// //   return (
// //     <>
// //       <div className="flex justify-center mt-8">
// //         <div
// //           className={`relative flex items-center justify-around rounded-xl py-1 w-sm sm:w-lg 
// //                     ${dark
// //               ? "bg-white backdrop-blur-lg"
// //               : "bg-black backdrop-blur-lg"
// //             }`}
// //         >
// //           <div
// //             className={`absolute top-1 left-1 h-[88%] w-1/2 rounded-lg shadow transition-all duration-300 
// //                         ${yes ? "translate-x-full" : "translate-x-0"}
// //                         ${dark
// //                 ? "bg-black shadow-black"
// //                 : "bg-white shadow-white"
// //               }`}
// //           />

// //           <button
// //             onClick={() => setYes(false)}
// //             className={`z-10 w-1/2 py-2 text-sm sm:text-base  flex justify-around font-semibold transition-colors duration-300 
// //                         ${!yes
// //                 ? dark
// //                   ? "text-white"
// //                   : "text-black"
// //                 : dark
// //                   ? "text-black"
// //                   : "text-white"
// //               }`}
// //           >
// //             💡 Idea
// //           </button>

// //           <button
// //             onClick={() => setYes(true)}
// //             className={`z-10 w-1/2 py-2 flex text-sm text-center justify-around sm:text-base font-semibold transition-colors duration-300 
// //                         ${yes
// //                 ? dark
// //                   ? "text-white"
// //                   : "text-black"
// //                 : dark
// //                   ? "text-black"
// //                   : "text-white"
// //               }`}
// //           >
// //             Pitch
// //           </button>
// //         </div>
// //       </div>

// //       {yes ? <Pitch /> : <Post />}
// //     </>
// //   );
// // }


// import { useState } from "react";
// import api1 from "../utils/api1";
// import PostSubmitLoader from "./PostSubmitLoader";
// import useThemeStore from "../store/themeStore";
// import useAuthStore from "../store/authStore";

// const Post = () => {
//   const dark = useThemeStore((s) => s.dark);
//   const user = useAuthStore((s) => s.user);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [tags, setTags] = useState([]);
//   const [tagInput, setTagInput] = useState("");
//   const [errors, setErrors] = useState({});
//   const maxChars = 280;
//   const maxTitleChars = 100;

//   const authorId = user._id;

//   const validateForm = () => {
//     const newErrors = {};
//     if (!title.trim()) newErrors.title = "Title is required";
//     if (!content.trim()) newErrors.content = "Content is required";
//     if (content.length > maxChars) newErrors.content = `Content exceeds ${maxChars} characters`;
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleTagAdd = (e) => {
//     e.preventDefault();
//     const newTag = tagInput.trim().toLowerCase();
//     if (newTag && !tags.includes(newTag) && tags.length < 5) {
//       setTags([...tags, newTag]);
//       setTagInput("");
//     }
//   };

//   const handleTagKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleTagAdd(e);
//     }
//   };

//   const handleTagRemove = (tagToRemove) => {
//     setTags(tags.filter((tag) => tag !== tagToRemove));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
    
//     setLoading(true);
//     try {
//       const post = {
//         title: title.trim(),
//         content: content.trim(),
//         tags,
//         authorId,
//         createdAt: new Date(),
//         likes: [],
//         impressions: [],
//         comments: [],
//       };

//       const res = await api1.post("/user/posts/create-post", post);
      
//       if (res.data.authorId === authorId) {
//         setTitle("");
//         setContent("");
//         setTags([]);
//         setTagInput("");
//         setErrors({});
//       }
//     } catch (error) {
//       setErrors({ submit: "Failed to create post. Please try again." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const remainingChars = maxChars - content.length;
//   const isFormValid = title.trim() && content.trim() && remainingChars >= 0;

//   return (
//     <div className="w-full min-h-screen px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
//       {/* Container with responsive max-width */}
//       <div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto">
//         <div
//           className={`rounded-xl sm:rounded-2xl shadow-lg backdrop-blur-sm border transition-all duration-300 ${
//             dark 
//               ? "border-gray-200/20 bg-white/95" 
//               : "border-gray-700/30 bg-gray-900/95"
//           }`}
//         >
//           {/* Header - Responsive padding and text */}
//           <div className={`px-4 sm:px-6 py-3 sm:py-4 border-b ${
//             dark ? "border-gray-100" : "border-gray-700/50"
//           }`}>
//             <div className="flex items-center gap-2 sm:gap-3">
//               <div className={`w-2 h-2 rounded-full ${
//                 dark ? "bg-black" : "bg-white"
//               }`}></div>
//               <h2 className={`text-lg sm:text-xl font-semibold ${
//                 dark ? "text-gray-800" : "text-gray-100"
//               }`}>
//                 Share Your Idea
//               </h2>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
//             {/* Error message - Responsive */}
//             {errors.submit && (
//               <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
//                 {errors.submit}
//               </div>
//             )}

//             {/* Title Input - Responsive */}
//             <div className="space-y-2">
//               <label className={`block text-sm font-medium ${
//                 dark ? "text-gray-700" : "text-gray-300"
//               }`}>
//                 Title
//               </label>
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="Give your idea a compelling title..."
//                 maxLength={maxTitleChars}
//                 className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base border-2 transition-all duration-200 focus:outline-none focus:ring-4 ${
//                   errors.title
//                     ? "border-red-300 focus:border-red-500 focus:ring-red-100"
//                     : dark
//                     ? "bg-gray-50 border-gray-200 text-gray-800 focus:border-black focus:ring-black/10 placeholder-gray-400"
//                     : "bg-gray-800 border-gray-600 text-gray-100 focus:border-white focus:ring-white/10 placeholder-gray-500"
//                 }`}
//               />
//               <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1">
//                 {errors.title && (
//                   <span className="text-red-500 text-xs">{errors.title}</span>
//                 )}
//                 <span className={`text-xs xs:ml-auto ${
//                   dark ? "text-gray-500" : "text-gray-400"
//                 }`}>
//                   {title.length}/{maxTitleChars}
//                 </span>
//               </div>
//             </div>

//             {/* Content Textarea - Responsive rows */}
//             <div className="space-y-2">
//               <label className={`block text-sm font-medium ${
//                 dark ? "text-gray-700" : "text-gray-300"
//               }`}>
//                 Content
//               </label>
//               <textarea
//                 rows={3}
//                 className="sm:rows-4"
//                 maxLength={maxChars}
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 placeholder="Describe your idea in detail..."
//                 style={{ rows: window.innerWidth >= 640 ? 4 : 3 }}
//                 className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg resize-none text-sm sm:text-base border-2 transition-all duration-200 focus:outline-none focus:ring-4 ${
//                   errors.content
//                     ? "border-red-300 focus:border-red-500 focus:ring-red-100"
//                     : dark
//                     ? "bg-gray-50 border-gray-200 text-gray-800 focus:border-black focus:ring-black/10 placeholder-gray-400"
//                     : "bg-gray-800 border-gray-600 text-gray-100 focus:border-white focus:ring-white/10 placeholder-gray-500"
//                 }`}
//               />
//               <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1">
//                 {errors.content && (
//                   <span className="text-red-500 text-xs">{errors.content}</span>
//                 )}
//                 <span className={`text-xs xs:ml-auto ${
//                   remainingChars < 20 
//                     ? "text-orange-500" 
//                     : remainingChars < 0 
//                     ? "text-red-500" 
//                     : dark ? "text-gray-500" : "text-gray-400"
//                 }`}>
//                   {remainingChars} characters remaining
//                 </span>
//               </div>
//             </div>

//             {/* Tags Section - Responsive */}
//             <div className="space-y-3">
//               <label className={`block text-sm font-medium ${
//                 dark ? "text-gray-700" : "text-gray-300"
//               }`}>
//                 Tags <span className="text-xs opacity-70">(max 5)</span>
//               </label>
              
//               {/* Tag input - Stack on mobile, flex on larger screens */}
//               <div className="flex flex-col xs:flex-row gap-2">
//                 <input
//                   type="text"
//                   value={tagInput}
//                   onChange={(e) => setTagInput(e.target.value)}
//                   onKeyPress={handleTagKeyPress}
//                   placeholder="Add a tag (e.g., tech, startup)"
//                   disabled={tags.length >= 5}
//                   className={`w-full xs:flex-grow px-3 sm:px-4 py-2 rounded-lg text-sm border-2 transition-all duration-200 focus:outline-none focus:ring-4 ${
//                     tags.length >= 5
//                       ? "opacity-50 cursor-not-allowed"
//                       : dark
//                       ? "bg-gray-50 border-gray-200 text-gray-800 focus:border-black focus:ring-black/10"
//                       : "bg-gray-800 border-gray-600 text-gray-100 focus:border-white focus:ring-white/10"
//                   }`}
//                 />
//                 <button
//                   type="button"
//                   onClick={handleTagAdd}
//                   disabled={!tagInput.trim() || tags.length >= 5}
//                   className={`w-full xs:w-auto px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
//                     dark
//                       ? "bg-black text-white hover:bg-gray-800 disabled:bg-gray-300"
//                       : "bg-white text-black hover:bg-gray-100 disabled:bg-gray-600"
//                   }`}
//                 >
//                   Add
//                 </button>
//               </div>

//               {/* Tags Display - Responsive grid */}
//               {tags.length > 0 && (
//                 <div className="flex flex-wrap gap-2">
//                   {tags.map((tag, idx) => (
//                     <span
//                       key={idx}
//                       className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-full flex items-center gap-1.5 sm:gap-2 transition-all duration-200 ${
//                         dark 
//                           ? "bg-gray-100 text-gray-700 hover:bg-gray-200" 
//                           : "bg-gray-700 text-gray-200 hover:bg-gray-600"
//                       }`}
//                     >
//                       #{tag}
//                       <button
//                         type="button"
//                         onClick={() => handleTagRemove(tag)}
//                         className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full flex items-center justify-center text-xs transition-colors ${
//                           dark
//                             ? "hover:bg-red-100 hover:text-red-600"
//                             : "hover:bg-red-800 hover:text-red-300"
//                         }`}
//                       >
//                         ×
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Submit Button - Responsive */}
//             <div className="flex justify-end pt-2 sm:pt-4">
//               <button
//                 type="submit"
//                 disabled={!isFormValid || loading}
//                 className={`w-full xs:w-auto px-6 sm:px-8 py-2.5 sm:py-3 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 ${
//                   dark
//                     ? "bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl"
//                     : "bg-white text-black hover:bg-gray-100 shadow-lg hover:shadow-xl"
//                 }`}
//               >
//                 {loading ? (
//                   <div className="flex items-center justify-center gap-2">
//                     <PostSubmitLoader />
//                     <span className="text-sm sm:text-base">Publishing...</span>
//                   </div>
//                 ) : (
//                   <span className="text-sm sm:text-base">Publish Idea</span>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Post;


import Post from "./Post";
import Pitch from "./Pitch";
import useThemeStore from "../store/themeStore";

export default function CreatePost() {
  const { yes, setYes, dark } = useThemeStore();

  return (
    <div className={`min-h-screen ${dark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Toggle Switch */}
      <div className="flex justify-center pt-8 pb-4">
        <div className={`relative flex rounded-xl p-1 ${
          dark ? 'bg-gray-800' : 'bg-white'
        } shadow-lg`}>
          {/* Sliding Background */}
          <div
            className={`absolute top-1 left-1 h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-lg transition-all duration-300 ease-out ${
              yes ? 'translate-x-full' : 'translate-x-0'
            } ${
              dark ? 'bg-blue-600' : 'bg-blue-500'
            } shadow-md`}
          />

          {/* Idea Button */}
          <button
            onClick={() => setYes(false)}
            className={`relative z-10 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
              !yes
                ? 'text-white'
                : dark
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="flex items-center space-x-2">
              <span>Share Idea</span>
            </span>
          </button>

          {/* Pitch Button */}
          <button
            onClick={() => setYes(true)}
            className={`relative z-10 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
              yes
                ? 'text-white'
                : dark
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="flex items-center space-x-2">
              <span>Pitch Startup</span>
            </span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="transition-all duration-500 ease-in-out">
        {yes ? <Pitch /> : <Post />}
      </div>
    </div>
  );
}
