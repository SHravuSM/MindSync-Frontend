import Post from "./Post";
import Pitch from "./Pitch";
import useThemeStore from "../store/themeStore";

export default function CreatePost() {
  const { yes, setYes, dark } = useThemeStore();
  return (
    <div className={`min-h-screen ${dark ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Toggle Switch */}
      <div className="flex justify-center pt-5 pb-4">
        <div className={`relative flex rounded-xl p-1 ${
          !dark ? 'bg-white' : 'bg-black'
        } shadow-lg`}>
          {/* Sliding Background */}
          <div
            className={`absolute top-1 left-1 h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-lg transition-all duration-300 ease-out ${
              yes ? 'translate-x-full' : 'translate-x-0'
            } ${
              dark ? 'bg-orange-600' : 'bg-blue-500'
            } shadow-md`}
          />

          {/* Idea Button */}
          <button
            onClick={() => setYes(false)}
            className={`relative z-10 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
              !yes
                ? 'text-white'
                : !dark
                  ? 'text-black '
                  : 'text-white '
            }`}
          >
            <span className="flex items-center space-x-2">
              <span>Share Idea</span>
            </span>
          </button>

          {/* Pitch Button */}
          <button
            onClick={() => setYes(true)}
            className={`relative z-10 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
              yes
                ? 'text-white'
                : !dark
                  ? 'text-black '
                  : 'text-white '
            }`}
          >
            <span className="flex items-center space-x-2">
              <span>Pitch Startup</span>
            </span>
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
