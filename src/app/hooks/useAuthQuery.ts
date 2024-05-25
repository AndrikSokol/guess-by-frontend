import { useQuery } from "@tanstack/react-query";
import { Api } from "@/app/api/api";

export const useAuthQuery = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: () => Api.getUser(),
    retry: 0
  });
};
