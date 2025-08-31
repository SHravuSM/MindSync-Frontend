// import { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import useThemeStore from "./store/themeStore";
// import { ArrowLeft, Mail, Heart, Globe, Sparkles, Loader2 } from "lucide-react";
// import api from "./utils/api2";

// const PitchOne = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dark = useThemeStore((s) => s.dark);

//   const pitch = location.state;
//   const [upvotes, setUpvotes] = useState(0);
//   const [isUpvoted, setIsUpvoted] = useState(false);
//   const [summary, setSummary] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showSummary, setShowSummary] = useState(false);

//   useEffect(() => {
//     if (pitch) setUpvotes(pitch.upvotes || 0);
//   }, [pitch]);

//   const handleUpvote = () => {
//     setIsUpvoted((prev) => !prev);
//     setUpvotes((prev) => (isUpvoted ? prev - 1 : prev + 1));
//   };

//   const handleSummarize = async () => {
//     if (summary) {
//       setShowSummary(!showSummary);
//       return;
//     }

//     setIsLoading(true);
//     setError("");

//     try {
//       const response = await api.post("/summarize-pitch", {
//         pitchData: {
//           startupName: pitch.startupName,
//           oneLiner: pitch.oneLiner,
//           targetMarket: pitch.targetMarket,
//           businessModel: pitch.businessModel,
//           problem: pitch.problem,
//           solution: pitch.solution,
//           traction: pitch.traction,
//           competition: pitch.competition,
//           team: pitch.team,
//           goToMarketStrategy: pitch.goToMarketStrategy,
//           fundingAsk: pitch.fundingAsk,
//           fundingUse: pitch.fundingUse,
//           founderName: pitch.founderName,
//           executiveSummary: pitch.executiveSummary,
//           marketSize: pitch.marketSize,
//           revenueModel: pitch.revenueModel,
//           futureVision: pitch.futureVision,
//           risks: pitch.risks,
//           revenue: pitch.revenue,
//           valuation: pitch.valuation,
//         },
//       });
//       setSummary(response.data.summary);
//       setShowSummary(true);
//     } catch (err) {
//       setError(err.message || "Failed to generate summary");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!pitch) {
//     return (
//       <div className={`min-h-screen ${dark ? "bg-gray-900" : "bg-gray-50"}`}>
//         <div className="max-w-4xl mx-auto pt-20 px-6">
//           <div
//             className={`text-center ${
//               dark ? "text-gray-400" : "text-gray-600"
//             }`}
//           >
//             <p className="text-lg mb-4">Pitch not found</p>
//             <button
//               onClick={() => navigate(-1)}
//               className="text-blue-600 hover:text-blue-700"
//             >
//               ← Return to listings
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="lg:w-3xl w-full lg:max-h-screen scrollbar-hidden mb-10 overflow-y-scroll">
//       {/* Navigation */}
//       <button
//         onClick={() => navigate(-1)}
//         className={`mb-2 text-sm pl-2 font-medium ${
//           dark
//             ? "text-gray-400 hover:text-gray-200"
//             : "text-gray-600 hover:text-gray-900"
//         } transition-colors`}
//       >
//         <ArrowLeft size={16} className="inline mr-2" />
//         Back
//       </button>

//       {/* Main Content */}
//       <article
//         className={`${dark ? "bg-gray-800" : "bg-white"} border ${
//           dark ? "border-gray-700" : "border-gray-200"
//         } overflow-hidden`}
//       >
//         {/* Header */}
//         <header className="lg:px-8 px-4 lg:py-10 py-3 border-b border-gray-200 dark:border-gray-700">
//           <div className="mb-6">
//             <h1
//               className={`text-3xl font-light mb-3 ${
//                 dark ? "text-white" : "text-gray-900"
//               }`}
//             >
//               {pitch.startupName}
//             </h1>
//             <p
//               className={`text-lg leading-relaxed ${
//                 dark ? "text-gray-300" : "text-gray-700"
//               }`}
//             >
//               {pitch.oneLiner}
//             </p>
//           </div>

//           <div className="flex items-center justify-between mb-6">
//             <div className="text-2xl font-light text-emerald-600">
//               ₹{parseInt(pitch.fundingAsk).toLocaleString("en-IN")}
//             </div>
//             <div className="flex items-center space-x-4">
//               {/* <button
//                 onClick={handleUpvote}
//                 className={`flex items-center space-x-1 px-3 py-1 text-sm font-medium transition-colors ${
//                   isUpvoted
//                     ? "text-rose-600"
//                     : dark
//                     ? "text-gray-400 hover:text-gray-200"
//                     : "text-gray-600 hover:text-gray-900"
//                 }`}
//               >
//                 <Heart size={14} className={isUpvoted ? "fill-current" : ""} />
//                 <span>{upvotes}</span>
//               </button> */}
//               <a
//                 href={`mailto:${pitch.founderEmail}`}
//                 className="flex items-center space-x-1 px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
//               >
//                 <Mail size={14} />
//                 <span>Contact</span>
//               </a>
//             </div>
//           </div>

//           {/* AI Summary Toggle */}
//           <div className="space-y-4">
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={handleSummarize}
//                 disabled={isLoading}
//                 className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium border transition-colors ${
//                   isLoading
//                     ? dark
//                       ? "bg-gray-700 text-gray-500 border-gray-600"
//                       : "bg-gray-100 text-gray-500 border-gray-300"
//                     : dark
//                     ? "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
//                     : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
//                 }`}
//               >
//                 {isLoading ? (
//                   <Loader2 size={14} className="animate-spin" />
//                 ) : (
//                   <Sparkles size={14} />
//                 )}
//                 <span>
//                   {isLoading
//                     ? "Generating..."
//                     : summary
//                     ? showSummary
//                       ? "Hide Summary"
//                       : "Show Summary"
//                     : "Generate Summary"}
//                 </span>
//               </button>
//             </div>

//             {error && (
//               <div
//                 className={`p-3 text-sm border-l-4 border-red-500 ${
//                   dark ? "bg-red-900/10 text-red-400" : "bg-red-50 text-red-700"
//                 }`}
//               >
//                 {error}
//               </div>
//             )}

//             {showSummary && summary && (
//               <div
//                 className={`p-6 border-l-4 border-violet-500 ${
//                   dark ? "bg-gray-800/50" : "bg-violet-50"
//                 }`}
//               >
//                 <div className="flex items-center space-x-2 mb-3">
//                   <Sparkles size={16} className="text-violet-600" />
//                   <span className="text-sm font-medium text-violet-600">
//                     Executive Summary
//                   </span>
//                 </div>
//                 <div
//                   className={`prose prose-sm ${
//                     dark ? "prose-invert text-gray-300" : "text-gray-700"
//                   }`}
//                 >
//                   {summary.split("\n\n").map((paragraph, index) => (
//                     <p key={index} className="mb-3 last:mb-0">
//                       {paragraph.trim()}
//                     </p>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </header>

//         {/* Content Sections */}
//         <div className="lg:px-8 px-2 lg:py-10 py-3 space-y-8">
//           {/* Business Overview */}
//           <section>
//             <h2
//               className={`text-lg font-medium mb-4 ${
//                 dark ? "text-white" : "text-gray-900"
//               }`}
//             >
//               Business Overview
//             </h2>
//             <dl className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <dt
//                   className={`text-sm font-medium mb-1 ${
//                     dark ? "text-gray-400" : "text-gray-600"
//                   }`}
//                 >
//                   Target Market
//                 </dt>
//                 <dd className={`${dark ? "text-gray-200" : "text-gray-900"}`}>
//                   {pitch.targetMarket}
//                 </dd>
//               </div>
//               <div>
//                 <dt
//                   className={`text-sm font-medium mb-1 ${
//                     dark ? "text-gray-400" : "text-gray-600"
//                   }`}
//                 >
//                   Business Model
//                 </dt>
//                 <dd className={`${dark ? "text-gray-200" : "text-gray-900"}`}>
//                   {pitch.businessModel}
//                 </dd>
//               </div>
//             </dl>
//           </section>

//           {/* Problem & Solution */}
//           {pitch.problem && (
//             <section>
//               <h2
//                 className={`text-lg font-medium mb-4 ${
//                   dark ? "text-white" : "text-gray-900"
//                 }`}
//               >
//                 Problem & Solution
//               </h2>
//               <dl className="space-y-4">
//                 <div>
//                   <dt
//                     className={`text-sm font-medium mb-1 ${
//                       dark ? "text-gray-400" : "text-gray-600"
//                     }`}
//                   >
//                     Problem Statement
//                   </dt>
//                   <dd
//                     className={`leading-relaxed ${
//                       dark ? "text-gray-200" : "text-gray-900"
//                     }`}
//                   >
//                     {pitch.problem}
//                   </dd>
//                 </div>
//                 <div>
//                   <dt
//                     className={`text-sm font-medium mb-1 ${
//                       dark ? "text-gray-400" : "text-gray-600"
//                     }`}
//                   >
//                     Solution
//                   </dt>
//                   <dd
//                     className={`leading-relaxed ${
//                       dark ? "text-gray-200" : "text-gray-900"
//                     }`}
//                   >
//                     {pitch.solution}
//                   </dd>
//                 </div>
//               </dl>
//             </section>
//           )}

//           {/* Market Performance */}
//           <section>
//             <h2
//               className={`text-lg font-medium mb-4 ${
//                 dark ? "text-white" : "text-gray-900"
//               }`}
//             >
//               Market Performance
//             </h2>
//             <dl className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <dt
//                   className={`text-sm font-medium mb-1 ${
//                     dark ? "text-gray-400" : "text-gray-600"
//                   }`}
//                 >
//                   Current Traction
//                 </dt>
//                 <dd className={`${dark ? "text-gray-200" : "text-gray-900"}`}>
//                   {pitch.traction || "Early stage"}
//                 </dd>
//               </div>
//               <div>
//                 <dt
//                   className={`text-sm font-medium mb-1 ${
//                     dark ? "text-gray-400" : "text-gray-600"
//                   }`}
//                 >
//                   Competition Analysis
//                 </dt>
//                 <dd className={`${dark ? "text-gray-200" : "text-gray-900"}`}>
//                   {pitch.competition || "No direct competitors identified"}
//                 </dd>
//               </div>
//             </dl>
//           </section>

//           {/* Team & Strategy */}
//           {(pitch.team || pitch.goToMarketStrategy) && (
//             <section>
//               <h2
//                 className={`text-lg font-medium mb-4 ${
//                   dark ? "text-white" : "text-gray-900"
//                 }`}
//               >
//                 Team & Strategy
//               </h2>
//               <dl className="space-y-4">
//                 {pitch.team && (
//                   <div>
//                     <dt
//                       className={`text-sm font-medium mb-1 ${
//                         dark ? "text-gray-400" : "text-gray-600"
//                       }`}
//                     >
//                       Team
//                     </dt>
//                     <dd
//                       className={`leading-relaxed ${
//                         dark ? "text-gray-200" : "text-gray-900"
//                       }`}
//                     >
//                       {pitch.team}
//                     </dd>
//                   </div>
//                 )}
//                 {pitch.goToMarketStrategy && (
//                   <div>
//                     <dt
//                       className={`text-sm font-medium mb-1 ${
//                         dark ? "text-gray-400" : "text-gray-600"
//                       }`}
//                     >
//                       Go-to-Market Strategy
//                     </dt>
//                     <dd
//                       className={`leading-relaxed ${
//                         dark ? "text-gray-200" : "text-gray-900"
//                       }`}
//                     >
//                       {pitch.goToMarketStrategy}
//                     </dd>
//                   </div>
//                 )}
//               </dl>
//             </section>
//           )}

//           {/* Funding */}
//           {pitch.fundingUse && (
//             <section>
//               <h2
//                 className={`text-lg font-medium mb-4 ${
//                   dark ? "text-white" : "text-gray-900"
//                 }`}
//               >
//                 Capital Allocation
//               </h2>
//               <p
//                 className={`leading-relaxed ${
//                   dark ? "text-gray-200" : "text-gray-900"
//                 }`}
//               >
//                 {pitch.fundingUse}
//               </p>
//             </section>
//           )}
//         </div>

//         {/* Footer */}
//         <footer
//           className={`px-8 py-6 border-t ${
//             dark
//               ? "border-gray-700 bg-gray-800/50"
//               : "border-gray-200 bg-gray-50"
//           }`}
//         >
//           <div className="flex items-center justify-center">
//             <div className="flex flex-col items-center justify-center">
//               <div
//                 className={`font-medium ${
//                   dark ? "text-white" : "text-gray-900"
//                 }`}
//               >
//                 {pitch.founderName}
//               </div>
//               <div
//                 className={`text-sm ${
//                   dark ? "text-gray-400" : "text-gray-600"
//                 }`}
//               >
//                 {pitch.founderEmail}
//               </div>
//             </div>
//             {pitch.website && (
//               <a
//                 href={pitch.website}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center space-x-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
//               >
//                 <Globe size={14} />
//                 <span>Company Website</span>
//               </a>
//             )}
//           </div>
//         </footer>
//       </article>
//     </div>
//   );
// };

// export default PitchOne;



import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import useThemeStore from "./store/themeStore";
import { 
  ArrowLeft, Mail, Heart, Globe, Sparkles, Loader2, 
  TrendingUp, TrendingDown, DollarSign, Users, Target, 
  BarChart3, PieChart, Activity, AlertTriangle, CheckCircle,
  Calendar, Building, Award, Handshake, Shield, Zap,
  Calculator, Coins, CreditCard, Wallet, LineChart,
  Eye, Clock, Percent, Scale,
  IndianRupee
} from "lucide-react";
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
  const [activeTab, setActiveTab] = useState("overview");

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
          <div className={`text-center ${dark ? "text-gray-400" : "text-gray-600"}`}>
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

  // Extract and calculate metrics
  const financials = pitch.financials || {};
  const productMetrics = pitch.productMetrics || {};
  const market = pitch.market || {};
  const fundingDetails = pitch.fundingDetails || {};
  const legal = pitch.legal || {};

  // Financial calculations
  const monthlyRevenue = financials.monthlyRevenue || 0;
  const annualRevenue = financials.annualRevenue || monthlyRevenue * 12;
  const burnRate = financials.burnRate || 0;
  const runwayMonths = financials.runwayMonths || 0;
  const customerAcquisitionCost = financials.customerAcquisitionCost || 0;
  const lifetimeValue = financials.lifetimeValue || 0;
  const grossMargin = financials.grossMarginPercent || 0;
  const netMargin = financials.netMargin || 0;
  const ebitda = financials.EBITDA || financials.ebitda || 0;
  const yearOverYearGrowth = financials.yearOverYearGrowthPercent || 0;
  const monthOverMonthGrowth = financials.monthOverMonthGrowthPercent || 0;
  const churnRate = financials.churnRatePercent || 0;
  const arpu = financials.arpu || 0;
  const paybackPeriod = financials.paybackPeriodMonths || 0;
  const valuation = financials.valuation || fundingDetails.impliedValuation || 0;
  
  // Market calculations
  const tam = market.totalMarketSize || 0;
  const sam = market.serviceableMarketSize || 0;
  const som = market.targetMarketSize || 0;
  const marketGrowthRate = market.growthRatePercent || 0;
  
  // User metrics
  const mau = productMetrics.monthlyActiveUsers || 0;
  const dau = productMetrics.dailyActiveUsers || 0;
  const retentionRate = productMetrics.retentionRate || 0;
  const repeatCustomerRate = productMetrics.repeatCustomerRatePercent || 0;
  
  // Team metrics
  const teamSize = pitch.teamStrength || pitch.foundingTeam?.length || 1;
  const foundingTeamSize = pitch.foundingTeam?.length || 1;
  const advisorsCount = pitch.advisors?.length || 0;
  
  // Health scores
  const ltv2cacRatio = customerAcquisitionCost > 0 ? lifetimeValue / customerAcquisitionCost : 0;
  const unitEconomicsHealth = ltv2cacRatio >= 3 ? "Healthy" : ltv2cacRatio >= 1 ? "Acceptable" : "Needs Improvement";
  const financialHealth = (grossMargin > 70 ? 30 : grossMargin > 40 ? 20 : 10) + 
                         (monthlyRevenue > 0 ? 25 : 0) + 
                         (runwayMonths > 18 ? 25 : runwayMonths > 12 ? 15 : runwayMonths > 6 ? 10 : 0) +
                         (yearOverYearGrowth > 100 ? 20 : yearOverYearGrowth > 50 ? 15 : yearOverYearGrowth > 0 ? 10 : 0);

  // Format helpers
  const formatCurrency = (amount) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
    return `₹${amount.toLocaleString()}`;
  };

  const formatPercent = (value) => `${value.toFixed(1)}%`;
  const formatMultiple = (value) => `${value.toFixed(1)}x`;

  // Navigation tabs
  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "financials", label: "Financials", icon: IndianRupee },
    { id: "market", label: "Market", icon: Target },
    { id: "traction", label: "Traction", icon: TrendingUp },
    { id: "team", label: "Team", icon: Users },
    { id: "risks", label: "Risks", icon: Shield }
  ];

  return (
    <div className="lg:w-3xl w-full lg:max-h-screen scrollbar-hidden mb-10 overflow-y-scroll">
      {/* Navigation */}
      <button
        onClick={() => navigate(-1)}
        className={`mb-4 text-sm pl-2 font-medium ${
          dark ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-900"
        } transition-colors`}
      >
        <ArrowLeft size={16} className="inline mr-2" />
        Back to Pitches
      </button>

      {/* Main Content */}
      <article className={`${dark ? "bg-black" : "bg-white"} border ${
        dark ? "border-gray-700" : "border-gray-200"
      } overflow-hidden`}>
        
        {/* Header with Key Metrics */}
        <header className="lg:px-8 px-4 lg:py-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className={`text-3xl font-light mb-2 ${dark ? "text-white" : "text-gray-900"}`}>
                {pitch.startupName}
              </h1>
              <p className={`text-lg mb-3 ${dark ? "text-gray-300" : "text-gray-700"}`}>
                {pitch.oneLiner}
              </p>
              <div className="flex items-center gap-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  pitch.stage === "scaling" ? "bg-green-100 text-green-800" :
                  pitch.stage === "launched" ? "bg-blue-100 text-blue-800" :
                  pitch.stage === "MVP" ? "bg-yellow-100 text-yellow-800" :
                  "bg-gray-100 text-gray-800"
                }`}>
                  {pitch.stage || "Early Stage"}
                </span>
                {pitch.industry && (
                  <span className="text-sm text-gray-500">• {pitch.industry}</span>
                )}
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl font-light text-emerald-600 mb-1">
                {formatCurrency(fundingDetails.fundingAskAmount || pitch.fundingAsk || 0)}
              </div>
              <div className="text-sm text-gray-500 mb-2">
                for {fundingDetails.equityOfferedPercent || pitch.equityOffered || 0}% equity
              </div>
              <div className="text-xs text-gray-400">
                Implied Valuation: {formatCurrency(valuation)}
              </div>
            </div>
          </div>

          {/* Key Performance Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className={`p-4 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
              <div className="flex items-center justify-between mb-2">
                <DollarSign size={20} className="text-green-600" />
                <span className={`text-xs ${yearOverYearGrowth > 0 ? "text-green-600" : "text-gray-500"}`}>
                  {yearOverYearGrowth > 0 ? "+" : ""}{formatPercent(yearOverYearGrowth)} YoY
                </span>
              </div>
              <div className="text-2xl font-bold">{formatCurrency(monthlyRevenue)}</div>
              <div className="text-sm text-gray-500">Monthly Revenue</div>
            </div>

            <div className={`p-4 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
              <div className="flex items-center justify-between mb-2">
                <Users size={20} className="text-blue-600" />
                <span className={`text-xs ${retentionRate > 80 ? "text-green-600" : "text-gray-500"}`}>
                  {formatPercent(retentionRate)} retention
                </span>
              </div>
              <div className="text-2xl font-bold">{mau.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Monthly Active Users</div>
            </div>

            <div className={`p-4 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
              <div className="flex items-center justify-between mb-2">
                <Calculator size={20} className="text-purple-600" />
                <span className={`text-xs ${ltv2cacRatio >= 3 ? "text-green-600" : "text-red-600"}`}>
                  {formatMultiple(ltv2cacRatio)} LTV:CAC
                </span>
              </div>
              <div className="text-2xl font-bold">{formatCurrency(arpu)}</div>
              <div className="text-sm text-gray-500">ARPU</div>
            </div>

            <div className={`p-4 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
              <div className="flex items-center justify-between mb-2">
                <Clock size={20} className={runwayMonths < 12 ? "text-red-600" : "text-green-600"} />
                <span className={`text-xs ${
                  financialHealth > 70 ? "text-green-600" : 
                  financialHealth > 50 ? "text-yellow-600" : "text-red-600"
                }`}>
                  {financialHealth}/100 health
                </span>
              </div>
              <div className="text-2xl font-bold">{runwayMonths}m</div>
              <div className="text-sm text-gray-500">Runway</div>
            </div>
          </div>

          {/* AI Summary */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSummarize}
                disabled={isLoading}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium border transition-colors ${
                  isLoading
                    ? dark ? "bg-gray-700 text-gray-500 border-gray-600" : "bg-gray-100 text-gray-500 border-gray-300"
                    : dark ? "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                <span>
                  {isLoading ? "Generating..." : summary ? showSummary ? "Hide Summary" : "Show Summary" : "Generate AI Summary"}
                </span>
              </button>
            </div>

            {error && (
              <div className={`p-3 text-sm border-l-4 border-red-500 ${
                dark ? "bg-red-900/10 text-red-400" : "bg-red-50 text-red-700"
              }`}>
                {error}
              </div>
            )}

            {showSummary && summary && (
              <div className={`p-6 border-l-4 border-violet-500 ${dark ? "bg-gray-800/50" : "bg-violet-50"}`}>
                <div className="flex items-center space-x-2 mb-3">
                  <Sparkles size={16} className="text-violet-600" />
                  <span className="text-sm font-medium text-violet-600">AI Executive Summary</span>
                </div>
                <div className={`prose prose-sm ${dark ? "prose-invert text-gray-300" : "text-gray-700"}`}>
                  {summary.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="mb-3 last:mb-0">{paragraph.trim()}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className={`px-8 py-4 border-b ${dark ? "border-gray-700" : "border-gray-200"}`}>
          <div className="flex space-x-4 overflow-x-auto scrollbar-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : dark ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <tab.icon size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Tab Content */}
        <div className="lg:px-8 px-4 lg:py-8 py-4">
          
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              
              {/* Business Model & Strategy */}
              <section>
                <h2 className={`text-xl font-semibold mb-6 ${dark ? "text-white" : "text-gray-900"}`}>
                  Business Overview
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
                    <div className="flex items-center mb-4">
                      <Target size={20} className="text-blue-600 mr-3" />
                      <h3 className="font-semibold">Value Proposition</h3>
                    </div>
                    <p className="text-sm mb-4">{pitch.uniqueValueProposition || pitch.USP || "Building innovative solutions"}</p>
                    <div className="space-y-2 text-sm">
                      <div><strong>Target Market:</strong> {pitch.targetMarket}</div>
                      <div><strong>Business Model:</strong> {pitch.businessModel}</div>
                      {pitch.distributionChannels && (
                        <div><strong>Distribution:</strong> {pitch.distributionChannels.join(", ")}</div>
                      )}
                    </div>
                  </div>

                  <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
                    <div className="flex items-center mb-4">
                      <Zap size={20} className="text-yellow-600 mr-3" />
                      <h3 className="font-semibold">Problem & Solution</h3>
                    </div>
                    {pitch.problem && (
                      <div className="mb-4">
                        <strong className="text-red-600">Problem:</strong>
                        <p className="text-sm mt-1">{pitch.problem}</p>
                      </div>
                    )}
                    {pitch.solution && (
                      <div>
                        <strong className="text-green-600">Solution:</strong>
                        <p className="text-sm mt-1">{pitch.solution}</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Vision & Mission */}
              {(pitch.visionMission?.vision || pitch.visionMission?.mission) && (
                <section>
                  <h2 className={`text-xl font-semibold mb-6 ${dark ? "text-white" : "text-gray-900"}`}>
                    Vision & Mission
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {pitch.visionMission?.vision && (
                      <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
                        <h3 className="font-semibold mb-3 flex items-center">
                          <Eye size={18} className="text-purple-600 mr-2" />
                          Vision
                        </h3>
                        <p className="text-sm">{pitch.visionMission.vision}</p>
                      </div>
                    )}
                    {pitch.visionMission?.mission && (
                      <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
                        <h3 className="font-semibold mb-3 flex items-center">
                          <Target size={18} className="text-blue-600 mr-2" />
                          Mission
                        </h3>
                        <p className="text-sm">{pitch.visionMission.mission}</p>
                      </div>
                    )}
                  </div>
                </section>
              )}
            </div>
          )}

          {/* Financials Tab */}
          {activeTab === "financials" && (
            <div className="space-y-8">
              
              {/* Revenue Metrics */}
              <section>
                <h2 className={`text-xl font-semibold mb-6 ${dark ? "text-white" : "text-gray-900"}`}>
                  Revenue & Growth Analytics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Revenue Metrics</h3>
                      <DollarSign className="text-green-600" size={20} />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Monthly (MRR)</span>
                        <span className="font-medium">{formatCurrency(monthlyRevenue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Annual (ARR)</span>
                        <span className="font-medium">{formatCurrency(annualRevenue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Last Year</span>
                        <span className="font-medium">{formatCurrency(financials.revenueLastYear || 0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">This Year</span>
                        <span className="font-medium">{formatCurrency(financials.revenueThisYear || 0)}</span>
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Growth Rates</h3>
                      <TrendingUp className="text-blue-600" size={20} />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">YoY Growth</span>
                        <span className={`font-medium ${yearOverYearGrowth > 0 ? "text-green-600" : "text-red-600"}`}>
                          {formatPercent(yearOverYearGrowth)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">MoM Growth</span>
                        <span className={`font-medium ${monthOverMonthGrowth > 0 ? "text-green-600" : "text-red-600"}`}>
                          {formatPercent(monthOverMonthGrowth)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Sales Growth</span>
                        <span className="font-medium">{formatPercent(financials.salesGrowthYoY || 0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Market Growth</span>
                        <span className="font-medium">{formatPercent(marketGrowthRate)}</span>
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Profitability</h3>
                      <BarChart3 className="text-purple-600" size={20} />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Gross Margin</span>
                        <span className={`font-medium ${grossMargin > 70 ? "text-green-600" : grossMargin > 40 ? "text-yellow-600" : "text-red-600"}`}>
                          {formatPercent(grossMargin)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Net Margin</span>
                        <span className={`font-medium ${netMargin > 0 ? "text-green-600" : "text-red-600"}`}>
                          {formatPercent(netMargin)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">EBITDA</span>
                        <span className="font-medium">{formatCurrency(ebitda)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Net Profit</span>
                        <span className={`font-medium ${financials.netProfit > 0 ? "text-green-600" : "text-red-600"}`}>
                          {formatCurrency(financials.netProfit || 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Unit Economics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Unit Economics</h3>
                      <Calculator className="text-orange-600" size={20} />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Customer Acquisition Cost</span>
                        <span className="font-medium">{formatCurrency(customerAcquisitionCost)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Lifetime Value</span>
                        <span className="font-medium">{formatCurrency(lifetimeValue)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">LTV:CAC Ratio</span>
                        <span className={`font-medium ${ltv2cacRatio >= 3 ? "text-green-600" : ltv2cacRatio >= 1 ? "text-yellow-600" : "text-red-600"}`}>
                          {formatMultiple(ltv2cacRatio)} ({unitEconomicsHealth})
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Payback Period</span>
                        <span className="font-medium">{paybackPeriod} months</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Average Revenue Per User</span>
                        <span className="font-medium">{formatCurrency(arpu)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Churn Rate</span>
                        <span className={`font-medium ${churnRate < 5 ? "text-green-600" : churnRate < 10 ? "text-yellow-600" : "text-red-600"}`}>
                          {formatPercent(churnRate)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Cash Flow & Runway</h3>
                      <Wallet className="text-red-600" size={20} />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Monthly Burn Rate</span>
                        <span className={`font-medium ${burnRate > 0 ? "text-red-600" : "text-green-600"}`}>
                          {formatCurrency(burnRate)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Runway Remaining</span>
                        <span className={`font-medium ${runwayMonths < 6 ? "text-red-600" : runwayMonths < 12 ? "text-yellow-600" : "text-green-600"}`}>
                          {runwayMonths} months
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Operating Cash Flow</span>
                        <span className="font-medium">{formatCurrency(financials.cashFlowFromOperations || 0)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Total Assets</span>
                        <span className="font-medium">{formatCurrency(financials.assetsTotal || 0)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Total Liabilities</span>
                        <span className="font-medium">{formatCurrency(financials.liabilitiesTotal || 0)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Debt to Equity</span>
                        <span className="font-medium">{formatMultiple(financials.debtEquityRatio || 0)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Revenue Streams */}
                {financials.revenueStreams && financials.revenueStreams.length > 0 && (
                  <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
                    <h3 className="font-semibold mb-4">Revenue Streams</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {financials.revenueStreams.map((stream, index) => (
                        <div key={index} className={`p-4 rounded ${dark ? "bg-gray-600" : "bg-white"}`}>
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">{stream.streamName}</div>
                              <div className="text-sm text-gray-500 capitalize">{stream.type}</div>
                            </div>
                            <div className="text-lg font-bold">{stream.percentage}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            </div>
          )}

          {/* Market Tab */}
          {activeTab === "market" && (
            <div className="space-y-8">
              
              {/* Market Size Analysis */}
              <section>
                <h2 className={`text-xl font-semibold mb-6 ${dark ? "text-white" : "text-gray-900"}`}>
                  Market Opportunity Analysis
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Total Addressable Market</h3>
                      <Target className="text-blue-600" size={20} />
                    </div>
                    <div className="text-3xl font-bold mb-2">{formatCurrency(tam)}</div>
                    <div className="text-sm text-gray-500">TAM - Global opportunity size</div>
                    <div className="mt-4 text-xs">
                      <div className="flex justify-between">
                        <span>Growth Rate</span>
                        <span className="font-medium">{formatPercent(marketGrowthRate)}</span>
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Serviceable Available Market</h3>
                      <PieChart className="text-green-600" size={20} />
                    </div>
                    <div className="text-3xl font-bold mb-2">{formatCurrency(sam)}</div>
                    <div className="text-sm text-gray-500">SAM - Realistic market reach</div>
                    <div className="mt-4 text-xs">
                      <div className="flex justify-between">
                        <span>% of TAM</span>
                        <span className="font-medium">{tam > 0 ? formatPercent((sam/tam) * 100) : "0%"}</span>
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Serviceable Obtainable Market</h3>
                      <Activity className="text-purple-600" size={20} />
                    </div>
                    <div className="text-3xl font-bold mb-2">{formatCurrency(som)}</div>
                    <div className="text-sm text-gray-500">SOM - Immediate target market</div>
                    <div className="mt-4 text-xs">
                      <div className="flex justify-between">
                        <span>% of SAM</span>
                        <span className="font-medium">{sam > 0 ? formatPercent((som/sam) * 100) : "0%"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Segments */}
                {pitch.customerSegments && pitch.customerSegments.length > 0 && (
                  <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
                    <h3 className="font-semibold mb-4">Customer Segments</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {pitch.customerSegments.map((segment, index) => (
                        <div key={index} className={`p-4 rounded ${dark ? "bg-gray-600" : "bg-white"}`}>
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{segment.segmentName}</h4>
                            <span className="text-sm font-bold">{segment.size?.toLocaleString()} users</span>
                          </div>
                          <p className="text-sm text-gray-500">{segment.painPoints}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Competition Analysis */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
                    <h3 className="font-semibold mb-4">Competitive Landscape</h3>
                    <p className="text-sm mb-4">{pitch.competition}</p>
                    <div className="text-sm">
                      <strong>Competitive Advantage:</strong>
                      <p className="mt-2">{pitch.competitiveAdvantage}</p>
                    </div>
                  </div>

                  {pitch.competitors && pitch.competitors.length > 0 && (
                    <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
                      <h3 className="font-semibold mb-4">Direct Competitors</h3>
                      <div className="space-y-3">
                        {pitch.competitors.slice(0, 3).map((competitor, index) => (
                          <div key={index} className={`p-3 rounded ${dark ? "bg-gray-600" : "bg-white"}`}>
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-medium">{competitor.name}</h4>
                              <span className={`px-2 py-1 rounded text-xs ${
                                competitor.type === "direct" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                              }`}>
                                {competitor.type}
                              </span>
                            </div>
                            <div className="text-xs space-y-1">
                              <div><strong>Strength:</strong> {competitor.strength}</div>
                              <div><strong>Weakness:</strong> {competitor.weakness}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </div>
          )}

          {/* Traction Tab */}
          {activeTab === "traction" && (
            <div className="space-y-8">
              
              {/* User & Growth Metrics */}
              <section>
                <h2 className={`text-xl font-semibold mb-6 ${dark ? "text-white" : "text-gray-900"}`}>
                  Traction & Growth Metrics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">User Metrics</h3>
                      <Users className="text-blue-600" size={20} />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Total Users</span>
                        <span className="font-medium">{pitch.usersCount?.toLocaleString() || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Monthly Active</span>
                        <span className="font-medium">{mau.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Daily Active</span>
                        <span className="font-medium">{dau.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">DAU/MAU Ratio</span>
                        <span className="font-medium">{mau > 0 ? formatPercent((dau/mau) * 100) : "0%"}</span>
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Engagement</h3>
                      <Activity className="text-green-600" size={20} />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Retention Rate</span>
                        <span className={`font-medium ${retentionRate > 80 ? "text-green-600" : retentionRate > 60 ? "text-yellow-600" : "text-red-600"}`}>
                          {formatPercent(retentionRate)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Repeat Customer Rate</span>
                        <span className="font-medium">{formatPercent(repeatCustomerRate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Downloads</span>
                        <span className="font-medium">{productMetrics.downloads?.toLocaleString() || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">GMV</span>
                        <span className="font-medium">{formatCurrency(productMetrics.GMV || 0)}</span>
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Performance</h3>
                      <TrendingUp className="text-purple-600" size={20} />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Gross Order Value</span>
                        <span className="font-medium">{formatCurrency(financials.grossOrderValue || 0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Inventory Turnover</span>
                        <span className="font-medium">{formatMultiple(financials.inventoryTurnover || 0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Current Ratio</span>
                        <span className={`font-medium ${financials.currentRatio > 2 ? "text-green-600" : financials.currentRatio > 1 ? "text-yellow-600" : "text-red-600"}`}>
                          {formatMultiple(financials.currentRatio || 0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">ROI</span>
                        <span className="font-medium">{formatPercent(financials.roi || 0)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Achievements */}
                {productMetrics.keyAchievements && productMetrics.keyAchievements.length > 0 && (
                  <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
                    <div className="flex items-center mb-4">
                      <Award className="text-yellow-600 mr-3" size={20} />
                      <h3 className="font-semibold">Key Achievements</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {productMetrics.keyAchievements.map((achievement, index) => (
                        <div key={index} className={`p-3 rounded flex items-center ${dark ? "bg-gray-600" : "bg-white"}`}>
                          <CheckCircle className="text-green-600 mr-2 flex-shrink-0" size={16} />
                          <span className="text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Partnerships */}
                {pitch.partnerships && pitch.partnerships.length > 0 && (
                  <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
                    <div className="flex items-center mb-4">
                      <Handshake className="text-blue-600 mr-3" size={20} />
                      <h3 className="font-semibold">Strategic Partnerships</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {pitch.partnerships.map((partnership, index) => (
                        <div key={index} className={`p-4 rounded ${dark ? "bg-gray-600" : "bg-white"}`}>
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">{partnership.partnerName}</h4>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {partnership.partnershipType}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">{partnership.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Customer Testimonials */}
                {pitch.customerTestimonials && pitch.customerTestimonials.length > 0 && (
                  <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
                    <h3 className="font-semibold mb-4">Customer Testimonials</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {pitch.customerTestimonials.map((testimonial, index) => (
                        <div key={index} className={`p-4 rounded ${dark ? "bg-gray-600" : "bg-white"}`}>
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">{testimonial.customerName}</h4>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={`text-sm ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}>
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm italic">"{testimonial.testimonial}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            </div>
          )}

          {/* Team Tab */}
          {activeTab === "team" && (
            <div className="space-y-8">
              
              {/* Team Overview */}
              <section>
                <h2 className={`text-xl font-semibold mb-6 ${dark ? "text-white" : "text-gray-900"}`}>
                  Team & Leadership
                </h2>
                
                {/* Team Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"} text-center`}>
                    <div className="text-3xl font-bold mb-2">{teamSize}</div>
                    <div className="text-sm text-gray-500">Total Team Size</div>
                  </div>
                  <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"} text-center`}>
                    <div className="text-3xl font-bold mb-2">{foundingTeamSize}</div>
                    <div className="text-sm text-gray-500">Founding Team</div>
                  </div>
                  <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"} text-center`}>
                    <div className="text-3xl font-bold mb-2">{advisorsCount}</div>
                    <div className="text-sm text-gray-500">Advisors</div>
                  </div>
                  <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"} text-center`}>
                    <div className="text-3xl font-bold mb-2">{pitch.boardOfDirectors?.length || 0}</div>
                    <div className="text-sm text-gray-500">Board Members</div>
                  </div>
                </div>

                {/* Founding Team */}
                {pitch.foundingTeam && pitch.foundingTeam.length > 0 && (
                  <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"} mb-6`}>
                    <h3 className="font-semibold mb-4">Founding Team</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {pitch.foundingTeam.map((member, index) => (
                        <div key={index} className={`p-4 rounded ${dark ? "bg-gray-600" : "bg-white"}`}>
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">{member.name}</h4>
                              <p className="text-sm text-gray-500">{member.role}</p>
                            </div>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              {member.experienceYears} yrs exp
                            </span>
                          </div>
                          <p className="text-sm">{member.background}</p>
                          {member.linkedIn && (
                            <a href={member.linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs mt-2 inline-block">
                              LinkedIn Profile →
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Team Members */}
                {pitch.teamMembers && pitch.teamMembers.length > 0 && (
                  <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"} mb-6`}>
                    <h3 className="font-semibold mb-4">Team Members</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {pitch.teamMembers.map((member, index) => (
                        <div key={index} className={`p-4 rounded ${dark ? "bg-gray-600" : "bg-white"}`}>
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-sm text-gray-500">{member.role}</p>
                          <p className="text-xs mt-1">{member.experienceYears} years experience</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Advisors */}
                {pitch.advisors && pitch.advisors.length > 0 && (
                  <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"} mb-6`}>
                    <h3 className="font-semibold mb-4">Advisory Board</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {pitch.advisors.map((advisor, index) => (
                        <div key={index} className={`p-4 rounded ${dark ? "bg-gray-600" : "bg-white"}`}>
                          <h4 className="font-medium">{advisor.name}</h4>
                          <p className="text-sm text-blue-600 mb-2">{advisor.expertise}</p>
                          <p className="text-sm text-gray-500">{advisor.background}</p>
                          {advisor.linkedIn && (
                            <a href={advisor.linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs mt-2 inline-block">
                              LinkedIn Profile →
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Organizational Structure */}
                {pitch.orgStructure && (
                  <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
                    <h3 className="font-semibold mb-4">Organizational Structure</h3>
                    <p className="text-sm">{pitch.orgStructure}</p>
                  </div>
                )}
              </section>
            </div>
          )}

          {/* Risks Tab */}
          {activeTab === "risks" && (
            <div className="space-y-8">
              
              {/* Risk Assessment */}
              <section>
                <h2 className={`text-xl font-semibold mb-6 ${dark ? "text-white" : "text-gray-900"}`}>
                  Risk Analysis & Mitigation
                </h2>
                
                {/* Financial Health Score */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Financial Health</h3>
                      <Shield className={`${financialHealth > 70 ? "text-green-600" : financialHealth > 50 ? "text-yellow-600" : "text-red-600"}`} size={20} />
                    </div>
                    <div className="text-center">
                      <div className={`text-4xl font-bold mb-2 ${
                        financialHealth > 70 ? "text-green-600" : 
                        financialHealth > 50 ? "text-yellow-600" : "text-red-600"
                      }`}>
                        {financialHealth}/100
                      </div>
                      <div className="text-sm text-gray-500">Overall Score</div>
                    </div>
                  </div>

                  <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Market Risk</h3>
                      <AlertTriangle className="text-orange-600" size={20} />
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Market Growth</span>
                        <span className={marketGrowthRate > 10 ? "text-green-600" : "text-yellow-600"}>
                          {marketGrowthRate > 10 ? "Low" : "Medium"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Competition</span>
                        <span className="text-red-600">High</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Customer Concentration</span>
                        <span className="text-yellow-600">Medium</span>
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Operational Risk</h3>
                      <Activity className="text-purple-600" size={20} />
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Team Risk</span>
                        <span className={teamSize > 10 ? "text-green-600" : "text-yellow-600"}>
                          {teamSize > 10 ? "Low" : "Medium"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Technology Risk</span>
                        <span className="text-green-600">Low</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Regulatory Risk</span>
                        <span className="text-yellow-600">Medium</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Critical Metrics */}
                <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
                  <h3 className="font-semibold mb-4">Critical Risk Indicators</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Financial Risks</h4>
                      <div className="space-y-2">
                        {runwayMonths < 6 && (
                          <div className="flex items-center text-red-600 text-sm">
                            <AlertTriangle size={14} className="mr-2" />
                            Critical: Only {runwayMonths} months runway
                          </div>
                        )}
                        {ltv2cacRatio < 1 && (
                          <div className="flex items-center text-red-600 text-sm">
                            <AlertTriangle size={14} className="mr-2" />
                            Poor unit economics (LTV:CAC = {formatMultiple(ltv2cacRatio)})
                          </div>
                        )}
                        {grossMargin < 40 && (
                          <div className="flex items-center text-yellow-600 text-sm">
                            <AlertTriangle size={14} className="mr-2" />
                            Low gross margins ({formatPercent(grossMargin)})
                          </div>
                        )}
                        {churnRate > 10 && (
                          <div className="flex items-center text-red-600 text-sm">
                            <AlertTriangle size={14} className="mr-2" />
                            High churn rate ({formatPercent(churnRate)})
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Operational Risks</h4>
                      <div className="space-y-2">
                        {teamSize < 5 && (
                          <div className="flex items-center text-yellow-600 text-sm">
                            <AlertTriangle size={14} className="mr-2" />
                            Small team size ({teamSize} members)
                          </div>
                        )}
                        {retentionRate < 60 && (
                          <div className="flex items-center text-red-600 text-sm">
                            <AlertTriangle size={14} className="mr-2" />
                            Low user retention ({formatPercent(retentionRate)})
                          </div>
                        )}
                        {!pitch.legal?.complianceStatus === "Compliant" && (
                          <div className="flex items-center text-red-600 text-sm">
                            <AlertTriangle size={14} className="mr-2" />
                            Compliance issues
                          </div>
                        )}
                        {legal.pendingLitigations !== "None" && (
                          <div className="flex items-center text-red-600 text-sm">
                            <AlertTriangle size={14} className="mr-2" />
                            Pending litigations: {legal.pendingLitigations}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legal & Compliance */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
                    <h3 className="font-semibold mb-4">Legal Structure</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Company Type</span>
                        <span className="font-medium">{legal.companyRegistration || "Not specified"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ESOP Pool</span>
                        <span className="font-medium">{legal.esops || 0}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Patents</span>
                        <span className="font-medium">{legal.patents?.length || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Trademarks</span>
                        <span className="font-medium">{legal.trademarks?.length || 0}</span>
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
                    <h3 className="font-semibold mb-4">Compliance Status</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span>Overall Status</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          legal.complianceStatus === "Compliant" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {legal.complianceStatus || "Unknown"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>GST Compliance</span>
                        <span className={legal.taxCompliance?.GST ? "text-green-600" : "text-red-600"}>
                          {legal.taxCompliance?.GST ? "✓" : "✗"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>TDS Compliance</span>
                        <span className={legal.taxCompliance?.TDS ? "text-green-600" : "text-red-600"}>
                          {legal.taxCompliance?.TDS ? "✓" : "✗"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className={`px-8 py-6 border-t ${
          dark ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-gray-50"
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <div className={`font-medium ${dark ? "text-white" : "text-gray-900"}`}>
                {pitch.founderName}
              </div>
              <div className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>
                {pitch.founderEmail}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href={`mailto:${pitch.founderEmail}`}
                className="flex items-center space-x-1 px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Mail size={14} />
                <span>Contact Founder</span>
              </a>
              {pitch.website && (
                <a
                  href={pitch.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Globe size={14} />
                  <span>Visit Website</span>
                </a>
              )}
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default PitchOne;
