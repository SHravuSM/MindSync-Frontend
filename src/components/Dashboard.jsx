import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";
import ProfileCard from "./ProfileCard";
import { useAuthStore } from "../context/AuthContext";

const Dashboard = () => {
  const { state, yes } = useAuthStore();
  return (
    <div className="flex relative flex-col h-screen w-full">
      {!yes && <Navbar />}
      {state && <ProfileCard />}
      <BottomNav />
      <div className="flex-1 relative overflow-y-auto px-2 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;