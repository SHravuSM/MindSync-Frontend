// // hooks/usePitches.jsx
// import { useInfiniteQuery } from "@tanstack/react-query";
// import api from "../utils/api1";
// import useThemeStore from "../store/themeStore";
// const top = useThemeStore((s) => s.top);

// export const usePitches = () => {
//   return useInfiniteQuery({
//     queryKey: ["pitches"],
//     queryFn: async ({ pageParam = 1 }) => {
//       console.log("🚀 Fetching page:", pageParam);
//       const url = `/user/posts/pitches?page=${pageParam}&limit=10`;
//       const response = await api.get(url, {
//         top,
//       });
//       console.log(response.data);
//       return response.data;
//     },
//     getNextPageParam: (lastPage) => {
//       const nextPage = lastPage.pagination.hasMore
//         ? lastPage.pagination.currentPage + 1
//         : undefined;
//       return nextPage;
//     },
//     staleTime: 5 * 60 * 1000,
//   });
// };

import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../utils/api1";
import useThemeStore from "../store/themeStore";

export const usePitches = () => {
  const top = useThemeStore((s) => s.top); // ✅ now inside the hook

  return useInfiniteQuery({
    queryKey: ["pitches", top], // ✅ include `top` in key so query refetches when it changes
    queryFn: async ({ pageParam = 1 }) => {
      console.log("🚀 Fetching page:", pageParam, "sort:", top);
      const url = `/user/posts/pitches`;
      const response = await api.get(url, {
        params: { page: pageParam, limit: 10, sort: top }, // ✅ pass as query params
      });
      console.log(response.data);
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasMore
        ? lastPage.pagination.currentPage + 1
        : undefined;
    },
    staleTime: 5 * 60 * 1000,
  });
};
