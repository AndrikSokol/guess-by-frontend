"use client";

import { Api } from "@/app/api/api";
import { UiButton } from "@/app/components/ui/ui-button";
import { UiSpinner } from "@/app/components/ui/ui-spinner";
import { UiTextField } from "@/app/components/ui/ui-text-field";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Inputs = {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
};

const Page = () => {
  const setPasswordMutation = useMutation({
    mutationFn: (data) => Api.changeUserPassword(data),
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
  const t = useIntl();

  return (
    <div className="px-4 w-full">
      <h1 className="text-black text-2xl p-4">
        {t.formatMessage({ id: "change_password" })}
      </h1>
      <form
        className=" relative w-full  max-w-96"
        onSubmit={handleSubmit((data) => {
          if (data.newPassword != data.confirmNewPassword) {
            setError("confirmNewPassword", {
              type: "custom",
              message: `${t.formatMessage({ id: "password_not_equal" })}`
            });
            return;
          }

          const { confirmNewPassword, ...dto } = data;
          setPasswordMutation.mutate(dto);
        })}
      >
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
        <UiTextField
          error={errors.password?.message}
          inputProps={{
            placeholder: `${t.formatMessage({ id: "write_old_password" })}`,
            type: "password",
            ...register("password", {
              required: {
                value: true,
                message: `${t.formatMessage({ id: "required_error" })}`
              }
            })
          }}
        />
        <UiTextField
          className="mt-2"
          error={errors.newPassword?.message}
          inputProps={{
            placeholder: `${t.formatMessage({ id: "write_new_password" })}`,
            type: "password",
            ...register("newPassword", {
              required: {
                value: true,
                message: `${t.formatMessage({ id: "required_error" })}`
              },
              minLength: {
                value: 2,
                message: `${t.formatMessage({ id: "password_length_error" })}`
              }
            })
          }}
        />
        <UiTextField
          className="mt-2"
          error={errors.confirmNewPassword?.message}
          inputProps={{
            placeholder: `${t.formatMessage({ id: "confirm_new_password" })}`,
            type: "password",
            ...register("confirmNewPassword", {
              required: {
                value: true,
                message: `${t.formatMessage({ id: "required_error" })}`
              }
            })
          }}
        />
        <div className="py-2 flex w-full ">
          <UiButton
            disabled={setPasswordMutation.isPending}
            className="w-full"
            type="submit"
            variant="primary"
          >
            {setPasswordMutation.isPending ? (
              <UiSpinner className="w-8 h-8 text-black" />
            ) : (
              `${t.formatMessage({ id: "update" })}`
            )}
          </UiButton>
        </div>
      </form>
    </div>
  );
};

export default Page;
