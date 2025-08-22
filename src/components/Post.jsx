// import { useState, useEffect } from "react";
// import PostSubmitLoader from "./PostSubmitLoader";
// import useThemeStore from "../store/themeStore";
// import useAuthStore from "../store/authStore";
// import api1 from "../utils/api1";

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
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [draftSaved, setDraftSaved] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   const maxChars = 500;
//   const maxTitleChars = 100;
//   const popularTags = ["tech", "startup", "innovation", "business", "design"];
//   const authorId = user?.id;

//   // Screen size detection for SSR safety
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 640);
//     };
//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   // Auto-save draft functionality
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (title || content) {
//         localStorage.setItem("postDraft", JSON.stringify({ title, content, tags }));
//         setDraftSaved(true);
//         setTimeout(() => setDraftSaved(false), 2000);
//       }
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, [title, content, tags]);

//   // Load draft on component mount
//   useEffect(() => {
//     const savedDraft = localStorage.getItem("postDraft");
//     if (savedDraft) {
//       try {
//         const { title: savedTitle, content: savedContent, tags: savedTags } = JSON.parse(savedDraft);
//         if (savedTitle || savedContent) {
//           setTitle(savedTitle || "");
//           setContent(savedContent || "");
//           setTags(savedTags || []);
//         }
//       } catch (error) {
//         console.error("Error parsing saved draft:", error);
//         localStorage.removeItem("postDraft");
//       }
//     }
//   }, []);

//   const validateForm = () => {
//     const newErrors = {};
//     if (!title.trim()) newErrors.title = "Title is required";
//     if (!content.trim()) newErrors.content = "Content is required";
//     if (content.length > maxChars) newErrors.content = `Content exceeds ${maxChars} characters`;
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Clear draft function
//   const handleClearDraft = () => {
//     setTitle("");
//     setContent("");
//     setTags([]);
//     setTagInput("");
//     setErrors({});
//     setSample("");
//     localStorage.removeItem("postDraft");
//     setDraftSaved(false);
//   };

//   const handleAIEnhance = async () => {
//     if (!content.trim()) {
//       setErrors({ content: "Please enter some content to enhance" });
//       return;
//     }
//     setEnhancing(true);
//     try {
//       const res = await api1.post("/user/ask", {
//         content: `
//           You are an expert content writer and editor.
//           Your job is to take the following text and:
//           1. Improve clarity, grammar, and flow.
//           2. Make it engaging and easy to read.
//           3. Expand with relevant details/examples if needed.
//           4. Keep the tone friendly yet professional.
//           5. Return ONLY the improved best version of the text (do NOT include summaries, labels, or extra formatting).

//           Here is the text to improve:
//           ---
//           ${content}
//           ---
//         `,
//       });
//       const enhancedContent = res.data.data.choices[0].message.content.trim();
//       setSample(enhancedContent);
//       setErrors({});
//     } catch (error) {
//       console.error("AI Enhancement error:", error);
//       setErrors({ content: "Failed to enhance content. Please try again." });
//     } finally {
//       setEnhancing(false);
//     }
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

//   const addPopularTag = (tag) => {
//     if (tags.length < 5 && !tags.includes(tag)) {
//       setTags([...tags, tag]);
//     }
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
//         createdAt: new Date().toISOString(),
//       };

//       const res = await api1.post("/user/posts/createpost", post);

//       if (res.data && res.data.authorId === authorId) {
//         setTitle("");
//         setContent("");
//         setTags([]);
//         setTagInput("");
//         setErrors({});
//         setSample("");
//         setShowSuccess(true);
//         localStorage.removeItem("postDraft");
//         setTimeout(() => setShowSuccess(false), 3000);
//       }
//     } catch (error) {
//       console.error("Post creation error:", error);
//       setErrors({ submit: "Failed to create post. Please try again." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const remainingChars = maxChars - content.length;
//   const isFormValid = title.trim() && content.trim() && remainingChars >= 0;

//   // Check if there's any draft content to show/hide clear button
//   const hasDraftContent = title.trim() || content.trim() || tags.length > 0;

//   return (
//     <div className="w-full min-h-screen px-3 sm:px-4 lg:px-6 py-4 pt-0 sm:py-6 lg:py-8 lg:pt-2">
//       <div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto">
//         <div
//           className={`rounded-md sm:rounded-md shadow-lg backdrop-blur-sm border transition-all duration-300 ${
//             !dark
//               ? "border-gray-200/20 bg-white/95"
//               : "border-gray-700/30 bg-gray-900/95"
//           }`}
//         >
//           {/* Header with Clear Draft Button */}
//           <div
//             className={`px-4 sm:px-6 py-3 sm:py-4 border-b ${
//               dark ? "border-gray-700/50" : "border-gray-100"
//             }`}
//           >
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2 sm:gap-3">
//                 <div
//                   className={`w-2 h-2 rounded-full ${
//                     dark ? "bg-white" : "bg-black"
//                   }`}
//                 ></div>
//                 <h2
//                   className={`text-lg sm:text-xl font-semibold ${
//                     dark ? "text-gray-100" : "text-gray-800"
//                   }`}
//                 >
//                   Share Your Idea
//                 </h2>
//               </div>

//               <div className="flex items-center gap-3">
//                 {/* Draft saved indicator */}
//                 {draftSaved && (
//                   <div
//                     className={`text-xs flex items-center gap-1 ${
//                       dark ? "text-green-400" : "text-green-600"
//                     }`}
//                   >
//                     <svg
//                       className="w-3 h-3"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                       />
//                     </svg>
//                     Draft saved
//                   </div>
//                 )}

//                 {/* Clear Draft Button */}
//                 {hasDraftContent && (
//                   <button
//                     type="button"
//                     onClick={handleClearDraft}
//                     className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 hover:scale-105 active:scale-95 ${
//                       dark
//                         ? "bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600"
//                         : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200"
//                     }`}
//                     title="Clear all draft content"
//                   >
//                     <div className="flex items-center gap-1.5">
//                       <svg
//                         className="w-3 h-3"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                         />
//                       </svg>
//                       Clear Draft
//                     </div>
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           <form
//             onSubmit={handleSubmit}
//             className="p-4 sm:p-6 space-y-4 sm:space-y-6"
//           >
//             {/* Success message */}
//             {showSuccess && (
//               <div className="p-3 rounded-sm bg-green-50 border border-green-200 text-green-700 text-sm flex items-center gap-2">
//                 <svg
//                   className="w-4 h-4"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                   />
//                 </svg>
//                 Post published successfully! 🎉
//               </div>
//             )}

//             {errors.submit && (
//               <div className="p-3 rounded-sm bg-red-50 border border-red-200 text-red-700 text-sm">
//                 {errors.submit}
//               </div>
//             )}

//             {/* Title Input */}
//             <div className="space-y-2">
//               <label
//                 className={`block text-sm font-medium ${
//                   dark ? "text-gray-300" : "text-gray-700"
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
//                 className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-sm text-sm sm:text-base border-2 transition-all duration-200 focus:outline-none focus:ring-4 ${
//                   errors.title
//                     ? "border-red-300 focus:border-red-500 focus:ring-red-100"
//                     : dark
//                     ? "bg-gray-800 border-gray-600 text-gray-100 focus:border-white focus:ring-white/10 placeholder-gray-500"
//                     : "bg-gray-50 border-gray-200 text-gray-800 focus:border-black focus:ring-black/10 placeholder-gray-400"
//                 }`}
//               />
//               <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1">
//                 {errors.title && (
//                   <span className="text-red-500 text-xs">{errors.title}</span>
//                 )}
//                 <span
//                   className={`text-xs xs:ml-auto ${
//                     dark ? "text-gray-400" : "text-gray-500"
//                   }`}
//                 >
//                   {title.length}/{maxTitleChars}
//                 </span>
//               </div>
//             </div>

//             {/* Content Textarea with AI Enhancement Button - RESIZABLE */}
//             <div className="space-y-2">
//               <label
//                 className={`block text-sm font-medium ${
//                   dark ? "text-gray-300" : "text-gray-700"
//                 }`}
//               >
//                 Content
//               </label>

//               <div className="relative">
//                 <textarea
//                   rows={isMobile ? 3 : 4}
//                   maxLength={maxChars}
//                   value={content}
//                   onChange={(e) => setContent(e.target.value)}
//                   placeholder="Describe your idea in detail..."
//                   className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-12 sm:pr-16 rounded-sm resize-y min-h-[100px] max-h-[400px] text-sm sm:text-base border-2 transition-all duration-200 focus:outline-none focus:ring-4 ${
//                     errors.content
//                       ? "border-red-300 focus:border-red-500 focus:ring-red-100"
//                       : dark
//                       ? "bg-gray-800 border-gray-600 text-gray-100 focus:border-white focus:ring-white/10 placeholder-gray-500"
//                       : "bg-gray-50 border-gray-200 text-gray-800 focus:border-black focus:ring-black/10 placeholder-gray-400"
//                   }`}
//                 />

//                 {/* AI Enhancement Button */}
//                 <button
//                   type="button"
//                   onClick={handleAIEnhance}
//                   disabled={!content.trim() || enhancing}
//                   className={`absolute top-2 right-2 sm:top-3 sm:right-3 p-2 sm:p-2.5 rounded-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group ${
//                     dark
//                       ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl"
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

//               {/* Character count progress bar */}
//               <div className="mt-2">
//                 <div
//                   className={`w-full h-1.5 rounded-full overflow-hidden ${
//                     dark ? "bg-gray-700" : "bg-gray-200"
//                   }`}
//                 >
//                   <div
//                     className={`h-full transition-all duration-300 ${
//                       remainingChars < 0
//                         ? "bg-red-500"
//                         : remainingChars < 50
//                         ? "bg-orange-500"
//                         : dark
//                         ? "bg-white"
//                         : "bg-black"
//                     }`}
//                     style={{
//                       width: `${Math.min(
//                         (content.length / maxChars) * 100,
//                         100
//                       )}%`,
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* AI Enhanced Sample Display */}
//               {sample && (
//                 <div
//                   className={`mt-3 p-4 rounded-lg border-2 border-dashed transition-all ${
//                     dark
//                       ? "border-purple-600 bg-purple-900/20"
//                       : "border-purple-200 bg-purple-50"
//                   }`}
//                 >
//                   <div className="flex justify-between items-start mb-2">
//                     <span
//                       className={`text-xs font-medium ${
//                         dark ? "text-purple-400" : "text-purple-700"
//                       }`}
//                     >
//                       ✨ AI Enhanced Version
//                     </span>
//                     <div className="flex gap-2">
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setContent(sample);
//                           setSample("");
//                         }}
//                         className={`text-xs px-2 py-1 rounded ${
//                           dark
//                             ? "bg-purple-500 text-white hover:bg-purple-600"
//                             : "bg-purple-600 text-white hover:bg-purple-700"
//                         }`}
//                       >
//                         Use This
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => setSample("")}
//                         className={`text-xs px-2 py-1 rounded ${
//                           dark
//                             ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
//                             : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                         }`}
//                       >
//                         Dismiss
//                       </button>
//                     </div>
//                   </div>
//                   <p
//                     className={`text-sm leading-relaxed ${
//                       dark ? "text-gray-300" : "text-gray-700"
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
//                         dark ? "text-purple-400" : "text-purple-600"
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
//                         ? "text-gray-400"
//                         : "text-gray-500"
//                     }`}
//                   >
//                     {remainingChars} characters remaining
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Tags Section */}
//             <div className="space-y-3">
//               <label
//                 className={`block text-sm font-medium ${
//                   dark ? "text-gray-300" : "text-gray-700"
//                 }`}
//               >
//                 Tags <span className="text-xs opacity-70">(max 5)</span>
//               </label>

//               {/* Popular tags suggestions */}
//               {tags.length < 5 && (
//                 <div className="flex flex-wrap gap-1.5 mb-2">
//                   <span
//                     className={`text-xs ${
//                       dark ? "text-gray-400" : "text-gray-600"
//                     }`}
//                   >
//                     Popular:
//                   </span>
//                   {popularTags
//                     .filter((tag) => !tags.includes(tag))
//                     .slice(0, 3)
//                     .map((tag) => (
//                       <button
//                         key={tag}
//                         type="button"
//                         onClick={() => addPopularTag(tag)}
//                         className={`text-xs px-2 py-0.5 rounded-full border transition-all hover:scale-105 ${
//                           dark
//                             ? "border-gray-600 text-gray-400 hover:bg-gray-800"
//                             : "border-gray-300 text-gray-600 hover:bg-gray-100"
//                         }`}
//                       >
//                         +{tag}
//                       </button>
//                     ))}
//                 </div>
//               )}

//               {/* Tag input */}
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
//                       ? "bg-gray-800 border-gray-600 text-gray-100 focus:border-white focus:ring-white/10"
//                       : "bg-gray-50 border-gray-200 text-gray-800 focus:border-black focus:ring-black/10"
//                   }`}
//                 />
//                 <button
//                   type="button"
//                   onClick={handleTagAdd}
//                   disabled={!tagInput.trim() || tags.length >= 5}
//                   className={`w-full xs:w-auto px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
//                     dark
//                       ? "bg-white text-black hover:bg-gray-100 disabled:bg-gray-600"
//                       : "bg-black text-white hover:bg-gray-800 disabled:bg-gray-300"
//                   }`}
//                 >
//                   Add
//                 </button>
//               </div>

//               {/* Tags Display */}
//               {tags.length > 0 && (
//                 <div className="flex flex-wrap gap-2">
//                   {tags.map((tag, idx) => (
//                     <span
//                       key={idx}
//                       className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-full flex items-center gap-1.5 sm:gap-2 transition-all duration-200 ${
//                         dark
//                           ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
//                           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                       }`}
//                     >
//                       #{tag}
//                       <button
//                         type="button"
//                         onClick={() => handleTagRemove(tag)}
//                         className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full flex items-center justify-center text-xs transition-colors ${
//                           dark
//                             ? "hover:bg-red-800 hover:text-red-300"
//                             : "hover:bg-red-100 hover:text-red-600"
//                         }`}
//                       >
//                         ×
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Submit Button */}
//             <div className="flex justify-end pt-2 sm:pt-4">
//               <button
//                 type="submit"
//                 disabled={!isFormValid || loading}
//                 className={`w-full xs:w-auto px-6 sm:px-8 py-2.5 sm:py-3 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 ${
//                   dark
//                     ? "bg-white text-black hover:bg-gray-100 shadow-lg hover:shadow-xl"
//                     : "bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl"
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

// import { useState, useEffect } from "react";
// import PostSubmitLoader from "./PostSubmitLoader";
// import useThemeStore from "../store/themeStore";
// import useAuthStore from "../store/authStore";
// import api1 from "../utils/api1";

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
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [draftSaved, setDraftSaved] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   const maxChars = 500;
//   const maxTitleChars = 100;
//   const popularTags = ["tech", "startup", "innovation", "business", "design"];
//   const authorId = user?.id;

//   // Screen size detection for SSR safety
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 640);
//     };
//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   // Auto-save draft functionality
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (title || content) {
//         localStorage.setItem("postDraft", JSON.stringify({ title, content, tags }));
//         setDraftSaved(true);
//         setTimeout(() => setDraftSaved(false), 2000);
//       }
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, [title, content, tags]);

//   // Load draft on component mount
//   useEffect(() => {
//     const savedDraft = localStorage.getItem("postDraft");
//     if (savedDraft) {
//       try {
//         const { title: savedTitle, content: savedContent, tags: savedTags } = JSON.parse(savedDraft);
//         if (savedTitle || savedContent) {
//           setTitle(savedTitle || "");
//           setContent(savedContent || "");
//           setTags(savedTags || []);
//         }
//       } catch (error) {
//         console.error("Error parsing saved draft:", error);
//         localStorage.removeItem("postDraft");
//       }
//     }
//   }, []);

//   const validateForm = () => {
//     const newErrors = {};
//     if (!title.trim()) newErrors.title = "Title is required";
//     if (!content.trim()) newErrors.content = "Content is required";
//     if (content.length > maxChars) newErrors.content = `Content exceeds ${maxChars} characters`;
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Clear draft function
//   const handleClearDraft = () => {
//     setTitle("");
//     setContent("");
//     setTags([]);
//     setTagInput("");
//     setErrors({});
//     setSample("");
//     localStorage.removeItem("postDraft");
//     setDraftSaved(false);
//   };

//   const handleAIEnhance = async () => {
//     if (!content.trim()) {
//       setErrors({ content: "Please enter some content to enhance" });
//       return;
//     }
//     setEnhancing(true);
//     try {
//       const res = await api1.post("/user/ask", {
//         content: `
//           You are an expert content writer and editor.
//           Your job is to take the following text and:
//           1. Improve clarity, grammar, and flow.
//           2. Make it engaging and easy to read.
//           3. Expand with relevant details/examples if needed.
//           4. Keep the tone friendly yet professional.
//           5. Return ONLY the improved best version of the text (do NOT include summaries, labels, or extra formatting).

//           Here is the text to improve:
//           ---
//           ${content}
//           ---
//         `,
//       });
//       const enhancedContent = res.data.data.choices[0].message.content.trim();
//       setSample(enhancedContent);
//       setErrors({});
//     } catch (error) {
//       console.error("AI Enhancement error:", error);
//       setErrors({ content: "Failed to enhance content. Please try again." });
//     } finally {
//       setEnhancing(false);
//     }
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

//   const addPopularTag = (tag) => {
//     if (tags.length < 5 && !tags.includes(tag)) {
//       setTags([...tags, tag]);
//     }
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
//         createdAt: new Date().toISOString(),
//       };

//       const res = await api1.post("/user/posts/createpost", post);

//       if (res.data && res.data.authorId === authorId) {
//         setTitle("");
//         setContent("");
//         setTags([]);
//         setTagInput("");
//         setErrors({});
//         setSample("");
//         setShowSuccess(true);
//         localStorage.removeItem("postDraft");
//         setTimeout(() => setShowSuccess(false), 3000);
//       }
//     } catch (error) {
//       console.error("Post creation error:", error);
//       setErrors({ submit: "Failed to create post. Please try again." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const remainingChars = maxChars - content.length;
//   const isFormValid = title.trim() && content.trim() && remainingChars >= 0;

//   // Check if there's any draft content to show/hide clear button
//   const hasDraftContent = title.trim() || content.trim() || tags.length > 0;

//   return (
//     <div className="w-full min-h-screen px-3 sm:px-4 lg:px-6 py-4 pt-0 sm:py-6 lg:py-8 lg:pt-2 relative">
//       {/* Glassmorphism Background Pattern */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-30 ${
//           dark ? "bg-gradient-to-br from-purple-500/20 to-blue-500/20" : "bg-gradient-to-br from-purple-300/30 to-blue-300/30"
//         }`}></div>
//         <div className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20 ${
//           dark ? "bg-gradient-to-tr from-pink-500/20 to-orange-500/20" : "bg-gradient-to-tr from-pink-300/30 to-orange-300/30"
//         }`}></div>
//       </div>

//       <div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto relative z-10">
//         <div
//           className={`rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-3xl backdrop-blur-xl border ${
//             !dark
//               ? "border-white/20 bg-white/10 shadow-black/5"
//               : "border-white/10 bg-black/10 shadow-white/5"
//           }`}
//           style={{
//             backdropFilter: "blur(20px)",
//             WebkitBackdropFilter: "blur(20px)",
//           }}
//         >
//           {/* Glassmorphism Header */}
//           <div
//             className={`px-4 sm:px-6 py-3 sm:py-4 border-b backdrop-blur-sm rounded-t-2xl ${
//               dark
//                 ? "border-white/10 bg-gradient-to-r from-white/5 to-white/10"
//                 : "border-black/10 bg-gradient-to-r from-black/5 to-black/10"
//             }`}
//           >
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2 sm:gap-3">
//                 {/* Glassmorphism dot indicator */}
//                 <div
//                   className={`w-3 h-3 rounded-full backdrop-blur-sm border ${
//                     dark
//                       ? "bg-gradient-to-br from-white/20 to-white/10 border-white/20"
//                       : "bg-gradient-to-br from-black/20 to-black/10 border-black/20"
//                   }`}
//                 ></div>
//                 <h2
//                   className={`text-lg sm:text-xl font-semibold ${
//                     dark ? "text-white/90" : "text-black/90"
//                   }`}
//                 >
//                   Share Your Idea
//                 </h2>
//               </div>

//               <div className="flex items-center gap-3">
//                 {/* Draft saved indicator with glassmorphism */}
//                 {draftSaved && (
//                   <div
//                     className={`text-xs flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-sm border ${
//                       dark
//                         ? "text-green-300 bg-green-500/10 border-green-500/20"
//                         : "text-green-700 bg-green-500/10 border-green-500/20"
//                     }`}
//                   >
//                     <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
//                       <path
//                         fillRule="evenodd"
//                         d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                       />
//                     </svg>
//                     Draft saved
//                   </div>
//                 )}

//                 {/* Glassmorphism Clear Draft Button */}
//                 {hasDraftContent && (
//                   <button
//                     type="button"
//                     onClick={handleClearDraft}
//                     className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm border ${
//                       dark
//                         ? "bg-white/10 text-white/80 hover:bg-white/15 border-white/20 hover:border-white/30"
//                         : "bg-black/10 text-black/80 hover:bg-black/15 border-black/20 hover:border-black/30"
//                     }`}
//                     title="Clear all draft content"
//                   >
//                     <div className="flex items-center gap-1.5">
//                       <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                         />
//                       </svg>
//                       Clear Draft
//                     </div>
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           <form
//             onSubmit={handleSubmit}
//             className="p-4 sm:p-6 space-y-4 sm:space-y-6"
//           >
//             {/* Glassmorphism Success message */}
//             {showSuccess && (
//               <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 text-sm flex items-center gap-2 backdrop-blur-sm">
//                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                   />
//                 </svg>
//                 Post published successfully! 🎉
//               </div>
//             )}

//             {errors.submit && (
//               <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm backdrop-blur-sm">
//                 {errors.submit}
//               </div>
//             )}

//             {/* Glassmorphism Title Input */}
//             <div className="space-y-2">
//               <label
//                 className={`block text-sm font-medium ${
//                   dark ? "text-white/80" : "text-black/80"
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
//                 className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base border transition-all duration-300 focus:outline-none focus:ring-4 backdrop-blur-sm ${
//                   errors.title
//                     ? "border-red-400/50 focus:border-red-500/70 focus:ring-red-500/20 bg-red-50/10"
//                     : dark
//                     ? "bg-white/5 border-white/20 text-white/90 focus:border-white/40 focus:ring-white/10 placeholder-white/50 hover:bg-white/10"
//                     : "bg-black/5 border-black/20 text-black/90 focus:border-black/40 focus:ring-black/10 placeholder-black/50 hover:bg-black/10"
//                 }`}
//               />
//               <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1">
//                 {errors.title && (
//                   <span className="text-red-500 text-xs">{errors.title}</span>
//                 )}
//                 <span
//                   className={`text-xs xs:ml-auto ${
//                     dark ? "text-white/60" : "text-black/60"
//                   }`}
//                 >
//                   {title.length}/{maxTitleChars}
//                 </span>
//               </div>
//             </div>

//             {/* Glassmorphism Content Textarea */}
//             <div className="space-y-2">
//               <label
//                 className={`block text-sm font-medium ${
//                   dark ? "text-white/80" : "text-black/80"
//                 }`}
//               >
//                 Content
//               </label>

//               <div className="relative">
//                 <textarea
//                   rows={isMobile ? 3 : 4}
//                   maxLength={maxChars}
//                   value={content}
//                   onChange={(e) => setContent(e.target.value)}
//                   placeholder="Describe your idea in detail..."
//                   className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-12 sm:pr-16 rounded-xl resize-y min-h-[100px] max-h-[400px] text-sm sm:text-base border transition-all duration-300 focus:outline-none focus:ring-4 backdrop-blur-sm ${
//                     errors.content
//                       ? "border-red-400/50 focus:border-red-500/70 focus:ring-red-500/20 bg-red-50/10"
//                       : dark
//                       ? "bg-white/5 border-white/20 text-white/90 focus:border-white/40 focus:ring-white/10 placeholder-white/50 hover:bg-white/10"
//                       : "bg-black/5 border-black/20 text-black/90 focus:border-black/40 focus:ring-black/10 placeholder-black/50 hover:bg-black/10"
//                   }`}
//                 />

//                 {/* Glassmorphism AI Enhancement Button */}
//                 <button
//                   type="button"
//                   onClick={handleAIEnhance}
//                   disabled={!content.trim() || enhancing}
//                   className={`absolute top-2 right-2 sm:top-3 sm:right-3 p-2 sm:p-2.5 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group backdrop-blur-sm border ${
//                     dark
//                       ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/30 text-white hover:from-purple-500/30 hover:to-blue-500/30 shadow-lg hover:shadow-xl"
//                       : "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/30 text-black hover:from-purple-500/30 hover:to-blue-500/30 shadow-lg hover:shadow-xl"
//                   }`}
//                   title="Enhance content with AI"
//                 >
//                   {enhancing ? (
//                     <div className="animate-spin">
//                       <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24">
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

//               {/* Glassmorphism Character count progress bar */}
//               <div className="mt-2">
//                 <div
//                   className={`w-full h-2 rounded-full overflow-hidden backdrop-blur-sm ${
//                     dark ? "bg-white/10" : "bg-black/10"
//                   }`}
//                 >
//                   <div
//                     className={`h-full transition-all duration-500 ${
//                       remainingChars < 0
//                         ? "bg-gradient-to-r from-red-500 to-red-600"
//                         : remainingChars < 50
//                         ? "bg-gradient-to-r from-orange-500 to-orange-600"
//                         : dark
//                         ? "bg-gradient-to-r from-white/60 to-white/80"
//                         : "bg-gradient-to-r from-black/60 to-black/80"
//                     }`}
//                     style={{
//                       width: `${Math.min((content.length / maxChars) * 100, 100)}%`,
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* Glassmorphism AI Enhanced Sample Display */}
//               {sample && (
//                 <div
//                   className={`mt-3 p-4 rounded-xl border backdrop-blur-sm transition-all duration-500 ${
//                     dark
//                       ? "border-purple-500/30 bg-purple-500/10"
//                       : "border-purple-500/30 bg-purple-500/10"
//                   }`}
//                 >
//                   <div className="flex justify-between items-start mb-2">
//                     <span
//                       className={`text-xs font-medium ${
//                         dark ? "text-purple-300" : "text-purple-700"
//                       }`}
//                     >
//                       ✨ AI Enhanced Version
//                     </span>
//                     <div className="flex gap-2">
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setContent(sample);
//                           setSample("");
//                         }}
//                         className={`text-xs px-3 py-1 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
//                           dark
//                             ? "bg-purple-500/20 border-purple-500/30 text-purple-300 hover:bg-purple-500/30"
//                             : "bg-purple-500/20 border-purple-500/30 text-purple-700 hover:bg-purple-500/30"
//                         }`}
//                       >
//                         Use This
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => setSample("")}
//                         className={`text-xs px-3 py-1 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
//                           dark
//                             ? "bg-white/10 border-white/20 text-white/70 hover:bg-white/15"
//                             : "bg-black/10 border-black/20 text-black/70 hover:bg-black/15"
//                         }`}
//                       >
//                         Dismiss
//                       </button>
//                     </div>
//                   </div>
//                   <p
//                     className={`text-sm leading-relaxed ${
//                       dark ? "text-white/80" : "text-black/80"
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
//                       className={`text-xs px-2 py-1 rounded-full backdrop-blur-sm ${
//                         dark
//                           ? "text-purple-300 bg-purple-500/10"
//                           : "text-purple-700 bg-purple-500/10"
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
//                         ? "text-white/60"
//                         : "text-black/60"
//                     }`}
//                   >
//                     {remainingChars} characters remaining
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Glassmorphism Tags Section */}
//             <div className="space-y-3">
//               <label
//                 className={`block text-sm font-medium ${
//                   dark ? "text-white/80" : "text-black/80"
//                 }`}
//               >
//                 Tags <span className="text-xs opacity-70">(max 5)</span>
//               </label>

//               {/* Popular tags with glassmorphism */}
//               {tags.length < 5 && (
//                 <div className="flex flex-wrap gap-1.5 mb-2">
//                   <span
//                     className={`text-xs ${
//                       dark ? "text-white/60" : "text-black/60"
//                     }`}
//                   >
//                     Popular:
//                   </span>
//                   {popularTags
//                     .filter((tag) => !tags.includes(tag))
//                     .slice(0, 3)
//                     .map((tag) => (
//                       <button
//                         key={tag}
//                         type="button"
//                         onClick={() => addPopularTag(tag)}
//                         className={`text-xs px-3 py-1 rounded-full border transition-all duration-300 hover:scale-105 backdrop-blur-sm ${
//                           dark
//                             ? "border-white/20 text-white/70 hover:bg-white/10 bg-white/5"
//                             : "border-black/20 text-black/70 hover:bg-black/10 bg-black/5"
//                         }`}
//                       >
//                         +{tag}
//                       </button>
//                     ))}
//                 </div>
//               )}

//               {/* Glassmorphism Tag input */}
//               <div className="flex flex-col xs:flex-row gap-2">
//                 <input
//                   type="text"
//                   value={tagInput}
//                   onChange={(e) => setTagInput(e.target.value)}
//                   onKeyPress={handleTagKeyPress}
//                   placeholder="Add a tag (e.g., tech, startup)"
//                   disabled={tags.length >= 5}
//                   className={`w-full xs:flex-grow px-3 sm:px-4 py-2 rounded-xl text-sm border transition-all duration-300 focus:outline-none focus:ring-4 backdrop-blur-sm ${
//                     tags.length >= 5
//                       ? "opacity-50 cursor-not-allowed"
//                       : dark
//                       ? "bg-white/5 border-white/20 text-white/90 focus:border-white/40 focus:ring-white/10 hover:bg-white/10"
//                       : "bg-black/5 border-black/20 text-black/90 focus:border-black/40 focus:ring-black/10 hover:bg-black/10"
//                   }`}
//                 />
//                 <button
//                   type="button"
//                   onClick={handleTagAdd}
//                   disabled={!tagInput.trim() || tags.length >= 5}
//                   className={`w-full xs:w-auto px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm border ${
//                     dark
//                       ? "bg-white/10 border-white/20 text-white/90 hover:bg-white/15 disabled:bg-white/5"
//                       : "bg-black/10 border-black/20 text-black/90 hover:bg-black/15 disabled:bg-black/5"
//                   }`}
//                 >
//                   Add
//                 </button>
//               </div>

//               {/* Glassmorphism Tags Display */}
//               {tags.length > 0 && (
//                 <div className="flex flex-wrap gap-2">
//                   {tags.map((tag, idx) => (
//                     <span
//                       key={idx}
//                       className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-full flex items-center gap-1.5 sm:gap-2 transition-all duration-300 backdrop-blur-sm border hover:scale-105 ${
//                         dark
//                           ? "bg-white/10 border-white/20 text-white/80 hover:bg-white/15"
//                           : "bg-black/10 border-black/20 text-black/80 hover:bg-black/15"
//                       }`}
//                     >
//                       #{tag}
//                       <button
//                         type="button"
//                         onClick={() => handleTagRemove(tag)}
//                         className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full flex items-center justify-center text-xs transition-all duration-200 hover:scale-110 ${
//                           dark
//                             ? "hover:bg-red-500/20 hover:text-red-400"
//                             : "hover:bg-red-500/20 hover:text-red-600"
//                         }`}
//                       >
//                         ×
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Glassmorphism Submit Button */}
//             <div className="flex justify-end pt-2 sm:pt-4">
//               <button
//                 type="submit"
//                 disabled={!isFormValid || loading}
//                 className={`w-full xs:w-auto px-6 sm:px-8 py-2.5 sm:py-3 font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 backdrop-blur-sm border ${
//                   dark
//                     ? "bg-gradient-to-r from-white/20 to-white/30 border-white/30 text-white hover:from-white/30 hover:to-white/40 shadow-lg hover:shadow-2xl"
//                     : "bg-gradient-to-r from-black/20 to-black/30 border-black/30 text-black hover:from-black/30 hover:to-black/40 shadow-lg hover:shadow-2xl"
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
import api1 from "../utils/api1";

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
  const [isMobile, setIsMobile] = useState(false);

  const maxChars = 1000;
  const maxTitleChars = 100;
  const popularTags = ["tech", "startup", "innovation", "business", "design"];
  const authorId = user?.id;

  // Enhanced screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

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
      try {
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
      } catch (error) {
        console.error("Error parsing saved draft:", error);
        localStorage.removeItem("postDraft");
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

  // Clear draft function
  const handleClearDraft = () => {
    setTitle("");
    setContent("");
    setTags([]);
    setTagInput("");
    setErrors({});
    setSample("");
    localStorage.removeItem("postDraft");
    setDraftSaved(false);
  };

  const handleAIEnhance = async () => {
    if (!content.trim()) {
      setErrors({ content: "Please enter some content to enhance" });
      return;
    }
    setEnhancing(true);
    try {
      const res = await api1.post("/user/ask", {
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
      setErrors({});
    } catch (error) {
      console.error("AI Enhancement error:", error);
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
        createdAt: new Date().toISOString(),
      };

      const res = await api1.post("/user/posts/createpost", post);

      if (res.data && res.data.authorId === authorId) {
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
      console.error("Post creation error:", error);
      setErrors({ submit: "Failed to create post. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const remainingChars = maxChars - content.length;
  const isFormValid = title.trim() && content.trim() && remainingChars >= 0;

  // Check if there's any draft content to show/hide clear button
  const hasDraftContent = title.trim() || content.trim() || tags.length > 0;

  return (
    <div className="w-full min-h-screen px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-4 md:py-6 lg:py-8 relative overflow-hidden">
      {/* Enhanced multi-layer glassmorphism background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary gradient orbs */}
        <div
          className={`absolute -top-32 -right-32 w-64 h-64 md:w-80 md:h-80 rounded-full blur-3xl transition-opacity duration-1000`}
        ></div>

        <div
          className={`absolute -bottom-32 -left-32 w-72 h-72 md:w-96 md:h-96 rounded-full blur-3xl transition-opacity duration-1000 ${
            dark
              ? "bg-gradient-to-tr from-emerald-500/20 via-cyan-500/15 to-blue-500/25"
              : "bg-gradient-to-tr from-emerald-400/25 via-cyan-400/20 to-blue-400/30"
          }`}
        ></div>

        {/* Secondary accent orbs for depth */}
        <div
          className={`absolute top-1/3 right-1/4 w-48 h-48 md:w-56 md:h-56 rounded-full blur-2xl opacity-60 ${
            dark
              ? "bg-gradient-to-br from-orange-500/15 to-red-500/10"
              : "bg-gradient-to-br from-orange-400/20 to-red-400/15"
          }`}
        ></div>

        <div
          className={`absolute bottom-1/3 left-1/4 w-40 h-40 md:w-48 md:h-48 rounded-full blur-2xl opacity-40 ${
            dark
              ? "bg-gradient-to-br from-violet-500/20 to-indigo-500/15"
              : "bg-gradient-to-br from-violet-400/25 to-indigo-400/20"
          }`}
        ></div>
      </div>

      <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto relative z-10">
        <div
          className={`rounded-lg md:rounded-xl transition-all duration-700 hover:scale-[1.01] backdrop-blur-2xl border shadow-2xl ${
            !dark
              ? "border-white/25 bg-white/8 shadow-black/10"
              : "border-white/15 bg-black/8 shadow-white/5"
          }`}
          style={{
            backdropFilter: "blur(24px) saturate(200%)",
            WebkitBackdropFilter: "blur(24px) saturate(200%)",
            boxShadow: dark
              ? "0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
              : "0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          }}
        >
          {/* Ultra-elegant header with subtle gradient overlay */}
          <div
            className={`px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b backdrop-blur-sm rounded-t-lg md:rounded-t-xl relative overflow-hidden ${
              dark
                ? "border-white/10 bg-gradient-to-r from-white/3 via-white/8 to-white/3"
                : "border-black/10 bg-gradient-to-r from-black/3 via-black/8 to-black/3"
            }`}
          >
            {/* Subtle shimmer overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${
                dark
                  ? "from-transparent via-white/5 to-transparent"
                  : "from-transparent via-black/5 to-transparent"
              } opacity-50`}
            ></div>

            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Enhanced dot indicator with inner glow */}
                <div
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full backdrop-blur-sm border relative ${
                    dark
                      ? "bg-gradient-to-br from-white/30 via-white/20 to-white/10 border-white/30"
                      : "bg-gradient-to-br from-black/30 via-black/20 to-black/10 border-black/30"
                  }`}
                >
                  <div
                    className={`absolute inset-0.5 rounded-full ${
                      dark ? "bg-white/20" : "bg-black/20"
                    }`}
                  ></div>
                </div>
                <h2
                  className={`text-base sm:text-lg md:text-xl font-semibold tracking-tight ${
                    dark ? "text-white/95" : "text-black/95"
                  }`}
                >
                  Share Your Idea
                </h2>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                {/* Enhanced draft saved indicator */}
                {draftSaved && (
                  <div
                    className={`text-xs flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm border transition-all duration-500 ${
                      dark
                        ? "text-emerald-300 bg-emerald-500/15 border-emerald-500/25"
                        : "text-emerald-700 bg-emerald-500/15 border-emerald-500/25"
                    }`}
                  >
                    <svg
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      />
                    </svg>
                    <span className="hidden sm:inline">Draft saved</span>
                    <span className="sm:hidden">Saved</span>
                  </div>
                )}

                {/* Enhanced clear draft button */}
                {hasDraftContent && (
                  <button
                    type="button"
                    onClick={handleClearDraft}
                    className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm border ${
                      dark
                        ? "bg-white/8 text-white/85 hover:bg-white/15 border-white/20 hover:border-white/35"
                        : "bg-black/8 text-black/85 hover:bg-black/15 border-black/20 hover:border-black/35"
                    }`}
                    title="Clear all draft content"
                  >
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <svg
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      <span className="hidden sm:inline">Clear</span>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6"
          >
            {/* Enhanced success message */}
            {showSuccess && (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 text-sm flex items-center gap-2 backdrop-blur-sm transition-all duration-500 animate-in slide-in-from-top-2">
                <svg
                  className="w-4 h-4 flex-shrink-0"
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

            {errors.submit && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/25 text-red-600 text-sm backdrop-blur-sm">
                {errors.submit}
              </div>
            )}

            {/* Enhanced title input */}
            <div className="space-y-2">
              <label
                className={`block text-sm font-medium ${
                  dark ? "text-white/85" : "text-black/85"
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
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base border transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm ${
                  errors.title
                    ? "border-red-400/50 focus:border-red-500/70 focus:ring-red-500/20 bg-red-50/10"
                    : dark
                    ? "bg-white/5 border-white/20 text-white/95 focus:border-white/50 focus:ring-white/15 placeholder-white/50 hover:bg-white/8"
                    : "bg-black/5 border-black/20 text-black/95 focus:border-black/50 focus:ring-black/15 placeholder-black/50 hover:bg-black/8"
                }`}
              />
              <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1">
                {errors.title && (
                  <span className="text-red-500 text-xs">{errors.title}</span>
                )}
                <span
                  className={`text-xs xs:ml-auto ${
                    dark ? "text-white/60" : "text-black/60"
                  }`}
                >
                  {title.length}/{maxTitleChars}
                </span>
              </div>
            </div>

            {/* Enhanced content textarea */}
            <div className="space-y-2">
              <label
                className={`block text-sm font-medium ${
                  dark ? "text-white/85" : "text-black/85"
                }`}
              >
                Content
              </label>

              <div className="relative">
                <textarea
                  rows={isMobile ? 4 : 5}
                  maxLength={maxChars}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Describe your idea in detail..."
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-14 rounded-lg resize-y min-h-[120px] max-h-[400px] text-sm sm:text-base border transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm ${
                    errors.content
                      ? "border-red-400/50 focus:border-red-500/70 focus:ring-red-500/20 bg-red-50/10"
                      : dark
                      ? "bg-white/5 border-white/20 text-white/95 focus:border-white/50 focus:ring-white/15 placeholder-white/50 hover:bg-white/8"
                      : "bg-black/5 border-black/20 text-black/95 focus:border-black/50 focus:ring-black/15 placeholder-black/50 hover:bg-black/8"
                  }`}
                />

                {/* Enhanced AI button with elegant positioning */}
                <button
                  type="button"
                  onClick={handleAIEnhance}
                  disabled={!content.trim() || enhancing}
                  className={`absolute top-2 right-2 sm:top-3 sm:right-3 p-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group backdrop-blur-sm border ${
                    dark
                      ? "bg-gradient-to-br from-violet-500/20 via-purple-500/15 to-indigo-500/20 border-violet-500/30 text-white hover:from-violet-500/30 hover:via-purple-500/25 hover:to-indigo-500/30"
                      : "bg-gradient-to-br from-violet-500/20 via-purple-500/15 to-indigo-500/20 border-violet-500/30 text-black hover:from-violet-500/30 hover:via-purple-500/25 hover:to-indigo-500/30"
                  }`}
                  title="Enhance content with AI"
                >
                  {enhancing ? (
                    <div className="animate-spin">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
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
                      className="w-4 h-4 transition-transform group-hover:scale-110"
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

              {/* Enhanced progress bar with gradient */}
              <div className="mt-2">
                <div
                  className={`w-full h-1.5 rounded-full overflow-hidden backdrop-blur-sm ${
                    dark ? "bg-white/10" : "bg-black/10"
                  }`}
                >
                  <div
                    className={`h-full transition-all duration-500 ${
                      remainingChars < 0
                        ? "bg-gradient-to-r from-red-500 to-pink-500"
                        : remainingChars < 50
                        ? "bg-gradient-to-r from-orange-500 to-amber-500"
                        : dark
                        ? "bg-gradient-to-r from-white/70 to-white/90"
                        : "bg-gradient-to-r from-black/70 to-black/90"
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

              {/* Enhanced AI sample display */}
              {sample && (
                <div
                  className={`mt-3 p-3 sm:p-4 rounded-lg border backdrop-blur-sm transition-all duration-500 animate-in slide-in-from-top-2 ${
                    dark
                      ? "border-violet-500/30 bg-violet-500/8"
                      : "border-violet-500/30 bg-violet-500/8"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <span
                      className={`text-xs font-medium flex items-center gap-1 ${
                        dark ? "text-violet-300" : "text-violet-700"
                      }`}
                    >
                      ✨ AI Enhanced
                    </span>
                    <div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setContent(sample);
                          setSample("");
                        }}
                        className={`text-xs px-2 sm:px-3 py-1 rounded-md backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                          dark
                            ? "bg-violet-500/20 border-violet-500/30 text-violet-300 hover:bg-violet-500/30"
                            : "bg-violet-500/20 border-violet-500/30 text-violet-700 hover:bg-violet-500/30"
                        }`}
                      >
                        Use
                      </button>
                      <button
                        type="button"
                        onClick={() => setSample("")}
                        className={`text-xs px-2 sm:px-3 py-1 rounded-md backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                          dark
                            ? "bg-white/8 border-white/20 text-white/70 hover:bg-white/15"
                            : "bg-black/8 border-black/20 text-black/70 hover:bg-black/15"
                        }`}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  <p
                    className={`text-sm leading-relaxed ${
                      dark ? "text-white/85" : "text-black/85"
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
                      className={`text-xs px-2 py-0.5 rounded-full backdrop-blur-sm ${
                        dark
                          ? "text-violet-300 bg-violet-500/10"
                          : "text-violet-700 bg-violet-500/10"
                      }`}
                    >
                      Enhancing...
                    </span>
                  )}
                  <span
                    className={`text-xs ${
                      remainingChars < 20
                        ? "text-orange-500"
                        : remainingChars < 0
                        ? "text-red-500"
                        : dark
                        ? "text-white/60"
                        : "text-black/60"
                    }`}
                  >
                    {remainingChars} left
                  </span>
                </div>
              </div>
            </div>

            {/* Enhanced tags section */}
            <div className="space-y-3">
              <label
                className={`block text-sm font-medium ${
                  dark ? "text-white/85" : "text-black/85"
                }`}
              >
                Tags <span className="text-xs opacity-70">(max 5)</span>
              </label>

              {/* Mobile-optimized popular tags */}
              {tags.length < 5 && (
                <div className="flex flex-wrap gap-1.5 mb-2">
                  <span
                    className={`text-xs ${
                      dark ? "text-white/60" : "text-black/60"
                    }`}
                  >
                    Popular:
                  </span>
                  {popularTags
                    .filter((tag) => !tags.includes(tag))
                    .slice(0, isMobile ? 2 : 3)
                    .map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => addPopularTag(tag)}
                        className={`text-xs px-2 sm:px-3 py-1 rounded-full border transition-all duration-300 hover:scale-105 backdrop-blur-sm ${
                          dark
                            ? "border-white/20 text-white/70 hover:bg-white/10 bg-white/5"
                            : "border-black/20 text-black/70 hover:bg-black/10 bg-black/5"
                        }`}
                      >
                        +{tag}
                      </button>
                    ))}
                </div>
              )}

              {/* Mobile-optimized tag input */}
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleTagKeyPress}
                  placeholder="Add a tag..."
                  disabled={tags.length >= 5}
                  className={`w-full sm:flex-grow px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm border transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm ${
                    tags.length >= 5
                      ? "opacity-50 cursor-not-allowed"
                      : dark
                      ? "bg-white/5 border-white/20 text-white/95 focus:border-white/50 focus:ring-white/15 hover:bg-white/8"
                      : "bg-black/5 border-black/20 text-black/95 focus:border-black/50 focus:ring-black/15 hover:bg-black/8"
                  }`}
                />
                <button
                  type="button"
                  onClick={handleTagAdd}
                  disabled={!tagInput.trim() || tags.length >= 5}
                  className={`w-full sm:w-auto px-4 py-2 sm:py-2.5 text-sm font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm border ${
                    dark
                      ? "bg-white/10 border-white/20 text-white/95 hover:bg-white/15 disabled:bg-white/5"
                      : "bg-black/10 border-black/20 text-black/95 hover:bg-black/15 disabled:bg-black/5"
                  }`}
                >
                  Add
                </button>
              </div>

              {/* Enhanced tags display with better mobile layout */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full flex items-center gap-1 sm:gap-1.5 transition-all duration-300 backdrop-blur-sm border hover:scale-105 ${
                        dark
                          ? "bg-white/10 border-white/20 text-white/85 hover:bg-white/15"
                          : "bg-black/10 border-black/20 text-black/85 hover:bg-black/15"
                      }`}
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleTagRemove(tag)}
                        className={`w-3 h-3 rounded-full flex items-center justify-center text-xs transition-all duration-200 hover:scale-110 ${
                          dark
                            ? "hover:bg-red-500/20 hover:text-red-400"
                            : "hover:bg-red-500/20 hover:text-red-600"
                        }`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Enhanced submit button with perfect mobile optimization */}
            <div className="flex justify-stretch sm:justify-end pt-2 sm:pt-4">
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className={`w-full sm:w-auto px-6 md:px-8 py-3 md:py-3.5 font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 backdrop-blur-sm border ${
                  dark
                    ? "bg-gradient-to-r from-white/15 via-white/25 to-white/15 border-white/30 text-white hover:from-white/25 hover:via-white/35 hover:to-white/25 shadow-lg hover:shadow-xl"
                    : "bg-gradient-to-r from-black/15 via-black/25 to-black/15 border-black/30 text-black hover:from-black/25 hover:via-black/35 hover:to-black/25 shadow-lg hover:shadow-xl"
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
