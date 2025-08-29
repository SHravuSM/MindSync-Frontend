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

import { useState } from "react";
import { Link } from "react-router-dom";
import useThemeStore from "../store/themeStore";
import {
  Target,
  CheckCircle,
  AlertTriangle,
  Heart,
  ChevronRight,
} from "lucide-react";

const PitchCard = ({ pitch }) => {
  const dark = useThemeStore((s) => s.dark);
  const [upvotes, setUpvotes] = useState(pitch.upvotes || 0);
  const [isUpvoted, setIsUpvoted] = useState(false);

  const handleUpvote = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking upvote
    if (isUpvoted) {
      setUpvotes(upvotes - 1);
      setIsUpvoted(false);
    } else {
      setUpvotes(upvotes + 1);
      setIsUpvoted(true);
    }
  };

  if (!pitch) return null;

  return (
    <div
      className={`border lg:w-xl rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] ${
        dark
          ? "bg-black border-gray-700 text-gray-100 hover:bg-black/50"
          : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
      } mb-6 shadow-sm`}
    >
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">{pitch.startupName}</h2>
          <p className="text-sm opacity-70">{pitch.oneLiner}</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold">
            ₹{parseInt(pitch.fundingAsk).toLocaleString()}
          </div>
          <div className="text-sm opacity-70">Funding Ask</div>
        </div>
      </div>

      {/* Market & Business */}
      <div
        className={`p-4 border-b ${
          dark ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="flex justify-between mb-1">
          <div className="flex items-center">
            <Target size={16} className="mr-1" /> Market
          </div>
          <div>{pitch.targetMarket}</div>
        </div>
        <p className="text-sm opacity-70 line-clamp-2">{pitch.businessModel}</p>
      </div>

      {/* Quick Stats */}
      <div className="p-4 border-b grid grid-cols-2 gap-4">
        <div>
          <h4 className="flex items-center font-semibold text-green-600 mb-1">
            <CheckCircle size={14} className="mr-1" /> Traction
          </h4>
          <div className="text-sm line-clamp-1">
            {pitch.traction || "Not provided"}
          </div>
        </div>
        <div>
          <h4 className="flex items-center font-semibold text-red-600 mb-1">
            <AlertTriangle size={14} className="mr-1" /> Competition
          </h4>
          <div className="text-sm line-clamp-1">
            {pitch.competition || "None"}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className={`p-4 flex items-center justify-between ${
          dark ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <div className="flex items-center">
          <div className="font-semibold">{pitch.founderName}</div>
        </div>

        <div className="flex items-center gap-2">
          {/* Upvote Button */}
          <button
            onClick={handleUpvote}
            className={`flex items-center gap-1 px-3 py-1 rounded-full border transition-all duration-200 ${
              isUpvoted
                ? dark
                  ? "bg-red-900 border-red-700 text-red-300"
                  : "bg-red-50 border-red-200 text-red-600"
                : dark
                ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Heart
              size={16}
              className={`${isUpvoted ? "fill-current" : ""} transition-colors`}
            />
            <span className="text-sm font-medium">{upvotes}</span>
          </button>

          {/* View Details Arrow */}
          <div
            className={`p-2 border rounded ${
              dark ? "border-gray-600" : "border-gray-300"
            }`}
          >
            <Link to={`${pitch._id}`} state={pitch}>
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchCard;
