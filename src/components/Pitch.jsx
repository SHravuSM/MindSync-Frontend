// import { useState, useEffect } from "react";
// import api from "../utils/api1";
// import Loader from "./Loader";
// import useThemeStore from "../store/themeStore";

// const Pitch = () => {
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState("");
//   const [draftSaved, setDraftSaved] = useState(false);
//   const { dark } = useThemeStore();
//   const [formData, setFormData] = useState({
//     startupName: "",
//     oneLiner: "",
//     problem: "",
//     solution: "",
//     targetMarket: "",
//     businessModel: "",
//     traction: "",
//     team: "",
//     goToMarketStrategy: "",
//     competition: "",
//     fundingAsk: "",
//     fundingUse: "",
//   });

//   // Auto-save draft functionality
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       // Check if any field has content
//       const hasContent = Object.values(formData).some(value => value.trim());

//       if (hasContent) {
//         localStorage.setItem("pitchDraft", JSON.stringify(formData));
//         setDraftSaved(true);
//         setTimeout(() => setDraftSaved(false), 2000);
//       }
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [formData]);

//   // Load draft on component mount
//   useEffect(() => {
//     const savedDraft = localStorage.getItem("pitchDraft");
//     if (savedDraft) {
//       try {
//         const parsedDraft = JSON.parse(savedDraft);
//         // Check if the draft has any content
//         const hasContent = Object.values(parsedDraft).some(value => value && value.trim());

//         if (hasContent) {
//           setFormData(parsedDraft);
//         }
//       } catch (error) {
//         console.error("Error parsing saved pitch draft:", error);
//         localStorage.removeItem("pitchDraft");
//       }
//     }
//   }, []);

//   // Clear draft function
//   const clearDraft = () => {
//     localStorage.removeItem("pitchDraft");
//     setFormData({
//       startupName: "",
//       oneLiner: "",
//       problem: "",
//       solution: "",
//       targetMarket: "",
//       businessModel: "",
//       traction: "",
//       team: "",
//       goToMarketStrategy: "",
//       competition: "",
//       fundingAsk: "",
//       fundingUse: "",
//     });
//     setDraftSaved(false);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     // Clear error when user starts typing
//     if (error) {
//       setError("");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const res = await api.post("/user/posts/submitpitch", formData);
//       setMessage(res.data.message);
//       setSuccess(true);

//       // Clear draft and reset form after successful submission
//       localStorage.removeItem("pitchDraft");
//       setFormData({
//         startupName: "",
//         oneLiner: "",
//         problem: "",
//         solution: "",
//         targetMarket: "",
//         businessModel: "",
//         traction: "",
//         team: "",
//         goToMarketStrategy: "",
//         competition: "",
//         fundingAsk: "",
//         fundingUse: "",
//       });
//     } catch (error) {
//       console.error("Error submitting pitch:", error);
//       setError(
//         error.response?.data?.message ||
//           "Failed to submit pitch. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fields = [
//     {
//       label: "Startup Name",
//       name: "startupName",
//       placeholder: "Enter your startup name",
//     },
//     {
//       label: "One-line Pitch",
//       name: "oneLiner",
//       placeholder: "Describe your startup in one sentence",
//     },
//     {
//       label: "Problem Statement",
//       name: "problem",
//       textarea: true,
//       placeholder: "What problem are you solving?",
//     },
//     {
//       label: "Solution",
//       name: "solution",
//       textarea: true,
//       placeholder: "How do you solve this problem?",
//     },
//     {
//       label: "Target Market",
//       name: "targetMarket",
//       textarea: true,
//       placeholder: "Who are your customers?",
//     },
//     {
//       label: "Business Model",
//       name: "businessModel",
//       textarea: true,
//       placeholder: "How do you make money?",
//     },
//     {
//       label: "Traction",
//       name: "traction",
//       textarea: true,
//       placeholder: "Any progress or milestones achieved?",
//     },
//     {
//       label: "Team",
//       name: "team",
//       textarea: true,
//       placeholder: "Key team members and their experience",
//     },
//     {
//       label: "Go-to-Market Strategy",
//       name: "goToMarketStrategy",
//       textarea: true,
//       placeholder: "How will you acquire customers?",
//     },
//     {
//       label: "Competition",
//       name: "competition",
//       textarea: true,
//       placeholder: "Who are your competitors and how are you different?",
//     },
//     {
//       label: "Funding Ask",
//       name: "fundingAsk",
//       placeholder: "How much funding do you need?",
//     },
//     {
//       label: "Use of Funds",
//       name: "fundingUse",
//       textarea: true,
//       placeholder: "How will you use the investment?",
//     },
//   ];

//   return (
//     <div
//       className={`min-h-screen pb-14 py-6 px-4 ${
//         dark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
//       }`}
//     >
//       <div className="max-w-2xl mx-auto">
//         {/* Header with draft status */}
//         <div className="text-center mb-7">
//           <div className="flex items-center justify-center gap-4 mb-3">
//             <h1 className="text-4xl font-light">Pitch Your Idea</h1>

//             {/* Draft saved indicator */}
//             {draftSaved && (
//               <div
//                 className={`text-xs flex items-center gap-1 ${
//                   dark ? "text-green-400" : "text-green-600"
//                 }`}
//               >
//                 <svg
//                   className="w-3 h-3"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                   />
//                 </svg>
//                 Draft saved
//               </div>
//             )}
//           </div>

//           <p className={`text-lg ${dark ? "text-gray-300" : "text-gray-600"}`}>
//             Tell us about your startup vision
//           </p>

//           {/* Clear draft button */}
//           {Object.values(formData).some(value => value.trim()) && (
//             <button
//               type="button"
//               onClick={clearDraft}
//               className={`mt-3 text-sm px-3 py-1 rounded ${
//                 dark
//                   ? "text-gray-400 hover:text-gray-300 hover:bg-gray-800"
//                   : "text-gray-600 hover:text-gray-700 hover:bg-gray-200"
//               } transition-colors`}
//             >
//               Clear Draft
//             </button>
//           )}
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
//             <p className="text-red-800 text-sm">{error}</p>
//           </div>
//         )}

//         {/* Success Message */}
//         {success && (
//           <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200">
//             <div className="flex items-center gap-2">
//               <svg
//                 className="w-4 h-4 text-green-600"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                 />
//               </svg>
//               <p className="text-green-800 text-sm">{message}</p>
//             </div>
//           </div>
//         )}

//         {/* Form */}
//         {!success ? (
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {fields.map(({ label, name, textarea, placeholder }) => (
//               <div key={name}>
//                 <label
//                   className={`block text-sm font-medium mb-2 ${
//                     dark ? "text-gray-200" : "text-gray-700"
//                   }`}
//                 >
//                   {label}
//                 </label>
//                 {textarea ? (
//                   <textarea
//                     name={name}
//                     rows="3"
//                     placeholder={placeholder}
//                     className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical ${
//                       dark
//                         ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
//                         : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
//                     }`}
//                     value={formData[name]}
//                     onChange={handleChange}
//                     required
//                   />
//                 ) : (
//                   <input
//                     type="text"
//                     name={name}
//                     placeholder={placeholder}
//                     className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                       dark
//                         ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
//                         : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
//                     }`}
//                     value={formData[name]}
//                     onChange={handleChange}
//                     required
//                   />
//                 )}
//               </div>
//             ))}

//             {/* Submit Button */}
//             <div className="pt-2">
//               {!loading ? (
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                 >
//                   Submit Pitch
//                 </button>
//               ) : (
//                 <div className="flex justify-center py-3">
//                   <Loader />
//                 </div>
//               )}
//             </div>
//           </form>
//         ) : (
//           <div className="text-center">
//             <p className="text-lg font-medium">{message}</p>
//             <button
//               onClick={() => {
//                 setSuccess(false);
//                 setMessage('');
//               }}
//               className={`mt-4 px-4 py-2 rounded-lg ${
//                 dark
//                   ? "bg-gray-800 text-white hover:bg-gray-700"
//                   : "bg-gray-200 text-gray-800 hover:bg-gray-300"
//               } transition-colors`}
//             >
//               Submit Another Pitch
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Pitch;

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import api from "../utils/api1";
// import Loader from "./Loader";
// import useThemeStore from "../store/themeStore";

// const Pitch = () => {
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [message, setMessage] = useState('');
//   const [errors, setErrors] = useState({});
//   const [draftSaved, setDraftSaved] = useState(false);
//   const { dark } = useThemeStore();
//   const [formData, setFormData] = useState({
//     startupName: "",
//     oneLiner: "",
//     problem: "",
//     solution: "",
//     targetMarket: "",
//     businessModel: "",
//     traction: "",
//     team: "",
//     goToMarketStrategy: "",
//     competition: "",
//     fundingAsk: "",
//     fundingUse: "",
//   });

//   // Auto-save functionality
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const hasContent = Object.values(formData).some(value => value.trim());

//       if (hasContent) {
//         localStorage.setItem("pitchDraft", JSON.stringify(formData));
//         setDraftSaved(true);
//         setTimeout(() => setDraftSaved(false), 2500);
//       }
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, [formData]);

//   // Load draft on mount
//   useEffect(() => {
//     const savedDraft = localStorage.getItem("pitchDraft");
//     if (savedDraft) {
//       try {
//         const parsedDraft = JSON.parse(savedDraft);
//         const hasContent = Object.values(parsedDraft).some(value => value?.trim());

//         if (hasContent) {
//           setFormData(parsedDraft);
//         }
//       } catch (error) {
//         console.error("Error loading draft:", error);
//         localStorage.removeItem("pitchDraft");
//       }
//     }
//   }, []);

//   const fields = [
//     {
//       name: "startupName",
//       label: "Startup Name",
//       placeholder: "Enter your startup's name",
//       type: "text",
//       required: true
//     },
//     {
//       name: "oneLiner",
//       label: "One-Line Pitch",
//       placeholder: "Describe your startup in one compelling sentence",
//       type: "text",
//       required: true
//     },
//     {
//       name: "problem",
//       label: "Problem Statement", 
//       placeholder: "What significant problem are you solving?",
//       type: "textarea",
//       required: true
//     },
//     {
//       name: "solution",
//       label: "Your Solution",
//       placeholder: "How does your solution uniquely address this problem?",
//       type: "textarea",
//       required: true
//     },
//     {
//       name: "targetMarket",
//       label: "Target Market",
//       placeholder: "Define your addressable market and customer segments",
//       type: "textarea",
//       required: true
//     },
//     {
//       name: "businessModel",
//       label: "Business Model",
//       placeholder: "How do you monetize? Describe your revenue streams",
//       type: "textarea",
//       required: true
//     },
//     {
//       name: "traction",
//       label: "Current Traction",
//       placeholder: "What progress have you made? Include metrics and milestones",
//       type: "textarea",
//       required: true
//     },
//     {
//       name: "team",
//       label: "Team Overview",
//       placeholder: "Highlight key team members and their expertise",
//       type: "textarea",
//       required: true
//     },
//     {
//       name: "goToMarketStrategy",
//       label: "Go-to-Market Strategy",
//       placeholder: "How will you acquire customers and scale?",
//       type: "textarea",
//       required: true
//     },
//     {
//       name: "competition",
//       label: "Competitive Landscape",
//       placeholder: "Who are your competitors? What's your differentiation?",
//       type: "textarea",
//       required: true
//     },
//     {
//       name: "fundingAsk",
//       label: "Funding Amount",
//       placeholder: "How much funding do you need? (e.g., $500K Series Seed)",
//       type: "text",
//       required: true
//     },
//     {
//       name: "fundingUse",
//       label: "Use of Funds",
//       placeholder: "Provide a detailed breakdown of investment allocation",
//       type: "textarea",
//       required: true
//     }
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));

//     // Clear errors on change
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: "" }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     fields.forEach(field => {
//       if (field.required && !formData[field.name]?.trim()) {
//         newErrors[field.name] = `${field.label} is required`;
//       }
//     });
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formErrors = validateForm();
//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//       return;
//     }

//     setLoading(true);
//     setErrors({});

//     try {
//       const res = await api.post("/user/posts/submitpitch", formData);
//       setMessage(res.data.message);
//       setSuccess(true);
//       localStorage.removeItem("pitchDraft");
//     } catch (error) {
//       setErrors({ 
//         submit: error.response?.data?.message || "Failed to submit pitch. Please try again." 
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearDraft = () => {
//     localStorage.removeItem("pitchDraft");
//     setFormData({
//       startupName: "", oneLiner: "", problem: "", solution: "",
//       targetMarket: "", businessModel: "", traction: "", team: "",
//       goToMarketStrategy: "", competition: "", fundingAsk: "", fundingUse: "",
//     });
//     setErrors({});
//     setDraftSaved(false);
//   };

//   const resetForm = () => {
//     clearDraft();
//     setSuccess(false);
//     setMessage('');
//   };

//   const hasDraftContent = Object.values(formData).some(value => value.trim());

//   if (success) {
//     return (
//       <div className={`min-h-screen flex items-center justify-center p-4 ${
//         dark ? "bg-black" : "bg-gray-50"
//       }`}>
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className={`w-full max-w-md text-center p-8 sm:p-12 rounded-xl border ${
//             dark 
//               ? "bg-gray-900 border-gray-800" 
//               : "bg-white border-gray-200"
//           } shadow-lg`}
//         >
//           <div className={`w-12 h-1 mx-auto mb-8 rounded-full ${dark ? "bg-white" : "bg-black"}`} />

//           <h2 className={`text-2xl sm:text-3xl font-semibold mb-6 ${
//             dark ? "text-white" : "text-gray-900"
//           }`}>
//             Pitch Submitted Successfully
//           </h2>

//           <div className={`w-16 h-px mx-auto mb-8 rounded-full ${dark ? "bg-gray-600" : "bg-gray-400"}`} />

//           <p className={`mb-10 text-base leading-relaxed font-medium ${
//             dark ? "text-gray-300" : "text-gray-600"
//           }`}>
//             {message}
//           </p>

//           <button
//             onClick={resetForm}
//             className={`w-full py-4 text-sm font-semibold tracking-widest transition-all duration-300 rounded-lg ${
//               dark 
//                 ? "bg-white text-black hover:bg-gray-100" 
//                 : "bg-black text-white hover:bg-gray-900"
//             }`}
//           >
//             CREATE NEW PITCH
//           </button>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen ${
//       dark ? "bg-black" : "bg-gray-50"
//     }`}>
//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="text-center pt-5 sm:pt-6 pb-8 sm:pb-12 px-4"
//       >
//         <div className={`w-12 h-1 mx-auto mb-6 sm:mb-8 rounded-full ${dark ? "bg-white" : "bg-black"}`} />

//         <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 sm:mb-6 tracking-wider ${
//           dark ? "text-white" : "text-gray-900"
//         }`}>
//           Investment Pitch
//         </h1>

//         <div className={`w-24 sm:w-32 h-px mx-auto mb-4 sm:mb-6 rounded-full ${
//           dark ? "bg-gray-600" : "bg-gray-400"
//         }`} />

//         <p className={`text-sm sm:text-base font-medium max-w-2xl mx-auto ${
//           dark ? "text-gray-400" : "text-gray-600"
//         }`}>
//           Present your startup opportunity with clarity and precision
//         </p>

//         {/* Auto-save indicator */}
//         <AnimatePresence>
//           {draftSaved && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.8 }}
//               className={`inline-flex items-center gap-2 mt-6 px-4 py-2 text-xs rounded-sm ${
//                 dark 
//                   ? "bg-gray-900 border border-gray-800 text-gray-400" 
//                   : "bg-white border border-gray-300 text-gray-600"
//               }`}
//             >
//               <div className={`w-1.5 h-1.5 rounded-full ${dark ? "bg-emerald-400" : "bg-emerald-500"}`} />
//               <span className="font-medium">DRAFT SAVED</span>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>

//       <div className="max-w-2xl lg:max-w-4xl mx-auto px-4 sm:px-6">
//         {/* Error Message */}
//         <AnimatePresence>
//           {errors.submit && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className={`mb-6 p-4 sm:p-6 border text-sm rounded-xl font-medium ${
//                 dark 
//                   ? "bg-red-900/20 border-red-800 text-red-300" 
//                   : "bg-red-50 border-red-200 text-red-800"
//               }`}
//             >
//               {errors.submit}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Form Container with Clear Draft Button */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2, duration: 0.8 }}
//           className={`mb-12 sm:mb-16 border relative rounded-xl ${
//             dark 
//               ? "bg-gray-900 border-gray-800" 
//               : "bg-white border-gray-200"
//           } shadow-lg`}
//         >
//           {/* Clear Draft Button - Top Right of Form */}
//           <AnimatePresence>
//             {hasDraftContent && (
//               <motion.button
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.8 }}
//                 onClick={clearDraft}
//                 className={`absolute top-4 sm:top-6 right-4 sm:right-6 z-10 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs font-semibold tracking-wider transition-all duration-300 border rounded-lg ${
//                   dark
//                     ? "bg-gray-800 border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 hover:bg-gray-700"
//                     : "bg-gray-100 border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400 hover:bg-gray-200"
//                 } shadow-sm hover:shadow-md`}
//               >
//                 <svg 
//                   className="w-3 h-3" 
//                   fill="none" 
//                   stroke="currentColor" 
//                   viewBox="0 0 24 24"
//                 >
//                   <path 
//                     strokeLinecap="round" 
//                     strokeLinejoin="round" 
//                     strokeWidth="2.5" 
//                     d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                   />
//                 </svg>
//                 <span className="hidden sm:inline">CLEAR</span>
//               </motion.button>
//             )}
//           </AnimatePresence>

//           <div className="p-6 sm:p-8 lg:p-12">
//             <form onSubmit={handleSubmit}>
//               <div className="space-y-8 sm:space-y-10 lg:space-y-12">
//                 {fields.map((field, index) => (
//                   <motion.div
//                     key={field.name}
//                     initial={{ opacity: 0, y: 15 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.1 * index, duration: 0.5 }}
//                     className="relative"
//                   >
//                     <label className={`block text-xs sm:text-sm font-semibold tracking-wider mb-3 sm:mb-4 ${
//                       dark ? "text-gray-300" : "text-gray-700"
//                     }`}>
//                       {field.label.toUpperCase()}
//                       {field.required && (
//                         <span className={`ml-2 font-bold ${dark ? "text-red-400" : "text-red-500"}`}>*</span>
//                       )}
//                     </label>

//                     {field.type === "textarea" ? (
//                       <textarea
//                         name={field.name}
//                         rows="4"
//                         placeholder={field.placeholder}
//                         className={`w-full px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium leading-relaxed border-0 border-b-2 bg-transparent transition-all duration-300 focus:outline-none resize-none rounded-t-lg ${
//                           errors[field.name]
//                             ? dark
//                               ? "border-red-500 text-red-300 placeholder-red-400"
//                               : "border-red-500 text-red-700 placeholder-red-400"
//                             : dark
//                             ? "border-gray-700 text-white placeholder-gray-500 focus:border-white"
//                             : "border-gray-300 text-black placeholder-gray-500 focus:border-black"
//                         }`}
//                         value={formData[field.name]}
//                         onChange={handleChange}
//                       />
//                     ) : (
//                       <input
//                         type="text"
//                         name={field.name}
//                         placeholder={field.placeholder}
//                         className={`w-full px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium border-0 border-b-2 bg-transparent transition-all duration-300 focus:outline-none rounded-t-lg ${
//                           errors[field.name]
//                             ? dark
//                               ? "border-red-500 text-red-300 placeholder-red-400"
//                               : "border-red-500 text-red-700 placeholder-red-400"
//                             : dark
//                             ? "border-gray-700 text-white placeholder-gray-500 focus:border-white"
//                             : "border-gray-300 text-black placeholder-gray-500 focus:border-black"
//                         }`}
//                         value={formData[field.name]}
//                         onChange={handleChange}
//                       />
//                     )}

//                     {/* Error Messages */}
//                     <AnimatePresence>
//                       {errors[field.name] && (
//                         <motion.p
//                           initial={{ opacity: 0, y: -5 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0, y: -5 }}
//                           className={`text-xs sm:text-sm mt-2 font-medium ${
//                             dark ? "text-red-400" : "text-red-600"
//                           }`}
//                         >
//                           {errors[field.name]}
//                         </motion.p>
//                       )}
//                     </AnimatePresence>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Submit Button */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5, duration: 0.8 }}
//                 className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-gray-200 dark:border-gray-700"
//               >
//                 {loading ? (
//                   <div className="flex justify-center py-4">
//                     <Loader />
//                   </div>
//                 ) : (
//                   <button
//                     type="submit"
//                     className={`w-full py-4 sm:py-5 text-sm sm:text-base font-semibold tracking-widest transition-all duration-300 rounded-lg ${
//                       dark 
//                         ? "bg-white text-black hover:bg-gray-100" 
//                         : "bg-black text-white hover:bg-gray-900"
//                     } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
//                       dark ? "focus:ring-white" : "focus:ring-black"
//                     }`}
//                   >
//                     SUBMIT PITCH
//                   </button>
//                 )}
//               </motion.div>
//             </form>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Pitch;


// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import api from "../utils/api1";
// import useThemeStore from "../store/themeStore";

// const PitchForm = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [formData, setFormData] = useState({
//     startupName: "",
//     oneLiner: "",
//     problem: "",
//     solution: "",
//     targetMarket: "",
//     businessModel: "",
//     traction: "",
//     team: "",
//     goToMarketStrategy: "",
//     competition: "",
//     fundingAsk: "",
//     fundingUse: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState("");
//   const [draftSaved, setDraftSaved] = useState(false);
//   const [direction, setDirection] = useState(0);
//   const { dark } = useThemeStore();

//   // Auto-save functionality with debouncing[2]
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const hasContent = Object.values(formData).some(value => value.trim());

//       if (hasContent) {
//         localStorage.setItem("pitchDraft", JSON.stringify({ ...formData, currentStep }));
//         setDraftSaved(true);
//         setTimeout(() => setDraftSaved(false), 2000);
//       }
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [formData, currentStep]);

//   // Load draft on component mount
//   useEffect(() => {
//     const savedDraft = localStorage.getItem("pitchDraft");
//     if (savedDraft) {
//       try {
//         const parsedDraft = JSON.parse(savedDraft);
//         const hasContent = Object.values(parsedDraft).some(value => 
//           typeof value === 'string' && value.trim()
//         );

//         if (hasContent) {
//           const { currentStep: savedStep, ...data } = parsedDraft;
//           setFormData(data);
//           setCurrentStep(savedStep || 0);
//         }
//       } catch (error) {
//         console.error("Error parsing saved pitch draft:", error);
//         localStorage.removeItem("pitchDraft");
//       }
//     }
//   }, []);

//   const steps = [
//     {
//       title: "Basic Info",
//       icon: "🚀",
//       fields: [
//         {
//           label: "Startup Name",
//           name: "startupName",
//           placeholder: "Enter your startup name",
//           required: true
//         },
//         {
//           label: "One-line Pitch",
//           name: "oneLiner",
//           placeholder: "Describe your startup in one compelling sentence",
//           required: true
//         }
//       ]
//     },
//     {
//       title: "Problem & Solution",
//       icon: "💡",
//       fields: [
//         {
//           label: "Problem Statement",
//           name: "problem",
//           textarea: true,
//           placeholder: "What significant problem are you solving? Paint the pain point clearly.",
//           required: true
//         },
//         {
//           label: "Your Solution",
//           name: "solution",
//           textarea: true,
//           placeholder: "How does your product/service solve this problem uniquely?",
//           required: true
//         }
//       ]
//     },
//     {
//       title: "Market & Business",
//       icon: "📊",
//       fields: [
//         {
//           label: "Target Market",
//           name: "targetMarket",
//           textarea: true,
//           placeholder: "Who are your ideal customers? Define your market segment.",
//           required: true
//         },
//         {
//           label: "Business Model",
//           name: "businessModel",
//           textarea: true,
//           placeholder: "How do you generate revenue? What's your monetization strategy?",
//           required: true
//         }
//       ]
//     },
//     {
//       title: "Traction & Team",
//       icon: "👥",
//       fields: [
//         {
//           label: "Current Traction",
//           name: "traction",
//           textarea: true,
//           placeholder: "What progress have you made? Users, revenue, partnerships, etc.",
//           required: true
//         },
//         {
//           label: "Team",
//           name: "team",
//           textarea: true,
//           placeholder: "Introduce your key team members and their relevant experience.",
//           required: true
//         }
//       ]
//     },
//     {
//       title: "Strategy & Competition",
//       icon: "🎯",
//       fields: [
//         {
//           label: "Go-to-Market Strategy",
//           name: "goToMarketStrategy",
//           textarea: true,
//           placeholder: "How will you acquire and retain customers?",
//           required: true
//         },
//         {
//           label: "Competitive Landscape",
//           name: "competition",
//           textarea: true,
//           placeholder: "Who are your competitors and what's your competitive advantage?",
//           required: true
//         }
//       ]
//     },
//     {
//       title: "Funding",
//       icon: "💰",
//       fields: [
//         {
//           label: "Funding Ask",
//           name: "fundingAsk",
//           placeholder: "How much funding do you need? (e.g., $500K)",
//           required: true
//         },
//         {
//           label: "Use of Funds",
//           name: "fundingUse",
//           textarea: true,
//           placeholder: "How will you allocate the investment? Be specific about key areas.",
//           required: true
//         }
//       ]
//     }
//   ];

//   const progress = ((currentStep + 1) / steps.length) * 100;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     if (error) setError("");
//   };

//   const nextStep = () => {
//     if (currentStep < steps.length - 1) {
//       setDirection(1);
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 0) {
//       setDirection(-1);
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const isStepValid = () => {
//     return steps[currentStep].fields.every(field => 
//       field.required ? formData[field.name]?.trim() : true
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isStepValid()) return;

//     setLoading(true);
//     setError("");

//     try {
//       const res = await api.post("/user/posts/submitpitch", formData);
//       setMessage(res.data.message);
//       setSuccess(true);
//       localStorage.removeItem("pitchDraft");
//     } catch (error) {
//       setError(
//         error.response?.data?.message ||
//         "Failed to submit pitch. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       startupName: "",
//       oneLiner: "",
//       problem: "",
//       solution: "",
//       targetMarket: "",
//       businessModel: "",
//       traction: "",
//       team: "",
//       goToMarketStrategy: "",
//       competition: "",
//       fundingAsk: "",
//       fundingUse: "",
//     });
//     setCurrentStep(0);
//     setSuccess(false);
//     setMessage('');
//     localStorage.removeItem("pitchDraft");
//   };

//   const slideVariants = {
//     enter: (direction) => ({
//       x: direction > 0 ? 300 : -300,
//       opacity: 0,
//       scale: 0.8
//     }),
//     center: {
//       zIndex: 1,
//       x: 0,
//       opacity: 1,
//       scale: 1
//     },
//     exit: (direction) => ({
//       zIndex: 0,
//       x: direction < 0 ? 300 : -300,
//       opacity: 0,
//       scale: 0.8
//     })
//   };

//   if (success) {
//     return (
//       <div className={`min-h-screen flex items-center justify-center px-4 ${
//         dark ? "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900" : 
//                "bg-gradient-to-br from-blue-50 via-white to-purple-50"
//       }`}>
//         <motion.div
//           initial={{ scale: 0, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           className={`max-w-md w-full text-center p-8 rounded-2xl ${
//             dark ? "bg-gray-800/80 backdrop-blur-xl border border-gray-700" : 
//                    "bg-white/80 backdrop-blur-xl border border-gray-200 shadow-2xl"
//           }`}
//         >
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ delay: 0.2 }}
//             className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center"
//           >
//             <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
//             </svg>
//           </motion.div>

//           <motion.h2
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className={`text-2xl font-bold mb-4 ${dark ? "text-white" : "text-gray-900"}`}
//           >
//             Pitch Submitted! 🎉
//           </motion.h2>

//           <motion.p
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.4 }}
//             className={`mb-6 ${dark ? "text-gray-300" : "text-gray-600"}`}
//           >
//             {message}
//           </motion.p>

//           <motion.button
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.5 }}
//             onClick={resetForm}
//             className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
//           >
//             Submit Another Pitch
//           </motion.button>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen py-8 px-4 ${
//       dark ? "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900" : 
//              "bg-gradient-to-br from-blue-50 via-white to-purple-50"
//     }`}>
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <motion.div
//           initial={{ y: -50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           className="text-center mb-12"
//         >
//           <div className="flex items-center justify-center gap-4 mb-4">
//             <h1 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
//               Pitch Your Vision
//             </h1>

//             {draftSaved && (
//               <motion.div
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 exit={{ scale: 0 }}
//                 className="flex items-center gap-2 text-green-500 text-sm"
//               >
//                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
//                 </svg>
//                 Auto-saved
//               </motion.div>
//             )}
//           </div>

//           <p className={`text-lg ${dark ? "text-gray-300" : "text-gray-600"}`}>
//             Transform your startup idea into a compelling pitch
//           </p>
//         </motion.div>

//         {/* Progress Bar */}
//         <motion.div
//           initial={{ scaleX: 0 }}
//           animate={{ scaleX: 1 }}
//           className={`w-full h-2 rounded-full mb-8 ${
//             dark ? "bg-gray-800" : "bg-gray-200"
//           } overflow-hidden`}
//         >
//           <motion.div
//             className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
//             initial={{ width: 0 }}
//             animate={{ width: `${progress}%` }}
//             transition={{ duration: 0.5, ease: "easeInOut" }}
//           />
//         </motion.div>

//         {/* Step Indicators */}
//         <div className="flex justify-between mb-8 px-4">
//           {steps.map((step, index) => (
//             <motion.div
//               key={index}
//               className="flex flex-col items-center"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//             >
//               <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg mb-2 transition-all duration-300 ${
//                 index <= currentStep
//                   ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
//                   : dark ? "bg-gray-700 text-gray-400" : "bg-gray-200 text-gray-500"
//               }`}>
//                 {step.icon}
//               </div>
//               <span className={`text-xs text-center hidden md:block ${
//                 index <= currentStep 
//                   ? dark ? "text-white" : "text-gray-900"
//                   : dark ? "text-gray-500" : "text-gray-400"
//               }`}>
//                 {step.title}
//               </span>
//             </motion.div>
//           ))}
//         </div>

//         {/* Error Message */}
//         <AnimatePresence>
//           {error && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200"
//             >
//               <p className="text-red-800 text-sm">{error}</p>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Form Container */}
//         <motion.div
//           className={`${
//             dark ? "bg-gray-800/50 backdrop-blur-xl border-gray-700" : 
//                    "bg-white/80 backdrop-blur-xl border-gray-200 shadow-2xl"
//           } border rounded-2xl p-8 md:p-12`}
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           {/* Step Content */}
//           <AnimatePresence mode="wait" custom={direction}>
//             <motion.div
//               key={currentStep}
//               custom={direction}
//               variants={slideVariants}
//               initial="enter"
//               animate="center"
//               exit="exit"
//               transition={{
//                 x: { type: "spring", stiffness: 300, damping: 30 },
//                 opacity: { duration: 0.2 }
//               }}
//             >
//               <div className="mb-8">
//                 <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${
//                   dark ? "text-white" : "text-gray-900"
//                 }`}>
//                   {steps[currentStep].title}
//                 </h2>
//                 <div className={`w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full`} />
//               </div>

//               <form onSubmit={currentStep === steps.length - 1 ? handleSubmit : (e) => e.preventDefault()}>
//                 <div className="space-y-6">
//                   {steps[currentStep].fields.map((field) => (
//                     <motion.div
//                       key={field.name}
//                       initial={{ opacity: 0, x: 50 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.1 }}
//                     >
//                       <label className={`block text-sm font-medium mb-3 ${
//                         dark ? "text-gray-200" : "text-gray-700"
//                       }`}>
//                         {field.label}
//                         {field.required && <span className="text-red-500 ml-1">*</span>}
//                       </label>

//                       {field.textarea ? (
//                         <textarea
//                           name={field.name}
//                           rows="4"
//                           placeholder={field.placeholder}
//                           className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
//                             dark
//                               ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-700"
//                               : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:bg-white"
//                           }`}
//                           value={formData[field.name]}
//                           onChange={handleChange}
//                           required={field.required}
//                         />
//                       ) : (
//                         <input
//                           type="text"
//                           name={field.name}
//                           placeholder={field.placeholder}
//                           className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                             dark
//                               ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-700"
//                               : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:bg-white"
//                           }`}
//                           value={formData[field.name]}
//                           onChange={handleChange}
//                           required={field.required}
//                         />
//                       )}
//                     </motion.div>
//                   ))}
//                 </div>

//                 {/* Navigation Buttons */}
//                 <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
//                   <motion.button
//                     type="button"
//                     onClick={prevStep}
//                     disabled={currentStep === 0}
//                     className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
//                       currentStep === 0
//                         ? "opacity-50 cursor-not-allowed"
//                         : dark
//                         ? "text-gray-300 hover:text-white hover:bg-gray-700"
//                         : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
//                     }`}
//                     whileHover={{ scale: currentStep === 0 ? 1 : 1.05 }}
//                     whileTap={{ scale: currentStep === 0 ? 1 : 0.95 }}
//                   >
//                     ← Previous
//                   </motion.button>

//                   <div className="flex items-center gap-2">
//                     <span className={`text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>
//                       {currentStep + 1} of {steps.length}
//                     </span>
//                   </div>

//                   {currentStep === steps.length - 1 ? (
//                     <motion.button
//                       type="submit"
//                       disabled={loading || !isStepValid()}
//                       className={`px-8 py-3 rounded-xl font-medium transition-all duration-200 ${
//                         loading || !isStepValid()
//                           ? "opacity-50 cursor-not-allowed"
//                           : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
//                       }`}
//                       whileHover={{ scale: (loading || !isStepValid()) ? 1 : 1.05 }}
//                       whileTap={{ scale: (loading || !isStepValid()) ? 1 : 0.95 }}
//                     >
//                       {loading ? (
//                         <div className="flex items-center gap-2">
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                           Submitting...
//                         </div>
//                       ) : (
//                         "Submit Pitch 🚀"
//                       )}
//                     </motion.button>
//                   ) : (
//                     <motion.button
//                       type="button"
//                       onClick={nextStep}
//                       disabled={!isStepValid()}
//                       className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
//                         !isStepValid()
//                           ? "opacity-50 cursor-not-allowed"
//                           : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
//                       }`}
//                       whileHover={{ scale: !isStepValid() ? 1 : 1.05 }}
//                       whileTap={{ scale: !isStepValid() ? 1 : 0.95 }}
//                     >
//                       Next →
//                     </motion.button>
//                   )}
//                 </div>
//               </form>
//             </motion.div>
//           </AnimatePresence>
//         </motion.div>

//         {/* Quick Save/Clear Draft Options */}
//         {Object.values(formData).some(value => value.trim()) && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center mt-6"
//           >
//             <button
//               onClick={() => {
//                 localStorage.removeItem("pitchDraft");
//                 resetForm();
//               }}
//               className={`text-sm px-4 py-2 rounded-lg transition-colors ${
//                 dark
//                   ? "text-gray-400 hover:text-gray-300 hover:bg-gray-800"
//                   : "text-gray-600 hover:text-gray-700 hover:bg-gray-100"
//               }`}
//             >
//               Clear All & Start Over
//             </button>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PitchForm;


// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import api from "../utils/api1";
// import useThemeStore from "../store/themeStore";

// const PitchForm = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [formData, setFormData] = useState({
//     startupName: "",
//     oneLiner: "",
//     problem: "",
//     solution: "",
//     targetMarket: "",
//     businessModel: "",
//     traction: "",
//     team: "",
//     goToMarketStrategy: "",
//     competition: "",
//     fundingAsk: "",
//     fundingUse: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState("");
//   const [draftSaved, setDraftSaved] = useState(false);
//   const [direction, setDirection] = useState(0);
//   const { dark } = useThemeStore();

//   // Auto-save functionality
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const hasContent = Object.values(formData).some(value => value.trim());

//       if (hasContent) {
//         localStorage.setItem("pitchDraft", JSON.stringify({ ...formData, currentStep }));
//         setDraftSaved(true);
//         setTimeout(() => setDraftSaved(false), 3000);
//       }
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [formData, currentStep]);

//   // Load draft on component mount
//   useEffect(() => {
//     const savedDraft = localStorage.getItem("pitchDraft");
//     if (savedDraft) {
//       try {
//         const parsedDraft = JSON.parse(savedDraft);
//         const hasContent = Object.values(parsedDraft).some(value => 
//           typeof value === 'string' && value.trim()
//         );

//         if (hasContent) {
//           const { currentStep: savedStep, ...data } = parsedDraft;
//           setFormData(data);
//           setCurrentStep(savedStep || 0);
//         }
//       } catch (error) {
//         console.error("Error parsing saved pitch draft:", error);
//         localStorage.removeItem("pitchDraft");
//       }
//     }
//   }, []);

//   const steps = [
//     {
//       title: "Foundation",
//       number: "I",
//       fields: [
//         {
//           label: "Company Name",
//           name: "startupName",
//           placeholder: "Enter your company name",
//           required: true
//         },
//         {
//           label: "Value Proposition",
//           name: "oneLiner",
//           placeholder: "Describe your company's core value proposition",
//           required: true
//         }
//       ]
//     },
//     {
//       title: "Challenge & Innovation",
//       number: "II",
//       fields: [
//         {
//           label: "Market Problem",
//           name: "problem",
//           textarea: true,
//           placeholder: "Define the significant problem or market inefficiency your company addresses",
//           required: true
//         },
//         {
//           label: "Solution Overview",
//           name: "solution",
//           textarea: true,
//           placeholder: "Explain how your innovation provides a superior solution",
//           required: true
//         }
//       ]
//     },
//     {
//       title: "Market Opportunity",
//       number: "III",
//       fields: [
//         {
//           label: "Target Market",
//           name: "targetMarket",
//           textarea: true,
//           placeholder: "Define your addressable market and customer segments",
//           required: true
//         },
//         {
//           label: "Revenue Model",
//           name: "businessModel",
//           textarea: true,
//           placeholder: "Outline your monetization strategy and revenue streams",
//           required: true
//         }
//       ]
//     },
//     {
//       title: "Execution & Team",
//       number: "IV",
//       fields: [
//         {
//           label: "Current Traction",
//           name: "traction",
//           textarea: true,
//           placeholder: "Present key metrics, milestones, and validation achieved",
//           required: true
//         },
//         {
//           label: "Team Overview",
//           name: "team",
//           textarea: true,
//           placeholder: "Highlight leadership team and advisory board expertise",
//           required: true
//         }
//       ]
//     },
//     {
//       title: "Market Strategy",
//       number: "V",
//       fields: [
//         {
//           label: "Go-to-Market Strategy",
//           name: "goToMarketStrategy",
//           textarea: true,
//           placeholder: "Detail your customer acquisition and market penetration approach",
//           required: true
//         },
//         {
//           label: "Competitive Analysis",
//           name: "competition",
//           textarea: true,
//           placeholder: "Identify competitive landscape and articulate your differentiation",
//           required: true
//         }
//       ]
//     },
//     {
//       title: "Investment Request",
//       number: "VI",
//       fields: [
//         {
//           label: "Funding Amount",
//           name: "fundingAsk",
//           placeholder: "Specify the investment amount and round type",
//           required: true
//         },
//         {
//           label: "Use of Funds",
//           name: "fundingUse",
//           textarea: true,
//           placeholder: "Provide detailed allocation of investment across strategic priorities",
//           required: true
//         }
//       ]
//     }
//   ];

//   const progress = ((currentStep + 1) / steps.length) * 100;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     if (error) setError("");
//   };

//   const nextStep = () => {
//     if (currentStep < steps.length - 1) {
//       setDirection(1);
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 0) {
//       setDirection(-1);
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const isStepValid = () => {
//     return steps[currentStep].fields.every(field => 
//       field.required ? formData[field.name]?.trim() : true
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isStepValid()) return;

//     setLoading(true);
//     setError("");

//     try {
//       const res = await api.post("/user/posts/submitpitch", formData);
//       setMessage(res.data.message);
//       setSuccess(true);
//       localStorage.removeItem("pitchDraft");
//     } catch (error) {
//       setError(
//         error.response?.data?.message ||
//         "Failed to submit pitch. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       startupName: "",
//       oneLiner: "",
//       problem: "",
//       solution: "",
//       targetMarket: "",
//       businessModel: "",
//       traction: "",
//       team: "",
//       goToMarketStrategy: "",
//       competition: "",
//       fundingAsk: "",
//       fundingUse: "",
//     });
//     setCurrentStep(0);
//     setSuccess(false);
//     setMessage('');
//     localStorage.removeItem("pitchDraft");
//   };

//   const slideVariants = {
//     enter: (direction) => ({
//       x: direction > 0 ? 30 : -30,
//       opacity: 0
//     }),
//     center: {
//       zIndex: 1,
//       x: 0,
//       opacity: 1
//     },
//     exit: (direction) => ({
//       zIndex: 0,
//       x: direction < 0 ? 30 : -30,
//       opacity: 0
//     })
//   };

//   if (success) {
//     return (
//       <div className={`min-h-screen flex items-center justify-center px-4 ${
//         dark ? "bg-black" : "bg-white"
//       }`}>
//         <motion.div
//           initial={{ scale: 0.95, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
//           className={`max-w-2xl w-full text-center px-16 py-20 ${
//             dark 
//               ? "bg-gradient-to-b from-gray-900 to-black border border-gray-800" 
//               : "bg-gradient-to-b from-gray-50 to-white border border-gray-100"
//           } rounded-none shadow-2xl`}
//           style={{
//             boxShadow: dark 
//               ? "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)" 
//               : "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)"
//           }}
//         >
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
//             className={`w-1 h-16 mx-auto mb-12 ${dark ? "bg-white" : "bg-black"}`}
//           />

//           <motion.h2
//             initial={{ y: 30, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.4, duration: 0.6 }}
//             className={`text-3xl font-light mb-8 tracking-wide ${dark ? "text-white" : "text-black"}`}
//             style={{ fontFamily: "'Playfair Display', serif" }}
//           >
//             Pitch Submitted
//           </motion.h2>

//           <motion.div
//             initial={{ y: 30, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.5, duration: 0.6 }}
//             className={`w-24 h-px mx-auto mb-8 ${dark ? "bg-gray-600" : "bg-gray-300"}`}
//           />

//           <motion.p
//             initial={{ y: 30, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.6, duration: 0.6 }}
//             className={`mb-12 text-lg leading-relaxed font-light ${dark ? "text-gray-300" : "text-gray-600"}`}
//           >
//             {message}
//           </motion.p>

//           <motion.button
//             initial={{ y: 30, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             // transition{{ delay: 0.7, duration: 0.6 }}
//             onClick={resetForm}
//             className={`px-12 py-4 font-light tracking-wider transition-all duration-300 ${
//               dark 
//                 ? "bg-white text-black hover:bg-gray-100 border border-white" 
//                 : "bg-black text-white hover:bg-gray-900 border border-black"
//             }`}
//             whileHover={{ y: -2 }}
//             whileTap={{ y: 0 }}
//           >
//             CREATE NEW PITCH
//           </motion.button>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen ${
//       dark ? "bg-black" : "bg-white"
//     }`}>
//       {/* Luxurious Header */}
//       <motion.div
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
//         className="text-center pt-16 pb-12"
//       >
//         <div className={`w-1 h-12 mx-auto mb-8 ${dark ? "bg-white" : "bg-black"}`} />

//         <h1 
//           className={`text-5xl md:text-6xl font-light mb-6 tracking-wider ${
//             dark ? "text-white" : "text-black"
//           }`}
//           style={{ fontFamily: "'Playfair Display', serif" }}
//         >
//           Investment Pitch
//         </h1>

//         <div className={`w-32 h-px mx-auto mb-6 ${dark ? "bg-gray-600" : "bg-gray-300"}`} />

//         <p className={`text-lg font-light tracking-wide ${dark ? "text-gray-400" : "text-gray-600"}`}>
//           Exceptional opportunities deserve exceptional presentation
//         </p>

//         {/* Refined Auto-save indicator */}
//         <AnimatePresence>
//           {draftSaved && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               transition={{ duration: 0.3 }}
//               className={`inline-flex items-center gap-3 mt-8 px-6 py-2 ${
//                 dark ? "bg-gray-900 border border-gray-800" : "bg-gray-50 border border-gray-200"
//               }`}
//             >
//               <div className={`w-2 h-2 rounded-full ${dark ? "bg-white" : "bg-black"} opacity-60`} />
//               <span className={`text-xs font-light tracking-wider ${dark ? "text-gray-400" : "text-gray-600"}`}>
//                 DRAFT PRESERVED
//               </span>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>

//       <div className="max-w-5xl mx-auto px-6">
//         {/* Sophisticated Progress */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           className="mb-16"
//         >
//           {/* Minimal Progress Bar */}
//           <div className={`relative w-full h-px mb-12 ${
//             dark ? "bg-gray-900" : "bg-gray-100"
//           }`}>
//             <motion.div
//               className={`absolute top-0 left-0 h-full ${dark ? "bg-white" : "bg-black"}`}
//               initial={{ width: 0 }}
//               animate={{ width: `${progress}%` }}
//               transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
//             />
//           </div>

//           {/* Roman Numeral Indicators */}
//           <div className="flex justify-between items-center">
//             {steps.map((step, index) => (
//               <motion.div
//                 key={index}
//                 className="flex flex-col items-center"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5 + index * 0.1 }}
//               >
//                 <div className={`w-16 h-16 rounded-full border flex items-center justify-center mb-4 transition-all duration-500 ${
//                   index <= currentStep
//                     ? dark 
//                       ? "border-white bg-white text-black" 
//                       : "border-black bg-black text-white"
//                     : dark 
//                       ? "border-gray-800 text-gray-600" 
//                       : "border-gray-200 text-gray-400"
//                 }`}>
//                   <span className="text-sm font-light tracking-wider">
//                     {step.number}
//                   </span>
//                 </div>
//                 <h3 className={`text-xs font-light tracking-wider text-center ${
//                   index <= currentStep 
//                     ? dark ? "text-white" : "text-black"
//                     : dark ? "text-gray-600" : "text-gray-400"
//                 }`}>
//                   {step.title.toUpperCase()}
//                 </h3>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Error Message */}
//         <AnimatePresence>
//           {error && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className={`mb-8 p-6 border ${
//                 dark ? "bg-red-900/20 border-red-800/50" : "bg-red-50 border-red-200/50"
//               }`}
//             >
//               <p className={`text-sm font-light ${dark ? "text-red-300" : "text-red-800"}`}>
//                 {error}
//               </p>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Main Form Container */}
//         <motion.div
//           className={`mb-24 ${
//             dark 
//               ? "bg-gradient-to-b from-gray-900 to-black border border-gray-800" 
//               : "bg-gradient-to-b from-gray-50 to-white border border-gray-100"
//           } shadow-2xl`}
//           style={{
//             boxShadow: dark 
//               ? "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)" 
//               : "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)"
//           }}
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4, duration: 0.8 }}
//         >
//           {/* Form Content */}
//           <div className="px-16 py-20">
//             <AnimatePresence mode="wait" custom={direction}>
//               <motion.div
//                 key={currentStep}
//                 custom={direction}
//                 variants={slideVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 transition={{
//                   x: { type: "spring", stiffness: 300, damping: 40 },
//                   opacity: { duration: 0.4 }
//                 }}
//               >
//                 <div className="mb-16 text-center">
//                   <div className={`w-1 h-8 mx-auto mb-6 ${dark ? "bg-white" : "bg-black"}`} />
//                   <h2 
//                     className={`text-3xl font-light mb-4 tracking-wide ${
//                       dark ? "text-white" : "text-black"
//                     }`}
//                     style={{ fontFamily: "'Playfair Display', serif" }}
//                   >
//                     {steps[currentStep].title}
//                   </h2>
//                   <div className={`w-16 h-px mx-auto ${dark ? "bg-gray-600" : "bg-gray-300"}`} />
//                 </div>

//                 <form onSubmit={currentStep === steps.length - 1 ? handleSubmit : (e) => e.preventDefault()}>
//                   <div className="space-y-12">
//                     {steps[currentStep].fields.map((field, fieldIndex) => (
//                       <motion.div
//                         key={field.name}
//                         initial={{ opacity: 0, y: 30 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: fieldIndex * 0.15, duration: 0.6 }}
//                       >
//                         <label className={`block text-sm font-light tracking-wider mb-4 ${
//                           dark ? "text-gray-300" : "text-gray-700"
//                         }`}>
//                           {field.label.toUpperCase()}
//                           {field.required && <span className={`ml-2 ${dark ? "text-white" : "text-black"}`}>*</span>}
//                         </label>

//                         {field.textarea ? (
//                           <textarea
//                             name={field.name}
//                             rows="6"
//                             placeholder={field.placeholder}
//                             className={`w-full px-6 py-6 font-light leading-relaxed border-0 border-b-2 bg-transparent transition-all duration-300 focus:outline-none resize-none ${
//                               dark
//                                 ? "border-gray-800 text-white placeholder-gray-600 focus:border-white"
//                                 : "border-gray-200 text-black placeholder-gray-400 focus:border-black"
//                             }`}
//                             style={{ fontFamily: "'Inter', sans-serif" }}
//                             value={formData[field.name]}
//                             onChange={handleChange}
//                             required={field.required}
//                           />
//                         ) : (
//                           <input
//                             type="text"
//                             name={field.name}
//                             placeholder={field.placeholder}
//                             className={`w-full px-6 py-6 font-light border-0 border-b-2 bg-transparent transition-all duration-300 focus:outline-none ${
//                               dark
//                                 ? "border-gray-800 text-white placeholder-gray-600 focus:border-white"
//                                 : "border-gray-200 text-black placeholder-gray-400 focus:border-black"
//                             }`}
//                             style={{ fontFamily: "'Inter', sans-serif" }}
//                             value={formData[field.name]}
//                             onChange={handleChange}
//                             required={field.required}
//                           />
//                         )}
//                       </motion.div>
//                     ))}
//                   </div>
//                 </form>
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           {/* Elegant Navigation */}
//           <div className={`flex justify-between items-center px-16 py-8 border-t ${
//             dark ? "border-gray-800" : "border-gray-100"
//           }`}>
//             <motion.button
//               type="button"
//               onClick={prevStep}
//               disabled={currentStep === 0}
//               className={`flex items-center gap-4 px-8 py-3 font-light tracking-wider transition-all duration-300 ${
//                 currentStep === 0
//                   ? "opacity-30 cursor-not-allowed"
//                   : dark
//                   ? "text-gray-400 hover:text-white"
//                   : "text-gray-600 hover:text-black"
//               }`}
//               whileHover={{ x: currentStep === 0 ? 0 : -5 }}
//             >
//               <div className={`w-6 h-px ${
//                 currentStep === 0 
//                   ? dark ? "bg-gray-800" : "bg-gray-300"
//                   : dark ? "bg-gray-400 group-hover:bg-white" : "bg-gray-600 group-hover:bg-black"
//               }`} />
//               PREVIOUS
//             </motion.button>

//             <div className="flex items-center gap-6">
//               <span className={`text-xs font-light tracking-wider ${dark ? "text-gray-500" : "text-gray-500"}`}>
//                 {String(currentStep + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
//               </span>
//               <div className="flex gap-2">
//                 {steps.map((_, index) => (
//                   <div
//                     key={index}
//                     className={`w-8 h-px transition-all duration-300 ${
//                       index <= currentStep 
//                         ? dark ? "bg-white" : "bg-black"
//                         : dark ? "bg-gray-800" : "bg-gray-200"
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>

//             {currentStep === steps.length - 1 ? (
//               <motion.button
//                 type="button"
//                 onClick={handleSubmit}
//                 disabled={loading || !isStepValid()}
//                 className={`flex items-center gap-4 px-8 py-3 font-light tracking-wider transition-all duration-300 ${
//                   loading || !isStepValid()
//                     ? "opacity-50 cursor-not-allowed"
//                     : dark
//                     ? "text-white hover:text-gray-300"
//                     : "text-black hover:text-gray-700"
//                 }`}
//                 whileHover={{ x: (loading || !isStepValid()) ? 0 : 5 }}
//               >
//                 {loading ? (
//                   <>
//                     <div className={`w-4 h-4 border border-current border-t-transparent rounded-full animate-spin`} />
//                     SUBMITTING
//                   </>
//                 ) : (
//                   <>
//                     SUBMIT
//                     <div className={`w-6 h-px ${dark ? "bg-white" : "bg-black"}`} />
//                   </>
//                 )}
//               </motion.button>
//             ) : (
//               <motion.button
//                 type="button"
//                 onClick={nextStep}
//                 disabled={!isStepValid()}
//                 className={`flex items-center gap-4 px-8 py-3 font-light tracking-wider transition-all duration-300 ${
//                   !isStepValid()
//                     ? "opacity-50 cursor-not-allowed"
//                     : dark
//                     ? "text-white hover:text-gray-300"
//                     : "text-black hover:text-gray-700"
//                 }`}
//                 whileHover={{ x: !isStepValid() ? 0 : 5 }}
//               >
//                 CONTINUE
//                 <div className={`w-6 h-px ${
//                   !isStepValid() 
//                     ? dark ? "bg-gray-800" : "bg-gray-300"
//                     : dark ? "bg-white" : "bg-black"
//                 }`} />
//               </motion.button>
//             )}
//           </div>
//         </motion.div>

//         {/* Discreet Clear Option */}
//         {Object.values(formData).some(value => value.trim()) && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center pb-16"
//           >
//             <button
//               onClick={() => {
//                 localStorage.removeItem("pitchDraft");
//                 resetForm();
//               }}
//               className={`text-xs font-light tracking-widest transition-colors duration-300 ${
//                 dark
//                   ? "text-gray-700 hover:text-gray-500"
//                   : "text-gray-400 hover:text-gray-600"
//               }`}
//             >
//               CLEAR DRAFT
//             </button>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PitchForm;


// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import api from "../utils/api1";
// import useThemeStore from "../store/themeStore";

// const PitchForm = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [formData, setFormData] = useState({
//     startupName: "",
//     oneLiner: "",
//     problem: "",
//     solution: "",
//     targetMarket: "",
//     businessModel: "",
//     traction: "",
//     team: "",
//     goToMarketStrategy: "",
//     competition: "",
//     fundingAsk: "",
//     fundingUse: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState("");
//   const [draftSaved, setDraftSaved] = useState(false);
//   const [direction, setDirection] = useState(0);
//   const { dark } = useThemeStore();

//   // Auto-save functionality
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const hasContent = Object.values(formData).some(value => value.trim());

//       if (hasContent) {
//         localStorage.setItem("pitchDraft", JSON.stringify({ ...formData, currentStep }));
//         setDraftSaved(true);
//         setTimeout(() => setDraftSaved(false), 3000);
//       }
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [formData, currentStep]);

//   // Load draft on component mount
//   useEffect(() => {
//     const savedDraft = localStorage.getItem("pitchDraft");
//     if (savedDraft) {
//       try {
//         const parsedDraft = JSON.parse(savedDraft);
//         const hasContent = Object.values(parsedDraft).some(value => 
//           typeof value === 'string' && value.trim()
//         );

//         if (hasContent) {
//           const { currentStep: savedStep, ...data } = parsedDraft;
//           setFormData(data);
//           setCurrentStep(savedStep || 0);
//         }
//       } catch (error) {
//         console.error("Error parsing saved pitch draft:", error);
//         localStorage.removeItem("pitchDraft");
//       }
//     }
//   }, []);

//   const steps = [
//     {
//       title: "Foundation",
//       number: "I",
//       fields: [
//         {
//           label: "Company Name",
//           name: "startupName",
//           placeholder: "Enter your company name",
//           required: true
//         },
//         {
//           label: "Value Proposition",
//           name: "oneLiner",
//           placeholder: "Describe your company's core value proposition",
//           required: true
//         }
//       ]
//     },
//     {
//       title: "Challenge & Innovation",
//       number: "II",
//       fields: [
//         {
//           label: "Market Problem",
//           name: "problem",
//           textarea: true,
//           placeholder: "Define the significant problem or market inefficiency your company addresses",
//           required: true
//         },
//         {
//           label: "Solution Overview",
//           name: "solution",
//           textarea: true,
//           placeholder: "Explain how your innovation provides a superior solution",
//           required: true
//         }
//       ]
//     },
//     {
//       title: "Market Opportunity",
//       number: "III",
//       fields: [
//         {
//           label: "Target Market",
//           name: "targetMarket",
//           textarea: true,
//           placeholder: "Define your addressable market and customer segments",
//           required: true
//         },
//         {
//           label: "Revenue Model",
//           name: "businessModel",
//           textarea: true,
//           placeholder: "Outline your monetization strategy and revenue streams",
//           required: true
//         }
//       ]
//     },
//     {
//       title: "Execution & Team",
//       number: "IV",
//       fields: [
//         {
//           label: "Current Traction",
//           name: "traction",
//           textarea: true,
//           placeholder: "Present key metrics, milestones, and validation achieved",
//           required: true
//         },
//         {
//           label: "Team Overview",
//           name: "team",
//           textarea: true,
//           placeholder: "Highlight leadership team and advisory board expertise",
//           required: true
//         }
//       ]
//     },
//     {
//       title: "Market Strategy",
//       number: "V",
//       fields: [
//         {
//           label: "Go-to-Market Strategy",
//           name: "goToMarketStrategy",
//           textarea: true,
//           placeholder: "Detail your customer acquisition and market penetration approach",
//           required: true
//         },
//         {
//           label: "Competitive Analysis",
//           name: "competition",
//           textarea: true,
//           placeholder: "Identify competitive landscape and articulate your differentiation",
//           required: true
//         }
//       ]
//     },
//     {
//       title: "Investment Request",
//       number: "VI",
//       fields: [
//         {
//           label: "Funding Amount",
//           name: "fundingAsk",
//           placeholder: "Specify the investment amount and round type",
//           required: true
//         },
//         {
//           label: "Use of Funds",
//           name: "fundingUse",
//           textarea: true,
//           placeholder: "Provide detailed allocation of investment across strategic priorities",
//           required: true
//         }
//       ]
//     }
//   ];

//   const progress = ((currentStep + 1) / steps.length) * 100;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     if (error) setError("");
//   };

//   const nextStep = () => {
//     if (currentStep < steps.length - 1) {
//       setDirection(1);
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 0) {
//       setDirection(-1);
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const isStepValid = () => {
//     return steps[currentStep].fields.every(field => 
//       field.required ? formData[field.name]?.trim() : true
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isStepValid()) return;

//     setLoading(true);
//     setError("");

//     try {
//       const res = await api.post("/user/posts/submitpitch", formData);
//       setMessage(res.data.message);
//       setSuccess(true);
//       localStorage.removeItem("pitchDraft");
//     } catch (error) {
//       setError(
//         error.response?.data?.message ||
//         "Failed to submit pitch. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       startupName: "",
//       oneLiner: "",
//       problem: "",
//       solution: "",
//       targetMarket: "",
//       businessModel: "",
//       traction: "",
//       team: "",
//       goToMarketStrategy: "",
//       competition: "",
//       fundingAsk: "",
//       fundingUse: "",
//     });
//     setCurrentStep(0);
//     setSuccess(false);
//     setMessage('');
//     localStorage.removeItem("pitchDraft");
//   };

//   const slideVariants = {
//     enter: (direction) => ({
//       x: direction > 0 ? 30 : -30,
//       opacity: 0
//     }),
//     center: {
//       zIndex: 1,
//       x: 0,
//       opacity: 1
//     },
//     exit: (direction) => ({
//       zIndex: 0,
//       x: direction < 0 ? 30 : -30,
//       opacity: 0
//     })
//   };

//   if (success) {
//     return (
//       <div className={`min-h-screen flex items-center justify-center px-4 ${
//         dark ? "bg-black" : "bg-white"
//       }`}>
//         <motion.div
//           initial={{ scale: 0.95, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
//           className={`max-w-2xl w-full text-center px-16 py-20 ${
//             dark 
//               ? "bg-gradient-to-b from-gray-900 to-black border border-gray-800" 
//               : "bg-gradient-to-b from-gray-50 to-white border border-gray-100"
//           } rounded-none shadow-2xl`}
//           style={{
//             boxShadow: dark 
//               ? "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)" 
//               : "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)"
//           }}
//         >
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
//             className={`w-1 h-16 mx-auto mb-12 ${dark ? "bg-white" : "bg-black"}`}
//           />

//           <motion.h2
//             initial={{ y: 30, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.4, duration: 0.6 }}
//             className={`text-3xl font-light mb-8 tracking-wide ${dark ? "text-white" : "text-black"}`}
//             style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif", letterSpacing: '0.02em' }}
//           >
//             Pitch Submitted
//           </motion.h2>

//           <motion.div
//             initial={{ y: 30, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.5, duration: 0.6 }}
//             className={`w-24 h-px mx-auto mb-8 ${dark ? "bg-gray-600" : "bg-gray-300"}`}
//           />

//           <motion.p
//             initial={{ y: 30, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.6, duration: 0.6 }}
//             className={`mb-12 text-lg leading-relaxed ${dark ? "text-gray-300" : "text-gray-600"}`}
//             style={{ fontFamily: "'Source Serif Pro', 'Georgia', serif", fontWeight: '300' }}
//           >
//             {message}
//           </motion.p>

//           <motion.button
//             initial={{ y: 30, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.7, duration: 0.6 }}
//             onClick={resetForm}
//             className={`px-12 py-4 font-medium tracking-widest transition-all duration-300 ${
//               dark 
//                 ? "bg-white text-black hover:bg-gray-100 border border-white" 
//                 : "bg-black text-white hover:bg-gray-900 border border-black"
//             }`}
//             style={{ fontFamily: "'Montserrat', 'Helvetica Neue', sans-serif", letterSpacing: '0.15em' }}
//             whileHover={{ y: -2 }}
//             whileTap={{ y: 0 }}
//           >
//             CREATE NEW PITCH
//           </motion.button>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen ${
//       dark ? "bg-black" : "bg-gray-50"
//     }`}>
//       {/* Enhanced Header Typography */}
//       <motion.div
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
//         className="text-center pt-16 pb-12"
//       >
//         <div className={`w-1 h-12 mx-auto mb-8 ${dark ? "bg-white" : "bg-black"}`} />

//         <h1 
//           className={`text-5xl md:text-6xl font-light mb-6 tracking-wider ${
//             dark ? "text-white" : "text-black"
//           }`}
//           style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif", letterSpacing: '0.03em' }}
//         >
//           Investment Pitch
//         </h1>

//         <div className={`w-32 h-px mx-auto mb-6 ${dark ? "bg-gray-600" : "bg-gray-300"}`} />

//         <p 
//           className={`text-lg font-light tracking-wide ${dark ? "text-gray-400" : "text-gray-600"}`}
//           style={{ fontFamily: "'Source Serif Pro', 'Georgia', serif", letterSpacing: '0.02em' }}
//         >
//           Exceptional opportunities deserve exceptional presentation
//         </p>

//         {/* Enhanced Auto-save indicator */}
//         <AnimatePresence>
//           {draftSaved && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               transition={{ duration: 0.3 }}
//               className={`inline-flex items-center gap-3 mt-8 px-6 py-2 ${
//                 dark ? "bg-gray-900 border border-gray-800" : "bg-gray-50 border border-gray-200"
//               }`}
//             >
//               <div className={`w-2 h-2 rounded-full ${dark ? "bg-white" : "bg-black"} opacity-60`} />
//               <span 
//                 className={`text-xs font-medium tracking-wider ${dark ? "text-gray-400" : "text-gray-600"}`}
//                 style={{ fontFamily: "'Montserrat', 'Helvetica Neue', sans-serif", letterSpacing: '0.12em' }}
//               >
//                 DRAFT PRESERVED
//               </span>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>

//       <div className="max-w-5xl mx-auto px-6">
//         {/* Enhanced Progress Section */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           className="mb-16"
//         >
//           {/* Progress Bar */}
//           <div className={`relative w-full h-px mb-12 ${
//             dark ? "bg-gray-900" : "bg-gray-100"
//           }`}>
//             <motion.div
//               className={`absolute top-0 left-0 h-full ${dark ? "bg-white" : "bg-black"}`}
//               initial={{ width: 0 }}
//               animate={{ width: `${progress}%` }}
//               transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
//             />
//           </div>

//           {/* Step Indicators */}
//           <div className="flex justify-between items-center">
//             {steps.map((step, index) => (
//               <motion.div
//                 key={index}
//                 className="flex flex-col items-center"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5 + index * 0.1 }}
//               >
//                 <div className={`w-16 h-16 rounded-full border flex items-center justify-center mb-4 transition-all duration-500 ${
//                   index <= currentStep
//                     ? dark 
//                       ? "border-white bg-white text-black" 
//                       : "border-black bg-black text-white"
//                     : dark 
//                       ? "border-gray-800 text-gray-600" 
//                       : "border-gray-200 text-gray-400"
//                 }`}>
//                   <span 
//                     className="text-sm font-medium tracking-wider"
//                     style={{ fontFamily: "'Montserrat', 'Helvetica Neue', sans-serif", letterSpacing: '0.1em' }}
//                   >
//                     {step.number}
//                   </span>
//                 </div>
//                 <h3 
//                   className={`text-xs font-medium tracking-wider text-center ${
//                     index <= currentStep 
//                       ? dark ? "text-white" : "text-black"
//                       : dark ? "text-gray-600" : "text-gray-400"
//                   }`}
//                   style={{ fontFamily: "'Montserrat', 'Helvetica Neue', sans-serif", letterSpacing: '0.12em' }}
//                 >
//                   {step.title.toUpperCase()}
//                 </h3>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Error Message */}
//         <AnimatePresence>
//           {error && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className={`mb-8 p-6 border ${
//                 dark ? "bg-red-900/20 border-red-800/50" : "bg-red-50 border-red-200/50"
//               }`}
//             >
//               <p 
//                 className={`text-sm ${dark ? "text-red-300" : "text-red-800"}`}
//                 style={{ fontFamily: "'Source Serif Pro', 'Georgia', serif", fontWeight: '300' }}
//               >
//                 {error}
//               </p>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Main Form Container */}
//         <motion.div
//           className={`mb-24 ${
//             dark 
//               ? "bg-gradient-to-b from-gray-900 to-black border border-gray-800" 
//               : "bg-gradient-to-b from-gray-50 to-white border border-gray-100"
//           } shadow-2xl`}
//           style={{
//             boxShadow: dark 
//               ? "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)" 
//               : "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)"
//           }}
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4, duration: 0.8 }}
//         >
//           {/* Form Content */}
//           <div className="px-16 py-20">
//             <AnimatePresence mode="wait" custom={direction}>
//               <motion.div
//                 key={currentStep}
//                 custom={direction}
//                 variants={slideVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 transition={{
//                   x: { type: "spring", stiffness: 300, damping: 40 },
//                   opacity: { duration: 0.4 }
//                 }}
//               >
//                 <div className="mb-16 text-center">
//                   <div className={`w-1 h-8 mx-auto mb-6 ${dark ? "bg-white" : "bg-black"}`} />
//                   <h2 
//                     className={`text-3xl font-light mb-4 tracking-wide ${
//                       dark ? "text-white" : "text-black"
//                     }`}
//                     style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif", letterSpacing: '0.02em' }}
//                   >
//                     {steps[currentStep].title}
//                   </h2>
//                   <div className={`w-16 h-px mx-auto ${dark ? "bg-gray-600" : "bg-gray-300"}`} />
//                 </div>

//                 <form onSubmit={currentStep === steps.length - 1 ? handleSubmit : (e) => e.preventDefault()}>
//                   <div className="space-y-12">
//                     {steps[currentStep].fields.map((field, fieldIndex) => (
//                       <motion.div
//                         key={field.name}
//                         initial={{ opacity: 0, y: 30 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: fieldIndex * 0.15, duration: 0.6 }}
//                       >
//                         <label 
//                           className={`block text-sm font-medium tracking-wider mb-4 ${
//                             dark ? "text-gray-300" : "text-gray-700"
//                           }`}
//                           style={{ fontFamily: "'Montserrat', 'Helvetica Neue', sans-serif", letterSpacing: '0.1em' }}
//                         >
//                           {field.label.toUpperCase()}
//                           {field.required && <span className={`ml-2 ${dark ? "text-white" : "text-black"}`}>*</span>}
//                         </label>

//                         {field.textarea ? (
//                           <textarea
//                             name={field.name}
//                             rows="6"
//                             placeholder={field.placeholder}
//                             className={`w-full px-6 py-6 leading-relaxed border-0 border-b-2 bg-transparent transition-all duration-300 focus:outline-none resize-none ${
//                               dark
//                                 ? "border-gray-800 text-white placeholder-gray-600 focus:border-white"
//                                 : "border-gray-200 text-black placeholder-gray-400 focus:border-black"
//                             }`}
//                             style={{ 
//                               fontFamily: "'Source Serif Pro', 'Georgia', serif", 
//                               fontWeight: '300',
//                               lineHeight: '1.7',
//                               fontSize: '16px'
//                             }}
//                             value={formData[field.name]}
//                             onChange={handleChange}
//                             required={field.required}
//                           />
//                         ) : (
//                           <input
//                             type="text"
//                             name={field.name}
//                             placeholder={field.placeholder}
//                             className={`w-full px-6 py-6 border-0 border-b-2 bg-transparent transition-all duration-300 focus:outline-none ${
//                               dark
//                                 ? "border-gray-800 text-white placeholder-gray-600 focus:border-white"
//                                 : "border-gray-200 text-black placeholder-gray-400 focus:border-black"
//                             }`}
//                             style={{ 
//                               fontFamily: "'Source Serif Pro', 'Georgia', serif", 
//                               fontWeight: '300',
//                               fontSize: '16px'
//                             }}
//                             value={formData[field.name]}
//                             onChange={handleChange}
//                             required={field.required}
//                           />
//                         )}
//                       </motion.div>
//                     ))}
//                   </div>
//                 </form>
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           {/* Enhanced Navigation */}
//           <div className={`flex justify-between items-center px-16 py-8 border-t ${
//             dark ? "border-gray-800" : "border-gray-100"
//           }`}>
//             <motion.button
//               type="button"
//               onClick={prevStep}
//               disabled={currentStep === 0}
//               className={`flex items-center gap-4 px-8 py-3 font-medium tracking-wider transition-all duration-300 ${
//                 currentStep === 0
//                   ? "opacity-30 cursor-not-allowed"
//                   : dark
//                   ? "text-gray-400 hover:text-white"
//                   : "text-gray-600 hover:text-black"
//               }`}
//               style={{ fontFamily: "'Montserrat', 'Helvetica Neue', sans-serif", letterSpacing: '0.1em' }}
//               whileHover={{ x: currentStep === 0 ? 0 : -5 }}
//             >
//               <div className={`w-6 h-px ${
//                 currentStep === 0 
//                   ? dark ? "bg-gray-800" : "bg-gray-300"
//                   : dark ? "bg-gray-400 group-hover:bg-white" : "bg-gray-600 group-hover:bg-black"
//               }`} />
//               PREVIOUS
//             </motion.button>

//             <div className="flex items-center gap-6">
//               <span 
//                 className={`text-xs font-medium tracking-wider ${dark ? "text-gray-500" : "text-gray-500"}`}
//                 style={{ fontFamily: "'Montserrat', 'Helvetica Neue', sans-serif", letterSpacing: '0.12em' }}
//               >
//                 {String(currentStep + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
//               </span>
//               <div className="flex gap-2">
//                 {steps.map((_, index) => (
//                   <div
//                     key={index}
//                     className={`w-8 h-px transition-all duration-300 ${
//                       index <= currentStep 
//                         ? dark ? "bg-white" : "bg-black"
//                         : dark ? "bg-gray-800" : "bg-gray-200"
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>

//             {currentStep === steps.length - 1 ? (
//               <motion.button
//                 type="button"
//                 onClick={handleSubmit}
//                 disabled={loading || !isStepValid()}
//                 className={`flex items-center gap-4 px-8 py-3 font-medium tracking-wider transition-all duration-300 ${
//                   loading || !isStepValid()
//                     ? "opacity-50 cursor-not-allowed"
//                     : dark
//                     ? "text-white hover:text-gray-300"
//                     : "text-black hover:text-gray-700"
//                 }`}
//                 style={{ fontFamily: "'Montserrat', 'Helvetica Neue', sans-serif", letterSpacing: '0.1em' }}
//                 whileHover={{ x: (loading || !isStepValid()) ? 0 : 5 }}
//               >
//                 {loading ? (
//                   <>
//                     <div className={`w-4 h-4 border border-current border-t-transparent rounded-full animate-spin`} />
//                     SUBMITTING
//                   </>
//                 ) : (
//                   <>
//                     SUBMIT
//                     <div className={`w-6 h-px ${dark ? "bg-white" : "bg-black"}`} />
//                   </>
//                 )}
//               </motion.button>
//             ) : (
//               <motion.button
//                 type="button"
//                 onClick={nextStep}
//                 disabled={!isStepValid()}
//                 className={`flex items-center gap-4 px-8 py-3 font-medium tracking-wider transition-all duration-300 ${
//                   !isStepValid()
//                     ? "opacity-50 cursor-not-allowed"
//                     : dark
//                     ? "text-white hover:text-gray-300"
//                     : "text-black hover:text-gray-700"
//                 }`}
//                 style={{ fontFamily: "'Montserrat', 'Helvetica Neue', sans-serif", letterSpacing: '0.1em' }}
//                 whileHover={{ x: !isStepValid() ? 0 : 5 }}
//               >
//                 CONTINUE
//                 <div className={`w-6 h-px ${
//                   !isStepValid() 
//                     ? dark ? "bg-gray-800" : "bg-gray-300"
//                     : dark ? "bg-white" : "bg-black"
//                 }`} />
//               </motion.button>
//             )}
//           </div>
//         </motion.div>

//         {/* Enhanced Clear Option */}
//         {Object.values(formData).some(value => value.trim()) && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center pb-16"
//           >
//             <button
//               onClick={() => {
//                 localStorage.removeItem("pitchDraft");
//                 resetForm();
//               }}
//               className={`text-xs font-medium tracking-widest transition-colors duration-300 ${
//                 dark
//                   ? "text-gray-700 hover:text-gray-500"
//                   : "text-gray-400 hover:text-gray-600"
//               }`}
//               style={{ fontFamily: "'Montserrat', 'Helvetica Neue', sans-serif", letterSpacing: '0.15em' }}
//             >
//               CLEAR DRAFT
//             </button>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PitchForm;


// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import api from "../utils/api1";
// import useThemeStore from "../store/themeStore";

// const PitchForm = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [formData, setFormData] = useState({
//     startupName: "",
//     oneLiner: "",
//     problem: "",
//     solution: "",
//     targetMarket: "",
//     businessModel: "",
//     traction: "",
//     team: "",
//     goToMarketStrategy: "",
//     competition: "",
//     fundingAsk: "",
//     fundingUse: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState("");
//   const [draftSaved, setDraftSaved] = useState(false);
//   const [direction, setDirection] = useState(0);
//   const { dark } = useThemeStore();

//   // Auto-save functionality
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const hasContent = Object.values(formData).some(value => value.trim());

//       if (hasContent) {
//         localStorage.setItem("pitchDraft", JSON.stringify({ ...formData, currentStep }));
//         setDraftSaved(true);
//         setTimeout(() => setDraftSaved(false), 2500);
//       }
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [formData, currentStep]);

//   // Load draft on component mount
//   useEffect(() => {
//     const savedDraft = localStorage.getItem("pitchDraft");
//     if (savedDraft) {
//       try {
//         const parsedDraft = JSON.parse(savedDraft);
//         const hasContent = Object.values(parsedDraft).some(value => 
//           typeof value === 'string' && value.trim()
//         );

//         if (hasContent) {
//           const { currentStep: savedStep, ...data } = parsedDraft;
//           setFormData(data);
//           setCurrentStep(savedStep || 0);
//         }
//       } catch (error) {
//         console.error("Error parsing saved pitch draft:", error);
//         localStorage.removeItem("pitchDraft");
//       }
//     }
//   }, []);

//   const steps = [
//     {
//       title: "Foundation",
//       shortTitle: "Foundation",
//       number: "I",
//       fields: [
//         {
//           label: "Company Name",
//           name: "startupName",
//           placeholder: "Enter your company name",
//           required: true
//         },
//         {
//           label: "Value Proposition",
//           name: "oneLiner",
//           placeholder: "Describe your company's core value proposition",
//           required: true
//         }
//       ]
//     },
//     {
//       title: "Challenge & Innovation",
//       shortTitle: "Problem",
//       number: "II",
//       fields: [
//         {
//           label: "Market Problem",
//           name: "problem",
//           textarea: true,
//           placeholder: "Define the significant problem or market inefficiency your company addresses",
//           required: true
//         },
//         {
//           label: "Solution Overview",
//           name: "solution",
//           textarea: true,
//           placeholder: "Explain how your innovation provides a superior solution",
//           required: true
//         }
//       ]
//     },
//     {
//       title: "Market Opportunity",
//       shortTitle: "Market",
//       number: "III",
//       fields: [
//         {
//           label: "Target Market",
//           name: "targetMarket",
//           textarea: true,
//           placeholder: "Define your addressable market and customer segments",
//           required: true
//         },
//         {
//           label: "Revenue Model",
//           name: "businessModel",
//           textarea: true,
//           placeholder: "Outline your monetization strategy and revenue streams",
//           required: true
//         }
//       ]
//     },
//     {
//       title: "Execution & Team",
//       shortTitle: "Team",
//       number: "IV",
//       fields: [
//         {
//           label: "Current Traction",
//           name: "traction",
//           textarea: true,
//           placeholder: "Present key metrics, milestones, and validation achieved",
//           required: true
//         },
//         {
//           label: "Team Overview",
//           name: "team",
//           textarea: true,
//           placeholder: "Highlight leadership team and advisory board expertise",
//           required: true
//         }
//       ]
//     },
//     {
//       title: "Market Strategy",
//       shortTitle: "Strategy",
//       number: "V",
//       fields: [
//         {
//           label: "Go-to-Market Strategy",
//           name: "goToMarketStrategy",
//           textarea: true,
//           placeholder: "Detail your customer acquisition and market penetration approach",
//           required: true
//         },
//         {
//           label: "Competitive Analysis",
//           name: "competition",
//           textarea: true,
//           placeholder: "Identify competitive landscape and articulate your differentiation",
//           required: true
//         }
//       ]
//     },
//     {
//       title: "Investment Request",
//       shortTitle: "Funding",
//       number: "VI",
//       fields: [
//         {
//           label: "Funding Amount",
//           name: "fundingAsk",
//           placeholder: "Specify the investment amount and round type",
//           required: true
//         },
//         {
//           label: "Use of Funds",
//           name: "fundingUse",
//           textarea: true,
//           placeholder: "Provide detailed allocation of investment across strategic priorities",
//           required: true
//         }
//       ]
//     }
//   ];

//   const progress = ((currentStep + 1) / steps.length) * 100;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     if (error) setError("");
//   };

//   const nextStep = () => {
//     if (currentStep < steps.length - 1) {
//       setDirection(1);
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 0) {
//       setDirection(-1);
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const isStepValid = () => {
//     return steps[currentStep].fields.every(field => 
//       field.required ? formData[field.name]?.trim() : true
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isStepValid()) return;

//     setLoading(true);
//     setError("");

//     try {
//       const res = await api.post("/user/posts/submitpitch", formData);
//       setMessage(res.data.message);
//       setSuccess(true);
//       localStorage.removeItem("pitchDraft");
//     } catch (error) {
//       setError(
//         error.response?.data?.message ||
//         "Failed to submit pitch. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       startupName: "",
//       oneLiner: "",
//       problem: "",
//       solution: "",
//       targetMarket: "",
//       businessModel: "",
//       traction: "",
//       team: "",
//       goToMarketStrategy: "",
//       competition: "",
//       fundingAsk: "",
//       fundingUse: "",
//     });
//     setCurrentStep(0);
//     setSuccess(false);
//     setMessage('');
//     localStorage.removeItem("pitchDraft");
//   };

//   const slideVariants = {
//     enter: (direction) => ({
//       x: direction > 0 ? 20 : -20,
//       opacity: 0
//     }),
//     center: {
//       zIndex: 1,
//       x: 0,
//       opacity: 1
//     },
//     exit: (direction) => ({
//       zIndex: 0,
//       x: direction < 0 ? 20 : -20,
//       opacity: 0
//     })
//   };

//   if (success) {
//     return (
//       <div className={`min-h-screen flex items-center justify-center p-4 ${
//         dark ? "bg-black" : "bg-white"
//       }`}>
//         <motion.div
//           initial={{ scale: 0.95, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
//           className={`w-full max-w-sm sm:max-w-md md:max-w-lg text-center p-6 sm:p-8 md:p-12 lg:p-16 ${
//             dark 
//               ? "bg-gray-900 border border-gray-800" 
//               : "bg-gray-50 border border-gray-200"
//           } shadow-lg`}
//         >
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ delay: 0.2, duration: 0.4, type: "spring", stiffness: 200 }}
//             className={`w-0.5 h-8 sm:h-10 md:h-12 mx-auto mb-6 sm:mb-8 ${dark ? "bg-white" : "bg-black"}`}
//           />

//           <motion.h2
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.5 }}
//             className={`text-xl sm:text-2xl md:text-3xl font-light mb-4 sm:mb-6 md:mb-8 ${dark ? "text-white" : "text-black"}`}
//           >
//             Pitch Submitted
//           </motion.h2>

//           <motion.div
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.4, duration: 0.5 }}
//             className={`w-12 sm:w-16 md:w-20 h-px mx-auto mb-4 sm:mb-6 md:mb-8 ${dark ? "bg-gray-600" : "bg-gray-300"}`}
//           />

//           <motion.p
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.5, duration: 0.5 }}
//             className={`mb-6 sm:mb-8 md:mb-12 text-sm sm:text-base md:text-lg leading-relaxed ${dark ? "text-gray-300" : "text-gray-600"}`}
//           >
//             {message}
//           </motion.p>

//           <motion.button
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.6, duration: 0.5 }}
//             onClick={resetForm}
//             className={`w-full px-6 sm:px-8 md:px-12 py-3 sm:py-4 text-xs sm:text-sm font-medium tracking-widest transition-all duration-300 ${
//               dark 
//                 ? "bg-white text-black hover:bg-gray-100 border border-white" 
//                 : "bg-black text-white hover:bg-gray-900 border border-black"
//             }`}
//             whileHover={{ y: -2 }}
//             whileTap={{ y: 0 }}
//           >
//             CREATE NEW PITCH
//           </motion.button>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen ${dark ? "bg-black" : "bg-gray-50"}`}>
//       {/* Fully Responsive Header */}
//       <motion.div
//         initial={{ y: -30, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
//         className="text-center pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8 md:pb-12 px-4"
//       >
//         <div className={`w-0.5 h-6 sm:h-8 md:h-10 lg:h-12 mx-auto mb-4 sm:mb-6 md:mb-8 ${dark ? "bg-white" : "bg-black"}`} />

//         <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light mb-3 sm:mb-4 md:mb-6 tracking-wider ${
//           dark ? "text-white" : "text-black"
//         }`}>
//           Investment Pitch
//         </h1>

//         <div className={`w-16 sm:w-20 md:w-24 lg:w-32 h-px mx-auto mb-3 sm:mb-4 md:mb-6 ${dark ? "bg-gray-600" : "bg-gray-300"}`} />

//         <p className={`text-sm sm:text-base md:text-lg font-light tracking-wide max-w-md mx-auto ${
//           dark ? "text-gray-400" : "text-gray-600"
//         }`}>
//           Exceptional opportunities deserve exceptional presentation
//         </p>

//         {/* Mobile-Optimized Auto-save indicator */}
//         <AnimatePresence>
//           {draftSaved && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               transition={{ duration: 0.3 }}
//               className={`inline-flex items-center gap-2 sm:gap-3 mt-4 sm:mt-6 md:mt-8 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 ${
//                 dark ? "bg-gray-900 border border-gray-800" : "bg-gray-50 border border-gray-200"
//               }`}
//             >
//               <div className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full ${dark ? "bg-white" : "bg-black"} opacity-60`} />
//               <span className={`text-xs font-medium tracking-wider ${dark ? "text-gray-400" : "text-gray-600"}`}>
//                 DRAFT PRESERVED
//               </span>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>

//       <div className="max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 sm:px-6">
//         {/* Mobile-First Progress Section */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="mb-8 sm:mb-12 md:mb-16"
//         >
//           {/* Simplified Progress Bar */}
//           <div className={`relative w-full h-0.5 sm:h-px mb-6 sm:mb-8 md:mb-12 ${
//             dark ? "bg-gray-900" : "bg-gray-200"
//           }`}>
//             <motion.div
//               className={`absolute top-0 left-0 h-full ${dark ? "bg-white" : "bg-black"}`}
//               initial={{ width: 0 }}
//               animate={{ width: `${progress}%` }}
//               transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
//             />
//           </div>

//           {/* Responsive Step Indicators */}
//           <div className="grid grid-cols-6 gap-1 sm:gap-2 md:flex md:justify-between md:items-center">
//             {steps.map((step, index) => (
//               <motion.div
//                 key={index}
//                 className="flex flex-col items-center"
//                 initial={{ opacity: 0, y: 15 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3 + index * 0.1 }}
//               >
//                 <div className={`w-8 sm:w-10 md:w-12 lg:w-14 xl:w-16 h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 rounded-full border flex items-center justify-center mb-2 sm:mb-3 md:mb-4 transition-all duration-500 ${
//                   index <= currentStep
//                     ? dark 
//                       ? "border-white bg-white text-black" 
//                       : "border-black bg-black text-white"
//                     : dark 
//                       ? "border-gray-800 text-gray-600" 
//                       : "border-gray-300 text-gray-500"
//                 }`}>
//                   <span className="text-xs sm:text-sm font-medium">
//                     {step.number}
//                   </span>
//                 </div>
//                 <h3 className={`text-xs sm:text-xs md:text-xs font-medium tracking-wider text-center leading-tight ${
//                   index <= currentStep 
//                     ? dark ? "text-white" : "text-black"
//                     : dark ? "text-gray-600" : "text-gray-500"
//                 }`}>
//                   <span className="hidden sm:inline">{step.title.toUpperCase()}</span>
//                   <span className="sm:hidden">{step.shortTitle.toUpperCase()}</span>
//                 </h3>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Mobile-Optimized Error Message */}
//         <AnimatePresence>
//           {error && (
//             <motion.div
//               initial={{ opacity: 0, y: -15 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -15 }}
//               className={`mb-4 sm:mb-6 md:mb-8 p-3 sm:p-4 md:p-6 border text-sm ${
//                 dark ? "bg-red-900/20 border-red-800/50 text-red-300" : "bg-red-50 border-red-200/50 text-red-800"
//               }`}
//             >
//               {error}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Fully Responsive Form Container */}
//         <motion.div
//           className={`mb-12 sm:mb-16 md:mb-20 lg:mb-24 border ${
//             dark 
//               ? "bg-gray-900 border-gray-800" 
//               : "bg-gray-50 border-gray-200"
//           } shadow-lg md:shadow-xl lg:shadow-2xl`}
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.6 }}
//         >
//           {/* Form Content */}
//           <div className="p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
//             <AnimatePresence mode="wait" custom={direction}>
//               <motion.div
//                 key={currentStep}
//                 custom={direction}
//                 variants={slideVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 transition={{
//                   x: { type: "spring", stiffness: 300, damping: 40 },
//                   opacity: { duration: 0.3 }
//                 }}
//               >
//                 <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-center">
//                   <div className={`w-0.5 h-4 sm:h-5 md:h-6 lg:h-8 mx-auto mb-3 sm:mb-4 md:mb-6 ${dark ? "bg-white" : "bg-black"}`} />
//                   <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mb-2 sm:mb-3 md:mb-4 tracking-wide ${
//                     dark ? "text-white" : "text-black"
//                   }`}>
//                     {steps[currentStep].title}
//                   </h2>
//                   <div className={`w-8 sm:w-10 md:w-12 lg:w-16 h-px mx-auto ${dark ? "bg-gray-600" : "bg-gray-400"}`} />
//                 </div>

//                 <form onSubmit={currentStep === steps.length - 1 ? handleSubmit : (e) => e.preventDefault()}>
//                   <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
//                     {steps[currentStep].fields.map((field, fieldIndex) => (
//                       <motion.div
//                         key={field.name}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: fieldIndex * 0.1, duration: 0.4 }}
//                       >
//                         <label className={`block text-xs sm:text-sm font-medium tracking-wider mb-2 sm:mb-3 md:mb-4 ${
//                           dark ? "text-gray-300" : "text-gray-700"
//                         }`}>
//                           {field.label.toUpperCase()}
//                           {field.required && <span className={`ml-1 sm:ml-2 ${dark ? "text-white" : "text-black"}`}>*</span>}
//                         </label>

//                         {field.textarea ? (
//                           <textarea
//                             name={field.name}
//                             rows="4"
//                             placeholder={field.placeholder}
//                             className={`w-full px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6 text-sm sm:text-base leading-relaxed border-0 border-b border-b-2 bg-transparent transition-all duration-300 focus:outline-none resize-none ${
//                               dark
//                                 ? "border-gray-700 text-white placeholder-gray-500 focus:border-white"
//                                 : "border-gray-300 text-black placeholder-gray-500 focus:border-black"
//                             }`}
//                             value={formData[field.name]}
//                             onChange={handleChange}
//                             required={field.required}
//                           />
//                         ) : (
//                           <input
//                             type="text"
//                             name={field.name}
//                             placeholder={field.placeholder}
//                             className={`w-full px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6 text-sm sm:text-base border-0 border-b border-b-2 bg-transparent transition-all duration-300 focus:outline-none ${
//                               dark
//                                 ? "border-gray-700 text-white placeholder-gray-500 focus:border-white"
//                                 : "border-gray-300 text-black placeholder-gray-500 focus:border-black"
//                             }`}
//                             value={formData[field.name]}
//                             onChange={handleChange}
//                             required={field.required}
//                           />
//                         )}
//                       </motion.div>
//                     ))}
//                   </div>
//                 </form>
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           {/* Mobile-Optimized Navigation */}
//           <div className={`flex justify-between items-center p-4 sm:p-6 md:p-8 lg:px-16 lg:py-8 border-t ${
//             dark ? "border-gray-800" : "border-gray-300"
//           }`}>
//             <motion.button
//               type="button"
//               onClick={prevStep}
//               disabled={currentStep === 0}
//               className={`flex items-center gap-2 sm:gap-3 md:gap-4 px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 text-xs sm:text-sm font-medium tracking-wider transition-all duration-300 ${
//                 currentStep === 0
//                   ? "opacity-30 cursor-not-allowed"
//                   : dark
//                   ? "text-gray-400 hover:text-white"
//                   : "text-gray-600 hover:text-black"
//               }`}
//               whileHover={{ x: currentStep === 0 ? 0 : -3 }}
//             >
//               <div className={`w-3 sm:w-4 md:w-6 h-px ${
//                 currentStep === 0 
//                   ? dark ? "bg-gray-800" : "bg-gray-400"
//                   : dark ? "bg-gray-400 group-hover:bg-white" : "bg-gray-600 group-hover:bg-black"
//               }`} />
//               <span className="hidden sm:inline">PREVIOUS</span>
//               <span className="sm:hidden">BACK</span>
//             </motion.button>

//             <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
//               <span className={`text-xs font-medium tracking-wider ${dark ? "text-gray-500" : "text-gray-500"}`}>
//                 {String(currentStep + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
//               </span>
//               <div className="hidden sm:flex gap-1 md:gap-2">
//                 {steps.map((_, index) => (
//                   <div
//                     key={index}
//                     className={`w-4 sm:w-6 md:w-8 h-px transition-all duration-300 ${
//                       index <= currentStep 
//                         ? dark ? "bg-white" : "bg-black"
//                         : dark ? "bg-gray-800" : "bg-gray-300"
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>

//             {currentStep === steps.length - 1 ? (
//               <motion.button
//                 type="button"
//                 onClick={handleSubmit}
//                 disabled={loading || !isStepValid()}
//                 className={`flex items-center gap-2 sm:gap-3 md:gap-4 px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 text-xs sm:text-sm font-medium tracking-wider transition-all duration-300 ${
//                   loading || !isStepValid()
//                     ? "opacity-50 cursor-not-allowed"
//                     : dark
//                     ? "text-white hover:text-gray-300"
//                     : "text-black hover:text-gray-700"
//                 }`}
//                 whileHover={{ x: (loading || !isStepValid()) ? 0 : 3 }}
//               >
//                 {loading ? (
//                   <>
//                     <div className={`w-3 sm:w-4 h-3 sm:h-4 border border-current border-t-transparent rounded-full animate-spin`} />
//                     <span className="hidden sm:inline">SUBMITTING</span>
//                     <span className="sm:hidden">SENDING</span>
//                   </>
//                 ) : (
//                   <>
//                     <span>SUBMIT</span>
//                     <div className={`w-3 sm:w-4 md:w-6 h-px ${dark ? "bg-white" : "bg-black"}`} />
//                   </>
//                 )}
//               </motion.button>
//             ) : (
//               <motion.button
//                 type="button"
//                 onClick={nextStep}
//                 disabled={!isStepValid()}
//                 className={`flex items-center gap-2 sm:gap-3 md:gap-4 px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 text-xs sm:text-sm font-medium tracking-wider transition-all duration-300 ${
//                   !isStepValid()
//                     ? "opacity-50 cursor-not-allowed"
//                     : dark
//                     ? "text-white hover:text-gray-300"
//                     : "text-black hover:text-gray-700"
//                 }`}
//                 whileHover={{ x: !isStepValid() ? 0 : 3 }}
//               >
//                 <span className="hidden sm:inline">CONTINUE</span>
//                 <span className="sm:hidden">NEXT</span>
//                 <div className={`w-3 sm:w-4 md:w-6 h-px ${
//                   !isStepValid() 
//                     ? dark ? "bg-gray-800" : "bg-gray-400"
//                     : dark ? "bg-white" : "bg-black"
//                 }`} />
//               </motion.button>
//             )}
//           </div>
//         </motion.div>

//         {/* Mobile-Optimized Clear Option */}
//         {Object.values(formData).some(value => value.trim()) && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center pb-8 sm:pb-12 md:pb-16"
//           >
//             <button
//               onClick={() => {
//                 localStorage.removeItem("pitchDraft");
//                 resetForm();
//               }}
//               className={`text-xs font-medium tracking-widest transition-colors duration-300 ${
//                 dark
//                   ? "text-gray-700 hover:text-gray-500"
//                   : "text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               CLEAR DRAFT
//             </button>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PitchForm;


import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../utils/api1";
import useThemeStore from "../store/themeStore";

const PitchForm = () => {
  const [formData, setFormData] = useState({
    startupName: "",
    oneLiner: "",
    problem: "",
    solution: "",
    targetMarket: "",
    businessModel: "",
    traction: "",
    team: "",
    goToMarketStrategy: "",
    competition: "",
    fundingAsk: "",
    fundingUse: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState("");
  const [draftSaved, setDraftSaved] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const [sampleEnhanced, setSampleEnhanced] = useState("");
  const [enhanceField, setEnhanceField] = useState("");
  const { dark } = useThemeStore();

  // Enhanced screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasContent = Object.values(formData).some(value => value.trim());

      if (hasContent) {
        localStorage.setItem("pitchDraft", JSON.stringify(formData));
        setDraftSaved(true);
        setTimeout(() => setDraftSaved(false), 2500);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [formData]);

  // Load draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("pitchDraft");
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        const hasContent = Object.values(parsedDraft).some(value =>
          typeof value === 'string' && value.trim()
        );

        if (hasContent) {
          setFormData(parsedDraft);
        }
      } catch (error) {
        console.error("Error parsing saved pitch draft:", error);
        localStorage.removeItem("pitchDraft");
      }
    }
  }, []);

  const sections = [
    {
      title: "Foundation",
      fields: [
        {
          label: "Company Name",
          name: "startupName",
          placeholder: "Enter your company name...",
          required: true,
          maxLength: 100
        },
        {
          label: "Value Proposition",
          name: "oneLiner",
          placeholder: "Describe your company's core value proposition...",
          required: true,
          maxLength: 200
        }
      ]
    },
    {
      title: "Challenge & Innovation",
      fields: [
        {
          label: "Market Problem",
          name: "problem",
          textarea: true,
          placeholder: "Define the significant problem or market inefficiency your company addresses...",
          required: true,
          maxLength: 800
        },
        {
          label: "Solution Overview",
          name: "solution",
          textarea: true,
          placeholder: "Explain how your innovation provides a superior solution...",
          required: true,
          maxLength: 800
        }
      ]
    },
    {
      title: "Market Opportunity",
      fields: [
        {
          label: "Target Market",
          name: "targetMarket",
          textarea: true,
          placeholder: "Define your addressable market and customer segments...",
          required: true,
          maxLength: 600
        },
        {
          label: "Revenue Model",
          name: "businessModel",
          textarea: true,
          placeholder: "Outline your monetization strategy and revenue streams...",
          required: true,
          maxLength: 600
        }
      ]
    },
    {
      title: "Execution & Team",
      fields: [
        {
          label: "Current Traction",
          name: "traction",
          textarea: true,
          placeholder: "Present key metrics, milestones, and validation achieved...",
          required: true,
          maxLength: 700
        },
        {
          label: "Team Overview",
          name: "team",
          textarea: true,
          placeholder: "Highlight leadership team and advisory board expertise...",
          required: true,
          maxLength: 600
        }
      ]
    },
    {
      title: "Market Strategy",
      fields: [
        {
          label: "Go-to-Market Strategy",
          name: "goToMarketStrategy",
          textarea: true,
          placeholder: "Detail your customer acquisition and market penetration approach...",
          required: true,
          maxLength: 700
        },
        {
          label: "Competitive Analysis",
          name: "competition",
          textarea: true,
          placeholder: "Identify competitive landscape and articulate your differentiation...",
          required: true,
          maxLength: 700
        }
      ]
    },
    {
      title: "Investment Request",
      fields: [
        {
          label: "Funding Amount",
          name: "fundingAsk",
          placeholder: "Specify the investment amount and round type...",
          required: true,
          maxLength: 200
        },
        {
          label: "Use of Funds",
          name: "fundingUse",
          textarea: true,
          placeholder: "Provide detailed allocation of investment across strategic priorities...",
          required: true,
          maxLength: 800
        }
      ]
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleAIEnhance = async (fieldName, content) => {
    if (!content.trim()) {
      setError("Please enter some content to enhance");
      return;
    }
    
    setEnhancing(true);
    setEnhanceField(fieldName);
    
    try {
      const res = await api.post("/user/ask", {
        content: `
          You are an expert investment pitch writer.  
          Your job is to take the following text and:
          1. Improve clarity, grammar, and flow for investor presentations.
          2. Make it compelling and professionally persuasive.
          3. Expand with relevant details that investors want to see.
          4. Keep the tone confident yet realistic.
          5. Return ONLY the improved version (no extra formatting or labels).
          
          Context: This is for field "${fieldName}" in an investment pitch.
          
          Here is the text to improve:
          ---
          ${content}
          ---
        `,
      });
      const enhancedContent = res.data.data.choices[0].message.content.trim();
      setSampleEnhanced(enhancedContent);
      setError("");
    } catch (error) {
      console.error("AI Enhancement error:", error);
      setError("Failed to enhance content. Please try again.");
    } finally {
      setEnhancing(false);
      setEnhanceField("");
    }
  };

  const isFormValid = () => {
    const requiredFields = sections.flatMap(section => 
      section.fields.filter(field => field.required).map(field => field.name)
    );
    return requiredFields.every(field => formData[field]?.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.post("/user/posts/submitpitch", formData);
      setMessage(res.data.message);
      setSuccess(true);
      localStorage.removeItem("pitchDraft");
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to submit pitch. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClearDraft = () => {
    setFormData({
      startupName: "",
      oneLiner: "",
      problem: "",
      solution: "",
      targetMarket: "",
      businessModel: "",
      traction: "",
      team: "",
      goToMarketStrategy: "",
      competition: "",
      fundingAsk: "",
      fundingUse: "",
    });
    setSuccess(false);
    setMessage('');
    setError("");
    setSampleEnhanced("");
    localStorage.removeItem("pitchDraft");
  };

  // Check if there's any draft content
  const hasDraftContent = Object.values(formData).some(value => value.trim());

  if (success) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 ${
        dark ? "bg-black" : "bg-white"
      }`}>
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 text-sm flex items-center gap-2 backdrop-blur-sm transition-all duration-500">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            />
          </svg>
          {message} 🎉
        </div>
        <button
          onClick={handleClearDraft}
          className={`mt-4 w-full sm:w-auto px-6 md:px-8 py-3 md:py-3.5 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 backdrop-blur-sm border ${
            dark
              ? "bg-gradient-to-r from-white/15 via-white/25 to-white/15 border-white/30 text-white hover:from-white/25 hover:via-white/35 hover:to-white/25 shadow-lg hover:shadow-xl"
              : "bg-gradient-to-r from-black/15 via-black/25 to-black/15 border-black/30 text-black hover:from-black/25 hover:via-black/35 hover:to-black/25 shadow-lg hover:shadow-xl"
          }`}
        >
          Create New Pitch
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-4 md:py-6 lg:py-8 relative overflow-hidden">
      {/* Enhanced multi-layer glassmorphism background - FIXED to match Post component */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary gradient orbs - First orb now empty to match Post component */}
        <div className={`absolute -top-32 -right-32 w-64 h-64 md:w-80 md:h-80 rounded-full blur-3xl transition-opacity duration-1000`}></div>
        
        <div className={`absolute -bottom-32 -left-32 w-72 h-72 md:w-96 md:h-96 rounded-full blur-3xl transition-opacity duration-1000 ${
          dark 
            ? "bg-gradient-to-tr from-emerald-500/20 via-cyan-500/15 to-blue-500/25" 
            : "bg-gradient-to-tr from-emerald-400/25 via-cyan-400/20 to-blue-400/30"
        }`}></div>
        
        {/* Secondary accent orbs for depth */}
        <div className={`absolute top-1/3 right-1/4 w-48 h-48 md:w-56 md:h-56 rounded-full blur-2xl opacity-60 ${
          dark 
            ? "bg-gradient-to-br from-orange-500/15 to-red-500/10" 
            : "bg-gradient-to-br from-orange-400/20 to-red-400/15"
        }`}></div>
        
        <div className={`absolute bottom-1/3 left-1/4 w-40 h-40 md:w-48 md:h-48 rounded-full blur-2xl opacity-40 ${
          dark 
            ? "bg-gradient-to-br from-violet-500/20 to-indigo-500/15" 
            : "bg-gradient-to-br from-violet-400/25 to-indigo-400/20"
        }`}></div>
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
              : "0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
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
            <div className={`absolute inset-0 bg-gradient-to-r ${
              dark 
                ? "from-transparent via-white/5 to-transparent" 
                : "from-transparent via-black/5 to-transparent"
            } opacity-50`}></div>
            
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
                  <div className={`absolute inset-0.5 rounded-full ${
                    dark ? "bg-white/20" : "bg-black/20"
                  }`}></div>
                </div>
                <h2
                  className={`text-base sm:text-lg md:text-xl font-semibold tracking-tight ${
                    dark ? "text-white/95" : "text-black/95"
                  }`}
                >
                  Investment Pitch
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
                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="currentColor" viewBox="0 0 20 20">
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
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            {/* Enhanced error message */}
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/25 text-red-600 text-sm backdrop-blur-sm">
                {error}
              </div>
            )}

            {/* Single Page Form Sections */}
            <div className="space-y-6 sm:space-y-8 md:space-y-10">
              {sections.map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: sectionIndex * 0.1, duration: 0.6 }}
                  className="space-y-4 sm:space-y-6"
                >
                  {/* Section Header */}
                  <div className="mb-4 sm:mb-6">
                    <h3 className={`text-lg sm:text-xl font-semibold mb-2 ${
                      dark ? "text-white/90" : "text-black/90"
                    }`}>
                      {section.title}
                    </h3>
                    <div className={`w-8 sm:w-12 h-px ${
                      dark ? "bg-white/30" : "bg-black/30"
                    }`} />
                  </div>

                  {/* Section Fields */}
                  <div className="space-y-4 sm:space-y-6">
                    {section.fields.map((field, fieldIndex) => (
                      <motion.div
                        key={field.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (sectionIndex * 0.1) + (fieldIndex * 0.05), duration: 0.4 }}
                        className="space-y-2"
                      >
                        <label
                          className={`block text-sm font-medium ${
                            dark ? "text-white/85" : "text-black/85"
                          }`}
                        >
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>

                        <div className="relative">
                          {field.textarea ? (
                            <textarea
                              name={field.name}
                              rows={isMobile ? 4 : 5}
                              maxLength={field.maxLength}
                              value={formData[field.name]}
                              onChange={handleChange}
                              placeholder={field.placeholder}
                              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-14 rounded-lg resize-y min-h-[120px] max-h-[400px] text-sm sm:text-base border transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm ${
                                dark
                                  ? "bg-white/5 border-white/20 text-white/95 focus:border-white/50 focus:ring-white/15 placeholder-white/50 hover:bg-white/8"
                                  : "bg-black/5 border-black/20 text-black/95 focus:border-black/50 focus:ring-black/15 placeholder-black/50 hover:bg-black/8"
                              }`}
                              required={field.required}
                            />
                          ) : (
                            <input
                              type="text"
                              name={field.name}
                              maxLength={field.maxLength}
                              value={formData[field.name]}
                              onChange={handleChange}
                              placeholder={field.placeholder}
                              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base border transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm ${
                                dark
                                  ? "bg-white/5 border-white/20 text-white/95 focus:border-white/50 focus:ring-white/15 placeholder-white/50 hover:bg-white/8"
                                  : "bg-black/5 border-black/20 text-black/95 focus:border-black/50 focus:ring-black/15 placeholder-black/50 hover:bg-black/8"
                              }`}
                              required={field.required}
                            />
                          )}

                          {/* Enhanced AI button for textarea fields */}
                          {field.textarea && (
                            <button
                              type="button"
                              onClick={() => handleAIEnhance(field.name, formData[field.name])}
                              disabled={!formData[field.name]?.trim() || enhancing}
                              className={`absolute top-2 right-2 sm:top-3 sm:right-3 p-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group backdrop-blur-sm border ${
                                dark
                                  ? "bg-gradient-to-br from-violet-500/20 via-purple-500/15 to-indigo-500/20 border-violet-500/30 text-white hover:from-violet-500/30 hover:via-purple-500/25 hover:to-indigo-500/30"
                                  : "bg-gradient-to-br from-violet-500/20 via-purple-500/15 to-indigo-500/20 border-violet-500/30 text-black hover:from-violet-500/30 hover:via-purple-500/25 hover:to-indigo-500/30"
                              }`}
                              title="Enhance content with AI"
                            >
                              {enhancing && enhanceField === field.name ? (
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
                          )}
                        </div>

                        {/* Character count */}
                        <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1">
                          {field.maxLength && (
                            <span className={`text-xs xs:ml-auto ${
                              formData[field.name]?.length >= field.maxLength * 0.9
                                ? "text-orange-500"
                                : formData[field.name]?.length >= field.maxLength
                                ? "text-red-500"
                                : dark ? "text-white/60" : "text-black/60"
                            }`}>
                              {formData[field.name]?.length || 0}/{field.maxLength}
                            </span>
                          )}
                          {enhancing && enhanceField === field.name && (
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
                        </div>

                        {/* Enhanced AI sample display */}
                        {sampleEnhanced && enhanceField === field.name && (
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
                                    setFormData(prev => ({
                                      ...prev,
                                      [field.name]: sampleEnhanced
                                    }));
                                    setSampleEnhanced("");
                                    setEnhanceField("");
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
                                  onClick={() => {
                                    setSampleEnhanced("");
                                    setEnhanceField("");
                                  }}
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
                              {sampleEnhanced}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced submit button with perfect mobile optimization */}
            <div className="flex justify-stretch sm:justify-end pt-2 sm:pt-4">
              <button
                type="submit"
                disabled={!isFormValid() || loading}
                className={`w-full sm:w-auto px-6 md:px-8 py-3 md:py-3.5 font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 backdrop-blur-sm border ${
                  dark
                    ? "bg-gradient-to-r from-white/15 via-white/25 to-white/15 border-white/30 text-white hover:from-white/25 hover:via-white/35 hover:to-white/25 shadow-lg hover:shadow-xl"
                    : "bg-gradient-to-r from-black/15 via-black/25 to-black/15 border-black/30 text-black hover:from-black/25 hover:via-black/35 hover:to-black/25 shadow-lg hover:shadow-xl"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className={`w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin`} />
                    <span className="text-sm sm:text-base">Submitting...</span>
                  </div>
                ) : (
                  <span className="text-sm sm:text-base">Submit Investment Pitch</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PitchForm;
