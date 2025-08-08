// components/Dashboard.jsx
import React from 'react';
import StatsCards from './StatsCards';
import Charts from './Charts';
import RecentActivity from './RecentActivity';
import TopProducts from './TopProducts';

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <div className="text-sm text-gray-400">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>
      
      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Charts />
        </div>
        <div className="space-y-6">
          <RecentActivity />
          <TopProducts />
        </div>
      </div>
    </div>
  );
}
