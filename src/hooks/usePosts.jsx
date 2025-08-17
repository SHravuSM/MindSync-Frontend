import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../utils/api1";
export const usePosts = (selectedTag = null) => {
  return useInfiniteQuery({
    queryKey: ["posts", selectedTag],
    queryFn: async ({ pageParam = 1 }) => {
      console.log("🚀 Fetching page:", pageParam);
      const url = selectedTag
        ? `/user/posts/tags/${selectedTag}?page=${pageParam}&limit=10`
        : `/user/posts/posts?page=${pageParam}&limit=10`;

      const response = await api.get(url);
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pagination.hasMore
        ? lastPage.pagination.currentPage + 1
        : undefined;
      return nextPage;
    },
    staleTime: 5 * 60 * 1000,
  });
};
