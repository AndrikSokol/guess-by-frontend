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

export const LoginForm = () => {
  const { register, isPending, isError, errors, handleSubmit, responseError } =
    useLoginForm();

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
      <h1 className=" text-center text-3xl">Login</h1>
      <UiTextField
        error={errors.email?.message}
        left={<EmailIcon className="h-6" />}
        inputProps={{
          placeholder: "email",
          type: "email",
          ...register("email", { required: true })
        }}
      />
      <UiTextField
        error={errors.password?.message}
        left={<PasswordIcon className="h-6" />}
        inputProps={{
          placeholder: "password",
          type: "password",
          ...register("password", { required: true })
        }}
      />
      {/* <Link href={ROUTES.FORGOT_PASSWORD} className=" inline-block underline">
        Forgot a password?
      </Link>/?modal=about */}
      <Link
        href={`${ROUTES.HOME}/?modal=forgot-password`}
        className=" inline-block underline"
      >
        Forgot a password?
      </Link>

      <UiButton variant="primary" type="submit" disabled={isPending}>
        {isPending ? <UiSpinner className="w-8 h-8 text-white" /> : "Login"}
      </UiButton>
      <p className=" py-2  text-gray-500">
        Don`t have account?{" "}
        <Link href="/?modal=register" className=" underline text-black">
          Sign up
        </Link>
      </p>
      <div className="py-4 flex  items-center justify-between">
        <div className=" border-b-[1px] border-gray-600 w-full"></div>
        <div className="px-2    bg-white">Or</div>
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
        <div>Sign in with google</div>
      </div>
    </form>
  );
};
