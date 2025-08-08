// components/Sidebar.jsx
import React from 'react';
import { 
  HomeIcon, 
  ChartBarIcon, 
  UsersIcon, 
  CogIcon,
  ShoppingBagIcon,
  DocumentTextIcon,
  BellIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, href: '#', current: true },
  { name: 'Analytics', icon: ChartBarIcon, href: '#', current: false },
  { name: 'Users', icon: UsersIcon, href: '#', current: false },
  { name: 'Products', icon: ShoppingBagIcon, href: '#', current: false },
  { name: 'Orders', icon: DocumentTextIcon, href: '#', current: false },
  { name: 'Payments', icon: CreditCardIcon, href: '#', current: false },
  { name: 'Notifications', icon: BellIcon, href: '#', current: false },
  { name: 'Settings', icon: CogIcon, href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 z-40 w-64">
            <SidebarContent />
          </div>
        </div>
      )}
      
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="w-64">
          <SidebarContent />
        </div>
      </div>
    </>
  );
}

function SidebarContent() {
  return (
    <div className="flex flex-col h-full backdrop-blur-xl bg-white/10 border-r border-white/20">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 px-4 border-b border-white/20">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <span className="text-white text-xl font-bold">AdminPro</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={classNames(
              item.current
                ? 'bg-white/20 text-white'
                : 'text-gray-300 hover:bg-white/10 hover:text-white',
              'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200'
            )}
          >
            <item.icon
              className={classNames(
                item.current ? 'text-white' : 'text-gray-400 group-hover:text-white',
                'mr-3 flex-shrink-0 h-5 w-5'
              )}
            />
            {item.name}
          </a>
        ))}
      </nav>

      {/* User profile */}
      <div className="p-4 border-t border-white/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">John Doe</p>
            <p className="text-xs text-gray-400 truncate">john@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
