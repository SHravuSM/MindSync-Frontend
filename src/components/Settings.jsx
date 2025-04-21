import React, { useState } from "react";
import { reauthenticateWithPopup, deleteUser } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import api from "../utils/api1";

export default function Settings() {
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        const confirmation = window.confirm(
            "Are you sure you want to permanently delete your account and all your data? This cannot be undone."
        );

        if (!confirmation) return;

        setIsDeleting(true);
        setError(null);

        try {
            const user = auth.currentUser;

            // 🔐 Step 1: Reauthenticate the user
            await reauthenticateWithPopup(user, provider);
            console.log("User reauthenticated");

            // 🧹 Step 2: Delete user data from your backend (e.g., posts, profile)
            await api.delete("/posts/user");     // Deletes all user's posts

            // 🚫 Step 3: Delete user from Firebase Auth
            await deleteUser(user);
            console.log("Firebase user deleted");

            // 🚀 Step 4: Navigate to homepage or goodbye screen
            navigate("/");
        } catch (err) {
            console.error("Error during account deletion:", err);
            setError("Something went wrong during deletion. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto text-center">
            <h2 className="text-xl font-semibold mb-4">Delete Account</h2>
            <p className="text-gray-600 mb-4">
                Deleting your account will remove all your posts, profile, and data. This action is irreversible.
            </p>

            {error && (
                <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
                    {error}
                </div>
            )}

            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`px-6 py-2 rounded-md font-semibold ${isDeleting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 text-white hover:bg-red-700"
                    }`}
            >
                {isDeleting ? "Deleting..." : "Permanently Delete My Account"}
            </button>
        </div>
    );
}
