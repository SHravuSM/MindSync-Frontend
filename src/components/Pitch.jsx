import { useState } from 'react';
import api from '../utils/api1';
import Loader from './Loader';

const Pitch = () => {
  const [loading, setLoading] = useState(false);
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
    <div className="min-h-screen min-w-full">
      <div className="max-w-5xl mx-auto p-4">
        <h1 className="text-3xl sm:text-5xl font-normal text-center text-gray-800 mb-5">
          Startup Pitch Submission
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:flex flex-col gap-6">
          {fields.map(({ label, name, textarea }) => (
            <div className="col-span-1" key={name}>
              <label
                htmlFor={name}
                className="block text-sm font-semibold text-gray-700 mb-2"
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