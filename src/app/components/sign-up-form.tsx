"use client";

import { GoogleIcon } from "@/app/assets/google-icon";
import { UiButton } from "@/app/components/ui/ui-button";
import { UiTextField } from "@/app/components/ui/ui-text-field";
import Link from "next/link";
import { useSignUpForm } from "../hooks/useSignUpForm";
import { ROUTES } from "../constants/routes";
import { UiSpinner } from "./ui/ui-spinner";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useIntl } from "react-intl";

export const SignUpForm = () => {
  const { register, errors, isPending, handleSubmit, isError, responseError } =
    useSignUpForm();
  const intl = useIntl();
  if (isError && !isPending) {
    toast.error(responseError, {
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

  return (
    <form className="flex gap-4 flex-col " onSubmit={handleSubmit}>
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
      <h1 className=" text-center text-3xl">
        {intl.formatMessage({ id: "sign_up" })}
      </h1>
      <div className=" grid grid-cols-2 gap-6">
        <UiTextField
          error={errors.firstName?.message}
          inputProps={{
            placeholder: `${intl.formatMessage({ id: "first_name" })}`,
            type: "firstName",
            ...register("firstName", {
              required: false,
              minLength: {
                value: 2,
                message: `${intl.formatMessage({
                  id: "first_name_length_error"
                })}`
              }
            })
          }}
        />
        <UiTextField
          error={errors.lastName?.message}
          inputProps={{
            placeholder: `${intl.formatMessage({ id: "last_name" })}`,
            type: "lastName",
            ...register("lastName", {
              required: false,
              minLength: {
                value: 2,
                message: `${intl.formatMessage({
                  id: "last_name_length_error"
                })}`
              }
            })
          }}
        />
      </div>
      <UiTextField
        isRequired={true}
        error={errors.email?.message}
        inputProps={{
          placeholder: `${intl.formatMessage({ id: "email" })}`,
          type: "email",
          ...register("email", {
            required: {
              value: true,
              message: `${intl.formatMessage({ id: "required_error" })}`
            }
          })
        }}
      />
      <UiTextField
        isRequired={true}
        error={errors.username?.message}
        inputProps={{
          placeholder: `${intl.formatMessage({ id: "username" })}`,
          type: "username",
          ...register("username", {
            required: {
              value: true,
              message: `${intl.formatMessage({ id: "required_error" })}`
            },
            minLength: {
              value: 2,
              message: `${intl.formatMessage({ id: "username_length_error" })}`
            }
          })
        }}
      />
      <UiTextField
        isRequired={true}
        error={errors.password?.message}
        inputProps={{
          placeholder: `${intl.formatMessage({ id: "password" })}`,
          type: "password",
          ...register("password", {
            required: {
              value: true,
              message: `${intl.formatMessage({ id: "required_error" })}`
            },
            minLength: {
              value: 2,
              message: `${intl.formatMessage({ id: "password_length_error" })}`
            }
          })
        }}
      />
      <UiTextField
        isRequired={true}
        error={errors.password?.message}
        inputProps={{
          placeholder: `${intl.formatMessage({ id: "confirm_password" })}`,
          type: "confirmPassword",
          ...register("confirmPassword", {
            required: {
              value: true,
              message: `${intl.formatMessage({ id: "required_error" })}`
            }
          })
        }}
      />
      <UiButton variant="primary" type="submit">
        {isPending ? (
          <UiSpinner className="w-8 h-8 text-white" />
        ) : (
          `${intl.formatMessage({ id: "sign_up" })}`
        )}
      </UiButton>
      <p className=" py-2 text-gray-600">
        {intl.formatMessage({ id: "do_you_have_account" })}
        <Link href={ROUTES.LOGIN} className=" underline text-black">
          {intl.formatMessage({ id: "click_to_login" })}
        </Link>
      </p>
      <div className="py-4 flex  items-center justify-between">
        <div className=" border-b-[1px] border-gray-600 w-full"></div>
        <div className="px-2    bg-white">
          {intl.formatMessage({ id: "or" })}
        </div>
        <div className="border-b-[1px] border-gray-600 w-full"></div>
      </div>
      <div
        onClick={(event) => {
          event.preventDefault();
          window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/callback`;
        }}
        className="flex gap-4 items-center justify-center cursor-pointer border border-gray-600 rounded-md p-1  hover:border-gray-800 duration-300 hover:shadow-md"
      >
        <GoogleIcon />
        <div>{intl.formatMessage({ id: "sign_in_with_google" })}</div>
      </div>
    </form>
  );
};
