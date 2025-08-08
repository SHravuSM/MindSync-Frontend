// components/RecentActivity.jsx
import React from 'react';

const activities = [
  {
    id: 1,
    user: 'John Doe',
    action: 'Created new product',
    time: '2 minutes ago',
    avatar: 'JD',
  },
  {
    id: 2,
    user: 'Jane Smith',
    action: 'Updated user profile',
    time: '5 minutes ago',
    avatar: 'JS',
  },
  {
    id: 3,
    user: 'Mike Johnson',
    action: 'Processed order #1234',
    time: '10 minutes ago',
    avatar: 'MJ',
  },
  {
    id: 4,
    user: 'Sarah Wilson',
    action: 'Added new category',
    time: '15 minutes ago',
    avatar: 'SW',
  },
];

export default function RecentActivity() {
  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-semibold">{activity.avatar}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{activity.user}</p>
              <p className="text-xs text-gray-400 truncate">{activity.action}</p>
            </div>
            <div className="text-xs text-gray-500">{activity.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
