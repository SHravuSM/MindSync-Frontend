import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { useEffect } from "react";
import { useAuthContext } from "./context/AuthContext";
import Landing from "./pages/Landing";
import AdminRegister from "./components/AdminRegister";
import ADashboard from "./components/Adashboard";
import Profile from "./pages/user/Profile";
import Feed from "./components/Feed";
import Notification from "./components/Notification";
import Settings from "./components/Settings";

function App() {
  const { user } = useAuthContext();
  // console.log(user)
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      if (user.role == "user") {
        navigate("/");
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
