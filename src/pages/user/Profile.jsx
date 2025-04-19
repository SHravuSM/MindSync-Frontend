import React from "react";
import { useAuthContext } from "../../context/AuthContext";

export default function Profile() {
  const { user } = useAuthContext();

  const posts = [
    { id: 1, content: "Excited to start building cool things 🚀" },
    { id: 2, content: "Loving this new project I’m working on!" },
  ];

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

      {/* Stats */}
      <div className="flex justify-around mt-8 text-center">
        <div>
          <p className="text-xl font-bold">42</p>
          <p className="text-gray-500 text-sm">Posts</p>
        </div>
        <div>
          <p className="text-xl font-bold">124</p>
          <p className="text-gray-500 text-sm">Followers</p>
        </div>
        <div>
          <p className="text-xl font-bold">87</p>
          <p className="text-gray-500 text-sm">Following</p>
        </div>
      </div>

      {/* Posts */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <p className="text-gray-800">{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
