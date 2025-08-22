// hooks/useTags.js
import { useQuery } from "@tanstack/react-query";
import api from "../utils/api1";

export const useTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const response = await api.get("/user/posts/tags/all");
      return response.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
