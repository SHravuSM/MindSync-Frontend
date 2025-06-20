import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useAuthStore } from "../../context/AuthContext";
import BottomNav from "../../components/BottomNav";
import InProfileCard from "../../components/InProfileCard";

const InDashboard = () => {
  const { state, yes } = useAuthStore();
  return (
    <div className="flex relative flex-col h-screen w-full">
      {yes && <Navbar />}
      {state && <InProfileCard />}
      <BottomNav />
      <div className="flex-1 relative overflow-y-auto px-2 ">
        <Outlet />
      </div>
    </div>
  );
};

export default InDashboard;