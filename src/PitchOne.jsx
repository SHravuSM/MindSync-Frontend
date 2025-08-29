// import { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import useThemeStore from "./store/themeStore";
// import {
//   ArrowLeft,
//   Mail,
//   Target,
//   CheckCircle,
//   AlertTriangle,
//   Globe,
//   Heart,
//   Users,
// } from "lucide-react";

// const PitchOne = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dark = useThemeStore((s) => s.dark);
//   const [pitchs, setPitch] = useState(null);
//   const [upvotes, setUpvotes] = useState(0);
//   const [isUpvoted, setIsUpvoted] = useState(false);

//   const location = useLocation();
//   const pitch = location.state;

//   useEffect(() => {
//     setPitch(pitch);
//     setUpvotes(pitch.upvotes || 0);
//   }, [id, pitch]);

//   const handleUpvote = () => {
//     if (isUpvoted) {
//       setUpvotes(upvotes - 1);
//       setIsUpvoted(false);
//     } else {
//       setUpvotes(upvotes + 1);
//       setIsUpvoted(true);
//     }
//   };

//   if (!pitch) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center">Pitch not found</div>
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen ${dark ? "bg-gray-900" : "bg-gray-50"}`}>
//       <div className="container mx-auto px-4 py-8 max-w-2xl">
//         {/* Back Button */}
//         <button
//           onClick={() => navigate(-1)}
//           className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-lg border transition ${
//             dark
//               ? "border-gray-600 text-gray-300 hover:bg-gray-800"
//               : "border-gray-300 text-gray-600 hover:bg-gray-100"
//           }`}
//         >
//           <ArrowLeft size={20} />
//           Back to Pitches
//         </button>

//         {/* Main Content */}
//         <div
//           className={`rounded-lg overflow-hidden ${
//             dark
//               ? "bg-gray-800 border-gray-700 text-gray-100"
//               : "bg-white border-gray-200 text-gray-900"
//           } border shadow-lg`}
//         >
//           {/* Header */}
//           <div className="p-6 border-b">
//             <div className="flex justify-between items-start mb-4">
//               <div>
//                 <h1 className="text-3xl font-bold mb-2">{pitch.startupName}</h1>
//                 <p className="text-lg opacity-70">{pitch.oneLiner}</p>
//               </div>
//               <div className="text-right">
//                 <div className="text-2xl font-bold">
//                   ₹{parseInt(pitch.fundingAsk).toLocaleString()}
//                 </div>
//                 <div className="text-sm opacity-70">Funding Ask</div>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={handleUpvote}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
//                   isUpvoted
//                     ? dark
//                       ? "bg-red-900 border-red-700 text-red-300"
//                       : "bg-red-50 border-red-200 text-red-600"
//                     : dark
//                     ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
//                     : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
//                 }`}
//               >
//                 <Heart
//                   size={20}
//                   className={`${
//                     isUpvoted ? "fill-current" : ""
//                   } transition-colors`}
//                 />
//                 <span className="font-medium">{upvotes} upvotes</span>
//               </button>

//               <a
//                 href={`mailto:${pitch.founderEmail}`}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
//                   dark
//                     ? "border-blue-600 text-blue-400 hover:bg-blue-900"
//                     : "border-blue-600 text-blue-600 hover:bg-blue-50"
//                 }`}
//               >
//                 <Mail size={20} />
//                 Contact Founder
//               </a>
//             </div>
//           </div>

//           {/* Content Sections */}
//           <div className="p-6 space-y-8">
//             {/* Market & Business Model */}
//             <section>
//               <h2 className="text-xl font-bold mb-4 flex items-center">
//                 <Target size={24} className="mr-2" />
//                 Market & Business Model
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h3 className="font-semibold mb-2">Target Market</h3>
//                   <p className="opacity-70">{pitch.targetMarket}</p>
//                 </div>
//                 <div>
//                   <h3 className="font-semibold mb-2">Business Model</h3>
//                   <p className="opacity-70">{pitch.businessModel}</p>
//                 </div>
//               </div>
//             </section>

//             {/* Problem & Solution */}
//             {pitch.problem && (
//               <section>
//                 <h2 className="text-xl font-bold mb-4">Problem & Solution</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <h3 className="font-semibold mb-2">Problem</h3>
//                     <p className="opacity-70">{pitch.problem}</p>
//                   </div>
//                   <div>
//                     <h3 className="font-semibold mb-2">Solution</h3>
//                     <p className="opacity-70">{pitch.solution}</p>
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Traction & Competition */}
//             <section>
//               <h2 className="text-xl font-bold mb-4">Traction & Competition</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h3 className="flex items-center font-semibold text-green-600 mb-2">
//                     <CheckCircle size={20} className="mr-2" />
//                     Traction
//                   </h3>
//                   <p className="opacity-70">
//                     {pitch.traction || "Not provided"}
//                   </p>
//                 </div>
//                 <div>
//                   <h3 className="flex items-center font-semibold text-red-600 mb-2">
//                     <AlertTriangle size={20} className="mr-2" />
//                     Competition
//                   </h3>
//                   <p className="opacity-70">{pitch.competition || "None"}</p>
//                 </div>
//               </div>
//             </section>

//             {/* Team & Strategy */}
//             {(pitch.team || pitch.goToMarketStrategy) && (
//               <section>
//                 <h2 className="text-xl font-bold mb-4">Team & Strategy</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {pitch.team && (
//                     <div>
//                       <h3 className="font-semibold mb-2">Team</h3>
//                       <p className="opacity-70">{pitch.team}</p>
//                     </div>
//                   )}
//                   {pitch.goToMarketStrategy && (
//                     <div>
//                       <h3 className="font-semibold mb-2">
//                         Go-to-Market Strategy
//                       </h3>
//                       <p className="opacity-70">{pitch.goToMarketStrategy}</p>
//                     </div>
//                   )}
//                 </div>
//               </section>
//             )}

//             {/* Funding Use */}
//             {pitch.fundingUse && (
//               <section>
//                 <h2 className="text-xl font-bold mb-4">Use of Funds</h2>
//                 <p className="opacity-70">{pitch.fundingUse}</p>
//               </section>
//             )}
//           </div>

//           {/* Footer */}
//           <div
//             className={`p-6 border-t flex justify-between items-center ${
//               dark
//                 ? "bg-gray-700 border-gray-600"
//                 : "bg-gray-50 border-gray-200"
//             }`}
//           >
//             <div>
//               <h3 className="font-semibold">Founder</h3>
//               <a
//                 href={`mailto:${pitch.founderEmail}`}
//                 className="text-blue-600 hover:underline"
//               >
//                 {pitch.founderName}
//               </a>
//             </div>
//             {pitch.website && (
//               <a
//                 href={pitch.website}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-2 text-blue-600 hover:underline"
//               >
//                 <Globe size={20} />
//                 Visit Website
//               </a>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PitchOne;

// import { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import useThemeStore from "./store/themeStore";
// import { ArrowLeft, Mail, Heart, Globe } from "lucide-react";

// const PitchOne = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dark = useThemeStore((s) => s.dark);
//   const [pitchs, setPitch] = useState(null);
//   const [upvotes, setUpvotes] = useState(0);
//   const [isUpvoted, setIsUpvoted] = useState(false);

//   const location = useLocation();
//   const pitch = location.state;

//   useEffect(() => {
//     setPitch(pitch);
//     setUpvotes(pitch.upvotes || 0);
//   }, [id, pitch]);

//   const handleUpvote = () => {
//     if (isUpvoted) {
//       setUpvotes(upvotes - 1);
//       setIsUpvoted(false);
//     } else {
//       setUpvotes(upvotes + 1);
//       setIsUpvoted(true);
//     }
//   };

//   if (!pitch) {
//     return (
//       <div className="p-8">
//         <div className="text-gray-500">Pitch not found</div>
//       </div>
//     );
//   }

//   return (
//     <div className={dark ? "bg-black text-white" : "bg-white text-black"}>
//       <div className="max-w-2xl mx-auto p-6 space-y-8">

//         {/* Back */}
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm"
//         >
//           <ArrowLeft size={14} />
//           Back
//         </button>

//         {/* Header */}
//         <div className="space-y-4">
//           <h1 className="text-2xl font-medium">{pitch.startupName}</h1>
//           <p className="text-gray-600">{pitch.oneLiner}</p>

//           <div className="flex items-center justify-between">
//             <div className="text-xl text-green-600">
//               ₹{parseInt(pitch.fundingAsk).toLocaleString()}
//             </div>
//             <div className="flex items-center gap-4 text-sm">
//               <button
//                 onClick={handleUpvote}
//                 className={`flex items-center gap-1 ${
//                   isUpvoted ? "text-red-500" : "text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 <Heart size={14} className={isUpvoted ? "fill-current" : ""} />
//                 {upvotes}
//               </button>
//               <a
//                 href={`mailto:${pitch.founderEmail}`}
//                 className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
//               >
//                 <Mail size={14} />
//                 Contact
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="space-y-6">

//           {/* Market */}
//           <div>
//             <h3 className="font-medium mb-2">Market & Business</h3>
//             <div className="space-y-3 text-sm text-gray-600">
//               <div>
//                 <span className="font-medium">Target Market:</span> {pitch.targetMarket}
//               </div>
//               <div>
//                 <span className="font-medium">Business Model:</span> {pitch.businessModel}
//               </div>
//             </div>
//           </div>

//           {/* Problem & Solution */}
//           {pitch.problem && (
//             <div>
//               <h3 className="font-medium mb-2">Problem & Solution</h3>
//               <div className="space-y-3 text-sm text-gray-600">
//                 <div>
//                   <span className="font-medium">Problem:</span> {pitch.problem}
//                 </div>
//                 <div>
//                   <span className="font-medium">Solution:</span> {pitch.solution}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Performance */}
//           <div>
//             <h3 className="font-medium mb-2">Performance</h3>
//             <div className="space-y-3 text-sm text-gray-600">
//               <div>
//                 <span className="font-medium">Traction:</span> {pitch.traction || "Not provided"}
//               </div>
//               <div>
//                 <span className="font-medium">Competition:</span> {pitch.competition || "None"}
//               </div>
//             </div>
//           </div>

//           {/* Team & Strategy */}
//           {(pitch.team || pitch.goToMarketStrategy) && (
//             <div>
//               <h3 className="font-medium mb-2">Team & Strategy</h3>
//               <div className="space-y-3 text-sm text-gray-600">
//                 {pitch.team && (
//                   <div>
//                     <span className="font-medium">Team:</span> {pitch.team}
//                   </div>
//                 )}
//                 {pitch.goToMarketStrategy && (
//                   <div>
//                     <span className="font-medium">Strategy:</span> {pitch.goToMarketStrategy}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Funding */}
//           {pitch.fundingUse && (
//             <div>
//               <h3 className="font-medium mb-2">Use of Funds</h3>
//               <p className="text-sm text-gray-600">{pitch.fundingUse}</p>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="pt-6 border-t border-gray-100 flex items-center justify-between text-sm">
//           <div>
//             <div className="font-medium">{pitch.founderName}</div>
//             <div className="text-gray-500">{pitch.founderEmail}</div>
//           </div>
//           {pitch.website && (
//             <a
//               href={pitch.website}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
//             >
//               <Globe size={14} />
//               Website
//             </a>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default PitchOne;

// import { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import useThemeStore from "./store/themeStore";
// import { ArrowLeft, Mail, Heart, Globe, Calendar, MapPin, DollarSign, Users, TrendingUp, Target, Lightbulb, Shield, Rocket, Award } from "lucide-react";

// const PitchOne = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dark = useThemeStore((s) => s.dark);
//   const [pitchs, setPitch] = useState(null);
//   const [upvotes, setUpvotes] = useState(0);
//   const [isUpvoted, setIsUpvoted] = useState(false);

//   const location = useLocation();
//   const pitch = location.state;

//   useEffect(() => {
//     setPitch(pitch);
//     setUpvotes(pitch.upvotes || 0);
//   }, [id, pitch]);

//   const handleUpvote = () => {
//     if (isUpvoted) {
//       setUpvotes(upvotes - 1);
//       setIsUpvoted(false);
//     } else {
//       setUpvotes(upvotes + 1);
//       setIsUpvoted(true);
//     }
//   };

//   if (!pitch) {
//     return (
//       <div className="p-8">
//         <div className="text-gray-500">Pitch not found</div>
//       </div>
//     );
//   }

//   return (
//     <div className={dark ? "bg-black text-white min-h-screen" : "bg-white text-black min-h-screen"}>
//       <div className="max-w-2xl mx-auto p-6 space-y-8">

//         {/* Back */}
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm"
//         >
//           <ArrowLeft size={14} />
//           Back
//         </button>

//         {/* Header */}
//         <div className="space-y-4">
//           <div className="space-y-2">
//             <h1 className="text-2xl font-medium">{pitch.startupName}</h1>
//             <p className="text-gray-600">{pitch.oneLiner}</p>
//             {pitch.tagline && (
//               <p className="text-sm text-gray-500 italic">"{pitch.tagline}"</p>
//             )}
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="text-xl text-green-600 font-medium">
//               ₹{parseInt(pitch.fundingAsk).toLocaleString()}
//             </div>
//             <div className="flex items-center gap-4 text-sm">
//               <button
//                 onClick={handleUpvote}
//                 className={`flex items-center gap-1 ${
//                   isUpvoted ? "text-red-500" : "text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 <Heart size={14} className={isUpvoted ? "fill-current" : ""} />
//                 {upvotes}
//               </button>
//               <a
//                 href={`mailto:${pitch.founderEmail}`}
//                 className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
//               >
//                 <Mail size={14} />
//                 Contact
//               </a>
//             </div>
//           </div>

//           {/* Key Metrics */}
//           {(pitch.stage || pitch.location || pitch.industry || pitch.foundedYear) && (
//             <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 pt-2">
//               {pitch.stage && (
//                 <div className="flex items-center gap-1">
//                   <Rocket size={12} />
//                   <span>Stage: {pitch.stage}</span>
//                 </div>
//               )}
//               {pitch.location && (
//                 <div className="flex items-center gap-1">
//                   <MapPin size={12} />
//                   <span>{pitch.location}</span>
//                 </div>
//               )}
//               {pitch.industry && (
//                 <div className="flex items-center gap-1">
//                   <Target size={12} />
//                   <span>{pitch.industry}</span>
//                 </div>
//               )}
//               {pitch.foundedYear && (
//                 <div className="flex items-center gap-1">
//                   <Calendar size={12} />
//                   <span>Founded {pitch.foundedYear}</span>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Content */}
//         <div className="space-y-8">

//           {/* Executive Summary */}
//           {pitch.executiveSummary && (
//             <div>
//               <h3 className="font-medium mb-3">Executive Summary</h3>
//               <p className="text-sm text-gray-600 leading-relaxed">{pitch.executiveSummary}</p>
//             </div>
//           )}

//           {/* Market & Business */}
//           <div>
//             <h3 className="font-medium mb-3">Market & Business Model</h3>
//             <div className="space-y-4 text-sm text-gray-600">
//               <div>
//                 <span className="font-medium">Target Market:</span> {pitch.targetMarket}
//               </div>
//               <div>
//                 <span className="font-medium">Business Model:</span> {pitch.businessModel}
//               </div>
//               {pitch.marketSize && (
//                 <div>
//                   <span className="font-medium">Market Size:</span> {pitch.marketSize}
//                 </div>
//               )}
//               {pitch.revenueModel && (
//                 <div>
//                   <span className="font-medium">Revenue Model:</span> {pitch.revenueModel}
//                 </div>
//               )}
//               {pitch.customerSegments && (
//                 <div>
//                   <span className="font-medium">Customer Segments:</span> {pitch.customerSegments}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Problem & Solution */}
//           {pitch.problem && (
//             <div>
//               <h3 className="font-medium mb-3">Problem & Solution</h3>
//               <div className="space-y-4 text-sm text-gray-600">
//                 <div>
//                   <span className="font-medium">Problem:</span> {pitch.problem}
//                 </div>
//                 <div>
//                   <span className="font-medium">Solution:</span> {pitch.solution}
//                 </div>
//                 {pitch.uniqueValueProposition && (
//                   <div>
//                     <span className="font-medium">Unique Value Proposition:</span> {pitch.uniqueValueProposition}
//                   </div>
//                 )}
//                 {pitch.painPoints && (
//                   <div>
//                     <span className="font-medium">Key Pain Points:</span> {pitch.painPoints}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Product & Technology */}
//           {(pitch.productDescription || pitch.technology || pitch.features) && (
//             <div>
//               <h3 className="font-medium mb-3">Product & Technology</h3>
//               <div className="space-y-4 text-sm text-gray-600">
//                 {pitch.productDescription && (
//                   <div>
//                     <span className="font-medium">Product Description:</span> {pitch.productDescription}
//                   </div>
//                 )}
//                 {pitch.technology && (
//                   <div>
//                     <span className="font-medium">Technology Stack:</span> {pitch.technology}
//                   </div>
//                 )}
//                 {pitch.features && (
//                   <div>
//                     <span className="font-medium">Key Features:</span> {pitch.features}
//                   </div>
//                 )}
//                 {pitch.developmentStage && (
//                   <div>
//                     <span className="font-medium">Development Stage:</span> {pitch.developmentStage}
//                   </div>
//                 )}
//                 {pitch.intellectualProperty && (
//                   <div>
//                     <span className="font-medium">IP & Patents:</span> {pitch.intellectualProperty}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Traction & Performance */}
//           <div>
//             <h3 className="font-medium mb-3">Traction & Performance</h3>
//             <div className="space-y-4 text-sm text-gray-600">
//               <div>
//                 <span className="font-medium">Current Traction:</span> {pitch.traction || "Not provided"}
//               </div>
//               <div>
//                 <span className="font-medium">Competition:</span> {pitch.competition || "None"}
//               </div>
//               {pitch.revenue && (
//                 <div>
//                   <span className="font-medium">Current Revenue:</span> ₹{parseInt(pitch.revenue).toLocaleString()}
//                 </div>
//               )}
//               {pitch.customers && (
//                 <div>
//                   <span className="font-medium">Customer Base:</span> {pitch.customers}
//                 </div>
//               )}
//               {pitch.monthlyGrowthRate && (
//                 <div>
//                   <span className="font-medium">Monthly Growth:</span> {pitch.monthlyGrowthRate}%
//                 </div>
//               )}
//               {pitch.keyMetrics && (
//                 <div>
//                   <span className="font-medium">Key Metrics:</span> {pitch.keyMetrics}
//                 </div>
//               )}
//               {pitch.milestones && (
//                 <div>
//                   <span className="font-medium">Major Milestones:</span> {pitch.milestones}
//                 </div>
//               )}
//               {pitch.partnerships && (
//                 <div>
//                   <span className="font-medium">Key Partnerships:</span> {pitch.partnerships}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Team & Leadership */}
//           {(pitch.team || pitch.advisors || pitch.teamSize) && (
//             <div>
//               <h3 className="font-medium mb-3">Team & Leadership</h3>
//               <div className="space-y-4 text-sm text-gray-600">
//                 {pitch.team && (
//                   <div>
//                     <span className="font-medium">Core Team:</span> {pitch.team}
//                   </div>
//                 )}
//                 {pitch.founderBackground && (
//                   <div>
//                     <span className="font-medium">Founder Background:</span> {pitch.founderBackground}
//                   </div>
//                 )}
//                 {pitch.teamSize && (
//                   <div>
//                     <span className="font-medium">Team Size:</span> {pitch.teamSize} people
//                   </div>
//                 )}
//                 {pitch.advisors && (
//                   <div>
//                     <span className="font-medium">Advisors:</span> {pitch.advisors}
//                   </div>
//                 )}
//                 {pitch.keyHires && (
//                   <div>
//                     <span className="font-medium">Key Planned Hires:</span> {pitch.keyHires}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Strategy & Operations */}
//           {(pitch.goToMarketStrategy || pitch.marketingStrategy || pitch.salesStrategy) && (
//             <div>
//               <h3 className="font-medium mb-3">Strategy & Operations</h3>
//               <div className="space-y-4 text-sm text-gray-600">
//                 {pitch.goToMarketStrategy && (
//                   <div>
//                     <span className="font-medium">Go-to-Market Strategy:</span> {pitch.goToMarketStrategy}
//                   </div>
//                 )}
//                 {pitch.marketingStrategy && (
//                   <div>
//                     <span className="font-medium">Marketing Strategy:</span> {pitch.marketingStrategy}
//                   </div>
//                 )}
//                 {pitch.salesStrategy && (
//                   <div>
//                     <span className="font-medium">Sales Strategy:</span> {pitch.salesStrategy}
//                   </div>
//                 )}
//                 {pitch.operationalPlan && (
//                   <div>
//                     <span className="font-medium">Operational Plan:</span> {pitch.operationalPlan}
//                   </div>
//                 )}
//                 {pitch.scalingPlan && (
//                   <div>
//                     <span className="font-medium">Scaling Plan:</span> {pitch.scalingPlan}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Financial Details */}
//           <div>
//             <h3 className="font-medium mb-3">Financial Details</h3>
//             <div className="space-y-4 text-sm text-gray-600">
//               <div>
//                 <span className="font-medium">Funding Ask:</span> ₹{parseInt(pitch.fundingAsk).toLocaleString()}
//               </div>
//               {pitch.fundingUse && (
//                 <div>
//                   <span className="font-medium">Use of Funds:</span> {pitch.fundingUse}
//                 </div>
//               )}
//               {pitch.equityOffered && (
//                 <div>
//                   <span className="font-medium">Equity Offered:</span> {pitch.equityOffered}%
//                 </div>
//               )}
//               {pitch.valuation && (
//                 <div>
//                   <span className="font-medium">Valuation:</span> ₹{parseInt(pitch.valuation).toLocaleString()}
//                 </div>
//               )}
//               {pitch.previousFunding && (
//                 <div>
//                   <span className="font-medium">Previous Funding:</span> {pitch.previousFunding}
//                 </div>
//               )}
//               {pitch.burnRate && (
//                 <div>
//                   <span className="font-medium">Monthly Burn Rate:</span> ₹{parseInt(pitch.burnRate).toLocaleString()}
//                 </div>
//               )}
//               {pitch.runway && (
//                 <div>
//                   <span className="font-medium">Current Runway:</span> {pitch.runway} months
//                 </div>
//               )}
//               {pitch.breakEvenTimeline && (
//                 <div>
//                   <span className="font-medium">Break-even Timeline:</span> {pitch.breakEvenTimeline}
//                 </div>
//               )}
//               {pitch.projectedRevenue && (
//                 <div>
//                   <span className="font-medium">Revenue Projections:</span> {pitch.projectedRevenue}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Risks & Challenges */}
//           {(pitch.risks || pitch.challenges || pitch.mitigation) && (
//             <div>
//               <h3 className="font-medium mb-3">Risks & Mitigation</h3>
//               <div className="space-y-4 text-sm text-gray-600">
//                 {pitch.risks && (
//                   <div>
//                     <span className="font-medium">Key Risks:</span> {pitch.risks}
//                   </div>
//                 )}
//                 {pitch.challenges && (
//                   <div>
//                     <span className="font-medium">Current Challenges:</span> {pitch.challenges}
//                   </div>
//                 )}
//                 {pitch.mitigation && (
//                   <div>
//                     <span className="font-medium">Risk Mitigation:</span> {pitch.mitigation}
//                   </div>
//                 )}
//                 {pitch.regulatoryConsiderations && (
//                   <div>
//                     <span className="font-medium">Regulatory Considerations:</span> {pitch.regulatoryConsiderations}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Future Vision */}
//           {(pitch.futureVision || pitch.roadmap || pitch.exitStrategy) && (
//             <div>
//               <h3 className="font-medium mb-3">Future Vision</h3>
//               <div className="space-y-4 text-sm text-gray-600">
//                 {pitch.futureVision && (
//                   <div>
//                     <span className="font-medium">Vision:</span> {pitch.futureVision}
//                   </div>
//                 )}
//                 {pitch.roadmap && (
//                   <div>
//                     <span className="font-medium">12-Month Roadmap:</span> {pitch.roadmap}
//                   </div>
//                 )}
//                 {pitch.longTermGoals && (
//                   <div>
//                     <span className="font-medium">Long-term Goals:</span> {pitch.longTermGoals}
//                   </div>
//                 )}
//                 {pitch.exitStrategy && (
//                   <div>
//                     <span className="font-medium">Exit Strategy:</span> {pitch.exitStrategy}
//                   </div>
//                 )}
//                 {pitch.socialImpact && (
//                   <div>
//                     <span className="font-medium">Social Impact:</span> {pitch.socialImpact}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Additional Information */}
//           {(pitch.awards || pitch.media || pitch.testimonials) && (
//             <div>
//               <h3 className="font-medium mb-3">Recognition & Media</h3>
//               <div className="space-y-4 text-sm text-gray-600">
//                 {pitch.awards && (
//                   <div>
//                     <span className="font-medium">Awards & Recognition:</span> {pitch.awards}
//                   </div>
//                 )}
//                 {pitch.media && (
//                   <div>
//                     <span className="font-medium">Media Coverage:</span> {pitch.media}
//                   </div>
//                 )}
//                 {pitch.testimonials && (
//                   <div>
//                     <span className="font-medium">Customer Testimonials:</span> {pitch.testimonials}
//                   </div>
//                 )}
//                 {pitch.certifications && (
//                   <div>
//                     <span className="font-medium">Certifications:</span> {pitch.certifications}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Contact & Links */}
//         <div className="pt-6 border-t border-gray-100 space-y-4">
//           <div className="flex items-center justify-between text-sm">
//             <div>
//               <div className="font-medium">{pitch.founderName}</div>
//               <div className="text-gray-500">{pitch.founderEmail}</div>
//               {pitch.founderPhone && (
//                 <div className="text-gray-500">{pitch.founderPhone}</div>
//               )}
//               {pitch.founderLinkedIn && (
//                 <a href={pitch.founderLinkedIn} className="text-blue-600 hover:text-blue-700">LinkedIn</a>
//               )}
//             </div>
//             <div className="flex items-center gap-4">
//               {pitch.website && (
//                 <a
//                   href={pitch.website}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
//                 >
//                   <Globe size={14} />
//                   Website
//                 </a>
//               )}
//             </div>
//           </div>

//           {/* Additional Links */}
//           {(pitch.demoLink || pitch.pitchDeck || pitch.socialMedia) && (
//             <div className="flex flex-wrap gap-4 text-xs text-gray-500">
//               {pitch.demoLink && (
//                 <a href={pitch.demoLink} className="hover:text-gray-700">Demo</a>
//               )}
//               {pitch.pitchDeck && (
//                 <a href={pitch.pitchDeck} className="hover:text-gray-700">Pitch Deck</a>
//               )}
//               {pitch.socialMedia && (
//                 <a href={pitch.socialMedia} className="hover:text-gray-700">Social Media</a>
//               )}
//             </div>
//           )}

//           {/* Submission Info */}
//           {(pitch.submissionDate || pitch.lastUpdated) && (
//             <div className="text-xs text-gray-400 pt-2 border-t border-gray-50">
//               {pitch.submissionDate && (
//                 <div>Submitted: {new Date(pitch.submissionDate).toLocaleDateString()}</div>
//               )}
//               {pitch.lastUpdated && (
//                 <div>Last Updated: {new Date(pitch.lastUpdated).toLocaleDateString()}</div>
//               )}
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default PitchOne;

import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import useThemeStore from "./store/themeStore";
import { ArrowLeft, Mail, Heart, Globe, Sparkles, Loader2 } from "lucide-react";
import api from "./utils/api2";

const PitchOne = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dark = useThemeStore((s) => s.dark);
  const [pitchs, setPitch] = useState(null);
  const [upvotes, setUpvotes] = useState(0);
  const [isUpvoted, setIsUpvoted] = useState(false);

  // Summarization states
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSummary, setShowSummary] = useState(false);

  const location = useLocation();
  const pitch = location.state;

  useEffect(() => {
    setPitch(pitch);
    setUpvotes(pitch.upvotes || 0);
  }, [id, pitch]);

  const handleUpvote = () => {
    if (isUpvoted) {
      setUpvotes(upvotes - 1);
      setIsUpvoted(false);
    } else {
      setUpvotes(upvotes + 1);
      setIsUpvoted(true);
    }
  };

  const handleSummarize = async () => {
    setIsLoading(true);
    setError("");
    setSummary("");

    try {
      // Construct comprehensive pitch data for summarization
      const pitchData = {
        startupName: pitch.startupName,
        oneLiner: pitch.oneLiner,
        targetMarket: pitch.targetMarket,
        businessModel: pitch.businessModel,
        problem: pitch.problem,
        solution: pitch.solution,
        traction: pitch.traction,
        competition: pitch.competition,
        team: pitch.team,
        goToMarketStrategy: pitch.goToMarketStrategy,
        fundingAsk: pitch.fundingAsk,
        fundingUse: pitch.fundingUse,
        founderName: pitch.founderName,
        // Add any additional fields you have
        executiveSummary: pitch.executiveSummary,
        marketSize: pitch.marketSize,
        revenueModel: pitch.revenueModel,
        futureVision: pitch.futureVision,
        risks: pitch.risks,
        revenue: pitch.revenue,
        valuation: pitch.valuation,
      };

      // Call your backend API endpoint
      const response = await api.post("/summarize-pitch", { pitchData });

      const data = response.data;
      console.log(data);
      setSummary(data.summary);
      setShowSummary(true);
    } catch (err) {
      setError(err.message || "Failed to generate summary");
    } finally {
      setIsLoading(false);
    }
  };

  if (!pitch) {
    return (
      <div className="p-8">
        <div className="text-gray-500">Pitch not found</div>
      </div>
    );
  }

  return (
    <div
      className={
        dark
          ? "bg-black text-white min-h-screen"
          : "bg-white text-black min-h-screen"
      }
    >
      <div className="lg:max-w-3xl mx-auto p-6 space-y-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm"
        >
          <ArrowLeft size={14} />
          Back
        </button>

        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-2xl font-medium">{pitch.startupName}</h1>
          <p className="text-gray-600">{pitch.oneLiner}</p>

          <div className="flex items-center justify-between">
            <div className="text-xl text-green-600 font-medium">
              ₹{parseInt(pitch.fundingAsk).toLocaleString()}
            </div>
            <div className="flex items-center gap-4 text-sm">
              <button
                onClick={handleUpvote}
                className={`flex items-center gap-1 ${
                  isUpvoted
                    ? "text-red-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Heart size={14} className={isUpvoted ? "fill-current" : ""} />
                {upvotes}
              </button>
              <a
                href={`mailto:${pitch.founderEmail}`}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
              >
                <Mail size={14} />
                Contact
              </a>
            </div>
          </div>

          {/* AI Summarize Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleSummarize}
              disabled={isLoading}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isLoading
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : dark
                  ? "bg-purple-900 text-purple-200 hover:bg-purple-800"
                  : "bg-purple-100 text-purple-700 hover:bg-purple-200"
              }`}
            >
              {isLoading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Sparkles size={14} />
              )}
              {isLoading ? "Summarizing..." : "Summary"}
            </button>

            {showSummary && (
              <button
                onClick={() => setShowSummary(!showSummary)}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                {showSummary ? "Hide" : "Show"} Summary
              </button>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* AI Summary Display */}
          {showSummary && summary && (
            <div
              className={`p-4 rounded-lg border-l-4 border-purple-500 ${
                dark ? "bg-slate-300" : "bg-white"
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-blue-500" />
                <span className="text-sm font-medium text-blue-500">
                  Summary
                </span>
              </div>
              <div className="text-sm leading-relaxed space-y-3">
                {summary.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-gray-700 dark:text-gray-800">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Rest of your existing content sections... */}
        <div className="space-y-6">
          {/* Market */}
          <div>
            <h3 className="font-medium mb-2">Market & Business</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div>
                <span className="font-medium">Target Market:</span>{" "}
                {pitch.targetMarket}
              </div>
              <div>
                <span className="font-medium">Business Model:</span>{" "}
                {pitch.businessModel}
              </div>
            </div>
          </div>

          {/* Problem & Solution */}
          {pitch.problem && (
            <div>
              <h3 className="font-medium mb-2">Problem & Solution</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Problem:</span> {pitch.problem}
                </div>
                <div>
                  <span className="font-medium">Solution:</span>{" "}
                  {pitch.solution}
                </div>
              </div>
            </div>
          )}

          {/* Performance */}
          <div>
            <h3 className="font-medium mb-2">Performance</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div>
                <span className="font-medium">Traction:</span>{" "}
                {pitch.traction || "Not provided"}
              </div>
              <div>
                <span className="font-medium">Competition:</span>{" "}
                {pitch.competition || "None"}
              </div>
            </div>
          </div>

          {/* Team & Strategy */}
          {(pitch.team || pitch.goToMarketStrategy) && (
            <div>
              <h3 className="font-medium mb-2">Team & Strategy</h3>
              <div className="space-y-3 text-sm text-gray-600">
                {pitch.team && (
                  <div>
                    <span className="font-medium">Team:</span> {pitch.team}
                  </div>
                )}
                {pitch.goToMarketStrategy && (
                  <div>
                    <span className="font-medium">Strategy:</span>{" "}
                    {pitch.goToMarketStrategy}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Funding */}
          {pitch.fundingUse && (
            <div>
              <h3 className="font-medium mb-2">Use of Funds</h3>
              <p className="text-sm text-gray-600">{pitch.fundingUse}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-gray-100 flex items-center justify-between text-sm">
          <div>
            <div className="font-medium">{pitch.founderName}</div>
            <div className="text-gray-500">{pitch.founderEmail}</div>
          </div>
          {pitch.website && (
            <a
              href={pitch.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
            >
              <Globe size={14} />
              Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PitchOne;
