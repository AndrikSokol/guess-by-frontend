import { useQueryClient } from "@tanstack/react-query";

export const useResetLogout = () => {
  const queryClient = useQueryClient();
  return () => queryClient.removeQueries();
};
