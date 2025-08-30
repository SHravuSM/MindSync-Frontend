// import React, { useState, useEffect } from "react";
// import api from "../utils/api1";
// import useThemeStore from "../store/themeStore";

// const PitchForm = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({
//     // Basic Info
//     startupName: "",
//     oneLiner: "",
//     problem: "",
//     solution: "",

//     // Market & Customer
//     targetMarket: "",
//     customerSegments: [{ segmentName: "", size: 0, painPoints: "" }],
//     market: {
//       totalMarketSize: 0,
//       serviceableMarketSize: 0,
//       targetMarketSize: 0,
//       growthRatePercent: 0,
//     },
//     competition: "",
//     competitors: [{ name: "", website: "", strength: "", weakness: "" }],

//     // Business Model
//     businessModel: "",
//     traction: "",
//     productMetrics: {
//       monthlyActiveUsers: 0,
//       downloads: 0,
//       repeatCustomerRatePercent: 0,
//       keyAchievements: [""],
//     },
//     goToMarketStrategy: "",

//     // Team
//     founderName: "",
//     founderEmail: "",
//     teamMembers: [{ name: "", role: "", experienceYears: 0, linkedIn: "" }],

//     // Financials
//     financials: {
//       revenueLastYear: 0,
//       revenueThisYear: 0,
//       netProfit: 0,
//       grossMarginPercent: 0,
//       customerAcquisitionCost: 0,
//       lifetimeValue: 0,
//       valuation: 0,
//     },

//     // Funding
//     fundingDetails: {
//       fundingAskAmount: 0,
//       equityOfferedPercent: 0,
//       previousFundingRaised: 0,
//     },
//     valuationHistory: [],

//     // Milestones
//     milestones: [
//       { title: "", description: "", targetDate: "", status: "pending" },
//     ],

//     // Legal
//     legal: {
//       patents: [""],
//       trademarks: [""],
//       licenses: [""],
//     },

//     // Exit Strategy
//     exitStrategy: "",

//     // Media
//     media: [],
//   });

//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [draftSaved, setDraftSaved] = useState(false);
//   const [enhancing, setEnhancing] = useState(false);
//   const [enhanceField, setEnhanceField] = useState("");
//   const [sampleEnhanced, setSampleEnhanced] = useState("");
//   const dark = useThemeStore((s) => s.dark);

//   const formSteps = [
//     {
//       id: 1,
//       title: "Foundation",
//       subtitle: "Company basics",
//     },
//     {
//       id: 2,
//       title: "Market",
//       subtitle: "Analysis & competition",
//     },
//     {
//       id: 3,
//       title: "Business",
//       subtitle: "Model & strategy",
//     },
//     {
//       id: 4,
//       title: "Team",
//       subtitle: "Leadership & traction",
//     },
//     {
//       id: 5,
//       title: "Financials",
//       subtitle: "Revenue & metrics",
//     },
//     {
//       id: 6,
//       title: "Investment",
//       subtitle: "Funding needs",
//     },
//     {
//       id: 7,
//       title: "Strategy",
//       subtitle: "Roadmap & legal",
//     },
//     {
//       id: 8,
//       title: "Review",
//       subtitle: "Final submission",
//     },
//   ];

//   // Auto-save functionality
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const draftData = {
//         ...formData,
//         currentStep,
//         lastSaved: new Date().toISOString(),
//         completionPercentage: calculateCompletionPercentage(),
//       };

//       const hasContent =
//         JSON.stringify(formData) !== JSON.stringify(getInitialFormData());
//       if (hasContent) {
//         localStorage.setItem("advancedPitchDraft", JSON.stringify(draftData));
//         setDraftSaved(true);
//         setTimeout(() => setDraftSaved(false), 2500);
//       }
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [formData, currentStep]);

//   // Load draft on component mount
//   useEffect(() => {
//     const savedDraft = localStorage.getItem("advancedPitchDraft");
//     if (savedDraft) {
//       try {
//         const parsedDraft = JSON.parse(savedDraft);
//         setFormData(parsedDraft);
//         setCurrentStep(parsedDraft.currentStep || 1);
//       } catch (error) {
//         console.error("Error parsing saved pitch draft:", error);
//         localStorage.removeItem("advancedPitchDraft");
//       }
//     }
//   }, []);

//   const getInitialFormData = () => ({
//     startupName: "",
//     oneLiner: "",
//     problem: "",
//     solution: "",
//     targetMarket: "",
//     customerSegments: [{ segmentName: "", size: 0, painPoints: "" }],
//     market: {
//       totalMarketSize: 0,
//       serviceableMarketSize: 0,
//       targetMarketSize: 0,
//       growthRatePercent: 0,
//     },
//     competition: "",
//     competitors: [{ name: "", website: "", strength: "", weakness: "" }],
//     businessModel: "",
//     traction: "",
//     productMetrics: {
//       monthlyActiveUsers: 0,
//       downloads: 0,
//       repeatCustomerRatePercent: 0,
//       keyAchievements: [""],
//     },
//     goToMarketStrategy: "",
//     founderName: "",
//     founderEmail: "",
//     teamMembers: [{ name: "", role: "", experienceYears: 0, linkedIn: "" }],
//     financials: {
//       revenueLastYear: 0,
//       revenueThisYear: 0,
//       netProfit: 0,
//       grossMarginPercent: 0,
//       customerAcquisitionCost: 0,
//       lifetimeValue: 0,
//       valuation: 0,
//     },
//     fundingDetails: {
//       fundingAskAmount: 0,
//       equityOfferedPercent: 0,
//       previousFundingRaised: 0,
//     },
//     valuationHistory: [],
//     milestones: [
//       { title: "", description: "", targetDate: "", status: "pending" },
//     ],
//     legal: {
//       patents: [""],
//       trademarks: [""],
//       licenses: [""],
//     },
//     exitStrategy: "",
//     media: [],
//   });

//   const calculateCompletionPercentage = () => {
//     const totalFields = 35;
//     let completedFields = 0;

//     if (formData.startupName) completedFields++;
//     if (formData.oneLiner) completedFields++;
//     if (formData.problem) completedFields++;
//     if (formData.solution) completedFields++;
//     if (formData.targetMarket) completedFields++;
//     if (formData.businessModel) completedFields++;
//     if (formData.traction) completedFields++;
//     if (formData.goToMarketStrategy) completedFields++;
//     if (formData.competition) completedFields++;
//     if (formData.founderName) completedFields++;
//     if (formData.founderEmail) completedFields++;
//     if (formData.exitStrategy) completedFields++;

//     if (formData.market.totalMarketSize > 0) completedFields++;
//     if (formData.market.serviceableMarketSize > 0) completedFields++;
//     if (formData.market.targetMarketSize > 0) completedFields++;
//     if (formData.market.growthRatePercent > 0) completedFields++;

//     Object.values(formData.financials).forEach((value) => {
//       if (typeof value === "number" && value > 0) completedFields++;
//     });

//     Object.values(formData.fundingDetails).forEach((value) => {
//       if (typeof value === "number" && value > 0) completedFields++;
//     });

//     return Math.round((completedFields / totalFields) * 100);
//   };

//   const handleChange = (field, value, index = null, subField = null) => {
//     setFormData((prev) => {
//       if (index !== null && subField) {
//         const newArray = [...prev[field]];
//         newArray[index] = { ...newArray[index], [subField]: value };
//         return { ...prev, [field]: newArray };
//       } else if (index !== null) {
//         const newArray = [...prev[field]];
//         newArray[index] = value;
//         return { ...prev, [field]: newArray };
//       } else if (subField) {
//         return { ...prev, [field]: { ...prev[field], [subField]: value } };
//       } else {
//         return { ...prev, [field]: value };
//       }
//     });
//     if (error) setError("");
//   };

//   const addArrayItem = (fieldName, template) => {
//     setFormData((prev) => ({
//       ...prev,
//       [fieldName]: [...prev[fieldName], template],
//     }));
//   };

//   const removeArrayItem = (fieldName, index) => {
//     setFormData((prev) => ({
//       ...prev,
//       [fieldName]: prev[fieldName].filter((_, i) => i !== index),
//     }));
//   };

//   const handleAIEnhance = async (fieldName, content) => {
//     if (!content.trim()) {
//       setError("Please enter some content to enhance");
//       return;
//     }

//     setEnhancing(true);
//     setEnhanceField(fieldName);

//     try {
//       const res = await api.post("/user/ask", {
//         content: `
//           You are an expert investment pitch writer.  
//           Your job is to take the following text and:
//           1. Improve clarity, grammar, and flow for investor presentations.
//           2. Make it compelling and professionally persuasive.
//           3. Expand with relevant details that investors want to see.
//           4. Keep the tone confident yet realistic.
//           5. Return ONLY the improved version (no extra formatting or labels).
          
//           Context: This is for field "${fieldName}" in an investment pitch.
          
//           Here is the text to improve:
//           ---
//           ${content}
//           ---
//         `,
//       });
//       const enhancedContent = res.data.data.choices[0].message.content.trim();
//       setSampleEnhanced(enhancedContent);
//       setError("");
//     } catch (error) {
//       console.error("AI Enhancement error:", error);
//       setError("Failed to enhance content. Please try again.");
//     } finally {
//       setEnhancing(false);
//       setEnhanceField("");
//     }
//   };

//   const validateStep = (step) => {
//     switch (step) {
//       case 1:
//         return (
//           formData.startupName &&
//           formData.oneLiner &&
//           formData.problem &&
//           formData.solution
//         );
//       case 2:
//         return (
//           formData.targetMarket &&
//           formData.competition &&
//           formData.competitors.some((c) => c.name)
//         );
//       case 3:
//         return formData.businessModel && formData.goToMarketStrategy;
//       case 4:
//         return (
//           formData.founderName && formData.founderEmail && formData.traction
//         );
//       case 5:
//         return formData.financials.revenueThisYear >= 0;
//       case 6:
//         return (
//           formData.fundingDetails.fundingAskAmount > 0 &&
//           formData.fundingDetails.equityOfferedPercent > 0
//         );
//       case 7:
//         return formData.exitStrategy;
//       case 8:
//         return true;
//       default:
//         return true;
//     }
//   };

//   const nextStep = () => {
//     if (validateStep(currentStep)) {
//       setCurrentStep((prev) => Math.min(prev + 1, formSteps.length));
//       setError("");
//     } else {
//       setError("Please complete all required fields before proceeding.");
//     }
//   };

//   const prevStep = () => {
//     setCurrentStep((prev) => Math.max(prev - 1, 1));
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const submissionData = {
//       startupName: formData.startupName,
//       oneLiner: formData.oneLiner,
//       problem: formData.problem,
//       solution: formData.solution,
//       targetMarket: formData.targetMarket,
//       customerSegments: formData.customerSegments.filter(
//         (cs) => cs.segmentName
//       ),
//       market: formData.market,
//       competition: formData.competition,
//       competitors: formData.competitors.filter((c) => c.name),
//       businessModel: formData.businessModel,
//       traction: formData.traction,
//       productMetrics: formData.productMetrics,
//       goToMarketStrategy: formData.goToMarketStrategy,
//       founderName: formData.founderName,
//       founderEmail: formData.founderEmail,
//       teamMembers: formData.teamMembers.filter((tm) => tm.name),
//       financials: formData.financials,
//       fundingDetails: formData.fundingDetails,
//       valuationHistory: formData.valuationHistory,
//       milestones: formData.milestones.filter((m) => m.title),
//       legal: {
//         patents: formData.legal.patents.filter((p) => p),
//         trademarks: formData.legal.trademarks.filter((t) => t),
//         licenses: formData.legal.licenses.filter((l) => l),
//       },
//       exitStrategy: formData.exitStrategy,
//       media: formData.media,
//     };

//     setLoading(true);
//     setError("");

//     try {
//       const res = await api.post("/user/posts/submitpitch", submissionData);
//       setMessage(res.data.message);
//       setSuccess(true);
//       localStorage.removeItem("advancedPitchDraft");
//     } catch (error) {
//       setError(
//         error.response?.data?.message ||
//           "Failed to submit pitch. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClearDraft = () => {
//     setFormData(getInitialFormData());
//     setCurrentStep(1);
//     setSuccess(false);
//     setMessage("");
//     setError("");
//     setSampleEnhanced("");
//     localStorage.removeItem("advancedPitchDraft");
//   };

//   // Success screen
//   if (success) {
//     return (
//       <div
//         className={`min-h-screen flex items-center justify-center p-6 ${
//           dark ? "bg-gray-900" : "bg-gray-50"
//         }`}
//       >
//         <div className="w-full max-w-md text-center">
//           <div
//             className={`p-8 rounded-lg ${
//               dark
//                 ? "bg-gray-800 border border-gray-700"
//                 : "bg-white border border-gray-200"
//             }`}
//           >
//             <div className="w-16 h-16 mx-auto mb-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
//               <div className="w-8 h-8 text-green-600 text-2xl">✓</div>
//             </div>
//             <h3
//               className={`text-xl font-semibold mb-3 ${
//                 dark ? "text-white" : "text-gray-900"
//               }`}
//             >
//               Pitch Submitted Successfully
//             </h3>
//             <p
//               className={`text-sm mb-8 ${
//                 dark ? "text-gray-400" : "text-gray-600"
//               }`}
//             >
//               {message}
//             </p>
//             <button
//               onClick={handleClearDraft}
//               className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
//             >
//               Create New Pitch
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Common styles
//   const inputClasses = `w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
//     dark
//       ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
//       : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
//   }`;

//   const textareaClasses = `w-full px-4 py-3 rounded-lg border resize-none transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
//     dark
//       ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
//       : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
//   }`;

//   const labelClasses = `block text-sm font-medium mb-2 ${
//     dark ? "text-gray-200" : "text-gray-700"
//   }`;

//   const selectClasses = `w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
//     dark
//       ? "bg-gray-800 border-gray-600 text-white"
//       : "bg-white border-gray-300 text-gray-900"
//   }`;

//   // AI Enhancement Button
//   const AIEnhanceButton = ({ fieldName, content }) => (
//     <button
//       type="button"
//       onClick={() => handleAIEnhance(fieldName, content)}
//       disabled={!content.trim() || enhancing}
//       className={`px-3 py-2 text-sm rounded-md transition-colors ${
//         dark
//           ? "text-gray-400 hover:text-blue-400 hover:bg-gray-700"
//           : "text-gray-500 hover:text-blue-500 hover:bg-gray-100"
//       } disabled:opacity-50`}
//       title="Enhance with AI"
//     >
//       {enhancing && enhanceField === fieldName ? "Enhancing..." : "Enhance"}
//     </button>
//   );

//   // Enhanced Preview
//   const EnhancedPreview = ({ field, content }) => {
//     if (!sampleEnhanced || enhanceField !== field) return null;

//     return (
//       <div
//         className={`mt-4 p-4 rounded-lg border ${
//           dark ? "border-gray-600 bg-gray-700/50" : "border-gray-200 bg-gray-50"
//         }`}
//       >
//         <div className="flex items-center justify-between mb-3">
//           <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
//             AI Enhanced Version
//           </span>
//           <div className="flex gap-2">
//             <button
//               type="button"
//               onClick={() => {
//                 handleChange(field, sampleEnhanced);
//                 setSampleEnhanced("");
//                 setEnhanceField("");
//               }}
//               className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//             >
//               Apply
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 setSampleEnhanced("");
//                 setEnhanceField("");
//               }}
//               className="px-3 py-1 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
//             >
//               Dismiss
//             </button>
//           </div>
//         </div>
//         <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
//           {sampleEnhanced}
//         </p>
//       </div>
//     );
//   };

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="space-y-6">
//             <div>
//               <label className={labelClasses}>
//                 Company Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={formData.startupName}
//                 onChange={(e) => handleChange("startupName", e.target.value)}
//                 placeholder="Enter your company name"
//                 maxLength={100}
//                 className={inputClasses}
//               />
//             </div>

//             <div>
//               <label className={labelClasses}>
//                 Value Proposition <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={formData.oneLiner}
//                 onChange={(e) => handleChange("oneLiner", e.target.value)}
//                 placeholder="Describe your company's core value proposition in one line"
//                 maxLength={200}
//                 className={inputClasses}
//               />
//               <div className="text-xs text-gray-500 mt-2">
//                 {formData.oneLiner.length}/200 characters
//               </div>
//             </div>

//             <div>
//               <div className="flex items-center justify-between">
//                 <label className={labelClasses}>
//                   Problem Statement <span className="text-red-500">*</span>
//                 </label>
//                 <AIEnhanceButton
//                   fieldName="problem"
//                   content={formData.problem}
//                 />
//               </div>
//               <textarea
//                 value={formData.problem}
//                 onChange={(e) => handleChange("problem", e.target.value)}
//                 placeholder="Define the significant problem or market inefficiency your company addresses"
//                 rows={5}
//                 className={textareaClasses}
//               />
//               <EnhancedPreview field="problem" content={formData.problem} />
//             </div>

//             <div>
//               <div className="flex items-center justify-between">
//                 <label className={labelClasses}>
//                   Solution Overview <span className="text-red-500">*</span>
//                 </label>
//                 <AIEnhanceButton
//                   fieldName="solution"
//                   content={formData.solution}
//                 />
//               </div>
//               <textarea
//                 value={formData.solution}
//                 onChange={(e) => handleChange("solution", e.target.value)}
//                 placeholder="Explain how your innovation provides a superior solution"
//                 rows={5}
//                 className={textareaClasses}
//               />
//               <EnhancedPreview field="solution" content={formData.solution} />
//             </div>
//           </div>
//         );

//       case 2:
//         return (
//           <div className="space-y-6">
//             <div>
//               <label className={labelClasses}>
//                 Target Market <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 value={formData.targetMarket}
//                 onChange={(e) => handleChange("targetMarket", e.target.value)}
//                 placeholder="Define your addressable market and customer segments"
//                 rows={4}
//                 className={textareaClasses}
//               />
//             </div>

//             <div>
//               <h4
//                 className={`text-lg font-medium mb-4 ${
//                   dark ? "text-white" : "text-gray-900"
//                 }`}
//               >
//                 Market Size
//               </h4>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className={labelClasses}>
//                     Total Addressable Market (TAM)
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       value={
//                         formData.market.totalMarketSize === 0
//                           ? ""
//                           : formData.market.totalMarketSize
//                       }
//                       onChange={(e) =>
//                         handleChange(
//                           "market",
//                           parseFloat(e.target.value) || 0,
//                           null,
//                           "totalMarketSize"
//                         )
//                       }
//                       placeholder="0"
//                       className={inputClasses}
//                     />
//                     <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
//                       M $
//                     </span>
//                   </div>
//                 </div>
//                 <div>
//                   <label className={labelClasses}>
//                     Serviceable Available Market (SAM)
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       value={
//                         formData.market.serviceableMarketSize === 0
//                           ? ""
//                           : formData.market.serviceableMarketSize
//                       }
//                       onChange={(e) =>
//                         handleChange(
//                           "market",
//                           parseFloat(e.target.value) || 0,
//                           null,
//                           "serviceableMarketSize"
//                         )
//                       }
//                       placeholder="0"
//                       className={inputClasses}
//                     />
//                     <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
//                       M $
//                     </span>
//                   </div>
//                 </div>
//                 <div>
//                   <label className={labelClasses}>
//                     Serviceable Obtainable Market (SOM)
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       value={
//                         formData.market.targetMarketSize === 0
//                           ? ""
//                           : formData.market.targetMarketSize
//                       }
//                       onChange={(e) =>
//                         handleChange(
//                           "market",
//                           parseFloat(e.target.value) || 0,
//                           null,
//                           "targetMarketSize"
//                         )
//                       }
//                       placeholder="0"
//                       className={inputClasses}
//                     />
//                     <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
//                       M $
//                     </span>
//                   </div>
//                 </div>
//                 <div>
//                   <label className={labelClasses}>Market Growth Rate</label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       value={
//                         formData.market.growthRatePercent === 0
//                           ? ""
//                           : formData.market.growthRatePercent
//                       }
//                       onChange={(e) =>
//                         handleChange(
//                           "market",
//                           parseFloat(e.target.value) || 0,
//                           null,
//                           "growthRatePercent"
//                         )
//                       }
//                       placeholder="0"
//                       className={inputClasses}
//                     />
//                     <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
//                       %
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className={labelClasses}>Customer Segments</label>
//               <div className="space-y-4">
//                 {formData.customerSegments.map((segment, index) => (
//                   <div
//                     key={index}
//                     className={`p-4 rounded-lg border ${
//                       dark
//                         ? "border-gray-600 bg-gray-800/30"
//                         : "border-gray-200 bg-gray-50/30"
//                     } relative`}
//                   >
//                     {formData.customerSegments.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() =>
//                           removeArrayItem("customerSegments", index)
//                         }
//                         className="absolute top-2 right-2 w-6 h-6 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-sm flex items-center justify-center"
//                       >
//                         ×
//                       </button>
//                     )}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
//                       <input
//                         type="text"
//                         value={segment.segmentName}
//                         onChange={(e) =>
//                           handleChange(
//                             "customerSegments",
//                             e.target.value,
//                             index,
//                             "segmentName"
//                           )
//                         }
//                         placeholder="Segment name"
//                         className={inputClasses}
//                       />
//                       <input
//                         type="number"
//                         value={segment.size === 0 ? "" : segment.size}
//                         onChange={(e) =>
//                           handleChange(
//                             "customerSegments",
//                             parseInt(e.target.value) || 0,
//                             index,
//                             "size"
//                           )
//                         }
//                         placeholder="Segment size"
//                         className={inputClasses}
//                       />
//                     </div>
//                     <textarea
//                       value={segment.painPoints}
//                       onChange={(e) =>
//                         handleChange(
//                           "customerSegments",
//                           e.target.value,
//                           index,
//                           "painPoints"
//                         )
//                       }
//                       placeholder="Key pain points for this segment"
//                       rows={3}
//                       className={textareaClasses}
//                     />
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() =>
//                     addArrayItem("customerSegments", {
//                       segmentName: "",
//                       size: 0,
//                       painPoints: "",
//                     })
//                   }
//                   className={`w-full py-3 border-2 border-dashed rounded-lg transition-colors text-sm ${
//                     dark
//                       ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
//                       : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
//                   }`}
//                 >
//                   Add Customer Segment
//                 </button>
//               </div>
//             </div>

//             <div>
//               <label className={labelClasses}>
//                 Competition Overview <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 value={formData.competition}
//                 onChange={(e) => handleChange("competition", e.target.value)}
//                 placeholder="Describe the competitive landscape"
//                 rows={4}
//                 className={textareaClasses}
//               />
//             </div>

//             <div>
//               <label className={labelClasses}>Key Competitors</label>
//               <div className="space-y-4">
//                 {formData.competitors.map((competitor, index) => (
//                   <div
//                     key={index}
//                     className={`p-4 rounded-lg border ${
//                       dark
//                         ? "border-gray-600 bg-gray-800/30"
//                         : "border-gray-200 bg-gray-50/30"
//                     } relative`}
//                   >
//                     {formData.competitors.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeArrayItem("competitors", index)}
//                         className="absolute top-2 right-2 w-6 h-6 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-sm flex items-center justify-center"
//                       >
//                         ×
//                       </button>
//                     )}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
//                       <input
//                         type="text"
//                         value={competitor.name}
//                         onChange={(e) =>
//                           handleChange(
//                             "competitors",
//                             e.target.value,
//                             index,
//                             "name"
//                           )
//                         }
//                         placeholder="Competitor name"
//                         className={inputClasses}
//                       />
//                       <input
//                         type="url"
//                         value={competitor.website}
//                         onChange={(e) =>
//                           handleChange(
//                             "competitors",
//                             e.target.value,
//                             index,
//                             "website"
//                           )
//                         }
//                         placeholder="Website URL"
//                         className={inputClasses}
//                       />
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <textarea
//                         value={competitor.strength}
//                         onChange={(e) =>
//                           handleChange(
//                             "competitors",
//                             e.target.value,
//                             index,
//                             "strength"
//                           )
//                         }
//                         placeholder="Their strengths"
//                         rows={3}
//                         className={textareaClasses}
//                       />
//                       <textarea
//                         value={competitor.weakness}
//                         onChange={(e) =>
//                           handleChange(
//                             "competitors",
//                             e.target.value,
//                             index,
//                             "weakness"
//                           )
//                         }
//                         placeholder="Their weaknesses"
//                         rows={3}
//                         className={textareaClasses}
//                       />
//                     </div>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() =>
//                     addArrayItem("competitors", {
//                       name: "",
//                       website: "",
//                       strength: "",
//                       weakness: "",
//                     })
//                   }
//                   className={`w-full py-3 border-2 border-dashed rounded-lg transition-colors text-sm ${
//                     dark
//                       ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
//                       : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
//                   }`}
//                 >
//                   Add Competitor
//                 </button>
//               </div>
//             </div>
//           </div>
//         );

//       case 3:
//         return (
//           <div className="space-y-6">
//             <div>
//               <label className={labelClasses}>
//                 Business Model <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 value={formData.businessModel}
//                 onChange={(e) => handleChange("businessModel", e.target.value)}
//                 placeholder="Describe your revenue model and monetization strategy"
//                 rows={4}
//                 className={textareaClasses}
//               />
//             </div>

//             <div>
//               <label className={labelClasses}>
//                 Go-to-Market Strategy <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 value={formData.goToMarketStrategy}
//                 onChange={(e) =>
//                   handleChange("goToMarketStrategy", e.target.value)
//                 }
//                 placeholder="Detail your customer acquisition and market penetration approach"
//                 rows={4}
//                 className={textareaClasses}
//               />
//             </div>

//             <div>
//               <h4
//                 className={`text-lg font-medium mb-4 ${
//                   dark ? "text-white" : "text-gray-900"
//                 }`}
//               >
//                 Product Metrics
//               </h4>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className={labelClasses}>Monthly Active Users</label>
//                   <input
//                     type="number"
//                     value={
//                       formData.productMetrics.monthlyActiveUsers === 0
//                         ? ""
//                         : formData.productMetrics.monthlyActiveUsers
//                     }
//                     onChange={(e) =>
//                       handleChange(
//                         "productMetrics",
//                         parseInt(e.target.value) || 0,
//                         null,
//                         "monthlyActiveUsers"
//                       )
//                     }
//                     placeholder="0"
//                     className={inputClasses}
//                   />
//                 </div>
//                 <div>
//                   <label className={labelClasses}>Total Downloads</label>
//                   <input
//                     type="number"
//                     value={
//                       formData.productMetrics.downloads === 0
//                         ? ""
//                         : formData.productMetrics.downloads
//                     }
//                     onChange={(e) =>
//                       handleChange(
//                         "productMetrics",
//                         parseInt(e.target.value) || 0,
//                         null,
//                         "downloads"
//                       )
//                     }
//                     placeholder="0"
//                     className={inputClasses}
//                   />
//                 </div>
//                 <div>
//                   <label className={labelClasses}>Repeat Customer Rate</label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       value={
//                         formData.productMetrics.repeatCustomerRatePercent === 0
//                           ? ""
//                           : formData.productMetrics.repeatCustomerRatePercent
//                       }
//                       onChange={(e) =>
//                         handleChange(
//                           "productMetrics",
//                           parseFloat(e.target.value) || 0,
//                           null,
//                           "repeatCustomerRatePercent"
//                         )
//                       }
//                       placeholder="0"
//                       className={inputClasses}
//                     />
//                     <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
//                       %
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className={labelClasses}>Key Achievements</label>
//               <div className="space-y-3">
//                 {formData.productMetrics.keyAchievements.map(
//                   (achievement, index) => (
//                     <div key={index} className="flex gap-3">
//                       <input
//                         type="text"
//                         value={achievement}
//                         onChange={(e) =>
//                           handleChange(
//                             "productMetrics",
//                             e.target.value,
//                             index,
//                             "keyAchievements"
//                           )
//                         }
//                         placeholder="Describe a key achievement"
//                         className={inputClasses}
//                       />
//                       {formData.productMetrics.keyAchievements.length > 1 && (
//                         <button
//                           type="button"
//                           onClick={() => {
//                             const newAchievements =
//                               formData.productMetrics.keyAchievements.filter(
//                                 (_, i) => i !== index
//                               );
//                             handleChange(
//                               "productMetrics",
//                               newAchievements,
//                               null,
//                               "keyAchievements"
//                             );
//                           }}
//                           className="w-10 h-10 rounded bg-red-100 dark:bg-red-900/20 text-red-600 hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center text-sm"
//                         >
//                           ×
//                         </button>
//                       )}
//                     </div>
//                   )
//                 )}
//                 <button
//                   type="button"
//                   onClick={() => {
//                     const newAchievements = [
//                       ...formData.productMetrics.keyAchievements,
//                       "",
//                     ];
//                     handleChange(
//                       "productMetrics",
//                       newAchievements,
//                       null,
//                       "keyAchievements"
//                     );
//                   }}
//                   className={`w-full py-3 border-2 border-dashed rounded-lg transition-colors text-sm ${
//                     dark
//                       ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
//                       : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
//                   }`}
//                 >
//                   Add Achievement
//                 </button>
//               </div>
//             </div>
//           </div>
//         );

//       case 4:
//         return (
//           <div className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className={labelClasses}>
//                   Founder Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.founderName}
//                   onChange={(e) => handleChange("founderName", e.target.value)}
//                   placeholder="Your full name"
//                   className={inputClasses}
//                 />
//               </div>
//               <div>
//                 <label className={labelClasses}>
//                   Founder Email <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   value={formData.founderEmail}
//                   onChange={(e) => handleChange("founderEmail", e.target.value)}
//                   placeholder="your.email@company.com"
//                   className={inputClasses}
//                 />
//               </div>
//             </div>

//             <div>
//               <label className={labelClasses}>Team Members</label>
//               <div className="space-y-4">
//                 {formData.teamMembers.map((member, index) => (
//                   <div
//                     key={index}
//                     className={`p-4 rounded-lg border ${
//                       dark
//                         ? "border-gray-600 bg-gray-800/30"
//                         : "border-gray-200 bg-gray-50/30"
//                     } relative`}
//                   >
//                     {formData.teamMembers.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeArrayItem("teamMembers", index)}
//                         className="absolute top-2 right-2 w-6 h-6 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-sm flex items-center justify-center"
//                       >
//                         ×
//                       </button>
//                     )}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
//                       <input
//                         type="text"
//                         value={member.name}
//                         onChange={(e) =>
//                           handleChange(
//                             "teamMembers",
//                             e.target.value,
//                             index,
//                             "name"
//                           )
//                         }
//                         placeholder="Full name"
//                         className={inputClasses}
//                       />
//                       <input
//                         type="text"
//                         value={member.role}
//                         onChange={(e) =>
//                           handleChange(
//                             "teamMembers",
//                             e.target.value,
//                             index,
//                             "role"
//                           )
//                         }
//                         placeholder="Role/Position"
//                         className={inputClasses}
//                       />
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <input
//                         type="number"
//                         value={
//                           member.experienceYears === 0
//                             ? ""
//                             : member.experienceYears
//                         }
//                         onChange={(e) =>
//                           handleChange(
//                             "teamMembers",
//                             parseInt(e.target.value) || 0,
//                             index,
//                             "experienceYears"
//                           )
//                         }
//                         placeholder="Years of experience"
//                         className={inputClasses}
//                       />
//                       <input
//                         type="url"
//                         value={member.linkedIn}
//                         onChange={(e) =>
//                           handleChange(
//                             "teamMembers",
//                             e.target.value,
//                             index,
//                             "linkedIn"
//                           )
//                         }
//                         placeholder="LinkedIn profile URL"
//                         className={inputClasses}
//                       />
//                     </div>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() =>
//                     addArrayItem("teamMembers", {
//                       name: "",
//                       role: "",
//                       experienceYears: 0,
//                       linkedIn: "",
//                     })
//                   }
//                   className={`w-full py-3 border-2 border-dashed rounded-lg transition-colors text-sm ${
//                     dark
//                       ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
//                       : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
//                   }`}
//                 >
//                   Add Team Member
//                 </button>
//               </div>
//             </div>

//             <div>
//               <label className={labelClasses}>
//                 Current Traction <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 value={formData.traction}
//                 onChange={(e) => handleChange("traction", e.target.value)}
//                 placeholder="Present key metrics, milestones, and validation achieved"
//                 rows={5}
//                 className={textareaClasses}
//               />
//             </div>
//           </div>
//         );

//       case 5:
//         return (
//           <div className="space-y-6">
//             <h3
//               className={`text-lg font-medium ${
//                 dark ? "text-white" : "text-gray-900"
//               }`}
//             >
//               Financial Metrics
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               <div>
//                 <label className={labelClasses}>Revenue Last Year</label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
//                     $
//                   </span>
//                   <input
//                     type="number"
//                     value={
//                       formData.financials.revenueLastYear === 0
//                         ? ""
//                         : formData.financials.revenueLastYear
//                     }
//                     onChange={(e) =>
//                       handleChange(
//                         "financials",
//                         parseFloat(e.target.value) || 0,
//                         null,
//                         "revenueLastYear"
//                       )
//                     }
//                     placeholder="0"
//                     className={`${inputClasses} pl-8`}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className={labelClasses}>Revenue This Year</label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
//                     $
//                   </span>
//                   <input
//                     type="number"
//                     value={
//                       formData.financials.revenueThisYear === 0
//                         ? ""
//                         : formData.financials.revenueThisYear
//                     }
//                     onChange={(e) =>
//                       handleChange(
//                         "financials",
//                         parseFloat(e.target.value) || 0,
//                         null,
//                         "revenueThisYear"
//                       )
//                     }
//                     placeholder="0"
//                     className={`${inputClasses} pl-8`}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className={labelClasses}>Net Profit</label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
//                     $
//                   </span>
//                   <input
//                     type="number"
//                     value={
//                       formData.financials.netProfit === 0
//                         ? ""
//                         : formData.financials.netProfit
//                     }
//                     onChange={(e) =>
//                       handleChange(
//                         "financials",
//                         parseFloat(e.target.value) || 0,
//                         null,
//                         "netProfit"
//                       )
//                     }
//                     placeholder="0"
//                     className={`${inputClasses} pl-8`}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className={labelClasses}>Gross Margin</label>
//                 <div className="relative">
//                   <input
//                     type="number"
//                     min="0"
//                     max="100"
//                     value={
//                       formData.financials.grossMarginPercent === 0
//                         ? ""
//                         : formData.financials.grossMarginPercent
//                     }
//                     onChange={(e) =>
//                       handleChange(
//                         "financials",
//                         parseFloat(e.target.value) || 0,
//                         null,
//                         "grossMarginPercent"
//                       )
//                     }
//                     placeholder="0"
//                     className={inputClasses}
//                   />
//                   <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
//                     %
//                   </span>
//                 </div>
//               </div>

//               <div>
//                 <label className={labelClasses}>
//                   Customer Acquisition Cost
//                 </label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
//                     $
//                   </span>
//                   <input
//                     type="number"
//                     value={
//                       formData.financials.customerAcquisitionCost === 0
//                         ? ""
//                         : formData.financials.customerAcquisitionCost
//                     }
//                     onChange={(e) =>
//                       handleChange(
//                         "financials",
//                         parseFloat(e.target.value) || 0,
//                         null,
//                         "customerAcquisitionCost"
//                       )
//                     }
//                     placeholder="0"
//                     className={`${inputClasses} pl-8`}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className={labelClasses}>Lifetime Value</label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
//                     $
//                   </span>
//                   <input
//                     type="number"
//                     value={
//                       formData.financials.lifetimeValue === 0
//                         ? ""
//                         : formData.financials.lifetimeValue
//                     }
//                     onChange={(e) =>
//                       handleChange(
//                         "financials",
//                         parseFloat(e.target.value) || 0,
//                         null,
//                         "lifetimeValue"
//                       )
//                     }
//                     placeholder="0"
//                     className={`${inputClasses} pl-8`}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className={labelClasses}>Current Valuation</label>
//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
//                   $
//                 </span>
//                 <input
//                   type="number"
//                   value={
//                     formData.financials.valuation === 0
//                       ? ""
//                       : formData.financials.valuation
//                   }
//                   onChange={(e) =>
//                     handleChange(
//                       "financials",
//                       parseFloat(e.target.value) || 0,
//                       null,
//                       "valuation"
//                     )
//                   }
//                   placeholder="0"
//                   className={`${inputClasses} pl-8`}
//                 />
//               </div>
//             </div>

//             {/* Financial Summary */}
//             {formData.financials.lifetimeValue > 0 &&
//               formData.financials.customerAcquisitionCost > 0 && (
//                 <div
//                   className={`p-4 rounded-lg ${
//                     dark ? "bg-blue-900/20" : "bg-blue-50"
//                   }`}
//                 >
//                   <h4
//                     className={`font-medium mb-3 ${
//                       dark ? "text-white" : "text-gray-900"
//                     }`}
//                   >
//                     Calculated Metrics
//                   </h4>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//                     <div className="text-center">
//                       <div className="text-xl font-bold text-blue-600">
//                         {(
//                           formData.financials.lifetimeValue /
//                           formData.financials.customerAcquisitionCost
//                         ).toFixed(1)}
//                       </div>
//                       <div className="text-gray-600 dark:text-gray-400">
//                         LTV/CAC Ratio
//                       </div>
//                     </div>
//                     {formData.financials.revenueThisYear > 0 &&
//                       formData.financials.revenueLastYear > 0 && (
//                         <div className="text-center">
//                           <div className="text-xl font-bold text-green-600">
//                             {(
//                               ((formData.financials.revenueThisYear -
//                                 formData.financials.revenueLastYear) /
//                                 formData.financials.revenueLastYear) *
//                               100
//                             ).toFixed(1)}
//                             %
//                           </div>
//                           <div className="text-gray-600 dark:text-gray-400">
//                             Revenue Growth
//                           </div>
//                         </div>
//                       )}
//                     {formData.financials.revenueThisYear > 0 &&
//                       formData.financials.netProfit !== 0 && (
//                         <div className="text-center">
//                           <div className="text-xl font-bold text-orange-600">
//                             $
//                             {(
//                               (formData.financials.revenueThisYear -
//                                 formData.financials.netProfit) /
//                               12
//                             ).toLocaleString()}
//                           </div>
//                           <div className="text-gray-600 dark:text-gray-400">
//                             Monthly Burn
//                           </div>
//                         </div>
//                       )}
//                   </div>
//                 </div>
//               )}
//           </div>
//         );

//       case 6:
//         return (
//           <div className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className={labelClasses}>
//                   Funding Amount Requested{" "}
//                   <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
//                     $
//                   </span>
//                   <input
//                     type="number"
//                     value={
//                       formData.fundingDetails.fundingAskAmount === 0
//                         ? ""
//                         : formData.fundingDetails.fundingAskAmount
//                     }
//                     onChange={(e) =>
//                       handleChange(
//                         "fundingDetails",
//                         parseFloat(e.target.value) || 0,
//                         null,
//                         "fundingAskAmount"
//                       )
//                     }
//                     placeholder="0"
//                     className={`${inputClasses} pl-8`}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className={labelClasses}>
//                   Equity Offered <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="number"
//                     min="0"
//                     max="100"
//                     step="0.1"
//                     value={
//                       formData.fundingDetails.equityOfferedPercent === 0
//                         ? ""
//                         : formData.fundingDetails.equityOfferedPercent
//                     }
//                     onChange={(e) =>
//                       handleChange(
//                         "fundingDetails",
//                         parseFloat(e.target.value) || 0,
//                         null,
//                         "equityOfferedPercent"
//                       )
//                     }
//                     placeholder="0"
//                     className={inputClasses}
//                   />
//                   <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
//                     %
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className={labelClasses}>Previous Funding Raised</label>
//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
//                   $
//                 </span>
//                 <input
//                   type="number"
//                   value={
//                     formData.fundingDetails.previousFundingRaised === 0
//                       ? ""
//                       : formData.fundingDetails.previousFundingRaised
//                   }
//                   onChange={(e) =>
//                     handleChange(
//                       "fundingDetails",
//                       parseFloat(e.target.value) || 0,
//                       null,
//                       "previousFundingRaised"
//                     )
//                   }
//                   placeholder="0"
//                   className={`${inputClasses} pl-8`}
//                 />
//               </div>
//             </div>

//             {/* Valuation Calculation */}
//             {formData.fundingDetails.fundingAskAmount > 0 &&
//               formData.fundingDetails.equityOfferedPercent > 0 && (
//                 <div
//                   className={`p-4 rounded-lg ${
//                     dark ? "bg-green-900/20" : "bg-green-50"
//                   }`}
//                 >
//                   <h4
//                     className={`font-medium mb-3 ${
//                       dark ? "text-white" : "text-gray-900"
//                     }`}
//                   >
//                     Implied Valuation
//                   </h4>
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-green-600 mb-1">
//                       $
//                       {(
//                         (formData.fundingDetails.fundingAskAmount /
//                           formData.fundingDetails.equityOfferedPercent) *
//                         100
//                       ).toLocaleString()}
//                     </div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                       Based on $
//                       {formData.fundingDetails.fundingAskAmount.toLocaleString()}{" "}
//                       for {formData.fundingDetails.equityOfferedPercent}% equity
//                     </p>
//                   </div>
//                 </div>
//               )}

//             <div>
//               <label className={labelClasses}>
//                 Valuation History (Optional)
//               </label>
//               <div className="space-y-4">
//                 {formData.valuationHistory.map((valuation, index) => (
//                   <div
//                     key={index}
//                     className={`p-4 rounded-lg border ${
//                       dark
//                         ? "border-gray-600 bg-gray-800/30"
//                         : "border-gray-200 bg-gray-50/30"
//                     } relative`}
//                   >
//                     <button
//                       type="button"
//                       onClick={() => removeArrayItem("valuationHistory", index)}
//                       className="absolute top-2 right-2 w-6 h-6 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-sm flex items-center justify-center"
//                     >
//                       ×
//                     </button>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
//                       <input
//                         type="date"
//                         value={
//                           valuation.date
//                             ? new Date(valuation.date)
//                                 .toISOString()
//                                 .split("T")[0]
//                             : ""
//                         }
//                         onChange={(e) =>
//                           handleChange(
//                             "valuationHistory",
//                             e.target.value,
//                             index,
//                             "date"
//                           )
//                         }
//                         className={inputClasses}
//                       />
//                       <select
//                         value={valuation.roundType || "Seed"}
//                         onChange={(e) =>
//                           handleChange(
//                             "valuationHistory",
//                             e.target.value,
//                             index,
//                             "roundType"
//                           )
//                         }
//                         className={selectClasses}
//                       >
//                         <option value="Seed">Seed</option>
//                         <option value="Series A">Series A</option>
//                         <option value="Series B">Series B</option>
//                         <option value="Other">Other</option>
//                       </select>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="relative">
//                         <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
//                           $
//                         </span>
//                         <input
//                           type="number"
//                           value={
//                             valuation.valuation === 0 ? "" : valuation.valuation
//                           }
//                           onChange={(e) =>
//                             handleChange(
//                               "valuationHistory",
//                               parseFloat(e.target.value) || 0,
//                               index,
//                               "valuation"
//                             )
//                           }
//                           placeholder="Valuation"
//                           className={`${inputClasses} pl-8`}
//                         />
//                       </div>
//                       <div className="relative">
//                         <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
//                           $
//                         </span>
//                         <input
//                           type="number"
//                           value={
//                             valuation.fundingRaised === 0
//                               ? ""
//                               : valuation.fundingRaised
//                           }
//                           onChange={(e) =>
//                             handleChange(
//                               "valuationHistory",
//                               parseFloat(e.target.value) || 0,
//                               index,
//                               "fundingRaised"
//                             )
//                           }
//                           placeholder="Funding Raised"
//                           className={`${inputClasses} pl-8`}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() =>
//                     addArrayItem("valuationHistory", {
//                       date: new Date().toISOString(),
//                       valuation: 0,
//                       fundingRaised: 0,
//                       roundType: "Seed",
//                     })
//                   }
//                   className={`w-full py-3 border-2 border-dashed rounded-lg transition-colors text-sm ${
//                     dark
//                       ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
//                       : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
//                   }`}
//                 >
//                   Add Previous Round
//                 </button>
//               </div>
//             </div>
//           </div>
//         );

//       case 7:
//         return (
//           <div className="space-y-6">
//             <div>
//               <label className={labelClasses}>Key Milestones & Roadmap</label>
//               <div className="space-y-4">
//                 {formData.milestones.map((milestone, index) => (
//                   <div
//                     key={index}
//                     className={`p-4 rounded-lg border ${
//                       dark
//                         ? "border-gray-600 bg-gray-800/30"
//                         : "border-gray-200 bg-gray-50/30"
//                     } relative`}
//                   >
//                     {formData.milestones.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeArrayItem("milestones", index)}
//                         className="absolute top-2 right-2 w-6 h-6 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-sm flex items-center justify-center"
//                       >
//                         ×
//                       </button>
//                     )}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
//                       <input
//                         type="text"
//                         value={milestone.title}
//                         onChange={(e) =>
//                           handleChange(
//                             "milestones",
//                             e.target.value,
//                             index,
//                             "title"
//                           )
//                         }
//                         placeholder="Milestone title"
//                         className={inputClasses}
//                       />
//                       <input
//                         type="date"
//                         value={
//                           milestone.targetDate
//                             ? new Date(milestone.targetDate)
//                                 .toISOString()
//                                 .split("T")[0]
//                             : ""
//                         }
//                         onChange={(e) =>
//                           handleChange(
//                             "milestones",
//                             e.target.value,
//                             index,
//                             "targetDate"
//                           )
//                         }
//                         className={inputClasses}
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <textarea
//                         value={milestone.description}
//                         onChange={(e) =>
//                           handleChange(
//                             "milestones",
//                             e.target.value,
//                             index,
//                             "description"
//                           )
//                         }
//                         placeholder="Describe this milestone"
//                         rows={3}
//                         className={textareaClasses}
//                       />
//                     </div>
//                     <select
//                       value={milestone.status || "pending"}
//                       onChange={(e) =>
//                         handleChange(
//                           "milestones",
//                           e.target.value,
//                           index,
//                           "status"
//                         )
//                       }
//                       className={selectClasses}
//                     >
//                       <option value="pending">Pending</option>
//                       <option value="achieved">Achieved</option>
//                       <option value="delayed">Delayed</option>
//                     </select>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() =>
//                     addArrayItem("milestones", {
//                       title: "",
//                       description: "",
//                       targetDate: "",
//                       status: "pending",
//                     })
//                   }
//                   className={`w-full py-3 border-2 border-dashed rounded-lg transition-colors text-sm ${
//                     dark
//                       ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
//                       : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
//                   }`}
//                 >
//                   Add Milestone
//                 </button>
//               </div>
//             </div>

//             <div>
//               <h4
//                 className={`text-lg font-medium mb-4 ${
//                   dark ? "text-white" : "text-gray-900"
//                 }`}
//               >
//                 Intellectual Property
//               </h4>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className={labelClasses}>Patents</label>
//                   <div className="space-y-3">
//                     {formData.legal.patents.map((patent, index) => (
//                       <div key={index} className="flex gap-2">
//                         <input
//                           type="text"
//                           value={patent}
//                           onChange={(e) =>
//                             handleChange(
//                               "legal",
//                               e.target.value,
//                               index,
//                               "patents"
//                             )
//                           }
//                           placeholder="Patent title/number"
//                           className={inputClasses}
//                         />
//                         {formData.legal.patents.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => {
//                               const newPatents = formData.legal.patents.filter(
//                                 (_, i) => i !== index
//                               );
//                               handleChange(
//                                 "legal",
//                                 newPatents,
//                                 null,
//                                 "patents"
//                               );
//                             }}
//                             className="w-10 h-10 rounded bg-red-100 dark:bg-red-900/20 text-red-600 hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center text-sm"
//                           >
//                             ×
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                     <button
//                       type="button"
//                       onClick={() => {
//                         const newPatents = [...formData.legal.patents, ""];
//                         handleChange("legal", newPatents, null, "patents");
//                       }}
//                       className={`w-full py-2 border-2 border-dashed rounded-lg text-sm transition-colors ${
//                         dark
//                           ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
//                           : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
//                       }`}
//                     >
//                       Add Patent
//                     </button>
//                   </div>
//                 </div>

//                 <div>
//                   <label className={labelClasses}>Trademarks</label>
//                   <div className="space-y-3">
//                     {formData.legal.trademarks.map((trademark, index) => (
//                       <div key={index} className="flex gap-2">
//                         <input
//                           type="text"
//                           value={trademark}
//                           onChange={(e) =>
//                             handleChange(
//                               "legal",
//                               e.target.value,
//                               index,
//                               "trademarks"
//                             )
//                           }
//                           placeholder="Trademark name"
//                           className={inputClasses}
//                         />
//                         {formData.legal.trademarks.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => {
//                               const newTrademarks =
//                                 formData.legal.trademarks.filter(
//                                   (_, i) => i !== index
//                                 );
//                               handleChange(
//                                 "legal",
//                                 newTrademarks,
//                                 null,
//                                 "trademarks"
//                               );
//                             }}
//                             className="w-10 h-10 rounded bg-red-100 dark:bg-red-900/20 text-red-600 hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center text-sm"
//                           >
//                             ×
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                     <button
//                       type="button"
//                       onClick={() => {
//                         const newTrademarks = [
//                           ...formData.legal.trademarks,
//                           "",
//                         ];
//                         handleChange(
//                           "legal",
//                           newTrademarks,
//                           null,
//                           "trademarks"
//                         );
//                       }}
//                       className={`w-full py-2 border-2 border-dashed rounded-lg text-sm transition-colors ${
//                         dark
//                           ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
//                           : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
//                       }`}
//                     >
//                       Add Trademark
//                     </button>
//                   </div>
//                 </div>

//                 <div>
//                   <label className={labelClasses}>Licenses</label>
//                   <div className="space-y-3">
//                     {formData.legal.licenses.map((license, index) => (
//                       <div key={index} className="flex gap-2">
//                         <input
//                           type="text"
//                           value={license}
//                           onChange={(e) =>
//                             handleChange(
//                               "legal",
//                               e.target.value,
//                               index,
//                               "licenses"
//                             )
//                           }
//                           placeholder="License type/name"
//                           className={inputClasses}
//                         />
//                         {formData.legal.licenses.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => {
//                               const newLicenses =
//                                 formData.legal.licenses.filter(
//                                   (_, i) => i !== index
//                                 );
//                               handleChange(
//                                 "legal",
//                                 newLicenses,
//                                 null,
//                                 "licenses"
//                               );
//                             }}
//                             className="w-10 h-10 rounded bg-red-100 dark:bg-red-900/20 text-red-600 hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center text-sm"
//                           >
//                             ×
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                     <button
//                       type="button"
//                       onClick={() => {
//                         const newLicenses = [...formData.legal.licenses, ""];
//                         handleChange("legal", newLicenses, null, "licenses");
//                       }}
//                       className={`w-full py-2 border-2 border-dashed rounded-lg text-sm transition-colors ${
//                         dark
//                           ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
//                           : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
//                       }`}
//                     >
//                       Add License
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className={labelClasses}>
//                 Exit Strategy <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 value={formData.exitStrategy}
//                 onChange={(e) => handleChange("exitStrategy", e.target.value)}
//                 placeholder="Describe your long-term exit strategy (IPO, acquisition, etc.)"
//                 rows={4}
//                 className={textareaClasses}
//               />
//             </div>
//           </div>
//         );

//       case 8:
//         return (
//           <div className="space-y-6">
//             <div>
//               <label className={labelClasses}>Supporting Materials</label>
//               <div
//                 className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
//                   dark
//                     ? "border-gray-600 hover:border-gray-500 bg-gray-800/30"
//                     : "border-gray-300 hover:border-gray-400 bg-gray-50/30"
//                 }`}
//               >
//                 <div
//                   className={`w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center ${
//                     dark ? "bg-gray-700" : "bg-gray-100"
//                   }`}
//                 >
//                   <div className="text-gray-400 text-xl">📎</div>
//                 </div>
//                 <h4
//                   className={`text-lg font-medium mb-2 ${
//                     dark ? "text-white" : "text-gray-900"
//                   }`}
//                 >
//                   Upload supporting documents
//                 </h4>
//                 <p
//                   className={`text-sm mb-4 ${
//                     dark ? "text-gray-400" : "text-gray-600"
//                   }`}
//                 >
//                   Upload pitch deck, videos, or other supporting materials
//                 </p>
//                 <p
//                   className={`text-xs ${
//                     dark ? "text-gray-500" : "text-gray-500"
//                   }`}
//                 >
//                   Supported: PDF, PNG, JPG, MP4 (Max 10MB each)
//                 </p>
//                 <input
//                   type="file"
//                   multiple
//                   accept=".pdf,.png,.jpg,.jpeg,.mp4"
//                   onChange={(e) => {
//                     console.log("Files selected:", e.target.files);
//                   }}
//                   className="mt-4"
//                 />
//               </div>

//               {formData.media.length > 0 && (
//                 <div className="mt-6">
//                   <h4
//                     className={`text-sm font-medium mb-4 ${
//                       dark ? "text-gray-300" : "text-gray-700"
//                     }`}
//                   >
//                     Uploaded Files
//                   </h4>
//                   <div className="space-y-3">
//                     {formData.media.map((file, index) => (
//                       <div
//                         key={index}
//                         className={`flex items-center justify-between p-3 rounded-lg border ${
//                           dark
//                             ? "border-gray-600 bg-gray-700/50"
//                             : "border-gray-300 bg-gray-50"
//                         }`}
//                       >
//                         <div className="flex items-center gap-3">
//                           <div
//                             className={`w-8 h-8 rounded flex items-center justify-center ${
//                               file.type === "pdf"
//                                 ? "bg-red-100 text-red-600"
//                                 : file.type === "image"
//                                 ? "bg-blue-100 text-blue-600"
//                                 : "bg-green-100 text-green-600"
//                             }`}
//                           >
//                             📎
//                           </div>
//                           <div>
//                             <div className="text-sm font-medium truncate max-w-xs">
//                               {file.url}
//                             </div>
//                             <div className="text-xs text-gray-500">
//                               {file.type.toUpperCase()}
//                             </div>
//                           </div>
//                         </div>
//                         <button
//                           type="button"
//                           onClick={() => removeArrayItem("media", index)}
//                           className="text-red-500 hover:text-red-700 text-sm px-3 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div
//               className={`p-6 rounded-lg border ${
//                 dark
//                   ? "border-gray-600 bg-gray-800/50"
//                   : "border-gray-200 bg-gray-50"
//               }`}
//             >
//               <h3
//                 className={`text-xl font-semibold mb-6 ${
//                   dark ? "text-white" : "text-gray-900"
//                 }`}
//               >
//                 Pitch Summary
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
//                 <div className="space-y-4">
//                   <div>
//                     <span className="font-medium text-gray-500 dark:text-gray-400">
//                       Company:
//                     </span>
//                     <div
//                       className={`mt-1 ${
//                         dark ? "text-white" : "text-gray-900"
//                       }`}
//                     >
//                       {formData.startupName || "Not specified"}
//                     </div>
//                   </div>
//                   <div>
//                     <span className="font-medium text-gray-500 dark:text-gray-400">
//                       Funding Ask:
//                     </span>
//                     <div className={`mt-1 text-lg font-bold text-green-600`}>
//                       $
//                       {formData.fundingDetails.fundingAskAmount.toLocaleString() ||
//                         "0"}
//                     </div>
//                   </div>
//                   <div>
//                     <span className="font-medium text-gray-500 dark:text-gray-400">
//                       Equity Offered:
//                     </span>
//                     <div
//                       className={`mt-1 ${
//                         dark ? "text-white" : "text-gray-900"
//                       }`}
//                     >
//                       {formData.fundingDetails.equityOfferedPercent || 0}%
//                     </div>
//                   </div>
//                 </div>
//                 <div className="space-y-4">
//                   <div>
//                     <span className="font-medium text-gray-500 dark:text-gray-400">
//                       Team Size:
//                     </span>
//                     <div
//                       className={`mt-1 ${
//                         dark ? "text-white" : "text-gray-900"
//                       }`}
//                     >
//                       {formData.teamMembers.filter((tm) => tm.name).length + 1}{" "}
//                       members
//                     </div>
//                   </div>
//                   <div>
//                     <span className="font-medium text-gray-500 dark:text-gray-400">
//                       Completion:
//                     </span>
//                     <div
//                       className={`mt-1 ${
//                         dark ? "text-white" : "text-gray-900"
//                       }`}
//                     >
//                       {calculateCompletionPercentage()}%
//                     </div>
//                   </div>
//                   <div>
//                     <span className="font-medium text-gray-500 dark:text-gray-400">
//                       Last Saved:
//                     </span>
//                     <div className={`mt-1 text-xs text-gray-500`}>
//                       {new Date().toLocaleTimeString()}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {formData.oneLiner && (
//                 <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
//                   <span className="font-medium text-gray-500 dark:text-gray-400">
//                     Value Proposition:
//                   </span>
//                   <p
//                     className={`mt-2 leading-relaxed ${
//                       dark ? "text-gray-300" : "text-gray-700"
//                     }`}
//                   >
//                     {formData.oneLiner}
//                   </p>
//                 </div>
//               )}
//             </div>

//             <div
//               className={`p-6 rounded-lg border-2 ${
//                 dark
//                   ? "border-blue-500/30 bg-blue-500/5"
//                   : "border-blue-200 bg-blue-50"
//               }`}
//             >
//               <label className="flex items-start gap-4 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   required
//                   className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500 focus:ring-2"
//                 />
//                 <div className="text-sm">
//                   <p
//                     className={`font-medium mb-2 ${
//                       dark ? "text-blue-300" : "text-blue-900"
//                     }`}
//                   >
//                     I confirm that all information provided is accurate and
//                     complete
//                   </p>
//                   <p
//                     className={`text-xs leading-relaxed ${
//                       dark ? "text-blue-400" : "text-blue-700"
//                     }`}
//                   >
//                     By submitting this pitch, you agree to our terms of service
//                     and privacy policy. We will review your submission and
//                     contact you within 5-7 business days.
//                   </p>
//                 </div>
//               </label>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className={`min-h-screen ${dark ? "bg-gray-900" : "bg-gray-50"}`}>
//       <div className="max-w-4xl mx-auto p-6">
//         {/* Header */}
//         <div
//           className={`mb-8 p-6 rounded-lg ${
//             dark
//               ? "bg-gray-800 border border-gray-700"
//               : "bg-white border border-gray-200"
//           }`}
//         >
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h1
//                 className={`text-2xl font-bold ${
//                   dark ? "text-white" : "text-gray-900"
//                 }`}
//               >
//                 Pitch Submission
//               </h1>
//               <p
//                 className={`text-sm mt-1 ${
//                   dark ? "text-gray-400" : "text-gray-600"
//                 }`}
//               >
//                 Step {currentStep} of {formSteps.length}
//               </p>
//             </div>

//             {draftSaved && (
//               <div
//                 className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
//                   dark
//                     ? "text-blue-300 bg-blue-500/10 border border-blue-500/30"
//                     : "text-blue-700 bg-blue-50 border border-blue-200"
//                 }`}
//               >
//                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                 Draft Saved
//               </div>
//             )}
//           </div>

//           {/* Progress Steps */}
//           <div className="flex items-center justify-between mb-6">
//             {formSteps.map((step, index) => (
//               <div
//                 key={step.id}
//                 className="flex flex-col items-center relative"
//               >
//                 <div
//                   className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
//                     step.id <= currentStep
//                       ? "bg-blue-600 text-white"
//                       : dark
//                       ? "bg-gray-700 text-gray-400"
//                       : "bg-gray-200 text-gray-500"
//                   }`}
//                 >
//                   {step.id < currentStep ? "✓" : step.id}
//                 </div>
//                 <div className="text-xs mt-3 text-center max-w-[70px]">
//                   <div
//                     className={`font-medium ${
//                       step.id <= currentStep
//                         ? dark
//                           ? "text-white"
//                           : "text-gray-900"
//                         : dark
//                         ? "text-gray-500"
//                         : "text-gray-400"
//                     }`}
//                   >
//                     {step.title}
//                   </div>
//                   <div
//                     className={`text-xs mt-1 ${
//                       step.id <= currentStep
//                         ? dark
//                           ? "text-gray-400"
//                           : "text-gray-500"
//                         : dark
//                         ? "text-gray-600"
//                         : "text-gray-400"
//                     }`}
//                   >
//                     {step.subtitle}
//                   </div>
//                 </div>
//                 {index < formSteps.length - 1 && (
//                   <div
//                     className={`absolute top-5 left-5 h-px w-full ${
//                       step.id < currentStep
//                         ? "bg-blue-600"
//                         : dark
//                         ? "bg-gray-700"
//                         : "bg-gray-300"
//                     }`}
//                     style={{
//                       width: "calc(100% - 20px)",
//                       marginLeft: "30px",
//                     }}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Progress Bar */}
//           <div
//             className={`w-full h-2 rounded-full ${
//               dark ? "bg-gray-700" : "bg-gray-200"
//             }`}
//           >
//             <div
//               className="h-2 bg-blue-600 rounded-full transition-all duration-500"
//               style={{ width: `${(currentStep / formSteps.length) * 100}%` }}
//             />
//           </div>
//         </div>

//         {/* Main Form */}
//         <div
//           className={`rounded-lg ${
//             dark
//               ? "bg-gray-800 border border-gray-700"
//               : "bg-white border border-gray-200"
//           }`}
//         >
//           <div className="p-8">
//             <div className="mb-8">
//               <h2
//                 className={`text-2xl font-semibold ${
//                   dark ? "text-white" : "text-gray-900"
//                 }`}
//               >
//                 {formSteps[currentStep - 1].title}
//               </h2>
//               <p
//                 className={`text-sm mt-1 ${
//                   dark ? "text-gray-400" : "text-gray-600"
//                 }`}
//               >
//                 {formSteps[currentStep - 1].subtitle}
//               </p>
//             </div>

//             {error && (
//               <div className="mb-8 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 text-sm">
//                 {error}
//               </div>
//             )}

//             <form onSubmit={handleSubmit}>
//               {renderStepContent()}

//               {/* Navigation */}
//               <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-200 dark:border-gray-700">
//                 <button
//                   type="button"
//                   onClick={prevStep}
//                   disabled={currentStep === 1}
//                   className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
//                     dark
//                       ? "bg-gray-700 text-white hover:bg-gray-600 disabled:bg-gray-800"
//                       : "bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100"
//                   }`}
//                 >
//                   Previous
//                 </button>

//                 <div className="flex items-center gap-3">
//                   <button
//                     type="button"
//                     onClick={handleClearDraft}
//                     className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 border ${
//                       dark
//                         ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500"
//                         : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
//                     }`}
//                   >
//                     Clear Draft
//                   </button>

//                   {currentStep < formSteps.length ? (
//                     <button
//                       type="button"
//                       onClick={nextStep}
//                       className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200"
//                     >
//                       Next Step
//                     </button>
//                   ) : (
//                     <button
//                       type="submit"
//                       disabled={loading || !validateStep(currentStep)}
//                       className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-200"
//                     >
//                       {loading ? (
//                         <span className="flex items-center gap-2">
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           Submitting...
//                         </span>
//                       ) : (
//                         "Submit Pitch"
//                       )}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PitchForm;



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
//           <div className="mb-6 p-4 rounded-sm bg-red-50 border border-red-200">
//             <p className="text-red-800 text-sm">{error}</p>
//           </div>
//         )}

//         {/* Success Message */}
//         {success && (
//           <div className="mb-6 p-4 rounded-sm bg-green-50 border border-green-200">
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
//                     className={`w-full px-4 py-3 rounded-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical ${
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
//                     className={`w-full px-4 py-3 rounded-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
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
//                   className="w-full bg-blue-600 text-white py-3 px-6 rounded-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
//               className={`mt-4 px-4 py-2 rounded-sm ${
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
//             className={`w-full py-4 text-sm font-semibold tracking-widest transition-all duration-300 rounded-sm ${
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
//                 className={`absolute top-4 sm:top-6 right-4 sm:right-6 z-10 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs font-semibold tracking-wider transition-all duration-300 border rounded-sm ${
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
//                     className={`w-full py-4 sm:py-5 text-sm sm:text-base font-semibold tracking-widest transition-all duration-300 rounded-sm ${
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
//               className={`text-sm px-4 py-2 rounded-sm transition-colors ${
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

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import api from "../utils/api1";
// import useThemeStore from "../store/themeStore";

// const PitchForm = () => {
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
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [draftSaved, setDraftSaved] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [enhancing, setEnhancing] = useState(false);
//   const [sampleEnhanced, setSampleEnhanced] = useState("");
//   const [enhanceField, setEnhanceField] = useState("");
//   const { dark } = useThemeStore();

//   // Enhanced screen size detection
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   // Auto-save functionality
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const hasContent = Object.values(formData).some((value) => value.trim());

//       if (hasContent) {
//         localStorage.setItem("pitchDraft", JSON.stringify(formData));
//         setDraftSaved(true);
//         setTimeout(() => setDraftSaved(false), 2500);
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
//         const hasContent = Object.values(parsedDraft).some(
//           (value) => typeof value === "string" && value.trim()
//         );

//         if (hasContent) {
//           setFormData(parsedDraft);
//         }
//       } catch (error) {
//         console.error("Error parsing saved pitch draft:", error);
//         localStorage.removeItem("pitchDraft");
//       }
//     }
//   }, []);

//   const sections = [
//     {
//       title: "Foundation",
//       fields: [
//         {
//           label: "Company Name",
//           name: "startupName",
//           placeholder: "Enter your company name...",
//           required: true,
//           maxLength: 100,
//         },
//         {
//           label: "Value Proposition",
//           name: "oneLiner",
//           placeholder: "Describe your company's core value proposition...",
//           required: true,
//           maxLength: 200,
//         },
//       ],
//     },
//     {
//       title: "Challenge & Innovation",
//       fields: [
//         {
//           label: "Market Problem",
//           name: "problem",
//           textarea: true,
//           placeholder:
//             "Define the significant problem or market inefficiency your company addresses...",
//           required: true,
//           maxLength: 800,
//         },
//         {
//           label: "Solution Overview",
//           name: "solution",
//           textarea: true,
//           placeholder:
//             "Explain how your innovation provides a superior solution...",
//           required: true,
//           maxLength: 800,
//         },
//       ],
//     },
//     {
//       title: "Market Opportunity",
//       fields: [
//         {
//           label: "Target Market",
//           name: "targetMarket",
//           textarea: true,
//           placeholder:
//             "Define your addressable market and customer segments...",
//           required: true,
//           maxLength: 600,
//         },
//         {
//           label: "Revenue Model",
//           name: "businessModel",
//           textarea: true,
//           placeholder:
//             "Outline your monetization strategy and revenue streams...",
//           required: true,
//           maxLength: 600,
//         },
//       ],
//     },
//     {
//       title: "Execution & Team",
//       fields: [
//         {
//           label: "Current Traction",
//           name: "traction",
//           textarea: true,
//           placeholder:
//             "Present key metrics, milestones, and validation achieved...",
//           required: true,
//           maxLength: 700,
//         },
//         {
//           label: "Team Overview",
//           name: "team",
//           textarea: true,
//           placeholder:
//             "Highlight leadership team and advisory board expertise...",
//           required: true,
//           maxLength: 600,
//         },
//       ],
//     },
//     {
//       title: "Market Strategy",
//       fields: [
//         {
//           label: "Go-to-Market Strategy",
//           name: "goToMarketStrategy",
//           textarea: true,
//           placeholder:
//             "Detail your customer acquisition and market penetration approach...",
//           required: true,
//           maxLength: 700,
//         },
//         {
//           label: "Competitive Analysis",
//           name: "competition",
//           textarea: true,
//           placeholder:
//             "Identify competitive landscape and articulate your differentiation...",
//           required: true,
//           maxLength: 700,
//         },
//       ],
//     },
//     {
//       title: "Investment Request",
//       fields: [
//         {
//           label: "Funding Amount",
//           name: "fundingAsk",
//           placeholder: "Specify the investment amount and round type...",
//           required: true,
//           maxLength: 200,
//         },
//         {
//           label: "Use of Funds",
//           name: "fundingUse",
//           textarea: true,
//           placeholder:
//             "Provide detailed allocation of investment across strategic priorities...",
//           required: true,
//           maxLength: 800,
//         },
//       ],
//     },
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     if (error) setError("");
//   };

//   const handleAIEnhance = async (fieldName, content) => {
//     if (!content.trim()) {
//       setError("Please enter some content to enhance");
//       return;
//     }

//     setEnhancing(true);
//     setEnhanceField(fieldName);

//     try {
//       const res = await api.post("/user/ask", {
//         content: `
//           You are an expert investment pitch writer.
//           Your job is to take the following text and:
//           1. Improve clarity, grammar, and flow for investor presentations.
//           2. Make it compelling and professionally persuasive.
//           3. Expand with relevant details that investors want to see.
//           4. Keep the tone confident yet realistic.
//           5. Return ONLY the improved version (no extra formatting or labels).

//           Context: This is for field "${fieldName}" in an investment pitch.

//           Here is the text to improve:
//           ---
//           ${content}
//           ---
//         `,
//       });
//       const enhancedContent = res.data.data.choices[0].message.content.trim();
//       setSampleEnhanced(enhancedContent);
//       setError("");
//     } catch (error) {
//       console.error("AI Enhancement error:", error);
//       setError("Failed to enhance content. Please try again.");
//     } finally {
//       setEnhancing(false);
//       setEnhanceField("");
//     }
//   };

//   const isFormValid = () => {
//     const requiredFields = sections.flatMap((section) =>
//       section.fields
//         .filter((field) => field.required)
//         .map((field) => field.name)
//     );
//     return requiredFields.every((field) => formData[field]?.trim());
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isFormValid()) {
//       setError("Please fill in all required fields.");
//       return;
//     }

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
//           "Failed to submit pitch. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClearDraft = () => {
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
//     setSuccess(false);
//     setMessage("");
//     setError("");
//     setSampleEnhanced("");
//     localStorage.removeItem("pitchDraft");
//   };

//   // Check if there's any draft content
//   const hasDraftContent = Object.values(formData).some((value) => value.trim());

//   if (success) {
//     return (
//       <div
//         className={`min-h-screen flex items-center justify-center p-4 ${
//           dark ? "bg-black" : "bg-white"
//         }`}
//       >
//         <div className="p-3 rounded-sm bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 text-sm flex items-center gap-2 backdrop-blur-sm transition-all duration-500">
//           <svg
//             className="w-4 h-4 flex-shrink-0"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//           >
//             <path
//               fillRule="evenodd"
//               d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//             />
//           </svg>
//           {message} 🎉
//         </div>
//         <button
//           onClick={handleClearDraft}
//           className={`mt-4 w-full sm:w-auto px-6 md:px-8 py-3 md:py-3.5 font-semibold rounded-sm transition-all duration-300 transform hover:scale-105 active:scale-95 backdrop-blur-sm border ${
//             dark
//               ? "bg-gradient-to-r from-white/15 via-white/25 to-white/15 border-white/30 text-white hover:from-white/25 hover:via-white/35 hover:to-white/25 shadow-lg hover:shadow-xl"
//               : "bg-gradient-to-r from-black/15 via-black/25 to-black/15 border-black/30 text-black hover:from-black/25 hover:via-black/35 hover:to-black/25 shadow-lg hover:shadow-xl"
//           }`}
//         >
//           Create New Pitch
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full min-h-screen px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-4 md:py-6 lg:py-8 relative overflow-hidden">
//       {/* Enhanced multi-layer glassmorphism background - FIXED to match Post component */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {/* Primary gradient orbs - First orb now empty to match Post component */}
//         <div
//           className={`absolute -top-32 -right-32 w-64 h-64 md:w-80 md:h-80 rounded-full blur-3xl transition-opacity duration-1000`}
//         ></div>

//         <div
//           className={`absolute -bottom-32 -left-32 w-72 h-72 md:w-96 md:h-96 rounded-full blur-3xl transition-opacity duration-1000 ${
//             dark
//               ? "bg-gradient-to-tr from-emerald-500/20 via-cyan-500/15 to-blue-500/25"
//               : "bg-gradient-to-tr from-emerald-400/25 via-cyan-400/20 to-blue-400/30"
//           }`}
//         ></div>

//         {/* Secondary accent orbs for depth */}
//         <div
//           className={`absolute top-1/3 right-1/4 w-48 h-48 md:w-56 md:h-56 rounded-full blur-2xl opacity-60 ${
//             dark
//               ? "bg-gradient-to-br from-orange-500/15 to-red-500/10"
//               : "bg-gradient-to-br from-orange-400/20 to-red-400/15"
//           }`}
//         ></div>

//         <div
//           className={`absolute bottom-1/3 left-1/4 w-40 h-40 md:w-48 md:h-48 rounded-full blur-2xl opacity-40 ${
//             dark
//               ? "bg-gradient-to-br from-violet-500/20 to-indigo-500/15"
//               : "bg-gradient-to-br from-violet-400/25 to-indigo-400/20"
//           }`}
//         ></div>
//       </div>

//       <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto relative z-10">
//         <div
//           className={`rounded-sm md:rounded-xl transition-all duration-700 hover:scale-[1.01] backdrop-blur-2xl border shadow-2xl ${
//             !dark
//               ? "border-white/25 bg-white/8 shadow-black/10"
//               : "border-white/15 bg-black/8 shadow-white/5"
//           }`}
//           style={{
//             backdropFilter: "blur(24px) saturate(200%)",
//             WebkitBackdropFilter: "blur(24px) saturate(200%)",
//             boxShadow: dark
//               ? "0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
//               : "0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
//           }}
//         >
//           {/* Ultra-elegant header with subtle gradient overlay */}
//           <div
//             className={`px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b backdrop-blur-sm rounded-t-lg md:rounded-t-xl relative overflow-hidden ${
//               dark
//                 ? "border-white/10 bg-gradient-to-r from-white/3 via-white/8 to-white/3"
//                 : "border-black/10 bg-gradient-to-r from-black/3 via-black/8 to-black/3"
//             }`}
//           >
//             {/* Subtle shimmer overlay */}
//             <div
//               className={`absolute inset-0 bg-gradient-to-r ${
//                 dark
//                   ? "from-transparent via-white/5 to-transparent"
//                   : "from-transparent via-black/5 to-transparent"
//               } opacity-50`}
//             ></div>

//             <div className="flex items-center justify-between relative z-10">
//               <div className="flex items-center gap-2 sm:gap-3">
//                 {/* Enhanced dot indicator with inner glow */}
//                 <div
//                   className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full backdrop-blur-sm border relative ${
//                     dark
//                       ? "bg-gradient-to-br from-white/30 via-white/20 to-white/10 border-white/30"
//                       : "bg-gradient-to-br from-black/30 via-black/20 to-black/10 border-black/30"
//                   }`}
//                 >
//                   <div
//                     className={`absolute inset-0.5 rounded-full ${
//                       dark ? "bg-white/20" : "bg-black/20"
//                     }`}
//                   ></div>
//                 </div>
//                 <h2
//                   className={`text-base sm:text-lg md:text-xl font-semibold tracking-tight ${
//                     dark ? "text-white/95" : "text-black/95"
//                   }`}
//                 >
//                   Investment Pitch
//                 </h2>
//               </div>

//               <div className="flex items-center gap-2 sm:gap-3">
//                 {/* Enhanced draft saved indicator */}
//                 {draftSaved && (
//                   <div
//                     className={`text-xs flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm border transition-all duration-500 ${
//                       dark
//                         ? "text-emerald-300 bg-emerald-500/15 border-emerald-500/25"
//                         : "text-emerald-700 bg-emerald-500/15 border-emerald-500/25"
//                     }`}
//                   >
//                     <svg
//                       className="w-2.5 h-2.5 sm:w-3 sm:h-3"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                       />
//                     </svg>
//                     <span className="hidden sm:inline">Draft saved</span>
//                     <span className="sm:hidden">Saved</span>
//                   </div>
//                 )}

//                 {/* Enhanced clear draft button */}
//                 {hasDraftContent && (
//                   <button
//                     type="button"
//                     onClick={handleClearDraft}
//                     className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium rounded-sm transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm border ${
//                       dark
//                         ? "bg-white/8 text-white/85 hover:bg-white/15 border-white/20 hover:border-white/35"
//                         : "bg-black/8 text-black/85 hover:bg-black/15 border-black/20 hover:border-black/35"
//                     }`}
//                     title="Clear all draft content"
//                   >
//                     <div className="flex items-center gap-1 sm:gap-1.5">
//                       <svg
//                         className="w-2.5 h-2.5 sm:w-3 sm:h-3"
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
//                       <span className="hidden sm:inline">Clear</span>
//                     </div>
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           <form
//             onSubmit={handleSubmit}
//             className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6"
//           >
//             {/* Enhanced error message */}
//             {error && (
//               <div className="p-3 rounded-sm bg-red-500/10 border border-red-500/25 text-red-600 text-sm backdrop-blur-sm">
//                 {error}
//               </div>
//             )}

//             {/* Single Page Form Sections */}
//             <div className="space-y-6 sm:space-y-8 md:space-y-10">
//               {sections.map((section, sectionIndex) => (
//                 <motion.div
//                   key={section.title}
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: sectionIndex * 0.1, duration: 0.6 }}
//                   className="space-y-4 sm:space-y-6"
//                 >
//                   {/* Section Header */}
//                   <div className="mb-4 sm:mb-6">
//                     <h3
//                       className={`text-lg sm:text-xl font-semibold mb-2 ${
//                         dark ? "text-white/90" : "text-black/90"
//                       }`}
//                     >
//                       {section.title}
//                     </h3>
//                     <div
//                       className={`w-8 sm:w-12 h-px ${
//                         dark ? "bg-white/30" : "bg-black/30"
//                       }`}
//                     />
//                   </div>

//                   {/* Section Fields */}
//                   <div className="space-y-4 sm:space-y-6">
//                     {section.fields.map((field, fieldIndex) => (
//                       <motion.div
//                         key={field.name}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{
//                           delay: sectionIndex * 0.1 + fieldIndex * 0.05,
//                           duration: 0.4,
//                         }}
//                         className="space-y-2"
//                       >
//                         <label
//                           className={`block text-sm font-medium ${
//                             dark ? "text-white/85" : "text-black/85"
//                           }`}
//                         >
//                           {field.label}
//                           {field.required && (
//                             <span className="text-red-500 ml-1">*</span>
//                           )}
//                         </label>

//                         <div className="relative">
//                           {field.textarea ? (
//                             <textarea
//                               name={field.name}
//                               rows={isMobile ? 4 : 5}
//                               maxLength={field.maxLength}
//                               value={formData[field.name]}
//                               onChange={handleChange}
//                               placeholder={field.placeholder}
//                               className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-14 rounded-sm resize-y min-h-[120px] max-h-[400px] text-sm sm:text-base border transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm ${
//                                 dark
//                                   ? "bg-white/5 border-white/20 text-white/95 focus:border-white/50 focus:ring-white/15 placeholder-white/50 hover:bg-white/8"
//                                   : "bg-black/5 border-black/20 text-black/95 focus:border-black/50 focus:ring-black/15 placeholder-black/50 hover:bg-black/8"
//                               }`}
//                               required={field.required}
//                             />
//                           ) : (
//                             <input
//                               type="text"
//                               name={field.name}
//                               maxLength={field.maxLength}
//                               value={formData[field.name]}
//                               onChange={handleChange}
//                               placeholder={field.placeholder}
//                               className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-sm text-sm sm:text-base border transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm ${
//                                 dark
//                                   ? "bg-white/5 border-white/20 text-white/95 focus:border-white/50 focus:ring-white/15 placeholder-white/50 hover:bg-white/8"
//                                   : "bg-black/5 border-black/20 text-black/95 focus:border-black/50 focus:ring-black/15 placeholder-black/50 hover:bg-black/8"
//                               }`}
//                               required={field.required}
//                             />
//                           )}

//                           {/* Enhanced AI button for textarea fields */}
//                           {field.textarea && (
//                             <button
//                               type="button"
//                               onClick={() =>
//                                 handleAIEnhance(
//                                   field.name,
//                                   formData[field.name]
//                                 )
//                               }
//                               disabled={
//                                 !formData[field.name]?.trim() || enhancing
//                               }
//                               className={`absolute top-2 right-2 sm:top-3 sm:right-3 p-2 rounded-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group backdrop-blur-sm border ${
//                                 dark
//                                   ? "bg-gradient-to-br from-violet-500/20 via-purple-500/15 to-indigo-500/20 border-violet-500/30 text-white hover:from-violet-500/30 hover:via-purple-500/25 hover:to-indigo-500/30"
//                                   : "bg-gradient-to-br from-violet-500/20 via-purple-500/15 to-indigo-500/20 border-violet-500/30 text-black hover:from-violet-500/30 hover:via-purple-500/25 hover:to-indigo-500/30"
//                               }`}
//                               title="Enhance content with AI"
//                             >
//                               {enhancing && enhanceField === field.name ? (
//                                 <div className="animate-spin">
//                                   <svg
//                                     className="w-4 h-4"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                   >
//                                     <circle
//                                       cx="12"
//                                       cy="12"
//                                       r="10"
//                                       stroke="currentColor"
//                                       strokeWidth="4"
//                                       className="opacity-25"
//                                     ></circle>
//                                     <path
//                                       fill="currentColor"
//                                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                       className="opacity-75"
//                                     ></path>
//                                   </svg>
//                                 </div>
//                               ) : (
//                                 <svg
//                                   className="w-4 h-4 transition-transform group-hover:scale-110"
//                                   fill="none"
//                                   viewBox="0 0 24 24"
//                                   stroke="currentColor"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M13 10V3L4 14h7v7l9-11h-7z"
//                                   />
//                                 </svg>
//                               )}
//                             </button>
//                           )}
//                         </div>

//                         {/* Character count */}
//                         <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1">
//                           {field.maxLength && (
//                             <span
//                               className={`text-xs xs:ml-auto ${
//                                 formData[field.name]?.length >=
//                                 field.maxLength * 0.9
//                                   ? "text-orange-500"
//                                   : formData[field.name]?.length >=
//                                     field.maxLength
//                                   ? "text-red-500"
//                                   : dark
//                                   ? "text-white/60"
//                                   : "text-black/60"
//                               }`}
//                             >
//                               {formData[field.name]?.length || 0}/
//                               {field.maxLength}
//                             </span>
//                           )}
//                           {enhancing && enhanceField === field.name && (
//                             <span
//                               className={`text-xs px-2 py-0.5 rounded-full backdrop-blur-sm ${
//                                 dark
//                                   ? "text-violet-300 bg-violet-500/10"
//                                   : "text-violet-700 bg-violet-500/10"
//                               }`}
//                             >
//                               Enhancing...
//                             </span>
//                           )}
//                         </div>

//                         {/* Enhanced AI sample display */}
//                         {sampleEnhanced && enhanceField === field.name && (
//                           <div
//                             className={`mt-3 p-3 sm:p-4 rounded-sm border backdrop-blur-sm transition-all duration-500 animate-in slide-in-from-top-2 ${
//                               dark
//                                 ? "border-violet-500/30 bg-violet-500/8"
//                                 : "border-violet-500/30 bg-violet-500/8"
//                             }`}
//                           >
//                             <div className="flex justify-between items-start mb-2 gap-2">
//                               <span
//                                 className={`text-xs font-medium flex items-center gap-1 ${
//                                   dark ? "text-violet-300" : "text-violet-700"
//                                 }`}
//                               >
//                                 ✨ AI Enhanced
//                               </span>
//                               <div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
//                                 <button
//                                   type="button"
//                                   onClick={() => {
//                                     setFormData((prev) => ({
//                                       ...prev,
//                                       [field.name]: sampleEnhanced,
//                                     }));
//                                     setSampleEnhanced("");
//                                     setEnhanceField("");
//                                   }}
//                                   className={`text-xs px-2 sm:px-3 py-1 rounded-md backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
//                                     dark
//                                       ? "bg-violet-500/20 border-violet-500/30 text-violet-300 hover:bg-violet-500/30"
//                                       : "bg-violet-500/20 border-violet-500/30 text-violet-700 hover:bg-violet-500/30"
//                                   }`}
//                                 >
//                                   Use
//                                 </button>
//                                 <button
//                                   type="button"
//                                   onClick={() => {
//                                     setSampleEnhanced("");
//                                     setEnhanceField("");
//                                   }}
//                                   className={`text-xs px-2 sm:px-3 py-1 rounded-md backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
//                                     dark
//                                       ? "bg-white/8 border-white/20 text-white/70 hover:bg-white/15"
//                                       : "bg-black/8 border-black/20 text-black/70 hover:bg-black/15"
//                                   }`}
//                                 >
//                                   ×
//                                 </button>
//                               </div>
//                             </div>
//                             <p
//                               className={`text-sm leading-relaxed ${
//                                 dark ? "text-white/85" : "text-black/85"
//                               }`}
//                             >
//                               {sampleEnhanced}
//                             </p>
//                           </div>
//                         )}
//                       </motion.div>
//                     ))}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Enhanced submit button with perfect mobile optimization */}
//             <div className="flex justify-stretch sm:justify-end pt-2 sm:pt-4">
//               <button
//                 type="submit"
//                 disabled={!isFormValid() || loading}
//                 className={`w-full sm:w-auto px-6 md:px-8 py-3 md:py-3.5 font-semibold rounded-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 backdrop-blur-sm border ${
//                   dark
//                     ? "bg-gradient-to-r from-white/15 via-white/25 to-white/15 border-white/30 text-white hover:from-white/25 hover:via-white/35 hover:to-white/25 shadow-lg hover:shadow-xl"
//                     : "bg-gradient-to-r from-black/15 via-black/25 to-black/15 border-black/30 text-black hover:from-black/25 hover:via-black/35 hover:to-black/25 shadow-lg hover:shadow-xl"
//                 }`}
//               >
//                 {loading ? (
//                   <div className="flex items-center justify-center gap-2">
//                     <div
//                       className={`w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin`}
//                     />
//                     <span className="text-sm sm:text-base">Submitting...</span>
//                   </div>
//                 ) : (
//                   <span className="text-sm sm:text-base">
//                     Submit Investment Pitch
//                   </span>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
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
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [draftSaved, setDraftSaved] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [enhancing, setEnhancing] = useState(false);
//   const [sampleEnhanced, setSampleEnhanced] = useState("");
//   const [enhanceField, setEnhanceField] = useState("");
//   const { dark } = useThemeStore();

//   // Enhanced screen size detection
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   // Auto-save functionality
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const hasContent = Object.values(formData).some((value) => value.trim());

//       if (hasContent) {
//         localStorage.setItem("pitchDraft", JSON.stringify(formData));
//         setDraftSaved(true);
//         setTimeout(() => setDraftSaved(false), 2500);
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
//         const hasContent = Object.values(parsedDraft).some(
//           (value) => typeof value === "string" && value.trim()
//         );

//         if (hasContent) {
//           setFormData(parsedDraft);
//         }
//       } catch (error) {
//         console.error("Error parsing saved pitch draft:", error);
//         localStorage.removeItem("pitchDraft");
//       }
//     }
//   }, []);

//   const sections = [
//     {
//       title: "Foundation",
//       fields: [
//         {
//           label: "Company Name",
//           name: "startupName",
//           placeholder: "Enter your company name...",
//           required: true,
//           maxLength: 100,
//         },
//         {
//           label: "Value Proposition",
//           name: "oneLiner",
//           placeholder: "Describe your company's core value proposition...",
//           required: true,
//           maxLength: 200,
//         },
//       ],
//     },
//     {
//       title: "Challenge & Innovation",
//       fields: [
//         {
//           label: "Market Problem",
//           name: "problem",
//           textarea: true,
//           placeholder:
//             "Define the significant problem or market inefficiency your company addresses...",
//           required: true,
//           maxLength: 800,
//         },
//         {
//           label: "Solution Overview",
//           name: "solution",
//           textarea: true,
//           placeholder:
//             "Explain how your innovation provides a superior solution...",
//           required: true,
//           maxLength: 800,
//         },
//       ],
//     },
//     {
//       title: "Market Opportunity",
//       fields: [
//         {
//           label: "Target Market",
//           name: "targetMarket",
//           textarea: true,
//           placeholder:
//             "Define your addressable market and customer segments...",
//           required: true,
//           maxLength: 600,
//         },
//         {
//           label: "Revenue Model",
//           name: "businessModel",
//           textarea: true,
//           placeholder:
//             "Outline your monetization strategy and revenue streams...",
//           required: true,
//           maxLength: 600,
//         },
//       ],
//     },
//     {
//       title: "Execution & Team",
//       fields: [
//         {
//           label: "Current Traction",
//           name: "traction",
//           textarea: true,
//           placeholder:
//             "Present key metrics, milestones, and validation achieved...",
//           required: true,
//           maxLength: 700,
//         },
//         {
//           label: "Team Overview",
//           name: "team",
//           textarea: true,
//           placeholder:
//             "Highlight leadership team and advisory board expertise...",
//           required: true,
//           maxLength: 600,
//         },
//       ],
//     },
//     {
//       title: "Market Strategy",
//       fields: [
//         {
//           label: "Go-to-Market Strategy",
//           name: "goToMarketStrategy",
//           textarea: true,
//           placeholder:
//             "Detail your customer acquisition and market penetration approach...",
//           required: true,
//           maxLength: 700,
//         },
//         {
//           label: "Competitive Analysis",
//           name: "competition",
//           textarea: true,
//           placeholder:
//             "Identify competitive landscape and articulate your differentiation...",
//           required: true,
//           maxLength: 700,
//         },
//       ],
//     },
//     {
//       title: "Investment Request",
//       fields: [
//         {
//           label: "Funding Amount",
//           name: "fundingAsk",
//           placeholder: "Specify the investment amount and round type...",
//           required: true,
//           maxLength: 200,
//         },
//         {
//           label: "Use of Funds",
//           name: "fundingUse",
//           textarea: true,
//           placeholder:
//             "Provide detailed allocation of investment across strategic priorities...",
//           required: true,
//           maxLength: 800,
//         },
//       ],
//     },
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     if (error) setError("");
//   };

//   const handleAIEnhance = async (fieldName, content) => {
//     if (!content.trim()) {
//       setError("Please enter some content to enhance");
//       return;
//     }

//     setEnhancing(true);
//     setEnhanceField(fieldName);

//     try {
//       const res = await api.post("/user/ask", {
//         content: `
//           You are an expert investment pitch writer.
//           Your job is to take the following text and:
//           1. Improve clarity, grammar, and flow for investor presentations.
//           2. Make it compelling and professionally persuasive.
//           3. Expand with relevant details that investors want to see.
//           4. Keep the tone confident yet realistic.
//           5. Return ONLY the improved version (no extra formatting or labels).

//           Context: This is for field "${fieldName}" in an investment pitch.

//           Here is the text to improve:
//           ---
//           ${content}
//           ---
//         `,
//       });
//       const enhancedContent = res.data.data.choices[0].message.content.trim();
//       setSampleEnhanced(enhancedContent);
//       setError("");
//     } catch (error) {
//       console.error("AI Enhancement error:", error);
//       setError("Failed to enhance content. Please try again.");
//     } finally {
//       setEnhancing(false);
//       setEnhanceField("");
//     }
//   };

//   const isFormValid = () => {
//     const requiredFields = sections.flatMap((section) =>
//       section.fields
//         .filter((field) => field.required)
//         .map((field) => field.name)
//     );
//     return requiredFields.every((field) => formData[field]?.trim());
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isFormValid()) {
//       setError("Please fill in all required fields.");
//       return;
//     }

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
//           "Failed to submit pitch. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClearDraft = () => {
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
//     setSuccess(false);
//     setMessage("");
//     setError("");
//     setSampleEnhanced("");
//     localStorage.removeItem("pitchDraft");
//   };

//   // Check if there's any draft content
//   const hasDraftContent = Object.values(formData).some((value) => value.trim());

//   if (success) {
//     return (
//       <div
//         className={`min-h-screen flex items-center justify-center p-4 ${
//           dark ? "bg-black" : "bg-white"
//         }`}
//       >
//         <div className="p-3 rounded-sm bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 text-sm flex items-center gap-2 backdrop-blur-sm transition-all duration-500">
//           <svg
//             className="w-4 h-4 flex-shrink-0"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//           >
//             <path
//               fillRule="evenodd"
//               d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//             />
//           </svg>
//           {message} 🎉
//         </div>
//         <button
//           onClick={handleClearDraft}
//           className={`mt-4 w-full sm:w-auto px-6 md:px-8 py-3 md:py-3.5 font-semibold rounded-sm transition-all duration-300 transform hover:scale-105 active:scale-95 backdrop-blur-sm border ${
//             dark
//               ? "bg-gradient-to-r from-white/15 via-white/25 to-white/15 border-white/30 text-white hover:from-white/25 hover:via-white/35 hover:to-white/25 shadow-lg hover:shadow-xl"
//               : "bg-gradient-to-r from-black/15 via-black/25 to-black/15 border-black/30 text-black hover:from-black/25 hover:via-black/35 hover:to-black/25 shadow-lg hover:shadow-xl"
//           }`}
//         >
//           Create New Pitch
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full min-h-screen px-2 sm:px-4 md:px-6 lg:px-0 py-2 sm:py-4 md:py-6 lg:py-0 relative overflow-hidden">
//       {/* Enhanced multi-layer glassmorphism background - FIXED to match Post component */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {/* Primary gradient orbs - First orb now empty to match Post component */}
//         <div
//           className={`absolute -top-32 -right-32 w-64 h-64 md:w-80 md:h-80 rounded-full blur-3xl transition-opacity duration-1000`}
//         ></div>

//         <div
//           className={`absolute -bottom-32 -left-32 w-72 h-72 md:w-96 md:h-96 rounded-full blur-3xl transition-opacity duration-1000 ${
//             dark
//               ? "bg-gradient-to-tr from-emerald-500/20 via-cyan-500/15 to-blue-500/25"
//               : "bg-gradient-to-tr from-emerald-400/25 via-cyan-400/20 to-blue-400/30"
//           }`}
//         ></div>

//         {/* Secondary accent orbs for depth */}
//         <div
//           className={`absolute top-1/3 right-1/4 w-48 h-48 md:w-56 md:h-56 rounded-full blur-2xl opacity-60 ${
//             dark
//               ? "bg-gradient-to-br from-orange-500/15 to-red-500/10"
//               : "bg-gradient-to-br from-orange-400/20 to-red-400/15"
//           }`}
//         ></div>

//         <div
//           className={`absolute bottom-1/3 left-1/4 w-40 h-40 md:w-48 md:h-48 rounded-full blur-2xl opacity-40 ${
//             dark
//               ? "bg-gradient-to-br from-violet-500/20 to-indigo-500/15"
//               : "bg-gradient-to-br from-violet-400/25 to-indigo-400/20"
//           }`}
//         ></div>
//       </div>

//       <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-none xl:max-w-none mx-auto lg:mx-0 relative z-10">
//         <div
//           className={`rounded-sm md:rounded-xl lg:rounded-none transition-all duration-700 hover:scale-[1.01] lg:hover:scale-100 backdrop-blur-2xl border lg:border-none shadow-2xl lg:shadow-none ${
//             !dark
//               ? "border-white/25 bg-white/8 shadow-black/10"
//               : "border-white/15 bg-black/8 shadow-white/5"
//           }`}
//           style={{
//             backdropFilter: "blur(24px) saturate(200%)",
//             WebkitBackdropFilter: "blur(24px) saturate(200%)",
//             boxShadow: dark
//               ? "0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
//               : "0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
//           }}
//         >
//           {/* Ultra-elegant header with subtle gradient overlay */}
//           <div
//             className={`px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 border-b lg:border-b-0 backdrop-blur-sm rounded-t-lg md:rounded-t-xl lg:rounded-t-none relative overflow-hidden ${
//               dark
//                 ? "border-white/10 bg-gradient-to-r from-white/3 via-white/8 to-white/3"
//                 : "border-black/10 bg-gradient-to-r from-black/3 via-black/8 to-black/3"
//             }`}
//           >
//             {/* Subtle shimmer overlay */}
//             <div
//               className={`absolute inset-0 bg-gradient-to-r ${
//                 dark
//                   ? "from-transparent via-white/5 to-transparent"
//                   : "from-transparent via-black/5 to-transparent"
//               } opacity-50`}
//             ></div>

//             <div className="flex items-center justify-between relative z-10">
//               <div className="flex items-center gap-2 sm:gap-3">
//                 {/* Enhanced dot indicator with inner glow */}
//                 <div
//                   className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full backdrop-blur-sm border relative ${
//                     dark
//                       ? "bg-gradient-to-br from-white/30 via-white/20 to-white/10 border-white/30"
//                       : "bg-gradient-to-br from-black/30 via-black/20 to-black/10 border-black/30"
//                   }`}
//                 >
//                   <div
//                     className={`absolute inset-0.5 rounded-full ${
//                       dark ? "bg-white/20" : "bg-black/20"
//                     }`}
//                   ></div>
//                 </div>
//                 <h2
//                   className={`text-base sm:text-lg md:text-xl font-semibold tracking-tight ${
//                     dark ? "text-white/95" : "text-black/95"
//                   }`}
//                 >
//                   Investment Pitch
//                 </h2>
//               </div>

//               <div className="flex items-center gap-2 sm:gap-3">
//                 {/* Enhanced draft saved indicator */}
//                 {draftSaved && (
//                   <div
//                     className={`text-xs flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm border transition-all duration-500 ${
//                       dark
//                         ? "text-emerald-300 bg-emerald-500/15 border-emerald-500/25"
//                         : "text-emerald-700 bg-emerald-500/15 border-emerald-500/25"
//                     }`}
//                   >
//                     <svg
//                       className="w-2.5 h-2.5 sm:w-3 sm:h-3"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                       />
//                     </svg>
//                     <span className="hidden sm:inline">Draft saved</span>
//                     <span className="sm:hidden">Saved</span>
//                   </div>
//                 )}

//                 {/* Enhanced clear draft button */}
//                 {hasDraftContent && (
//                   <button
//                     type="button"
//                     onClick={handleClearDraft}
//                     className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium rounded-sm transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm border ${
//                       dark
//                         ? "bg-white/8 text-white/85 hover:bg-white/15 border-white/20 hover:border-white/35"
//                         : "bg-black/8 text-black/85 hover:bg-black/15 border-black/20 hover:border-black/35"
//                     }`}
//                     title="Clear all draft content"
//                   >
//                     <div className="flex items-center gap-1 sm:gap-1.5">
//                       <svg
//                         className="w-2.5 h-2.5 sm:w-3 sm:h-3"
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
//                       <span className="hidden sm:inline">Clear</span>
//                     </div>
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           <form
//             onSubmit={handleSubmit}
//             className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-3 sm:space-y-4 md:space-y-6"
//           >
//             {/* Enhanced error message */}
//             {error && (
//               <div className="p-3 rounded-sm bg-red-500/10 border border-red-500/25 text-red-600 text-sm backdrop-blur-sm">
//                 {error}
//               </div>
//             )}

//             {/* Single Page Form Sections */}
//             <div className="space-y-6 sm:space-y-8 md:space-y-10">
//               {sections.map((section, sectionIndex) => (
//                 <motion.div
//                   key={section.title}
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: sectionIndex * 0.1, duration: 0.6 }}
//                   className="space-y-4 sm:space-y-6"
//                 >
//                   {/* Section Header */}
//                   <div className="mb-4 sm:mb-6">
//                     <h3
//                       className={`text-lg sm:text-xl font-semibold mb-2 ${
//                         dark ? "text-white/90" : "text-black/90"
//                       }`}
//                     >
//                       {section.title}
//                     </h3>
//                     <div
//                       className={`w-8 sm:w-12 h-px ${
//                         dark ? "bg-white/30" : "bg-black/30"
//                       }`}
//                     />
//                   </div>

//                   {/* Section Fields */}
//                   <div className="space-y-4 sm:space-y-6">
//                     {section.fields.map((field, fieldIndex) => (
//                       <motion.div
//                         key={field.name}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{
//                           delay: sectionIndex * 0.1 + fieldIndex * 0.05,
//                           duration: 0.4,
//                         }}
//                         className="space-y-2"
//                       >
//                         <label
//                           className={`block text-sm font-medium ${
//                             dark ? "text-white/85" : "text-black/85"
//                           }`}
//                         >
//                           {field.label}
//                           {field.required && (
//                             <span className="text-red-500 ml-1">*</span>
//                           )}
//                         </label>

//                         <div className="relative">
//                           {field.textarea ? (
//                             <textarea
//                               name={field.name}
//                               rows={isMobile ? 4 : 5}
//                               maxLength={field.maxLength}
//                               value={formData[field.name]}
//                               onChange={handleChange}
//                               placeholder={field.placeholder}
//                               className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-14 rounded-sm resize-y min-h-[120px] max-h-[400px] text-sm sm:text-base border transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm ${
//                                 dark
//                                   ? "bg-white/5 border-white/20 text-white/95 focus:border-white/50 focus:ring-white/15 placeholder-white/50 hover:bg-white/8"
//                                   : "bg-black/5 border-black/20 text-black/95 focus:border-black/50 focus:ring-black/15 placeholder-black/50 hover:bg-black/8"
//                               }`}
//                               required={field.required}
//                             />
//                           ) : (
//                             <input
//                               type="text"
//                               name={field.name}
//                               maxLength={field.maxLength}
//                               value={formData[field.name]}
//                               onChange={handleChange}
//                               placeholder={field.placeholder}
//                               className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-sm text-sm sm:text-base border transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm ${
//                                 dark
//                                   ? "bg-white/5 border-white/20 text-white/95 focus:border-white/50 focus:ring-white/15 placeholder-white/50 hover:bg-white/8"
//                                   : "bg-black/5 border-black/20 text-black/95 focus:border-black/50 focus:ring-black/15 placeholder-black/50 hover:bg-black/8"
//                               }`}
//                               required={field.required}
//                             />
//                           )}

//                           {/* Enhanced AI button for textarea fields */}
//                           {field.textarea && (
//                             <button
//                               type="button"
//                               onClick={() =>
//                                 handleAIEnhance(
//                                   field.name,
//                                   formData[field.name]
//                                 )
//                               }
//                               disabled={
//                                 !formData[field.name]?.trim() || enhancing
//                               }
//                               className={`absolute top-2 right-2 sm:top-3 sm:right-3 p-2 rounded-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group backdrop-blur-sm border ${
//                                 dark
//                                   ? "bg-gradient-to-br from-violet-500/20 via-purple-500/15 to-indigo-500/20 border-violet-500/30 text-white hover:from-violet-500/30 hover:via-purple-500/25 hover:to-indigo-500/30"
//                                   : "bg-gradient-to-br from-violet-500/20 via-purple-500/15 to-indigo-500/20 border-violet-500/30 text-black hover:from-violet-500/30 hover:via-purple-500/25 hover:to-indigo-500/30"
//                               }`}
//                               title="Enhance content with AI"
//                             >
//                               {enhancing && enhanceField === field.name ? (
//                                 <div className="animate-spin">
//                                   <svg
//                                     className="w-4 h-4"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                   >
//                                     <circle
//                                       cx="12"
//                                       cy="12"
//                                       r="10"
//                                       stroke="currentColor"
//                                       strokeWidth="4"
//                                       className="opacity-25"
//                                     ></circle>
//                                     <path
//                                       fill="currentColor"
//                                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                       className="opacity-75"
//                                     ></path>
//                                   </svg>
//                                 </div>
//                               ) : (
//                                 <svg
//                                   className="w-4 h-4 transition-transform group-hover:scale-110"
//                                   fill="none"
//                                   viewBox="0 0 24 24"
//                                   stroke="currentColor"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M13 10V3L4 14h7v7l9-11h-7z"
//                                   />
//                                 </svg>
//                               )}
//                             </button>
//                           )}
//                         </div>

//                         {/* Character count */}
//                         <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1">
//                           {field.maxLength && (
//                             <span
//                               className={`text-xs xs:ml-auto ${
//                                 formData[field.name]?.length >=
//                                 field.maxLength * 0.9
//                                   ? "text-orange-500"
//                                   : formData[field.name]?.length >=
//                                     field.maxLength
//                                   ? "text-red-500"
//                                   : dark
//                                   ? "text-white/60"
//                                   : "text-black/60"
//                               }`}
//                             >
//                               {formData[field.name]?.length || 0}/
//                               {field.maxLength}
//                             </span>
//                           )}
//                           {enhancing && enhanceField === field.name && (
//                             <span
//                               className={`text-xs px-2 py-0.5 rounded-full backdrop-blur-sm ${
//                                 dark
//                                   ? "text-violet-300 bg-violet-500/10"
//                                   : "text-violet-700 bg-violet-500/10"
//                               }`}
//                             >
//                               Enhancing...
//                             </span>
//                           )}
//                         </div>

//                         {/* Enhanced AI sample display */}
//                         {sampleEnhanced && enhanceField === field.name && (
//                           <div
//                             className={`mt-3 p-3 sm:p-4 rounded-sm border backdrop-blur-sm transition-all duration-500 animate-in slide-in-from-top-2 ${
//                               dark
//                                 ? "border-violet-500/30 bg-violet-500/8"
//                                 : "border-violet-500/30 bg-violet-500/8"
//                             }`}
//                           >
//                             <div className="flex justify-between items-start mb-2 gap-2">
//                               <span
//                                 className={`text-xs font-medium flex items-center gap-1 ${
//                                   dark ? "text-violet-300" : "text-violet-700"
//                                 }`}
//                               >
//                                 ✨ AI Enhanced
//                               </span>
//                               <div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
//                                 <button
//                                   type="button"
//                                   onClick={() => {
//                                     setFormData((prev) => ({
//                                       ...prev,
//                                       [field.name]: sampleEnhanced,
//                                     }));
//                                     setSampleEnhanced("");
//                                     setEnhanceField("");
//                                   }}
//                                   className={`text-xs px-2 sm:px-3 py-1 rounded-md backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
//                                     dark
//                                       ? "bg-violet-500/20 border-violet-500/30 text-violet-300 hover:bg-violet-500/30"
//                                       : "bg-violet-500/20 border-violet-500/30 text-violet-700 hover:bg-violet-500/30"
//                                   }`}
//                                 >
//                                   Use
//                                 </button>
//                                 <button
//                                   type="button"
//                                   onClick={() => {
//                                     setSampleEnhanced("");
//                                     setEnhanceField("");
//                                   }}
//                                   className={`text-xs px-2 sm:px-3 py-1 rounded-md backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
//                                     dark
//                                       ? "bg-white/8 border-white/20 text-white/70 hover:bg-white/15"
//                                       : "bg-black/8 border-black/20 text-black/70 hover:bg-black/15"
//                                   }`}
//                                 >
//                                   ×
//                                 </button>
//                               </div>
//                             </div>
//                             <p
//                               className={`text-sm leading-relaxed ${
//                                 dark ? "text-white/85" : "text-black/85"
//                               }`}
//                             >
//                               {sampleEnhanced}
//                             </p>
//                           </div>
//                         )}
//                       </motion.div>
//                     ))}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Enhanced submit button with perfect mobile optimization */}
//             <div className="flex justify-stretch sm:justify-end pt-2 sm:pt-4">
//               <button
//                 type="submit"
//                 disabled={!isFormValid() || loading}
//                 className={`w-full sm:w-auto px-6 md:px-8 py-3 md:py-3.5 font-semibold rounded-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 backdrop-blur-sm border ${
//                   dark
//                     ? "bg-gradient-to-r from-white/15 via-white/25 to-white/15 border-white/30 text-white hover:from-white/25 hover:via-white/35 hover:to-white/25 shadow-lg hover:shadow-xl"
//                     : "bg-gradient-to-r from-black/15 via-black/25 to-black/15 border-black/30 text-black hover:from-black/25 hover:via-black/35 hover:to-black/25 shadow-lg hover:shadow-xl"
//                 }`}
//               >
//                 {loading ? (
//                   <div className="flex items-center justify-center gap-2">
//                     <div
//                       className={`w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin`}
//                     />
//                     <span className="text-sm sm:text-base">Submitting...</span>
//                   </div>
//                 ) : (
//                   <span className="text-sm sm:text-base">
//                     Submit Investment Pitch
//                   </span>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
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
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [draftSaved, setDraftSaved] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [enhancing, setEnhancing] = useState(false);
//   const [sampleEnhanced, setSampleEnhanced] = useState("");
//   const [enhanceField, setEnhanceField] = useState("");
//   const { dark } = useThemeStore();

//   // Enhanced screen size detection
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   // Auto-save functionality
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const hasContent = Object.values(formData).some((value) => value.trim());

//       if (hasContent) {
//         localStorage.setItem("pitchDraft", JSON.stringify(formData));
//         setDraftSaved(true);
//         setTimeout(() => setDraftSaved(false), 2500);
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
//         const hasContent = Object.values(parsedDraft).some(
//           (value) => typeof value === "string" && value.trim()
//         );

//         if (hasContent) {
//           setFormData(parsedDraft);
//         }
//       } catch (error) {
//         console.error("Error parsing saved pitch draft:", error);
//         localStorage.removeItem("pitchDraft");
//       }
//     }
//   }, []);

//   const sections = [
//     {
//       title: "Foundation",
//       fields: [
//         {
//           label: "Company Name",
//           name: "startupName",
//           placeholder: "Enter your company name...",
//           required: true,
//           maxLength: 100,
//         },
//         {
//           label: "Value Proposition",
//           name: "oneLiner",
//           placeholder: "Describe your company's core value proposition...",
//           required: true,
//           maxLength: 200,
//         },
//       ],
//     },
//     {
//       title: "Challenge & Innovation",
//       fields: [
//         {
//           label: "Market Problem",
//           name: "problem",
//           textarea: true,
//           placeholder:
//             "Define the significant problem or market inefficiency your company addresses...",
//           required: true,
//           maxLength: 800,
//         },
//         {
//           label: "Solution Overview",
//           name: "solution",
//           textarea: true,
//           placeholder:
//             "Explain how your innovation provides a superior solution...",
//           required: true,
//           maxLength: 800,
//         },
//       ],
//     },
//     {
//       title: "Market Opportunity",
//       fields: [
//         {
//           label: "Target Market",
//           name: "targetMarket",
//           textarea: true,
//           placeholder:
//             "Define your addressable market and customer segments...",
//           required: true,
//           maxLength: 600,
//         },
//         {
//           label: "Revenue Model",
//           name: "businessModel",
//           textarea: true,
//           placeholder:
//             "Outline your monetization strategy and revenue streams...",
//           required: true,
//           maxLength: 600,
//         },
//       ],
//     },
//     {
//       title: "Execution & Team",
//       fields: [
//         {
//           label: "Current Traction",
//           name: "traction",
//           textarea: true,
//           placeholder:
//             "Present key metrics, milestones, and validation achieved...",
//           required: true,
//           maxLength: 700,
//         },
//         {
//           label: "Team Overview",
//           name: "team",
//           textarea: true,
//           placeholder:
//             "Highlight leadership team and advisory board expertise...",
//           required: true,
//           maxLength: 600,
//         },
//       ],
//     },
//     {
//       title: "Market Strategy",
//       fields: [
//         {
//           label: "Go-to-Market Strategy",
//           name: "goToMarketStrategy",
//           textarea: true,
//           placeholder:
//             "Detail your customer acquisition and market penetration approach...",
//           required: true,
//           maxLength: 700,
//         },
//         {
//           label: "Competitive Analysis",
//           name: "competition",
//           textarea: true,
//           placeholder:
//             "Identify competitive landscape and articulate your differentiation...",
//           required: true,
//           maxLength: 700,
//         },
//       ],
//     },
//     {
//       title: "Investment Request",
//       fields: [
//         {
//           label: "Funding Amount",
//           name: "fundingAsk",
//           placeholder: "Specify the investment amount and round type...",
//           required: true,
//           maxLength: 200,
//         },
//         {
//           label: "Use of Funds",
//           name: "fundingUse",
//           textarea: true,
//           placeholder:
//             "Provide detailed allocation of investment across strategic priorities...",
//           required: true,
//           maxLength: 800,
//         },
//       ],
//     },
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     if (error) setError("");
//   };

//   const handleAIEnhance = async (fieldName, content) => {
//     if (!content.trim()) {
//       setError("Please enter some content to enhance");
//       return;
//     }

//     setEnhancing(true);
//     setEnhanceField(fieldName);

//     try {
//       const res = await api.post("/user/ask", {
//         content: `
//           You are an expert investment pitch writer.
//           Your job is to take the following text and:
//           1. Improve clarity, grammar, and flow for investor presentations.
//           2. Make it compelling and professionally persuasive.
//           3. Expand with relevant details that investors want to see.
//           4. Keep the tone confident yet realistic.
//           5. Return ONLY the improved version (no extra formatting or labels).

//           Context: This is for field "${fieldName}" in an investment pitch.

//           Here is the text to improve:
//           ---
//           ${content}
//           ---
//         `,
//       });
//       const enhancedContent = res.data.data.choices[0].message.content.trim();
//       setSampleEnhanced(enhancedContent);
//       setError("");
//     } catch (error) {
//       console.error("AI Enhancement error:", error);
//       setError("Failed to enhance content. Please try again.");
//     } finally {
//       setEnhancing(false);
//       setEnhanceField("");
//     }
//   };

//   const isFormValid = () => {
//     const requiredFields = sections.flatMap((section) =>
//       section.fields
//         .filter((field) => field.required)
//         .map((field) => field.name)
//     );
//     return requiredFields.every((field) => formData[field]?.trim());
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isFormValid()) {
//       setError("Please fill in all required fields.");
//       return;
//     }

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
//           "Failed to submit pitch. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClearDraft = () => {
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
//     setSuccess(false);
//     setMessage("");
//     setError("");
//     setSampleEnhanced("");
//     localStorage.removeItem("pitchDraft");
//   };

//   // Check if there's any draft content
//   const hasDraftContent = Object.values(formData).some((value) => value.trim());

//   if (success) {
//     return (
//       <div
//         className={`min-h-screen flex items-center justify-center p-4 ${
//           dark ? "bg-black" : "bg-white"
//         }`}
//       >
//         <div className="p-3 rounded-sm bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 text-sm flex items-center gap-2 backdrop-blur-sm transition-all duration-500">
//           <svg
//             className="w-4 h-4 flex-shrink-0"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//           >
//             <path
//               fillRule="evenodd"
//               d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//             />
//           </svg>
//           {message} 🎉
//         </div>
//         <button
//           onClick={handleClearDraft}
//           className={`mt-4 w-full sm:w-auto px-6 md:px-8 py-3 md:py-3.5 font-semibold rounded-sm transition-all duration-300 transform hover:scale-105 active:scale-95 backdrop-blur-sm border ${
//             dark
//               ? "bg-gradient-to-r from-white/15 via-white/25 to-white/15 border-white/30 text-white hover:from-white/25 hover:via-white/35 hover:to-white/25 shadow-lg hover:shadow-xl"
//               : "bg-gradient-to-r from-black/15 via-black/25 to-black/15 border-black/30 text-black hover:from-black/25 hover:via-black/35 hover:to-black/25 shadow-lg hover:shadow-xl"
//           }`}
//         >
//           Create New Pitch
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full min-h-screen px-2 sm:px-4 md:px-6 lg:px-0 py-2 sm:py-4 md:py-6 lg:py-0 relative overflow-hidden">
//       {/* Enhanced multi-layer glassmorphism background - FIXED to match Post component */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {/* Primary gradient orbs - First orb now empty to match Post component */}
//         <div
//           className={`absolute -top-32 -right-32 w-64 h-64 md:w-80 md:h-80 rounded-full blur-3xl transition-opacity duration-1000`}
//         ></div>

//         <div
//           className={`absolute -bottom-32 -left-32 w-72 h-72 md:w-96 md:h-96 rounded-full blur-3xl transition-opacity duration-1000 ${
//             dark
//               ? "bg-gradient-to-tr from-emerald-500/20 via-cyan-500/15 to-blue-500/25"
//               : "bg-gradient-to-tr from-emerald-400/25 via-cyan-400/20 to-blue-400/30"
//           }`}
//         ></div>

//         {/* Secondary accent orbs for depth */}
//         <div
//           className={`absolute top-1/3 right-1/4 w-48 h-48 md:w-56 md:h-56 rounded-full blur-2xl opacity-60 ${
//             dark
//               ? "bg-gradient-to-br from-orange-500/15 to-red-500/10"
//               : "bg-gradient-to-br from-orange-400/20 to-red-400/15"
//           }`}
//         ></div>

//         <div
//           className={`absolute bottom-1/3 left-1/4 w-40 h-40 md:w-48 md:h-48 rounded-full blur-2xl opacity-40 ${
//             dark
//               ? "bg-gradient-to-br from-violet-500/20 to-indigo-500/15"
//               : "bg-gradient-to-br from-violet-400/25 to-indigo-400/20"
//           }`}
//         ></div>
//       </div>

//       <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-none xl:max-w-none mx-auto lg:mx-0 relative z-10">
//         <div
//           className={`rounded-sm md:rounded-xl lg:rounded-none transition-all duration-700 hover:scale-[1.01] lg:hover:scale-100  border lg:border-none shadow-2xl lg:shadow-none ${
//             !dark
//               ? "border-white/25 bg-white/8 shadow-black/10"
//               : "border-white/15 bg-black/8 shadow-white/5"
//           }`}
//           style={{
//             backdropFilter: "blur(24px) saturate(200%)",
//             WebkitBackdropFilter: "blur(24px) saturate(200%)",
//             boxShadow: dark
//               ? "0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
//               : "0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
//           }}
//         >
//           {/* Professional and elegant header: Clean, minimalist design with subtle blue accents for trust and sophistication */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className={`px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-5 border-b lg:border-b-0 backdrop-blur-md rounded-t-lg md:rounded-t-xl lg:rounded-t-none relative overflow-hidden ${
//               dark
//                 ? "border-blue-200/10 bg-gradient-to-r from-gray-900/80 via-black/80 to-gray-900/80"
//                 : "border-blue-800/10 bg-gradient-to-r from-gray-50/80 via-white/80 to-gray-50/80"
//             }`}
//           >
//             {/* Subtle elegant overlay */}
//             <div
//               className={`absolute inset-0 bg-gradient-to-r ${
//                 dark
//                   ? "from-transparent via-blue-900/5 to-transparent"
//                   : "from-transparent via-blue-100/5 to-transparent"
//               } opacity-50`}
//             ></div>

//             <div className="flex items-center justify-between relative z-10">
//               <div className="flex items-center gap-3 sm:gap-4">
//                 {/* Professional icon (briefcase for business focus) */}
//                 <svg
//                   className={`w-5 h-5 sm:w-6 sm:h-6 ${
//                     dark ? "text-blue-300" : "text-blue-700"
//                   }`}
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                   />
//                 </svg>
//                 <h2
//                   className={`text-lg sm:text-xl md:text-2xl font-serif font-semibold tracking-wide ${
//                     dark ? "text-white/95" : "text-black/95"
//                   }`}
//                 >
//                   Investment Pitch Builder
//                 </h2>
//               </div>

//               <div className="flex items-center gap-3 sm:gap-4">
//                 {/* Refined draft saved indicator */}
//                 <AnimatePresence>
//                   {draftSaved && (
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0.95 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       exit={{ opacity: 0, scale: 0.95 }}
//                       className={`text-xs sm:text-sm flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm border transition-all duration-300 ${
//                         dark
//                           ? "text-blue-300 bg-blue-500/10 border-blue-500/20"
//                           : "text-blue-700 bg-blue-500/10 border-blue-500/20"
//                       }`}
//                     >
//                       <svg
//                         className="w-3 h-3 sm:w-4 sm:h-4"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                         />
//                       </svg>
//                       <span className="hidden sm:inline">Draft Saved</span>
//                       <span className="sm:hidden">Saved</span>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 {/* Elegant clear draft button */}
//                 {hasDraftContent && (
//                   <button
//                     type="button"
//                     onClick={handleClearDraft}
//                     className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm border ${
//                       dark
//                         ? "bg-white/5 text-white/85 hover:bg-white/10 border-white/20 hover:border-white/30"
//                         : "bg-black/5 text-black/85 hover:bg-black/10 border-black/20 hover:border-black/30"
//                     }`}
//                     title="Clear all draft content"
//                   >
//                     <div className="flex items-center gap-1.5">
//                       <svg
//                         className="w-3 h-3 sm:w-4 sm:h-4"
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
//                       <span className="hidden sm:inline">Clear Draft</span>
//                       <span className="sm:hidden">Clear</span>
//                     </div>
//                   </button>
//                 )}
//               </div>
//             </div>
//           </motion.div>

//           <form
//             onSubmit={handleSubmit}
//             className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-3 sm:space-y-4 md:space-y-6"
//           >
//             {/* Enhanced error message */}
//             {error && (
//               <div className="p-3 rounded-sm bg-red-500/10 border border-red-500/25 text-red-600 text-sm backdrop-blur-sm">
//                 {error}
//               </div>
//             )}

//             {/* Single Page Form Sections */}
//             <div className="space-y-6 sm:space-y-8 md:space-y-10">
//               {sections.map((section, sectionIndex) => (
//                 <motion.div
//                   key={section.title}
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: sectionIndex * 0.1, duration: 0.6 }}
//                   className="space-y-4 sm:space-y-6"
//                 >
//                   {/* Section Header */}
//                   <div className="mb-4 sm:mb-6">
//                     <h3
//                       className={`text-lg sm:text-xl font-serif font-semibold mb-2 ${
//                         dark ? "text-white/90" : "text-black/90"
//                       }`}
//                     >
//                       {section.title}
//                     </h3>
//                     <div
//                       className={`w-8 sm:w-12 h-px ${
//                         dark ? "bg-white/30" : "bg-black/30"
//                       }`}
//                     />
//                   </div>

//                   {/* Section Fields */}
//                   <div className="space-y-4 sm:space-y-6">
//                     {section.fields.map((field, fieldIndex) => (
//                       <motion.div
//                         key={field.name}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{
//                           delay: sectionIndex * 0.1 + fieldIndex * 0.05,
//                           duration: 0.4,
//                         }}
//                         className="space-y-2"
//                       >
//                         <label
//                           className={`block text-sm font-medium ${
//                             dark ? "text-white/85" : "text-black/85"
//                           }`}
//                         >
//                           {field.label}
//                           {field.required && (
//                             <span className="text-red-500 ml-1">*</span>
//                           )}
//                         </label>

//                         <div className="relative">
//                           {field.textarea ? (
//                             <textarea
//                               name={field.name}
//                               rows={isMobile ? 4 : 5}
//                               maxLength={field.maxLength}
//                               value={formData[field.name]}
//                               onChange={handleChange}
//                               placeholder={field.placeholder}
//                               className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-14 rounded-sm resize-y min-h-[120px] max-h-[400px] text-sm sm:text-base border transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm ${
//                                 dark
//                                   ? "bg-white/5 border-white/20 text-white/95 focus:border-blue-500/50 focus:ring-blue-500/15 placeholder-white/50 hover:bg-white/8"
//                                   : "bg-black/5 border-black/20 text-black/95 focus:border-blue-600/50 focus:ring-blue-600/15 placeholder-black/50 hover:bg-black/8"
//                               }`}
//                               required={field.required}
//                             />
//                           ) : (
//                             <input
//                               type="text"
//                               name={field.name}
//                               maxLength={field.maxLength}
//                               value={formData[field.name]}
//                               onChange={handleChange}
//                               placeholder={field.placeholder}
//                               className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-sm text-sm sm:text-base border transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm ${
//                                 dark
//                                   ? "bg-white/5 border-white/20 text-white/95 focus:border-blue-500/50 focus:ring-blue-500/15 placeholder-white/50 hover:bg-white/8"
//                                   : "bg-black/5 border-black/20 text-black/95 focus:border-blue-600/50 focus:ring-blue-600/15 placeholder-black/50 hover:bg-black/8"
//                               }`}
//                               required={field.required}
//                             />
//                           )}

//                           {/* Refined AI enhance button */}
//                           {field.textarea && (
//                             <button
//                               type="button"
//                               onClick={() =>
//                                 handleAIEnhance(
//                                   field.name,
//                                   formData[field.name]
//                                 )
//                               }
//                               disabled={
//                                 !formData[field.name]?.trim() || enhancing
//                               }
//                               className={`absolute top-2 right-2 sm:top-3 sm:right-3 p-2 rounded-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group backdrop-blur-sm border ${
//                                 dark
//                                   ? "bg-blue-500/10 border-blue-500/20 text-white hover:bg-blue-500/20 hover:border-blue-500/30"
//                                   : "bg-blue-600/10 border-blue-600/20 text-black hover:bg-blue-600/20 hover:border-blue-600/30"
//                               }`}
//                               title="Enhance content with AI"
//                             >
//                               {enhancing && enhanceField === field.name ? (
//                                 <div className="animate-spin">
//                                   <svg
//                                     className="w-4 h-4"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                   >
//                                     <circle
//                                       cx="12"
//                                       cy="12"
//                                       r="10"
//                                       stroke="currentColor"
//                                       strokeWidth="4"
//                                       className="opacity-25"
//                                     ></circle>
//                                     <path
//                                       fill="currentColor"
//                                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                       className="opacity-75"
//                                     ></path>
//                                   </svg>
//                                 </div>
//                               ) : (
//                                 <svg
//                                   className="w-4 h-4 transition-transform group-hover:scale-110"
//                                   fill="none"
//                                   viewBox="0 0 24 24"
//                                   stroke="currentColor"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M13 10V3L4 14h7v7l9-11h-7z"
//                                   />
//                                 </svg>
//                               )}
//                             </button>
//                           )}
//                         </div>

//                         {/* Character count */}
//                         <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1">
//                           {field.maxLength && (
//                             <span
//                               className={`text-xs xs:ml-auto ${
//                                 formData[field.name]?.length >=
//                                 field.maxLength * 0.9
//                                   ? "text-orange-500"
//                                   : formData[field.name]?.length >=
//                                     field.maxLength
//                                   ? "text-red-500"
//                                   : dark
//                                   ? "text-white/60"
//                                   : "text-black/60"
//                               }`}
//                             >
//                               {formData[field.name]?.length || 0}/
//                               {field.maxLength}
//                             </span>
//                           )}
//                           {enhancing && enhanceField === field.name && (
//                             <span
//                               className={`text-xs px-2 py-0.5 rounded-full backdrop-blur-sm ${
//                                 dark
//                                   ? "text-blue-300 bg-blue-500/10"
//                                   : "text-blue-700 bg-blue-500/10"
//                               }`}
//                             >
//                               Enhancing...
//                             </span>
//                           )}
//                         </div>

//                         {/* Refined AI sample display */}
//                         {sampleEnhanced && enhanceField === field.name && (
//                           <div
//                             className={`mt-3 p-3 sm:p-4 rounded-sm border backdrop-blur-sm transition-all duration-500 animate-in slide-in-from-top-2 ${
//                               dark
//                                 ? "border-blue-500/20 bg-blue-500/5"
//                                 : "border-blue-600/20 bg-blue-600/5"
//                             }`}
//                           >
//                             <div className="flex justify-between items-start mb-2 gap-2">
//                               <span
//                                 className={`text-xs font-medium flex items-center gap-1 ${
//                                   dark ? "text-blue-300" : "text-blue-700"
//                                 }`}
//                               >
//                                 ✨ AI Enhanced Version
//                               </span>
//                               <div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
//                                 <button
//                                   type="button"
//                                   onClick={() => {
//                                     setFormData((prev) => ({
//                                       ...prev,
//                                       [field.name]: sampleEnhanced,
//                                     }));
//                                     setSampleEnhanced("");
//                                     setEnhanceField("");
//                                   }}
//                                   className={`text-xs px-2 sm:px-3 py-1 rounded-md backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
//                                     dark
//                                       ? "bg-blue-500/10 border-blue-500/20 text-blue-300 hover:bg-blue-500/20"
//                                       : "bg-blue-600/10 border-blue-600/20 text-blue-700 hover:bg-blue-600/20"
//                                   }`}
//                                 >
//                                   Apply
//                                 </button>
//                                 <button
//                                   type="button"
//                                   onClick={() => {
//                                     setSampleEnhanced("");
//                                     setEnhanceField("");
//                                   }}
//                                   className={`text-xs px-2 sm:px-3 py-1 rounded-md backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
//                                     dark
//                                       ? "bg-white/5 border-white/20 text-white/70 hover:bg-white/10"
//                                       : "bg-black/5 border-black/20 text-black/70 hover:bg-black/10"
//                                   }`}
//                                 >
//                                   ×
//                                 </button>
//                               </div>
//                             </div>
//                             <p
//                               className={`text-sm leading-relaxed ${
//                                 dark ? "text-white/85" : "text-black/85"
//                               }`}
//                             >
//                               {sampleEnhanced}
//                             </p>
//                           </div>
//                         )}
//                       </motion.div>
//                     ))}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Refined submit button */}
//             <div className="flex justify-stretch sm:justify-end pt-2 sm:pt-4">
//               <button
//                 type="submit"
//                 disabled={!isFormValid() || loading}
//                 className={`w-full sm:w-auto px-6 md:px-8 py-3 md:py-3.5 font-semibold rounded-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 backdrop-blur-sm border ${
//                   dark
//                     ? "bg-white/10 border-white/20 text-white hover:bg-white/15 hover:border-white/30 shadow-lg hover:shadow-xl"
//                     : "bg-black/10 border-black/20 text-black hover:bg-black/15 hover:border-black/30 shadow-lg hover:shadow-xl"
//                 }`}
//               >
//                 {loading ? (
//                   <div className="flex items-center justify-center gap-2">
//                     <div
//                       className={`w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin`}
//                     />
//                     <span className="text-sm sm:text-base">Submitting...</span>
//                   </div>
//                 ) : (
//                   <span className="text-sm sm:text-base">
//                     Submit Investment Pitch
//                   </span>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
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
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [draftSaved, setDraftSaved] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [enhancing, setEnhancing] = useState(false);
//   const [sampleEnhanced, setSampleEnhanced] = useState("");
//   const [enhanceField, setEnhanceField] = useState("");
//   const { dark } = useThemeStore();

//   // Enhanced screen size detection
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   // Auto-save functionality
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const hasContent = Object.values(formData).some((value) => value.trim());

//       if (hasContent) {
//         localStorage.setItem("pitchDraft", JSON.stringify(formData));
//         setDraftSaved(true);
//         setTimeout(() => setDraftSaved(false), 2500);
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
//         const hasContent = Object.values(parsedDraft).some(
//           (value) => typeof value === "string" && value.trim()
//         );

//         if (hasContent) {
//           setFormData(parsedDraft);
//         }
//       } catch (error) {
//         console.error("Error parsing saved pitch draft:", error);
//         localStorage.removeItem("pitchDraft");
//       }
//     }
//   }, []);

//   const sections = [
//     {
//       title: "Foundation",
//       fields: [
//         {
//           label: "Company Name",
//           name: "startupName",
//           placeholder: "Enter your company name...",
//           required: true,
//           maxLength: 100,
//         },
//         {
//           label: "Value Proposition",
//           name: "oneLiner",
//           placeholder: "Describe your company's core value proposition...",
//           required: true,
//           maxLength: 200,
//         },
//       ],
//     },
//     {
//       title: "Challenge & Innovation",
//       fields: [
//         {
//           label: "Market Problem",
//           name: "problem",
//           textarea: true,
//           placeholder:
//             "Define the significant problem or market inefficiency your company addresses...",
//           required: true,
//           maxLength: 800,
//         },
//         {
//           label: "Solution Overview",
//           name: "solution",
//           textarea: true,
//           placeholder:
//             "Explain how your innovation provides a superior solution...",
//           required: true,
//           maxLength: 800,
//         },
//       ],
//     },
//     {
//       title: "Market Opportunity",
//       fields: [
//         {
//           label: "Target Market",
//           name: "targetMarket",
//           textarea: true,
//           placeholder:
//             "Define your addressable market and customer segments...",
//           required: true,
//           maxLength: 600,
//         },
//         {
//           label: "Revenue Model",
//           name: "businessModel",
//           textarea: true,
//           placeholder:
//             "Outline your monetization strategy and revenue streams...",
//           required: true,
//           maxLength: 600,
//         },
//       ],
//     },
//     {
//       title: "Execution & Team",
//       fields: [
//         {
//           label: "Current Traction",
//           name: "traction",
//           textarea: true,
//           placeholder:
//             "Present key metrics, milestones, and validation achieved...",
//           required: true,
//           maxLength: 700,
//         },
//         {
//           label: "Team Overview",
//           name: "team",
//           textarea: true,
//           placeholder:
//             "Highlight leadership team and advisory board expertise...",
//           required: true,
//           maxLength: 600,
//         },
//       ],
//     },
//     {
//       title: "Market Strategy",
//       fields: [
//         {
//           label: "Go-to-Market Strategy",
//           name: "goToMarketStrategy",
//           textarea: true,
//           placeholder:
//             "Detail your customer acquisition and market penetration approach...",
//           required: true,
//           maxLength: 700,
//         },
//         {
//           label: "Competitive Analysis",
//           name: "competition",
//           textarea: true,
//           placeholder:
//             "Identify competitive landscape and articulate your differentiation...",
//           required: true,
//           maxLength: 700,
//         },
//       ],
//     },
//     {
//       title: "Investment Request",
//       fields: [
//         {
//           label: "Funding Amount",
//           name: "fundingAsk",
//           placeholder: "Specify the investment amount and round type...",
//           required: true,
//           maxLength: 200,
//         },
//         {
//           label: "Use of Funds",
//           name: "fundingUse",
//           textarea: true,
//           placeholder:
//             "Provide detailed allocation of investment across strategic priorities...",
//           required: true,
//           maxLength: 800,
//         },
//       ],
//     },
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     if (error) setError("");
//   };

//   const handleAIEnhance = async (fieldName, content) => {
//     if (!content.trim()) {
//       setError("Please enter some content to enhance");
//       return;
//     }

//     setEnhancing(true);
//     setEnhanceField(fieldName);

//     try {
//       const res = await api.post("/user/ask", {
//         content: `
//           You are an expert investment pitch writer.
//           Your job is to take the following text and:
//           1. Improve clarity, grammar, and flow for investor presentations.
//           2. Make it compelling and professionally persuasive.
//           3. Expand with relevant details that investors want to see.
//           4. Keep the tone confident yet realistic.
//           5. Return ONLY the improved version (no extra formatting or labels).

//           Context: This is for field "${fieldName}" in an investment pitch.

//           Here is the text to improve:
//           ---
//           ${content}
//           ---
//         `,
//       });
//       const enhancedContent = res.data.data.choices[0].message.content.trim();
//       setSampleEnhanced(enhancedContent);
//       setError("");
//     } catch (error) {
//       console.error("AI Enhancement error:", error);
//       setError("Failed to enhance content. Please try again.");
//     } finally {
//       setEnhancing(false);
//       setEnhanceField("");
//     }
//   };

//   const isFormValid = () => {
//     const requiredFields = sections.flatMap((section) =>
//       section.fields
//         .filter((field) => field.required)
//         .map((field) => field.name)
//     );
//     return requiredFields.every((field) => formData[field]?.trim());
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isFormValid()) {
//       setError("Please fill in all required fields.");
//       return;
//     }

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
//           "Failed to submit pitch. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClearDraft = () => {
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
//     setSuccess(false);
//     setMessage("");
//     setError("");
//     setSampleEnhanced("");
//     localStorage.removeItem("pitchDraft");
//   };

//   // Check if there's any draft content
//   const hasDraftContent = Object.values(formData).some((value) => value.trim());

//   if (success) {
//     return (
//       <div
//         className={`min-h-screen flex items-center justify-center p-4 ${
//           dark ? "bg-gray-900" : "bg-gray-50"
//         }`}
//       >
//         <div className="p-4 rounded-sm bg-green-50 border border-green-200 text-green-800 text-sm flex items-center gap-2 transition-all duration-300">
//           <svg
//             className="w-4 h-4 flex-shrink-0"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//           >
//             <path
//               fillRule="evenodd"
//               d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//             />
//           </svg>
//           {message}
//         </div>
//         <button
//           onClick={handleClearDraft}
//           className={`mt-4 w-full sm:w-auto px-6 py-3 font-medium rounded-sm transition-all duration-300 hover:bg-blue-600/10 border border-transparent hover:border-blue-300 text-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/10 dark:hover:border-blue-700`}
//         >
//           Create New Pitch
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`overflow-y-auto scrollbar-hidden min-h-screen px-1 mb-10 md:px-8 lg:px-1 py-1 md:py-10 lg:py-2 relative ${
//         dark ? "bg-black" : "bg-gray-50"
//       }`}
//     >
//       <div className="max-w-6xl mx-auto relative z-10">
//         <div
//           className={`rounded-xl transition-all duration-300 shadow-sm ${
//             dark ? "border-black bg-black" : "border-gray-500 bg-white/10"
//           }`}
//           style={{
//             backdropFilter: "blur(8px)",
//           }}
//         >
//           <div
//             className={`px-6 lg:px-6 py-4 border-b rounded-t-xl ${
//               dark ? "border-black bg-black" : "border-gray-200 bg-gray-100/30"
//             }`}
//           >
//             <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 relative">
//               <h2
//                 className={`text-xl font-semibold text-center order-1 sm:order-none flex-1 sm:flex-none ${
//                   dark ? "text-white" : "text-gray-900"
//                 }`}
//               >
//                 Prevail. Purpose. Progress.
//               </h2>
//               {hasDraftContent && (
//                 <div className="flex items-center gap-4 order-2 sm:order-none">
//                   {draftSaved && (
//                     <div
//                       className={`text-xs flex items-center gap-1 px-3 py-1 rounded-full border ${
//                         dark
//                           ? "text-blue-300 border-blue-500/30 bg-blue-500/10"
//                           : "text-blue-700 border-blue-500/30 bg-blue-500/10"
//                       }`}
//                     >
//                       <svg
//                         className="w-3 h-3"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                         />
//                       </svg>
//                       Draft Saved
//                     </div>
//                   )}
//                   {hasDraftContent && (
//                     <button
//                       type="button"
//                       onClick={handleClearDraft}
//                       className={`text-xs px-3 py-1 rounded-full border transition duration-300 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 ${
//                         dark
//                           ? "text-gray-300 border-gray-600"
//                           : "text-gray-700 border-gray-300"
//                       }`}
//                     >
//                       Clear Draft
//                     </button>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="lg:p-6 p-2 space-y-8">
//             {error && (
//               <div className="p-4 rounded-sm bg-red-50 border border-red-200 text-red-800 text-sm">
//                 {error}
//               </div>
//             )}

//             <div className="space-y-8">
//               {sections.map((section, sectionIndex) => (
//                 <div key={section.title} className="space-y-4">
//                   <h3
//                     className={`text-lg font-medium ${
//                       dark ? "text-white" : "text-gray-900"
//                     }`}
//                   >
//                     {section.title}
//                   </h3>
//                   <div className="space-y-6">
//                     {section.fields.map((field) => (
//                       <div key={field.name} className="space-y-1">
//                         <label
//                           className={`block text-sm font-medium ${
//                             dark ? "text-gray-300" : "text-gray-700"
//                           }`}
//                         >
//                           {field.label}
//                           {field.required && (
//                             <span className="text-red-500 ml-1">*</span>
//                           )}
//                         </label>
//                         <div className="relative">
//                           {field.textarea ? (
//                             <textarea
//                               name={field.name}
//                               rows={isMobile ? 4 : 5}
//                               maxLength={field.maxLength}
//                               value={formData[field.name]}
//                               onChange={handleChange}
//                               placeholder={field.placeholder}
//                               className={`w-full px-4 py-3 rounded-sm text-sm border transition duration-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 ${
//                                 dark
//                                   ? "bg-black border-gray-700 text-white placeholder-gray-400"
//                                   : "bg-white/10 border-gray-300 text-gray-900 placeholder-gray-500"
//                               }`}
//                               required={field.required}
//                             />
//                           ) : (
//                             <input
//                               type="text"
//                               name={field.name}
//                               maxLength={field.maxLength}
//                               value={formData[field.name]}
//                               onChange={handleChange}
//                               placeholder={field.placeholder}
//                               className={`w-full px-4 py-3 rounded-sm text-sm border transition duration-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 ${
//                                 dark
//                                   ? "bg-black border-gray-700 text-white placeholder-gray-400"
//                                   : "bg-white/10 border-gray-300 text-gray-900 placeholder-gray-500"
//                               }`}
//                               required={field.required}
//                             />
//                           )}
//                           {field.textarea && (
//                             <button
//                               type="button"
//                               onClick={() =>
//                                 handleAIEnhance(
//                                   field.name,
//                                   formData[field.name]
//                                 )
//                               }
//                               disabled={
//                                 !formData[field.name]?.trim() || enhancing
//                               }
//                               className={`absolute top-3 right-3 p-1 rounded-md transition duration-300 disabled:opacity-50 ${
//                                 dark
//                                   ? "text-gray-400 hover:text-blue-300"
//                                   : "text-gray-500 hover:text-blue-600"
//                               }`}
//                               title="Enhance with AI"
//                             >
//                               {enhancing && enhanceField === field.name ? (
//                                 <svg
//                                   className="w-4 h-4 animate-spin"
//                                   fill="none"
//                                   viewBox="0 0 24 24"
//                                 >
//                                   <circle
//                                     cx="12"
//                                     cy="12"
//                                     r="10"
//                                     stroke="currentColor"
//                                     strokeWidth="4"
//                                     className="opacity-25"
//                                   />
//                                   <path
//                                     fill="currentColor"
//                                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                     className="opacity-75"
//                                   />
//                                 </svg>
//                               ) : (
//                                 <svg
//                                   className="w-4 h-4"
//                                   fill="none"
//                                   viewBox="0 0 24 24"
//                                   stroke="currentColor"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M13 10V3L4 14h7v7l9-11h-7z"
//                                   />
//                                 </svg>
//                               )}
//                             </button>
//                           )}
//                         </div>
//                         <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
//                           {field.maxLength && (
//                             <span
//                               className={`${
//                                 formData[field.name]?.length >=
//                                 field.maxLength * 0.9
//                                   ? "text-orange-500"
//                                   : ""
//                               }`}
//                             >
//                               {formData[field.name]?.length || 0}/
//                               {field.maxLength}
//                             </span>
//                           )}
//                           {enhancing && enhanceField === field.name && (
//                             <span>Enhancing...</span>
//                           )}
//                         </div>
//                         {sampleEnhanced && enhanceField === field.name && (
//                           <div
//                             className={`mt-2 p-4 rounded-sm border ${
//                               dark
//                                 ? "border-gray-700 bg-gray-800/50"
//                                 : "border-gray-200 bg-gray-50/50"
//                             }`}
//                           >
//                             <div className="flex justify-between mb-2">
//                               <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                                 AI Enhanced Version
//                               </span>
//                               <div className="flex gap-2">
//                                 <button
//                                   type="button"
//                                   onClick={() => {
//                                     setFormData((prev) => ({
//                                       ...prev,
//                                       [field.name]: sampleEnhanced,
//                                     }));
//                                     setSampleEnhanced("");
//                                     setEnhanceField("");
//                                   }}
//                                   className="text-xs px-3 py-1 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-300 hover:bg-blue-500/20 transition duration-300"
//                                 >
//                                   Apply
//                                 </button>
//                                 <button
//                                   type="button"
//                                   onClick={() => {
//                                     setSampleEnhanced("");
//                                     setEnhanceField("");
//                                   }}
//                                   className="text-xs px-3 py-1 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition duration-300"
//                                 >
//                                   Dismiss
//                                 </button>
//                               </div>
//                             </div>
//                             <p className="text-sm text-gray-800 dark:text-gray-200">
//                               {sampleEnhanced}
//                             </p>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="flex justify-end pt-6">
//               <button
//                 type="submit"
//                 disabled={!isFormValid() || loading}
//                 className={`px-6 py-3 font-medium rounded-sm transition duration-300 disabled:opacity-50 ${
//                   dark
//                     ? "bg-blue-600 text-white hover:bg-blue-700"
//                     : "bg-blue-600 text-white hover:bg-blue-700"
//                 }`}
//               >
//                 {loading ? "Submitting..." : "Submit Pitch"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PitchForm;

// import React, { useState, useEffect } from "react";
// import api from "../utils/api1";
// import useThemeStore from "../store/themeStore";

// const PitchForm = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({
//     // Basic Info
//     startupName: "",
//     oneLiner: "",
//     problem: "",
//     solution: "",

//     // Market & Customer
//     targetMarket: "",
//     customerSegments: [{ segmentName: "", size: 0, painPoints: "" }],
//     market: {
//       totalMarketSize: 0,
//       serviceableMarketSize: 0,
//       targetMarketSize: 0,
//       growthRatePercent: 0,
//     },
//     competition: "",
//     competitors: [{ name: "", website: "", strength: "", weakness: "" }],

//     // Business Model
//     businessModel: "",
//     traction: "",
//     productMetrics: {
//       monthlyActiveUsers: 0,
//       downloads: 0,
//       repeatCustomerRatePercent: 0,
//       keyAchievements: [""],
//     },
//     goToMarketStrategy: "",

//     // Team
//     founderName: "",
//     founderEmail: "",
//     teamMembers: [{ name: "", role: "", experienceYears: 0, linkedIn: "" }],

//     // Financials
//     financials: {
//       revenueLastYear: 0,
//       revenueThisYear: 0,
//       netProfit: 0,
//       grossMarginPercent: 0,
//       customerAcquisitionCost: 0,
//       lifetimeValue: 0,
//       valuation: 0,
//     },

//     // Funding
//     fundingDetails: {
//       fundingAskAmount: 0,
//       equityOfferedPercent: 0,
//       previousFundingRaised: 0,
//     },
//     valuationHistory: [],

//     // Milestones
//     milestones: [
//       { title: "", description: "", targetDate: "", status: "pending" },
//     ],

//     // Legal
//     legal: {
//       patents: [""],
//       trademarks: [""],
//       licenses: [""],
//     },

//     // Exit Strategy
//     exitStrategy: "",

//     // Media
//     media: [],
//   });

//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [draftSaved, setDraftSaved] = useState(false);
//   const [enhancing, setEnhancing] = useState(false);
//   const [enhanceField, setEnhanceField] = useState("");
//   const [sampleEnhanced, setSampleEnhanced] = useState("");
//   const dark = useThemeStore((s) => s.dark);

//   const formSteps = [
//     {
//       id: 1,
//       title: "Foundation",
//       subtitle: "Company basics and value proposition",
//       icon: "🏢",
//     },
//     {
//       id: 2,
//       title: "Market Analysis",
//       subtitle: "Market size, customers, and competition",
//       icon: "📊",
//     },
//     {
//       id: 3,
//       title: "Business Model",
//       subtitle: "Revenue model and go-to-market strategy",
//       icon: "💼",
//     },
//     {
//       id: 4,
//       title: "Team & Execution",
//       subtitle: "Leadership team and current traction",
//       icon: "👥",
//     },
//     {
//       id: 5,
//       title: "Financials",
//       subtitle: "Revenue, costs, and key metrics",
//       icon: "💰",
//     },
//     {
//       id: 6,
//       title: "Investment",
//       subtitle: "Funding requirements and use of funds",
//       icon: "🚀",
//     },
//     {
//       id: 7,
//       title: "Strategy & Legal",
//       subtitle: "Roadmap, IP, and exit strategy",
//       icon: "⚖️",
//     },
//     {
//       id: 8,
//       title: "Media & Review",
//       subtitle: "Upload materials and final review",
//       icon: "📎",
//     },
//   ];

//   // Auto-save functionality
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const draftData = {
//         ...formData,
//         currentStep,
//         lastSaved: new Date().toISOString(),
//         completionPercentage: calculateCompletionPercentage(),
//       };

//       const hasContent =
//         JSON.stringify(formData) !== JSON.stringify(getInitialFormData());
//       if (hasContent) {
//         localStorage.setItem("advancedPitchDraft", JSON.stringify(draftData));
//         setDraftSaved(true);
//         setTimeout(() => setDraftSaved(false), 2500);
//       }
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [formData, currentStep]);

//   // Load draft on component mount
//   useEffect(() => {
//     const savedDraft = localStorage.getItem("advancedPitchDraft");
//     if (savedDraft) {
//       try {
//         const parsedDraft = JSON.parse(savedDraft);
//         setFormData(parsedDraft);
//         setCurrentStep(parsedDraft.currentStep || 1);
//       } catch (error) {
//         console.error("Error parsing saved pitch draft:", error);
//         localStorage.removeItem("advancedPitchDraft");
//       }
//     }
//   }, []);

//   const getInitialFormData = () => ({
//     startupName: "",
//     oneLiner: "",
//     problem: "",
//     solution: "",
//     targetMarket: "",
//     customerSegments: [{ segmentName: "", size: 0, painPoints: "" }],
//     market: {
//       totalMarketSize: 0,
//       serviceableMarketSize: 0,
//       targetMarketSize: 0,
//       growthRatePercent: 0,
//     },
//     competition: "",
//     competitors: [{ name: "", website: "", strength: "", weakness: "" }],
//     businessModel: "",
//     traction: "",
//     productMetrics: {
//       monthlyActiveUsers: 0,
//       downloads: 0,
//       repeatCustomerRatePercent: 0,
//       keyAchievements: [""],
//     },
//     goToMarketStrategy: "",
//     founderName: "",
//     founderEmail: "",
//     teamMembers: [{ name: "", role: "", experienceYears: 0, linkedIn: "" }],
//     financials: {
//       revenueLastYear: 0,
//       revenueThisYear: 0,
//       netProfit: 0,
//       grossMarginPercent: 0,
//       customerAcquisitionCost: 0,
//       lifetimeValue: 0,
//       valuation: 0,
//     },
//     fundingDetails: {
//       fundingAskAmount: 0,
//       equityOfferedPercent: 0,
//       previousFundingRaised: 0,
//     },
//     valuationHistory: [],
//     milestones: [
//       { title: "", description: "", targetDate: "", status: "pending" },
//     ],
//     legal: {
//       patents: [""],
//       trademarks: [""],
//       licenses: [""],
//     },
//     exitStrategy: "",
//     media: [],
//   });

//   const calculateCompletionPercentage = () => {
//     const totalFields = 35; // Approximate total required fields
//     let completedFields = 0;

//     // Count completed basic fields
//     if (formData.startupName) completedFields++;
//     if (formData.oneLiner) completedFields++;
//     if (formData.problem) completedFields++;
//     if (formData.solution) completedFields++;
//     if (formData.targetMarket) completedFields++;
//     if (formData.businessModel) completedFields++;
//     if (formData.traction) completedFields++;
//     if (formData.goToMarketStrategy) completedFields++;
//     if (formData.competition) completedFields++;
//     if (formData.founderName) completedFields++;
//     if (formData.founderEmail) completedFields++;
//     if (formData.exitStrategy) completedFields++;

//     // Count market data
//     if (formData.market.totalMarketSize > 0) completedFields++;
//     if (formData.market.serviceableMarketSize > 0) completedFields++;
//     if (formData.market.targetMarketSize > 0) completedFields++;
//     if (formData.market.growthRatePercent > 0) completedFields++;

//     // Count financial data
//     Object.values(formData.financials).forEach((value) => {
//       if (value > 0) completedFields++;
//     });

//     // Count funding details
//     Object.values(formData.fundingDetails).forEach((value) => {
//       if (value > 0) completedFields++;
//     });

//     return Math.round((completedFields / totalFields) * 100);
//   };

//   const handleChange = (field, value, index = null, subField = null) => {
//     setFormData((prev) => {
//       if (index !== null && subField) {
//         // Handle array fields with subfields
//         const newArray = [...prev[field]];
//         newArray[index] = { ...newArray[index], [subField]: value };
//         return { ...prev, [field]: newArray };
//       } else if (index !== null) {
//         // Handle simple array fields
//         const newArray = [...prev[field]];
//         newArray[index] = value;
//         return { ...prev, [field]: newArray };
//       } else if (subField) {
//         // Handle nested object fields
//         return { ...prev, [field]: { ...prev[field], [subField]: value } };
//       } else {
//         // Handle simple fields
//         return { ...prev, [field]: value };
//       }
//     });
//     if (error) setError("");
//   };

//   const addArrayItem = (fieldName, template) => {
//     setFormData((prev) => ({
//       ...prev,
//       [fieldName]: [...prev[fieldName], template],
//     }));
//   };

//   const removeArrayItem = (fieldName, index) => {
//     setFormData((prev) => ({
//       ...prev,
//       [fieldName]: prev[fieldName].filter((_, i) => i !== index),
//     }));
//   };

//   const handleAIEnhance = async (fieldName, content) => {
//     if (!content.trim()) {
//       setError("Please enter some content to enhance");
//       return;
//     }

//     setEnhancing(true);
//     setEnhanceField(fieldName);

//     try {
//       const res = await api.post("/user/ask", {
//         content: `
//           You are an expert investment pitch writer.
//           Your job is to take the following text and:
//           1. Improve clarity, grammar, and flow for investor presentations.
//           2. Make it compelling and professionally persuasive.
//           3. Expand with relevant details that investors want to see.
//           4. Keep the tone confident yet realistic.
//           5. Return ONLY the improved version (no extra formatting or labels).

//           Context: This is for field "${fieldName}" in an investment pitch.

//           Here is the text to improve:
//           ---
//           ${content}
//           ---
//         `,
//       });
//       const enhancedContent = res.data.data.choices[0].message.content.trim();
//       setSampleEnhanced(enhancedContent);
//       setError("");
//     } catch (error) {
//       console.error("AI Enhancement error:", error);
//       setError("Failed to enhance content. Please try again.");
//     } finally {
//       setEnhancing(false);
//       setEnhanceField("");
//     }
//   };

//   const validateStep = (step) => {
//     switch (step) {
//       case 1:
//         return (
//           formData.startupName &&
//           formData.oneLiner &&
//           formData.problem &&
//           formData.solution
//         );
//       case 2:
//         return (
//           formData.targetMarket &&
//           formData.competition &&
//           formData.competitors.some((c) => c.name)
//         );
//       case 3:
//         return formData.businessModel && formData.goToMarketStrategy;
//       case 4:
//         return (
//           formData.founderName && formData.founderEmail && formData.traction
//         );
//       case 5:
//         return formData.financials.revenueThisYear >= 0;
//       case 6:
//         return (
//           formData.fundingDetails.fundingAskAmount > 0 &&
//           formData.fundingDetails.equityOfferedPercent > 0
//         );
//       case 7:
//         return formData.exitStrategy;
//       case 8:
//         return true; // Final review step
//       default:
//         return true;
//     }
//   };

//   const nextStep = () => {
//     if (validateStep(currentStep)) {
//       setCurrentStep((prev) => Math.min(prev + 1, formSteps.length));
//       setError("");
//     } else {
//       setError("Please complete all required fields before proceeding.");
//     }
//   };

//   const prevStep = () => {
//     setCurrentStep((prev) => Math.max(prev - 1, 1));
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Prepare data for submission according to schema
//     const submissionData = {
//       startupName: formData.startupName,
//       oneLiner: formData.oneLiner,
//       problem: formData.problem,
//       solution: formData.solution,
//       targetMarket: formData.targetMarket,
//       customerSegments: formData.customerSegments.filter(
//         (cs) => cs.segmentName
//       ),
//       market: formData.market,
//       competition: formData.competition,
//       competitors: formData.competitors.filter((c) => c.name),
//       businessModel: formData.businessModel,
//       traction: formData.traction,
//       productMetrics: formData.productMetrics,
//       goToMarketStrategy: formData.goToMarketStrategy,
//       founderName: formData.founderName,
//       founderEmail: formData.founderEmail,
//       teamMembers: formData.teamMembers.filter((tm) => tm.name),
//       financials: formData.financials,
//       fundingDetails: formData.fundingDetails,
//       valuationHistory: formData.valuationHistory,
//       milestones: formData.milestones.filter((m) => m.title),
//       legal: {
//         patents: formData.legal.patents.filter((p) => p),
//         trademarks: formData.legal.trademarks.filter((t) => t),
//         licenses: formData.legal.licenses.filter((l) => l),
//       },
//       exitStrategy: formData.exitStrategy,
//       media: formData.media,
//     };

//     setLoading(true);
//     setError("");

//     try {
//       const res = await api.post("/user/posts/submitpitch", submissionData);
//       setMessage(res.data.message);
//       setSuccess(true);
//       localStorage.removeItem("advancedPitchDraft");
//     } catch (error) {
//       setError(
//         error.response?.data?.message ||
//           "Failed to submit pitch. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClearDraft = () => {
//     setFormData(getInitialFormData());
//     setCurrentStep(1);
//     setSuccess(false);
//     setMessage("");
//     setError("");
//     setSampleEnhanced("");
//     localStorage.removeItem("advancedPitchDraft");
//   };

//   // Success screen
//   if (success) {
//     return (
//       <div
//         className={`min-h-screen flex items-center justify-center p-4 ${
//           dark ? "bg-gray-900" : "bg-gray-50"
//         }`}
//       >
//         <div className="max-w-md w-full text-center">
//           <div className="p-8 rounded-sm bg-green-50 border border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-700 dark:text-green-300">
//             <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
//               <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                 />
//               </svg>
//             </div>
//             <h3 className="text-lg font-semibold mb-2">
//               Pitch Submitted Successfully!
//             </h3>
//             <p className="text-sm mb-6">{message}</p>
//             <button
//               onClick={handleClearDraft}
//               className="px-6 py-2 bg-green-600 text-white rounded-sm hover:bg-green-700 transition duration-300"
//             >
//               Create New Pitch
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const renderStep = () => {
//     switch (currentStep) {
//       case 1:
//         return <Step1Foundation />;
//       case 2:
//         return <Step2MarketAnalysis />;
//       case 3:
//         return <Step3BusinessModel />;
//       case 4:
//         return <Step4TeamExecution />;
//       case 5:
//         return <Step5Financials />;
//       case 6:
//         return <Step6Investment />;
//       case 7:
//         return <Step7StrategyLegal />;
//       case 8:
//         return <Step8MediaReview />;
//       default:
//         return <Step1Foundation />;
//     }
//   };

//   // Step 1: Foundation
//   const Step1Foundation = () => (
//     <div className="space-y-6">
//       <div>
//         <label
//           className={`block text-sm font-medium mb-2 ${
//             dark ? "text-gray-300" : "text-gray-700"
//           }`}
//         >
//           Company Name <span className="text-red-500">*</span>
//         </label>
//         <input
//           type="text"
//           value={formData.startupName}
//           onChange={(e) => handleChange("startupName", e.target.value)}
//           placeholder="Enter your company name..."
//           maxLength={100}
//           className={`w-full px-4 py-3 rounded-sm border transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//             dark
//               ? "bg-gray-800 border-gray-600 text-white"
//               : "bg-white border-gray-300 text-gray-900"
//           }`}
//         />
//       </div>

//       <div>
//         <label
//           className={`block text-sm font-medium mb-2 ${
//             dark ? "text-gray-300" : "text-gray-700"
//           }`}
//         >
//           Value Proposition <span className="text-red-500">*</span>
//         </label>
//         <input
//           type="text"
//           value={formData.oneLiner}
//           onChange={(e) => handleChange("oneLiner", e.target.value)}
//           placeholder="Describe your company's core value proposition in one line..."
//           maxLength={200}
//           className={`w-full px-4 py-3 rounded-sm border transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//             dark
//               ? "bg-gray-800 border-gray-600 text-white"
//               : "bg-white border-gray-300 text-gray-900"
//           }`}
//         />
//         <div className="text-xs text-gray-500 mt-1">
//           {formData.oneLiner.length}/200
//         </div>
//       </div>

//       <div>
//         <label
//           className={`block text-sm font-medium mb-2 ${
//             dark ? "text-gray-300" : "text-gray-700"
//           }`}
//         >
//           Problem Statement <span className="text-red-500">*</span>
//         </label>
//         <div className="relative">
//           <textarea
//             value={formData.problem}
//             onChange={(e) => handleChange("problem", e.target.value)}
//             placeholder="Define the significant problem or market inefficiency your company addresses..."
//             rows={5}
//             className={`w-full px-4 py-3 rounded-sm border transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//               dark
//                 ? "bg-gray-800 border-gray-600 text-white"
//                 : "bg-white border-gray-300 text-gray-900"
//             }`}
//           />
//           <button
//             type="button"
//             onClick={() => handleAIEnhance("problem", formData.problem)}
//             disabled={!formData.problem.trim() || enhancing}
//             className="absolute top-3 right-3 p-1 text-gray-400 hover:text-blue-500 disabled:opacity-50"
//             title="Enhance with AI"
//           >
//             {enhancing && enhanceField === "problem" ? (
//               <svg
//                 className="w-4 h-4 animate-spin"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                   className="opacity-25"
//                 />
//                 <path
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   className="opacity-75"
//                 />
//               </svg>
//             ) : (
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M13 10V3L4 14h7v7l9-11h-7z"
//                 />
//               </svg>
//             )}
//           </button>
//         </div>
//         {sampleEnhanced && enhanceField === "problem" && (
//           <div
//             className={`mt-2 p-4 rounded-sm border ${
//               dark
//                 ? "border-gray-600 bg-gray-700"
//                 : "border-gray-200 bg-gray-50"
//             }`}
//           >
//             <div className="flex justify-between mb-2">
//               <span className="text-sm font-medium">AI Enhanced Version</span>
//               <div className="flex gap-2">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     handleChange("problem", sampleEnhanced);
//                     setSampleEnhanced("");
//                     setEnhanceField("");
//                   }}
//                   className="text-xs px-3 py-1 bg-blue-500/10 text-blue-600 rounded"
//                 >
//                   Apply
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setSampleEnhanced("");
//                     setEnhanceField("");
//                   }}
//                   className="text-xs px-3 py-1 text-gray-500 rounded"
//                 >
//                   Dismiss
//                 </button>
//               </div>
//             </div>
//             <p className="text-sm">{sampleEnhanced}</p>
//           </div>
//         )}
//       </div>

//       <div>
//         <label
//           className={`block text-sm font-medium mb-2 ${
//             dark ? "text-gray-300" : "text-gray-700"
//           }`}
//         >
//           Solution Overview <span className="text-red-500">*</span>
//         </label>
//         <div className="relative">
//           <textarea
//             value={formData.solution}
//             onChange={(e) => handleChange("solution", e.target.value)}
//             placeholder="Explain how your innovation provides a superior solution..."
//             rows={5}
//             className={`w-full px-4 py-3 rounded-sm border transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//               dark
//                 ? "bg-gray-800 border-gray-600 text-white"
//                 : "bg-white border-gray-300 text-gray-900"
//             }`}
//           />
//           <button
//             type="button"
//             onClick={() => handleAIEnhance("solution", formData.solution)}
//             disabled={!formData.solution.trim() || enhancing}
//             className="absolute top-3 right-3 p-1 text-gray-400 hover:text-blue-500 disabled:opacity-50"
//             title="Enhance with AI"
//           >
//             {enhancing && enhanceField === "solution" ? (
//               <svg
//                 className="w-4 h-4 animate-spin"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                   className="opacity-25"
//                 />
//                 <path
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   className="opacity-75"
//                 />
//               </svg>
//             ) : (
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M13 10V3L4 14h7v7l9-11h-7z"
//                 />
//               </svg>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   // Step 2: Market Analysis
//   const Step2MarketAnalysis = () => (
//     <div className="space-y-6">
//       <div>
//         <label
//           className={`block text-sm font-medium mb-2 ${
//             dark ? "text-gray-300" : "text-gray-700"
//           }`}
//         >
//           Target Market <span className="text-red-500">*</span>
//         </label>
//         <textarea
//           value={formData.targetMarket}
//           onChange={(e) => handleChange("targetMarket", e.target.value)}
//           placeholder="Define your addressable market and customer segments..."
//           rows={4}
//           className={`w-full px-4 py-3 rounded-sm border transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//             dark
//               ? "bg-gray-800 border-gray-600 text-white"
//               : "bg-white border-gray-300 text-gray-900"
//           }`}
//         />
//       </div>

//       {/* Market Size */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label
//             className={`block text-sm font-medium mb-2 ${
//               dark ? "text-gray-300" : "text-gray-700"
//             }`}
//           >
//             Total Addressable Market (TAM)
//           </label>
//           <input
//             type="number"
//             value={formData.market.totalMarketSize}
//             onChange={(e) =>
//               handleChange(
//                 "market",
//                 parseFloat(e.target.value) || 0,
//                 null,
//                 "totalMarketSize"
//               )
//             }
//             placeholder="Enter TAM in millions"
//             className={`w-full px-4 py-3 rounded-sm border transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//               dark
//                 ? "bg-gray-800 border-gray-600 text-white"
//                 : "bg-white border-gray-300 text-gray-900"
//             }`}
//           />
//         </div>
//         <div>
//           <label
//             className={`block text-sm font-medium mb-2 ${
//               dark ? "text-gray-300" : "text-gray-700"
//             }`}
//           >
//             Serviceable Available Market (SAM)
//           </label>
//           <input
//             type="number"
//             value={formData.market.serviceableMarketSize}
//             onChange={(e) =>
//               handleChange(
//                 "market",
//                 parseFloat(e.target.value) || 0,
//                 null,
//                 "serviceableMarketSize"
//               )
//             }
//             placeholder="Enter SAM in millions"
//             className={`w-full px-4 py-3 rounded-sm border transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//               dark
//                 ? "bg-gray-800 border-gray-600 text-white"
//                 : "bg-white border-gray-300 text-gray-900"
//             }`}
//           />
//         </div>
//         <div>
//           <label
//             className={`block text-sm font-medium mb-2 ${
//               dark ? "text-gray-300" : "text-gray-700"
//             }`}
//           >
//             Serviceable Obtainable Market (SOM)
//           </label>
//           <input
//             type="number"
//             value={formData.market.targetMarketSize}
//             onChange={(e) =>
//               handleChange(
//                 "market",
//                 parseFloat(e.target.value) || 0,
//                 null,
//                 "targetMarketSize"
//               )
//             }
//             placeholder="Enter SOM in millions"
//             className={`w-full px-4 py-3 rounded-sm border transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//               dark
//                 ? "bg-gray-800 border-gray-600 text-white"
//                 : "bg-white border-gray-300 text-gray-900"
//             }`}
//           />
//         </div>
//         <div>
//           <label
//             className={`block text-sm font-medium mb-2 ${
//               dark ? "text-gray-300" : "text-gray-700"
//             }`}
//           >
//             Market Growth Rate (%)
//           </label>
//           <input
//             type="number"
//             value={formData.market.growthRatePercent}
//             onChange={(e) =>
//               handleChange(
//                 "market",
//                 parseFloat(e.target.value) || 0,
//                 null,
//                 "growthRatePercent"
//               )
//             }
//             placeholder="Enter growth rate %"
//             className={`w-full px-4 py-3 rounded-sm border transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//               dark
//                 ? "bg-gray-800 border-gray-600 text-white"
//                 : "bg-white border-gray-300 text-gray-900"
//             }`}
//           />
//         </div>
//       </div>

//       {/* Customer Segments */}
//       <div>
//         <label
//           className={`block text-sm font-medium mb-2 ${
//             dark ? "text-gray-300" : "text-gray-700"
//           }`}
//         >
//           Customer Segments
//         </label>
//         {formData.customerSegments.map((segment, index) => (
//           <div
//             key={index}
//             className={`border rounded-sm p-4 mb-4 relative ${
//               dark ? "border-gray-600" : "border-gray-300"
//             }`}
//           >
//             {formData.customerSegments.length > 1 && (
//               <button
//                 type="button"
//                 onClick={() => removeArrayItem("customerSegments", index)}
//                 className="absolute top-2 right-2 text-red-500 hover:text-red-700"
//               >
//                 ×
//               </button>
//             )}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 value={segment.segmentName}
//                 onChange={(e) =>
//                   handleChange(
//                     "customerSegments",
//                     e.target.value,
//                     index,
//                     "segmentName"
//                   )
//                 }
//                 placeholder="Segment name"
//                 className={`px-3 py-2 rounded border ${
//                   dark
//                     ? "bg-gray-700 border-gray-600 text-white"
//                     : "bg-white border-gray-300"
//                 }`}
//               />
//               <input
//                 type="number"
//                 value={segment.size}
//                 onChange={(e) =>
//                   handleChange(
//                     "customerSegments",
//                     parseInt(e.target.value) || 0,
//                     index,
//                     "size"
//                   )
//                 }
//                 placeholder="Segment size"
//                 className={`px-3 py-2 rounded border ${
//                   dark
//                     ? "bg-gray-700 border-gray-600 text-white"
//                     : "bg-white border-gray-300"
//                 }`}
//               />
//             </div>
//             <textarea
//               value={segment.painPoints}
//               onChange={(e) =>
//                 handleChange(
//                   "customerSegments",
//                   e.target.value,
//                   index,
//                   "painPoints"
//                 )
//               }
//               placeholder="Key pain points for this segment"
//               rows={2}
//               className={`w-full mt-2 px-3 py-2 rounded border ${
//                 dark
//                   ? "bg-gray-700 border-gray-600 text-white"
//                   : "bg-white border-gray-300"
//               }`}
//             />
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={() =>
//             addArrayItem("customerSegments", {
//               segmentName: "",
//               size: 0,
//               painPoints: "",
//             })
//           }
//           className="px-4 py-2 border border-dashed border-gray-400 rounded-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-300"
//         >
//           + Add Customer Segment
//         </button>
//       </div>

//       {/* Competition */}
//       <div>
//         <label
//           className={`block text-sm font-medium mb-2 ${
//             dark ? "text-gray-300" : "text-gray-700"
//           }`}
//         >
//           Competition Overview <span className="text-red-500">*</span>
//         </label>
//         <textarea
//           value={formData.competition}
//           onChange={(e) => handleChange("competition", e.target.value)}
//           placeholder="Describe the competitive landscape..."
//           rows={4}
//           className={`w-full px-4 py-3 rounded-sm border transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//             dark
//               ? "bg-gray-800 border-gray-600 text-white"
//               : "bg-white border-gray-300 text-gray-900"
//           }`}
//         />
//       </div>

//       {/* Competitors */}
//       <div>
//         <label
//           className={`block text-sm font-medium mb-2 ${
//             dark ? "text-gray-300" : "text-gray-700"
//           }`}
//         >
//           Key Competitors
//         </label>
//         {formData.competitors.map((competitor, index) => (
//           <div
//             key={index}
//             className={`border rounded-sm p-4 mb-4 relative ${
//               dark ? "border-gray-600" : "border-gray-300"
//             }`}
//           >
//             {formData.competitors.length > 1 && (
//               <button
//                 type="button"
//                 onClick={() => removeArrayItem("competitors", index)}
//                 className="absolute top-2 right-2 text-red-500 hover:text-red-700"
//               >
//                 ×
//               </button>
//             )}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
//               <input
//                 type="text"
//                 value={competitor.name}
//                 onChange={(e) =>
//                   handleChange("competitors", e.target.value, index, "name")
//                 }
//                 placeholder="Competitor name"
//                 className={`px-3 py-2 rounded border ${
//                   dark
//                     ? "bg-gray-700 border-gray-600 text-white"
//                     : "bg-white border-gray-300"
//                 }`}
//               />
//               <input
//                 type="url"
//                 value={competitor.website}
//                 onChange={(e) =>
//                   handleChange("competitors", e.target.value, index, "website")
//                 }
//                 placeholder="Website URL"
//                 className={`px-3 py-2 rounded border ${
//                   dark
//                     ? "bg-gray-700 border-gray-600 text-white"
//                     : "bg-white border-gray-300"
//                 }`}
//               />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <textarea
//                 value={competitor.strength}
//                 onChange={(e) =>
//                   handleChange("competitors", e.target.value, index, "strength")
//                 }
//                 placeholder="Their strengths"
//                 rows={2}
//                 className={`px-3 py-2 rounded border ${
//                   dark
//                     ? "bg-gray-700 border-gray-600 text-white"
//                     : "bg-white border-gray-300"
//                 }`}
//               />
//               <textarea
//                 value={competitor.weakness}
//                 onChange={(e) =>
//                   handleChange("competitors", e.target.value, index, "weakness")
//                 }
//                 placeholder="Their weaknesses"
//                 rows={2}
//                 className={`px-3 py-2 rounded border ${
//                   dark
//                     ? "bg-gray-700 border-gray-600 text-white"
//                     : "bg-white border-gray-300"
//                 }`}
//               />
//             </div>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={() =>
//             addArrayItem("competitors", {
//               name: "",
//               website: "",
//               strength: "",
//               weakness: "",
//             })
//           }
//           className="px-4 py-2 border border-dashed border-gray-400 rounded-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-300"
//         >
//           + Add Competitor
//         </button>
//       </div>
//     </div>
//   );

//   // Step 3: Business Model
//   const Step3BusinessModel = () => (
//     <div className="space-y-6">
//       <div>
//         <label
//           className={`block text-sm font-medium mb-2 ${
//             dark ? "text-gray-300" : "text-gray-700"
//           }`}
//         >
//           Business Model <span className="text-red-500">*</span>
//         </label>
//         <textarea
//           value={formData.businessModel}
//           onChange={(e) => handleChange("businessModel", e.target.value)}
//           placeholder="Describe your revenue model and monetization strategy..."
//           rows={4}
//           className={`w-full px-4 py-3 rounded-sm border transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//             dark
//               ? "bg-gray-800 border-gray-600 text-white"
//               : "bg-white border-gray-300 text-gray-900"
//           }`}
//         />
//       </div>

//       <div>
//         <label
//           className={`block text-sm font-medium mb-2 ${
//             dark ? "text-gray-300" : "text-gray-700"
//           }`}
//         >
//           Go-to-Market Strategy <span className="text-red-500">*</span>
//         </label>
//         <textarea
//           value={formData.goToMarketStrategy}
//           onChange={(e) => handleChange("goToMarketStrategy", e.target.value)}
//           placeholder="Detail your customer acquisition and market penetration approach..."
//           rows={4}
//           className={`w-full px-4 py-3 rounded-sm border transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//             dark
//               ? "bg-gray-800 border-gray-600 text-white"
//               : "bg-white border-gray-300 text-gray-900"
//           }`}
//         />
//       </div>

//       {/* Product Metrics */}
//       <div>
//         <label
//           className={`block text-sm font-medium mb-4 ${
//             dark ? "text-gray-300" : "text-gray-700"
//           }`}
//         >
//           Product Metrics
//         </label>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
//               Monthly Active Users
//             </label>
//             <input
//               type="number"
//               value={formData.productMetrics.monthlyActiveUsers}
//               onChange={(e) =>
//                 handleChange(
//                   "productMetrics",
//                   parseInt(e.target.value) || 0,
//                   null,
//                   "monthlyActiveUsers"
//                 )
//               }
//               className={`w-full px-3 py-2 rounded border ${
//                 dark
//                   ? "bg-gray-700 border-gray-600 text-white"
//                   : "bg-white border-gray-300"
//               }`}
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
//               Total Downloads
//             </label>
//             <input
//               type="number"
//               value={formData.productMetrics.downloads}
//               onChange={(e) =>
//                 handleChange(
//                   "productMetrics",
//                   parseInt(e.target.value) || 0,
//                   null,
//                   "downloads"
//                 )
//               }
//               className={`w-full px-3 py-2 rounded border ${
//                 dark
//                   ? "bg-gray-700 border-gray-600 text-white"
//                   : "bg-white border-gray-300"
//               }`}
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
//               Repeat Customer Rate (%)
//             </label>
//             <input
//               type="number"
//               value={formData.productMetrics.repeatCustomerRatePercent}
//               onChange={(e) =>
//                 handleChange(
//                   "productMetrics",
//                   parseFloat(e.target.value) || 0,
//                   null,
//                   "repeatCustomerRatePercent"
//                 )
//               }
//               className={`w-full px-3 py-2 rounded border ${
//                 dark
//                   ? "bg-gray-700 border-gray-600 text-white"
//                   : "bg-white border-gray-300"
//               }`}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Key Achievements */}
//       <div>
//         <label
//           className={`block text-sm font-medium mb-2 ${
//             dark ? "text-gray-300" : "text-gray-700"
//           }`}
//         >
//           Key Achievements
//         </label>
//         {formData.productMetrics.keyAchievements.map((achievement, index) => (
//           <div key={index} className="flex gap-2 mb-2">
//             <input
//               type="text"
//               value={achievement}
//               onChange={(e) =>
//                 handleChange(
//                   "productMetrics",
//                   e.target.value,
//                   index,
//                   "keyAchievements"
//                 )
//               }
//               placeholder="Describe a key achievement..."
//               className={`flex-1 px-3 py-2 rounded border ${
//                 dark
//                   ? "bg-gray-700 border-gray-600 text-white"
//                   : "bg-white border-gray-300"
//               }`}
//             />
//             {formData.productMetrics.keyAchievements.length > 1 && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   const newAchievements =
//                     formData.productMetrics.keyAchievements.filter(
//                       (_, i) => i !== index
//                     );
//                   handleChange(
//                     "productMetrics",
//                     newAchievements,
//                     null,
//                     "keyAchievements"
//                   );
//                 }}
//                 className="px-3 py-2 text-red-500 hover:text-red-700"
//               >
//                 ×
//               </button>
//             )}
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={() => {
//             const newAchievements = [
//               ...formData.productMetrics.keyAchievements,
//               "",
//             ];
//             handleChange(
//               "productMetrics",
//               newAchievements,
//               null,
//               "keyAchievements"
//             );
//           }}
//           className="px-4 py-2 border border-dashed border-gray-400 rounded-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-300"
//         >
//           + Add Achievement
//         </button>
//       </div>
//     </div>
//   );

//   // Step 4: Team & Execution
//   const Step4TeamExecution = () => (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label
//             className={`block text-sm font-medium mb-2 ${
//               dark ? "text-gray-300" : "text-gray-700"
//             }`}
//           >
//             Founder Name <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             value={formData.founderName}
//             onChange={(e) => handleChange("founderName", e.target.value)}
//             placeholder="Your full name"
//             className={`w-full px-4 py-3 rounded-sm border transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//               dark
//                 ? "bg-gray-800 border-gray-600 text-white"
//                 : "bg-white border-gray-300 text-gray-900"
//             }`}
//           />
//         </div>
//         <div>
//           <label
//             className={`block text-sm font-medium mb-2 ${
//               dark ? "text-gray-300" : "text-gray-700"
//             }`}
//           >
//             Founder Email <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="email"
//             value={formData.founderEmail}
//             onChange={(e) => handleChange("founderEmail", e.target.value)}
//             placeholder="your.email@company.com"
//             className={`w-full px-4 py-3 rounded-sm border transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//               dark
//                 ? "bg-gray-800 border-gray-600 text-white"
//                 : "bg-white border-gray-300 text-gray-900"
//             }`}
//           />
//         </div>
//       </div>

//       {/* Team Members */}
//       <div>
//         <label
//           className={`block text-sm font-medium mb-2 ${
//             dark ? "text-gray-300" : "text-gray-700"
//           }`}
//         >
//           Team Members
//         </label>
//         {formData.teamMembers.map((member, index) => (
//           <div
//             key={index}
//             className={`border rounded-sm p-4 mb-4 relative ${
//               dark ? "border-gray-600" : "border-gray-300"
//             }`}
//           >
//             {formData.teamMembers.length > 1 && (
//               <button
//                 type="button"
//                 onClick={() => removeArrayItem("teamMembers", index)}
//                 className="absolute top-2 right-2 text-red-500 hover:text-red-700"
//               >
//                 ×
//               </button>
//             )}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
//               <input
//                 type="text"
//                 value={member.name}
//                 onChange={(e) =>
//                   handleChange("teamMembers", e.target.value, index, "name")
//                 }
//                 placeholder="Full name"
//                 className={`px-3 py-2 rounded border ${
//                   dark
//                     ? "bg-gray-700 border-gray-600 text-white"
//                     : "bg-white border-gray-300"
//                 }`}
//               />
//               <input
//                 type="text"
//                 value={member.role}
//                 onChange={(e) =>
//                   handleChange("teamMembers", e.target.value, index, "role")
//                 }
//                 placeholder="Role/Position"
//                 className={`px-3 py-2 rounded border ${
//                   dark
//                     ? "bg-gray-700 border-gray-600 text-white"
//                     : "bg-white border-gray-300"
//                 }`}
//               />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input
//                 type="number"
//                 value={member.experienceYears}
//                 onChange={(e) =>
//                   handleChange(
//                     "teamMembers",
//                     parseInt(e.target.value) || 0,
//                     index,
//                     "experienceYears"
//                   )
//                 }
//                 placeholder="Years of experience"
//                 className={`px-3 py-2 rounded border ${
//                   dark
//                     ? "bg-gray-700 border-gray-600 text-white"
//                     : "bg-white border-gray-300"
//                 }`}
//               />
//               <input
//                 type="url"
//                 value={member.linkedIn}
//                 onChange={(e) =>
//                   handleChange("teamMembers", e.target.value, index, "linkedIn")
//                 }
//                 placeholder="LinkedIn profile URL"
//                 className={`px-3 py-2 rounded border ${
//                   dark
//                     ? "bg-gray-700 border-gray-600 text-white"
//                     : "bg-white border-gray-300"
//                 }`}
//               />
//             </div>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={() =>
//             addArrayItem("teamMembers", {
//               name: "",
//               role: "",
//               experienceYears: 0,
//               linkedIn: "",
//             })
//           }
//           className="px-4 py-2 border border-dashed border-gray-400 rounded-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-300"
//         >
//           + Add Team Member
//         </button>
//       </div>

//       <div>
//         <label
//           className={`block text-sm font-medium mb-2 ${
//             dark ? "text-gray-300" : "text-gray-700"
//           }`}
//         >
//           Current Traction <span className="text-red-500">*</span>
//         </label>
//         <textarea
//           value={formData.traction}
//           onChange={(e) => handleChange("traction", e.target.value)}
//           placeholder="Present key metrics, milestones, and validation achieved..."
//           rows={5}
//           className={`w-full px-4 py-3 rounded-sm border transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//             dark
//               ? "bg-gray-800 border-gray-600 text-white"
//               : "bg-white border-gray-300 text-gray-900"
//           }`}
//         />
//       </div>
//     </div>
//   );

//   // Step 5: Financials
//   const Step5Financials = () => (
//     <div className="space-y-6">
//       <h3
//         className={`text-lg font-medium ${
//           dark ? "text-white" : "text-gray-900"
//         }`}
//       >
//         Financial Metrics
//       </h3>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         <div>
//           <label
//             className={`block text-sm font-medium mb-2 ${
//               dark ? "text-gray-300" : "text-gray-700"
//             }`}
//           >
//             Revenue Last Year ($)
//           </label>
//           <input
//             type="number"
//             value={formData.financials.revenueLastYear}
//             onChange={(e) =>
//               handleChange(
//                 "financials",
//                 parseFloat(e.target.value) || 0,
//                 null,
//                 "revenueLastYear"
//               )
//             }
//             className={`w-full px-4 py-3 rounded-sm border ${
//               dark
//                 ? "bg-gray-800 border-gray-600 text-white"
//                 : "bg-white border-gray-300"
//             }`}
//           />
//         </div>

//         <div>
//           <label
//             className={`block text-sm font-medium mb-2 ${
//               dark ? "text-gray-300" : "text-gray-700"
//             }`}
//           >
//             Revenue This Year ($)
//           </label>
//           <input
//             type="number"
//             value={formData.financials.revenueThisYear}
//             onChange={(e) =>
//               handleChange(
//                 "financials",
//                 parseFloat(e.target.value) || 0,
//                 null,
//                 "revenueThisYear"
//               )
//             }
//             className={`w-full px-4 py-3 rounded-sm border ${
//               dark
//                 ? "bg-gray-800 border-gray-600 text-white"
//                 : "bg-white border-gray-300"
//             }`}
//           />
//         </div>

//         <div>
//           <label
//             className={`block text-sm font-medium mb-2 ${
//               dark ? "text-gray-300" : "text-gray-700"
//             }`}
//           >
//             Net Profit ($)
//           </label>
//           <input
//             type="number"
//             value={formData.financials.netProfit}
//             onChange={(e) =>
//               handleChange(
//                 "financials",
//                 parseFloat(e.target.value) || 0,
//                 null,
//                 "netProfit"
//               )
//             }
//             className={`w-full px-4 py-3 rounded-sm border ${
//               dark
//                 ? "bg-gray-800 border-gray-600 text-white"
//                 : "bg-white border-gray-300"
//             }`}
//           />
//         </div>

//         <div>
//           <label
//             className={`block text-sm font-medium mb-2 ${
//               dark ? "text-gray-300" : "text-gray-700"
//             }`}
//           >
//             Gross Margin (%)
//           </label>
//           <input
//             type="number"
//             min="0"
//             max="100"
//             value={formData.financials.grossMarginPercent}
//             onChange={(e) =>
//               handleChange(
//                 "financials",
//                 parseFloat(e.target.value) || 0,
//                 null,
//                 "grossMarginPercent"
//               )
//             }
//             className={`w-full px-4 py-3 rounded-sm border ${
//               dark
//                 ? "bg-gray-800 border-gray-600 text-white"
//                 : "bg-white border-gray-300"
//             }`}
//           />
//         </div>

//         <div>
//           <label
//             className={`block text-sm font-medium mb-2 ${
//               dark ? "text-gray-300" : "text-gray-700"
//             }`}
//           >
//             Customer Acquisition Cost ($)
//           </label>
//           <input
//             type="number"
//             value={formData.financials.customerAcquisitionCost}
//             onChange={(e) =>
//               handleChange(
//                 "financials",
//                 parseFloat(e.target.value) || 0,
//                 null,
//                 "customerAcquisitionCost"
//               )
//             }
//             className={`w-full px-4 py-3 rounded-sm border ${
//               dark
//                 ? "bg-gray-800 border-gray-600 text-white"
//                 : "bg-white border-gray-300"
//             }`}
//           />
//         </div>

//         <div>
//           <label
//             className={`block text-sm font-medium mb-2 ${
//               dark ? "text-gray-300" : "text-gray-700"
//             }`}
//           >
//             Lifetime Value ($)
//           </label>
//           <input
//             type="number"
//             value={formData.financials.lifetimeValue}
//             onChange={(e) =>
//               handleChange(
//                 "financials",
//                 parseFloat(e.target.value) || 0,
//                 null,
//                 "lifetimeValue"
//               )
//             }
//             className={`w-full px-4 py-3 rounded-sm border ${
//               dark
//                 ? "bg-gray-800 border-gray-600 text-white"
//                 : "bg-white border-gray-300"
//             }`}
//           />
//         </div>

//         <div className="md:col-span-2 lg:col-span-3">
//           <label
//             className={`block text-sm font-medium mb-2 ${
//               dark ? "text-gray-300" : "text-gray-700"
//             }`}
//           >
//             Current Valuation ($)
//           </label>
//           <input
//             type="number"
//             value={formData.financials.valuation}
//             onChange={(e) =>
//               handleChange(
//                 "financials",
//                 parseFloat(e.target.value) || 0,
//                 null,
//                 "valuation"
//               )
//             }
//             className={`w-full px-4 py-3 rounded-sm border ${
//               dark
//                 ? "bg-gray-800 border-gray-600 text-white"
//                 : "bg-white border-gray-300"
//             }`}
//           />
//         </div>
//       </div>

//       {/* Financial Summary */}
//       {formData.financials.lifetimeValue > 0 &&
//         formData.financials.customerAcquisitionCost > 0 && (
//           <div
//             className={`p-4 rounded-sm ${dark ? "bg-gray-800" : "bg-blue-50"}`}
//           >
//             <h4
//               className={`font-medium mb-2 ${
//                 dark ? "text-white" : "text-gray-900"
//               }`}
//             >
//               Calculated Metrics
//             </h4>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//               <div>
//                 <span className="text-gray-600 dark:text-gray-400">
//                   LTV/CAC Ratio:
//                 </span>
//                 <span className="ml-2 font-medium">
//                   {(
//                     formData.financials.lifetimeValue /
//                     formData.financials.customerAcquisitionCost
//                   ).toFixed(2)}
//                 </span>
//               </div>
//               {formData.financials.revenueThisYear > 0 &&
//                 formData.financials.revenueLastYear > 0 && (
//                   <div>
//                     <span className="text-gray-600 dark:text-gray-400">
//                       Revenue Growth:
//                     </span>
//                     <span className="ml-2 font-medium">
//                       {(
//                         ((formData.financials.revenueThisYear -
//                           formData.financials.revenueLastYear) /
//                           formData.financials.revenueLastYear) *
//                         100
//                       ).toFixed(1)}
//                       %
//                     </span>
//                   </div>
//                 )}
//               {formData.financials.revenueThisYear > 0 &&
//                 formData.financials.netProfit !== 0 && (
//                   <div>
//                     <span className="text-gray-600 dark:text-gray-400">
//                       Monthly Burn:
//                     </span>
//                     <span className="ml-2 font-medium">
//                       $
//                       {(
//                         (formData.financials.revenueThisYear -
//                           formData.financials.netProfit) /
//                         12
//                       ).toLocaleString()}
//                     </span>
//                   </div>
//                 )}
//             </div>
//           </div>
//         )}
//     </div>
//   );

//   // Step 6: Investment
//   const Step6Investment = () => (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label
//             className={`block text-sm font-medium mb-2 ${
//               dark ? "text-gray-300" : "text-gray-700"
//             }`}
//           >
//             Funding Amount Requested ($) <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="number"
//             value={formData.fundingDetails.fundingAskAmount}
//             onChange={(e) =>
//               handleChange(
//                 "fundingDetails",
//                 parseFloat(e.target.value) || 0,
//                 null,
//                 "fundingAskAmount"
//               )
//             }
//             placeholder="Enter funding amount"
//             className={`w-full px-4 py-3 rounded-sm border transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//               dark
//                 ? "bg-gray-800 border-gray-600 text-white"
//                 : "bg-white border-gray-300 text-gray-900"
//             }`}
//           />
//         </div>

//         <div>
//           <label
//             className={`block text-sm font-medium mb-2 ${
//               dark ? "text-gray-300" : "text-gray-700"
//             }`}
//           >
//             Equity Offered (%) <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="number"
//             min="0"
//             max="100"
//             step="0.1"
//             value={formData.fundingDetails.equityOfferedPercent}
//             onChange={(e) =>
//               handleChange(
//                 "fundingDetails",
//                 parseFloat(e.target.value) || 0,
//                 null,
//                 "equityOfferedPercent"
//               )
//             }
//             placeholder="Enter equity percentage"
//             className={`w-full px-4 py-3 rounded-sm border transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//               dark
//                 ? "bg-gray-800 border-gray-600 text-white"
//                 : "bg-white border-gray-300 text-gray-900"
//             }`}
//           />
//         </div>

//         <div className="md:col-span-2">
//           <label
//             className={`block text-sm font-medium mb-2 ${
//               dark ? "text-gray-300" : "text-gray-700"
//             }`}
//           >
//             Previous Funding Raised ($)
//           </label>
//           <input
//             type="number"
//             value={formData.fundingDetails.previousFundingRaised}
//             onChange={(e) =>
//               handleChange(
//                 "fundingDetails",
//                 parseFloat(e.target.value) || 0,
//                 null,
//                 "previousFundingRaised"
//               )
//             }
//             placeholder="Enter previous funding amount"
//             className={`w-full px-4 py-3 rounded-sm border transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//               dark
//                 ? "bg-gray-800 border-gray-600 text-white"
//                 : "bg-white border-gray-300 text-gray-900"
//             }`}
//           />
//         </div>
//       </div>

//       {/* Valuation Calculation */}
//       {formData.fundingDetails.fundingAskAmount > 0 &&
//         formData.fundingDetails.equityOfferedPercent > 0 && (
//           <div
//             className={`p-4 rounded-sm ${dark ? "bg-gray-800" : "bg-green-50"}`}
//           >
//             <h4
//               className={`font-medium mb-2 ${
//                 dark ? "text-white" : "text-gray-900"
//               }`}
//             >
//               Implied Valuation
//             </h4>
//             <p className="text-2xl font-bold text-green-600">
//               $
//               {(
//                 (formData.fundingDetails.fundingAskAmount /
//                   formData.fundingDetails.equityOfferedPercent) *
//                 100
//               ).toLocaleString()}
//             </p>
//             <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//               Based on $
//               {formData.fundingDetails.fundingAskAmount.toLocaleString()} for{" "}
//               {formData.fundingDetails.equityOfferedPercent}% equity
//             </p>
//           </div>
//         )}

//       {/* Valuation History */}
//       <div>
//         <label
//           className={`block text-sm font-medium mb-2 ${
//             dark ? "text-gray-300" : "text-gray-700"
//           }`}
//         >
//           Valuation History (Optional)
//         </label>
//         {formData.valuationHistory.map((valuation, index) => (
//           <div
//             key={index}
//             className={`border rounded-sm p-4 mb-4 relative ${
//               dark ? "border-gray-600" : "border-gray-300"
//             }`}
//           >
//             <button
//               type="button"
//               onClick={() => removeArrayItem("valuationHistory", index)}
//               className="absolute top-2 right-2 text-red-500 hover:text-red-700"
//             >
//               ×
//             </button>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
//               <input
//                 type="date"
//                 value={
//                   valuation.date
//                     ? new Date(valuation.date).toISOString().split("T")[0]
//                     : ""
//                 }
//                 onChange={(e) =>
//                   handleChange(
//                     "valuationHistory",
//                     e.target.value,
//                     index,
//                     "date"
//                   )
//                 }
//                 className={`px-3 py-2 rounded border ${
//                   dark
//                     ? "bg-gray-700 border-gray-600 text-white"
//                     : "bg-white border-gray-300"
//                 }`}
//               />
//               <select
//                 value={valuation.roundType}
//                 onChange={(e) =>
//                   handleChange(
//                     "valuationHistory",
//                     e.target.value,
//                     index,
//                     "roundType"
//                   )
//                 }
//                 className={`px-3 py-2 rounded border ${
//                   dark
//                     ? "bg-gray-700 border-gray-600 text-white"
//                     : "bg-white border-gray-300"
//                 }`}
//               >
//                 <option value="Seed">Seed</option>
//                 <option value="Series A">Series A</option>
//                 <option value="Series B">Series B</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input
//                 type="number"
//                 value={valuation.valuation}
//                 onChange={(e) =>
//                   handleChange(
//                     "valuationHistory",
//                     parseFloat(e.target.value) || 0,
//                     index,
//                     "valuation"
//                   )
//                 }
//                 placeholder="Valuation ($)"
//                 className={`px-3 py-2 rounded border ${
//                   dark
//                     ? "bg-gray-700 border-gray-600 text-white"
//                     : "bg-white border-gray-300"
//                 }`}
//               />
//               <input
//                 type="number"
//                 value={valuation.fundingRaised}
//                 onChange={(e) =>
//                   handleChange(
//                     "valuationHistory",
//                     parseFloat(e.target.value) || 0,
//                     index,
//                     "fundingRaised"
//                   )
//                 }
//                 placeholder="Funding Raised ($)"
//                 className={`px-3 py-2 rounded border ${
//                   dark
//                     ? "bg-gray-700 border-gray-600 text-white"
//                     : "bg-white border-gray-300"
//                 }`}
//               />
//             </div>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={() =>
//             addArrayItem("valuationHistory", {
//               date: new Date().toISOString(),
//               valuation: 0,
//               fundingRaised: 0,
//               roundType: "Seed",
//             })
//           }
//           className="px-4 py-2 border border-dashed border-gray-400 rounded-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-300"
//         >
//           + Add Previous Round
//         </button>
//       </div>
//     </div>
//   );

//   // Step 7: Strategy & Legal
//   const Step7StrategyLegal = () => (
//     <div className="space-y-6">
//       {/* Milestones */}
//       <div>
//         <label
//           className={`block text-sm font-medium mb-2 ${
//             dark ? "text-gray-300" : "text-gray-700"
//           }`}
//         >
//           Key Milestones & Roadmap
//         </label>
//         {formData.milestones.map((milestone, index) => (
//           <div
//             key={index}
//             className={`border rounded-sm p-4 mb-4 relative ${
//               dark ? "border-gray-600" : "border-gray-300"
//             }`}
//           >
//             {formData.milestones.length > 1 && (
//               <button
//                 type="button"
//                 onClick={() => removeArrayItem("milestones", index)}
//                 className="absolute top-2 right-2 text-red-500 hover:text-red-700"
//               >
//                 ×
//               </button>
//             )}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
//               <input
//                 type="text"
//                 value={milestone.title}
//                 onChange={(e) =>
//                   handleChange("milestones", e.target.value, index, "title")
//                 }
//                 placeholder="Milestone title"
//                 className={`px-3 py-2 rounded border ${
//                   dark
//                     ? "bg-gray-700 border-gray-600 text-white"
//                     : "bg-white border-gray-300"
//                 }`}
//               />
//               <input
//                 type="date"
//                 value={
//                   milestone.targetDate
//                     ? new Date(milestone.targetDate).toISOString().split("T")[0]
//                     : ""
//                 }
//                 onChange={(e) =>
//                   handleChange(
//                     "milestones",
//                     e.target.value,
//                     index,
//                     "targetDate"
//                   )
//                 }
//                 className={`px-3 py-2 rounded border ${
//                   dark
//                     ? "bg-gray-700 border-gray-600 text-white"
//                     : "bg-white border-gray-300"
//                 }`}
//               />
//             </div>
//             <div className="mb-3">
//               <textarea
//                 value={milestone.description}
//                 onChange={(e) =>
//                   handleChange(
//                     "milestones",
//                     e.target.value,
//                     index,
//                     "description"
//                   )
//                 }
//                 placeholder="Describe this milestone..."
//                 rows={2}
//                 className={`w-full px-3 py-2 rounded border ${
//                   dark
//                     ? "bg-gray-700 border-gray-600 text-white"
//                     : "bg-white border-gray-300"
//                 }`}
//               />
//             </div>
//             <select
//               value={milestone.status}
//               onChange={(e) =>
//                 handleChange("milestones", e.target.value, index, "status")
//               }
//               className={`px-3 py-2 rounded border ${
//                 dark
//                   ? "bg-gray-700 border-gray-600 text-white"
//                   : "bg-white border-gray-300"
//               }`}
//             >
//               <option value="pending">Pending</option>
//               <option value="achieved">Achieved</option>
//               <option value="delayed">Delayed</option>
//             </select>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={() =>
//             addArrayItem("milestones", {
//               title: "",
//               description: "",
//               targetDate: "",
//               status: "pending",
//             })
//           }
//           className="px-4 py-2 border border-dashed border-gray-400 rounded-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-300"
//         >
//           + Add Milestone
//         </button>
//       </div>

//       {/* Legal/IP Section */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div>
//           <label
//             className={`block text-sm font-medium mb-2 ${
//               dark ? "text-gray-300" : "text-gray-700"
//             }`}
//           >
//             Patents
//           </label>
//           {formData.legal.patents.map((patent, index) => (
//             <div key={index} className="flex gap-2 mb-2">
//               <input
//                 type="text"
//                 value={patent}
//                 onChange={(e) =>
//                   handleChange("legal", e.target.value, index, "patents")
//                 }
//                 placeholder="Patent title/number"
//                 className={`flex-1 px-3 py-2 rounded border ${
//                   dark
//                     ? "bg-gray-700 border-gray-600 text-white"
//                     : "bg-white border-gray-300"
//                 }`}
//               />
//               {formData.legal.patents.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => {
//                     const newPatents = formData.legal.patents.filter(
//                       (_, i) => i !== index
//                     );
//                     handleChange("legal", newPatents, null, "patents");
//                   }}
//                   className="px-3 py-2 text-red-500 hover:text-red-700"
//                 >
//                   ×
//                 </button>
//               )}
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={() => {
//               const newPatents = [...formData.legal.patents, ""];
//               handleChange("legal", newPatents, null, "patents");
//             }}
//             className="text-sm px-3 py-1 border border-dashed border-gray-400 rounded hover:bg-gray-50 dark:hover:bg-gray-800"
//           >
//             + Add Patent
//           </button>
//         </div>

//         <div>
//           <label
//             className={`block text-sm font-medium mb-2 ${
//               dark ? "text-gray-300" : "text-gray-700"
//             }`}
//           >
//             Trademarks
//           </label>
//           {formData.legal.trademarks.map((trademark, index) => (
//             <div key={index} className="flex gap-2 mb-2">
//               <input
//                 type="text"
//                 value={trademark}
//                 onChange={(e) =>
//                   handleChange("legal", e.target.value, index, "trademarks")
//                 }
//                 placeholder="Trademark name"
//                 className={`flex-1 px-3 py-2 rounded border ${
//                   dark
//                     ? "bg-gray-700 border-gray-600 text-white"
//                     : "bg-white border-gray-300"
//                 }`}
//               />
//               {formData.legal.trademarks.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => {
//                     const newTrademarks = formData.legal.trademarks.filter(
//                       (_, i) => i !== index
//                     );
//                     handleChange("legal", newTrademarks, null, "trademarks");
//                   }}
//                   className="px-3 py-2 text-red-500 hover:text-red-700"
//                 >
//                   ×
//                 </button>
//               )}
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={() => {
//               const newTrademarks = [...formData.legal.trademarks, ""];
//               handleChange("legal", newTrademarks, null, "trademarks");
//             }}
//             className="text-sm px-3 py-1 border border-dashed border-gray-400 rounded hover:bg-gray-50 dark:hover:bg-gray-800"
//           >
//             + Add Trademark
//           </button>
//         </div>

//         <div>
//           <label
//             className={`block text-sm font-medium mb-2 ${
//               dark ? "text-gray-300" : "text-gray-700"
//             }`}
//           >
//             Licenses
//           </label>
//           {formData.legal.licenses.map((license, index) => (
//             <div key={index} className="flex gap-2 mb-2">
//               <input
//                 type="text"
//                 value={license}
//                 onChange={(e) =>
//                   handleChange("legal", e.target.value, index, "licenses")
//                 }
//                 placeholder="License type/name"
//                 className={`flex-1 px-3 py-2 rounded border ${
//                   dark
//                     ? "bg-gray-700 border-gray-600 text-white"
//                     : "bg-white border-gray-300"
//                 }`}
//               />
//               {formData.legal.licenses.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => {
//                     const newLicenses = formData.legal.licenses.filter(
//                       (_, i) => i !== index
//                     );
//                     handleChange("legal", newLicenses, null, "licenses");
//                   }}
//                   className="px-3 py-2 text-red-500 hover:text-red-700"
//                 >
//                   ×
//                 </button>
//               )}
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={() => {
//               const newLicenses = [...formData.legal.licenses, ""];
//               handleChange("legal", newLicenses, null, "licenses");
//             }}
//             className="text-sm px-3 py-1 border border-dashed border-gray-400 rounded hover:bg-gray-50 dark:hover:bg-gray-800"
//           >
//             + Add License
//           </button>
//         </div>
//       </div>

//       {/* Exit Strategy */}
//       <div>
//         <label
//           className={`block text-sm font-medium mb-2 ${
//             dark ? "text-gray-300" : "text-gray-700"
//           }`}
//         >
//           Exit Strategy <span className="text-red-500">*</span>
//         </label>
//         <textarea
//           value={formData.exitStrategy}
//           onChange={(e) => handleChange("exitStrategy", e.target.value)}
//           placeholder="Describe your long-term exit strategy (IPO, acquisition, etc.)..."
//           rows={4}
//           className={`w-full px-4 py-3 rounded-sm border transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//             dark
//               ? "bg-gray-800 border-gray-600 text-white"
//               : "bg-white border-gray-300 text-gray-900"
//           }`}
//         />
//       </div>
//     </div>
//   );

//   // Step 8: Media & Review
//   const Step8MediaReview = () => (
//     <div className="space-y-6">
//       {/* Media Upload Section */}
//       <div>
//         <label
//           className={`block text-sm font-medium mb-2 ${
//             dark ? "text-gray-300" : "text-gray-700"
//           }`}
//         >
//           Supporting Materials
//         </label>
//         <div
//           className={`border-2 border-dashed rounded-sm p-8 text-center ${
//             dark
//               ? "border-gray-600 bg-gray-800/50"
//               : "border-gray-300 bg-gray-50"
//           }`}
//         >
//           <svg
//             className="mx-auto h-12 w-12 text-gray-400"
//             stroke="currentColor"
//             fill="none"
//             viewBox="0 0 48 48"
//           >
//             <path
//               d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//           <div className="mt-4">
//             <p
//               className={`text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}
//             >
//               Upload pitch deck, videos, or other supporting materials
//             </p>
//             <p
//               className={`text-xs mt-1 ${
//                 dark ? "text-gray-400" : "text-gray-500"
//               }`}
//             >
//               Supported: PDF, PNG, JPG, MP4 (Max 10MB each)
//             </p>
//           </div>
//           <input
//             type="file"
//             multiple
//             accept=".pdf,.png,.jpg,.jpeg,.mp4"
//             onChange={(e) => {
//               // Handle file upload logic here
//               console.log("Files selected:", e.target.files);
//             }}
//             className="mt-4"
//           />
//         </div>

//         {/* Display uploaded files */}
//         {formData.media.length > 0 && (
//           <div className="mt-4">
//             <h4
//               className={`text-sm font-medium mb-2 ${
//                 dark ? "text-gray-300" : "text-gray-700"
//               }`}
//             >
//               Uploaded Files:
//             </h4>
//             <div className="space-y-2">
//               {formData.media.map((file, index) => (
//                 <div
//                   key={index}
//                   className={`flex items-center justify-between p-3 rounded border ${
//                     dark
//                       ? "border-gray-600 bg-gray-700"
//                       : "border-gray-300 bg-gray-50"
//                   }`}
//                 >
//                   <div className="flex items-center gap-2">
//                     <span className="text-sm">📎</span>
//                     <span className="text-sm truncate">{file.url}</span>
//                     <span
//                       className={`text-xs px-2 py-1 rounded ${
//                         file.type === "pdf"
//                           ? "bg-red-100 text-red-700"
//                           : file.type === "image"
//                           ? "bg-blue-100 text-blue-700"
//                           : "bg-green-100 text-green-700"
//                       }`}
//                     >
//                       {file.type.toUpperCase()}
//                     </span>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => removeArrayItem("media", index)}
//                     className="text-red-500 hover:text-red-700 text-sm"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Pitch Summary/Review */}
//       <div
//         className={`border rounded-sm p-6 ${
//           dark
//             ? "border-gray-600 bg-gray-800/30"
//             : "border-gray-200 bg-gray-50/30"
//         }`}
//       >
//         <h3
//           className={`text-lg font-medium mb-4 ${
//             dark ? "text-white" : "text-gray-900"
//           }`}
//         >
//           Pitch Summary
//         </h3>
//         <div className="space-y-3 text-sm">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <span className="font-medium">Company:</span>{" "}
//               {formData.startupName || "Not specified"}
//             </div>
//             <div>
//               <span className="font-medium">Funding Ask:</span> $
//               {formData.fundingDetails.fundingAskAmount.toLocaleString() || "0"}
//             </div>
//             <div>
//               <span className="font-medium">Equity Offered:</span>{" "}
//               {formData.fundingDetails.equityOfferedPercent || 0}%
//             </div>
//             <div>
//               <span className="font-medium">Team Size:</span>{" "}
//               {formData.teamMembers.filter((tm) => tm.name).length + 1} members
//             </div>
//           </div>

//           <div>
//             <span className="font-medium">Value Proposition:</span>
//             <p className={`mt-1 ${dark ? "text-gray-300" : "text-gray-600"}`}>
//               {formData.oneLiner || "Not specified"}
//             </p>
//           </div>

//           <div className="pt-4">
//             <div
//               className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}
//             >
//               Completion: {calculateCompletionPercentage()}% • Last saved:{" "}
//               {new Date().toLocaleTimeString()}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Final Submission Checkbox */}
//       <div
//         className={`border rounded-sm p-4 ${
//           dark
//             ? "border-blue-500/30 bg-blue-500/5"
//             : "border-blue-200 bg-blue-50"
//         }`}
//       >
//         <label className="flex items-start gap-3">
//           <input type="checkbox" className="mt-1" required />
//           <div className="text-sm">
//             <p
//               className={`font-medium ${
//                 dark ? "text-blue-300" : "text-blue-900"
//               }`}
//             >
//               I confirm that all information provided is accurate and complete
//             </p>
//             <p
//               className={`mt-1 text-xs ${
//                 dark ? "text-blue-400" : "text-blue-700"
//               }`}
//             >
//               By submitting this pitch, you agree to our terms of service and
//               privacy policy. We will review your submission and contact you
//               within 5-7 business days.
//             </p>
//           </div>
//         </label>
//       </div>
//     </div>
//   );

//   return (
//     <div className={`min-h-screen ${dark ? "bg-gray-900" : "bg-gray-50"}`}>
//       <div className="max-w-6xl mx-auto p-4 lg:p-8">
//         {/* Progress Header */}
//         <div
//           className={`rounded-sm mb-8 ${
//             dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
//           } border`}
//         >
//           <div className="p-6">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h1
//                   className={`text-2xl font-bold ${
//                     dark ? "text-white" : "text-gray-900"
//                   }`}
//                 >
//                   Advanced Pitch Submission
//                 </h1>
//                 <p
//                   className={`text-sm mt-1 ${
//                     dark ? "text-gray-400" : "text-gray-600"
//                   }`}
//                 >
//                   Step {currentStep} of {formSteps.length} •{" "}
//                   {calculateCompletionPercentage()}% Complete
//                 </p>
//               </div>

//               {/* Auto-save indicator */}
//               {draftSaved && (
//                 <div
//                   className={`text-xs flex items-center gap-2 px-3 py-1 rounded-full border ${
//                     dark
//                       ? "text-blue-300 border-blue-500/30 bg-blue-500/10"
//                       : "text-blue-700 border-blue-300 bg-blue-50"
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
//                   Draft Saved
//                 </div>
//               )}
//             </div>

//             {/* Progress Steps */}
//             <div className="flex items-center justify-between mb-4">
//               {formSteps.map((step, index) => (
//                 <div key={step.id} className="flex flex-col items-center">
//                   <div
//                     className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
//                       step.id <= currentStep
//                         ? dark
//                           ? "bg-blue-600 text-white"
//                           : "bg-blue-600 text-white"
//                         : dark
//                         ? "bg-gray-700 text-gray-400"
//                         : "bg-gray-200 text-gray-500"
//                     }`}
//                   >
//                     {step.id <= currentStep
//                       ? step.id < currentStep
//                         ? "✓"
//                         : step.id
//                       : step.id}
//                   </div>
//                   <div className="text-xs mt-2 text-center max-w-[80px]">
//                     <div
//                       className={`font-medium ${
//                         step.id <= currentStep
//                           ? dark
//                             ? "text-white"
//                             : "text-gray-900"
//                           : dark
//                           ? "text-gray-500"
//                           : "text-gray-400"
//                       }`}
//                     >
//                       {step.title}
//                     </div>
//                   </div>
//                   {index < formSteps.length - 1 && (
//                     <div
//                       className={`absolute h-0.5 w-full mt-5 ${
//                         step.id < currentStep
//                           ? "bg-blue-600"
//                           : dark
//                           ? "bg-gray-700"
//                           : "bg-gray-200"
//                       }`}
//                       style={{
//                         left: "50%",
//                         width: "calc(100% - 40px)",
//                         marginLeft: "20px",
//                       }}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Progress Bar */}
//             <div
//               className={`w-full h-2 rounded-full ${
//                 dark ? "bg-gray-700" : "bg-gray-200"
//               }`}
//             >
//               <div
//                 className="h-2 bg-blue-600 rounded-full transition-all duration-500"
//                 style={{ width: `${(currentStep / formSteps.length) * 100}%` }}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Main Form */}
//         <div
//           className={`rounded-sm ${
//             dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
//           } border`}
//         >
//           <div className="p-6">
//             <div className="mb-8">
//               <h2
//                 className={`text-xl font-semibold flex items-center gap-2 ${
//                   dark ? "text-white" : "text-gray-900"
//                 }`}
//               >
//                 <span className="text-2xl">
//                   {formSteps[currentStep - 1].icon}
//                 </span>
//                 {formSteps[currentStep - 1].title}
//               </h2>
//               <p
//                 className={`text-sm mt-1 ${
//                   dark ? "text-gray-400" : "text-gray-600"
//                 }`}
//               >
//                 {formSteps[currentStep - 1].subtitle}
//               </p>
//             </div>

//             {/* Error Message */}
//             {error && (
//               <div className="mb-6 p-4 rounded-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 text-sm">
//                 {error}
//               </div>
//             )}

//             {/* Enhanced Content Display */}
//             {sampleEnhanced && enhanceField && (
//               <div
//                 className={`mb-6 p-4 rounded-sm border ${
//                   dark
//                     ? "border-gray-600 bg-gray-700"
//                     : "border-gray-200 bg-gray-50"
//                 }`}
//               >
//                 <div className="flex justify-between mb-2">
//                   <span className="text-sm font-medium">
//                     AI Enhanced Version
//                   </span>
//                   <div className="flex gap-2">
//                     <button
//                       type="button"
//                       onClick={() => {
//                         handleChange(enhanceField, sampleEnhanced);
//                         setSampleEnhanced("");
//                         setEnhanceField("");
//                       }}
//                       className="text-xs px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-300 rounded hover:bg-blue-500/20"
//                     >
//                       Apply
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => {
//                         setSampleEnhanced("");
//                         setEnhanceField("");
//                       }}
//                       className="text-xs px-3 py-1 text-gray-500 dark:text-gray-400 rounded hover:text-gray-700 dark:hover:text-gray-200"
//                     >
//                       Dismiss
//                     </button>
//                   </div>
//                 </div>
//                 <p className="text-sm">{sampleEnhanced}</p>
//               </div>
//             )}

//             {/* Step Content */}
//             <form onSubmit={handleSubmit}>
//               {renderStep()}

//               {/* Navigation Buttons */}
//               <div className="flex justify-between pt-8 border-t border-gray-200 dark:border-gray-700 mt-8">
//                 <button
//                   type="button"
//                   onClick={prevStep}
//                   disabled={currentStep === 1}
//                   className={`px-6 py-3 rounded-sm font-medium transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
//                     dark
//                       ? "bg-gray-700 text-white hover:bg-gray-600 disabled:bg-gray-800"
//                       : "bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100"
//                   }`}
//                 >
//                   Previous
//                 </button>

//                 <div className="flex gap-3">
//                   <button
//                     type="button"
//                     onClick={handleClearDraft}
//                     className={`px-6 py-3 rounded-sm font-medium transition duration-300 border ${
//                       dark
//                         ? "border-gray-600 text-gray-300 hover:bg-gray-700"
//                         : "border-gray-300 text-gray-700 hover:bg-gray-50"
//                     }`}
//                   >
//                     Clear Draft
//                   </button>

//                   {currentStep < formSteps.length ? (
//                     <button
//                       type="button"
//                       onClick={nextStep}
//                       className="px-6 py-3 bg-blue-600 text-white rounded-sm font-medium hover:bg-blue-700 transition duration-300"
//                     >
//                       Next Step
//                     </button>
//                   ) : (
//                     <button
//                       type="submit"
//                       disabled={loading || !validateStep(currentStep)}
//                       className="px-8 py-3 bg-green-600 text-white rounded-sm font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
//                     >
//                       {loading ? (
//                         <span className="flex items-center gap-2">
//                           <svg
//                             className="w-4 h-4 animate-spin"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                           >
//                             <circle
//                               cx="12"
//                               cy="12"
//                               r="10"
//                               stroke="currentColor"
//                               strokeWidth="4"
//                               className="opacity-25"
//                             />
//                             <path
//                               fill="currentColor"
//                               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                               className="opacity-75"
//                             />
//                           </svg>
//                           Submitting...
//                         </span>
//                       ) : (
//                         "Submit Pitch"
//                       )}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PitchForm;

// import React, { useState, useEffect } from "react";
// import api from "../utils/api1";
// import useThemeStore from "../store/themeStore";

// const PitchForm = () => {
//   const [pitchType, setPitchType] = useState(null);
//   const [customSteps, setCustomSteps] = useState([]);
//   const [isCustomMode, setIsCustomMode] = useState(false);
//   const [enabledSteps, setEnabledSteps] = useState([]);
//   const [currentStepIndex, setCurrentStepIndex] = useState(0);

//   const [formData, setFormData] = useState({
//     startupName: "",
//     oneLiner: "",
//     problem: "",
//     solution: "",
//     targetMarket: "",
//     customerSegments: [{ segmentName: "", size: 0, painPoints: "" }],
//     market: {
//       totalMarketSize: 0,
//       serviceableMarketSize: 0,
//       targetMarketSize: 0,
//       growthRatePercent: 0,
//     },
//     competition: "",
//     competitors: [{ name: "", website: "", strength: "", weakness: "" }],
//     businessModel: "",
//     traction: "",
//     productMetrics: {
//       monthlyActiveUsers: 0,
//       downloads: 0,
//       repeatCustomerRatePercent: 0,
//       keyAchievements: [""],
//     },
//     goToMarketStrategy: "",
//     founderName: "",
//     founderEmail: "",
//     teamMembers: [{ name: "", role: "", experienceYears: 0, linkedIn: "" }],
//     financials: {
//       revenueLastYear: 0,
//       revenueThisYear: 0,
//       netProfit: 0,
//       grossMarginPercent: 0,
//       customerAcquisitionCost: 0,
//       lifetimeValue: 0,
//       valuation: 0,
//     },
//     fundingDetails: {
//       fundingAskAmount: 0,
//       equityOfferedPercent: 0,
//       previousFundingRaised: 0,
//     },
//     valuationHistory: [],
//     milestones: [
//       { title: "", description: "", targetDate: "", status: "pending" },
//     ],
//     legal: {
//       patents: [""],
//       trademarks: [""],
//       licenses: [""],
//     },
//     exitStrategy: "",
//     media: [],
//   });

//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [draftSaved, setDraftSaved] = useState(false);
//   const [enhancing, setEnhancing] = useState(false);
//   const [enhanceField, setEnhanceField] = useState("");
//   const [sampleEnhanced, setSampleEnhanced] = useState("");
//   const dark = useThemeStore((s) => s.dark);

//   // Define pitch types with their required steps and descriptions
//   const pitchTypes = {
//     "SaaS/Software": {
//       steps: [1, 2, 3, 4, 5, 6, 7, 8],
//       description: "Software as a Service, web apps, mobile apps",
//       requiredFields: ["product metrics", "subscription model", "scalability"]
//     },
//     "E-commerce": {
//       steps: [1, 2, 3, 5, 6, 8],
//       description: "Online retail, marketplaces, direct-to-consumer",
//       requiredFields: ["inventory", "logistics", "customer acquisition"]
//     },
//     "Hardware/IoT": {
//       steps: [1, 2, 4, 5, 6, 7, 8],
//       description: "Physical products, IoT devices, manufacturing",
//       requiredFields: ["manufacturing", "IP protection", "supply chain"]
//     },
//     "Fintech": {
//       steps: [1, 2, 3, 5, 6, 7, 8],
//       description: "Financial services, payments, blockchain",
//       requiredFields: ["compliance", "security", "regulations"]
//     },
//     "Healthcare/Biotech": {
//       steps: [1, 2, 4, 5, 6, 7, 8],
//       description: "Medical devices, pharmaceuticals, health tech",
//       requiredFields: ["FDA approval", "clinical trials", "regulations"]
//     },
//     "Marketplace": {
//       steps: [1, 2, 3, 4, 5, 6, 8],
//       description: "Two-sided markets, platforms, aggregators",
//       requiredFields: ["network effects", "marketplace dynamics", "scaling"]
//     },
//     "Consumer Products": {
//       steps: [1, 2, 3, 5, 6, 8],
//       description: "Food & beverage, consumer goods, retail products",
//       requiredFields: ["brand building", "distribution", "marketing"]
//     },
//     "B2B Services": {
//       steps: [1, 2, 3, 4, 6, 8],
//       description: "Professional services, consulting, B2B solutions",
//       requiredFields: ["client acquisition", "service delivery", "contracts"]
//     },
//     "Early Stage": {
//       steps: [1, 2, 6, 8],
//       description: "Pre-revenue, concept stage, minimal viable product",
//       requiredFields: ["validation", "market research", "basic funding"]
//     },
//     "Growth Stage": {
//       steps: [1, 2, 3, 4, 5, 6, 7, 8],
//       description: "Established revenue, scaling, Series A/B funding",
//       requiredFields: ["metrics", "growth strategy", "team scaling"]
//     }
//   };

//   const allSteps = [
//     { id: 1, title: "Foundation", subtitle: "Company basics", required: true },
//     { id: 2, title: "Market", subtitle: "Analysis & competition", required: true },
//     { id: 3, title: "Business", subtitle: "Model & strategy", required: false },
//     { id: 4, title: "Team", subtitle: "Leadership & traction", required: false },
//     { id: 5, title: "Financials", subtitle: "Revenue & metrics", required: false },
//     { id: 6, title: "Investment", subtitle: "Funding needs", required: true },
//     { id: 7, title: "Strategy", subtitle: "Roadmap & legal", required: false },
//     { id: 8, title: "Review", subtitle: "Final submission", required: true },
//   ];

//   // Auto-save functionality
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const draftData = {
//         ...formData,
//         pitchType,
//         enabledSteps,
//         currentStepIndex,
//         isCustomMode,
//         customSteps,
//         lastSaved: new Date().toISOString(),
//       };

//       const hasContent =
//         JSON.stringify(formData) !== JSON.stringify(getInitialFormData());
//       if (hasContent) {
//         localStorage.setItem("advancedPitchDraft", JSON.stringify(draftData));
//         setDraftSaved(true);
//         setTimeout(() => setDraftSaved(false), 2500);
//       }
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [formData, pitchType, enabledSteps, currentStepIndex, isCustomMode, customSteps]);

//   // Load draft on component mount
//   useEffect(() => {
//     const savedDraft = localStorage.getItem("advancedPitchDraft");
//     if (savedDraft) {
//       try {
//         const parsedDraft = JSON.parse(savedDraft);
//         setFormData(parsedDraft);
//         setPitchType(parsedDraft.pitchType || null);
//         setEnabledSteps(parsedDraft.enabledSteps || []);
//         setCurrentStepIndex(parsedDraft.currentStepIndex || 0);
//         setIsCustomMode(parsedDraft.isCustomMode || false);
//         setCustomSteps(parsedDraft.customSteps || []);
//       } catch (error) {
//         console.error("Error parsing saved pitch draft:", error);
//         localStorage.removeItem("advancedPitchDraft");
//       }
//     }
//   }, []);

//   // Update enabled steps when pitch type changes
//   useEffect(() => {
//     if (pitchType && !isCustomMode) {
//       setEnabledSteps(pitchTypes[pitchType].steps);
//       setCurrentStepIndex(0);
//     }
//   }, [pitchType, isCustomMode]);

//   // Update enabled steps for custom mode
//   useEffect(() => {
//     if (isCustomMode) {
//       setEnabledSteps(customSteps);
//       setCurrentStepIndex(0);
//     }
//   }, [customSteps, isCustomMode]);

//   const currentStep = enabledSteps[currentStepIndex];
//   const totalSteps = enabledSteps.length;

//   const getInitialFormData = () => ({
//     startupName: "",
//     oneLiner: "",
//     problem: "",
//     solution: "",
//     targetMarket: "",
//     customerSegments: [{ segmentName: "", size: 0, painPoints: "" }],
//     market: {
//       totalMarketSize: 0,
//       serviceableMarketSize: 0,
//       targetMarketSize: 0,
//       growthRatePercent: 0,
//     },
//     competition: "",
//     competitors: [{ name: "", website: "", strength: "", weakness: "" }],
//     businessModel: "",
//     traction: "",
//     productMetrics: {
//       monthlyActiveUsers: 0,
//       downloads: 0,
//       repeatCustomerRatePercent: 0,
//       keyAchievements: [""],
//     },
//     goToMarketStrategy: "",
//     founderName: "",
//     founderEmail: "",
//     teamMembers: [{ name: "", role: "", experienceYears: 0, linkedIn: "" }],
//     financials: {
//       revenueLastYear: 0,
//       revenueThisYear: 0,
//       netProfit: 0,
//       grossMarginPercent: 0,
//       customerAcquisitionCost: 0,
//       lifetimeValue: 0,
//       valuation: 0,
//     },
//     fundingDetails: {
//       fundingAskAmount: 0,
//       equityOfferedPercent: 0,
//       previousFundingRaised: 0,
//     },
//     valuationHistory: [],
//     milestones: [
//       { title: "", description: "", targetDate: "", status: "pending" },
//     ],
//     legal: {
//       patents: [""],
//       trademarks: [""],
//       licenses: [""],
//     },
//     exitStrategy: "",
//     media: [],
//   });

//   const calculateCompletionPercentage = () => {
//     const totalFields = enabledSteps.length * 5; // Approximate fields per step
//     let completedFields = 0;

//     enabledSteps.forEach(stepId => {
//       switch (stepId) {
//         case 1:
//           if (formData.startupName) completedFields++;
//           if (formData.oneLiner) completedFields++;
//           if (formData.problem) completedFields++;
//           if (formData.solution) completedFields++;
//           break;
//         case 2:
//           if (formData.targetMarket) completedFields++;
//           if (formData.competition) completedFields++;
//           if (formData.competitors.some((c) => c.name)) completedFields++;
//           break;
//         case 3:
//           if (formData.businessModel) completedFields++;
//           if (formData.goToMarketStrategy) completedFields++;
//           break;
//         case 4:
//           if (formData.founderName) completedFields++;
//           if (formData.founderEmail) completedFields++;
//           if (formData.traction) completedFields++;
//           break;
//         case 5:
//           if (formData.financials.revenueThisYear >= 0) completedFields++;
//           break;
//         case 6:
//           if (formData.fundingDetails.fundingAskAmount > 0) completedFields++;
//           if (formData.fundingDetails.equityOfferedPercent > 0) completedFields++;
//           break;
//         case 7:
//           if (formData.exitStrategy) completedFields++;
//           break;
//         case 8:
//           completedFields++; // Review step is always considered complete when reached
//           break;
//       }
//     });

//     return Math.round((completedFields / totalFields) * 100);
//   };

//   const handleChange = (field, value, index = null, subField = null) => {
//     setFormData((prev) => {
//       if (index !== null && subField) {
//         const newArray = [...prev[field]];
//         newArray[index] = { ...newArray[index], [subField]: value };
//         return { ...prev, [field]: newArray };
//       } else if (index !== null) {
//         const newArray = [...prev[field]];
//         newArray[index] = value;
//         return { ...prev, [field]: newArray };
//       } else if (subField) {
//         return { ...prev, [field]: { ...prev[field], [subField]: value } };
//       } else {
//         return { ...prev, [field]: value };
//       }
//     });
//     if (error) setError("");
//   };

//   const addArrayItem = (fieldName, template) => {
//     setFormData((prev) => ({
//       ...prev,
//       [fieldName]: [...prev[fieldName], template],
//     }));
//   };

//   const removeArrayItem = (fieldName, index) => {
//     setFormData((prev) => ({
//       ...prev,
//       [fieldName]: prev[fieldName].filter((_, i) => i !== index),
//     }));
//   };

//   const handleAIEnhance = async (fieldName, content) => {
//     if (!content.trim()) {
//       setError("Please enter some content to enhance");
//       return;
//     }

//     setEnhancing(true);
//     setEnhanceField(fieldName);

//     try {
//       const res = await api.post("/user/ask", {
//         content: `
//           You are an expert investment pitch writer for ${pitchType || "startups"}.
//           Your job is to take the following text and:
//           1. Improve clarity, grammar, and flow for investor presentations.
//           2. Make it compelling and professionally persuasive for ${pitchType || "general"} investors.
//           3. Expand with relevant details that ${pitchType || "startup"} investors want to see.
//           4. Keep the tone confident yet realistic.
//           5. Return ONLY the improved version (no extra formatting or labels).

//           Context: This is for field "${fieldName}" in a ${pitchType || "startup"} investment pitch.

//           Here is the text to improve:
//           ---
//           ${content}
//           ---
//         `,
//       });
//       const enhancedContent = res.data.data.choices[0].message.content.trim();
//       setSampleEnhanced(enhancedContent);
//       setError("");
//     } catch (error) {
//       console.error("AI Enhancement error:", error);
//       setError("Failed to enhance content. Please try again.");
//     } finally {
//       setEnhancing(false);
//       setEnhanceField("");
//     }
//   };

//   const validateStep = (stepId) => {
//     switch (stepId) {
//       case 1:
//         return (
//           formData.startupName &&
//           formData.oneLiner &&
//           formData.problem &&
//           formData.solution
//         );
//       case 2:
//         return (
//           formData.targetMarket &&
//           formData.competition &&
//           formData.competitors.some((c) => c.name)
//         );
//       case 3:
//         return formData.businessModel && formData.goToMarketStrategy;
//       case 4:
//         return (
//           formData.founderName && formData.founderEmail && formData.traction
//         );
//       case 5:
//         return formData.financials.revenueThisYear >= 0;
//       case 6:
//         return (
//           formData.fundingDetails.fundingAskAmount > 0 &&
//           formData.fundingDetails.equityOfferedPercent > 0
//         );
//       case 7:
//         return formData.exitStrategy;
//       case 8:
//         return true;
//       default:
//         return true;
//     }
//   };

//   const nextStep = () => {
//     if (validateStep(currentStep)) {
//       setCurrentStepIndex((prev) => Math.min(prev + 1, totalSteps - 1));
//       setError("");
//     } else {
//       setError("Please complete all required fields before proceeding.");
//     }
//   };

//   const prevStep = () => {
//     setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const submissionData = {
//       pitchType,
//       enabledSteps,
//       startupName: formData.startupName,
//       oneLiner: formData.oneLiner,
//       problem: formData.problem,
//       solution: formData.solution,
//       targetMarket: formData.targetMarket,
//       customerSegments: formData.customerSegments.filter(
//         (cs) => cs.segmentName
//       ),
//       market: formData.market,
//       competition: formData.competition,
//       competitors: formData.competitors.filter((c) => c.name),
//       businessModel: formData.businessModel,
//       traction: formData.traction,
//       productMetrics: formData.productMetrics,
//       goToMarketStrategy: formData.goToMarketStrategy,
//       founderName: formData.founderName,
//       founderEmail: formData.founderEmail,
//       teamMembers: formData.teamMembers.filter((tm) => tm.name),
//       financials: formData.financials,
//       fundingDetails: formData.fundingDetails,
//       valuationHistory: formData.valuationHistory,
//       milestones: formData.milestones.filter((m) => m.title),
//       legal: {
//         patents: formData.legal.patents.filter((p) => p),
//         trademarks: formData.legal.trademarks.filter((t) => t),
//         licenses: formData.legal.licenses.filter((l) => l),
//       },
//       exitStrategy: formData.exitStrategy,
//       media: formData.media,
//     };

//     setLoading(true);
//     setError("");

//     try {
//       const res = await api.post("/user/posts/submitpitch", submissionData);
//       setMessage(res.data.message);
//       setSuccess(true);
//       localStorage.removeItem("advancedPitchDraft");
//     } catch (error) {
//       setError(
//         error.response?.data?.message ||
//           "Failed to submit pitch. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClearDraft = () => {
//     setFormData(getInitialFormData());
//     setPitchType(null);
//     setEnabledSteps([]);
//     setCurrentStepIndex(0);
//     setIsCustomMode(false);
//     setCustomSteps([]);
//     setSuccess(false);
//     setMessage("");
//     setError("");
//     setSampleEnhanced("");
//     localStorage.removeItem("advancedPitchDraft");
//   };

//   const handleCustomStepToggle = (stepId) => {
//     if (customSteps.includes(stepId)) {
//       setCustomSteps(customSteps.filter(id => id !== stepId));
//     } else {
//       setCustomSteps([...customSteps, stepId].sort((a, b) => a - b));
//     }
//   };

//   // Success screen
//   if (success) {
//     return (
//       <div className={`min-h-screen flex items-center justify-center p-6 ${dark ? "bg-gray-900" : "bg-gray-50"}`}>
//         <div className="w-full max-w-md text-center">
//           <div className={`p-8 rounded-sm ${dark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}>
//             <div className="w-16 h-16 mx-auto mb-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
//               <div className="w-8 h-8 text-green-600 text-2xl">✓</div>
//             </div>
//             <h3 className={`text-xl font-semibold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>
//               {pitchType} Pitch Submitted Successfully
//             </h3>
//             <p className={`text-sm mb-8 ${dark ? "text-gray-400" : "text-gray-600"}`}>
//               {message}
//             </p>
//             <button
//               onClick={handleClearDraft}
//               className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-sm font-medium transition-colors"
//             >
//               Create New Pitch
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Pitch Type Selection Screen
//   if (!pitchType) {
//     return (
//       <div className={`min-h-screen ${dark ? "bg-gray-900" : "bg-gray-50"}`}>
//         <div className="max-w-6xl mx-auto p-6">
//           <div className={`p-8 rounded-sm ${dark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}>
//             <div className="text-center mb-8">
//               <h1 className={`text-3xl font-bold mb-4 ${dark ? "text-white" : "text-gray-900"}`}>
//                 Create Your Pitch
//               </h1>
//               <p className={`text-lg ${dark ? "text-gray-300" : "text-gray-600"}`}>
//                 Choose your business type to get a customized pitch form
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//               {Object.entries(pitchTypes).map(([type, config]) => (
//                 <button
//                   key={type}
//                   onClick={() => setPitchType(type)}
//                   className={`p-6 rounded-sm border-2 text-left transition-all duration-200 hover:scale-105 ${
//                     dark
//                       ? "border-gray-600 hover:border-blue-500 bg-gray-700 hover:bg-gray-600"
//                       : "border-gray-200 hover:border-blue-500 bg-white hover:bg-blue-50"
//                   }`}
//                 >
//                   <h3 className={`text-lg font-semibold mb-2 ${dark ? "text-white" : "text-gray-900"}`}>
//                     {type}
//                   </h3>
//                   <p className={`text-sm mb-3 ${dark ? "text-gray-300" : "text-gray-600"}`}>
//                     {config.description}
//                   </p>
//                   <div className="flex flex-wrap gap-1">
//                     {config.steps.map((stepId) => (
//                       <span
//                         key={stepId}
//                         className={`text-xs px-2 py-1 rounded ${
//                           dark ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-700"
//                         }`}
//                       >
//                         {allSteps.find(s => s.id === stepId)?.title}
//                       </span>
//                     ))}
//                   </div>
//                 </button>
//               ))}
//             </div>

//             <div className="border-t pt-6">
//               <div className="flex items-center justify-center gap-4">
//                 <span className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>
//                   Need something different?
//                 </span>
//                 <button
//                   onClick={() => setIsCustomMode(true)}
//                   className={`px-4 py-2 rounded-sm border transition-colors ${
//                     dark
//                       ? "border-gray-600 text-gray-300 hover:bg-gray-700"
//                       : "border-gray-300 text-gray-700 hover:bg-gray-50"
//                   }`}
//                 >
//                   Customize Your Pitch
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Custom Step Selection Screen
//   if (isCustomMode && customSteps.length === 0) {
//     return (
//       <div className={`min-h-screen ${dark ? "bg-gray-900" : "bg-gray-50"}`}>
//         <div className="max-w-4xl mx-auto p-6">
//           <div className={`p-8 rounded-sm ${dark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}>
//             <div className="text-center mb-8">
//               <h1 className={`text-2xl font-bold mb-4 ${dark ? "text-white" : "text-gray-900"}`}>
//                 Customize Your Pitch
//               </h1>
//               <p className={`${dark ? "text-gray-300" : "text-gray-600"}`}>
//                 Select the sections that are relevant to your pitch
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//               {allSteps.map((step) => (
//                 <div
//                   key={step.id}
//                   className={`p-4 rounded-sm border-2 cursor-pointer transition-all ${
//                     customSteps.includes(step.id)
//                       ? dark
//                         ? "border-blue-500 bg-blue-900/20"
//                         : "border-blue-500 bg-blue-50"
//                       : dark
//                       ? "border-gray-600 hover:border-gray-500"
//                       : "border-gray-200 hover:border-gray-300"
//                   } ${step.required ? "opacity-50" : ""}`}
//                   onClick={() => !step.required && handleCustomStepToggle(step.id)}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h3 className={`font-semibold ${dark ? "text-white" : "text-gray-900"}`}>
//                         {step.title}
//                         {step.required && <span className="text-red-500 ml-1">*</span>}
//                       </h3>
//                       <p className={`text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>
//                         {step.subtitle}
//                       </p>
//                     </div>
//                     {(customSteps.includes(step.id) || step.required) && (
//                       <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
//                         ✓
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Required steps are automatically included */}
//             <p className={`text-sm mb-6 ${dark ? "text-gray-400" : "text-gray-600"}`}>
//               <span className="text-red-500">*</span> Required sections are automatically included
//             </p>

//             <div className="flex justify-between">
//               <button
//                 onClick={() => {
//                   setIsCustomMode(false);
//                   setCustomSteps([]);
//                 }}
//                 className={`px-6 py-3 rounded-sm border transition-colors ${
//                   dark
//                     ? "border-gray-600 text-gray-300 hover:bg-gray-700"
//                     : "border-gray-300 text-gray-700 hover:bg-gray-50"
//                 }`}
//               >
//                 Back to Templates
//               </button>

//               <button
//                 onClick={() => {
//                   const requiredSteps = allSteps.filter(s => s.required).map(s => s.id);
//                   const finalSteps = [...new Set([...requiredSteps, ...customSteps])].sort((a, b) => a - b);
//                   setCustomSteps(finalSteps);
//                   setPitchType("Custom");
//                 }}
//                 disabled={customSteps.length === 0}
//                 className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-sm transition-colors"
//               >
//                 Create Custom Pitch ({customSteps.length} additional sections)
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Common styles
//   const inputClasses = `w-full px-4 py-3 rounded-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
//     dark
//       ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
//       : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
//   }`;

//   const textareaClasses = `w-full px-4 py-3 rounded-sm border resize-none transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
//     dark
//       ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
//       : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
//   }`;

//   const labelClasses = `block text-sm font-medium mb-2 ${dark ? "text-gray-200" : "text-gray-700"}`;

//   const selectClasses = `w-full px-4 py-3 rounded-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
//     dark
//       ? "bg-gray-800 border-gray-600 text-white"
//       : "bg-white border-gray-300 text-gray-900"
//   }`;

//   // AI Enhancement Button
//   const AIEnhanceButton = ({ fieldName, content }) => (
//     <button
//       type="button"
//       onClick={() => handleAIEnhance(fieldName, content)}
//       disabled={!content.trim() || enhancing}
//       className={`px-3 py-2 text-sm rounded-md transition-colors ${
//         dark
//           ? "text-gray-400 hover:text-blue-400 hover:bg-gray-700"
//           : "text-gray-500 hover:text-blue-500 hover:bg-gray-100"
//       } disabled:opacity-50`}
//       title="Enhance with AI"
//     >
//       {enhancing && enhanceField === fieldName ? "Enhancing..." : "Enhance"}
//     </button>
//   );

//   // Enhanced Preview
//   const EnhancedPreview = ({ field, content }) => {
//     if (!sampleEnhanced || enhanceField !== field) return null;

//     return (
//       <div className={`mt-4 p-4 rounded-sm border ${dark ? "border-gray-600 bg-gray-700/50" : "border-gray-200 bg-gray-50"}`}>
//         <div className="flex items-center justify-between mb-3">
//           <span className="text-sm font-medium text-blue-600 dark:text-blue-400">AI Enhanced Version</span>
//           <div className="flex gap-2">
//             <button
//               type="button"
//               onClick={() => {
//                 handleChange(field, sampleEnhanced);
//                 setSampleEnhanced("");
//                 setEnhanceField("");
//               }}
//               className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//             >
//               Apply
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 setSampleEnhanced("");
//                 setEnhanceField("");
//               }}
//               className="px-3 py-1 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
//             >
//               Dismiss
//             </button>
//           </div>
//         </div>
//         <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{sampleEnhanced}</p>
//       </div>
//     );
//   };

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="space-y-6">
//             <div>
//               <label className={labelClasses}>
//                 Company Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={formData.startupName}
//                 onChange={(e) => handleChange("startupName", e.target.value)}
//                 placeholder="Enter your company name"
//                 maxLength={100}
//                 className={inputClasses}
//               />
//             </div>

//             <div>
//               <label className={labelClasses}>
//                 Value Proposition <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={formData.oneLiner}
//                 onChange={(e) => handleChange("oneLiner", e.target.value)}
//                 placeholder="Describe your company's core value proposition in one line"
//                 maxLength={200}
//                 className={inputClasses}
//               />
//               <div className="text-xs text-gray-500 mt-2">
//                 {formData.oneLiner.length}/200 characters
//               </div>
//             </div>

//             <div>
//               <div className="flex items-center justify-between">
//                 <label className={labelClasses}>
//                   Problem Statement <span className="text-red-500">*</span>
//                 </label>
//                 <AIEnhanceButton fieldName="problem" content={formData.problem} />
//               </div>
//               <textarea
//                 value={formData.problem}
//                 onChange={(e) => handleChange("problem", e.target.value)}
//                 placeholder="Define the significant problem or market inefficiency your company addresses"
//                 rows={5}
//                 className={textareaClasses}
//               />
//               <EnhancedPreview field="problem" content={formData.problem} />
//             </div>

//             <div>
//               <div className="flex items-center justify-between">
//                 <label className={labelClasses}>
//                   Solution Overview <span className="text-red-500">*</span>
//                 </label>
//                 <AIEnhanceButton fieldName="solution" content={formData.solution} />
//               </div>
//               <textarea
//                 value={formData.solution}
//                 onChange={(e) => handleChange("solution", e.target.value)}
//                 placeholder="Explain how your innovation provides a superior solution"
//                 rows={5}
//                 className={textareaClasses}
//               />
//               <EnhancedPreview field="solution" content={formData.solution} />
//             </div>
//           </div>
//         );

//       case 2:
//         return (
//           <div className="space-y-6">
//             <div>
//               <label className={labelClasses}>
//                 Target Market <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 value={formData.targetMarket}
//                 onChange={(e) => handleChange("targetMarket", e.target.value)}
//                 placeholder="Define your addressable market and customer segments"
//                 rows={4}
//                 className={textareaClasses}
//               />
//             </div>

//             <div>
//               <h4 className={`text-lg font-medium mb-4 ${dark ? "text-white" : "text-gray-900"}`}>
//                 Market Size
//               </h4>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className={labelClasses}>Total Addressable Market (TAM)</label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       value={formData.market.totalMarketSize === 0 ? "" : formData.market.totalMarketSize}
//                       onChange={(e) =>
//                         handleChange(
//                           "market",
//                           parseFloat(e.target.value) || 0,
//                           null,
//                           "totalMarketSize"
//                         )
//                       }
//                       placeholder="0"
//                       className={inputClasses}
//                     />
//                     <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">M $</span>
//                   </div>
//                 </div>
//                 <div>
//                   <label className={labelClasses}>Serviceable Available Market (SAM)</label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       value={formData.market.serviceableMarketSize === 0 ? "" : formData.market.serviceableMarketSize}
//                       onChange={(e) =>
//                         handleChange(
//                           "market",
//                           parseFloat(e.target.value) || 0,
//                           null,
//                           "serviceableMarketSize"
//                         )
//                       }
//                       placeholder="0"
//                       className={inputClasses}
//                     />
//                     <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">M $</span>
//                   </div>
//                 </div>
//                 <div>
//                   <label className={labelClasses}>Serviceable Obtainable Market (SOM)</label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       value={formData.market.targetMarketSize === 0 ? "" : formData.market.targetMarketSize}
//                       onChange={(e) =>
//                         handleChange(
//                           "market",
//                           parseFloat(e.target.value) || 0,
//                           null,
//                           "targetMarketSize"
//                         )
//                       }
//                       placeholder="0"
//                       className={inputClasses}
//                     />
//                     <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">M $</span>
//                   </div>
//                 </div>
//                 <div>
//                   <label className={labelClasses}>Market Growth Rate</label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       value={formData.market.growthRatePercent === 0 ? "" : formData.market.growthRatePercent}
//                       onChange={(e) =>
//                         handleChange(
//                           "market",
//                           parseFloat(e.target.value) || 0,
//                           null,
//                           "growthRatePercent"
//                         )
//                       }
//                       placeholder="0"
//                       className={inputClasses}
//                     />
//                     <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">%</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className={labelClasses}>Customer Segments</label>
//               <div className="space-y-4">
//                 {formData.customerSegments.map((segment, index) => (
//                   <div
//                     key={index}
//                     className={`p-4 rounded-sm border ${dark ? "border-gray-600 bg-gray-800/30" : "border-gray-200 bg-gray-50/30"} relative`}
//                   >
//                     {formData.customerSegments.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeArrayItem("customerSegments", index)}
//                         className="absolute top-2 right-2 w-6 h-6 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-sm flex items-center justify-center"
//                       >
//                         ×
//                       </button>
//                     )}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
//                       <input
//                         type="text"
//                         value={segment.segmentName}
//                         onChange={(e) =>
//                           handleChange(
//                             "customerSegments",
//                             e.target.value,
//                             index,
//                             "segmentName"
//                           )
//                         }
//                         placeholder="Segment name"
//                         className={inputClasses}
//                       />
//                       <input
//                         type="number"
//                         value={segment.size === 0 ? "" : segment.size}
//                         onChange={(e) =>
//                           handleChange(
//                             "customerSegments",
//                             parseInt(e.target.value) || 0,
//                             index,
//                             "size"
//                           )
//                         }
//                         placeholder="Segment size"
//                         className={inputClasses}
//                       />
//                     </div>
//                     <textarea
//                       value={segment.painPoints}
//                       onChange={(e) =>
//                         handleChange(
//                           "customerSegments",
//                           e.target.value,
//                           index,
//                           "painPoints"
//                         )
//                       }
//                       placeholder="Key pain points for this segment"
//                       rows={3}
//                       className={textareaClasses}
//                     />
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() =>
//                     addArrayItem("customerSegments", {
//                       segmentName: "",
//                       size: 0,
//                       painPoints: "",
//                     })
//                   }
//                   className={`w-full py-3 border-2 border-dashed rounded-sm transition-colors text-sm ${
//                     dark
//                       ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
//                       : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
//                   }`}
//                 >
//                   Add Customer Segment
//                 </button>
//               </div>
//             </div>

//             <div>
//               <label className={labelClasses}>
//                 Competition Overview <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 value={formData.competition}
//                 onChange={(e) => handleChange("competition", e.target.value)}
//                 placeholder="Describe the competitive landscape"
//                 rows={4}
//                 className={textareaClasses}
//               />
//             </div>

//             <div>
//               <label className={labelClasses}>Key Competitors</label>
//               <div className="space-y-4">
//                 {formData.competitors.map((competitor, index) => (
//                   <div
//                     key={index}
//                     className={`p-4 rounded-sm border ${dark ? "border-gray-600 bg-gray-800/30" : "border-gray-200 bg-gray-50/30"} relative`}
//                   >
//                     {formData.competitors.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeArrayItem("competitors", index)}
//                         className="absolute top-2 right-2 w-6 h-6 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-sm flex items-center justify-center"
//                       >
//                         ×
//                       </button>
//                     )}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
//                       <input
//                         type="text"
//                         value={competitor.name}
//                         onChange={(e) =>
//                           handleChange("competitors", e.target.value, index, "name")
//                         }
//                         placeholder="Competitor name"
//                         className={inputClasses}
//                       />
//                       <input
//                         type="url"
//                         value={competitor.website}
//                         onChange={(e) =>
//                           handleChange("competitors", e.target.value, index, "website")
//                         }
//                         placeholder="Website URL"
//                         className={inputClasses}
//                       />
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <textarea
//                         value={competitor.strength}
//                         onChange={(e) =>
//                           handleChange("competitors", e.target.value, index, "strength")
//                         }
//                         placeholder="Their strengths"
//                         rows={3}
//                         className={textareaClasses}
//                       />
//                       <textarea
//                         value={competitor.weakness}
//                         onChange={(e) =>
//                           handleChange("competitors", e.target.value, index, "weakness")
//                         }
//                         placeholder="Their weaknesses"
//                         rows={3}
//                         className={textareaClasses}
//                       />
//                     </div>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() =>
//                     addArrayItem("competitors", {
//                       name: "",
//                       website: "",
//                       strength: "",
//                       weakness: "",
//                     })
//                   }
//                   className={`w-full py-3 border-2 border-dashed rounded-sm transition-colors text-sm ${
//                     dark
//                       ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
//                       : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
//                   }`}
//                 >
//                   Add Competitor
//                 </button>
//               </div>
//             </div>
//           </div>
//         );

//       case 3:
//         return (
//           <div className="space-y-6">
//             <div>
//               <label className={labelClasses}>
//                 Business Model <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 value={formData.businessModel}
//                 onChange={(e) => handleChange("businessModel", e.target.value)}
//                 placeholder="Describe your revenue model and monetization strategy"
//                 rows={4}
//                 className={textareaClasses}
//               />
//             </div>

//             <div>
//               <label className={labelClasses}>
//                 Go-to-Market Strategy <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 value={formData.goToMarketStrategy}
//                 onChange={(e) => handleChange("goToMarketStrategy", e.target.value)}
//                 placeholder="Detail your customer acquisition and market penetration approach"
//                 rows={4}
//                 className={textareaClasses}
//               />
//             </div>

//             <div>
//               <h4 className={`text-lg font-medium mb-4 ${dark ? "text-white" : "text-gray-900"}`}>
//                 Product Metrics
//               </h4>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className={labelClasses}>Monthly Active Users</label>
//                   <input
//                     type="number"
//                     value={formData.productMetrics.monthlyActiveUsers === 0 ? "" : formData.productMetrics.monthlyActiveUsers}
//                     onChange={(e) =>
//                       handleChange(
//                         "productMetrics",
//                         parseInt(e.target.value) || 0,
//                         null,
//                         "monthlyActiveUsers"
//                       )
//                     }
//                     placeholder="0"
//                     className={inputClasses}
//                   />
//                 </div>
//                 <div>
//                   <label className={labelClasses}>Total Downloads</label>
//                   <input
//                     type="number"
//                     value={formData.productMetrics.downloads === 0 ? "" : formData.productMetrics.downloads}
//                     onChange={(e) =>
//                       handleChange(
//                         "productMetrics",
//                         parseInt(e.target.value) || 0,
//                         null,
//                         "downloads"
//                       )
//                     }
//                     placeholder="0"
//                     className={inputClasses}
//                   />
//                 </div>
//                 <div>
//                   <label className={labelClasses}>Repeat Customer Rate</label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       value={formData.productMetrics.repeatCustomerRatePercent === 0 ? "" : formData.productMetrics.repeatCustomerRatePercent}
//                       onChange={(e) =>
//                         handleChange(
//                           "productMetrics",
//                           parseFloat(e.target.value) || 0,
//                           null,
//                           "repeatCustomerRatePercent"
//                         )
//                       }
//                       placeholder="0"
//                       className={inputClasses}
//                     />
//                     <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">%</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className={labelClasses}>Key Achievements</label>
//               <div className="space-y-3">
//                 {formData.productMetrics.keyAchievements.map((achievement, index) => (
//                   <div key={index} className="flex gap-3">
//                     <input
//                       type="text"
//                       value={achievement}
//                       onChange={(e) =>
//                         handleChange(
//                           "productMetrics",
//                           e.target.value,
//                           index,
//                           "keyAchievements"
//                         )
//                       }
//                       placeholder="Describe a key achievement"
//                       className={inputClasses}
//                     />
//                     {formData.productMetrics.keyAchievements.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => {
//                           const newAchievements =
//                             formData.productMetrics.keyAchievements.filter(
//                               (_, i) => i !== index
//                             );
//                           handleChange(
//                             "productMetrics",
//                             newAchievements,
//                             null,
//                             "keyAchievements"
//                           );
//                         }}
//                         className="w-10 h-10 rounded bg-red-100 dark:bg-red-900/20 text-red-600 hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center text-sm"
//                       >
//                         ×
//                       </button>
//                     )}
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() => {
//                     const newAchievements = [
//                       ...formData.productMetrics.keyAchievements,
//                       "",
//                     ];
//                     handleChange(
//                       "productMetrics",
//                       newAchievements,
//                       null,
//                       "keyAchievements"
//                     );
//                   }}
//                   className={`w-full py-3 border-2 border-dashed rounded-sm transition-colors text-sm ${
//                     dark
//                       ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
//                       : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
//                   }`}
//                 >
//                   Add Achievement
//                 </button>
//               </div>
//             </div>
//           </div>
//         );

//       case 4:
//         return (
//           <div className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className={labelClasses}>
//                   Founder Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.founderName}
//                   onChange={(e) => handleChange("founderName", e.target.value)}
//                   placeholder="Your full name"
//                   className={inputClasses}
//                 />
//               </div>
//               <div>
//                 <label className={labelClasses}>
//                   Founder Email <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   value={formData.founderEmail}
//                   onChange={(e) => handleChange("founderEmail", e.target.value)}
//                   placeholder="your.email@company.com"
//                   className={inputClasses}
//                 />
//               </div>
//             </div>

//             <div>
//               <label className={labelClasses}>Team Members</label>
//               <div className="space-y-4">
//                 {formData.teamMembers.map((member, index) => (
//                   <div
//                     key={index}
//                     className={`p-4 rounded-sm border ${dark ? "border-gray-600 bg-gray-800/30" : "border-gray-200 bg-gray-50/30"} relative`}
//                   >
//                     {formData.teamMembers.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeArrayItem("teamMembers", index)}
//                         className="absolute top-2 right-2 w-6 h-6 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-sm flex items-center justify-center"
//                       >
//                         ×
//                       </button>
//                     )}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
//                       <input
//                         type="text"
//                         value={member.name}
//                         onChange={(e) =>
//                           handleChange("teamMembers", e.target.value, index, "name")
//                         }
//                         placeholder="Full name"
//                         className={inputClasses}
//                       />
//                       <input
//                         type="text"
//                         value={member.role}
//                         onChange={(e) =>
//                           handleChange("teamMembers", e.target.value, index, "role")
//                         }
//                         placeholder="Role/Position"
//                         className={inputClasses}
//                       />
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <input
//                         type="number"
//                         value={member.experienceYears === 0 ? "" : member.experienceYears}
//                         onChange={(e) =>
//                           handleChange(
//                             "teamMembers",
//                             parseInt(e.target.value) || 0,
//                             index,
//                             "experienceYears"
//                           )
//                         }
//                         placeholder="Years of experience"
//                         className={inputClasses}
//                       />
//                       <input
//                         type="url"
//                         value={member.linkedIn}
//                         onChange={(e) =>
//                           handleChange("teamMembers", e.target.value, index, "linkedIn")
//                         }
//                         placeholder="LinkedIn profile URL"
//                         className={inputClasses}
//                       />
//                     </div>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() =>
//                     addArrayItem("teamMembers", {
//                       name: "",
//                       role: "",
//                       experienceYears: 0,
//                       linkedIn: "",
//                     })
//                   }
//                   className={`w-full py-3 border-2 border-dashed rounded-sm transition-colors text-sm ${
//                     dark
//                       ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
//                       : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
//                   }`}
//                 >
//                   Add Team Member
//                 </button>
//               </div>
//             </div>

//             <div>
//               <label className={labelClasses}>
//                 Current Traction <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 value={formData.traction}
//                 onChange={(e) => handleChange("traction", e.target.value)}
//                 placeholder="Present key metrics, milestones, and validation achieved"
//                 rows={5}
//                 className={textareaClasses}
//               />
//             </div>
//           </div>
//         );

//       case 5:
//         return (
//           <div className="space-y-6">
//             <h3 className={`text-lg font-medium ${dark ? "text-white" : "text-gray-900"}`}>
//               Financial Metrics
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               <div>
//                 <label className={labelClasses}>Revenue Last Year</label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
//                   <input
//                     type="number"
//                     value={formData.financials.revenueLastYear === 0 ? "" : formData.financials.revenueLastYear}
//                     onChange={(e) =>
//                       handleChange(
//                         "financials",
//                         parseFloat(e.target.value) || 0,
//                         null,
//                         "revenueLastYear"
//                       )
//                     }
//                     placeholder="0"
//                     className={`${inputClasses} pl-8`}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className={labelClasses}>Revenue This Year</label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
//                   <input
//                     type="number"
//                     value={formData.financials.revenueThisYear === 0 ? "" : formData.financials.revenueThisYear}
//                     onChange={(e) =>
//                       handleChange(
//                         "financials",
//                         parseFloat(e.target.value) || 0,
//                         null,
//                         "revenueThisYear"
//                       )
//                     }
//                     placeholder="0"
//                     className={`${inputClasses} pl-8`}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className={labelClasses}>Net Profit</label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
//                   <input
//                     type="number"
//                     value={formData.financials.netProfit === 0 ? "" : formData.financials.netProfit}
//                     onChange={(e) =>
//                       handleChange(
//                         "financials",
//                         parseFloat(e.target.value) || 0,
//                         null,
//                         "netProfit"
//                       )
//                     }
//                     placeholder="0"
//                     className={`${inputClasses} pl-8`}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className={labelClasses}>Gross Margin</label>
//                 <div className="relative">
//                   <input
//                     type="number"
//                     min="0"
//                     max="100"
//                     value={formData.financials.grossMarginPercent === 0 ? "" : formData.financials.grossMarginPercent}
//                     onChange={(e) =>
//                       handleChange(
//                         "financials",
//                         parseFloat(e.target.value) || 0,
//                         null,
//                         "grossMarginPercent"
//                       )
//                     }
//                     placeholder="0"
//                     className={inputClasses}
//                   />
//                   <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">%</span>
//                 </div>
//               </div>

//               <div>
//                 <label className={labelClasses}>Customer Acquisition Cost</label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
//                   <input
//                     type="number"
//                     value={formData.financials.customerAcquisitionCost === 0 ? "" : formData.financials.customerAcquisitionCost}
//                     onChange={(e) =>
//                       handleChange(
//                         "financials",
//                         parseFloat(e.target.value) || 0,
//                         null,
//                         "customerAcquisitionCost"
//                       )
//                     }
//                     placeholder="0"
//                     className={`${inputClasses} pl-8`}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className={labelClasses}>Lifetime Value</label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
//                   <input
//                     type="number"
//                     value={formData.financials.lifetimeValue === 0 ? "" : formData.financials.lifetimeValue}
//                     onChange={(e) =>
//                       handleChange(
//                         "financials",
//                         parseFloat(e.target.value) || 0,
//                         null,
//                         "lifetimeValue"
//                       )
//                     }
//                     placeholder="0"
//                     className={`${inputClasses} pl-8`}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className={labelClasses}>Current Valuation</label>
//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
//                 <input
//                   type="number"
//                   value={formData.financials.valuation === 0 ? "" : formData.financials.valuation}
//                   onChange={(e) =>
//                     handleChange(
//                       "financials",
//                       parseFloat(e.target.value) || 0,
//                       null,
//                       "valuation"
//                     )
//                   }
//                   placeholder="0"
//                   className={`${inputClasses} pl-8`}
//                 />
//               </div>
//             </div>

//             {/* Financial Summary */}
//             {formData.financials.lifetimeValue > 0 &&
//               formData.financials.customerAcquisitionCost > 0 && (
//                 <div className={`p-4 rounded-sm ${dark ? "bg-blue-900/20" : "bg-blue-50"}`}>
//                   <h4 className={`font-medium mb-3 ${dark ? "text-white" : "text-gray-900"}`}>
//                     Calculated Metrics
//                   </h4>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//                     <div className="text-center">
//                       <div className="text-xl font-bold text-blue-600">
//                         {(
//                           formData.financials.lifetimeValue /
//                           formData.financials.customerAcquisitionCost
//                         ).toFixed(1)}
//                       </div>
//                       <div className="text-gray-600 dark:text-gray-400">LTV/CAC Ratio</div>
//                     </div>
//                     {formData.financials.revenueThisYear > 0 &&
//                       formData.financials.revenueLastYear > 0 && (
//                         <div className="text-center">
//                           <div className="text-xl font-bold text-green-600">
//                             {(
//                               ((formData.financials.revenueThisYear -
//                                 formData.financials.revenueLastYear) /
//                                 formData.financials.revenueLastYear) *
//                               100
//                             ).toFixed(1)}%
//                           </div>
//                           <div className="text-gray-600 dark:text-gray-400">Revenue Growth</div>
//                         </div>
//                       )}
//                     {formData.financials.revenueThisYear > 0 &&
//                       formData.financials.netProfit !== 0 && (
//                         <div className="text-center">
//                           <div className="text-xl font-bold text-orange-600">
//                             ${(
//                               (formData.financials.revenueThisYear -
//                                 formData.financials.netProfit) /
//                               12
//                             ).toLocaleString()}
//                           </div>
//                           <div className="text-gray-600 dark:text-gray-400">Monthly Burn</div>
//                         </div>
//                       )}
//                   </div>
//                 </div>
//               )}
//           </div>
//         );

//       case 6:
//         return (
//           <div className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className={labelClasses}>
//                   Funding Amount Requested <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
//                   <input
//                     type="number"
//                     value={formData.fundingDetails.fundingAskAmount === 0 ? "" : formData.fundingDetails.fundingAskAmount}
//                     onChange={(e) =>
//                       handleChange(
//                         "fundingDetails",
//                         parseFloat(e.target.value) || 0,
//                         null,
//                         "fundingAskAmount"
//                       )
//                     }
//                     placeholder="0"
//                     className={`${inputClasses} pl-8`}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className={labelClasses}>
//                   Equity Offered <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="number"
//                     min="0"
//                     max="100"
//                     step="0.1"
//                     value={formData.fundingDetails.equityOfferedPercent === 0 ? "" : formData.fundingDetails.equityOfferedPercent}
//                     onChange={(e) =>
//                       handleChange(
//                         "fundingDetails",
//                         parseFloat(e.target.value) || 0,
//                         null,
//                         "equityOfferedPercent"
//                       )
//                     }
//                     placeholder="0"
//                     className={inputClasses}
//                   />
//                   <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">%</span>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className={labelClasses}>Previous Funding Raised</label>
//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
//                 <input
//                   type="number"
//                   value={formData.fundingDetails.previousFundingRaised === 0 ? "" : formData.fundingDetails.previousFundingRaised}
//                   onChange={(e) =>
//                     handleChange(
//                       "fundingDetails",
//                       parseFloat(e.target.value) || 0,
//                       null,
//                       "previousFundingRaised"
//                     )
//                   }
//                   placeholder="0"
//                   className={`${inputClasses} pl-8`}
//                 />
//               </div>
//             </div>

//             {/* Valuation Calculation */}
//             {formData.fundingDetails.fundingAskAmount > 0 &&
//               formData.fundingDetails.equityOfferedPercent > 0 && (
//                 <div className={`p-4 rounded-sm ${dark ? "bg-green-900/20" : "bg-green-50"}`}>
//                   <h4 className={`font-medium mb-3 ${dark ? "text-white" : "text-gray-900"}`}>
//                     Implied Valuation
//                   </h4>
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-green-600 mb-1">
//                       ${(
//                         (formData.fundingDetails.fundingAskAmount /
//                           formData.fundingDetails.equityOfferedPercent) *
//                         100
//                       ).toLocaleString()}
//                     </div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                       Based on ${formData.fundingDetails.fundingAskAmount.toLocaleString()} for{" "}
//                       {formData.fundingDetails.equityOfferedPercent}% equity
//                     </p>
//                   </div>
//                 </div>
//               )}

//             <div>
//               <label className={labelClasses}>Valuation History (Optional)</label>
//               <div className="space-y-4">
//                 {formData.valuationHistory.map((valuation, index) => (
//                   <div
//                     key={index}
//                     className={`p-4 rounded-sm border ${dark ? "border-gray-600 bg-gray-800/30" : "border-gray-200 bg-gray-50/30"} relative`}
//                   >
//                     <button
//                       type="button"
//                       onClick={() => removeArrayItem("valuationHistory", index)}
//                       className="absolute top-2 right-2 w-6 h-6 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-sm flex items-center justify-center"
//                     >
//                       ×
//                     </button>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
//                       <input
//                         type="date"
//                         value={
//                           valuation.date
//                             ? new Date(valuation.date).toISOString().split("T")[0]
//                             : ""
//                         }
//                         onChange={(e) =>
//                           handleChange(
//                             "valuationHistory",
//                             e.target.value,
//                             index,
//                             "date"
//                           )
//                         }
//                         className={inputClasses}
//                       />
//                       <select
//                         value={valuation.roundType || "Seed"}
//                         onChange={(e) =>
//                           handleChange(
//                             "valuationHistory",
//                             e.target.value,
//                             index,
//                             "roundType"
//                           )
//                         }
//                         className={selectClasses}
//                       >
//                         <option value="Seed">Seed</option>
//                         <option value="Series A">Series A</option>
//                         <option value="Series B">Series B</option>
//                         <option value="Other">Other</option>
//                       </select>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="relative">
//                         <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
//                         <input
//                           type="number"
//                           value={valuation.valuation === 0 ? "" : valuation.valuation}
//                           onChange={(e) =>
//                             handleChange(
//                               "valuationHistory",
//                               parseFloat(e.target.value) || 0,
//                               index,
//                               "valuation"
//                             )
//                           }
//                           placeholder="Valuation"
//                           className={`${inputClasses} pl-8`}
//                         />
//                       </div>
//                       <div className="relative">
//                         <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
//                         <input
//                           type="number"
//                           value={valuation.fundingRaised === 0 ? "" : valuation.fundingRaised}
//                           onChange={(e) =>
//                             handleChange(
//                               "valuationHistory",
//                               parseFloat(e.target.value) || 0,
//                               index,
//                               "fundingRaised"
//                             )
//                           }
//                           placeholder="Funding Raised"
//                           className={`${inputClasses} pl-8`}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() =>
//                     addArrayItem("valuationHistory", {
//                       date: new Date().toISOString(),
//                       valuation: 0,
//                       fundingRaised: 0,
//                       roundType: "Seed",
//                     })
//                   }
//                   className={`w-full py-3 border-2 border-dashed rounded-sm transition-colors text-sm ${
//                     dark
//                       ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
//                       : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
//                   }`}
//                 >
//                   Add Previous Round
//                 </button>
//               </div>
//             </div>
//           </div>
//         );

//       case 7:
//         return (
//           <div className="space-y-6">
//             <div>
//               <label className={labelClasses}>Key Milestones & Roadmap</label>
//               <div className="space-y-4">
//                 {formData.milestones.map((milestone, index) => (
//                   <div
//                     key={index}
//                     className={`p-4 rounded-sm border ${dark ? "border-gray-600 bg-gray-800/30" : "border-gray-200 bg-gray-50/30"} relative`}
//                   >
//                     {formData.milestones.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeArrayItem("milestones", index)}
//                         className="absolute top-2 right-2 w-6 h-6 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-sm flex items-center justify-center"
//                       >
//                         ×
//                       </button>
//                     )}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
//                       <input
//                         type="text"
//                         value={milestone.title}
//                         onChange={(e) =>
//                           handleChange("milestones", e.target.value, index, "title")
//                         }
//                         placeholder="Milestone title"
//                         className={inputClasses}
//                       />
//                       <input
//                         type="date"
//                         value={
//                           milestone.targetDate
//                             ? new Date(milestone.targetDate).toISOString().split("T")[0]
//                             : ""
//                         }
//                         onChange={(e) =>
//                           handleChange(
//                             "milestones",
//                             e.target.value,
//                             index,
//                             "targetDate"
//                           )
//                         }
//                         className={inputClasses}
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <textarea
//                         value={milestone.description}
//                         onChange={(e) =>
//                           handleChange(
//                             "milestones",
//                             e.target.value,
//                             index,
//                             "description"
//                           )
//                         }
//                         placeholder="Describe this milestone"
//                         rows={3}
//                         className={textareaClasses}
//                       />
//                     </div>
//                     <select
//                       value={milestone.status || "pending"}
//                       onChange={(e) =>
//                         handleChange("milestones", e.target.value, index, "status")
//                       }
//                       className={selectClasses}
//                     >
//                       <option value="pending">Pending</option>
//                       <option value="achieved">Achieved</option>
//                       <option value="delayed">Delayed</option>
//                     </select>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() =>
//                     addArrayItem("milestones", {
//                       title: "",
//                       description: "",
//                       targetDate: "",
//                       status: "pending",
//                     })
//                   }
//                   className={`w-full py-3 border-2 border-dashed rounded-sm transition-colors text-sm ${
//                     dark
//                       ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
//                       : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
//                   }`}
//                 >
//                   Add Milestone
//                 </button>
//               </div>
//             </div>

//             <div>
//               <h4 className={`text-lg font-medium mb-4 ${dark ? "text-white" : "text-gray-900"}`}>
//                 Intellectual Property
//               </h4>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className={labelClasses}>Patents</label>
//                   <div className="space-y-3">
//                     {formData.legal.patents.map((patent, index) => (
//                       <div key={index} className="flex gap-2">
//                         <input
//                           type="text"
//                           value={patent}
//                           onChange={(e) =>
//                             handleChange("legal", e.target.value, index, "patents")
//                           }
//                           placeholder="Patent title/number"
//                           className={inputClasses}
//                         />
//                         {formData.legal.patents.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => {
//                               const newPatents = formData.legal.patents.filter(
//                                 (_, i) => i !== index
//                               );
//                               handleChange("legal", newPatents, null, "patents");
//                             }}
//                             className="w-10 h-10 rounded bg-red-100 dark:bg-red-900/20 text-red-600 hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center text-sm"
//                           >
//                             ×
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                     <button
//                       type="button"
//                       onClick={() => {
//                         const newPatents = [...formData.legal.patents, ""];
//                         handleChange("legal", newPatents, null, "patents");
//                       }}
//                       className={`w-full py-2 border-2 border-dashed rounded-sm text-sm transition-colors ${
//                         dark
//                           ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
//                           : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
//                       }`}
//                     >
//                       Add Patent
//                     </button>
//                   </div>
//                 </div>

//                 <div>
//                   <label className={labelClasses}>Trademarks</label>
//                   <div className="space-y-3">
//                     {formData.legal.trademarks.map((trademark, index) => (
//                       <div key={index} className="flex gap-2">
//                         <input
//                           type="text"
//                           value={trademark}
//                           onChange={(e) =>
//                             handleChange("legal", e.target.value, index, "trademarks")
//                           }
//                           placeholder="Trademark name"
//                           className={inputClasses}
//                         />
//                         {formData.legal.trademarks.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => {
//                               const newTrademarks = formData.legal.trademarks.filter(
//                                 (_, i) => i !== index
//                               );
//                               handleChange("legal", newTrademarks, null, "trademarks");
//                             }}
//                             className="w-10 h-10 rounded bg-red-100 dark:bg-red-900/20 text-red-600 hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center text-sm"
//                           >
//                             ×
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                     <button
//                       type="button"
//                       onClick={() => {
//                         const newTrademarks = [...formData.legal.trademarks, ""];
//                         handleChange("legal", newTrademarks, null, "trademarks");
//                       }}
//                       className={`w-full py-2 border-2 border-dashed rounded-sm text-sm transition-colors ${
//                         dark
//                           ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
//                           : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
//                       }`}
//                     >
//                       Add Trademark
//                     </button>
//                   </div>
//                 </div>

//                 <div>
//                   <label className={labelClasses}>Licenses</label>
//                   <div className="space-y-3">
//                     {formData.legal.licenses.map((license, index) => (
//                       <div key={index} className="flex gap-2">
//                         <input
//                           type="text"
//                           value={license}
//                           onChange={(e) =>
//                             handleChange("legal", e.target.value, index, "licenses")
//                           }
//                           placeholder="License type/name"
//                           className={inputClasses}
//                         />
//                         {formData.legal.licenses.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => {
//                               const newLicenses = formData.legal.licenses.filter(
//                                 (_, i) => i !== index
//                               );
//                               handleChange("legal", newLicenses, null, "licenses");
//                             }}
//                             className="w-10 h-10 rounded bg-red-100 dark:bg-red-900/20 text-red-600 hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center text-sm"
//                           >
//                             ×
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                     <button
//                       type="button"
//                       onClick={() => {
//                         const newLicenses = [...formData.legal.licenses, ""];
//                         handleChange("legal", newLicenses, null, "licenses");
//                       }}
//                       className={`w-full py-2 border-2 border-dashed rounded-sm text-sm transition-colors ${
//                         dark
//                           ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
//                           : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
//                       }`}
//                     >
//                       Add License
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className={labelClasses}>
//                 Exit Strategy <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 value={formData.exitStrategy}
//                 onChange={(e) => handleChange("exitStrategy", e.target.value)}
//                 placeholder="Describe your long-term exit strategy (IPO, acquisition, etc.)"
//                 rows={4}
//                 className={textareaClasses}
//               />
//             </div>
//           </div>
//         );

//       case 8:
//         return (
//           <div className="space-y-6">
//             <div>
//               <label className={labelClasses}>Supporting Materials</label>
//               <div
//                 className={`border-2 border-dashed rounded-sm p-8 text-center transition-colors ${
//                   dark
//                     ? "border-gray-600 hover:border-gray-500 bg-gray-800/30"
//                     : "border-gray-300 hover:border-gray-400 bg-gray-50/30"
//                 }`}
//               >
//                 <div className={`w-12 h-12 mx-auto mb-4 rounded-sm flex items-center justify-center ${
//                   dark ? "bg-gray-700" : "bg-gray-100"
//                 }`}>
//                   <div className="text-gray-400 text-xl">📎</div>
//                 </div>
//                 <h4 className={`text-lg font-medium mb-2 ${dark ? "text-white" : "text-gray-900"}`}>
//                   Upload supporting documents
//                 </h4>
//                 <p className={`text-sm mb-4 ${dark ? "text-gray-400" : "text-gray-600"}`}>
//                   Upload pitch deck, videos, or other supporting materials
//                 </p>
//                 <p className={`text-xs ${dark ? "text-gray-500" : "text-gray-500"}`}>
//                   Supported: PDF, PNG, JPG, MP4 (Max 10MB each)
//                 </p>
//                 <input
//                   type="file"
//                   multiple
//                   accept=".pdf,.png,.jpg,.jpeg,.mp4"
//                   onChange={(e) => {
//                     console.log("Files selected:", e.target.files);
//                   }}
//                   className="mt-4"
//                 />
//               </div>

//               {formData.media.length > 0 && (
//                 <div className="mt-6">
//                   <h4 className={`text-sm font-medium mb-4 ${dark ? "text-gray-300" : "text-gray-700"}`}>
//                     Uploaded Files
//                   </h4>
//                   <div className="space-y-3">
//                     {formData.media.map((file, index) => (
//                       <div
//                         key={index}
//                         className={`flex items-center justify-between p-3 rounded-sm border ${
//                           dark
//                             ? "border-gray-600 bg-gray-700/50"
//                             : "border-gray-300 bg-gray-50"
//                         }`}
//                       >
//                         <div className="flex items-center gap-3">
//                           <div className={`w-8 h-8 rounded flex items-center justify-center ${
//                             file.type === "pdf"
//                               ? "bg-red-100 text-red-600"
//                               : file.type === "image"
//                               ? "bg-blue-100 text-blue-600"
//                               : "bg-green-100 text-green-600"
//                           }`}>
//                             📎
//                           </div>
//                           <div>
//                             <div className="text-sm font-medium truncate max-w-xs">{file.url}</div>
//                             <div className="text-xs text-gray-500">{file.type.toUpperCase()}</div>
//                           </div>
//                         </div>
//                         <button
//                           type="button"
//                           onClick={() => removeArrayItem("media", index)}
//                           className="text-red-500 hover:text-red-700 text-sm px-3 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className={`p-6 rounded-sm border ${dark ? "border-gray-600 bg-gray-800/50" : "border-gray-200 bg-gray-50"}`}>
//               <h3 className={`text-xl font-semibold mb-6 ${dark ? "text-white" : "text-gray-900"}`}>
//                 {pitchType} Pitch Summary
//               </h3>

//               {/* Show enabled sections */}
//               <div className="mb-6">
//                 <h4 className={`text-sm font-medium mb-3 ${dark ? "text-gray-300" : "text-gray-700"}`}>
//                   Included Sections
//                 </h4>
//                 <div className="flex flex-wrap gap-2">
//                   {enabledSteps.map(stepId => (
//                     <span
//                       key={stepId}
//                       className={`text-xs px-3 py-1 rounded-full ${
//                         dark ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-700"
//                       }`}
//                     >
//                       {allSteps.find(s => s.id === stepId)?.title}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
//                 <div className="space-y-4">
//                   <div>
//                     <span className="font-medium text-gray-500 dark:text-gray-400">Company:</span>
//                     <div className={`mt-1 ${dark ? "text-white" : "text-gray-900"}`}>
//                       {formData.startupName || "Not specified"}
//                     </div>
//                   </div>
//                   <div>
//                     <span className="font-medium text-gray-500 dark:text-gray-400">Pitch Type:</span>
//                     <div className={`mt-1 ${dark ? "text-white" : "text-gray-900"}`}>
//                       {pitchType}
//                     </div>
//                   </div>
//                   <div>
//                     <span className="font-medium text-gray-500 dark:text-gray-400">Funding Ask:</span>
//                     <div className={`mt-1 text-lg font-bold text-green-600`}>
//                       ${formData.fundingDetails.fundingAskAmount.toLocaleString() || "0"}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="space-y-4">
//                   <div>
//                     <span className="font-medium text-gray-500 dark:text-gray-400">Equity Offered:</span>
//                     <div className={`mt-1 ${dark ? "text-white" : "text-gray-900"}`}>
//                       {formData.fundingDetails.equityOfferedPercent || 0}%
//                     </div>
//                   </div>
//                   <div>
//                     <span className="font-medium text-gray-500 dark:text-gray-400">Team Size:</span>
//                     <div className={`mt-1 ${dark ? "text-white" : "text-gray-900"}`}>
//                       {formData.teamMembers.filter((tm) => tm.name).length + 1} members
//                     </div>
//                   </div>
//                   <div>
//                     <span className="font-medium text-gray-500 dark:text-gray-400">Completion:</span>
//                     <div className={`mt-1 ${dark ? "text-white" : "text-gray-900"}`}>
//                       {calculateCompletionPercentage()}%
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {formData.oneLiner && (
//                 <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
//                   <span className="font-medium text-gray-500 dark:text-gray-400">Value Proposition:</span>
//                   <p className={`mt-2 leading-relaxed ${dark ? "text-gray-300" : "text-gray-700"}`}>
//                     {formData.oneLiner}
//                   </p>
//                 </div>
//               )}
//             </div>

//             <div className={`p-6 rounded-sm border-2 ${dark ? "border-blue-500/30 bg-blue-500/5" : "border-blue-200 bg-blue-50"}`}>
//               <label className="flex items-start gap-4 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   required
//                   className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500 focus:ring-2"
//                 />
//                 <div className="text-sm">
//                   <p className={`font-medium mb-2 ${dark ? "text-blue-300" : "text-blue-900"}`}>
//                     I confirm that all information provided is accurate and complete
//                   </p>
//                   <p className={`text-xs leading-relaxed ${dark ? "text-blue-400" : "text-blue-700"}`}>
//                     By submitting this {pitchType} pitch, you agree to our terms of service and privacy policy.
//                     We will review your submission and contact you within 5-7 business days.
//                   </p>
//                 </div>
//               </label>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className={`min-h-screen ${dark ? "bg-gray-900" : "bg-gray-50"}`}>
//       <div className="max-w-4xl mx-auto p-6">
//         {/* Header with Pitch Type */}
//         {pitchType && (
//           <div className={`mb-8 p-6 rounded-sm ${dark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}>
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <div className="flex items-center gap-3">
//                   <h1 className={`text-2xl font-bold ${dark ? "text-white" : "text-gray-900"}`}>
//                     {pitchType} Pitch
//                   </h1>
//                   <button
//                     onClick={() => {
//                       setPitchType(null);
//                       setEnabledSteps([]);
//                       setCurrentStepIndex(0);
//                     }}
//                     className={`px-3 py-1 text-sm rounded-sm border transition-colors ${
//                       dark
//                         ? "border-gray-600 text-gray-400 hover:text-white hover:border-gray-500"
//                         : "border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400"
//                     }`}
//                   >
//                     Change Type
//                   </button>
//                 </div>
//                 <p className={`text-sm mt-1 ${dark ? "text-gray-400" : "text-gray-600"}`}>
//                   Step {currentStepIndex + 1} of {totalSteps}
//                 </p>
//               </div>

//               {draftSaved && (
//                 <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
//                   dark
//                     ? "text-blue-300 bg-blue-500/10 border border-blue-500/30"
//                     : "text-blue-700 bg-blue-50 border border-blue-200"
//                 }`}>
//                   <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                   Draft Saved
//                 </div>
//               )}
//             </div>

//             {/* Progress Steps - Only show enabled steps */}
//             <div className="flex items-center justify-between mb-6">
//               {enabledSteps.map((stepId, index) => {
//                 const step = allSteps.find(s => s.id === stepId);
//                 return (
//                   <div key={stepId} className="flex flex-col items-center relative">
//                     <div
//                       className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
//                         index <= currentStepIndex
//                           ? "bg-blue-600 text-white"
//                           : dark
//                           ? "bg-gray-700 text-gray-400"
//                           : "bg-gray-200 text-gray-500"
//                       }`}
//                     >
//                       {index < currentStepIndex ? "✓" : stepId}
//                     </div>
//                     <div className="text-xs mt-3 text-center max-w-[70px]">
//                       <div
//                         className={`font-medium ${
//                           index <= currentStepIndex
//                             ? dark
//                               ? "text-white"
//                               : "text-gray-900"
//                             : dark
//                             ? "text-gray-500"
//                             : "text-gray-400"
//                         }`}
//                       >
//                         {step?.title}
//                       </div>
//                       <div
//                         className={`text-xs mt-1 ${
//                           index <= currentStepIndex
//                             ? dark
//                               ? "text-gray-400"
//                               : "text-gray-500"
//                             : dark
//                             ? "text-gray-600"
//                             : "text-gray-400"
//                         }`}
//                       >
//                         {step?.subtitle}
//                       </div>
//                     </div>
//                     {index < enabledSteps.length - 1 && (
//                       <div
//                         className={`absolute top-5 left-5 h-px w-full ${
//                           index < currentStepIndex
//                             ? "bg-blue-600"
//                             : dark
//                             ? "bg-gray-700"
//                             : "bg-gray-300"
//                         }`}
//                         style={{
//                           width: "calc(100% - 20px)",
//                           marginLeft: "30px",
//                         }}
//                       />
//                     )}
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Progress Bar */}
//             <div className={`w-full h-2 rounded-full ${dark ? "bg-gray-700" : "bg-gray-200"}`}>
//               <div
//                 className="h-2 bg-blue-600 rounded-full transition-all duration-500"
//                 style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
//               />
//             </div>
//           </div>
//         )}

//         {/* Main Form */}
//         {pitchType && (
//           <div className={`rounded-sm ${dark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}>
//             <div className="p-8">
//               <div className="mb-8">
//                 <h2 className={`text-2xl font-semibold ${dark ? "text-white" : "text-gray-900"}`}>
//                   {allSteps.find(s => s.id === currentStep)?.title}
//                 </h2>
//                 <p className={`text-sm mt-1 ${dark ? "text-gray-400" : "text-gray-600"}`}>
//                   {allSteps.find(s => s.id === currentStep)?.subtitle}
//                 </p>
//               </div>

//               {error && (
//                 <div className="mb-8 p-4 rounded-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 text-sm">
//                   {error}
//                 </div>
//               )}

//               <form onSubmit={handleSubmit}>
//                 {renderStepContent()}

//                 {/* Navigation */}
//                 <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-200 dark:border-gray-700">
//                   <button
//                     type="button"
//                     onClick={prevStep}
//                     disabled={currentStepIndex === 0}
//                     className={`px-6 py-3 rounded-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
//                       dark
//                         ? "bg-gray-700 text-white hover:bg-gray-600 disabled:bg-gray-800"
//                         : "bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100"
//                     }`}
//                   >
//                     Previous
//                   </button>

//                   <div className="flex items-center gap-3">
//                     <button
//                       type="button"
//                       onClick={handleClearDraft}
//                       className={`px-6 py-3 rounded-sm font-medium transition-all duration-200 border ${
//                         dark
//                           ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500"
//                           : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
//                       }`}
//                     >
//                       Clear Draft
//                     </button>

//                     {currentStepIndex < totalSteps - 1 ? (
//                       <button
//                         type="button"
//                         onClick={nextStep}
//                         className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-sm font-medium transition-all duration-200"
//                       >
//                         Next Step
//                       </button>
//                     ) : (
//                       <button
//                         type="submit"
//                         disabled={loading || !validateStep(currentStep)}
//                         className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-sm font-medium transition-all duration-200"
//                       >
//                         {loading ? (
//                           <span className="flex items-center gap-2">
//                             <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                             Submitting...
//                           </span>
//                         ) : (
//                           "Submit Pitch"
//                         )}
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PitchForm;

// import React, { useState, useEffect } from "react";
// import api from "../utils/api1";
// import useThemeStore from "../store/themeStore";

// const PitchForm = () => {
//   const [pitchType, setPitchType] = useState(null);
//   const [customSteps, setCustomSteps] = useState([]);
//   const [isCustomMode, setIsCustomMode] = useState(false);
//   const [enabledSteps, setEnabledSteps] = useState([]);
//   const [currentStepIndex, setCurrentStepIndex] = useState(0);

//   const [formData, setFormData] = useState({
//     startupName: "",
//     oneLiner: "",
//     problem: "",
//     solution: "",
//     targetMarket: "",
//     customerSegments: [{ segmentName: "", size: 0, painPoints: "" }],
//     market: {
//       totalMarketSize: 0,
//       serviceableMarketSize: 0,
//       targetMarketSize: 0,
//       growthRatePercent: 0,
//     },
//     competition: "",
//     competitors: [{ name: "", website: "", strength: "", weakness: "" }],
//     businessModel: "",
//     traction: "",
//     productMetrics: {
//       monthlyActiveUsers: 0,
//       downloads: 0,
//       repeatCustomerRatePercent: 0,
//       keyAchievements: [""],
//     },
//     goToMarketStrategy: "",
//     founderName: "",
//     founderEmail: "",
//     teamMembers: [{ name: "", role: "", experienceYears: 0, linkedIn: "" }],
//     financials: {
//       revenueLastYear: 0,
//       revenueThisYear: 0,
//       netProfit: 0,
//       grossMarginPercent: 0,
//       customerAcquisitionCost: 0,
//       lifetimeValue: 0,
//       valuation: 0,
//     },
//     fundingDetails: {
//       fundingAskAmount: 0,
//       equityOfferedPercent: 0,
//       previousFundingRaised: 0,
//     },
//     valuationHistory: [],
//     milestones: [
//       { title: "", description: "", targetDate: "", status: "pending" },
//     ],
//     legal: {
//       patents: [""],
//       trademarks: [""],
//       licenses: [""],
//     },
//     exitStrategy: "",
//     media: [],
//   });

//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [draftSaved, setDraftSaved] = useState(false);
//   const [enhancing, setEnhancing] = useState(false);
//   const [enhanceField, setEnhanceField] = useState("");
//   const [sampleEnhanced, setSampleEnhanced] = useState("");
//   const dark = useThemeStore((s) => s.dark);

//   // Define pitch types with their required steps and descriptions
//   const pitchTypes = {
//     "SaaS/Software": {
//       steps: [1, 2, 3, 4, 5, 6, 7, 8],
//       description: "Software as a Service, web apps, mobile apps",
//       requiredFields: ["product metrics", "subscription model", "scalability"]
//     },
//     "E-commerce": {
//       steps: [1, 2, 3, 5, 6, 8],
//       description: "Online retail, marketplaces, direct-to-consumer",
//       requiredFields: ["inventory", "logistics", "customer acquisition"]
//     },
//     "Hardware/IoT": {
//       steps: [1, 2, 4, 5, 6, 7, 8],
//       description: "Physical products, IoT devices, manufacturing",
//       requiredFields: ["manufacturing", "IP protection", "supply chain"]
//     },
//     "Fintech": {
//       steps: [1, 2, 3, 5, 6, 7, 8],
//       description: "Financial services, payments, blockchain",
//       requiredFields: ["compliance", "security", "regulations"]
//     },
//     "Healthcare/Biotech": {
//       steps: [1, 2, 4, 5, 6, 7, 8],
//       description: "Medical devices, pharmaceuticals, health tech",
//       requiredFields: ["FDA approval", "clinical trials", "regulations"]
//     },
//     "Marketplace": {
//       steps: [1, 2, 3, 4, 5, 6, 8],
//       description: "Two-sided markets, platforms, aggregators",
//       requiredFields: ["network effects", "marketplace dynamics", "scaling"]
//     },
//     "Consumer Products": {
//       steps: [1, 2, 3, 5, 6, 8],
//       description: "Food & beverage, consumer goods, retail products",
//       requiredFields: ["brand building", "distribution", "marketing"]
//     },
//     "B2B Services": {
//       steps: [1, 2, 3, 4, 6, 8],
//       description: "Professional services, consulting, B2B solutions",
//       requiredFields: ["client acquisition", "service delivery", "contracts"]
//     },
//     "Early Stage": {
//       steps: [1, 2, 6, 8],
//       description: "Pre-revenue, concept stage, minimal viable product",
//       requiredFields: ["validation", "market research", "basic funding"]
//     },
//     "Growth Stage": {
//       steps: [1, 2, 3, 4, 5, 6, 7, 8],
//       description: "Established revenue, scaling, Series A/B funding",
//       requiredFields: ["metrics", "growth strategy", "team scaling"]
//     }
//   };

//   const allSteps = [
//     { id: 1, title: "Foundation", subtitle: "Company basics", required: true },
//     { id: 2, title: "Market", subtitle: "Analysis & competition", required: true },
//     { id: 3, title: "Business", subtitle: "Model & strategy", required: false },
//     { id: 4, title: "Team", subtitle: "Leadership & traction", required: false },
//     { id: 5, title: "Financials", subtitle: "Revenue & metrics", required: false },
//     { id: 6, title: "Investment", subtitle: "Funding needs", required: true },
//     { id: 7, title: "Strategy", subtitle: "Roadmap & legal", required: false },
//     { id: 8, title: "Review", subtitle: "Final submission", required: true },
//   ];

//   const getInitialFormData = () => ({
//     startupName: "",
//     oneLiner: "",
//     problem: "",
//     solution: "",
//     targetMarket: "",
//     customerSegments: [{ segmentName: "", size: 0, painPoints: "" }],
//     market: {
//       totalMarketSize: 0,
//       serviceableMarketSize: 0,
//       targetMarketSize: 0,
//       growthRatePercent: 0,
//     },
//     competition: "",
//     competitors: [{ name: "", website: "", strength: "", weakness: "" }],
//     businessModel: "",
//     traction: "",
//     productMetrics: {
//       monthlyActiveUsers: 0,
//       downloads: 0,
//       repeatCustomerRatePercent: 0,
//       keyAchievements: [""],
//     },
//     goToMarketStrategy: "",
//     founderName: "",
//     founderEmail: "",
//     teamMembers: [{ name: "", role: "", experienceYears: 0, linkedIn: "" }],
//     financials: {
//       revenueLastYear: 0,
//       revenueThisYear: 0,
//       netProfit: 0,
//       grossMarginPercent: 0,
//       customerAcquisitionCost: 0,
//       lifetimeValue: 0,
//       valuation: 0,
//     },
//     fundingDetails: {
//       fundingAskAmount: 0,
//       equityOfferedPercent: 0,
//       previousFundingRaised: 0,
//     },
//     valuationHistory: [],
//     milestones: [
//       { title: "", description: "", targetDate: "", status: "pending" },
//     ],
//     legal: {
//       patents: [""],
//       trademarks: [""],
//       licenses: [""],
//     },
//     exitStrategy: "",
//     media: [],
//   });

//   // Auto-save functionality
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const draftData = {
//         ...formData,
//         pitchType,
//         enabledSteps,
//         currentStepIndex,
//         isCustomMode,
//         customSteps,
//         lastSaved: new Date().toISOString(),
//       };

//       const hasContent =
//         JSON.stringify(formData) !== JSON.stringify(getInitialFormData());
//       if (hasContent) {
//         localStorage.setItem("advancedPitchDraft", JSON.stringify(draftData));
//         setDraftSaved(true);
//         setTimeout(() => setDraftSaved(false), 2500);
//       }
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [formData, pitchType, enabledSteps, currentStepIndex, isCustomMode, customSteps]);

//   // Load draft on component mount
//   useEffect(() => {
//     const savedDraft = localStorage.getItem("advancedPitchDraft");
//     if (savedDraft) {
//       try {
//         const parsedDraft = JSON.parse(savedDraft);

//         // Ensure array fields are properly initialized
//         const defaultData = getInitialFormData();
//         const mergedData = {
//           ...defaultData,
//           ...parsedDraft,
//           // Ensure critical array fields are arrays
//           customerSegments: Array.isArray(parsedDraft.customerSegments) ? parsedDraft.customerSegments : defaultData.customerSegments,
//           competitors: Array.isArray(parsedDraft.competitors) ? parsedDraft.competitors : defaultData.competitors,
//           teamMembers: Array.isArray(parsedDraft.teamMembers) ? parsedDraft.teamMembers : defaultData.teamMembers,
//           valuationHistory: Array.isArray(parsedDraft.valuationHistory) ? parsedDraft.valuationHistory : defaultData.valuationHistory,
//           milestones: Array.isArray(parsedDraft.milestones) ? parsedDraft.milestones : defaultData.milestones,
//           media: Array.isArray(parsedDraft.media) ? parsedDraft.media : defaultData.media,
//           productMetrics: {
//             ...defaultData.productMetrics,
//             ...(parsedDraft.productMetrics || {}),
//             keyAchievements: Array.isArray(parsedDraft.productMetrics?.keyAchievements)
//               ? parsedDraft.productMetrics.keyAchievements
//               : defaultData.productMetrics.keyAchievements
//           },
//           legal: {
//             ...defaultData.legal,
//             ...(parsedDraft.legal || {}),
//             patents: Array.isArray(parsedDraft.legal?.patents) ? parsedDraft.legal.patents : defaultData.legal.patents,
//             trademarks: Array.isArray(parsedDraft.legal?.trademarks) ? parsedDraft.legal.trademarks : defaultData.legal.trademarks,
//             licenses: Array.isArray(parsedDraft.legal?.licenses) ? parsedDraft.legal.licenses : defaultData.legal.licenses,
//           }
//         };

//         setFormData(mergedData);
//         setPitchType(parsedDraft.pitchType || null);
//         setEnabledSteps(Array.isArray(parsedDraft.enabledSteps) ? parsedDraft.enabledSteps : []);
//         setCurrentStepIndex(parsedDraft.currentStepIndex || 0);
//         setIsCustomMode(parsedDraft.isCustomMode || false);
//         setCustomSteps(Array.isArray(parsedDraft.customSteps) ? parsedDraft.customSteps : []);
//       } catch (error) {
//         console.error("Error parsing saved pitch draft:", error);
//         localStorage.removeItem("advancedPitchDraft");
//       }
//     }
//   }, []);

//   // Update enabled steps when pitch type changes
//   useEffect(() => {
//     if (pitchType && !isCustomMode) {
//       setEnabledSteps(pitchTypes[pitchType].steps);
//       setCurrentStepIndex(0);
//     }
//   }, [pitchType, isCustomMode]);

//   // Update enabled steps for custom mode
//   useEffect(() => {
//     if (isCustomMode) {
//       setEnabledSteps(customSteps);
//       setCurrentStepIndex(0);
//     }
//   }, [customSteps, isCustomMode]);

//   const currentStep = enabledSteps[currentStepIndex];
//   const totalSteps = enabledSteps.length;

//   const calculateCompletionPercentage = () => {
//     const totalFields = enabledSteps.length * 5; // Approximate fields per step
//     let completedFields = 0;

//     enabledSteps.forEach(stepId => {
//       switch (stepId) {
//         case 1:
//           if (formData.startupName) completedFields++;
//           if (formData.oneLiner) completedFields++;
//           if (formData.problem) completedFields++;
//           if (formData.solution) completedFields++;
//           break;
//         case 2:
//           if (formData.targetMarket) completedFields++;
//           if (formData.competition) completedFields++;
//           if (formData.competitors.some((c) => c.name)) completedFields++;
//           break;
//         case 3:
//           if (formData.businessModel) completedFields++;
//           if (formData.goToMarketStrategy) completedFields++;
//           break;
//         case 4:
//           if (formData.founderName) completedFields++;
//           if (formData.founderEmail) completedFields++;
//           if (formData.traction) completedFields++;
//           break;
//         case 5:
//           if (formData.financials.revenueThisYear >= 0) completedFields++;
//           break;
//         case 6:
//           if (formData.fundingDetails.fundingAskAmount > 0) completedFields++;
//           if (formData.fundingDetails.equityOfferedPercent > 0) completedFields++;
//           break;
//         case 7:
//           if (formData.exitStrategy) completedFields++;
//           break;
//         case 8:
//           completedFields++; // Review step is always considered complete when reached
//           break;
//       }
//     });

//     return Math.round((completedFields / totalFields) * 100);
//   };

//   const handleChange = (field, value, index = null, subField = null) => {
//     setFormData((prev) => {
//       try {
//         if (index !== null && subField) {
//           // Special handling for nested object arrays like productMetrics.keyAchievements
//           if (field === "productMetrics" && subField === "keyAchievements") {
//             const currentAchievements = prev.productMetrics?.keyAchievements;
//             if (!Array.isArray(currentAchievements)) {
//               console.error("keyAchievements is not an array:", currentAchievements);
//               return prev;
//             }
//             const newAchievements = [...currentAchievements];
//             newAchievements[index] = value;
//             return {
//               ...prev,
//               productMetrics: {
//                 ...prev.productMetrics,
//                 keyAchievements: newAchievements
//               }
//             };
//           }

//           // Special handling for nested legal arrays
//           if (field === "legal" && (subField === "patents" || subField === "trademarks" || subField === "licenses")) {
//             const currentArray = prev.legal?.[subField];
//             if (!Array.isArray(currentArray)) {
//               console.error(`${subField} is not an array:`, currentArray);
//               return prev;
//             }
//             const newArray = [...currentArray];
//             newArray[index] = value;
//             return {
//               ...prev,
//               legal: {
//                 ...prev.legal,
//                 [subField]: newArray
//               }
//             };
//           }

//           // Regular array field handling
//           const currentField = prev[field];
//           if (!Array.isArray(currentField)) {
//             console.error(`Expected ${field} to be an array, but got:`, currentField);
//             return prev;
//           }

//           const newArray = [...currentField];
//           newArray[index] = { ...newArray[index], [subField]: value };
//           return { ...prev, [field]: newArray };
//         } else if (index !== null) {
//           // Handle array updates without subField
//           const currentField = prev[field];
//           if (!Array.isArray(currentField)) {
//             console.error(`Expected ${field} to be an array, but got:`, currentField);
//             return prev;
//           }

//           const newArray = [...currentField];
//           newArray[index] = value;
//           return { ...prev, [field]: newArray };
//         } else if (subField) {
//           // Handle nested object updates
//           return { ...prev, [field]: { ...prev[field], [subField]: value } };
//         } else {
//           // Handle simple field updates
//           return { ...prev, [field]: value };
//         }
//       } catch (error) {
//         console.error("Error in handleChange:", error);
//         return prev;
//       }
//     });
//     if (error) setError("");
//   };

//   const addArrayItem = (fieldName, template) => {
//     setFormData((prev) => {
//       const currentField = prev[fieldName];
//       if (!Array.isArray(currentField)) {
//         console.error(`Expected ${fieldName} to be an array, but got:`, currentField);
//         return prev;
//       }
//       return {
//         ...prev,
//         [fieldName]: [...currentField, template],
//       };
//     });
//   };

//   const removeArrayItem = (fieldName, index) => {
//     setFormData((prev) => {
//       const currentField = prev[fieldName];
//       if (!Array.isArray(currentField)) {
//         console.error(`Expected ${fieldName} to be an array, but got:`, currentField);
//         return prev;
//       }
//       return {
//         ...prev,
//         [fieldName]: currentField.filter((_, i) => i !== index),
//       };
//     });
//   };

//   const handleAIEnhance = async (fieldName, content) => {
//     if (!content.trim()) {
//       setError("Please enter some content to enhance");
//       return;
//     }

//     setEnhancing(true);
//     setEnhanceField(fieldName);

//     try {
//       const res = await api.post("/user/ask", {
//         content: `
//           You are an expert investment pitch writer for ${pitchType || "startups"}.
//           Your job is to take the following text and:
//           1. Improve clarity, grammar, and flow for investor presentations.
//           2. Make it compelling and professionally persuasive for ${pitchType || "general"} investors.
//           3. Expand with relevant details that ${pitchType || "startup"} investors want to see.
//           4. Keep the tone confident yet realistic.
//           5. Return ONLY the improved version (no extra formatting or labels).

//           Context: This is for field "${fieldName}" in a ${pitchType || "startup"} investment pitch.

//           Here is the text to improve:
//           ---
//           ${content}
//           ---
//         `,
//       });
//       const enhancedContent = res.data.data.choices[0].message.content.trim();
//       setSampleEnhanced(enhancedContent);
//       setError("");
//     } catch (error) {
//       console.error("AI Enhancement error:", error);
//       setError("Failed to enhance content. Please try again.");
//     } finally {
//       setEnhancing(false);
//       setEnhanceField("");
//     }
//   };

//   const validateStep = (stepId) => {
//     switch (stepId) {
//       case 1:
//         return (
//           formData.startupName &&
//           formData.oneLiner &&
//           formData.problem &&
//           formData.solution
//         );
//       case 2:
//         return (
//           formData.targetMarket &&
//           formData.competition &&
//           formData.competitors.some((c) => c.name)
//         );
//       case 3:
//         return formData.businessModel && formData.goToMarketStrategy;
//       case 4:
//         return (
//           formData.founderName && formData.founderEmail && formData.traction
//         );
//       case 5:
//         return formData.financials.revenueThisYear >= 0;
//       case 6:
//         return (
//           formData.fundingDetails.fundingAskAmount > 0 &&
//           formData.fundingDetails.equityOfferedPercent > 0
//         );
//       case 7:
//         return formData.exitStrategy;
//       case 8:
//         return true;
//       default:
//         return true;
//     }
//   };

//   const nextStep = () => {
//     if (validateStep(currentStep)) {
//       setCurrentStepIndex((prev) => Math.min(prev + 1, totalSteps - 1));
//       setError("");
//     } else {
//       setError("Please complete all required fields before proceeding.");
//     }
//   };

//   const prevStep = () => {
//     setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const submissionData = {
//       pitchType,
//       enabledSteps,
//       startupName: formData.startupName,
//       oneLiner: formData.oneLiner,
//       problem: formData.problem,
//       solution: formData.solution,
//       targetMarket: formData.targetMarket,
//       customerSegments: formData.customerSegments.filter(
//         (cs) => cs.segmentName
//       ),
//       market: formData.market,
//       competition: formData.competition,
//       competitors: formData.competitors.filter((c) => c.name),
//       businessModel: formData.businessModel,
//       traction: formData.traction,
//       productMetrics: formData.productMetrics,
//       goToMarketStrategy: formData.goToMarketStrategy,
//       founderName: formData.founderName,
//       founderEmail: formData.founderEmail,
//       teamMembers: formData.teamMembers.filter((tm) => tm.name),
//       financials: formData.financials,
//       fundingDetails: formData.fundingDetails,
//       valuationHistory: formData.valuationHistory,
//       milestones: formData.milestones.filter((m) => m.title),
//       legal: {
//         patents: formData.legal.patents.filter((p) => p),
//         trademarks: formData.legal.trademarks.filter((t) => t),
//         licenses: formData.legal.licenses.filter((l) => l),
//       },
//       exitStrategy: formData.exitStrategy,
//       media: formData.media,
//     };

//     setLoading(true);
//     setError("");

//     try {
//       const res = await api.post("/user/posts/submitpitch", submissionData);
//       setMessage(res.data.message);
//       setSuccess(true);
//       localStorage.removeItem("advancedPitchDraft");
//     } catch (error) {
//       setError(
//         error.response?.data?.message ||
//           "Failed to submit pitch. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClearDraft = () => {
//     setFormData(getInitialFormData());
//     setPitchType(null);
//     setEnabledSteps([]);
//     setCurrentStepIndex(0);
//     setIsCustomMode(false);
//     setCustomSteps([]);
//     setSuccess(false);
//     setMessage("");
//     setError("");
//     setSampleEnhanced("");
//     localStorage.removeItem("advancedPitchDraft");
//   };

//   const handleCustomStepToggle = (stepId) => {
//     if (customSteps.includes(stepId)) {
//       setCustomSteps(customSteps.filter(id => id !== stepId));
//     } else {
//       setCustomSteps([...customSteps, stepId].sort((a, b) => a - b));
//     }
//   };

//   // Success screen
//   if (success) {
//     return (
//       <div className={`min-h-screen flex items-center justify-center p-3 sm:p-6 ${dark ? "bg-gray-900" : "bg-gray-50"}`}>
//         <div className="w-full max-w-md text-center">
//           <div className={`p-6 sm:p-8 rounded-sm ${dark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}>
//             <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
//               <div className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 text-xl sm:text-2xl">✓</div>
//             </div>
//             <h3 className={`text-lg sm:text-xl font-semibold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>
//               {pitchType} Pitch Submitted Successfully
//             </h3>
//             <p className={`text-sm mb-6 sm:mb-8 ${dark ? "text-gray-400" : "text-gray-600"}`}>
//               {message}
//             </p>
//             <button
//               onClick={handleClearDraft}
//               className="w-full px-4 sm:px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-sm font-medium transition-colors text-sm sm:text-base"
//             >
//               Create New Pitch
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Pitch Type Selection Screen
//   if (!pitchType) {
//     return (
//       <div className={`min-h-screen ${dark ? "bg-gray-900" : "bg-gray-50"}`}>
//         <div className="max-w-6xl mx-auto p-3 sm:p-6">
//           <div className={`p-4 sm:p-8 rounded-sm ${dark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}>
//             <div className="text-center mb-6 sm:mb-8">
//               <h1 className={`text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 ${dark ? "text-white" : "text-gray-900"}`}>
//                 Create Your Pitch
//               </h1>
//               <p className={`text-base sm:text-lg ${dark ? "text-gray-300" : "text-gray-600"}`}>
//                 Choose your business type to get a customized pitch form
//               </p>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
//               {Object.entries(pitchTypes).map(([type, config]) => (
//                 <button
//                   key={type}
//                   onClick={() => setPitchType(type)}
//                   className={`p-4 sm:p-6 rounded-sm border-2 text-left transition-all duration-200 hover:scale-105 ${
//                     dark
//                       ? "border-gray-600 hover:border-blue-500 bg-gray-700 hover:bg-gray-600"
//                       : "border-gray-200 hover:border-blue-500 bg-white hover:bg-blue-50"
//                   }`}
//                 >
//                   <h3 className={`text-base sm:text-lg font-semibold mb-2 ${dark ? "text-white" : "text-gray-900"}`}>
//                     {type}
//                   </h3>
//                   <p className={`text-sm mb-3 ${dark ? "text-gray-300" : "text-gray-600"}`}>
//                     {config.description}
//                   </p>
//                   <div className="flex flex-wrap gap-1">
//                     {config.steps.map((stepId) => (
//                       <span
//                         key={stepId}
//                         className={`text-xs px-2 py-1 rounded ${
//                           dark ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-700"
//                         }`}
//                       >
//                         {allSteps.find(s => s.id === stepId)?.title}
//                       </span>
//                     ))}
//                   </div>
//                 </button>
//               ))}
//             </div>

//             <div className="border-t pt-4 sm:pt-6">
//               <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
//                 <span className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>
//                   Need something different?
//                 </span>
//                 <button
//                   onClick={() => setIsCustomMode(true)}
//                   className={`px-4 py-2 rounded-sm border transition-colors text-sm sm:text-base ${
//                     dark
//                       ? "border-gray-600 text-gray-300 hover:bg-gray-700"
//                       : "border-gray-300 text-gray-700 hover:bg-gray-50"
//                   }`}
//                 >
//                   Customize Your Pitch
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Custom Step Selection Screen
//   if (isCustomMode && customSteps.length === 0) {
//     return (
//       <div className={`min-h-screen ${dark ? "bg-gray-900" : "bg-gray-50"}`}>
//         <div className="max-w-4xl mx-auto p-3 sm:p-6">
//           <div className={`p-4 sm:p-8 rounded-sm ${dark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}>
//             <div className="text-center mb-6 sm:mb-8">
//               <h1 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 ${dark ? "text-white" : "text-gray-900"}`}>
//                 Customize Your Pitch
//               </h1>
//               <p className={`text-sm sm:text-base ${dark ? "text-gray-300" : "text-gray-600"}`}>
//                 Select the sections that are relevant to your pitch
//               </p>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
//               {allSteps.map((step) => (
//                 <div
//                   key={step.id}
//                   className={`p-3 sm:p-4 rounded-sm border-2 cursor-pointer transition-all ${
//                     customSteps.includes(step.id)
//                       ? dark
//                         ? "border-blue-500 bg-blue-900/20"
//                         : "border-blue-500 bg-blue-50"
//                       : dark
//                       ? "border-gray-600 hover:border-gray-500"
//                       : "border-gray-200 hover:border-gray-300"
//                   } ${step.required ? "opacity-50" : ""}`}
//                   onClick={() => !step.required && handleCustomStepToggle(step.id)}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h3 className={`text-sm sm:text-base font-semibold ${dark ? "text-white" : "text-gray-900"}`}>
//                         {step.title}
//                         {step.required && <span className="text-red-500 ml-1">*</span>}
//                       </h3>
//                       <p className={`text-xs sm:text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>
//                         {step.subtitle}
//                       </p>
//                     </div>
//                     {(customSteps.includes(step.id) || step.required) && (
//                       <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm">
//                         ✓
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Required steps are automatically included */}
//             <p className={`text-xs sm:text-sm mb-4 sm:mb-6 ${dark ? "text-gray-400" : "text-gray-600"}`}>
//               <span className="text-red-500">*</span> Required sections are automatically included
//             </p>

//             <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
//               <button
//                 onClick={() => {
//                   setIsCustomMode(false);
//                   setCustomSteps([]);
//                 }}
//                 className={`px-4 sm:px-6 py-3 rounded-sm border transition-colors text-sm sm:text-base ${
//                   dark
//                     ? "border-gray-600 text-gray-300 hover:bg-gray-700"
//                     : "border-gray-300 text-gray-700 hover:bg-gray-50"
//                 }`}
//               >
//                 Back to Templates
//               </button>

//               <button
//                 onClick={() => {
//                   const requiredSteps = allSteps.filter(s => s.required).map(s => s.id);
//                   const finalSteps = [...new Set([...requiredSteps, ...customSteps])].sort((a, b) => a - b);
//                   setCustomSteps(finalSteps);
//                   setPitchType("Custom");
//                 }}
//                 disabled={customSteps.length === 0}
//                 className="px-4 sm:px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-sm transition-colors text-sm sm:text-base"
//               >
//                 Create Custom Pitch ({customSteps.length} additional sections)
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Common styles - Updated for better mobile responsiveness
//   const inputClasses = `w-full px-3 sm:px-4 py-2 sm:py-3 rounded-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm sm:text-base ${
//     dark
//       ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
//       : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
//   }`;

//   const textareaClasses = `w-full px-3 sm:px-4 py-2 sm:py-3 rounded-sm border resize-none transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm sm:text-base ${
//     dark
//       ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
//       : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
//   }`;

//   const labelClasses = `block text-xs sm:text-sm font-medium mb-1 sm:mb-2 ${dark ? "text-gray-200" : "text-gray-700"}`;

//   const selectClasses = `w-full px-3 sm:px-4 py-2 sm:py-3 rounded-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm sm:text-base ${
//     dark
//       ? "bg-gray-800 border-gray-600 text-white"
//       : "bg-white border-gray-300 text-gray-900"
//   }`;

//   // AI Enhancement Button
//   const AIEnhanceButton = ({ fieldName, content }) => (
//     <button
//       type="button"
//       onClick={() => handleAIEnhance(fieldName, content)}
//       disabled={!content.trim() || enhancing}
//       className={`px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm rounded-md transition-colors ${
//         dark
//           ? "text-gray-400 hover:text-blue-400 hover:bg-gray-700"
//           : "text-gray-500 hover:text-blue-500 hover:bg-gray-100"
//       } disabled:opacity-50`}
//       title="Enhance with AI"
//     >
//       {enhancing && enhanceField === fieldName ? "Enhancing..." : "Enhance"}
//     </button>
//   );

//   // Enhanced Preview
//   const EnhancedPreview = ({ field, content }) => {
//     if (!sampleEnhanced || enhanceField !== field) return null;

//     return (
//       <div className={`mt-3 sm:mt-4 p-3 sm:p-4 rounded-sm border ${dark ? "border-gray-600 bg-gray-700/50" : "border-gray-200 bg-gray-50"}`}>
//         <div className="flex items-center justify-between mb-2 sm:mb-3">
//           <span className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400">AI Enhanced Version</span>
//           <div className="flex gap-1 sm:gap-2">
//             <button
//               type="button"
//               onClick={() => {
//                 handleChange(field, sampleEnhanced);
//                 setSampleEnhanced("");
//                 setEnhanceField("");
//               }}
//               className="px-2 sm:px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//             >
//               Apply
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 setSampleEnhanced("");
//                 setEnhanceField("");
//               }}
//               className="px-2 sm:px-3 py-1 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
//             >
//               Dismiss
//             </button>
//           </div>
//         </div>
//         <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{sampleEnhanced}</p>
//       </div>
//     );
//   };

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="space-y-4 sm:space-y-6">
//             <div>
//               <label className={labelClasses}>
//                 Company Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={formData.startupName}
//                 onChange={(e) => handleChange("startupName", e.target.value)}
//                 placeholder="Enter your company name"
//                 maxLength={100}
//                 className={inputClasses}
//               />
//             </div>

//             <div>
//               <label className={labelClasses}>
//                 Value Proposition <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={formData.oneLiner}
//                 onChange={(e) => handleChange("oneLiner", e.target.value)}
//                 placeholder="Describe your company's core value proposition in one line"
//                 maxLength={200}
//                 className={inputClasses}
//               />
//               <div className="text-xs text-gray-500 mt-1 sm:mt-2">
//                 {formData.oneLiner.length}/200 characters
//               </div>
//             </div>

//             <div>
//               <div className="flex items-center justify-between">
//                 <label className={labelClasses}>
//                   Problem Statement <span className="text-red-500">*</span>
//                 </label>
//                 <AIEnhanceButton fieldName="problem" content={formData.problem} />
//               </div>
//               <textarea
//                 value={formData.problem}
//                 onChange={(e) => handleChange("problem", e.target.value)}
//                 placeholder="Define the significant problem or market inefficiency your company addresses"
//                 rows={4}
//                 className={textareaClasses}
//               />
//               <EnhancedPreview field="problem" content={formData.problem} />
//             </div>

//             <div>
//               <div className="flex items-center justify-between">
//                 <label className={labelClasses}>
//                   Solution Overview <span className="text-red-500">*</span>
//                 </label>
//                 <AIEnhanceButton fieldName="solution" content={formData.solution} />
//               </div>
//               <textarea
//                 value={formData.solution}
//                 onChange={(e) => handleChange("solution", e.target.value)}
//                 placeholder="Explain how your innovation provides a superior solution"
//                 rows={4}
//                 className={textareaClasses}
//               />
//               <EnhancedPreview field="solution" content={formData.solution} />
//             </div>
//           </div>
//         );

//       case 2:
//         return (
//           <div className="space-y-4 sm:space-y-6">
//             <div>
//               <label className={labelClasses}>
//                 Target Market <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 value={formData.targetMarket}
//                 onChange={(e) => handleChange("targetMarket", e.target.value)}
//                 placeholder="Define your addressable market and customer segments"
//                 rows={4}
//                 className={textareaClasses}
//               />
//             </div>

//             <div>
//               <h4 className={`text-base sm:text-lg font-medium mb-3 sm:mb-4 ${dark ? "text-white" : "text-gray-900"}`}>
//                 Market Size
//               </h4>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                 <div>
//                   <label className={labelClasses}>Total Addressable Market (TAM)</label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       value={formData.market.totalMarketSize === 0 ? "" : formData.market.totalMarketSize}
//                       onChange={(e) =>
//                         handleChange(
//                           "market",
//                           parseFloat(e.target.value) || 0,
//                           null,
//                           "totalMarketSize"
//                         )
//                       }
//                       placeholder="0"
//                       className={inputClasses}
//                     />
//                     <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-gray-500">M $</span>
//                   </div>
//                 </div>
//                 <div>
//                   <label className={labelClasses}>Serviceable Available Market (SAM)</label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       value={formData.market.serviceableMarketSize === 0 ? "" : formData.market.serviceableMarketSize}
//                       onChange={(e) =>
//                         handleChange(
//                           "market",
//                           parseFloat(e.target.value) || 0,
//                           null,
//                           "serviceableMarketSize"
//                         )
//                       }
//                       placeholder="0"
//                       className={inputClasses}
//                     />
//                     <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-gray-500">M $</span>
//                   </div>
//                 </div>
//                 <div>
//                   <label className={labelClasses}>Serviceable Obtainable Market (SOM)</label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       value={formData.market.targetMarketSize === 0 ? "" : formData.market.targetMarketSize}
//                       onChange={(e) =>
//                         handleChange(
//                           "market",
//                           parseFloat(e.target.value) || 0,
//                           null,
//                           "targetMarketSize"
//                         )
//                       }
//                       placeholder="0"
//                       className={inputClasses}
//                     />
//                     <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-gray-500">M $</span>
//                   </div>
//                 </div>
//                 <div>
//                   <label className={labelClasses}>Market Growth Rate</label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       value={formData.market.growthRatePercent === 0 ? "" : formData.market.growthRatePercent}
//                       onChange={(e) =>
//                         handleChange(
//                           "market",
//                           parseFloat(e.target.value) || 0,
//                           null,
//                           "growthRatePercent"
//                         )
//                       }
//                       placeholder="0"
//                       className={inputClasses}
//                     />
//                     <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-gray-500">%</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className={labelClasses}>Customer Segments</label>
//               <div className="space-y-3 sm:space-y-4">
//                 {formData.customerSegments.map((segment, index) => (
//                   <div
//                     key={index}
//                     className={`p-3 sm:p-4 rounded-sm border ${dark ? "border-gray-600 bg-gray-800/30" : "border-gray-200 bg-gray-50/30"} relative`}
//                   >
//                     {formData.customerSegments.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeArrayItem("customerSegments", index)}
//                         className="absolute top-1 sm:top-2 right-1 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-sm flex items-center justify-center"
//                       >
//                         ×
//                       </button>
//                     )}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3">
//                       <input
//                         type="text"
//                         value={segment.segmentName}
//                         onChange={(e) =>
//                           handleChange(
//                             "customerSegments",
//                             e.target.value,
//                             index,
//                             "segmentName"
//                           )
//                         }
//                         placeholder="Segment name"
//                         className={inputClasses}
//                       />
//                       <input
//                         type="number"
//                         value={segment.size === 0 ? "" : segment.size}
//                         onChange={(e) =>
//                           handleChange(
//                             "customerSegments",
//                             parseInt(e.target.value) || 0,
//                             index,
//                             "size"
//                           )
//                         }
//                         placeholder="Segment size"
//                         className={inputClasses}
//                       />
//                     </div>
//                     <textarea
//                       value={segment.painPoints}
//                       onChange={(e) =>
//                         handleChange(
//                           "customerSegments",
//                           e.target.value,
//                           index,
//                           "painPoints"
//                         )
//                       }
//                       placeholder="Key pain points for this segment"
//                       rows={3}
//                       className={textareaClasses}
//                     />
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() =>
//                     addArrayItem("customerSegments", {
//                       segmentName: "",
//                       size: 0,
//                       painPoints: "",
//                     })
//                   }
//                   className={`w-full py-2 sm:py-3 border-2 border-dashed rounded-sm transition-colors text-xs sm:text-sm ${
//                     dark
//                       ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
//                       : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
//                   }`}
//                 >
//                   Add Customer Segment
//                 </button>
//               </div>
//             </div>

//             <div>
//               <label className={labelClasses}>
//                 Competition Overview <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 value={formData.competition}
//                 onChange={(e) => handleChange("competition", e.target.value)}
//                 placeholder="Describe the competitive landscape"
//                 rows={4}
//                 className={textareaClasses}
//               />
//             </div>

//             <div>
//               <label className={labelClasses}>Key Competitors</label>
//               <div className="space-y-3 sm:space-y-4">
//                 {formData.competitors.map((competitor, index) => (
//                   <div
//                     key={index}
//                     className={`p-3 sm:p-4 rounded-sm border ${dark ? "border-gray-600 bg-gray-800/30" : "border-gray-200 bg-gray-50/30"} relative`}
//                   >
//                     {formData.competitors.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeArrayItem("competitors", index)}
//                         className="absolute top-1 sm:top-2 right-1 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-sm flex items-center justify-center"
//                       >
//                         ×
//                       </button>
//                     )}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3">
//                       <input
//                         type="text"
//                         value={competitor.name}
//                         onChange={(e) =>
//                           handleChange("competitors", e.target.value, index, "name")
//                         }
//                         placeholder="Competitor name"
//                         className={inputClasses}
//                       />
//                       <input
//                         type="url"
//                         value={competitor.website}
//                         onChange={(e) =>
//                           handleChange("competitors", e.target.value, index, "website")
//                         }
//                         placeholder="Website URL"
//                         className={inputClasses}
//                       />
//                     </div>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                       <textarea
//                         value={competitor.strength}
//                         onChange={(e) =>
//                           handleChange("competitors", e.target.value, index, "strength")
//                         }
//                         placeholder="Their strengths"
//                         rows={3}
//                         className={textareaClasses}
//                       />
//                       <textarea
//                         value={competitor.weakness}
//                         onChange={(e) =>
//                           handleChange("competitors", e.target.value, index, "weakness")
//                         }
//                         placeholder="Their weaknesses"
//                         rows={3}
//                         className={textareaClasses}
//                       />
//                     </div>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() =>
//                     addArrayItem("competitors", {
//                       name: "",
//                       website: "",
//                       strength: "",
//                       weakness: "",
//                     })
//                   }
//                   className={`w-full py-2 sm:py-3 border-2 border-dashed rounded-sm transition-colors text-xs sm:text-sm ${
//                     dark
//                       ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
//                       : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
//                   }`}
//                 >
//                   Add Competitor
//                 </button>
//               </div>
//             </div>
//           </div>
//         );

//       case 3:
//         return (
//           <div className="space-y-4 sm:space-y-6">
//             <div>
//               <label className={labelClasses}>
//                 Business Model <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 value={formData.businessModel}
//                 onChange={(e) => handleChange("businessModel", e.target.value)}
//                 placeholder="Describe your revenue model and monetization strategy"
//                 rows={4}
//                 className={textareaClasses}
//               />
//             </div>

//             <div>
//               <label className={labelClasses}>
//                 Go-to-Market Strategy <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 value={formData.goToMarketStrategy}
//                 onChange={(e) => handleChange("goToMarketStrategy", e.target.value)}
//                 placeholder="Detail your customer acquisition and market penetration approach"
//                 rows={4}
//                 className={textareaClasses}
//               />
//             </div>

//             <div>
//               <h4 className={`text-base sm:text-lg font-medium mb-3 sm:mb-4 ${dark ? "text-white" : "text-gray-900"}`}>
//                 Product Metrics
//               </h4>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
//                 <div>
//                   <label className={labelClasses}>Monthly Active Users</label>
//                   <input
//                     type="number"
//                     value={formData.productMetrics.monthlyActiveUsers === 0 ? "" : formData.productMetrics.monthlyActiveUsers}
//                     onChange={(e) =>
//                       handleChange(
//                         "productMetrics",
//                         parseInt(e.target.value) || 0,
//                         null,
//                         "monthlyActiveUsers"
//                       )
//                     }
//                     placeholder="0"
//                     className={inputClasses}
//                   />
//                 </div>
//                 <div>
//                   <label className={labelClasses}>Total Downloads</label>
//                   <input
//                     type="number"
//                     value={formData.productMetrics.downloads === 0 ? "" : formData.productMetrics.downloads}
//                     onChange={(e) =>
//                       handleChange(
//                         "productMetrics",
//                         parseInt(e.target.value) || 0,
//                         null,
//                         "downloads"
//                       )
//                     }
//                     placeholder="0"
//                     className={inputClasses}
//                   />
//                 </div>
//                 <div className="sm:col-span-2 lg:col-span-1">
//                   <label className={labelClasses}>Repeat Customer Rate</label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       value={formData.productMetrics.repeatCustomerRatePercent === 0 ? "" : formData.productMetrics.repeatCustomerRatePercent}
//                       onChange={(e) =>
//                         handleChange(
//                           "productMetrics",
//                           parseFloat(e.target.value) || 0,
//                           null,
//                           "repeatCustomerRatePercent"
//                         )
//                       }
//                       placeholder="0"
//                       className={inputClasses}
//                     />
//                     <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-gray-500">%</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className={labelClasses}>Key Achievements</label>
//               <div className="space-y-2 sm:space-y-3">
//                 {formData.productMetrics.keyAchievements.map((achievement, index) => (
//                   <div key={index} className="flex gap-2 sm:gap-3">
//                     <input
//                       type="text"
//                       value={achievement}
//                       onChange={(e) =>
//                         handleChange(
//                           "productMetrics",
//                           e.target.value,
//                           index,
//                           "keyAchievements"
//                         )
//                       }
//                       placeholder="Describe a key achievement"
//                       className={inputClasses}
//                     />
//                     {formData.productMetrics.keyAchievements.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => {
//                           const newAchievements =
//                             formData.productMetrics.keyAchievements.filter(
//                               (_, i) => i !== index
//                             );
//                           handleChange(
//                             "productMetrics",
//                             newAchievements,
//                             null,
//                             "keyAchievements"
//                           );
//                         }}
//                         className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-red-100 dark:bg-red-900/20 text-red-600 hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center text-sm"
//                       >
//                         ×
//                       </button>
//                     )}
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() => {
//                     const newAchievements = [
//                       ...formData.productMetrics.keyAchievements,
//                       "",
//                     ];
//                     handleChange(
//                       "productMetrics",
//                       newAchievements,
//                       null,
//                       "keyAchievements"
//                     );
//                   }}
//                   className={`w-full py-2 sm:py-3 border-2 border-dashed rounded-sm transition-colors text-xs sm:text-sm ${
//                     dark
//                       ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
//                       : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
//                   }`}
//                 >
//                   Add Achievement
//                 </button>
//               </div>
//             </div>
//           </div>
//         );

//       case 4:
//         return (
//           <div className="space-y-4 sm:space-y-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//               <div>
//                 <label className={labelClasses}>
//                   Founder Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.founderName}
//                   onChange={(e) => handleChange("founderName", e.target.value)}
//                   placeholder="Your full name"
//                   className={inputClasses}
//                 />
//               </div>
//               <div>
//                 <label className={labelClasses}>
//                   Founder Email <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   value={formData.founderEmail}
//                   onChange={(e) => handleChange("founderEmail", e.target.value)}
//                   placeholder="your.email@company.com"
//                   className={inputClasses}
//                 />
//               </div>
//             </div>

//             <div>
//               <label className={labelClasses}>Team Members</label>
//               <div className="space-y-3 sm:space-y-4">
//                 {formData.teamMembers.map((member, index) => (
//                   <div
//                     key={index}
//                     className={`p-3 sm:p-4 rounded-sm border ${dark ? "border-gray-600 bg-gray-800/30" : "border-gray-200 bg-gray-50/30"} relative`}
//                   >
//                     {formData.teamMembers.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeArrayItem("teamMembers", index)}
//                         className="absolute top-1 sm:top-2 right-1 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-sm flex items-center justify-center"
//                       >
//                         ×
//                       </button>
//                     )}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3">
//                       <input
//                         type="text"
//                         value={member.name}
//                         onChange={(e) =>
//                           handleChange("teamMembers", e.target.value, index, "name")
//                         }
//                         placeholder="Full name"
//                         className={inputClasses}
//                       />
//                       <input
//                         type="text"
//                         value={member.role}
//                         onChange={(e) =>
//                           handleChange("teamMembers", e.target.value, index, "role")
//                         }
//                         placeholder="Role/Position"
//                         className={inputClasses}
//                       />
//                     </div>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                       <input
//                         type="number"
//                         value={member.experienceYears === 0 ? "" : member.experienceYears}
//                         onChange={(e) =>
//                           handleChange(
//                             "teamMembers",
//                             parseInt(e.target.value) || 0,
//                             index,
//                             "experienceYears"
//                           )
//                         }
//                         placeholder="Years of experience"
//                         className={inputClasses}
//                       />
//                       <input
//                         type="url"
//                         value={member.linkedIn}
//                         onChange={(e) =>
//                           handleChange("teamMembers", e.target.value, index, "linkedIn")
//                         }
//                         placeholder="LinkedIn profile URL"
//                         className={inputClasses}
//                       />
//                     </div>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() =>
//                     addArrayItem("teamMembers", {
//                       name: "",
//                       role: "",
//                       experienceYears: 0,
//                       linkedIn: "",
//                     })
//                   }
//                   className={`w-full py-2 sm:py-3 border-2 border-dashed rounded-sm transition-colors text-xs sm:text-sm ${
//                     dark
//                       ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
//                       : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
//                   }`}
//                 >
//                   Add Team Member
//                 </button>
//               </div>
//             </div>

//             <div>
//               <label className={labelClasses}>
//                 Current Traction <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 value={formData.traction}
//                 onChange={(e) => handleChange("traction", e.target.value)}
//                 placeholder="Present key metrics, milestones, and validation achieved"
//                 rows={4}
//                 className={textareaClasses}
//               />
//             </div>
//           </div>
//         );

//       case 5:
//         return (
//           <div className="space-y-4 sm:space-y-6">
//             <h3 className={`text-base sm:text-lg font-medium ${dark ? "text-white" : "text-gray-900"}`}>
//               Financial Metrics
//             </h3>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
//               <div>
//                 <label className={labelClasses}>Revenue Last Year</label>
//                 <div className="relative">
//                   <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
//                   <input
//                     type="number"
//                     value={formData.financials.revenueLastYear === 0 ? "" : formData.financials.revenueLastYear}
//                     onChange={(e) =>
//                       handleChange(
//                         "financials",
//                         parseFloat(e.target.value) || 0,
//                         null,
//                         "revenueLastYear"
//                       )
//                     }
//                     placeholder="0"
//                     className={`${inputClasses} pl-6 sm:pl-8`}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className={labelClasses}>Revenue This Year</label>
//                 <div className="relative">
//                   <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
//                   <input
//                     type="number"
//                     value={formData.financials.revenueThisYear === 0 ? "" : formData.financials.revenueThisYear}
//                     onChange={(e) =>
//                       handleChange(
//                         "financials",
//                         parseFloat(e.target.value) || 0,
//                         null,
//                         "revenueThisYear"
//                       )
//                     }
//                     placeholder="0"
//                     className={`${inputClasses} pl-6 sm:pl-8`}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className={labelClasses}>Net Profit</label>
//                 <div className="relative">
//                   <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
//                   <input
//                     type="number"
//                     value={formData.financials.netProfit === 0 ? "" : formData.financials.netProfit}
//                     onChange={(e) =>
//                       handleChange(
//                         "financials",
//                         parseFloat(e.target.value) || 0,
//                         null,
//                         "netProfit"
//                       )
//                     }
//                     placeholder="0"
//                     className={`${inputClasses} pl-6 sm:pl-8`}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className={labelClasses}>Gross Margin</label>
//                 <div className="relative">
//                   <input
//                     type="number"
//                     min="0"
//                     max="100"
//                     value={formData.financials.grossMarginPercent === 0 ? "" : formData.financials.grossMarginPercent}
//                     onChange={(e) =>
//                       handleChange(
//                         "financials",
//                         parseFloat(e.target.value) || 0,
//                         null,
//                         "grossMarginPercent"
//                       )
//                     }
//                     placeholder="0"
//                     className={inputClasses}
//                   />
//                   <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-gray-500">%</span>
//                 </div>
//               </div>

//               <div>
//                 <label className={labelClasses}>Customer Acquisition Cost</label>
//                 <div className="relative">
//                   <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
//                   <input
//                     type="number"
//                     value={formData.financials.customerAcquisitionCost === 0 ? "" : formData.financials.customerAcquisitionCost}
//                     onChange={(e) =>
//                       handleChange(
//                         "financials",
//                         parseFloat(e.target.value) || 0,
//                         null,
//                         "customerAcquisitionCost"
//                       )
//                     }
//                     placeholder="0"
//                     className={`${inputClasses} pl-6 sm:pl-8`}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className={labelClasses}>Lifetime Value</label>
//                 <div className="relative">
//                   <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
//                   <input
//                     type="number"
//                     value={formData.financials.lifetimeValue === 0 ? "" : formData.financials.lifetimeValue}
//                     onChange={(e) =>
//                       handleChange(
//                         "financials",
//                         parseFloat(e.target.value) || 0,
//                         null,
//                         "lifetimeValue"
//                       )
//                     }
//                     placeholder="0"
//                     className={`${inputClasses} pl-6 sm:pl-8`}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className={labelClasses}>Current Valuation</label>
//               <div className="relative">
//                 <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
//                 <input
//                   type="number"
//                   value={formData.financials.valuation === 0 ? "" : formData.financials.valuation}
//                   onChange={(e) =>
//                     handleChange(
//                       "financials",
//                       parseFloat(e.target.value) || 0,
//                       null,
//                       "valuation"
//                     )
//                   }
//                   placeholder="0"
//                   className={`${inputClasses} pl-6 sm:pl-8`}
//                 />
//               </div>
//             </div>

//             {/* Financial Summary */}
//             {formData.financials.lifetimeValue > 0 &&
//               formData.financials.customerAcquisitionCost > 0 && (
//                 <div className={`p-3 sm:p-4 rounded-sm ${dark ? "bg-blue-900/20" : "bg-blue-50"}`}>
//                   <h4 className={`font-medium mb-3 ${dark ? "text-white" : "text-gray-900"}`}>
//                     Calculated Metrics
//                   </h4>
//                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-sm">
//                     <div className="text-center">
//                       <div className="text-lg sm:text-xl font-bold text-blue-600">
//                         {(
//                           formData.financials.lifetimeValue /
//                           formData.financials.customerAcquisitionCost
//                         ).toFixed(1)}
//                       </div>
//                       <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">LTV/CAC Ratio</div>
//                     </div>
//                     {formData.financials.revenueThisYear > 0 &&
//                       formData.financials.revenueLastYear > 0 && (
//                         <div className="text-center">
//                           <div className="text-lg sm:text-xl font-bold text-green-600">
//                             {(
//                               ((formData.financials.revenueThisYear -
//                                 formData.financials.revenueLastYear) /
//                                 formData.financials.revenueLastYear) *
//                               100
//                             ).toFixed(1)}%
//                           </div>
//                           <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Revenue Growth</div>
//                         </div>
//                       )}
//                     {formData.financials.revenueThisYear > 0 &&
//                       formData.financials.netProfit !== 0 && (
//                         <div className="text-center">
//                           <div className="text-lg sm:text-xl font-bold text-orange-600">
//                             ${(
//                               (formData.financials.revenueThisYear -
//                                 formData.financials.netProfit) /
//                               12
//                             ).toLocaleString()}
//                           </div>
//                           <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Monthly Burn</div>
//                         </div>
//                       )}
//                   </div>
//                 </div>
//               )}
//           </div>
//         );

//       case 6:
//         return (
//           <div className="space-y-4 sm:space-y-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//               <div>
//                 <label className={labelClasses}>
//                   Funding Amount Requested <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
//                   <input
//                     type="number"
//                     value={formData.fundingDetails.fundingAskAmount === 0 ? "" : formData.fundingDetails.fundingAskAmount}
//                     onChange={(e) =>
//                       handleChange(
//                         "fundingDetails",
//                         parseFloat(e.target.value) || 0,
//                         null,
//                         "fundingAskAmount"
//                       )
//                     }
//                     placeholder="0"
//                     className={`${inputClasses} pl-6 sm:pl-8`}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className={labelClasses}>
//                   Equity Offered <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="number"
//                     min="0"
//                     max="100"
//                     step="0.1"
//                     value={formData.fundingDetails.equityOfferedPercent === 0 ? "" : formData.fundingDetails.equityOfferedPercent}
//                     onChange={(e) =>
//                       handleChange(
//                         "fundingDetails",
//                         parseFloat(e.target.value) || 0,
//                         null,
//                         "equityOfferedPercent"
//                       )
//                     }
//                     placeholder="0"
//                     className={inputClasses}
//                   />
//                   <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-gray-500">%</span>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className={labelClasses}>Previous Funding Raised</label>
//               <div className="relative">
//                 <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
//                 <input
//                   type="number"
//                   value={formData.fundingDetails.previousFundingRaised === 0 ? "" : formData.fundingDetails.previousFundingRaised}
//                   onChange={(e) =>
//                     handleChange(
//                       "fundingDetails",
//                       parseFloat(e.target.value) || 0,
//                       null,
//                       "previousFundingRaised"
//                     )
//                   }
//                   placeholder="0"
//                   className={`${inputClasses} pl-6 sm:pl-8`}
//                 />
//               </div>
//             </div>

//             {/* Valuation Calculation */}
//             {formData.fundingDetails.fundingAskAmount > 0 &&
//               formData.fundingDetails.equityOfferedPercent > 0 && (
//                 <div className={`p-3 sm:p-4 rounded-sm ${dark ? "bg-green-900/20" : "bg-green-50"}`}>
//                   <h4 className={`font-medium mb-3 ${dark ? "text-white" : "text-gray-900"}`}>
//                     Implied Valuation
//                   </h4>
//                   <div className="text-center">
//                     <div className="text-xl sm:text-2xl font-bold text-green-600 mb-1">
//                       ${(
//                         (formData.fundingDetails.fundingAskAmount /
//                           formData.fundingDetails.equityOfferedPercent) *
//                         100
//                       ).toLocaleString()}
//                     </div>
//                     <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
//                       Based on ${formData.fundingDetails.fundingAskAmount.toLocaleString()} for{" "}
//                       {formData.fundingDetails.equityOfferedPercent}% equity
//                     </p>
//                   </div>
//                 </div>
//               )}

//             <div>
//               <label className={labelClasses}>Valuation History (Optional)</label>
//               <div className="space-y-3 sm:space-y-4">
//                 {formData.valuationHistory.map((valuation, index) => (
//                   <div
//                     key={index}
//                     className={`p-3 sm:p-4 rounded-sm border ${dark ? "border-gray-600 bg-gray-800/30" : "border-gray-200 bg-gray-50/30"} relative`}
//                   >
//                     <button
//                       type="button"
//                       onClick={() => removeArrayItem("valuationHistory", index)}
//                       className="absolute top-1 sm:top-2 right-1 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-sm flex items-center justify-center"
//                     >
//                       ×
//                     </button>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3">
//                       <input
//                         type="date"
//                         value={
//                           valuation.date
//                             ? new Date(valuation.date).toISOString().split("T")[0]
//                             : ""
//                         }
//                         onChange={(e) =>
//                           handleChange(
//                             "valuationHistory",
//                             e.target.value,
//                             index,
//                             "date"
//                           )
//                         }
//                         className={inputClasses}
//                       />
//                       <select
//                         value={valuation.roundType || "Seed"}
//                         onChange={(e) =>
//                           handleChange(
//                             "valuationHistory",
//                             e.target.value,
//                             index,
//                             "roundType"
//                           )
//                         }
//                         className={selectClasses}
//                       >
//                         <option value="Seed">Seed</option>
//                         <option value="Series A">Series A</option>
//                         <option value="Series B">Series B</option>
//                         <option value="Other">Other</option>
//                       </select>
//                     </div>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                       <div className="relative">
//                         <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
//                         <input
//                           type="number"
//                           value={valuation.valuation === 0 ? "" : valuation.valuation}
//                           onChange={(e) =>
//                             handleChange(
//                               "valuationHistory",
//                               parseFloat(e.target.value) || 0,
//                               index,
//                               "valuation"
//                             )
//                           }
//                           placeholder="Valuation"
//                           className={`${inputClasses} pl-6 sm:pl-8`}
//                         />
//                       </div>
//                       <div className="relative">
//                         <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
//                         <input
//                           type="number"
//                           value={valuation.fundingRaised === 0 ? "" : valuation.fundingRaised}
//                           onChange={(e) =>
//                             handleChange(
//                               "valuationHistory",
//                               parseFloat(e.target.value) || 0,
//                               index,
//                               "fundingRaised"
//                             )
//                           }
//                           placeholder="Funding Raised"
//                           className={`${inputClasses} pl-6 sm:pl-8`}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() =>
//                     addArrayItem("valuationHistory", {
//                       date: new Date().toISOString(),
//                       valuation: 0,
//                       fundingRaised: 0,
//                       roundType: "Seed",
//                     })
//                   }
//                   className={`w-full py-2 sm:py-3 border-2 border-dashed rounded-sm transition-colors text-xs sm:text-sm ${
//                     dark
//                       ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
//                       : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
//                   }`}
//                 >
//                   Add Previous Round
//                 </button>
//               </div>
//             </div>
//           </div>
//         );

//       case 7:
//         return (
//           <div className="space-y-4 sm:space-y-6">
//             <div>
//               <label className={labelClasses}>Key Milestones & Roadmap</label>
//               <div className="space-y-3 sm:space-y-4">
//                 {formData.milestones.map((milestone, index) => (
//                   <div
//                     key={index}
//                     className={`p-3 sm:p-4 rounded-sm border ${dark ? "border-gray-600 bg-gray-800/30" : "border-gray-200 bg-gray-50/30"} relative`}
//                   >
//                     {formData.milestones.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeArrayItem("milestones", index)}
//                         className="absolute top-1 sm:top-2 right-1 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-sm flex items-center justify-center"
//                       >
//                         ×
//                       </button>
//                     )}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3">
//                       <input
//                         type="text"
//                         value={milestone.title}
//                         onChange={(e) =>
//                           handleChange("milestones", e.target.value, index, "title")
//                         }
//                         placeholder="Milestone title"
//                         className={inputClasses}
//                       />
//                       <input
//                         type="date"
//                         value={
//                           milestone.targetDate
//                             ? new Date(milestone.targetDate).toISOString().split("T")[0]
//                             : ""
//                         }
//                         onChange={(e) =>
//                           handleChange(
//                             "milestones",
//                             e.target.value,
//                             index,
//                             "targetDate"
//                           )
//                         }
//                         className={inputClasses}
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <textarea
//                         value={milestone.description}
//                         onChange={(e) =>
//                           handleChange(
//                             "milestones",
//                             e.target.value,
//                             index,
//                             "description"
//                           )
//                         }
//                         placeholder="Describe this milestone"
//                         rows={3}
//                         className={textareaClasses}
//                       />
//                     </div>
//                     <select
//                       value={milestone.status || "pending"}
//                       onChange={(e) =>
//                         handleChange("milestones", e.target.value, index, "status")
//                       }
//                       className={selectClasses}
//                     >
//                       <option value="pending">Pending</option>
//                       <option value="achieved">Achieved</option>
//                       <option value="delayed">Delayed</option>
//                     </select>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() =>
//                     addArrayItem("milestones", {
//                       title: "",
//                       description: "",
//                       targetDate: "",
//                       status: "pending",
//                     })
//                   }
//                   className={`w-full py-2 sm:py-3 border-2 border-dashed rounded-sm transition-colors text-xs sm:text-sm ${
//                     dark
//                       ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
//                       : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
//                   }`}
//                 >
//                   Add Milestone
//                 </button>
//               </div>
//             </div>

//             <div>
//               <h4 className={`text-base sm:text-lg font-medium mb-3 sm:mb-4 ${dark ? "text-white" : "text-gray-900"}`}>
//                 Intellectual Property
//               </h4>
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
//                 <div>
//                   <label className={labelClasses}>Patents</label>
//                   <div className="space-y-2 sm:space-y-3">
//                     {formData.legal.patents.map((patent, index) => (
//                       <div key={index} className="flex gap-2">
//                         <input
//                           type="text"
//                           value={patent}
//                           onChange={(e) =>
//                             handleChange("legal", e.target.value, index, "patents")
//                           }
//                           placeholder="Patent title/number"
//                           className={inputClasses}
//                         />
//                         {formData.legal.patents.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => {
//                               const newPatents = formData.legal.patents.filter(
//                                 (_, i) => i !== index
//                               );
//                               handleChange("legal", newPatents, null, "patents");
//                             }}
//                             className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-red-100 dark:bg-red-900/20 text-red-600 hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center text-sm"
//                           >
//                             ×
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                     <button
//                       type="button"
//                       onClick={() => {
//                         const newPatents = [...formData.legal.patents, ""];
//                         handleChange("legal", newPatents, null, "patents");
//                       }}
//                       className={`w-full py-2 border-2 border-dashed rounded-sm text-xs sm:text-sm transition-colors ${
//                         dark
//                           ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
//                           : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
//                       }`}
//                     >
//                       Add Patent
//                     </button>
//                   </div>
//                 </div>

//                 <div>
//                   <label className={labelClasses}>Trademarks</label>
//                   <div className="space-y-2 sm:space-y-3">
//                     {formData.legal.trademarks.map((trademark, index) => (
//                       <div key={index} className="flex gap-2">
//                         <input
//                           type="text"
//                           value={trademark}
//                           onChange={(e) =>
//                             handleChange("legal", e.target.value, index, "trademarks")
//                           }
//                           placeholder="Trademark name"
//                           className={inputClasses}
//                         />
//                         {formData.legal.trademarks.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => {
//                               const newTrademarks = formData.legal.trademarks.filter(
//                                 (_, i) => i !== index
//                               );
//                               handleChange("legal", newTrademarks, null, "trademarks");
//                             }}
//                             className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-red-100 dark:bg-red-900/20 text-red-600 hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center text-sm"
//                           >
//                             ×
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                     <button
//                       type="button"
//                       onClick={() => {
//                         const newTrademarks = [...formData.legal.trademarks, ""];
//                         handleChange("legal", newTrademarks, null, "trademarks");
//                       }}
//                       className={`w-full py-2 border-2 border-dashed rounded-sm text-xs sm:text-sm transition-colors ${
//                         dark
//                           ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
//                           : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
//                       }`}
//                     >
//                       Add Trademark
//                     </button>
//                   </div>
//                 </div>

//                 <div>
//                   <label className={labelClasses}>Licenses</label>
//                   <div className="space-y-2 sm:space-y-3">
//                     {formData.legal.licenses.map((license, index) => (
//                       <div key={index} className="flex gap-2">
//                         <input
//                           type="text"
//                           value={license}
//                           onChange={(e) =>
//                             handleChange("legal", e.target.value, index, "licenses")
//                           }
//                           placeholder="License type/name"
//                           className={inputClasses}
//                         />
//                         {formData.legal.licenses.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => {
//                               const newLicenses = formData.legal.licenses.filter(
//                                 (_, i) => i !== index
//                               );
//                               handleChange("legal", newLicenses, null, "licenses");
//                             }}
//                             className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-red-100 dark:bg-red-900/20 text-red-600 hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center text-sm"
//                           >
//                             ×
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                     <button
//                       type="button"
//                       onClick={() => {
//                         const newLicenses = [...formData.legal.licenses, ""];
//                         handleChange("legal", newLicenses, null, "licenses");
//                       }}
//                       className={`w-full py-2 border-2 border-dashed rounded-sm text-xs sm:text-sm transition-colors ${
//                         dark
//                           ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
//                           : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
//                       }`}
//                     >
//                       Add License
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className={labelClasses}>
//                 Exit Strategy <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 value={formData.exitStrategy}
//                 onChange={(e) => handleChange("exitStrategy", e.target.value)}
//                 placeholder="Describe your long-term exit strategy (IPO, acquisition, etc.)"
//                 rows={4}
//                 className={textareaClasses}
//               />
//             </div>
//           </div>
//         );

//       case 8:
//         return (
//           <div className="space-y-4 sm:space-y-6">
//             <div>
//               <label className={labelClasses}>Supporting Materials</label>
//               <div
//                 className={`border-2 border-dashed rounded-sm p-4 sm:p-8 text-center transition-colors ${
//                   dark
//                     ? "border-gray-600 hover:border-gray-500 bg-gray-800/30"
//                     : "border-gray-300 hover:border-gray-400 bg-gray-50/30"
//                 }`}
//               >
//                 <div className={`w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-sm flex items-center justify-center ${
//                   dark ? "bg-gray-700" : "bg-gray-100"
//                 }`}>
//                   <div className="text-gray-400 text-base sm:text-xl">📎</div>
//                 </div>
//                 <h4 className={`text-base sm:text-lg font-medium mb-2 ${dark ? "text-white" : "text-gray-900"}`}>
//                   Upload supporting documents
//                 </h4>
//                 <p className={`text-xs sm:text-sm mb-3 sm:mb-4 ${dark ? "text-gray-400" : "text-gray-600"}`}>
//                   Upload pitch deck, videos, or other supporting materials
//                 </p>
//                 <p className={`text-xs ${dark ? "text-gray-500" : "text-gray-500"}`}>
//                   Supported: PDF, PNG, JPG, MP4 (Max 10MB each)
//                 </p>
//                 <input
//                   type="file"
//                   multiple
//                   accept=".pdf,.png,.jpg,.jpeg,.mp4"
//                   onChange={(e) => {
//                     console.log("Files selected:", e.target.files);
//                   }}
//                   className="mt-3 sm:mt-4 text-xs sm:text-sm"
//                 />
//               </div>

//               {formData.media.length > 0 && (
//                 <div className="mt-4 sm:mt-6">
//                   <h4 className={`text-xs sm:text-sm font-medium mb-3 sm:mb-4 ${dark ? "text-gray-300" : "text-gray-700"}`}>
//                     Uploaded Files
//                   </h4>
//                   <div className="space-y-2 sm:space-y-3">
//                     {formData.media.map((file, index) => (
//                       <div
//                         key={index}
//                         className={`flex items-center justify-between p-2 sm:p-3 rounded-sm border ${
//                           dark
//                             ? "border-gray-600 bg-gray-700/50"
//                             : "border-gray-300 bg-gray-50"
//                         }`}
//                       >
//                         <div className="flex items-center gap-2 sm:gap-3">
//                           <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded flex items-center justify-center ${
//                             file.type === "pdf"
//                               ? "bg-red-100 text-red-600"
//                               : file.type === "image"
//                               ? "bg-blue-100 text-blue-600"
//                               : "bg-green-100 text-green-600"
//                           }`}>
//                             📎
//                           </div>
//                           <div>
//                             <div className="text-xs sm:text-sm font-medium truncate max-w-[150px] sm:max-w-xs">{file.url}</div>
//                             <div className="text-xs text-gray-500">{file.type.toUpperCase()}</div>
//                           </div>
//                         </div>
//                         <button
//                           type="button"
//                           onClick={() => removeArrayItem("media", index)}
//                           className="text-red-500 hover:text-red-700 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className={`p-4 sm:p-6 rounded-sm border ${dark ? "border-gray-600 bg-gray-800/50" : "border-gray-200 bg-gray-50"}`}>
//               <h3 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 ${dark ? "text-white" : "text-gray-900"}`}>
//                 {pitchType} Pitch Summary
//               </h3>

//               {/* Show enabled sections */}
//               <div className="mb-4 sm:mb-6">
//                 <h4 className={`text-xs sm:text-sm font-medium mb-2 sm:mb-3 ${dark ? "text-gray-300" : "text-gray-700"}`}>
//                   Included Sections
//                 </h4>
//                 <div className="flex flex-wrap gap-1 sm:gap-2">
//                   {enabledSteps.map(stepId => (
//                     <span
//                       key={stepId}
//                       className={`text-xs px-2 py-1 rounded-full ${
//                         dark ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-700"
//                       }`}
//                     >
//                       {allSteps.find(s => s.id === stepId)?.title}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-sm">
//                 <div className="space-y-3 sm:space-y-4">
//                   <div>
//                     <span className="font-medium text-gray-500 dark:text-gray-400">Company:</span>
//                     <div className={`mt-1 ${dark ? "text-white" : "text-gray-900"}`}>
//                       {formData.startupName || "Not specified"}
//                     </div>
//                   </div>
//                   <div>
//                     <span className="font-medium text-gray-500 dark:text-gray-400">Pitch Type:</span>
//                     <div className={`mt-1 ${dark ? "text-white" : "text-gray-900"}`}>
//                       {pitchType}
//                     </div>
//                   </div>
//                   <div>
//                     <span className="font-medium text-gray-500 dark:text-gray-400">Funding Ask:</span>
//                     <div className={`mt-1 text-base sm:text-lg font-bold text-green-600`}>
//                       ${formData.fundingDetails.fundingAskAmount.toLocaleString() || "0"}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="space-y-3 sm:space-y-4">
//                   <div>
//                     <span className="font-medium text-gray-500 dark:text-gray-400">Equity Offered:</span>
//                     <div className={`mt-1 ${dark ? "text-white" : "text-gray-900"}`}>
//                       {formData.fundingDetails.equityOfferedPercent || 0}%
//                     </div>
//                   </div>
//                   <div>
//                     <span className="font-medium text-gray-500 dark:text-gray-400">Team Size:</span>
//                     <div className={`mt-1 ${dark ? "text-white" : "text-gray-900"}`}>
//                       {formData.teamMembers.filter((tm) => tm.name).length + 1} members
//                     </div>
//                   </div>
//                   <div>
//                     <span className="font-medium text-gray-500 dark:text-gray-400">Completion:</span>
//                     <div className={`mt-1 ${dark ? "text-white" : "text-gray-900"}`}>
//                       {calculateCompletionPercentage()}%
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {formData.oneLiner && (
//                 <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-600">
//                   <span className="font-medium text-gray-500 dark:text-gray-400">Value Proposition:</span>
//                   <p className={`mt-2 leading-relaxed text-sm sm:text-base ${dark ? "text-gray-300" : "text-gray-700"}`}>
//                     {formData.oneLiner}
//                   </p>
//                 </div>
//               )}
//             </div>

//             <div className={`p-4 sm:p-6 rounded-sm border-2 ${dark ? "border-blue-500/30 bg-blue-500/5" : "border-blue-200 bg-blue-50"}`}>
//               <label className="flex items-start gap-3 sm:gap-4 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   required
//                   className="mt-1 w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded focus:ring-blue-500 focus:ring-2"
//                 />
//                 <div className="text-xs sm:text-sm">
//                   <p className={`font-medium mb-1 sm:mb-2 ${dark ? "text-blue-300" : "text-blue-900"}`}>
//                     I confirm that all information provided is accurate and complete
//                   </p>
//                   <p className={`text-xs leading-relaxed ${dark ? "text-blue-400" : "text-blue-700"}`}>
//                     By submitting this {pitchType} pitch, you agree to our terms of service and privacy policy.
//                     We will review your submission and contact you within 5-7 business days.
//                   </p>
//                 </div>
//               </label>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className={`min-h-screen ${dark ? "bg-gray-900" : "bg-gray-50"}`}>
//       <div className="max-w-4xl mx-auto p-3 sm:p-6">
//         {/* Header with Pitch Type */}
//         {pitchType && (
//           <div className={`mb-4 sm:mb-8 p-4 sm:p-6 rounded-sm ${dark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}>
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
//               <div className="flex-1">
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
//                   <h1 className={`text-xl sm:text-2xl font-light ${dark ? "text-white" : "text-gray-900"}`}>
//                     {pitchType} Pitch
//                   </h1>
//                   <button
//                     onClick={() => {
//                       setPitchType(null);
//                       setEnabledSteps([]);
//                       setCurrentStepIndex(0);
//                     }}
//                     className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-sm border transition-colors ${
//                       dark
//                         ? "border-gray-600 text-gray-400 hover:text-white hover:border-gray-500"
//                         : "border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400"
//                     }`}
//                   >
//                     Change Type
//                   </button>
//                 </div>
//                 <p className={`text-xs sm:text-sm mt-1 ${dark ? "text-gray-400" : "text-gray-600"}`}>
//                   Step {currentStepIndex + 1} of {totalSteps}
//                 </p>
//               </div>

//               {draftSaved && (
//                 <div className={`flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm ${
//                   dark
//                     ? "text-blue-300 bg-blue-500/10 border border-blue-500/30"
//                     : "text-blue-700 bg-blue-50 border border-blue-200"
//                 }`}>
//                   <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                   Draft Saved
//                 </div>
//               )}
//             </div>

//             {/* Progress Steps - Mobile optimized */}
//             <div className="hidden sm:flex items-center justify-between mb-4 sm:mb-6">
//               {enabledSteps.map((stepId, index) => {
//                 const step = allSteps.find(s => s.id === stepId);
//                 return (
//                   <div key={stepId} className="flex flex-col items-center relative">
//                     <div
//                       className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all duration-300 ${
//                         index <= currentStepIndex
//                           ? "bg-blue-600 text-white"
//                           : dark
//                           ? "bg-gray-700 text-gray-400"
//                           : "bg-gray-200 text-gray-500"
//                       }`}
//                     >
//                       {index < currentStepIndex ? "✓" : stepId}
//                     </div>
//                     <div className="text-xs mt-2 sm:mt-3 text-center max-w-[60px] sm:max-w-[70px]">
//                       <div
//                         className={`font-medium ${
//                           index <= currentStepIndex
//                             ? dark
//                               ? "text-white"
//                               : "text-gray-900"
//                             : dark
//                             ? "text-gray-500"
//                             : "text-gray-400"
//                         }`}
//                       >
//                         {step?.title}
//                       </div>
//                       <div
//                         className={`text-xs mt-1 ${
//                           index <= currentStepIndex
//                             ? dark
//                               ? "text-gray-400"
//                               : "text-gray-500"
//                             : dark
//                             ? "text-gray-600"
//                             : "text-gray-400"
//                         }`}
//                       >
//                         {step?.subtitle}
//                       </div>
//                     </div>
//                     {index < enabledSteps.length - 1 && (
//                       <div
//                         className={`absolute top-4 sm:top-5 left-4 sm:left-5 h-px w-full ${
//                           index < currentStepIndex
//                             ? "bg-blue-600"
//                             : dark
//                             ? "bg-gray-700"
//                             : "bg-gray-300"
//                         }`}
//                         style={{
//                           width: "calc(100% - 16px)",
//                           marginLeft: "24px",
//                         }}
//                       />
//                     )}
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Mobile Progress Indicator */}
//             <div className="sm:hidden mb-4">
//               <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
//                 <span>Progress</span>
//                 <span>{currentStepIndex + 1}/{totalSteps}</span>
//               </div>
//               <div className="flex gap-1">
//                 {enabledSteps.map((_, index) => (
//                   <div
//                     key={index}
//                     className={`flex-1 h-2 rounded-full ${
//                       index <= currentStepIndex
//                         ? "bg-blue-600"
//                         : dark
//                         ? "bg-gray-700"
//                         : "bg-gray-200"
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Progress Bar */}
//             <div className={`w-full h-1 sm:h-2 rounded-full ${dark ? "bg-gray-700" : "bg-gray-200"}`}>
//               <div
//                 className="h-1 sm:h-2 bg-blue-600 rounded-full transition-all duration-500"
//                 style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
//               />
//             </div>
//           </div>
//         )}

//         {/* Main Form */}
//         {pitchType && (
//           <div className={`rounded-sm ${dark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}>
//             <div className="p-4 sm:p-8">
//               <div className="mb-6 sm:mb-8">
//                 <h2 className={`text-xl sm:text-2xl font-semibold ${dark ? "text-white" : "text-gray-900"}`}>
//                   {allSteps.find(s => s.id === currentStep)?.title}
//                 </h2>
//                 <p className={`text-xs sm:text-sm mt-1 ${dark ? "text-gray-400" : "text-gray-600"}`}>
//                   {allSteps.find(s => s.id === currentStep)?.subtitle}
//                 </p>
//               </div>

//               {error && (
//                 <div className="mb-6 sm:mb-8 p-3 sm:p-4 rounded-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 text-xs sm:text-sm">
//                   {error}
//                 </div>
//               )}

//               <form onSubmit={handleSubmit}>
//                 {renderStepContent()}

//                 {/* Navigation */}
//                 <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-gray-200 dark:border-gray-700 gap-3 sm:gap-0">
//                   <button
//                     type="button"
//                     onClick={prevStep}
//                     disabled={currentStepIndex === 0}
//                     className={`px-4 sm:px-6 py-2 sm:py-3 rounded-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base ${
//                       dark
//                         ? "bg-gray-700 text-white hover:bg-gray-600 disabled:bg-gray-800"
//                         : "bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100"
//                     }`}
//                   >
//                     Previous
//                   </button>

//                   <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
//                     <button
//                       type="button"
//                       onClick={handleClearDraft}
//                       className={`px-4 sm:px-6 py-2 sm:py-3 rounded-sm font-medium transition-all duration-200 border text-sm sm:text-base ${
//                         dark
//                           ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500"
//                           : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
//                       }`}
//                     >
//                       Clear Draft
//                     </button>

//                     {currentStepIndex < totalSteps - 1 ? (
//                       <button
//                         type="button"
//                         onClick={nextStep}
//                         className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-sm font-medium transition-all duration-200 text-sm sm:text-base"
//                       >
//                         Next Step
//                       </button>
//                     ) : (
//                       <button
//                         type="submit"
//                         disabled={loading || !validateStep(currentStep)}
//                         className="px-6 sm:px-8 py-2 sm:py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-sm font-medium transition-all duration-200 text-sm sm:text-base"
//                       >
//                         {loading ? (
//                           <span className="flex items-center justify-center gap-2">
//                             <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                             Submitting...
//                           </span>
//                         ) : (
//                           "Submit Pitch"
//                         )}
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PitchForm;