import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import api1 from "../../utils/api1";
import useAuthStore from "../../store/authStore";

function EditProfileModal({ user, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    location: user?.location || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const updatedData = {
        uid: user.uid,
        name: formData.name,
        bio: formData.bio,
        location: formData.location,
      };

      const res = await api1.put("/user/update", updatedData);
      console.log("Updated Profile:", res.data);

      onUpdate(res.data.user); // Update context or local state
      onClose();
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Profile</h2>

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="3"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm bg-gray-300 hover:bg-gray-400 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main Profile Component
export default function Profile() {
  const { user, setUser } = useAuthStore(); // Make sure your context supports setUser
  const [editing, setEditing] = useState(false);
  const { setState } = useAuthStore();

  useEffect(() => {
    setState(false)
  }, [])

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser); // Update context
  };

  return (
    <div className="mx-auto mt-4 mb-4 p-6 bg-white shadow-2xl rounded-2xl max-w-3xl">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={user?.photo || "/default-avatar.png"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
        />

        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold text-gray-800">
            {user?.name || "Unnamed User"}
          </h1>
          {/* <p className="text-gray-500">@{user?.username || "username"}</p> */}
          <p className="mt-2 text-sm text-gray-700 max-w-md">
            {user?.bio || "Edit profile to add bio."}
          </p>

          <div className="mt-3 space-y-1 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-blue-500" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-500" />
              <span>{user?.location}</span>
            </div>
            {/* <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-blue-500" />
              <span>Joined {user?.joinedAt || "Recently"}</span>
            </div> */}
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setEditing(true)}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            <FiEdit3 />
            Edit Profile
          </button>
        </div>
      </div>

      {user && <div className="flex items-center justify-between">
        <div className="text-center text-indigo-500 m-2 border-2 w-full font-semibold rounded-full">Ideas</div>
        <div className="text-center text-blue-600 m-2 border-2 w-full font-semibold rounded-full">
          Pitch deck
        </div>
      </div>}

      {/* Modal */}
      {editing && (
        <EditProfileModal
          user={user}
          onClose={() => setEditing(false)}
          onUpdate={handleUpdateUser}
        />
      )}
    </div>
  );
} []