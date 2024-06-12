"use client";

import { Api } from "@/app/api/api";
import { AsideBar } from "@/app/components/aside";
import { UiButton } from "@/app/components/ui/ui-button";
import { UiSpinner } from "@/app/components/ui/ui-spinner";
import { UiTextField } from "@/app/components/ui/ui-text-field";
import { ROUTES } from "@/app/constants/routes";
import { useCheckForResetPasswordQuery } from "@/app/hooks/useCheckForResetPasswordQuery";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { Bounce, ToastContainer, toast } from "react-toastify";
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
      toast.success("Password was changed!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        toastId: "123"
      });
    },
    onError: (error: AxiosError) => {
      toast.error(error.response?.data?.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        toastId: "123"
      });
    }
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<Inputs>();

  if (isError) {
    router.push(ROUTES.HOME);
  }
  if (user) {
    return (
      <div className="flex ">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="w-full ">
          <div className=" my-28 mx-auto   max-w-[450px] flex justify-center  items-center flex-col w-full text-black">
            <h1 className="text-xl py-2">
              {t.formatMessage({ id: "you_try_to_change_password_for" })}{" "}
              {user.email}
            </h1>
            <form
              className=" relative w-full  max-w-96"
              onSubmit={handleSubmit((data) => {
                if (data.newPassword != data.confirmNewPassword) {
                  setError("confirmNewPassword", {
                    type: "custom",
                    message: "password not equal"
                  });
                }

                const { confirmNewPassword, ...dto } = data;
                resetPasswordMutation.mutate(dto);
              })}
            >
              <UiTextField
                className="mt-2"
                error={errors.newPassword?.message}
                inputProps={{
                  placeholder: "set new password",
                  type: "password",
                  ...register("newPassword", {
                    required: true,
                    minLength: {
                      value: 2,
                      message: "password must be more than 2 char"
                    }
                  })
                }}
              />
              <UiTextField
                className="mt-2"
                error={errors.confirmNewPassword?.message}
                inputProps={{
                  placeholder: "confirm new password",
                  type: "password",
                  ...register("confirmNewPassword", {
                    required: true
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
