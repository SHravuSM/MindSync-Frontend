import { useEffect } from "react";
import Card from "./Card";
import Loader from "./PostLoader";
import useThemeStore from "../store/themeStore";
import InfiniteScroll from "./InfiniteScroll";
import { usePosts } from "../hooks/usePosts";
import { useTags } from "../hooks/useTags";
import { useState } from "react";
import TagsScroller from "./TagsScroller";
import SortDropdownButton from "./SortDropdownButton";

const Feed2 = () => {
  const setYes = useThemeStore((s) => s.setYes);
  const [selectedTag, setSelectedTag] = useState(null);
  const dark = useThemeStore((s) => s.dark);

  // React Query hooks
  const {
    data: postsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: postsLoading,
    error: postsError,
    refetch: refetchPosts,
  } = usePosts(selectedTag);

  const { data, isLoading: tagsLoading, error: tagsError } = useTags();

  const Tags = data?.tags ?? [];

  useEffect(() => {
    setYes(false);
  }, [setYes]);

  const handleTAG = (tag) => {
    const isSameTag = selectedTag === tag;
    setSelectedTag(isSameTag ? null : tag);
  };

  const allPosts = postsData?.pages?.flatMap((page) => page.posts) || [];

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

  const handleTagSelect = (tag) => {
    setSelectedTag(tag); // tag will be null when deselected

    // You can add additional logic here
    if (tag === null) {
      console.log("Tag deselected");
      // Maybe clear filters, reset data, etc.
    } else {
      console.log("Tag selected:", tag);
      // Apply filters, fetch data, etc.
    }
  };

  return (
    <span className="lg:w-xl w-full space-y-1">
      <TagsScroller
        tags={data || []}
        selectedTag={selectedTag}
        onTagSelect={handleTagSelect}
        isLoading={tagsLoading}
        error={tagsError}
        allowDeselect={true} // Enable deselection
      />

      <SortDropdownButton />

      {allPosts.length === 0 ? (
        <div className="lg:flex lg:items-center lg:justify-center lg:min-h-screen text-center text-gray-400 mt-10">
          No posts to show. Be the first to share something!
        </div>
      ) : (
        <div className="h-full p-1 lg:w-xl scrollbar-hidden flex flex-col overflow-y-auto items-center justify-start space-y-1">
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
    </span>
  );
};

export default Feed2;
