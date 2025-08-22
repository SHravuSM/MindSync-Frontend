import React, { useEffect, useState } from "react";
import {
  Plus,
  Bookmark,
  Users,
  Calendar,
  Newspaper,
  Crown,
} from "lucide-react";
import { Link } from "react-router-dom";
import Tabs from "./Tabs";
import api from "../utils/api1";
import useAuthStore from "../store/authStore";

const LSidebar = () => {
  const user = useAuthStore((s) => s.user);
  const id = user?.id;
  const [profileData, setProfileData] = useState(null);

  async function me() {
    const res = await api.get("/user/me");
    console.log(res.data);
    setProfileData(res.data);
  }

  useEffect(() => {
    me();
  }, []);

  const navigationItems = [
    {
      icon: <Bookmark size={16} className="text-gray-700" />,
      label: "Saved items",
      href: "/my-items/",
    },
    {
      icon: <Users size={16} className="text-gray-700" />,
      label: "Groups",
      href: "/groups",
    },
    {
      icon: <Newspaper size={16} className="text-gray-700" />,
      label: "Newsletters",
      href: "/newsletters",
    },
    {
      icon: <Calendar size={16} className="text-gray-700" />,
      label: "Events",
      href: "/events",
    },
  ];

  return profileData ? (
    <div
      role="region"
      aria-label="Side Bar"
      className="w-56 hidden lg:block space-y-2"
    >
      {/* Profile Card */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
        {/* Background and Profile Picture */}
        <span
          className="block relative group"
          aria-label={`Background photo of ${profileData.name}`}
        >
          <div
            className="h-16 sm:h-20 bg-gradient-to-r from-blue-400 to-blue-600 bg-cover bg-center"
            style={{ backgroundImage: `url(${profileData.backgroundImage})` }}
          />

          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
            <img
              width="72"
              height="72"
              src={profileData.profileImage}
              loading="lazy"
              alt={`Photo of ${profileData.name}`}
              className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-200"
            />
          </div>
        </span>

        {/* Profile Details */}
        <div className="pt-8 px-4 pb-4">
          <Link to={`/${id}`} className="block group">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                {profileData.name}
              </h3>
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                {profileData.headline}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {profileData.location}
              </p>
            </div>
          </Link>

          {/* Add Experience Button */}
          <button
            className="w-full mt-3 py-2 px-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md transition-colors duration-200 group"
            aria-label="Add Experience"
            type="button"
          >
            <div className="flex items-center justify-center space-x-2">
              <Plus
                size={16}
                className="text-gray-600 group-hover:text-gray-800"
              />
              <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900">
                Experience
              </span>
            </div>
          </button>
        </div>
      </div>

      <Tabs />

      {/* Premium Upsell Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
        <a
          href="/premium/products"
          className="block group"
          aria-label="Premium subscription offer"
        >
          <h3 className="text-xs text-gray-600 font-normal pb-2">
            Accelerate your career
          </h3>
          <div className="flex items-start space-x-2">
            <Crown size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <span className="text-xs font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
              Try Premium for ₹0
            </span>
          </div>
        </a>
      </div>

      {/* Navigation Links Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
        <ul className="space-y-4">
          {navigationItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className="block group"
                aria-label={item.label}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">{item.icon}</div>
                  <span className="text-xs font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                    {item.label}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default LSidebar;
