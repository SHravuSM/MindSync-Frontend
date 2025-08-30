import Post from "./Post";
import Pitch from "./Pitch";
import useThemeStore from "../store/themeStore";

export default function CreatePost() {
  const { yes, setYes, dark } = useThemeStore();
  return (
    <div className={`min-h-screen ${dark ? "bg-black" : "bg-gray-50"}`}>
      {/* Toggle Switch */}
      <div className="flex justify-center pt-5 pb-4">
        <div
          className={`relative flex rounded-xl p-1 ${
            !dark ? "bg-white" : "bg-black"
          } shadow-lg`}
          role="tablist"
          aria-label="Content type selector"
        >
          {/* Sliding Background */}
          <div
            className={`absolute top-1 left-1 h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-lg transition-all duration-300 ease-out ${
              yes ? "translate-x-[calc(100%+0px)]" : "translate-x-0"
            } ${dark ? "bg-orange-600" : "bg-blue-500"} shadow-md`}
          />

          {/* Share Idea Button */}
          <button
            onClick={() => setYes(false)}
            className={`relative z-10 flex items-center justify-center px-8 py-3 text-sm font-medium rounded-lg transition-all duration-300 min-w-0 flex-1 whitespace-nowrap ${
              !yes
                ? "text-white"
                : dark
                ? "text-white hover:text-gray-300"
                : "text-gray-700 hover:text-black"
            }`}
            role="tab"
            aria-selected={!yes}
            aria-controls="content-panel"
          >
            <span>Share Idea</span>
          </button>

          {/* Pitch Button */}
          <button
            onClick={() => setYes(true)}
            className={`relative z-10 flex items-center justify-center px-8 py-3 text-sm font-medium rounded-lg transition-all duration-300 min-w-0 flex-1 whitespace-nowrap ${
              yes
                ? "text-white"
                : dark
                ? "text-white hover:text-gray-300"
                : "text-gray-700 hover:text-black"
            }`}
            role="tab"
            aria-selected={yes}
            aria-controls="content-panel"
          >
            <span>Pitch</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="transition-all duration-500 ease-in-out">
        {yes ? <Pitch /> : <Post />}
      </div>
    </div>
  );
}
