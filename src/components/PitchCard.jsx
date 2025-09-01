// // components/PitchCard.jsx
// import { useCallback, useEffect, useState, useRef } from "react";
// import useThemeStore from "../store/themeStore";
// import { User, Clock, ChevronDown, ChevronUp } from "lucide-react";

// const PitchCard = ({ pitch }) => {
//   console.log(pitch)
//   const dark = useThemeStore((s) => s.dark);

//   const [isContentExpanded, setIsContentExpanded] = useState(false);
//   const [showExpandButton, setShowExpandButton] = useState(true); // Always show for pitches due to multiple sections
//   const contentRef = useRef(null);

//   // Simplified expansion check (pitches have multiple sections, so always expandable)
//   useEffect(() => {
//     setShowExpandButton(true);
//   }, [pitch]);

//   const handleContentExpand = (e) => {
//     e.stopPropagation();
//     setIsContentExpanded(!isContentExpanded);
//   };

//   function timeAgo(date) {
//     const seconds = Math.floor((new Date() - new Date(date)) / 1000);
//     const intervals = [
//       { label: "year", seconds: 31536000 },
//       { label: "month", seconds: 2592000 },
//       { label: "week", seconds: 604800 },
//       { label: "day", seconds: 86400 },
//       { label: "hour", seconds: 3600 },
//       { label: "minute", seconds: 60 },
//       { label: "second", seconds: 1 },
//     ];
//     for (let interval of intervals) {
//       const count = Math.floor(seconds / interval.seconds);
//       if (count >= 1) {
//         return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
//       }
//     }
//     return "just now";
//   }

//   if (!pitch) return null;

//   return (
//     <div
//       ref={contentRef}
//       className={`pitch-card mb-2 lg:w-xl border ${dark ? "border-black" : "border-gray-200"}`}
//       style={{
//         // border: "2px solid #eee",
//         borderRadius: "8px",
//         padding: "16px",
//         background: dark ? "#333" : "#fff",
//         color: dark ? "#fff" : "#000",
//       }}
//     >
//       <div className="header" style={{ marginBottom: "12px" }}>
//         <h2 style={{ margin: "0", fontSize: "1.5em" }}>{pitch.startupName}</h2>
//         <p style={{ margin: "4px 0", fontStyle: "italic" }}>{pitch.oneLiner}</p>
//       </div>

//       <div
//         className="founder"
//         style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
//       >
//         <User size={16} style={{ marginRight: "8px" }} />
//         <span>
//           {pitch.founderName} ({pitch.founderEmail})
//         </span>
//       </div>

//       <div
//         className="time"
//         style={{
//           display: "flex",
//           alignItems: "center",
//           marginBottom: "12px",
//           fontSize: "0.9em",
//           color: "#666",
//         }}
//       >
//         <Clock size={16} style={{ marginRight: "8px" }} />
//         <span>{timeAgo(pitch.createdAt)}</span>
//       </div>

//       {showExpandButton && (
//         <button
//           onClick={handleContentExpand}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             background: "none",
//             border: "none",
//             cursor: "pointer",
//             color: "#007bff",
//             marginBottom: "12px",
//           }}
//         >
//           {isContentExpanded ? (
//             <ChevronUp size={20} />
//           ) : (
//             <ChevronDown size={20} />
//           )}
//           <span style={{ marginLeft: "4px" }}>
//             {isContentExpanded ? "Hide Details" : "Show Full Pitch Details"}
//           </span>
//         </button>
//       )}

//       {isContentExpanded && (
//         <div className="details" style={{ transition: "max-height 0.3s ease" }}>
//           <section style={{ marginBottom: "16px" }}>
//             <h4 style={{ margin: "0 0 4px" }}>Problem</h4>
//             <p>{pitch.problem || "Not provided"}</p>
//           </section>
//           <section style={{ marginBottom: "16px" }}>
//             <h4 style={{ margin: "0 0 4px" }}>Solution</h4>
//             <p>{pitch.solution || "Not provided"}</p>
//           </section>
//           <section style={{ marginBottom: "16px" }}>
//             <h4 style={{ margin: "0 0 4px" }}>Target Market</h4>
//             <p>{pitch.targetMarket || "Not provided"}</p>
//           </section>
//           <section style={{ marginBottom: "16px" }}>
//             <h4 style={{ margin: "0 0 4px" }}>Business Model</h4>
//             <p>{pitch.businessModel || "Not provided"}</p>
//           </section>
//           <section style={{ marginBottom: "16px" }}>
//             <h4 style={{ margin: "0 0 4px" }}>Traction</h4>
//             <p>{pitch.traction || "Not provided"}</p>
//           </section>
//           <section style={{ marginBottom: "16px" }}>
//             <h4 style={{ margin: "0 0 4px" }}>Team</h4>
//             <p>{pitch.team || "Not provided"}</p>
//           </section>
//           <section style={{ marginBottom: "16px" }}>
//             <h4 style={{ margin: "0 0 4px" }}>Go-to-Market Strategy</h4>
//             <p>{pitch.goToMarketStrategy || "Not provided"}</p>
//           </section>
//           <section style={{ marginBottom: "16px" }}>
//             <h4 style={{ margin: "0 0 4px" }}>Competition</h4>
//             <p>{pitch.competition || "Not provided"}</p>
//           </section>
//           <section style={{ marginBottom: "16px" }}>
//             <h4 style={{ margin: "0 0 4px" }}>Funding Ask</h4>
//             <p>{pitch.fundingAsk || "Not provided"}</p>
//           </section>
//           <section style={{ marginBottom: "16px" }}>
//             <h4 style={{ margin: "0 0 4px" }}>Funding Use</h4>
//             <p>{pitch.fundingUse || "Not provided"}</p>
//           </section>
//           <section style={{ marginBottom: "16px" }}>
//             <h4 style={{ margin: "0 0 4px" }}>Website</h4>
//             <p>{pitch.website || "Not provided"}</p>
//           </section>
//           <section style={{ marginBottom: "16px" }}>
//             <h4 style={{ margin: "0 0 4px" }}>Pitch Deck URL</h4>
//             <p>{pitch.pitchDeckUrl || "Not provided"}</p>
//           </section>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PitchCard;

// components/PitchCard.jsx

// import { useState } from "react";
// import useThemeStore from "../store/themeStore";
// import {
//   Users,
//   Mail,
//   Target,
//   CheckCircle,
//   AlertTriangle,
//   ChevronRight,
//   Globe,
// } from "lucide-react";

// const PitchCard = ({ pitch }) => {
//   const dark = useThemeStore((s) => s.dark);
//   const [showDetails, setShowDetails] = useState(false);

//   if (!pitch) return null;

//   return (
//     <div
//       className={`border lg:max-w-xl w-full flex flex-col justify-center m-2 rounded-lg  ${
//         dark
//           ? "bg-gray-900 border-gray-700 text-gray-100"
//           : "bg-white border-gray-200 text-gray-900"
//       } shadow-sm`}
//     >
//       {/* Header */}
//       <div className="p-4 border-b flex justify-between items-start">
//         <div>
//           <h2 className="text-xl font-bold">{pitch.startupName}</h2>
//           <p className="text-sm opacity-70">{pitch.oneLiner}</p>
//         </div>
//         <div className="text-right">
//           <div className="text-lg font-bold">
//             ₹{parseInt(pitch.fundingAsk).toLocaleString()}
//           </div>
//           <div className="text-sm opacity-70">Funding Ask</div>
//         </div>
//       </div>

//       {/* Market & Business */}
//       <div
//         className={`p-4 border-b ${
//           dark ? "border-gray-700" : "border-gray-200"
//         }`}
//       >
//         <div className="flex justify-between mb-1">
//           <div className="flex items-center">
//             <Target size={16} className="mr-1" /> Market
//           </div>
//           <div>{pitch.targetMarket}</div>
//         </div>
//         <p className="text-sm opacity-70">{pitch.businessModel}</p>
//       </div>

//       {/* Positive & Risk */}
//       <div className="p-4 border-b grid grid-cols-2 gap-4">
//         <div>
//           <h4 className="flex items-center font-semibold text-green-600 mb-1">
//             <CheckCircle size={14} className="mr-1" /> Traction
//           </h4>
//           <div className="text-sm">{pitch.traction || "Not provided"}</div>
//         </div>
//         <div>
//           <h4 className="flex items-center font-semibold text-red-600 mb-1">
//             <AlertTriangle size={14} className="mr-1" /> Competition
//           </h4>
//           <div className="text-sm">{pitch.competition || "None"}</div>
//         </div>
//       </div>

//       {/* Founder */}
//       <div
//         className={`p-4 flex items-center justify-between ${
//           dark ? "bg-gray-800" : "bg-gray-100"
//         }`}
//       >
//         <div className="flex items-center">
//           <div>
//             <a href={`mailto:${pitch.founderEmail}`} className="font-semibold">
//               {pitch.founderName}
//             </a>
//           </div>
//           <button
//             onClick={() => setShowDetails(!showDetails)}
//             className="p-2 border rounded transition"
//           >
//             <ChevronRight
//               size={20}
//               className={`₹{
//                 showDetails ? "rotate-90" : ""
//               } transition-transform`}
//             />
//           </button>
//         </div>
//       </div>

//       {/* Detailed Pitch */}
//       {showDetails && (
//         <div
//           className={`p-4 border-t space-y-3 ${
//             dark ? "border-gray-700" : "border-gray-200"
//           }`}
//         >
//           {[
//             "problem",
//             "solution",
//             "team",
//             "goToMarketStrategy",
//             "fundingUse",
//           ].map(
//             (key) =>
//               pitch[key] && (
//                 <div key={key}>
//                   <h4 className="font-semibold capitalize">
//                     {key.replace(/([A-Z])/g, " $1")}
//                   </h4>
//                   <p className="text-sm opacity-70">{pitch[key]}</p>
//                 </div>
//               )
//           )}
//           {pitch.website && (
//             <a
//               href={pitch.website}
//               target="_blank"
//               className="text-blue-600 underline flex items-center"
//             >
//               <Globe size={16} className="mr-1" /> Website
//             </a>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PitchCard;

// import { useState } from "react";
// import { Link } from "react-router-dom";
// import useThemeStore from "../store/themeStore";
// import {
//   Target,
//   CheckCircle,
//   AlertTriangle,
//   Heart,
//   ChevronRight,
// } from "lucide-react";
// import useAuthStore from "../store/authStore";
// import api from "../utils/api1";

// const PitchCard = ({ pitch }) => {
//   const dark = useThemeStore((s) => s.dark);
//   const { user } = useAuthStore();
//   const [upvotes, setUpvotes] = useState(pitch.upvotes || 0);
//   const [isUpvoted, setIsUpvoted] = useState(false);

//   const handleUpvote = async (e) => {
//     e.stopPropagation();
//     const res = await api.post(`user/posts/pitches/${pitch._id}/like`);
//     if (isUpvoted) {
//       [...pitch.likes, res.data.likes];
//       setIsUpvoted(false);
//     } else {
//       [...pitch.likes, res.data.likes];
//       setIsUpvoted(true);
//     }
//   };

//   if (!pitch) return null;

//   return (
//     <div
//       className={`backdrop-blur-xl lg:max-w-xl rounded-sm border-[0.1px] transition-all duration-700 ease-out cursor-pointer overflow-hidden group lg:w-xl ${
//         dark
//           ? "bg-black border-gray-700 text-gray-100 hover:bg-black"
//           : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
//       } mb-2 shadow-sm`}
//     >
//       {/* Header */}
//       <div className="p-4 border-b flex justify-between items-start">
//         <div>
//           <h2 className="text-xl font-normal">{pitch.startupName}</h2>
//           <p className="text-sm opacity-70">{pitch.oneLiner}</p>
//         </div>
//         <div className="text-right">
//           <div className="text-lg font-bold">
//             ₹{parseInt(pitch.fundingAsk).toLocaleString()}
//           </div>
//           <div className="text-sm opacity-70">Funding Ask</div>
//         </div>
//       </div>

//       {/* Market & Business */}
//       <div
//         className={`p-4 border-b ${
//           dark ? "border-gray-700" : "border-gray-200"
//         }`}
//       >
//         <div className="flex justify-between mb-1">
//           <div className="flex items-center">
//             <Target size={16} className="mr-1" /> Market
//           </div>
//           <div>{pitch.targetMarket}</div>
//         </div>
//         <p className="text-sm opacity-70 line-clamp-2">{pitch.businessModel}</p>
//       </div>

//       {/* Quick Stats */}
//       <div className="p-4 border-b grid grid-cols-2 gap-4">
//         <div>
//           <h4 className="flex items-center font-semibold text-green-600 mb-1">
//             <CheckCircle size={14} className="mr-1" /> Traction
//           </h4>
//           <div className="text-sm line-clamp-1">
//             {pitch.traction || "Not provided"}
//           </div>
//         </div>
//         <div>
//           <h4 className="flex items-center font-semibold text-red-600 mb-1">
//             <AlertTriangle size={14} className="mr-1" /> Competition
//           </h4>
//           <div className="text-sm line-clamp-1">
//             {pitch.competition || "None"}
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div
//         className={`p-4 flex items-center justify-between ${
//           dark ? "bg-gray-800" : "bg-gray-100"
//         }`}
//       >
//         <div className="flex items-center">
//           <div className="font-semibold">{pitch.founderName}</div>
//         </div>

//         <div className="flex items-center gap-2">
//           {/* Upvote Button */}
//           <button
//             onClick={handleUpvote}
//             className={`flex items-center gap-1 px-3 py-1 rounded-full border transition-all duration-200 ${
//               isUpvoted
//                 ? dark
//                   ? "bg-red-900 border-red-700 text-red-300"
//                   : "bg-red-50 border-red-200 text-red-600"
//                 : dark
//                 ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
//                 : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
//             }`}
//           >
//             <Heart
//               size={16}
//               className={`${isUpvoted ? "fill-current" : ""} transition-colors`}
//             />
//             <span className="text-sm font-medium">{pitch.likes.length}</span>
//           </button>

//           {/* View Details Arrow */}
//           <div
//             className={`p-2 border rounded ${
//               dark ? "border-gray-600" : "border-gray-300"
//             }`}
//           >
//             <Link to={`${pitch._id}`} state={pitch}>
//               <ChevronRight size={20} />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PitchCard;

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import useThemeStore from "../store/themeStore";
// import {
//   Target,
//   CheckCircle,
//   AlertTriangle,
//   Heart,
//   ChevronRight,
// } from "lucide-react";
// import useAuthStore from "../store/authStore";
// import api from "../utils/api1";

// const PitchCard = ({ pitch }) => {
//   const dark = useThemeStore((s) => s.dark);
//   const { user } = useAuthStore();

//   // Initialize likes array from pitch.likes or empty array
//   const [likes, setLikes] = useState(pitch.likes || []);
//   // Initialize isUpvoted based on whether current user's id is in likes
//   const [isUpvoted, setIsUpvoted] = useState(false);

//   useEffect(() => {
//     if (user && likes.some((like) => like.user === user._id)) {
//       setIsUpvoted(true);
//     } else {
//       setIsUpvoted(false);
//     }
//   }, [user, likes]);

//   const handleUpvote = async (e) => {
//     e.stopPropagation();
//     try {
//       const res = await api.post(`user/posts/pitches/${pitch._id}/like`);
//       // Assuming res.data.likes is the updated array of likes
//       setLikes(res.data.likes);
//       // Update isUpvoted based on presence of current user's like
//       const userLiked = res.data.likes.some((like) => like.user === user._id);
//       setIsUpvoted(userLiked);
//     } catch (error) {
//       console.error("Failed to update like:", error);
//       // Optionally show user feedback
//     }
//   };

//   if (!pitch) return null;

//   return (
//     <div
//       className={`backdrop-blur-xl lg:max-w-xl rounded-sm border-[0.1px] transition-all duration-700 ease-out cursor-pointer overflow-hidden group lg:w-xl ${
//         dark
//           ? "bg-black border-gray-700 text-gray-100 hover:bg-black"
//           : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
//       } mb-2 shadow-sm`}
//     >
//       {/* Header */}
//       <div className="p-4 border-b flex justify-between items-start">
//         <div>
//           <h2 className="text-xl font-normal">{pitch.startupName}</h2>
//           <p className="text-sm opacity-70">{pitch.oneLiner}</p>
//         </div>
//         <div className="text-right">
//           <div className="text-lg font-bold">
//             ₹{parseInt(pitch.fundingAsk).toLocaleString()}
//           </div>
//           <div className="text-sm opacity-70">Funding Ask</div>
//         </div>
//       </div>

//       {/* Market & Business */}
//       <div
//         className={`p-4 border-b ${
//           dark ? "border-gray-700" : "border-gray-200"
//         }`}
//       >
//         <div className="flex justify-between mb-1">
//           <div className="flex items-center">
//             <Target size={16} className="mr-1" /> Market
//           </div>
//           <div>{pitch.targetMarket}</div>
//         </div>
//         <p className="text-sm opacity-70 line-clamp-2">{pitch.businessModel}</p>
//       </div>

//       {/* Quick Stats */}
//       <div className="p-4 border-b grid grid-cols-2 gap-4">
//         <div>
//           <h4 className="flex items-center font-semibold text-green-600 mb-1">
//             <CheckCircle size={14} className="mr-1" /> Traction
//           </h4>
//           <div className="text-sm line-clamp-1">
//             {pitch.traction || "Not provided"}
//           </div>
//         </div>
//         <div>
//           <h4 className="flex items-center font-semibold text-red-600 mb-1">
//             <AlertTriangle size={14} className="mr-1" /> Competition
//           </h4>
//           <div className="text-sm line-clamp-1">
//             {pitch.competition || "None"}
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div
//         className={`p-4 flex items-center justify-between ${
//           dark ? "bg-gray-800" : "bg-gray-100"
//         }`}
//       >
//         <div className="flex items-center">
//           <div className="font-semibold">{pitch.founderName}</div>
//         </div>

//         <div className="flex items-center gap-2">
//           {/* Upvote Button */}
//           <button
//             onClick={handleUpvote}
//             className={`flex items-center gap-1 px-3 py-1 rounded-full border transition-all duration-200 ${
//               isUpvoted
//                 ? dark
//                   ? "bg-red-900 border-red-700 text-red-300"
//                   : "bg-red-50 border-red-200 text-red-600"
//                 : dark
//                 ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
//                 : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
//             }`}
//           >
//             <Heart
//               size={16}
//               className={`${isUpvoted ? "fill-current" : ""} transition-colors`}
//             />
//             <span className="text-sm font-medium">{likes.length}</span>
//           </button>

//           {/* View Details Arrow */}
//           <div
//             className={`p-2 border rounded ${
//               dark ? "border-gray-600" : "border-gray-300"
//             }`}
//           >
//             <Link to={`${pitch._id}`} state={pitch}>
//               <ChevronRight size={20} />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PitchCard;

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import useThemeStore from "../store/themeStore";
// import {
//   Target,
//   CheckCircle,
//   AlertTriangle,
//   Heart,
//   ChevronRight,
//   TrendingUp,
//   Users,
//   DollarSign,
//   Clock,
//   Award,
//   Handshake,
//   Building,
// } from "lucide-react";
// import useAuthStore from "../store/authStore";
// import api from "../utils/api1";

// const PitchCard = ({ pitch }) => {
//   const dark = useThemeStore((s) => s.dark);
//   const { user } = useAuthStore();

//   const [likes, setLikes] = useState(pitch.likes || []);
//   const [isUpvoted, setIsUpvoted] = useState(false);

//   useEffect(() => {
//     if (user && likes.some((like) => like.user === user._id)) {
//       setIsUpvoted(true);
//     } else {
//       setIsUpvoted(false);
//     }
//   }, [user, likes]);

//   const handleUpvote = async (e) => {
//     e.stopPropagation();
//     try {
//       const res = await api.post(`user/posts/pitches/${pitch._id}/like`);
//       setLikes(res.data.likes);
//       const userLiked = res.data.likes.some((like) => like.user === user._id);
//       setIsUpvoted(userLiked);
//     } catch (error) {
//       console.error("Failed to update like:", error);
//     }
//   };

//   if (!pitch) return null;

//   // Extract key metrics with fallbacks
//   const monthlyRevenue = pitch.financials?.monthlyRevenue || 0;
//   const yearOverYearGrowth = pitch.financials?.yearOverYearGrowthPercent || 0;
//   const monthlyActiveUsers = pitch.productMetrics?.monthlyActiveUsers || 0;
//   const customerAcquisitionCost =
//     pitch.financials?.customerAcquisitionCost || 0;
//   const lifetimeValue = pitch.financials?.lifetimeValue || 0;
//   const runwayMonths = pitch.financials?.runwayMonths || 0;
//   const totalMarketSize = pitch.market?.totalMarketSize || 0;
//   const teamStrength = pitch.teamStrength || pitch.foundingTeam?.length || 1;
//   const fundingAsk =
//     pitch.fundingDetails?.fundingAskAmount || pitch.fundingAsk || 0;
//   const equityOffered =
//     pitch.fundingDetails?.equityOfferedPercent || pitch.equityOffered || 0;

//   // Calculate derived metrics
//   const ltv2cacRatio =
//     customerAcquisitionCost > 0 ? lifetimeValue / customerAcquisitionCost : 0;
//   const marketSizeInCrores = totalMarketSize / 10000000;

//   // Format large numbers
//   const formatNumber = (num) => {
//     if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)}Cr`;
//     if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
//     if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
//     return `₹${num.toLocaleString()}`;
//   };

//   const formatUsers = (num) => {
//     if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
//     if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
//     return num.toString();
//   };

//   // Compact status badges
//   const getStatusBadges = () => {
//     const badges = [];

//     if (monthlyRevenue > 0)
//       badges.push({ text: "Rev+", color: "bg-green-100 text-green-700" });
//     if (pitch.productMetrics?.keyAchievements?.length > 0)
//       badges.push({
//         text: `${pitch.productMetrics.keyAchievements.length}★`,
//         color: "bg-purple-100 text-purple-700",
//       });
//     if (pitch.partnerships?.length > 0)
//       badges.push({
//         text: `${pitch.partnerships.length}🤝`,
//         color: "bg-blue-100 text-blue-700",
//       });
//     if (pitch.stage)
//       badges.push({ text: pitch.stage, color: "bg-gray-100 text-gray-700" });

//     return badges.slice(0, 4);
//   };

//   const statusBadges = getStatusBadges();

//   return (
//     <div
//       className={`backdrop-blur-xl lg:max-w-xl rounded-sm border-[0.1px] transition-all duration-700 ease-out cursor-pointer overflow-hidden group lg:w-xl ${
//         dark
//           ? "bg-black border-gray-700 text-gray-100 hover:bg-black"
//           : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
//       } mb-2 shadow-sm`}
//     >
//       {/* Compact Header */}
//       <div className="p-3 flex justify-between items-start">
//         <div className="flex-1 mr-3">
//           <div className="flex items-center gap-2 mb-1">
//             <h2 className="text-lg font-medium">{pitch.startupName}</h2>
//             {statusBadges.map((badge, index) => (
//               <span
//                 key={index}
//                 className={`px-1.5 py-0.5 rounded text-xs ${badge.color}`}
//               >
//                 {badge.text}
//               </span>
//             ))}
//           </div>
//           <p className="text-sm opacity-70 line-clamp-1">{pitch.oneLiner}</p>
//         </div>

//         <div className="text-right text-sm">
//           <div className="font-bold">{formatNumber(fundingAsk)}</div>
//           <div className="text-xs opacity-70">{equityOffered}% equity</div>
//         </div>
//       </div>

//       {/* Compact Metrics */}
//       <div className="px-3 pb-2 grid grid-cols-6 gap-2 text-center text-xs">
//         <div>
//           <div className="font-semibold text-green-600">
//             {formatNumber(monthlyRevenue)}
//           </div>
//           <div className="opacity-60">MRR</div>
//         </div>
//         <div>
//           <div className="font-semibold text-blue-600">
//             {formatUsers(monthlyActiveUsers)}
//           </div>
//           <div className="opacity-60">Users</div>
//         </div>
//         <div>
//           <div
//             className={`font-semibold ${
//               yearOverYearGrowth > 0 ? "text-green-600" : "text-gray-500"
//             }`}
//           >
//             {yearOverYearGrowth > 0 ? "+" : ""}
//             {yearOverYearGrowth}%
//           </div>
//           <div className="opacity-60">Growth</div>
//         </div>
//         {customerAcquisitionCost > 0 && (
//           <div>
//             <div className="font-semibold">
//               ₹{(customerAcquisitionCost / 1000).toFixed(0)}K
//             </div>
//             <div className="opacity-60">CAC</div>
//           </div>
//         )}
//         {lifetimeValue > 0 && (
//           <div>
//             <div className="font-semibold">
//               ₹{(lifetimeValue / 1000).toFixed(0)}K
//             </div>
//             <div className="opacity-60">LTV</div>
//           </div>
//         )}
//         {runwayMonths > 0 && (
//           <div>
//             <div
//               className={`font-semibold ${
//                 runwayMonths < 12 ? "text-red-600" : ""
//               }`}
//             >
//               {runwayMonths}m
//             </div>
//             <div className="opacity-60">Runway</div>
//           </div>
//         )}
//       </div>

//       {/* Compact Business Info */}
//       <div className="px-3 py-2 border-t text-sm">
//         <div className="flex justify-between items-center mb-1">
//           <div className="flex items-center gap-1">
//             <Target size={12} />
//             <span className="font-medium">{pitch.targetMarket}</span>
//             {totalMarketSize > 0 && (
//               <span className="text-xs opacity-60">
//                 (₹{marketSizeInCrores.toFixed(1)}Cr TAM)
//               </span>
//             )}
//           </div>
//           {ltv2cacRatio > 0 && (
//             <span
//               className={`text-xs ${
//                 ltv2cacRatio >= 3 ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               LTV:CAC 1:{ltv2cacRatio.toFixed(1)}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Compact Footer */}
//       <div
//         className={`px-3 py-2 flex items-center justify-between text-sm ${
//           dark ? "bg-gray-800" : "bg-gray-50"
//         }`}
//       >
//         <div className="flex items-center gap-3">
//           <div>
//             <div className="font-medium">{pitch.founderName}</div>
//             <div className="text-xs opacity-70 flex items-center gap-2">
//               <span className="flex items-center gap-1">
//                 <Users size={10} />
//                 Team: {teamStrength}
//               </span>
//               {pitch.industry && <span>• {pitch.industry}</span>}
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center gap-2">
//           <button
//             onClick={handleUpvote}
//             className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-all ${
//               isUpvoted
//                 ? "bg-red-100 text-red-600"
//                 : dark
//                 ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
//                 : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//             }`}
//           >
//             <Heart size={12} className={isUpvoted ? "fill-current" : ""} />
//             {likes.length}
//           </button>

//           <Link
//             to={`${pitch._id}`}
//             state={pitch}
//             className={`p-1 rounded ${dark ? "bg-gray-700" : "bg-gray-100"}`}
//           >
//             <ChevronRight size={16} />
//           </Link>
//         </div>
//       </div>

//       {/* Critical Warning Strip */}
//       {runwayMonths > 0 && runwayMonths < 6 && (
//         <div className="px-3 py-1 bg-red-50 text-red-700 text-xs flex items-center gap-1">
//           <AlertTriangle size={10} />
//           Critical: {runwayMonths}m runway left
//         </div>
//       )}
//     </div>
//   );
// };

// export default PitchCard;


import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useThemeStore from "../store/themeStore";
import {
  Target,
  CheckCircle,
  AlertTriangle,
  Heart,
  ChevronRight,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  Award,
  Handshake,
  Building,
} from "lucide-react";
import useAuthStore from "../store/authStore";
import api from "../utils/api1";

const PitchCard = ({ pitch }) => {
  const dark = useThemeStore((s) => s.dark);
  const { user } = useAuthStore();

  const [likes, setLikes] = useState(pitch.likes || []);
  const [isUpvoted, setIsUpvoted] = useState(false);

  useEffect(() => {
    if (user && likes.some((like) => like.user === user._id)) {
      setIsUpvoted(true);
    } else {
      setIsUpvoted(false);
    }
  }, [user, likes]);

  const handleUpvote = async (e) => {
    e.stopPropagation();
    try {
      const res = await api.post(`user/posts/pitches/${pitch._id}/like`);
      setLikes(res.data.likes);
      const userLiked = res.data.likes.some((like) => like.user === user._id);
      setIsUpvoted(userLiked);
    } catch (error) {
      console.error("Failed to update like:", error);
    }
  };

  if (!pitch) return null;

  // Enhanced metrics calculation with fallbacks and validation
  const calculateMonthlyRevenue = () => {
    const monthlyRev = pitch.financials?.monthlyRevenue;
    const annualRev = pitch.financials?.revenueThisYear;
    
    if (monthlyRev && monthlyRev > 0) return monthlyRev;
    if (annualRev && annualRev > 0) return annualRev / 12;
    return 0;
  };

  const calculateYearOverYearGrowth = () => {
    const growthPercent = pitch.financials?.yearOverYearGrowthPercent;
    const currentYear = pitch.financials?.revenueThisYear;
    const lastYear = pitch.financials?.revenueLastYear;
    
    if (growthPercent && !isNaN(growthPercent)) return growthPercent;
    if (currentYear && lastYear && lastYear > 0) {
      return ((currentYear - lastYear) / lastYear * 100);
    }
    return 0;
  };

  const monthlyRevenue = calculateMonthlyRevenue();
  const yearOverYearGrowth = calculateYearOverYearGrowth();
  const monthlyActiveUsers = pitch.productMetrics?.monthlyActiveUsers || 0;
  const customerAcquisitionCost = pitch.financials?.customerAcquisitionCost || 0;
  const lifetimeValue = pitch.financials?.lifetimeValue || 0;
  const runwayMonths = pitch.financials?.runwayMonths || 0;
  const totalMarketSize = pitch.market?.totalMarketSize || 0;
  const teamStrength = pitch.teamStrength || pitch.foundingTeam?.length || 1;
  const fundingAsk = pitch.fundingDetails?.fundingAskAmount || pitch.fundingAsk || 0;
  const equityOffered = pitch.fundingDetails?.equityOfferedPercent || pitch.equityOffered || 0;

  // Calculate derived metrics with validation
  const ltv2cacRatio = (customerAcquisitionCost > 0 && lifetimeValue > 0) ? 
    lifetimeValue / customerAcquisitionCost : 0;
  const marketSizeInCrores = totalMarketSize > 0 ? totalMarketSize / 10000000 : 0;

  // Enhanced number formatting with validation
  const formatNumber = (num) => {
    if (!num || isNaN(num) || num < 0) return "₹0";
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)}Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
    return `₹${num.toLocaleString()}`;
  };

  const formatUsers = (num) => {
    if (!num || isNaN(num) || num < 0) return "0";
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatGrowth = (growth) => {
    if (!growth || isNaN(growth)) return "0%";
    const sign = growth > 0 ? "+" : "";
    return `${sign}${growth.toFixed(0)}%`;
  };

  // Enhanced status badges with proper logic
  const getStatusBadges = () => {
    const badges = [];

    // Revenue positive check
    if (monthlyRevenue > 0) {
      badges.push({ text: "Rev+", color: "bg-green-100 text-green-700" });
    }

    // Achievements check
    const achievements = pitch.productMetrics?.keyAchievements?.filter(a => a && a.trim()) || [];
    if (achievements.length > 0) {
      badges.push({
        text: `${achievements.length}★`,
        color: "bg-purple-100 text-purple-700",
      });
    }

    // Partnerships check
    const partnerships = pitch.partnerships?.filter(p => p && p.partnerName && p.partnerName.trim()) || [];
    if (partnerships.length > 0) {
      badges.push({
        text: `${partnerships.length}🤝`,
        color: "bg-blue-100 text-blue-700",
      });
    }

    // Stage check
    if (pitch.stage && pitch.stage.trim()) {
      badges.push({ 
        text: pitch.stage, 
        color: "bg-gray-100 text-gray-700" 
      });
    }

    return badges.slice(0, 4);
  };

  const statusBadges = getStatusBadges();

  // Build active metrics array for dynamic grid
  const buildActiveMetrics = () => {
    const metrics = [];

    // Always show revenue if available
    if (monthlyRevenue > 0) {
      metrics.push({
        value: formatNumber(monthlyRevenue),
        label: "MRR",
        color: "text-green-600"
      });
    }

    // Always show users if available
    if (monthlyActiveUsers > 0) {
      metrics.push({
        value: formatUsers(monthlyActiveUsers),
        label: "Users",
        color: "text-blue-600"
      });
    }

    // Growth rate
    if (Math.abs(yearOverYearGrowth) > 0) {
      metrics.push({
        value: formatGrowth(yearOverYearGrowth),
        label: "Growth",
        color: yearOverYearGrowth > 0 ? "text-green-600" : "text-red-600"
      });
    }

    // CAC if meaningful
    if (customerAcquisitionCost > 0) {
      metrics.push({
        value: `₹${(customerAcquisitionCost / 1000).toFixed(0)}K`,
        label: "CAC",
        color: "text-orange-600"
      });
    }

    // LTV if meaningful
    if (lifetimeValue > 0) {
      metrics.push({
        value: `₹${(lifetimeValue / 1000).toFixed(0)}K`,
        label: "LTV",
        color: "text-purple-600"
      });
    }

    // Runway with warning colors
    if (runwayMonths > 0 && !isNaN(runwayMonths)) {
      metrics.push({
        value: `${runwayMonths}m`,
        label: "Runway",
        color: runwayMonths < 12 ? "text-red-600" : "text-gray-600"
      });
    }

    return metrics;
  };

  const activeMetrics = buildActiveMetrics();
  const gridCols = activeMetrics.length <= 3 ? 'grid-cols-3' : 
                   activeMetrics.length <= 4 ? 'grid-cols-4' : 
                   activeMetrics.length <= 5 ? 'grid-cols-5' : 'grid-cols-6';

  return (
    <div
      className={`backdrop-blur-xl lg:max-w-xl rounded-sm border-[0.1px] transition-all duration-700 ease-out cursor-pointer overflow-hidden group lg:w-xl ${
        dark
          ? "bg-black border-gray-700 text-gray-100 hover:bg-black"
          : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
      } mb-2 shadow-sm`}
    >
      {/* Enhanced Header */}
      <div className="p-3 flex justify-between items-start">
        <div className="flex-1 mr-3">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h2 className="text-lg font-medium">{pitch.startupName || "Unknown Startup"}</h2>
            {statusBadges.map((badge, index) => (
              <span
                key={index}
                className={`px-1.5 py-0.5 rounded text-xs ${badge.color} whitespace-nowrap`}
              >
                {badge.text}
              </span>
            ))}
          </div>
          <p className="text-sm opacity-70 line-clamp-1">
            {pitch.oneLiner || pitch.uniqueValueProposition || "No description available"}
          </p>
        </div>

        <div className="text-right text-sm flex-shrink-0">
          <div className="font-bold">{formatNumber(fundingAsk)}</div>
          {equityOffered > 0 && (
            <div className="text-xs opacity-70">{equityOffered}% equity</div>
          )}
        </div>
      </div>

      {/* Dynamic Metrics Grid */}
      {activeMetrics.length > 0 && (
        <div className={`px-3 pb-2 grid ${gridCols} gap-2 text-center text-xs`}>
          {activeMetrics.map((metric, index) => (
            <div key={index}>
              <div className={`font-semibold ${metric.color}`}>
                {metric.value}
              </div>
              <div className="opacity-60">{metric.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Enhanced Business Info */}
      <div className="px-3 py-2 border-t text-sm">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center gap-1 flex-1">
            <Target size={12} />
            <span className="font-medium">{pitch.targetMarket || pitch.industry || "Market TBD"}</span>
            {marketSizeInCrores > 0 && (
              <span className="text-xs opacity-60">
                (₹{marketSizeInCrores.toFixed(0)}Cr TAM)
              </span>
            )}
          </div>
          {ltv2cacRatio > 0 && (
            <span
              className={`text-xs flex-shrink-0 ml-2 ${
                ltv2cacRatio >= 3 ? "text-green-600" : 
                ltv2cacRatio >= 1 ? "text-orange-600" : "text-red-600"
              }`}
            >
              LTV:CAC 1:{ltv2cacRatio.toFixed(1)}
            </span>
          )}
        </div>
      </div>

      {/* Enhanced Footer */}
      <div
        className={`px-3 py-2 flex items-center justify-between text-sm ${
          dark ? "bg-gray-800" : "bg-gray-50"
        }`}
      >
        <div className="flex items-center gap-3 flex-1">
          <div className="min-w-0">
            <div className="font-medium truncate">
              {pitch.founderName || pitch.foundingTeam?.[0]?.name || "Unknown Founder"}
            </div>
            <div className="text-xs opacity-70 flex items-center gap-2">
              <span className="flex items-center gap-1">
                <Users size={10} />
                Team: {teamStrength}
              </span>
              {pitch.industry && <span>• {pitch.industry}</span>}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleUpvote}
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-all ${
              isUpvoted
                ? "bg-red-100 text-red-600"
                : dark
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Heart size={12} className={isUpvoted ? "fill-current" : ""} />
            {likes.length || 0}
          </button>

          <Link
            to={`${pitch._id}`}
            state={pitch}
            className={`p-1 rounded transition-colors ${
              dark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      {/* Enhanced Critical Warning Strip */}
      {runwayMonths && !isNaN(runwayMonths) && runwayMonths < 6 && (
        <div className="px-3 py-1 bg-red-50 text-red-700 text-xs flex items-center gap-1">
          <AlertTriangle size={10} />
          <span className="font-medium">Critical:</span> {runwayMonths}m runway remaining
        </div>
      )}

      {/* Success Indicator Strip */}
      {monthlyRevenue > 1000000 && yearOverYearGrowth > 50 && (
        <div className="px-3 py-1 bg-green-50 text-green-700 text-xs flex items-center gap-1">
          <TrendingUp size={10} />
          <span className="font-medium">High Growth:</span> {formatGrowth(yearOverYearGrowth)} revenue growth
        </div>
      )}
    </div>
  );
};

export default PitchCard;
