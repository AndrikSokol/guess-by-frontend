import { GoogleIcon } from "@/app/assets/google-icon";
import { UiButton } from "@/app/components/ui/ui-button";
import { UiTextField } from "@/app/components/ui/ui-text-field";
import Link from "next/link";
import { useRegisterForm } from "../hooks/useRegisterForm";
import { ROUTES } from "../constants/routes";
import { UiSpinner } from "./ui/ui-spinner";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const RegisterForm = () => {
  const { register, errors, isPending, handleSubmit, isError, responseError } =
    useRegisterForm();

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
      <h1 className=" text-center text-3xl">Register</h1>
      <div className=" grid grid-cols-2 gap-6">
        <UiTextField
          error={errors.firstName?.message}
          inputProps={{
            placeholder: "firstName",
            type: "firstName",
            ...register("firstName", {
              required: false,
              minLength: {
                value: 2,
                message: "first name must be more than 2 char"
              }
            })
          }}
        />
        <UiTextField
          error={errors.lastName?.message}
          inputProps={{
            placeholder: "lastName",
            type: "lastName",
            ...register("lastName", {
              required: false,
              minLength: {
                value: 2,
                message: "last name must be more than 2 char"
              }
            })
          }}
        />
      </div>
      <UiTextField
        isRequired={true}
        error={errors.email?.message}
        inputProps={{
          placeholder: "email",
          type: "email",
          ...register("email", {
            required: true
          })
        }}
      />
      <UiTextField
        isRequired={true}
        error={errors.username?.message}
        inputProps={{
          placeholder: "username",
          type: "username",
          ...register("username", {
            required: true,
            minLength: {
              value: 2,
              message: "username must be more than 2 char"
            }
          })
        }}
      />
      <UiTextField
        isRequired={true}
        error={errors.password?.message}
        inputProps={{
          placeholder: "password",
          type: "password",
          ...register("password", {
            required: true,
            minLength: {
              value: 2,
              message: "password must be more than 2 char"
            }
          })
        }}
      />
      <UiTextField
        isRequired={true}
        error={errors.password?.message}
        inputProps={{
          placeholder: "Confirm password",
          type: "confirmPassword",
          ...register("confirmPassword", {
            required: true
          })
        }}
      />
      <UiButton variant="primary" type="submit">
        {isPending ? <UiSpinner className="w-8 h-8 text-white" /> : "Register"}
      </UiButton>
      <p className=" py-2 text-gray-600">
        Do you have account?{" "}
        <Link href={ROUTES.LOGIN} className=" underline text-black">
          Click to login
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
          window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/callback`;
        }}
        className="flex gap-4 items-center justify-center cursor-pointer border border-gray-600 rounded-md p-1  hover:border-gray-800 duration-300 hover:shadow-md"
      >
        <GoogleIcon />
        <div>Sign in with google</div>
      </div>
    </form>
  );
};
