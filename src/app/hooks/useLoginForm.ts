import { ROUTES } from "@/app/constants/routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Api } from "@/app/api/api";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

type Inputs = {
  email: string;
  password: string;
};

type AxiosErrorResponse = {
  message: string;
};

export const useLoginForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const loginMutation = useMutation({
    mutationFn: (dto) => Api.login(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      router.push(ROUTES.HOME);
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  return {
    register,
    handleSubmit: handleSubmit((data) => loginMutation.mutate(data)),
    errors,
    isPending: loginMutation.isPending,
    isError: loginMutation.isError,
    responseError: (loginMutation.error as AxiosError<AxiosErrorResponse>)
      ?.response?.data?.message
  };
};
