import { ROUTES } from "@/app/constants/routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Api } from "@/app/api/api";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

type Inputs = {
  email: string;
  firstName?: string;
  lastName?: string;
  username: string;
  password: string;
  confirmPassword: string;
};

type AxiosErrorResponse = {
  message: string;
};

export const useSignUpForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const registerMutation = useMutation({
    mutationFn: (dto) => Api.register(dto),

    onSuccess: () => {
      router.push(ROUTES.HOME);
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    }
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  return {
    register,
    handleSubmit: handleSubmit((data) => {
      const dto: any = {
        email: data.email,
        username: data.username,
        password: data.password
      };

      if (data.firstName) dto.firstName = data.firstName;
      if (data.lastName) dto.lastName = data.lastName;

      registerMutation.mutate(dto);
    }),
    errors,
    isPending: registerMutation.isPending,
    isError: registerMutation.isError,
    responseError: (registerMutation.error as AxiosError<AxiosErrorResponse>)
      ?.response?.data?.message
  };
};
