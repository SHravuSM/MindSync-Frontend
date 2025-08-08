// components/StatsCards.jsx
import React from 'react';
import { 
  CurrencyDollarIcon, 
  UsersIcon, 
  ShoppingBagIcon, 
  TrendingUpIcon 
} from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Total Revenue',
    value: '$45,231',
    change: '+12%',
    changeType: 'increase',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Active Users',
    value: '2,834',
    change: '+8%',
    changeType: 'increase',
    icon: UsersIcon,
  },
  {
    name: 'Total Orders',
    value: '1,429',
    change: '+4%',
    changeType: 'increase',
    icon: ShoppingBagIcon,
  },
  {
    name: 'Growth Rate',
    value: '24.5%',
    change: '+2%',
    changeType: 'increase',
    icon: TrendingUpIcon,
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">{stat.name}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <stat.icon className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-green-400 text-sm font-medium">{stat.change}</span>
            <span className="text-gray-400 text-sm ml-2">from last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}
