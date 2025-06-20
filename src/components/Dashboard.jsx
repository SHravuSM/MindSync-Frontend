import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";
import ProfileCard from "./ProfileCard";
import { useAuthStore } from "../context/AuthContext";

const Dashboard = () => {
  const { state, yes, dark } = useAuthStore();

  return (
    <div className={`flex relative ${dark? 'bg-white' : 'bg-black'} flex-col h-screen w-full`}>
      {!yes && <Navbar />}
      {state && <ProfileCard />}
      <BottomNav />
      <div className="flex-1 relative overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;