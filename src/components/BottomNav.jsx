import { Link, useNavigate } from "react-router-dom";
import useThemeStore from "../store/themeStore";
import useAuthStore from "../store/authStore";
import { LogOut } from "lucide-react";

const BottomNav = () => {
  const navigate = useNavigate();

  const user = useAuthStore((s) => s.user);
  const logOut = useAuthStore((s) => s.logOut);

  const dark = useThemeStore((s) => s.dark);
  const setYes = useThemeStore((s) => s.setYes);
  const setState = useThemeStore((s) => s.setState);

  return (
    <div
      className={`bottom-0 bg-transparent bg-none mb-1 fixed flex z-10 w-full items-center justify-center transition-transform duration-500 drop-shadow-xl ${
        dark ? "text-black" : "text-white"
      }`}
    >
      <form className="w-full h-full" action="#">
        <ul
          className={`flex items-center w-full justify-center bg-transparent shadow-lg overflow-hidden lg:space-x-10 space-x-5`}
        >
          <input
            defaultChecked
            name="rad"
            id="choose1"
            type="radio"
            className="hidden peer/one"
          />
          <label htmlFor="choose1">
            <Link to="." className="inline-block">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                height={26}
                width={26}
                xmlns="http://www.w3.org/2000/svg"
                className="w-[40px] h-[40px] opacity-80 cursor-pointer px-1 py-1 transition-all duration-200 peer-checked/one:text-blue-500 hover:mt-[-4px] hover:opacity-100 hover:text-blue-500"
              >
                <path
                  d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                  strokeWidth={2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  stroke="currentColor"
                />
              </svg>
            </Link>
          </label>

          <input
            name="rad"
            id="choose2"
            type="radio"
            className="hidden peer/two"
          />
          <label htmlFor="choose2">
            <Link to="profile" className="inline-block">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                height={26}
                width={26}
                xmlns="http://www.w3.org/2000/svg"
                className="w-[40px] h-[40px] opacity-80 cursor-pointer px-1 py-1 transition-all duration-200 peer-checked/two:text-blue-500 hover:mt-[-4px] hover:opacity-100 hover:text-blue-500"
              >
                <path
                  d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  strokeWidth={2}
                  strokeLinecap="round"
                  stroke="currentColor"
                />
              </svg>
            </Link>
          </label>

          {user?.role === "user" && (
            <>
              <input
                name="rad"
                id="choose3"
                type="radio"
                className="hidden peer/three"
              />
              <label htmlFor="choose3">
                <button
                  onClick={setYes}
                  className="text-xl flex items-center pb-1 justify-center"
                >
                  <Link to="createpost">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      height={26}
                      width={26}
                      className="w-[40px] h-[40px] opacity-80 cursor-pointer px-1 py-1 transition-all duration-200 peer-checked/three:text-blue-500 hover:mt-[-4px] hover:opacity-100 hover:text-blue-500"
                    >
                      <path
                        d="M4 20h4.586a1 1 0 0 0 .707-.293l10.414-10.414a2 2 0 0 0 0-2.828l-2.172-2.172a2 2 0 0 0-2.828 0L4.293 14.707A1 1 0 0 0 4 15.414V20Z"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.5 6.5l4 4"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </button>
              </label>
            </>
          )}

          <input
            name="rad"
            id="choose4"
            type="radio"
            className="hidden peer/four"
          />
          <label htmlFor="choose4">
            <Link className="inline-block peer-checked/four:text-blue-500">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                height={26}
                width={26}
                xmlns="http://www.w3.org/2000/svg"
                className="w-[40px] h-[40px] opacity-80 cursor-pointer px-1 py-1 transition-all duration-200 peer-checked/four:text-blue-500 hover:mt-[-4px] hover:opacity-100 hover:text-blue-500"
              >
                <path
                  d="m17 21-5-4-5 4V3.889a.92.92 0 0 1 .244-.629.808.808 0 0 1 .59-.26h8.333a.81.81 0 0 1 .589.26.92.92 0 0 1 .244.63V21Z"
                  strokeWidth={2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  stroke="currentColor"
                />
              </svg>
            </Link>
          </label>

          <input
            name="rad"
            id="choose5"
            type="radio"
            className="hidden peer/five"
          />
          <label htmlFor="choose5">
            <button
              onClick={(e) => {
                e.preventDefault();
                setState();
              }}
              className="inline-block"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                height={26}
                width={26}
                xmlns="http://www.w3.org/2000/svg"
                className="w-[40px] h-[40px] opacity-80 cursor-pointer px-1 py-1 transition-all duration-200 peer-checked/five:text-blue-500 hover:mt-[-4px] hover:opacity-100 hover:text-blue-500"
              >
                <path
                  d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  strokeWidth={2}
                  strokeLinejoin="round"
                  strokeLinecap="square"
                  stroke="currentColor"
                />
              </svg>
            </button>
          </label>
          <button
            onClick={(e) => {
              e.preventDefault();
              logOut();
              navigate("/");
            }}
          >
            <LogOut />
          </button>
        </ul>
      </form>
    </div>
  );
};

export default BottomNav;
