// import { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import useThemeStore from "./store/themeStore";
// import { ArrowLeft, Mail, Heart, Globe, Sparkles, Loader2 } from "lucide-react";
// import api from "./utils/api2";

// const PitchOne = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dark = useThemeStore((s) => s.dark);
//   const [pitchs, setPitch] = useState(null);
//   const [upvotes, setUpvotes] = useState(0);
//   const [isUpvoted, setIsUpvoted] = useState(false);

//   // Summarization states
//   const [summary, setSummary] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showSummary, setShowSummary] = useState(false);

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

//   const handleSummarize = async () => {
//     setIsLoading(true);
//     setError("");
//     setSummary("");

//     try {
//       // Construct comprehensive pitch data for summarization
//       const pitchData = {
//         startupName: pitch.startupName,
//         oneLiner: pitch.oneLiner,
//         targetMarket: pitch.targetMarket,
//         businessModel: pitch.businessModel,
//         problem: pitch.problem,
//         solution: pitch.solution,
//         traction: pitch.traction,
//         competition: pitch.competition,
//         team: pitch.team,
//         goToMarketStrategy: pitch.goToMarketStrategy,
//         fundingAsk: pitch.fundingAsk,
//         fundingUse: pitch.fundingUse,
//         founderName: pitch.founderName,
//         // Add any additional fields you have
//         executiveSummary: pitch.executiveSummary,
//         marketSize: pitch.marketSize,
//         revenueModel: pitch.revenueModel,
//         futureVision: pitch.futureVision,
//         risks: pitch.risks,
//         revenue: pitch.revenue,
//         valuation: pitch.valuation,
//       };

//       // Call your backend API endpoint
//       const response = await api.post("/summarize-pitch", { pitchData });

//       const data = response.data;
//       console.log(data);
//       setSummary(data.summary);
//       setShowSummary(true);
//     } catch (err) {
//       setError(err.message || "Failed to generate summary");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!pitch) {
//     return (
//       <div
//         className={`p-8 ${
//           dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
//         }`}
//       >
//         <div className={dark ? "text-gray-400" : "text-gray-500"}>
//           Pitch not found
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={
//         dark
//           ? "bg-gray-900 text-white min-h-screen"
//           : "bg-gray-50 text-gray-900 min-h-screen"
//       }
//     >
//       <div className="lg:max-w-3xl mx-auto p-6 space-y-8">
//         {/* Back */}
//         <button
//           onClick={() => navigate(-1)}
//           className={`flex items-center gap-2 text-sm transition-colors ${
//             dark
//               ? "text-gray-400 hover:text-gray-200"
//               : "text-gray-500 hover:text-gray-700"
//           }`}
//         >
//           <ArrowLeft size={14} />
//           Back
//         </button>

//         {/* Header */}
//         <div className="space-y-4">
//           <h1
//             className={`text-2xl font-medium ${
//               dark ? "text-white" : "text-gray-900"
//             }`}
//           >
//             {pitch.startupName}
//           </h1>
//           <p className={dark ? "text-gray-300" : "text-gray-600"}>
//             {pitch.oneLiner}
//           </p>

//           <div className="flex items-center justify-between">
//             <div className="text-xl text-green-600 font-medium">
//               ₹{parseInt(pitch.fundingAsk).toLocaleString()}
//             </div>
//             <div className="flex items-center gap-4 text-sm">
//               <button
//                 onClick={handleUpvote}
//                 className={`flex items-center gap-1 transition-colors ${
//                   isUpvoted
//                     ? "text-red-500"
//                     : dark
//                     ? "text-gray-400 hover:text-gray-200"
//                     : "text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 <Heart size={14} className={isUpvoted ? "fill-current" : ""} />
//                 {upvotes}
//               </button>
//               <a
//                 href={`mailto:${pitch.founderEmail}`}
//                 className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
//               >
//                 <Mail size={14} />
//                 Contact
//               </a>
//             </div>
//           </div>

//           {/* AI Summarize Button */}
//           <div className="flex items-center gap-4">
//             <button
//               onClick={handleSummarize}
//               disabled={isLoading}
//               className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                 isLoading
//                   ? dark
//                     ? "bg-gray-700 text-gray-500 cursor-not-allowed"
//                     : "bg-gray-200 text-gray-500 cursor-not-allowed"
//                   : dark
//                   ? "bg-purple-900 text-purple-200 hover:bg-purple-800"
//                   : "bg-purple-100 text-purple-700 hover:bg-purple-200"
//               }`}
//             >
//               {isLoading ? (
//                 <Loader2 size={14} className="animate-spin" />
//               ) : (
//                 <Sparkles size={14} />
//               )}
//               {isLoading ? "Summarizing..." : "Summary"}
//             </button>

//             {showSummary && (
//               <button
//                 onClick={() => setShowSummary(!showSummary)}
//                 className={`text-xs transition-colors ${
//                   dark
//                     ? "text-gray-400 hover:text-gray-200"
//                     : "text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 {showSummary ? "Hide" : "Show"} Summary
//               </button>
//             )}
//           </div>

//           {/* Error Display */}
//           {error && (
//             <div
//               className={`text-sm text-red-500 p-3 rounded-lg ${
//                 dark ? "bg-red-900/20" : "bg-red-50"
//               }`}
//             >
//               {error}
//             </div>
//           )}

//           {/* AI Summary Display */}
//           {showSummary && summary && (
//             <div
//               className={`p-4 rounded-lg border-l-4 border-purple-500 ${
//                 dark ? "bg-gray-800" : "bg-white"
//               }`}
//             >
//               <div className="flex items-center gap-2 mb-3">
//                 <Sparkles size={16} className="text-purple-500" />
//                 <span className="text-sm font-medium text-purple-500">
//                   AI Summary
//                 </span>
//               </div>
//               <div
//                 className={`text-sm leading-relaxed space-y-3 ${
//                   dark ? "text-gray-300" : "text-gray-700"
//                 }`}
//               >
//                 {summary.split("\n\n").map((paragraph, index) => (
//                   <p key={index}>{paragraph.trim()}</p>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Rest of your existing content sections... */}
//         <div className="space-y-6">
//           {/* Market */}
//           <div>
//             <h3
//               className={`font-medium mb-2 ${
//                 dark ? "text-white" : "text-gray-900"
//               }`}
//             >
//               Market & Business
//             </h3>
//             <div
//               className={`space-y-3 text-sm ${
//                 dark ? "text-gray-300" : "text-gray-600"
//               }`}
//             >
//               <div>
//                 <span className="font-medium">Target Market:</span>{" "}
//                 {pitch.targetMarket}
//               </div>
//               <div>
//                 <span className="font-medium">Business Model:</span>{" "}
//                 {pitch.businessModel}
//               </div>
//             </div>
//           </div>

//           {/* Problem & Solution */}
//           {pitch.problem && (
//             <div>
//               <h3
//                 className={`font-medium mb-2 ${
//                   dark ? "text-white" : "text-gray-900"
//                 }`}
//               >
//                 Problem & Solution
//               </h3>
//               <div
//                 className={`space-y-3 text-sm ${
//                   dark ? "text-gray-300" : "text-gray-600"
//                 }`}
//               >
//                 <div>
//                   <span className="font-medium">Problem:</span> {pitch.problem}
//                 </div>
//                 <div>
//                   <span className="font-medium">Solution:</span>{" "}
//                   {pitch.solution}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Performance */}
//           <div>
//             <h3
//               className={`font-medium mb-2 ${
//                 dark ? "text-white" : "text-gray-900"
//               }`}
//             >
//               Performance
//             </h3>
//             <div
//               className={`space-y-3 text-sm ${
//                 dark ? "text-gray-300" : "text-gray-600"
//               }`}
//             >
//               <div>
//                 <span className="font-medium">Traction:</span>{" "}
//                 {pitch.traction || "Not provided"}
//               </div>
//               <div>
//                 <span className="font-medium">Competition:</span>{" "}
//                 {pitch.competition || "None"}
//               </div>
//             </div>
//           </div>

//           {/* Team & Strategy */}
//           {(pitch.team || pitch.goToMarketStrategy) && (
//             <div>
//               <h3
//                 className={`font-medium mb-2 ${
//                   dark ? "text-white" : "text-gray-900"
//                 }`}
//               >
//                 Team & Strategy
//               </h3>
//               <div
//                 className={`space-y-3 text-sm ${
//                   dark ? "text-gray-300" : "text-gray-600"
//                 }`}
//               >
//                 {pitch.team && (
//                   <div>
//                     <span className="font-medium">Team:</span> {pitch.team}
//                   </div>
//                 )}
//                 {pitch.goToMarketStrategy && (
//                   <div>
//                     <span className="font-medium">Strategy:</span>{" "}
//                     {pitch.goToMarketStrategy}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Funding */}
//           {pitch.fundingUse && (
//             <div>
//               <h3
//                 className={`font-medium mb-2 ${
//                   dark ? "text-white" : "text-gray-900"
//                 }`}
//               >
//                 Use of Funds
//               </h3>
//               <p
//                 className={`text-sm ${
//                   dark ? "text-gray-300" : "text-gray-600"
//                 }`}
//               >
//                 {pitch.fundingUse}
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div
//           className={`pt-6 border-t flex items-center justify-between text-sm ${
//             dark ? "border-gray-700" : "border-gray-100"
//           }`}
//         >
//           <div>
//             <div
//               className={`font-medium ${dark ? "text-white" : "text-gray-900"}`}
//             >
//               {pitch.founderName}
//             </div>
//             <div className={dark ? "text-gray-400" : "text-gray-500"}>
//               {pitch.founderEmail}
//             </div>
//           </div>
//           {pitch.website && (
//             <a
//               href={pitch.website}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
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

import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import useThemeStore from "./store/themeStore";
import { ArrowLeft, Mail, Heart, Globe, Sparkles, Loader2 } from "lucide-react";
import api from "./utils/api2";

const PitchOne = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dark = useThemeStore((s) => s.dark);

  const pitch = location.state;
  const [upvotes, setUpvotes] = useState(0);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (pitch) setUpvotes(pitch.upvotes || 0);
  }, [pitch]);

  const handleUpvote = () => {
    setIsUpvoted((prev) => !prev);
    setUpvotes((prev) => (isUpvoted ? prev - 1 : prev + 1));
  };

  const handleSummarize = async () => {
    if (summary) {
      setShowSummary(!showSummary);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await api.post("/summarize-pitch", {
        pitchData: {
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
          executiveSummary: pitch.executiveSummary,
          marketSize: pitch.marketSize,
          revenueModel: pitch.revenueModel,
          futureVision: pitch.futureVision,
          risks: pitch.risks,
          revenue: pitch.revenue,
          valuation: pitch.valuation,
        },
      });
      setSummary(response.data.summary);
      setShowSummary(true);
    } catch (err) {
      setError(err.message || "Failed to generate summary");
    } finally {
      setIsLoading(false);
    }
  };

  if (!pitch) {
    return (
      <div className={`min-h-screen ${dark ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="max-w-4xl mx-auto pt-20 px-6">
          <div
            className={`text-center ${
              dark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <p className="text-lg mb-4">Pitch not found</p>
            <button
              onClick={() => navigate(-1)}
              className="text-blue-600 hover:text-blue-700"
            >
              ← Return to listings
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:w-3xl w-full lg:max-h-screen scrollbar-hidden mb-10 overflow-y-scroll">
      {/* Navigation */}
      <button
        onClick={() => navigate(-1)}
        className={`mb-2 text-sm font-medium ${
          dark
            ? "text-gray-400 hover:text-gray-200"
            : "text-gray-600 hover:text-gray-900"
        } transition-colors`}
      >
        <ArrowLeft size={16} className="inline mr-2" />
        Back
      </button>

      {/* Main Content */}
      <article
        className={`${dark ? "bg-gray-800" : "bg-white"} border ${
          dark ? "border-gray-700" : "border-gray-200"
        } overflow-hidden`}
      >
        {/* Header */}
        <header className="lg:px-8 px-2 lg:py-10 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <h1
              className={`text-3xl font-light mb-3 ${
                dark ? "text-white" : "text-gray-900"
              }`}
            >
              {pitch.startupName}
            </h1>
            <p
              className={`text-lg leading-relaxed ${
                dark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {pitch.oneLiner}
            </p>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="text-2xl font-light text-emerald-600">
              ₹{parseInt(pitch.fundingAsk).toLocaleString("en-IN")}
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleUpvote}
                className={`flex items-center space-x-1 px-3 py-1 text-sm font-medium transition-colors ${
                  isUpvoted
                    ? "text-rose-600"
                    : dark
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Heart size={14} className={isUpvoted ? "fill-current" : ""} />
                <span>{upvotes}</span>
              </button>
              <a
                href={`mailto:${pitch.founderEmail}`}
                className="flex items-center space-x-1 px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Mail size={14} />
                <span>Contact</span>
              </a>
            </div>
          </div>

          {/* AI Summary Toggle */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSummarize}
                disabled={isLoading}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium border transition-colors ${
                  isLoading
                    ? dark
                      ? "bg-gray-700 text-gray-500 border-gray-600"
                      : "bg-gray-100 text-gray-500 border-gray-300"
                    : dark
                    ? "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {isLoading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Sparkles size={14} />
                )}
                <span>
                  {isLoading
                    ? "Generating..."
                    : summary
                    ? showSummary
                      ? "Hide Summary"
                      : "Show Summary"
                    : "Generate Summary"}
                </span>
              </button>
            </div>

            {error && (
              <div
                className={`p-3 text-sm border-l-4 border-red-500 ${
                  dark ? "bg-red-900/10 text-red-400" : "bg-red-50 text-red-700"
                }`}
              >
                {error}
              </div>
            )}

            {showSummary && summary && (
              <div
                className={`p-6 border-l-4 border-violet-500 ${
                  dark ? "bg-gray-800/50" : "bg-violet-50"
                }`}
              >
                <div className="flex items-center space-x-2 mb-3">
                  <Sparkles size={16} className="text-violet-600" />
                  <span className="text-sm font-medium text-violet-600">
                    Executive Summary
                  </span>
                </div>
                <div
                  className={`prose prose-sm ${
                    dark ? "prose-invert text-gray-300" : "text-gray-700"
                  }`}
                >
                  {summary.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="mb-3 last:mb-0">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Content Sections */}
        <div className="lg:px-8 px-2 lg:py-10 py-3 space-y-8">
          {/* Business Overview */}
          <section>
            <h2
              className={`text-lg font-medium mb-4 ${
                dark ? "text-white" : "text-gray-900"
              }`}
            >
              Business Overview
            </h2>
            <dl className="grid md:grid-cols-2 gap-6">
              <div>
                <dt
                  className={`text-sm font-medium mb-1 ${
                    dark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Target Market
                </dt>
                <dd className={`${dark ? "text-gray-200" : "text-gray-900"}`}>
                  {pitch.targetMarket}
                </dd>
              </div>
              <div>
                <dt
                  className={`text-sm font-medium mb-1 ${
                    dark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Business Model
                </dt>
                <dd className={`${dark ? "text-gray-200" : "text-gray-900"}`}>
                  {pitch.businessModel}
                </dd>
              </div>
            </dl>
          </section>

          {/* Problem & Solution */}
          {pitch.problem && (
            <section>
              <h2
                className={`text-lg font-medium mb-4 ${
                  dark ? "text-white" : "text-gray-900"
                }`}
              >
                Problem & Solution
              </h2>
              <dl className="space-y-4">
                <div>
                  <dt
                    className={`text-sm font-medium mb-1 ${
                      dark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Problem Statement
                  </dt>
                  <dd
                    className={`leading-relaxed ${
                      dark ? "text-gray-200" : "text-gray-900"
                    }`}
                  >
                    {pitch.problem}
                  </dd>
                </div>
                <div>
                  <dt
                    className={`text-sm font-medium mb-1 ${
                      dark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Solution
                  </dt>
                  <dd
                    className={`leading-relaxed ${
                      dark ? "text-gray-200" : "text-gray-900"
                    }`}
                  >
                    {pitch.solution}
                  </dd>
                </div>
              </dl>
            </section>
          )}

          {/* Market Performance */}
          <section>
            <h2
              className={`text-lg font-medium mb-4 ${
                dark ? "text-white" : "text-gray-900"
              }`}
            >
              Market Performance
            </h2>
            <dl className="grid md:grid-cols-2 gap-6">
              <div>
                <dt
                  className={`text-sm font-medium mb-1 ${
                    dark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Current Traction
                </dt>
                <dd className={`${dark ? "text-gray-200" : "text-gray-900"}`}>
                  {pitch.traction || "Early stage"}
                </dd>
              </div>
              <div>
                <dt
                  className={`text-sm font-medium mb-1 ${
                    dark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Competition Analysis
                </dt>
                <dd className={`${dark ? "text-gray-200" : "text-gray-900"}`}>
                  {pitch.competition || "No direct competitors identified"}
                </dd>
              </div>
            </dl>
          </section>

          {/* Team & Strategy */}
          {(pitch.team || pitch.goToMarketStrategy) && (
            <section>
              <h2
                className={`text-lg font-medium mb-4 ${
                  dark ? "text-white" : "text-gray-900"
                }`}
              >
                Team & Strategy
              </h2>
              <dl className="space-y-4">
                {pitch.team && (
                  <div>
                    <dt
                      className={`text-sm font-medium mb-1 ${
                        dark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Team
                    </dt>
                    <dd
                      className={`leading-relaxed ${
                        dark ? "text-gray-200" : "text-gray-900"
                      }`}
                    >
                      {pitch.team}
                    </dd>
                  </div>
                )}
                {pitch.goToMarketStrategy && (
                  <div>
                    <dt
                      className={`text-sm font-medium mb-1 ${
                        dark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Go-to-Market Strategy
                    </dt>
                    <dd
                      className={`leading-relaxed ${
                        dark ? "text-gray-200" : "text-gray-900"
                      }`}
                    >
                      {pitch.goToMarketStrategy}
                    </dd>
                  </div>
                )}
              </dl>
            </section>
          )}

          {/* Funding */}
          {pitch.fundingUse && (
            <section>
              <h2
                className={`text-lg font-medium mb-4 ${
                  dark ? "text-white" : "text-gray-900"
                }`}
              >
                Capital Allocation
              </h2>
              <p
                className={`leading-relaxed ${
                  dark ? "text-gray-200" : "text-gray-900"
                }`}
              >
                {pitch.fundingUse}
              </p>
            </section>
          )}
        </div>

        {/* Footer */}
        <footer
          className={`px-8 py-6 border-t ${
            dark
              ? "border-gray-700 bg-gray-800/50"
              : "border-gray-200 bg-gray-50"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <div
                className={`font-medium ${
                  dark ? "text-white" : "text-gray-900"
                }`}
              >
                {pitch.founderName}
              </div>
              <div
                className={`text-sm ${
                  dark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {pitch.founderEmail}
              </div>
            </div>
            {pitch.website && (
              <a
                href={pitch.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Globe size={14} />
                <span>Company Website</span>
              </a>
            )}
          </div>
        </footer>
      </article>
    </div>
  );
};

export default PitchOne;
