import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Api } from "../api/api";
import { ROUTES } from "../constants/routes";
import { useResetLogout } from "./useResetLogout";

export const useLogout = () => {
  const router = useRouter();
  const resetLogout = useResetLogout();

  const logoutMutation = useMutation({
    mutationFn: () => Api.logout(),
    async onSuccess() {
      resetLogout();
      router.push(ROUTES.HOME);
    }
  });

  return {
    logout: logoutMutation.mutate,
    isPending: logoutMutation.isPending
  };
};
