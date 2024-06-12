import { useQuery } from "@tanstack/react-query";
import { Api } from "@/app/api/api";

export const useCheckForResetPasswordQuery = (data: any) => {
  return useQuery({
    queryKey: ["auth", data],
    queryFn: () => Api.checkForResetPassword(data),
    retry: 0
  });
};
