// components/PitchFeed.jsx
import { useEffect } from "react";
import PitchCard from "./PitchCard";
import Loader from "./PostLoader";
import useThemeStore from "../store/themeStore";
import InfiniteScroll from "./InfiniteScroll";
import { usePitches } from "../hooks/usePitches";
import SortDropdownButton from "./SortDropdownButton";

const PitchFeed = () => {
  const setYes = useThemeStore((s) => s.setYes);

  const {
    data: pitchesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: pitchesLoading,
    error: pitchesError,
    refetch: refetchPitches,
  } = usePitches();

  console.log(pitchesData);

  const allPitches = pitchesData?.pages?.flatMap((page) => page.pitches) || [];

  useEffect(() => {
    setYes(false);
  }, [setYes]);

  if (pitchesLoading) {
    return (
      <div className="lg:w-xl w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (pitchesError) {
    return <div className="lg:w-xl w-full space-y-1">Error loading pitches: {pitchesError.message}</div>;
  }

  return (
    <div className="feed">
      <SortDropdownButton />
      {/* No tags or sort for pitches based on schema; can be added if schema extended */}
      <InfiniteScroll
        dataLength={allPitches.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={isFetchingNextPage ? <Loader /> : null}
      >
        {allPitches.map((pitch) => (
          <PitchCard key={pitch._id} pitch={pitch} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default PitchFeed;
