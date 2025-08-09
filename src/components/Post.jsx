// import { useState, useEffect } from "react";
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
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [draftSaved, setDraftSaved] = useState(false);

//   const maxChars = 500;
//   const maxTitleChars = 100;
//   const popularTags = ["tech", "startup", "innovation", "business", "design"];

//   const authorId = user.id;

//   // Auto-save draft functionality
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (title || content) {
//         localStorage.setItem(
//           "postDraft",
//           JSON.stringify({ title, content, tags })
//         );
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
//       const {
//         title: savedTitle,
//         content: savedContent,
//         tags: savedTags,
//       } = JSON.parse(savedDraft);
//       if (savedTitle || savedContent) {
//         setTitle(savedTitle || "");
//         setContent(savedContent || "");
//         setTags(savedTags || []);
//       }
//     }
//   }, []);

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
//     try {
//       const res = await api1.post("user/ask", {
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
//     } catch (error) {
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
//         createdAt: new Date(),
//       };

//       const res = await api.post("/user/posts/createpost", post);

//       if (res.data.authorId === authorId) {
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
//             !dark
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
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2 sm:gap-3">
//                 <div
//                   className={`w-2 h-2 rounded-full ${
//                     dark ? "bg-black" : "bg-white"
//                   }`}
//                 ></div>
//                 <h2
//                   className={`text-lg sm:text-xl font-semibold ${
//                     dark ? "text-gray-800" : "text-gray-100"
//                   }`}
//                 >
//                   Share Your Idea
//                 </h2>
//               </div>

//               {/* Draft saved indicator */}
//               {draftSaved && (
//                 <div
//                   className={`text-xs flex items-center gap-1 ${
//                     dark ? "text-green-600" : "text-green-400"
//                   }`}
//                 >
//                   <svg
//                     className="w-3 h-3"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                     />
//                   </svg>
//                   Draft saved
//                 </div>
//               )}
//             </div>
//           </div>

//           <form
//             onSubmit={handleSubmit}
//             className="p-4 sm:p-6 space-y-4 sm:space-y-6"
//           >
//             {/* Success message */}
//             {showSuccess && (
//               <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm flex items-center gap-2">
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
//                   rows={window.innerWidth >= 640 ? 4 : 3}
//                   maxLength={maxChars}
//                   value={content}
//                   onChange={(e) => setContent(e.target.value)}
//                   placeholder="Describe your idea in detail..."
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

//               {/* Character count progress bar */}
//               <div className="mt-2">
//                 <div
//                   className={`w-full h-1.5 rounded-full overflow-hidden ${
//                     dark ? "bg-gray-200" : "bg-gray-700"
//                   }`}
//                 >
//                   <div
//                     className={`h-full transition-all duration-300 ${
//                       remainingChars < 0
//                         ? "bg-red-500"
//                         : remainingChars < 50
//                         ? "bg-orange-500"
//                         : dark
//                         ? "bg-black"
//                         : "bg-white"
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
//                         onClick={() => {
//                           setContent(sample);
//                           setSample("");
//                         }}
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

//               {/* Popular tags suggestions */}
//               {tags.length < 5 && (
//                 <div className="flex flex-wrap gap-1.5 mb-2">
//                   <span
//                     className={`text-xs ${
//                       dark ? "text-gray-600" : "text-gray-400"
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
//                             ? "border-gray-300 text-gray-600 hover:bg-gray-100"
//                             : "border-gray-600 text-gray-400 hover:bg-gray-800"
//                         }`}
//                       >
//                         +{tag}
//                       </button>
//                     ))}
//                 </div>
//               )}

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
import api1 from "../utils/api1"; // Fixed: Consistent naming

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
  const [isMobile, setIsMobile] = useState(false); // Added for SSR safety

  const maxChars = 500;
  const maxTitleChars = 100;
  const popularTags = ["tech", "startup", "innovation", "business", "design"];

  const authorId = user?.id; // Added optional chaining for safety

  // Screen size detection for SSR safety
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
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
        // Handle JSON parse error
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

  const handleAIEnhance = async () => {
    if (!content.trim()) {
      setErrors({ content: "Please enter some content to enhance" });
      return;
    }
    setEnhancing(true);
    try {
      const res = await api1.post("/user/ask", {
        // Fixed: Consistent API usage
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
      setErrors({}); // Clear any previous errors
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
        createdAt: new Date().toISOString(), // Use ISO string for consistency
      };

      const res = await api1.post("/user/posts/createpost", post); // Fixed: Consistent API usage

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

  return (
    <div className="w-full min-h-screen px-3 sm:px-4 lg:px-6 py-4 pt-0 sm:py-6 lg:py-8 lg:pt-2">
      <div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto">
        <div
          className={`rounded-xl sm:rounded-2xl shadow-lg backdrop-blur-sm border transition-all duration-300 ${
            !dark
              ? "border-gray-200/20 bg-white/95"
              : "border-gray-700/30 bg-gray-900/95"
          }`}
        >
          {/* Header */}
          <div
            className={`px-4 sm:px-6 py-3 sm:py-4 border-b ${
              dark ? "border-gray-700/50" : "border-gray-100" // Fixed: Corrected color logic
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    dark ? "bg-white" : "bg-black" // Fixed: Corrected color logic
                  }`}
                ></div>
                <h2
                  className={`text-lg sm:text-xl font-semibold ${
                    dark ? "text-gray-100" : "text-gray-800" // Fixed: Corrected color logic
                  }`}
                >
                  Share Your Idea
                </h2>
              </div>

              {draftSaved && (
                <div
                  className={`text-xs flex items-center gap-1 ${
                    dark ? "text-green-400" : "text-green-600"
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

            {errors.submit && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {errors.submit}
              </div>
            )}

            {/* Title Input */}
            <div className="space-y-2">
              <label
                className={`block text-sm font-medium ${
                  dark ? "text-gray-300" : "text-gray-700"
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
                    ? "bg-gray-800 border-gray-600 text-gray-100 focus:border-white focus:ring-white/10 placeholder-gray-500"
                    : "bg-gray-50 border-gray-200 text-gray-800 focus:border-black focus:ring-black/10 placeholder-gray-400"
                }`}
              />
              <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1">
                {errors.title && (
                  <span className="text-red-500 text-xs">{errors.title}</span>
                )}
                <span
                  className={`text-xs xs:ml-auto ${
                    dark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {title.length}/{maxTitleChars}
                </span>
              </div>
            </div>

            {/* Content Textarea with AI Enhancement Button */}
            <div className="space-y-2">
              <label
                className={`block text-sm font-medium ${
                  dark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Content
              </label>

              <div className="relative">
                <textarea
                  rows={isMobile ? 3 : 4} // Fixed: Safe screen size check
                  maxLength={maxChars}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Describe your idea in detail..."
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-12 sm:pr-16 rounded-lg resize-none text-sm sm:text-base border-2 transition-all duration-200 focus:outline-none focus:ring-4 ${
                    errors.content
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                      : dark
                      ? "bg-gray-800 border-gray-600 text-gray-100 focus:border-white focus:ring-white/10 placeholder-gray-500"
                      : "bg-gray-50 border-gray-200 text-gray-800 focus:border-black focus:ring-black/10 placeholder-gray-400"
                  }`}
                />

                {/* AI Enhancement Button */}
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
                    dark ? "bg-gray-700" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`h-full transition-all duration-300 ${
                      remainingChars < 0
                        ? "bg-red-500"
                        : remainingChars < 50
                        ? "bg-orange-500"
                        : dark
                        ? "bg-white"
                        : "bg-black"
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
                      ? "border-purple-600 bg-purple-900/20"
                      : "border-purple-200 bg-purple-50"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span
                      className={`text-xs font-medium ${
                        dark ? "text-purple-400" : "text-purple-700"
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
                            ? "bg-purple-500 text-white hover:bg-purple-600"
                            : "bg-purple-600 text-white hover:bg-purple-700"
                        }`}
                      >
                        Use This
                      </button>
                      <button
                        type="button"
                        onClick={() => setSample("")}
                        className={`text-xs px-2 py-1 rounded ${
                          dark
                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                  <p
                    className={`text-sm leading-relaxed ${
                      dark ? "text-gray-300" : "text-gray-700"
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
                        dark ? "text-purple-400" : "text-purple-600"
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
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    {remainingChars} characters remaining
                  </span>
                </div>
              </div>
            </div>

            {/* Tags Section */}
            <div className="space-y-3">
              <label
                className={`block text-sm font-medium ${
                  dark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Tags <span className="text-xs opacity-70">(max 5)</span>
              </label>

              {/* Popular tags suggestions */}
              {tags.length < 5 && (
                <div className="flex flex-wrap gap-1.5 mb-2">
                  <span
                    className={`text-xs ${
                      dark ? "text-gray-400" : "text-gray-600"
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
                            ? "border-gray-600 text-gray-400 hover:bg-gray-800"
                            : "border-gray-300 text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        +{tag}
                      </button>
                    ))}
                </div>
              )}

              {/* Tag input */}
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
                      ? "bg-gray-800 border-gray-600 text-gray-100 focus:border-white focus:ring-white/10"
                      : "bg-gray-50 border-gray-200 text-gray-800 focus:border-black focus:ring-black/10"
                  }`}
                />
                <button
                  type="button"
                  onClick={handleTagAdd}
                  disabled={!tagInput.trim() || tags.length >= 5}
                  className={`w-full xs:w-auto px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    dark
                      ? "bg-white text-black hover:bg-gray-100 disabled:bg-gray-600"
                      : "bg-black text-white hover:bg-gray-800 disabled:bg-gray-300"
                  }`}
                >
                  Add
                </button>
              </div>

              {/* Tags Display */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-full flex items-center gap-1.5 sm:gap-2 transition-all duration-200 ${
                        dark
                          ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleTagRemove(tag)}
                        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full flex items-center justify-center text-xs transition-colors ${
                          dark
                            ? "hover:bg-red-800 hover:text-red-300"
                            : "hover:bg-red-100 hover:text-red-600"
                        }`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-2 sm:pt-4">
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className={`w-full xs:w-auto px-6 sm:px-8 py-2.5 sm:py-3 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 ${
                  dark
                    ? "bg-white text-black hover:bg-gray-100 shadow-lg hover:shadow-xl"
                    : "bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl"
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
