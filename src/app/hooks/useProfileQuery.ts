import { useQuery } from "@tanstack/react-query";
import { Api } from "@/app/api/api";

export const useProfileQuery = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => Api.getProfile(),
    retry: 0
    // staleTime: 5 * 60 * 1000
  });
};
