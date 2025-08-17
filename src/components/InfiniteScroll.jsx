import { useEffect, useRef } from 'react';
import { useInView } from "react-intersection-observer";
const InfiniteScroll = ({
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  children,
  loader = null,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      {children}
      {hasNextPage && (
        <div ref={ref} className="w-full flex justify-center py-4">
          {isFetchingNextPage ? (
            loader || <div className="text-gray-500">Loading more posts...</div>
          ) : (
            <div className="text-gray-400">Scroll to load more...</div>
          )}
        </div>
      )}
    </>
  );
};

export default InfiniteScroll;
