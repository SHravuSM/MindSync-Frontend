import useThemeStore from "../store/themeStore";
import Feed2 from "./Feed2";
import LSidebar from "./LSidebar";
import RSidebar from "./RSidebar";

function Feed() {
  const dark = useThemeStore(s=>s.dark);
  return (
    <div
      className={`flex justify-end lg:pr-4 h-full w-full overflow-y-auto scrollbar-hidden lg:space-x-4 ${dark ? "lg:pt-3" : 'lg:pt-0'} py-1`}
    >
      <LSidebar />
      <Feed2 />
      <RSidebar />
    </div>
  );
}

export default Feed;
