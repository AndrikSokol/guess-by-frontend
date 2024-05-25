"use client";

import { Api } from "@/app/api/api";
import { UiButton } from "@/app/components/ui/ui-button";
import { UiSpinner } from "@/app/components/ui/ui-spinner";
import { UiTextField } from "@/app/components/ui/ui-text-field";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { useForm } from "react-hook-form";
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

  return (
    <div className="px-4 w-full">
      <h1 className="text-black text-2xl p-4">Change password</h1>
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
            placeholder: "write old password",
            type: "password",
            ...register("password", { required: true })
          }}
        />
        <UiTextField
          className="mt-2"
          error={errors.newPassword?.message}
          inputProps={{
            placeholder: "set password",
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
            disabled={setPasswordMutation.isPending}
            className="w-full"
            type="submit"
            variant="primary"
          >
            {setPasswordMutation.isPending ? (
              <UiSpinner className="w-8 h-8 text-black" />
            ) : (
              "          Update"
            )}
          </UiButton>
        </div>
      </form>
    </div>
  );
};

export default Page;
