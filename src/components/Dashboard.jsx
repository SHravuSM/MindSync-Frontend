import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";
import useThemeStore from "../store/themeStore";

const Dashboard = () => {
  const dark = useThemeStore((s) => s.dark);

  return (
    <div
      className={`flex relative ${
        !dark ? "bg-white" : "bg-black"
      } flex-col h-screen w-full`}
    >
      <Navbar />
      <BottomNav />
      <div className="flex-1 relative overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
