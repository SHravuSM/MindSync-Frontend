import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { useAuthStore } from "./context/AuthContext";
import { useEffect } from "react";
import Landing from "./pages/Landing";
import AdminRegister from "./components/AdminRegister";
import ADashboard from "./components/Adashboard";
import Profile from "./pages/user/Profile";
import Feed from "./components/Feed";
import Notification from "./components/Notification";
import SignUp from "./components/SignUp";
import Settings from "./components/Settings";
import Login from "./components/Login";

function App() {
  const { user } = useAuthStore();
  // console.log(user)
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      if (user.role == "user" || 'investor') {
        navigate("/dashboard");
      } else if (user.role == "admin") {
        navigate("/Adashboard");
      }
    } else if (!user) {
      navigate("/");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/adminreg" element={<AdminRegister />} />
      <Route path="/Adashboard" element={<ADashboard />} />

      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Feed />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="notifications" element={<Notification />} />
      </Route>
    </Routes>
  );
}
export default App;