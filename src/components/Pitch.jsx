// import { useState } from "react";
// import api from "../utils/api1";
// import Loader from "./Loader";
// import useThemeStore from "../store/themeStore";

// const Pitch = () => {
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
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

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await api.post("/user/posts/submitpitch", formData);
//       setSuccess(true);
//       setTimeout(() => {
//         setFormData({
//           startupName: "",
//           oneLiner: "",
//           problem: "",
//           solution: "",
//           targetMarket: "",
//           businessModel: "",
//           traction: "",
//           team: "",
//           goToMarketStrategy: "",
//           competition: "",
//           fundingAsk: "",
//           fundingUse: "",
//         });
//       }, 2000);
//     } catch (error) {
//       console.error("Error submitting pitch:", error);
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

//   if (success) {
//     return (
//       <div
//         className={`min-h-screen flex items-center justify-center ${
//           dark ? "bg-gray-900" : "bg-gray-50"
//         }`}
//       >
//         <div className="text-center p-8">
//           <div className="text-5xl mb-4">✅</div>
//           <h2
//             className={`text-2xl font-semibold mb-2 ${
//               dark ? "text-white" : "text-gray-900"
//             }`}
//           >
//             Pitch Submitted Successfully!
//           </h2>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`min-h-screen pb-14 py-6 px-4 ${
//         dark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
//       }`}
//     >
//       <div className="max-w-2xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-7">
//           <h1 className="text-4xl font-light mb-3">Pitch Your Idea</h1>
//           <p className={`text-lg ${dark ? "text-gray-300" : "text-gray-600"}`}>
//             Tell us about your startup vision
//           </p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {fields.map(({ label, name, textarea, placeholder }) => (
//             <div key={name}>
//               <label
//                 className={`block text-sm font-medium mb-2 ${
//                   dark ? "text-gray-200" : "text-gray-700"
//                 }`}
//               >
//                 {label}
//               </label>
//               {textarea ? (
//                 <textarea
//                   name={name}
//                   rows="3"
//                   placeholder={placeholder}
//                   className={`w-full px-4 py-3 rounded-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                     dark
//                       ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
//                       : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
//                   }`}
//                   value={formData[name]}
//                   onChange={handleChange}
//                   required
//                 />
//               ) : (
//                 <input
//                   type="text"
//                   name={name}
//                   placeholder={placeholder}
//                   className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                     dark
//                       ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
//                       : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
//                   }`}
//                   value={formData[name]}
//                   onChange={handleChange}
//                   required
//                 />
//               )}
//             </div>
//           ))}

//           {/* Submit Button */}
//           <div className="pt-2">
//             {!loading ? (
//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//               >
//                 Submit Pitch
//               </button>
//             ) : (
//               <div className="flex justify-center py-3">
//                 <Loader />
//               </div>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Pitch;

import { useState } from "react";
import api from "../utils/api1";
import Loader from "./Loader";
import useThemeStore from "../store/themeStore";

const Pitch = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState("");
  const { dark } = useThemeStore();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/user/posts/submitpitch", formData);
      setMessage(res.data.message);
      setSuccess(true);

      // Reset form after showing success message
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
    } catch (error) {
      console.error("Error submitting pitch:", error);
      setError(
        error.response?.data?.message ||
          "Failed to submit pitch. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      label: "Startup Name",
      name: "startupName",
      placeholder: "Enter your startup name",
    },
    {
      label: "One-line Pitch",
      name: "oneLiner",
      placeholder: "Describe your startup in one sentence",
    },
    {
      label: "Problem Statement",
      name: "problem",
      textarea: true,
      placeholder: "What problem are you solving?",
    },
    {
      label: "Solution",
      name: "solution",
      textarea: true,
      placeholder: "How do you solve this problem?",
    },
    {
      label: "Target Market",
      name: "targetMarket",
      textarea: true,
      placeholder: "Who are your customers?",
    },
    {
      label: "Business Model",
      name: "businessModel",
      textarea: true,
      placeholder: "How do you make money?",
    },
    {
      label: "Traction",
      name: "traction",
      textarea: true,
      placeholder: "Any progress or milestones achieved?",
    },
    {
      label: "Team",
      name: "team",
      textarea: true,
      placeholder: "Key team members and their experience",
    },
    {
      label: "Go-to-Market Strategy",
      name: "goToMarketStrategy",
      textarea: true,
      placeholder: "How will you acquire customers?",
    },
    {
      label: "Competition",
      name: "competition",
      textarea: true,
      placeholder: "Who are your competitors and how are you different?",
    },
    {
      label: "Funding Ask",
      name: "fundingAsk",
      placeholder: "How much funding do you need?",
    },
    {
      label: "Use of Funds",
      name: "fundingUse",
      textarea: true,
      placeholder: "How will you use the investment?",
    },
  ];

  return (
    <div
      className={`min-h-screen pb-14 py-6 px-4 ${
        dark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-7">
          <h1 className="text-4xl font-light mb-3">Pitch Your Idea</h1>
          <p className={`text-lg ${dark ? "text-gray-300" : "text-gray-600"}`}>
            Tell us about your startup vision
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Form */}
       {!success ?  <form onSubmit={handleSubmit} className="space-y-6">
          {fields.map(({ label, name, textarea, placeholder }) => (
            <div key={name}>
              <label
                className={`block text-sm font-medium mb-2 ${
                  dark ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {label}
              </label>
              {textarea ? (
                <textarea
                  name={name}
                  rows="3"
                  placeholder={placeholder}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical ${
                    dark
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                />
              ) : (
                <input
                  type="text"
                  name={name}
                  placeholder={placeholder}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    dark
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                />
              )}
            </div>
          ))}
        
          {/* Submit Button */}
          <div className="pt-2">
            {!loading ? (
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit Pitch
              </button>
            ) : (
              <div className="flex justify-center py-3">
                <Loader />
              </div>
            )}
          </div>
        </form> : <p>{message}</p>}
      </div>
    </div>
  );
};

export default Pitch;
