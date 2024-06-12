import { useMutation } from "@tanstack/react-query";
import { Api } from "@/app/api/api";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { useIntl } from "react-intl";

type Inputs = {
  email: string;
};

type AxiosErrorResponse = {
  message: string;
};

export const useForgotPasswordForm = () => {
  const { register, handleSubmit, formState: errors } = useForm<Inputs>();
  const t = useIntl();
  const forgotPasswordMutation = useMutation({
    mutationFn: (data: any) => Api.forgotUserPassword(data)
  });

  return {
    handleSubmit: handleSubmit((data) => {
      forgotPasswordMutation.mutate({ ...data, locale: t.locale });
    }),
    errors,
    t,
    register,
    isSuccess: forgotPasswordMutation.isSuccess,
    isPending: forgotPasswordMutation.isPending,
    message: forgotPasswordMutation?.data?.message,
    responseError: (
      forgotPasswordMutation.error as AxiosError<AxiosErrorResponse>
    )?.response?.data?.message
  };
};
