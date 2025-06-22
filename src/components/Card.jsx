import { useEffect, useState } from "react";
import { useAuthStore } from "../context/AuthContext";
import api from "../utils/api1";
import bulb from "../assets/bulb2.png";

const Card = ({ post }) => {
  const { dark, user } = useAuthStore();
  const [Post, setPost] = useState(null);
  const [open, setOpen] = useState();

  const [newComment, setNewComment] = useState("");
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const commentData = {
      uid: user.uid,
      name: user.name,
      photo: user.photo,
      comment: newComment,
    };

    try {
      const res = await api.patch(`/posts/comment/${post._id}`, commentData);
      // console.log(res.data)
      setPost(res.data);
      setNewComment("");
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  useEffect(() => {
    setPost(post)
  }, []);

  const handleLike = async (postId) => {
    try {
      const res = await api.patch(`/posts/like/${postId}`, {
        uid: user.uid,
      });
      setPost(res.data)
    } catch (err) {
      console.error("Failed to like post", err);
    }
  };

  const onNotImpressed = async (postId) => {
    const res = await api.patch(`/posts/notimpression/${postId}`, {
      uid: user.uid
    })
    setPost(res.data)
  }
  const onImpressed = async (postId) => {
    const res = await api.patch(`/posts/impression/${postId}`, {
      uid: user.uid
    })
    setPost(res.data)
  }
  return (
    <>
      {Post && <div className={`lg:max-w-xl relative hover:z-1 hover:scale-105 duration-400 max-w-lg w-full ${!dark && 'lg:hover:mt-3 lg:hover:mb-7'} `}>
        <div
          className={`relative ${dark ? 'bg-white text-black' : 'bg-black text-white'} backdrop-blur-md p-3 pt-1 pb-2 rounded-lg shadow-md transform hover:scale-100 ${!dark && "hover:border-yellow-500 lg:hover:scale-110"} perspective-midrange hover:shadow-xl ${!dark && 'hover:shadow-white/50'} border hover:my-2 border-blue-500/10 transition-all duration-500 ease-in-out cursor-pointer`}
          draggable="true"
        >
          {/* Shine Overlay */}
          <div className="absolute top-0 left-0 w-full h-full rounded-lg pointer-events-none overflow-hidden">
            <div className={`absolute -top-1/2 left-0 w-full h-full bg-gradient-to-br from-black/80 via-transparent to-white transform rotate-0 translate-y-8/12 blur-sm opacity-20`}></div>
          </div>

          {/* Tags & Options */}
          <div className="flex items-center justify-between w-full z-10 relative">
            <span className=" text-lg w-8/12 overflow-x-hidden font-semibold">{Post.title || Post.user.name}</span>
            <div className={`flex items-center text-xs cursor-pointer ${dark ? 'text-black' : 'text-white'}`}>
              on {new Date(Post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
              <button className="bg-transparent ml-3 text-lg hover:text-white transition">
                {/* <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none">
                  <path d="M12 8V12L15 15" strokeWidth="1" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="8" strokeWidth="2" />
                </svg> */}

                <svg viewBox="0 0 41.915 41.916" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current">
                  <path d="M11.214,20.956c0,3.091-2.509,5.589-5.607,5.589C2.51,26.544,0,24.046,0,20.956c0-3.082,2.511-5.585,5.607-5.585 C8.705,15.371,11.214,17.874,11.214,20.956z" />
                  <path d="M26.564,20.956c0,3.091-2.509,5.589-5.606,5.589c-3.097,0-5.607-2.498-5.607-5.589c0-3.082,2.511-5.585,5.607-5.585 C24.056,15.371,26.564,17.874,26.564,20.956z" />
                  <path d="M41.915,20.956c0,3.091-2.509,5.589-5.607,5.589c-3.097,0-5.606-2.498-5.606-5.589c0-3.082,2.511-5.585,5.606-5.585 C39.406,15.371,41.915,17.874,41.915,20.956z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Text */}
          <p className="text-sm mt-1 mb-2 z-10 relative whitespace-pre-wrap">
            {Post.content}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-white/70 z-10 relative">
            <div className="flex gap-4 text-md">


              <div className={`flex items-center text-lg cursor-pointer ${dark ? 'text-black' : 'text-white'}`} onClick={e => setOpen(pre => pre === 'comment' ? '' : 'comment')}>
                <img width='19px' style={{ "marginRight": '3px' }} src={bulb} alt="" />
                {Post.comments.length}
              </div>

              <button
                onClick={() => {
                  handleLike(Post._id)
                }}
                className={`flex focus:outline-none text-lg items-center cursor-pointer ${dark ? 'text-black' : 'text-white'}`}
                aria-label="Toggle Like"
              >
                <svg
                  className={`w-${5} h-${5}  transition-colors duration-200`}
                  style={{ "marginRight": '2px' }}
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  fill={Post.likes.includes(user.uid) ? 'red' : 'none'}
                  stroke={Post.likes.includes(user.uid) ? 'red' : dark ? 'black' : 'white'}
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
                 C13.09 3.81 14.76 3 16.5 3 
                 19.58 3 22 5.42 22 8.5
                 c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                {Post.likes.length}
              </button>
            </div>

            <div className="flex items-center cursor-pointer">
              {Post.impressions.includes(user.uid) ?
                <h2 onClick={e => onNotImpressed(Post._id)} className={`${dark ? 'text-black' : 'text-white'} text-md mr-1 border font-extralight rounded-full p-1 px-2`}>Withdraw</h2>
                :
                <h2 onClick={e => onImpressed(Post._id)} className={`${dark ? 'text-black' : 'text-white'} text-md mr-1 border font-extralight rounded-full p-1 px-2`}>Collab</h2>
              }
              {Array(Post.impressions.length < 4 ? Post.impressions.length : 3)
                .fill(0)
                .map((_, idx) => (
                  <span
                    onClick={e => setOpen(pre => pre === 'collab' ? '' : 'collab')}
                    key={idx}
                    className="h-[30px] w-[30px] rounded-full bg-blue-200 flex items-center justify-center text-sm font-bold border border-white -mr-2 shadow-sm"
                  >
                    <svg
                      className="w-4 h-4 stroke-black"
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
              <span
                onClick={e => { Post.impressions.length > 0 && setOpen(pre => pre === 'collab' ? '' : 'collab') }}
                className="h-[30px] w-[30px] rounded-full bg-orange-200 text-black transform flex items-center justify-center text-xs font-bold shadow-sm">
                {Post.impressions.length}
              </span>
            </div>
          </div>

          {open === 'comment' && (
            <div className={`mt-1 mb-0.5 ${dark ? "text-black" : "text-white"} relative max-h-72 z-10 max-w-2xl`}>
              <h3 className="text-sm font-semibold text-blue-500 mb-3">Suggestions</h3>

              {/* Comments List */}
              <ul className="space-y-4 relative max-h-52 overflow-y-auto pr-1">
                {Post.comments.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400">No comments yet. Be the first!</p>
                ) : (
                  Post.comments.map((e, idx) => (
                    <li key={e._id || idx} className="flex items-start gap-2">
                      <img
                        src={e.photo}
                        alt={e.name}
                        className="w-8 h-8 rounded-full object-cover border border-gray-300"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="text-xs font-medium">{e.name}</p>
                          <p className="text-[8px]">{new Date(e.createdAt).toLocaleString()}</p>
                        </div>
                        <p className="text-sm mt-0 mb-1 z-10 relative whitespace-pre-wrap">{e.comment}</p>
                      </div>
                    </li>
                  ))
                )}
              </ul>

              {/* Add New Comment */}
              <form
                onSubmit={handleCommentSubmit}
                className="mt-4 flex items-start gap-2">
                <img
                  src={user.photo}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover mt-1"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Post
                </button>
              </form>
            </div>
          )}

          {open === 'collab' && (
            <div className={`mt-1 mb-0.5 ${dark ? "text-black" : "text-white"} relative max-h-72 z-10 max-w-2xl`}>
              <h3 className="text-sm font-semibold text-blue-500 mb-3">Suggestions</h3>

              {/* Comments List */}
              <ul className="space-y-4 relative max-h-52 overflow-y-auto pr-1">
                {Post.comments.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400">No comments yet. Be the first!</p>
                ) : (
                  Post.comments.map((e, idx) => (
                    <li key={e._id || idx} className="flex items-start gap-2">
                      <img
                        src={e.photo}
                        alt={e.name}
                        className="w-8 h-8 rounded-full object-cover border border-gray-300"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="text-xs font-medium">{e.name}</p>
                          <p className="text-xs">{new Date(e.createdAt).toLocaleString()}</p>
                        </div>
                        <p className="text-sm mt-0 mb-1 z-10 relative whitespace-pre-wrap">{e.comment}</p>
                      </div>
                    </li>
                  ))
                )}
              </ul>

              {/* Add New Comment */}
              <form
                onSubmit={handleCommentSubmit}
                className="mt-4 flex items-start gap-2">
                <img
                  src={user.photo}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover mt-1"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Post
                </button>
              </form>
            </div>
          )}

        </div>
      </div >}</>
  );
};

export default Card;