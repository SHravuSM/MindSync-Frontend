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
import FeedPlus from "./pages/user/FeedPlus";

function App() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!user) {
      console.log(user);
      navigate("/");
    } else {
      console.log(user);
      navigate(`/${user.id}/feed`);
    }
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/adminreg" element={<AdminRegister />} />
      <Route path="/Adashboard" element={<ADashboard />} />

      {/* User routes */}
      <Route
        path="/:id"
        element={
          <ProtectedRoute allowedRoles={["user", "investor"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<Profile />} />
        <Route path="feed" element={<Feed />} />
        <Route path="feed/:id" element={<FeedPlus />} />
        <Route path="pitch" element={<Pitch />} />
        <Route path="createpost" element={<CreatePost />} />
        <Route path="settings" element={<Settings />} />
        <Route path="notifications" element={<Notification />} />
      </Route>
    </Routes>
  );
}

export default App;
