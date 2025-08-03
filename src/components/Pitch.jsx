import { useState } from 'react';
import api from '../utils/api1';
import Loader from './Loader';
import useThemeStore from '../store/themeStore';

const Pitch = () => {
  const [loading, setLoading] = useState(false);
  const { dark } = useThemeStore();
  const [formData, setFormData] = useState({
    startupName: '',
    oneLiner: '',
    problem: '',
    solution: '',
    targetMarket: '',
    businessModel: '',
    traction: '',
    team: '',
    goToMarketStrategy: '',
    competition: '',
    fundingAsk: '',
    fundingUse: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const res = await api.post('/posts/submit-pitch', formData);
    setLoading(false)
    console.log('Pitch Submitted:', formData);
    console.log(res)
  };

  const fields = [
    { label: 'Startup Name', name: 'startupName' },
    { label: 'One-liner Pitch', name: 'oneLiner' },
    { label: 'Problem Statement', name: 'problem', textarea: true },
    { label: 'Your Solution', name: 'solution', textarea: true },
    { label: 'Target Market', name: 'targetMarket', textarea: true },
    { label: 'Business Model', name: 'businessModel', textarea: true },
    { label: 'Traction (if any)', name: 'traction', textarea: true },
    { label: 'Founding Team', name: 'team', textarea: true },
    { label: 'Go-to-Market Strategy', name: 'goToMarketStrategy', textarea: true },
    { label: 'Competitors & Differentiators', name: 'competition', textarea: true },
    { label: 'Funding Ask (Amount)', name: 'fundingAsk' },
    { label: 'Use of Funds', name: 'fundingUse', textarea: true },
  ];

  return (
    <div className={`min-h-screen min-w-full ${dark ? 'text-black' : 'text-white'}`}>
      <div className="max-w-5xl mx-auto p-4">
        <h1 className="text-3xl sm:text-5xl font-normal text-center mb-5">
          Pitch idea
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:flex flex-col gap-6">
          {fields.map(({ label, name, textarea }) => (
            <div className="col-span-1" key={name}>
              <label
                htmlFor={name}
                className="block text-sm font-semibold mb-2"
              >
                {label}
              </label>
              {textarea ? (
                <textarea
                  id={name}
                  name={name}
                  rows="4" // You can start with 4 rows and let it grow
                  className="w-full px-4 py-3 text-sm text-gray-800 bg-white  border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                  value={formData[name]}
                  onChange={handleChange}
                  required
                />
              ) : (
                <input
                  type="text"
                  id={name}
                  name={name}
                  className="w-full px-4 py-3 text-sm text-gray-800 bg-white border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData[name]}
                  onChange={handleChange}
                  required
                />
              )}
            </div>
          ))}

          <div className="md:col-span-2 mb-14 flex justify-center items-center">
            {!loading ? <button
              type="submit"
              className={`cursor-pointer bg-blue-600 w-full text-center flex justify-center items-center transition-all duration-200 text-white text-lg font-semibold py-3 rounded-sm shadow-md hover:shadow-xl transform ${loading && 'bg-white'} hover:scale-[1.02] active:scale-[0.98]`}
            >
              Submit Your Pitch
            </button>
              : <Loader />}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Pitch;

// import { useState } from 'react';
// import api from '../utils/api1';
// import Loader from './Loader';
// import { useAuthStore } from '../context/AuthContext';
// import { PieChart, Pie, Cell, Tooltip } from 'recharts';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// const parseFundingUse = (text) => {
//   return text
//     .split('\n')
//     .map((line) => {
//       const [name, value] = line.split(':').map((s) => s.trim());
//       return { name, value: parseFloat(value) };
//     })
//     .filter((item) => item.name && !isNaN(item.value));
// };

// const steps = [
//   'The Idea',
//   'The Business',
//   'The Numbers',
// ];

// export default function Pitch() {
//   const { dark } = useAuthStore();
//   const [step, setStep] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   const [formData, setFormData] = useState({
//     startupName: '',
//     oneLiner: '',
//     problem: '',
//     solution: '',
//     targetMarket: '',
//     businessModel: '',
//     traction: '',
//     team: '',
//     goToMarketStrategy: '',
//     competition: '',
//     fundingAsk: '',
//     fundingUse: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
//   const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     await api.post('/posts/submit-pitch', formData);
//     setLoading(false);
//     setShowModal(true);
//   };

//   const teamCount = formData.team ? formData.team.split(',').length : 0;
//   const fundingChartData = parseFundingUse(formData.fundingUse || '');

//   return (
//     <div className={`min-h-screen bg-gray-100 dark:bg-zinc-900 ${dark ? 'text-black' : 'text-white'}`}>
//       <div className="max-w-6xl mx-auto px-4 py-10">
//         <h1 className="text-4xl font-bold text-center mb-8">Pitch Your Startup</h1>

//         {/* Step Indicator */}
//         <div className="flex items-center justify-center gap-4 mb-10">
//           {steps.map((s, idx) => (
//             <div key={s} className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
//               step === idx ? 'bg-blue-600 text-white' : 'bg-gray-300 dark:bg-zinc-700 text-gray-800'
//             }`}>
//               {s}
//             </div>
//           ))}
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Form Section */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {step === 0 && (
//               <>
//                 <Input label="Startup Name" name="startupName" value={formData} onChange={handleChange} />
//                 <Input label="One-liner Pitch" name="oneLiner" value={formData} onChange={handleChange} />
//                 <Textarea label="Problem" name="problem" value={formData} onChange={handleChange} />
//                 <Textarea label="Solution" name="solution" value={formData} onChange={handleChange} />
//               </>
//             )}
//             {step === 1 && (
//               <>
//                 <Textarea label="Target Market" name="targetMarket" value={formData} onChange={handleChange} />
//                 <Textarea label="Business Model" name="businessModel" value={formData} onChange={handleChange} />
//                 <Textarea label="Go-To-Market Strategy" name="goToMarketStrategy" value={formData} onChange={handleChange} />
//                 <Textarea label="Competitors & Differentiators" name="competition" value={formData} onChange={handleChange} />
//               </>
//             )}
//             {step === 2 && (
//               <>
//                 <Input label="Funding Ask (INR)" name="fundingAsk" value={formData} onChange={handleChange} />
//                 <Textarea label="Use of Funds (ex: Marketing: 30)" name="fundingUse" value={formData} onChange={handleChange} />
//                 <Textarea label="Traction" name="traction" value={formData} onChange={handleChange} />
//                 <Textarea label="Team Members (comma-separated)" name="team" value={formData} onChange={handleChange} />
//               </>
//             )}

//             <div className="flex justify-between pt-4">
//               {step > 0 && (
//                 <button type="button" onClick={prevStep} className="px-4 py-2 rounded bg-gray-400 hover:bg-gray-500">
//                   Back
//                 </button>
//               )}
//               {step < steps.length - 1 ? (
//                 <button type="button" onClick={nextStep} className="ml-auto px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
//                   Next
//                 </button>
//               ) : (
//                 <button type="submit" className="ml-auto px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">
//                   {loading ? <Loader /> : 'Submit Pitch'}
//                 </button>
//               )}
//             </div>
//           </form>

//           {/* Preview Panel */}
//           <div className="bg-white/20 backdrop-blur-lg border border-white/10 dark:bg-zinc-800 rounded-xl p-6 space-y-6 shadow-xl">
//             <h2 className="text-2xl font-semibold text-blue-600">{formData.startupName || 'Your Startup Name'}</h2>
//             <p className="italic text-gray-500 mb-2">{formData.oneLiner || 'Your one-liner goes here'}</p>

//             {/* Stat Widgets */}
//             <div className="grid grid-cols-2 gap-4 text-center">
//               <Widget label="Team Members" value={teamCount} />
//               <Widget label="Funding Ask (₹)" value={formData.fundingAsk || '0'} />
//             </div>

//             {/* Chart */}
//             {fundingChartData.length > 0 && (
//               <div>
//                 <h3 className="font-semibold text-md mb-2">Fund Allocation</h3>
//                 <PieChart width={280} height={250}>
//                   <Pie
//                     data={fundingChartData}
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={80}
//                     label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                     dataKey="value"
//                   >
//                     {fundingChartData.map((_, idx) => (
//                       <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-xl text-center max-w-sm w-full shadow-lg">
//             <h2 className="text-xl font-bold mb-4">Pitch Submitted!</h2>
//             <p className="text-gray-700 mb-4">Thank you for submitting your idea. We’ll notify you when an investor reviews it.</p>
//             <button onClick={() => setShowModal(false)} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // Input & Textarea Components
// function Input({ label, name, value, onChange }) {
//   return (
//     <div>
//       <label className="block text-sm font-medium mb-1">{label}</label>
//       <input
//         type="text"
//         name={name}
//         value={value[name]}
//         onChange={onChange}
//         className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm text-gray-800"
//         required
//       />
//     </div>
//   );
// }

// function Textarea({ label, name, value, onChange }) {
//   return (
//     <div>
//       <label className="block text-sm font-medium mb-1">{label}</label>
//       <textarea
//         rows="3"
//         name={name}
//         value={value[name]}
//         onChange={onChange}
//         className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm text-gray-800 resize-y"
//         required
//       />
//     </div>
//   );
// }

// function Widget({ label, value }) {
//   return (
//     <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 p-4 rounded-lg shadow">
//       <p className="text-sm">{label}</p>
//       <h3 className="text-xl font-bold">{value}</h3>
//     </div>
//   );
// }
