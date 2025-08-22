import { useEffect } from "react";
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
import ProtectedRoute from "./utils/ProtectedRoute";
import useAuthStore from "./store/authStore";
import FeedPlus from "./pages/user/FeedPlus";
import SearchBar from "./components/Search";
import PitchFeed from "./components/PitchFeed";

function App() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logOut = useAuthStore((s) => s.logOut);

  useEffect(() => {
    if (!user) {
      console.log(user);
      logOut();
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
        <Route path="search" element={<SearchBar />} />
        <Route path="feed" element={<Feed />}>
          <Route path=":postId" element={<FeedPlus />} />
          <Route path="pitches" element={<PitchFeed />} />
        </Route>
        <Route path="pitch" element={<Pitch />} />
        <Route path="createpost" element={<CreatePost />} />
        <Route path="settings" element={<Settings />} />
        <Route path="notifications" element={<Notification />} />
      </Route>
    </Routes>
  );
}

export default App;
