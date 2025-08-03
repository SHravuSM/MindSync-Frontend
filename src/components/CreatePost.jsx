import Post from "./Post";
import Pitch from "./Pitch";
import useThemeStore from "../store/themeStore";

export default function CreatePost() {
  const { yes, setYes, dark } = useThemeStore();

  return (
    <>
      <div className="flex justify-center mt-8">
        <div
          className={`relative flex items-center justify-around rounded-xl py-1 w-sm sm:w-lg 
                    ${
                      dark
                        ? "bg-white backdrop-blur-lg"
                        : "bg-black backdrop-blur-lg"
                    }`}
        >
          <div
            className={`absolute top-1 left-1 h-[88%] w-1/2 rounded-lg shadow transition-all duration-300 
                        ${yes ? "translate-x-full" : "translate-x-0"}
                        ${
                          dark
                            ? "bg-black shadow-black"
                            : "bg-white shadow-white"
                        }`}
          />

          <button
            onClick={() => setYes(false)}
            className={`z-10 w-1/2 py-2 text-sm sm:text-base  flex justify-around font-semibold transition-colors duration-300 
                        ${
                          !yes
                            ? dark
                              ? "text-white"
                              : "text-black"
                            : dark
                            ? "text-black"
                            : "text-white"
                        }`}
          >
            💡 Idea
          </button>

          <button
            onClick={() => setYes(true)}
            className={`z-10 w-1/2 py-2 flex text-sm text-center justify-around sm:text-base font-semibold transition-colors duration-300 
                        ${
                          yes
                            ? dark
                              ? "text-white"
                              : "text-black"
                            : dark
                            ? "text-black"
                            : "text-white"
                        }`}
          >
            Pitch
          </button>
        </div>
      </div>

      {yes ? <Pitch /> : <Post />}
    </>
  );
}
