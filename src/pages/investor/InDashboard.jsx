import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import BottomNav from "../../components/BottomNav";
import useThemeStore from "../../store/themeStore";

const InDashboard = () => {
  const { state, yes } = useThemeStore();
  return (
    <div className="flex relative flex-col h-screen w-full">
      <Navbar />
      <BottomNav />
      <div className="flex-1 relative overflow-y-auto px-2 ">
        <Outlet />
      </div>
    </div>
  );
};

export default InDashboard;
