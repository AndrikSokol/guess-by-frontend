"use client";

import { Api } from "@/app/api/api";
import { UiButton } from "@/app/components/ui/ui-button";
import { UiSpinner } from "@/app/components/ui/ui-spinner";
import { UiTextField } from "@/app/components/ui/ui-text-field";
import { ROUTES } from "@/app/constants/routes";
import { useCheckForResetPasswordQuery } from "@/app/hooks/useCheckForResetPasswordQuery";
import { toastOptions } from "@/app/utils/toastOptions";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Inputs = {
  newPassword: string;
  confirmNewPassword: string;
};
const Page = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const t = useIntl();
  const { data: user, isError } = useCheckForResetPasswordQuery({
    id: params.slug[0],
    token: params.slug[1]
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (data: any) =>
      Api.resetPassword({ ...data, id: params.slug[0], token: params.slug[1] }),
    onSuccess: () => {
      toast.success("Password was changed!", toastOptions);
      setTimeout(() => {
        router.push(ROUTES.HOME);
      }, 2000);
    },
    onError: (error: AxiosError) => {
      toast.error(error.response?.data?.message, toastOptions);
    }
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<Inputs>();

  if (isError) {
    router.replace(ROUTES.HOME);
  }

  if (user) {
    return (
      <div className="flex ">
        <ToastContainer />
        <div className="w-full ">
          <div className=" my-28 mx-auto  px-[10px]  max-w-[450px] flex justify-center  items-center flex-col w-full text-black">
            <h1 className="text-xl py-2 text-center">
              {t.formatMessage({ id: "you_try_to_change_password_for" })}{" "}
              {user.email}
            </h1>
            <form
              className=" relative w-full  max-w-96"
              onSubmit={handleSubmit((data) => {
                if (data.newPassword != data.confirmNewPassword) {
                  setError("confirmNewPassword", {
                    type: "custom",
                    message: `${t.formatMessage({
                      id: "password_not_equal"
                    })}`
                  });
                  return;
                }

                const { confirmNewPassword, ...dto } = data;
                resetPasswordMutation.mutate(dto);
              })}
            >
              <UiTextField
                className="mt-2"
                error={errors.newPassword?.message}
                inputProps={{
                  placeholder: `${t.formatMessage({
                    id: "write_new_password"
                  })}`,
                  type: "password",
                  ...register("newPassword", {
                    required: {
                      value: true,
                      message: `${t.formatMessage({
                        id: "required_error"
                      })}`
                    },
                    minLength: {
                      value: 2,
                      message: `${t.formatMessage({
                        id: "password_length_error"
                      })}`
                    }
                  })
                }}
              />
              <UiTextField
                className="mt-2"
                error={errors.confirmNewPassword?.message}
                inputProps={{
                  placeholder: `${t.formatMessage({
                    id: "confirm_new_password"
                  })}`,
                  type: "password",
                  ...register("confirmNewPassword", {
                    required: {
                      value: true,
                      message: `${t.formatMessage({
                        id: "required_error"
                      })}`
                    }
                  })
                }}
              />
              <div className="py-2 flex w-full ">
                <UiButton
                  disabled={resetPasswordMutation.isPending}
                  className="w-full"
                  type="submit"
                  variant="primary"
                >
                  {resetPasswordMutation.isPending ? (
                    <UiSpinner className="w-8 h-8 text-black" />
                  ) : (
                    `${t.formatMessage({ id: "update" })}`
                  )}
                </UiButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default Page;
