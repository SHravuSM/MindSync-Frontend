// import { useEffect, useState } from "react";
// import api from "../utils/api1";
// import Card from "./Card";
// import Loader from "./PostLoader";
// import useThemeStore from "../store/themeStore";

// const Feed = () => {
//   const setYes = useThemeStore((s) => s.setYes);
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [tags, setTags] = useState([]);
//   const [selectedTag, setSelectedTag] = useState(null);

//   useEffect(() => {
//     setYes(false);
//   }, []);

//   const handleTAG = async (tag) => {
//     const isSameTag = selectedTag === tag;
//     setSelectedTag(isSameTag ? null : tag);

//     try {
//       if (isSameTag) {
//         fetchPosts();
//       } else {
//         const res = await api.get(`/tags/${tag}`);
//         setPosts(res.data);
//       }
//     } catch (err) {
//       console.error("Failed to load posts", err);
//     }
//   };

//   const fetchPosts = async () => {
//     try {
//       const res = await api.get("/posts/posts");
//       console.log(res.data);
//       setPosts(res.data);
//     } catch (err) {
//       console.error("Failed to load posts", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const fetchTags = async () => {
//       try {
//         const res = await api.get("/tags/all");
//         setTags(res.data);
//       } catch (err) {
//         console.error("Failed to fetch tags:", err);
//       }
//     };

//     fetchTags();
//   }, []);

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   return (
//     <div className="flex flex-col h-full items-center justify-start w-full p-0">
//       <div className="px-2 py-1 mt-0 w-full rounded-sm overflow-x-auto scrollbar-hide flex gap-2">
//         {tags.map((tag, index) => (
//           <span
//             key={index}
//             onClick={() => handleTAG(tag)}
//             className={`shrink-0 text-sm font-medium px-4 py-1.5 rounded-full shadow cursor-pointer transition-colors duration-200 ${
//               selectedTag === tag
//                 ? "bg-blue-600 text-white"
//                 : "bg-white text-gray-800 hover:bg-gray-100"
//             }`}
//           >
//             #{tag}
//           </span>
//         ))}
//       </div>

//       {loading ? (
//         <div className=" absolute left-1/2 top-52 text-center text-gray-500">
//           <Loader />
//         </div>
//       ) : posts.length === 0 ? (
//         <div className="lg:flex lg:items-center lg:justify-center lg:min-h-screen text-center text-gray-400 mt-10">
//           No posts to show. Be the first to share something!
//         </div>
//       ) : (
//         <div className="h-full mt-0 p-0 pb-12 lg:pb-14 w-full scrollbar-hidden flex flex-col overflow-y-auto items-center justify-start space-y-1 ">
//           {posts.map((post) => (
//             <Card key={post._id} post={post} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Feed;



// components/Feed.js
import { useEffect } from "react";
import Card from "./Card";
import Loader from "./PostLoader";
import useThemeStore from "../store/themeStore";
import InfiniteScroll from "./InfiniteScroll";
import { usePosts } from "../hooks/usePosts";
import { useTags } from "../hooks/useTags";
import { useState } from "react";

const Feed = () => {
  const setYes = useThemeStore((s) => s.setYes);
  const [selectedTag, setSelectedTag] = useState(null);
  
  // React Query hooks
  const {
    data: postsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: postsLoading,
    error: postsError,
    refetch: refetchPosts
  } = usePosts(selectedTag);

const {
  data,
  isLoading: tagsLoading,
  error: tagsError
} = useTags();

const Tags = data?.tags ?? [];

  useEffect(() => {
    setYes(false);
  }, [setYes]);

  const handleTAG = (tag) => {
    const isSameTag = selectedTag === tag;
    setSelectedTag(isSameTag ? null : tag);
  };

  const allPosts = postsData?.pages?.flatMap(page => page.posts) || [];

  if (postsLoading) {
    return (
      <div className="flex flex-col h-full items-center justify-start w-full p-0">
        <div className="absolute left-1/2 top-52 text-center text-gray-500">
          <Loader />
        </div>
      </div>
    );
  }

  if (postsError) {
    return (
      <div className="flex flex-col h-full items-center justify-center w-full p-4">
        <div className="text-center text-red-500">
          Error loading posts. Please try again.
          <button 
            onClick={() => refetchPosts()}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full items-center justify-start w-full p-0">
      {/* Tags Section */}
      <div className="px-2 py-1 mt-0 w-full rounded-sm overflow-x-auto scrollbar-hide flex gap-2">
        {tagsLoading ? (
          <div className="text-gray-500">Loading tags...</div>
        ) : tagsError ? (
          <div className="text-red-500">Error loading tags</div>
        ) : (
          Tags != null && Tags.map((tag, index) => (
            <span
              key={index}
              onClick={() => handleTAG(tag)}
              className={`shrink-0 text-sm font-medium px-4 py-1.5 rounded-full shadow cursor-pointer transition-colors duration-200 ${
                selectedTag === tag
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
            >
              #{tag}
            </span>
          ))
        )}
      </div>

      {/* Posts Section */}
      {allPosts.length === 0 ? (
        <div className="lg:flex lg:items-center lg:justify-center lg:min-h-screen text-center text-gray-400 mt-10">
          No posts to show. Be the first to share something!
        </div>
      ) : (
        <div className="h-full mt-0 p-0 pb-12 lg:pb-14 w-full scrollbar-hidden flex flex-col overflow-y-auto items-center justify-start space-y-1">
          <InfiniteScroll
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            loader={<Loader />}
          >
            {allPosts.map((post) => (
              <Card key={post._id} post={post} />
            ))}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default Feed;