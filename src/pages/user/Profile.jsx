import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import api from "../../utils/api1";

export default function Profile() {
  const { user } = useAuthContext();

  return (
    <div className=" mx-auto mt-2 mb-2 p-6 bg-white shadow-lg rounded-2xl">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={user?.photo || "/default-avatar.png"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold">{user?.name || "Unnamed User"}</h1>
          <p className="text-gray-500">@{user?.username || "username"}</p>
          <p className="mt-2 text-sm text-gray-700">
            {user?.bio || "This user hasn't written a bio yet."}
          </p>
          <button className="mt-4 px-4 py-2 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700">
            Edit Profile
          </button>
        </div>
      </div>

    </div>
  );
}
