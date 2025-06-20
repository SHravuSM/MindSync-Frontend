import { useState } from "react";
import { useAuthStore } from "../context/AuthContext";

const Card = ({ post, handleLike }) => {
  const { dark } = useAuthStore();
  const [liked, setLiked] = useState(false);

  return (
    <div className={`lg:max-w-xl max-w-sm w-full ${!dark && 'lg:hover:my-5'} mb-2`}>
      <div
        className={`relative ${dark ? 'bg-white text-black' : 'bg-black text-white'} backdrop-blur-md p-4 rounded-lg shadow-md transform hover:scale-100 ${!dark && "hover:border-yellow-500 lg:hover:scale-110"} perspective-midrange hover:shadow-2xl ${!dark && 'hover:shadow-white/50'} border border-blue-300/30 transition-all duration-500 ease-in-out cursor-pointer`}
        draggable="true"
      >
        {/* Shine Overlay */}
        <div className="absolute top-0 left-0 w-full h-full rounded-lg pointer-events-none overflow-hidden">
          <div className={`absolute -top-1/2 left-0 w-full h-full bg-gradient-to-br from-black/80 via-transparent to-white transform rotate-0 translate-y-8/12 blur-sm opacity-20`}></div>
        </div>

        {/* Tags & Options */}
        <div className="flex items-center justify-between w-full z-10 relative">
          <span className="rounded-full px-3 py-1 text-xs bg-blue-500 shadow-md">{post.title || post.user.name}</span>
          <button className="bg-transparent border-0 text-lg hover:text-white transition">
            <svg viewBox="0 0 41.915 41.916" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current">
              <path d="M11.214,20.956c0,3.091-2.509,5.589-5.607,5.589C2.51,26.544,0,24.046,0,20.956c0-3.082,2.511-5.585,5.607-5.585 C8.705,15.371,11.214,17.874,11.214,20.956z" />
              <path d="M26.564,20.956c0,3.091-2.509,5.589-5.606,5.589c-3.097,0-5.607-2.498-5.607-5.589c0-3.082,2.511-5.585,5.607-5.585 C24.056,15.371,26.564,17.874,26.564,20.956z" />
              <path d="M41.915,20.956c0,3.091-2.509,5.589-5.607,5.589c-3.097,0-5.606-2.498-5.606-5.589c0-3.082,2.511-5.585,5.606-5.585 C39.406,15.371,41.915,17.874,41.915,20.956z" />
            </svg>
          </button>
        </div>

        {/* Text */}
        <p className="text-sm mt-4 mb-4 z-10 relative">
          {post.content}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-white/70 z-10 relative">
          <div className="flex gap-4">
            <div className={`flex items-center cursor-pointer ${dark ? 'text-black' : 'text-white'}`}>
              <svg className="w-4 h-4 mr-0.5 stroke-current" viewBox="0 0 24 24" fill="none">
                <path d="M12 8V12L15 15" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="12" r="9" strokeWidth="2" />
              </svg>
              Feb 24
            </div>

            <div className={`flex items-center cursor-pointer ${dark ? 'text-black' : 'text-white'}`}>
              <svg className={`w-4 h-4 mr-0.5 stroke-current`} viewBox="0 0 24 24" fill="none">
                <path
                  d="M16 10H16.01M12 10H12.01M8 10H8.01M3 10C3 4.64706 5.11765 3 12 3C18.8824 3 21 4.64706 21 10C21 15.3529 18.8824 17 12 17C11.6592 17 11.3301 16.996 11.0124 16.9876L7 21V16.4939C4.0328 15.6692 3 13.7383 3 10Z"
                  strokeWidth="1.5"
                // strokeLinecap="round"
                // strokeLinejoin="round"
                />
              </svg>
              18
            </div>

            {/* <div className={`flex items-center cursor-pointer ${dark ? 'text-black' : 'text-black'}`}> */}
            <button
              onClick={() => {
                handleLike(post._id)
                setLiked(pre => !pre)
              }}
              className={`flex focus:outline-none items-center cursor-pointer ${dark ? 'text-black' : 'text-white'}`}
              aria-label="Toggle Like"
            >
              <svg
                className={`w-${4} h-${4} mr-0.5 transition-colors duration-200`}
                viewBox="0 0 24 24"
                strokeWidth="1.2"
                fill={liked ? 'red' : 'none'}
                stroke={liked ? 'red' : dark ? 'black' : 'white'}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
                 C13.09 3.81 14.76 3 16.5 3 
                 19.58 3 22 5.42 22 8.5
                 c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              {post.likes.length}
            </button>
            {/* 7 */}
            {/* </div> */}
          </div>

          {/* Viewers */}
          <div className="flex items-center cursor-pointer">
            <h2 className={`${dark ? 'text-black' : 'text-white'} text-md mr-1 border font-extralight rounded-full p-1 px-2`}>Collab</h2>
            {Array(3)
              .fill(0)
              .map((_, idx) => (
                <span
                  key={idx}
                  className="h-[30px] w-[30px] rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold border border-white -mr-2 shadow-sm"
                >
                  <svg
                    className="w-4 h-4 stroke-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z"
                      strokeWidth="2"
                    />
                    <path
                      d="M3 21C3.95728 17.9237 6.41998 17 12 17C17.58 17 20.0427 17.9237 21 21"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              ))}
            <span className="h-[30px] w-[30px] rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold border border-white shadow-sm">
              +20
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
