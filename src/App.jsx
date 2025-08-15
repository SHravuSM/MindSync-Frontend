import { use, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import AdminRegister from "./components/AdminRegister";
import ADashboard from "./components/Adashboard";

import Landing from "./pages/Landing";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

import Dashboard from "./components/Dashboard";
import Feed from "./components/Feed";
import Profile from "./pages/user/Profile";
import Notification from "./components/Notification";
import Settings from "./components/Settings";
import CreatePost from "./components/CreatePost";
import Pitch from "./components/Pitch";

import InDashboard from "./pages/investor/InDashboard";
import InFeed from "./pages/investor/InFeed";
import InProfile from "./pages/investor/InProfile";
import InNotification from "./pages/investor/InNotification";
import ProtectedRoute from "./utils/ProtectedRoute";
import useAuthStore from "./store/authStore";

function App() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!user) {
      navigate("/");
      console.log(user);
    } else if (user.role === "user") {
      console.log(user);
      navigate(`/user/${user.id}`);
    } else if (user.role === "investor") {
      console.log(user);
      navigate(`/investor/${user.id}`);
    }
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/adminreg" element={<AdminRegister />} />
      <Route path="/Adashboard" element={<ADashboard />} />

      {/* Investor routes */}
      <Route
        path="/investor/:id"
        element={
          <ProtectedRoute allowedRoles={["investor"]}>
            <InDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<InFeed />} />
        <Route path="profile" element={<InProfile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="notifications" element={<InNotification />} />
      </Route>

      {/* User routes */}
      <Route
        path="/user/:id"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<Feed />} />
        <Route path="profile" element={<Profile />} />
        <Route path="pitch" element={<Pitch />} />
        <Route path="createpost" element={<CreatePost />} />
        <Route path="settings" element={<Settings />} />
        <Route path="notifications" element={<Notification />} />
      </Route>
    </Routes>
  );
}

export default App;
