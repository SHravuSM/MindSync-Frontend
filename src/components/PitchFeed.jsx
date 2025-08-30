// // components/PitchFeed.jsx
// import { useEffect } from "react";
// import PitchCard from "./PitchCard";
// import Loader from "./PostLoader";
// import useThemeStore from "../store/themeStore";
// import InfiniteScroll from "./InfiniteScroll";
// import { usePitches } from "../hooks/usePitches";
// import SortDropdownButton from "./SortDropdownButton";

// const PitchFeed = () => {
//   const setYes = useThemeStore((s) => s.setYes);

//   const {
//     data: pitchesData,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isLoading: pitchesLoading,
//     error: pitchesError,
//     refetch: refetchPitches,
//   } = usePitches();

//   // console.log(pitchesData);

//   // const allPitches = pitchesData?.pages?.flatMap((page) => page.pitches) || [];
//   const allPitches = pitchesData?.pages?.flatMap((page) => page.data) || [];
//   console.log(allPitches);

//   useEffect(() => {
//     setYes(false);
//   }, [setYes]);

//   if (pitchesLoading) {
//     return (
//       <div className="w-full h-screen lg:max-w-xl flex items-center justify-center">
//         <Loader />
//       </div>
//     );
//   }

//   if (pitchesError) {
//     return (
//       <div className="lg:max-w-xl w-full space-y-1">
//         Error loading pitches: {pitchesError.message}
//       </div>
//     );
//   }

//   return (
//     <div className="feed w-full lg:max-w-xl px-2">
//       <SortDropdownButton />
//       <div
//         className="lg:max-h-[90%] border lg:min-h-[85%] lg:w-xl scrollbar-hidden flex flex-col overflow-y-auto items-center justify-start space-y-1"
//         style={{
//           maskImage: "linear-gradient(to bottom, black 96%, transparent 100%)",
//           WebkitMaskImage:
//             "linear-gradient(to bottom, black 96%, transparent 100%)",
//         }}
//       >
//         <InfiniteScroll
//           dataLength={allPitches.length}
//           next={fetchNextPage}
//           hasMore={hasNextPage}
//           loader={isFetchingNextPage ? <Loader /> : null}
//         >
//           {allPitches.map((pitch) => (
//             <PitchCard key={pitch._id} pitch={pitch} />
//           ))}
//         </InfiniteScroll>
//       </div>
//     </div>
//   );
// };

// export default PitchFeed;

import { useEffect, useRef, useCallback } from "react";
import PitchCard from "./PitchCard";
import Loader from "./PostLoader";
import useThemeStore from "../store/themeStore";
import { usePitches } from "../hooks/usePitches";
import SortDropdownButton from "./SortDropdownButton";

const PitchFeed = () => {
  const setYes = useThemeStore((s) => s.setYes);
  const scrollRef = useRef(null);

  const {
    data: pitchesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: pitchesLoading,
    error: pitchesError,
  } = usePitches();

  const allPitches = pitchesData?.pages?.flatMap((page) => page.data) || [];

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container || !hasNextPage || isFetchingNextPage) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const threshold = 100; // Trigger when 100px from bottom

    if (scrollTop + clientHeight >= scrollHeight - threshold) {
      console.log("🚀 Triggering fetchNextPage");
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setYes(false);
  }, [setYes]);

  if (pitchesLoading) {
    return (
      <div className="w-full h-screen lg:max-w-xl flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (pitchesError) {
    return (
      <div className="lg:max-w-xl w-full space-y-1">
        Error loading pitches: {pitchesError.message}
      </div>
    );
  }

  return (
    <div className="feed w-full lg:max-w-xl">
      <SortDropdownButton />
      <div
        ref={scrollRef}
        className="h-[85vh] overflow-y-auto scrollbar-hidden"
        style={{
          maskImage: "linear-gradient(to bottom, black 96%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 96%, transparent 100%)",
        }}
      >
        <div className="space-y-1">
          {allPitches.map((pitch) => (
            <PitchCard key={pitch._id} pitch={pitch} />
          ))}
          {isFetchingNextPage && (
            <div className="flex justify-center py-4">
              <Loader />
            </div>
          )}
          {!hasNextPage && allPitches.length > 0 && (
            <div className="text-center py-4 text-gray-500">
              <b>You have seen all pitches!</b>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PitchFeed;
