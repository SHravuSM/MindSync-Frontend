// // import { useState } from "react";
// // import api1 from "../utils/api1";
// // import PostSubmitLoader from "./PostSubmitLoader";
// // import useThemeStore from "../store/themeStore";
// // import useAuthStore from "../store/authStore";

// // const Post = () => {
// //   const dark = useThemeStore((s) => s.dark);
// //   const user = useAuthStore((s) => s.user);
// //   const [title, setTitle] = useState("");
// //   const [content, setContent] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [tags, setTags] = useState([]);
// //   const [tagInput, setTagInput] = useState("");
// //   const maxChars = 280;

// //   const authorId = user._id;
// //   console.log(authorId, "user id");

// //   const handleTagAdd = (e) => {
// //     e.preventDefault();
// //     const newTag = tagInput.trim();
// //     if (newTag && !tags.includes(newTag)) {
// //       setTags([...tags, newTag]);
// //       setTagInput("");
// //     }
// //   };

// //   const handleTagRemove = (tagToRemove) => {
// //     setTags(tags.filter((tag) => tag !== tagToRemove));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     const post = {
// //       title,
// //       content,
// //       tags,
// //       authorId,
// //       createdAt: new Date(),
// //       likes: [],
// //       impressions: [],
// //       comments: [],
// //     };
// //     setLoading(true);
// //     const res = await api1.post("/user/posts/create-post", post);
// //     // console.log(res.data.authorId == authorId);
// //     res.data.authorId == authorId && setLoading(false);

// //     setTitle("");
// //     setContent("");
// //     setTags([]);
// //     setTagInput("");
// //   };

// //   return (
// //     <div
// //       className={`max-w-2xl mx-auto px-4 py-6 ${
// //         dark ? "text-black" : "text-white"
// //       }`}
// //     >
// //       <form
// //         onSubmit={handleSubmit}
// //         className={`rounded-md p-6 space-y-4 border ${
// //           dark ? "border-gray-300 bg-white" : "border-gray-700 bg-[#1f1f1f]"
// //         }`}
// //       >
// //         <h2 className="text-xl font-semibold">Share a new Idea</h2>

// //         <input
// //           type="text"
// //           value={title}
// //           onChange={(e) => setTitle(e.target.value)}
// //           placeholder="Post Title"
// //           maxLength={100}
// //           required
// //           className={`w-full px-4 py-2 rounded-md text-base border focus:outline-none focus:ring-2 ${
// //             dark
// //               ? "bg-white border-gray-300 text-black focus:ring-black"
// //               : "bg-[#2a2a2a] border-gray-600 text-white focus:ring-white"
// //           }`}
// //         />

// //         <textarea
// //           rows={3}
// //           maxLength={maxChars}
// //           value={content}
// //           onChange={(e) => setContent(e.target.value)}
// //           placeholder="What's your idea?"
// //           required
// //           className={`w-full px-4 py-3 rounded-md resize-y text-base border focus:outline-none focus:ring-2 ${
// //             dark
// //               ? "bg-white border-gray-300 text-black focus:ring-black"
// //               : "bg-[#2a2a2a] border-gray-600 text-white focus:ring-white"
// //           }`}
// //         />
// //         <div className="text-sm text-right text-gray-500">
// //           {content.length}/{maxChars}
// //         </div>

// //         <div>
// //           <div className="flex gap-2">
// //             <input
// //               type="text"
// //               value={tagInput}
// //               onChange={(e) => setTagInput(e.target.value)}
// //               placeholder="Add a tag (e.g. tech)"
// //               className={`flex-grow px-4 py-2 rounded-md text-sm border focus:outline-none focus:ring-2 ${
// //                 dark
// //                   ? "bg-white border-gray-300 text-black focus:ring-black"
// //                   : "bg-[#2a2a2a] border-gray-600 text-white focus:ring-white"
// //               }`}
// //             />
// //             <button
// //               onClick={handleTagAdd}
// //               className={`px-4 py-2 text-sm font-medium rounded-md transition ${
// //                 dark
// //                   ? "bg-black text-white hover:bg-gray-800"
// //                   : "bg-white text-black hover:bg-gray-100"
// //               }`}
// //               disabled={!tagInput.trim()}
// //             >
// //               Add
// //             </button>
// //           </div>

// //           <div className="mt-3 flex flex-wrap gap-2">
// //             {tags.map((tag, idx) => (
// //               <span
// //                 key={idx}
// //                 className={`px-3 py-1 text-sm rounded-full flex items-center gap-2 ${
// //                   dark ? "bg-gray-200 text-black" : "bg-gray-700 text-white"
// //                 }`}
// //               >
// //                 #{tag}
// //                 <button
// //                   type="button"
// //                   onClick={() => handleTagRemove(tag)}
// //                   className={`${
// //                     dark
// //                       ? "text-gray-600 hover:text-red-500"
// //                       : "text-gray-300 hover:text-red-400"
// //                   }`}
// //                 >
// //                   ×
// //                 </button>
// //               </span>
// //             ))}
// //           </div>
// //         </div>

// //         <div className="text-right">
// //           <button
// //             type="submit"
// //             className={`px-6 py-2 font-medium rounded-md transition ${
// //               dark
// //                 ? "bg-black text-white hover:bg-gray-800"
// //                 : "bg-white text-black hover:bg-gray-100"
// //             }`}
// //             disabled={!title.trim() || !content.trim()}
// //           >
// //             {!loading ? "Post" : <PostSubmitLoader />}
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Post;

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
//     <div className="max-w-2xl mx-auto px-4 py-6">
//       <div
//         className={`rounded-xl shadow-lg backdrop-blur-sm border transition-all duration-300 ${
//           dark
//             ? "border-gray-200/20 bg-white/95"
//             : "border-gray-700/30 bg-gray-900/95"
//         }`}
//       >
//         {/* Header */}
//         <div className={`px-6 py-4 border-b ${
//           dark ? "border-gray-100" : "border-gray-700/50"
//         }`}>
//           <div className="flex items-center gap-3">
//             <div className={`w-2 h-2 rounded-full ${
//               dark ? "bg-black" : "bg-white"
//             }`}></div>
//             <h2 className={`text-xl font-semibold ${
//               dark ? "text-gray-800" : "text-gray-100"
//             }`}>
//               Share Your Idea
//             </h2>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {/* Error message */}
//           {errors.submit && (
//             <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
//               {errors.submit}
//             </div>
//           )}

//           {/* Title Input */}
//           <div className="space-y-2">
//             <label className={`block text-sm font-medium ${
//               dark ? "text-gray-700" : "text-gray-300"
//             }`}>
//               Title
//             </label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Give your idea a compelling title..."
//               maxLength={maxTitleChars}
//               className={`w-full px-4 py-3 rounded-lg text-base border-2 transition-all duration-200 focus:outline-none focus:ring-4 ${
//                 errors.title
//                   ? "border-red-300 focus:border-red-500 focus:ring-red-100"
//                   : dark
//                   ? "bg-gray-50 border-gray-200 text-gray-800 focus:border-black focus:ring-black/10 placeholder-gray-400"
//                   : "bg-gray-800 border-gray-600 text-gray-100 focus:border-white focus:ring-white/10 placeholder-gray-500"
//               }`}
//             />
//             <div className="flex justify-between items-center">
//               {errors.title && (
//                 <span className="text-red-500 text-xs">{errors.title}</span>
//               )}
//               <span className={`text-xs ml-auto ${
//                 dark ? "text-gray-500" : "text-gray-400"
//               }`}>
//                 {title.length}/{maxTitleChars}
//               </span>
//             </div>
//           </div>

//           {/* Content Textarea */}
//           <div className="space-y-2">
//             <label className={`block text-sm font-medium ${
//               dark ? "text-gray-700" : "text-gray-300"
//             }`}>
//               Content
//             </label>
//             <textarea
//               rows={4}
//               maxLength={maxChars}
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               placeholder="Describe your idea in detail..."
//               className={`w-full px-4 py-3 rounded-lg resize-none text-base border-2 transition-all duration-200 focus:outline-none focus:ring-4 ${
//                 errors.content
//                   ? "border-red-300 focus:border-red-500 focus:ring-red-100"
//                   : dark
//                   ? "bg-gray-50 border-gray-200 text-gray-800 focus:border-black focus:ring-black/10 placeholder-gray-400"
//                   : "bg-gray-800 border-gray-600 text-gray-100 focus:border-white focus:ring-white/10 placeholder-gray-500"
//               }`}
//             />
//             <div className="flex justify-between items-center">
//               {errors.content && (
//                 <span className="text-red-500 text-xs">{errors.content}</span>
//               )}
//               <span className={`text-xs ml-auto ${
//                 remainingChars < 20
//                   ? "text-orange-500"
//                   : remainingChars < 0
//                   ? "text-red-500"
//                   : dark ? "text-gray-500" : "text-gray-400"
//               }`}>
//                 {remainingChars} characters remaining
//               </span>
//             </div>
//           </div>

//           {/* Tags Section */}
//           <div className="space-y-3">
//             <label className={`block text-sm font-medium ${
//               dark ? "text-gray-700" : "text-gray-300"
//             }`}>
//               Tags <span className="text-xs opacity-70">(max 5)</span>
//             </label>

//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 value={tagInput}
//                 onChange={(e) => setTagInput(e.target.value)}
//                 onKeyPress={handleTagKeyPress}
//                 placeholder="Add a tag (e.g., tech, startup)"
//                 disabled={tags.length >= 5}
//                 className={`flex-grow px-4 py-2 rounded-lg text-sm border-2 transition-all duration-200 focus:outline-none focus:ring-4 ${
//                   tags.length >= 5
//                     ? "opacity-50 cursor-not-allowed"
//                     : dark
//                     ? "bg-gray-50 border-gray-200 text-gray-800 focus:border-black focus:ring-black/10"
//                     : "bg-gray-800 border-gray-600 text-gray-100 focus:border-white focus:ring-white/10"
//                 }`}
//               />
//               <button
//                 type="button"
//                 onClick={handleTagAdd}
//                 disabled={!tagInput.trim() || tags.length >= 5}
//                 className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
//                   dark
//                     ? "bg-black text-white hover:bg-gray-800 disabled:bg-gray-300"
//                     : "bg-white text-black hover:bg-gray-100 disabled:bg-gray-600"
//                 }`}
//               >
//                 Add
//               </button>
//             </div>

//             {/* Tags Display */}
//             {tags.length > 0 && (
//               <div className="flex flex-wrap gap-2">
//                 {tags.map((tag, idx) => (
//                   <span
//                     key={idx}
//                     className={`px-3 py-1.5 text-sm rounded-full flex items-center gap-2 transition-all duration-200 ${
//                       dark
//                         ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                         : "bg-gray-700 text-gray-200 hover:bg-gray-600"
//                     }`}
//                   >
//                     #{tag}
//                     <button
//                       type="button"
//                       onClick={() => handleTagRemove(tag)}
//                       className={`w-4 h-4 rounded-full flex items-center justify-center text-xs transition-colors ${
//                         dark
//                           ? "hover:bg-red-100 hover:text-red-600"
//                           : "hover:bg-red-800 hover:text-red-300"
//                       }`}
//                     >
//                       ×
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end pt-4">
//             <button
//               type="submit"
//               disabled={!isFormValid || loading}
//               className={`px-8 py-3 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 ${
//                 dark
//                   ? "bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl"
//                   : "bg-white text-black hover:bg-gray-100 shadow-lg hover:shadow-xl"
//               }`}
//             >
//               {loading ? (
//                 <div className="flex items-center gap-2">
//                   <PostSubmitLoader />
//                   <span>Publishing...</span>
//                 </div>
//               ) : (
//                 "Publish Idea"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Post;

// import { useState } from "react";
// import api1 from "../utils/api1";
// import PostSubmitLoader from "./PostSubmitLoader";
// import useThemeStore from "../store/themeStore";
// import useAuthStore from "../store/authStore";
// import api from "../utils/api1";

// const Post = () => {
//   const dark = useThemeStore((s) => s.dark);
//   const user = useAuthStore((s) => s.user);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [enhancing, setEnhancing] = useState(false);
//   const [tags, setTags] = useState([]);
//   const [sample, setSample] = useState("");
//   const [tagInput, setTagInput] = useState("");
//   const [errors, setErrors] = useState({});
//   const maxChars = 280;
//   const maxTitleChars = 100;

//   const authorId = user._id;

//   const validateForm = () => {
//     const newErrors = {};
//     if (!title.trim()) newErrors.title = "Title is required";
//     if (!content.trim()) newErrors.content = "Content is required";
//     if (content.length > maxChars)
//       newErrors.content = `Content exceeds ${maxChars} characters`;
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleAIEnhance = async () => {
//     if (!content.trim()) {
//       setErrors({ content: "Please enter some content to enhance" });
//       return;
//     }
//     setEnhancing(true);
//     const res = await api.post("user/ask", {
//       content: `
//         You are an expert content writer and editor.
//         Your job is to take the following text and:
//         1. Improve clarity, grammar, and flow.
//         2. Make it engaging and easy to read.
//     3. Expand with relevant details/examples if needed.
//     4. Keep the tone friendly yet professional.
//     5. Return ONLY the improved best version of the text (do NOT include summaries, labels, or extra formatting).

//     Here is the text to improve:
//     ---
//     ${content}
//     ---
//     `,
//     });

//     const enhancedContent = res.data.data.choices[0].message.content.trim();
//     console.log(enhancedContent);
//     setSample(enhancedContent);
//     setEnhancing(false);
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
//           <div
//             className={`px-4 sm:px-6 py-3 sm:py-4 border-b ${
//               dark ? "border-gray-100" : "border-gray-700/50"
//             }`}
//           >
//             <div className="flex items-center gap-2 sm:gap-3">
//               <div
//                 className={`w-2 h-2 rounded-full ${
//                   dark ? "bg-black" : "bg-white"
//                 }`}
//               ></div>
//               <h2
//                 className={`text-lg sm:text-xl font-semibold ${
//                   dark ? "text-gray-800" : "text-gray-100"
//                 }`}
//               >
//                 Share Your Idea
//               </h2>
//             </div>
//           </div>

//           <form
//             onSubmit={handleSubmit}
//             className="p-4 sm:p-6 space-y-4 sm:space-y-6"
//           >
//             {/* Error message - Responsive */}
//             {errors.submit && (
//               <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
//                 {errors.submit}
//               </div>
//             )}

//             {/* Title Input - Responsive */}
//             <div className="space-y-2">
//               <label
//                 className={`block text-sm font-medium ${
//                   dark ? "text-gray-700" : "text-gray-300"
//                 }`}
//               >
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
//                 <span
//                   className={`text-xs xs:ml-auto ${
//                     dark ? "text-gray-500" : "text-gray-400"
//                   }`}
//                 >
//                   {title.length}/{maxTitleChars}
//                 </span>
//               </div>
//             </div>

//             {/* Content Textarea with AI Enhancement Button - Responsive */}
//             <div className="space-y-2">
//               <label
//                 className={`block text-sm font-medium ${
//                   dark ? "text-gray-700" : "text-gray-300"
//                 }`}
//               >
//                 Content
//               </label>

//               <div className="relative">
//                 <textarea
//                   rows={3}
//                   className="sm:rows-4"
//                   maxLength={maxChars}
//                   value={content}
//                   onChange={(e) => setContent(e.target.value)}
//                   placeholder="Describe your idea in detail..."
//                   style={{ rows: window.innerWidth >= 640 ? 4 : 3 }}
//                   className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-12 sm:pr-16 rounded-lg resize-none text-sm sm:text-base border-2 transition-all duration-200 focus:outline-none focus:ring-4 ${
//                     errors.content
//                       ? "border-red-300 focus:border-red-500 focus:ring-red-100"
//                       : dark
//                       ? "bg-gray-50 border-gray-200 text-gray-800 focus:border-black focus:ring-black/10 placeholder-gray-400"
//                       : "bg-gray-800 border-gray-600 text-gray-100 focus:border-white focus:ring-white/10 placeholder-gray-500"
//                   }`}
//                 />

//                 {/* AI Enhancement Button - Positioned absolutely to the right */}
//                 <button
//                   type="button"
//                   onClick={handleAIEnhance}
//                   disabled={!content.trim() || enhancing}
//                   className={`absolute top-2 right-2 sm:top-3 sm:right-3 p-2 sm:p-2.5 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group ${
//                     dark
//                       ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl"
//                       : "bg-gradient-to-r from-purple-400 to-blue-400 text-white hover:from-purple-500 hover:to-blue-500 shadow-lg hover:shadow-xl"
//                   }`}
//                   title="Enhance content with AI"
//                 >
//                   {enhancing ? (
//                     <div className="animate-spin">
//                       <svg
//                         className="w-4 h-4 sm:w-5 sm:h-5"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                           className="opacity-25"
//                         ></circle>
//                         <path
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                           className="opacity-75"
//                         ></path>
//                       </svg>
//                     </div>
//                   ) : (
//                     <svg
//                       className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M13 10V3L4 14h7v7l9-11h-7z"
//                       />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//               {/* Replace the current sample display */}
//               {sample && (
//                 <div
//                   className={`mt-3 p-4 rounded-lg border-2 border-dashed transition-all ${
//                     dark
//                       ? "border-purple-200 bg-purple-50"
//                       : "border-purple-600 bg-purple-900/20"
//                   }`}
//                 >
//                   <div className="flex justify-between items-start mb-2">
//                     <span
//                       className={`text-xs font-medium ${
//                         dark ? "text-purple-700" : "text-purple-400"
//                       }`}
//                     >
//                       ✨ AI Enhanced Version
//                     </span>
//                     <div className="flex gap-2">
//                       <button
//                         type="button"
//                         onClick={() => setContent(sample)}
//                         className={`text-xs px-2 py-1 rounded ${
//                           dark
//                             ? "bg-purple-600 text-white hover:bg-purple-700"
//                             : "bg-purple-500 text-white hover:bg-purple-600"
//                         }`}
//                       >
//                         Use This
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => setSample("")}
//                         className={`text-xs px-2 py-1 rounded ${
//                           dark
//                             ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                             : "bg-gray-700 text-gray-300 hover:bg-gray-600"
//                         }`}
//                       >
//                         Dismiss
//                       </button>
//                     </div>
//                   </div>
//                   <p
//                     className={`text-sm leading-relaxed ${
//                       dark ? "text-gray-700" : "text-gray-300"
//                     }`}
//                   >
//                     {sample}
//                   </p>
//                 </div>
//               )}

//               <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1">
//                 {errors.content && (
//                   <span className="text-red-500 text-xs">{errors.content}</span>
//                 )}
//                 <div className="flex items-center gap-2 xs:ml-auto">
//                   {enhancing && (
//                     <span
//                       className={`text-xs ${
//                         dark ? "text-purple-600" : "text-purple-400"
//                       }`}
//                     >
//                       AI enhancing...
//                     </span>
//                   )}
//                   <span
//                     className={`text-xs ${
//                       remainingChars < 20
//                         ? "text-orange-500"
//                         : remainingChars < 0
//                         ? "text-red-500"
//                         : dark
//                         ? "text-gray-500"
//                         : "text-gray-400"
//                     }`}
//                   >
//                     {remainingChars} characters remaining
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Tags Section - Responsive */}
//             <div className="space-y-3">
//               <label
//                 className={`block text-sm font-medium ${
//                   dark ? "text-gray-700" : "text-gray-300"
//                 }`}
//               >
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

import { useState, useEffect } from "react";
import PostSubmitLoader from "./PostSubmitLoader";
import useThemeStore from "../store/themeStore";
import useAuthStore from "../store/authStore";
import api from "../utils/api1";

const Post = () => {
  const dark = useThemeStore((s) => s.dark);
  const user = useAuthStore((s) => s.user);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const [tags, setTags] = useState([]);
  const [sample, setSample] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);

  const maxChars = 500;
  const maxTitleChars = 100;
  const popularTags = ["tech", "startup", "innovation", "business", "design"];

  const authorId = user.id;

  // Auto-save draft functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      if (title || content) {
        localStorage.setItem(
          "postDraft",
          JSON.stringify({ title, content, tags })
        );
        setDraftSaved(true);
        setTimeout(() => setDraftSaved(false), 2000);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [title, content, tags]);

  // Load draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("postDraft");
    if (savedDraft) {
      const {
        title: savedTitle,
        content: savedContent,
        tags: savedTags,
      } = JSON.parse(savedDraft);
      if (savedTitle || savedContent) {
        setTitle(savedTitle || "");
        setContent(savedContent || "");
        setTags(savedTags || []);
      }
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!content.trim()) newErrors.content = "Content is required";
    if (content.length > maxChars)
      newErrors.content = `Content exceeds ${maxChars} characters`;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAIEnhance = async () => {
    if (!content.trim()) {
      setErrors({ content: "Please enter some content to enhance" });
      return;
    }
    setEnhancing(true);
    try {
      const res = await api1.post("user/ask", {
        content: `
          You are an expert content writer and editor.  
          Your job is to take the following text and:
          1. Improve clarity, grammar, and flow.
          2. Make it engaging and easy to read.
          3. Expand with relevant details/examples if needed.
          4. Keep the tone friendly yet professional.
          5. Return ONLY the improved best version of the text (do NOT include summaries, labels, or extra formatting).
          
          Here is the text to improve:
          ---
          ${content}
          ---
        `,
      });

      const enhancedContent = res.data.data.choices[0].message.content.trim();
      setSample(enhancedContent);
    } catch (error) {
      setErrors({ content: "Failed to enhance content. Please try again." });
    } finally {
      setEnhancing(false);
    }
  };

  const handleTagAdd = (e) => {
    e.preventDefault();
    const newTag = tagInput.trim().toLowerCase();
    if (newTag && !tags.includes(newTag) && tags.length < 5) {
      setTags([...tags, newTag]);
      setTagInput("");
    }
  };

  const handleTagKeyPress = (e) => {
    if (e.key === "Enter") {
      handleTagAdd(e);
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const addPopularTag = (tag) => {
    if (tags.length < 5 && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const post = {
        title: title.trim(),
        content: content.trim(),
        tags,
        authorId,
        createdAt: new Date(),
      };

      const res = await api.post("/user/posts/createpost", post);

      if (res.data.authorId === authorId) {
        setTitle("");
        setContent("");
        setTags([]);
        setTagInput("");
        setErrors({});
        setSample("");
        setShowSuccess(true);
        localStorage.removeItem("postDraft");
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      setErrors({ submit: "Failed to create post. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const remainingChars = maxChars - content.length;
  const isFormValid = title.trim() && content.trim() && remainingChars >= 0;

  return (
    <div className="w-full min-h-screen px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
      {/* Container with responsive max-width */}
      <div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto">
        <div
          className={`rounded-xl sm:rounded-2xl shadow-lg backdrop-blur-sm border transition-all duration-300 ${
            dark
              ? "border-gray-200/20 bg-white/95"
              : "border-gray-700/30 bg-gray-900/95"
          }`}
        >
          {/* Header - Responsive padding and text */}
          <div
            className={`px-4 sm:px-6 py-3 sm:py-4 border-b ${
              dark ? "border-gray-100" : "border-gray-700/50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    dark ? "bg-black" : "bg-white"
                  }`}
                ></div>
                <h2
                  className={`text-lg sm:text-xl font-semibold ${
                    dark ? "text-gray-800" : "text-gray-100"
                  }`}
                >
                  Share Your Idea
                </h2>
              </div>

              {/* Draft saved indicator */}
              {draftSaved && (
                <div
                  className={`text-xs flex items-center gap-1 ${
                    dark ? "text-green-600" : "text-green-400"
                  }`}
                >
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    />
                  </svg>
                  Draft saved
                </div>
              )}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-4 sm:p-6 space-y-4 sm:space-y-6"
          >
            {/* Success message */}
            {showSuccess && (
              <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  />
                </svg>
                Post published successfully! 🎉
              </div>
            )}

            {/* Error message - Responsive */}
            {errors.submit && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {errors.submit}
              </div>
            )}

            {/* Title Input - Responsive */}
            <div className="space-y-2">
              <label
                className={`block text-sm font-medium ${
                  dark ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your idea a compelling title..."
                maxLength={maxTitleChars}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base border-2 transition-all duration-200 focus:outline-none focus:ring-4 ${
                  errors.title
                    ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                    : dark
                    ? "bg-gray-50 border-gray-200 text-gray-800 focus:border-black focus:ring-black/10 placeholder-gray-400"
                    : "bg-gray-800 border-gray-600 text-gray-100 focus:border-white focus:ring-white/10 placeholder-gray-500"
                }`}
              />
              <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1">
                {errors.title && (
                  <span className="text-red-500 text-xs">{errors.title}</span>
                )}
                <span
                  className={`text-xs xs:ml-auto ${
                    dark ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  {title.length}/{maxTitleChars}
                </span>
              </div>
            </div>

            {/* Content Textarea with AI Enhancement Button - Responsive */}
            <div className="space-y-2">
              <label
                className={`block text-sm font-medium ${
                  dark ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Content
              </label>

              <div className="relative">
                <textarea
                  rows={window.innerWidth >= 640 ? 4 : 3}
                  maxLength={maxChars}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Describe your idea in detail..."
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-12 sm:pr-16 rounded-lg resize-none text-sm sm:text-base border-2 transition-all duration-200 focus:outline-none focus:ring-4 ${
                    errors.content
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                      : dark
                      ? "bg-gray-50 border-gray-200 text-gray-800 focus:border-black focus:ring-black/10 placeholder-gray-400"
                      : "bg-gray-800 border-gray-600 text-gray-100 focus:border-white focus:ring-white/10 placeholder-gray-500"
                  }`}
                />

                {/* AI Enhancement Button - Positioned absolutely to the right */}
                <button
                  type="button"
                  onClick={handleAIEnhance}
                  disabled={!content.trim() || enhancing}
                  className={`absolute top-2 right-2 sm:top-3 sm:right-3 p-2 sm:p-2.5 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group ${
                    dark
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl"
                      : "bg-gradient-to-r from-purple-400 to-blue-400 text-white hover:from-purple-500 hover:to-blue-500 shadow-lg hover:shadow-xl"
                  }`}
                  title="Enhance content with AI"
                >
                  {enhancing ? (
                    <div className="animate-spin">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          className="opacity-25"
                        ></circle>
                        <path
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          className="opacity-75"
                        ></path>
                      </svg>
                    </div>
                  ) : (
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* Character count progress bar */}
              <div className="mt-2">
                <div
                  className={`w-full h-1.5 rounded-full overflow-hidden ${
                    dark ? "bg-gray-200" : "bg-gray-700"
                  }`}
                >
                  <div
                    className={`h-full transition-all duration-300 ${
                      remainingChars < 0
                        ? "bg-red-500"
                        : remainingChars < 50
                        ? "bg-orange-500"
                        : dark
                        ? "bg-black"
                        : "bg-white"
                    }`}
                    style={{
                      width: `${Math.min(
                        (content.length / maxChars) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* AI Enhanced Sample Display */}
              {sample && (
                <div
                  className={`mt-3 p-4 rounded-lg border-2 border-dashed transition-all ${
                    dark
                      ? "border-purple-200 bg-purple-50"
                      : "border-purple-600 bg-purple-900/20"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span
                      className={`text-xs font-medium ${
                        dark ? "text-purple-700" : "text-purple-400"
                      }`}
                    >
                      ✨ AI Enhanced Version
                    </span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setContent(sample);
                          setSample("");
                        }}
                        className={`text-xs px-2 py-1 rounded ${
                          dark
                            ? "bg-purple-600 text-white hover:bg-purple-700"
                            : "bg-purple-500 text-white hover:bg-purple-600"
                        }`}
                      >
                        Use This
                      </button>
                      <button
                        type="button"
                        onClick={() => setSample("")}
                        className={`text-xs px-2 py-1 rounded ${
                          dark
                            ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                  <p
                    className={`text-sm leading-relaxed ${
                      dark ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    {sample}
                  </p>
                </div>
              )}

              <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1">
                {errors.content && (
                  <span className="text-red-500 text-xs">{errors.content}</span>
                )}
                <div className="flex items-center gap-2 xs:ml-auto">
                  {enhancing && (
                    <span
                      className={`text-xs ${
                        dark ? "text-purple-600" : "text-purple-400"
                      }`}
                    >
                      AI enhancing...
                    </span>
                  )}
                  <span
                    className={`text-xs ${
                      remainingChars < 20
                        ? "text-orange-500"
                        : remainingChars < 0
                        ? "text-red-500"
                        : dark
                        ? "text-gray-500"
                        : "text-gray-400"
                    }`}
                  >
                    {remainingChars} characters remaining
                  </span>
                </div>
              </div>
            </div>

            {/* Tags Section - Responsive */}
            <div className="space-y-3">
              <label
                className={`block text-sm font-medium ${
                  dark ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Tags <span className="text-xs opacity-70">(max 5)</span>
              </label>

              {/* Popular tags suggestions */}
              {tags.length < 5 && (
                <div className="flex flex-wrap gap-1.5 mb-2">
                  <span
                    className={`text-xs ${
                      dark ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    Popular:
                  </span>
                  {popularTags
                    .filter((tag) => !tags.includes(tag))
                    .slice(0, 3)
                    .map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => addPopularTag(tag)}
                        className={`text-xs px-2 py-0.5 rounded-full border transition-all hover:scale-105 ${
                          dark
                            ? "border-gray-300 text-gray-600 hover:bg-gray-100"
                            : "border-gray-600 text-gray-400 hover:bg-gray-800"
                        }`}
                      >
                        +{tag}
                      </button>
                    ))}
                </div>
              )}

              {/* Tag input - Stack on mobile, flex on larger screens */}
              <div className="flex flex-col xs:flex-row gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleTagKeyPress}
                  placeholder="Add a tag (e.g., tech, startup)"
                  disabled={tags.length >= 5}
                  className={`w-full xs:flex-grow px-3 sm:px-4 py-2 rounded-lg text-sm border-2 transition-all duration-200 focus:outline-none focus:ring-4 ${
                    tags.length >= 5
                      ? "opacity-50 cursor-not-allowed"
                      : dark
                      ? "bg-gray-50 border-gray-200 text-gray-800 focus:border-black focus:ring-black/10"
                      : "bg-gray-800 border-gray-600 text-gray-100 focus:border-white focus:ring-white/10"
                  }`}
                />
                <button
                  type="button"
                  onClick={handleTagAdd}
                  disabled={!tagInput.trim() || tags.length >= 5}
                  className={`w-full xs:w-auto px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    dark
                      ? "bg-black text-white hover:bg-gray-800 disabled:bg-gray-300"
                      : "bg-white text-black hover:bg-gray-100 disabled:bg-gray-600"
                  }`}
                >
                  Add
                </button>
              </div>

              {/* Tags Display - Responsive grid */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-full flex items-center gap-1.5 sm:gap-2 transition-all duration-200 ${
                        dark
                          ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                      }`}
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleTagRemove(tag)}
                        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full flex items-center justify-center text-xs transition-colors ${
                          dark
                            ? "hover:bg-red-100 hover:text-red-600"
                            : "hover:bg-red-800 hover:text-red-300"
                        }`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button - Responsive */}
            <div className="flex justify-end pt-2 sm:pt-4">
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className={`w-full xs:w-auto px-6 sm:px-8 py-2.5 sm:py-3 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 ${
                  dark
                    ? "bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl"
                    : "bg-white text-black hover:bg-gray-100 shadow-lg hover:shadow-xl"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <PostSubmitLoader />
                    <span className="text-sm sm:text-base">Publishing...</span>
                  </div>
                ) : (
                  <span className="text-sm sm:text-base">Publish Idea</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Post;
