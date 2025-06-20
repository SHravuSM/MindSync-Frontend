import { useEffect } from "react";
import { useAuthStore } from "./context/AuthContext";
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


function App() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    user ? user.role === 'creator' ? navigate("/dashboard") : navigate(`/${user.name}`) : null
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="/adminreg" element={<AdminRegister />} />
      <Route path="/Adashboard" element={<ADashboard />} />

      <Route path="/:username" element={<InDashboard />}>
        <Route index element={<InFeed />} />
        <Route path="profile" element={<InProfile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="notifications" element={<InNotification />} />
      </Route>

      <Route path="/dashboard" element={<Dashboard />}>
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