// hooks/usePosts.js
import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../utils/api1";

export const usePosts = (selectedTag = null) => {
  return useInfiniteQuery({
    queryKey: ["posts", selectedTag],
    queryFn: async ({ pageParam = 1 }) => {
      // Match your original frontend API calls exactly
      const url = selectedTag
        ? `/user/tags/${selectedTag}?page=${pageParam}&limit=10`
        : `/user/posts/posts?page=${pageParam}&limit=10`; // This matches your original call

      const response = await api.get(url);
      console.log(response.data.posts);
      return response.data; // This will now contain { posts: [...], pagination: {...} }
    },
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasMore
        ? lastPage.pagination.currentPage + 1
        : undefined;
    },
    staleTime: 5 * 60 * 1000,
  });
};
