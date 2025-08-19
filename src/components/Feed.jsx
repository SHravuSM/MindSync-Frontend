import { Outlet, useLocation } from "react-router-dom";
import useThemeStore from "../store/themeStore";
import Feed2 from "./Feed2";
import LSidebar from "./LSidebar";
import RSidebar from "./RSidebar";

function Feed() {
  const dark = useThemeStore((s) => s.dark);
  const location = useLocation();

  // Check if we're on a nested route (like /user/feed/postId)
  const isNestedRoute = location.pathname.split("/").length > 3;

  return (
    <div
      className={`flex justify-end lg:pr-4 h-full w-full overflow-y-auto scrollbar-hidden lg:space-x-4 ${
        dark ? "lg:pt-3" : "lg:pt-0"
      } py-1`}
    >
      <LSidebar />

      {/* Show Feed2 only when on main feed route */}
      {!isNestedRoute && <Feed2 />}

      {/* Show nested routes (like individual post) */}
      <Outlet />

      <RSidebar />
    </div>
  );
}

export default Feed;
