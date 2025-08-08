// components/Charts.jsx
import React from 'react';

export default function Charts() {
  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Revenue Analytics</h3>
      
      {/* Simulated Chart */}
      <div className="h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-end justify-center p-4 space-x-2">
        {[40, 70, 45, 80, 65, 90, 75, 85, 60, 95, 70, 85].map((height, index) => (
          <div
            key={index}
            className="bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg w-8 transition-all duration-500 hover:scale-110"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      
      <div className="mt-4 flex justify-between text-sm text-gray-400">
        <span>Jan</span>
        <span>Dec</span>
      </div>
    </div>
  );
}
