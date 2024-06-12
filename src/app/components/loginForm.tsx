"use client";

import { useLoginForm } from "../hooks/useLoginForm";
import { EmailIcon } from "@/app/assets/email-icon";
import { GoogleIcon } from "@/app/assets/google-icon";
import { PasswordIcon } from "@/app/assets/password-icon";
import { UiButton } from "@/app/components/ui/ui-button";
import { UiTextField } from "@/app/components/ui/ui-text-field";
import Link from "next/link";
import { UiSpinner } from "./ui/ui-spinner";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ROUTES } from "../constants/routes";
import { useIntl } from "react-intl";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const { register, isPending, isError, errors, handleSubmit, responseError } =
    useLoginForm();
  const intl = useIntl();
  const router = useRouter();
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
    <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
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
        {intl.formatMessage({ id: "login" })}
      </h1>
      <UiTextField
        error={errors.email?.message}
        left={<EmailIcon className="h-6" />}
        inputProps={{
          placeholder: `${intl.formatMessage({ id: "email" })}`,
          type: "email",
          ...register("email", { required: true })
        }}
      />
      <UiTextField
        error={errors.password?.message}
        left={<PasswordIcon className="h-6" />}
        inputProps={{
          placeholder: `${intl.formatMessage({ id: "password" })}`,
          type: "password",
          ...register("password", { required: true })
        }}
      />
      <Link
        href={`${ROUTES.FORGOT_PASSWORD}`}
        className=" inline-block underline"
      >
        {intl.formatMessage({ id: "forgot_a_password" })}
      </Link>

      <UiButton variant="primary" type="submit" disabled={isPending}>
        {isPending ? (
          <UiSpinner className="w-8 h-8 text-white" />
        ) : (
          `${intl.formatMessage({ id: "login" })}`
        )}
      </UiButton>
      <p className=" py-2  text-gray-500">
        {intl.formatMessage({ id: "dont_have_account" })}
        <Link href={ROUTES.SIGNUP} className=" underline text-black">
          {intl.formatMessage({ id: "sign_up" })}
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
          window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/login`;
        }}
        className="flex gap-4 items-center justify-center cursor-pointer border border-gray-600 rounded-md p-1  hover:border-gray-800 duration-300 hover:shadow-md"
      >
        <GoogleIcon />
        <div> {intl.formatMessage({ id: "sign_in_with_google" })}</div>
      </div>
    </form>
  );
};
