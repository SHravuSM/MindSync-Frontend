import Feed2 from "./Feed2";
import LSidebar from "./LSidebar";
import RSidebar from "./RSidebar";

function Feed() {
  return (
    <div
      className={`flex justify-center h-full w-full overflow-y-auto scrollbar-hidden lg:space-x-4 lg:pt-3 py-1`}
    >
      <LSidebar />
      <Feed2 />
      <RSidebar />
    </div>
  );
}

export default Feed;
