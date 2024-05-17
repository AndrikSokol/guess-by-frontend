"use client";

import { useUserStore } from "@/app/stores/zustand.store";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  firstName?: string;
  lastName?: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const Page = () => {
  const { setUser } = useUserStore();
  const [error, setError] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (data.email != data.confirmPassword) {
        setError(true);
        return;
      }
      const { confirmPassword, ...dto } = data;
      const response = await axios.post<Promise<IUser>>(
        "http://localhost:3000/api/auth/register",
        {
          dto
        }
      );
      const user: any = response.data;
      setUser(user);
      // router.push("/");
    } catch (error) {
      console.log("error" + error);
    }
  };

  return (
    <div className="  bg-cover bg-white mx-auto text-black w-screen h-screen  flex pt-20  px-32">
      <div className="">
        <form
          className="flex gap-4 flex-col max-w-96"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className=" text-center text-3xl">Register</h1>
          <div className="flex gap-6">
            {" "}
            <div
              className={`${
                errors.firstName && "border-b-red-600 "
              } px-4 pb-1  border-b-2 rounded-md`}
            >
              {/* <AlternateEmailIcon /> */}
              <input
                className="outline-none bg-transparent"
                {...register("firstName", {
                  required: true,
                  minLength: { value: 5, message: "must be 5 and more" }
                })}
              />
            </div>
            <div
              className={`${
                errors.lastName && "border-b-red-600 "
              } px-4 pb-1  border-b-2 rounded-md`}
            >
              {/* <AlternateEmailIcon /> */}
              <input
                className="outline-none bg-transparent"
                {...register("lastName", {
                  required: true,
                  minLength: { value: 5, message: "must be 5 and more" }
                })}
              />
            </div>
          </div>

          <div
            className={`${
              errors.email && "border-b-red-600 "
            } px-4 pb-1  border-b-2 rounded-md`}
          >
            {/* <AlternateEmailIcon /> */}
            <input
              placeholder="email"
              className="outline-none bg-transparent"
              type="email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address"
                }
              })}
            />
          </div>
          <div
            className={`${
              errors.username && "border-b-red-600 "
            } px-4 pb-1  border-b-2 rounded-md`}
          >
            {/* <AlternateEmailIcon /> */}
            <input
              className="outline-none bg-transparent"
              {...register("username", {
                required: true,
                minLength: { value: 5, message: "must be 5 and more" }
              })}
            />
          </div>
          <div
            className={`${
              errors.password && "border-b-red-600 "
            }px-4 pb-1  border-b-2 rounded-md`}
          >
            {/* <KeyIcon /> */}

            <input
              placeholder="password"
              className="outline-none bg-transparent"
              {...register("password", { required: true })}
            />
          </div>
          <h2>Confirm password</h2>
          <div
            className={`${
              errors.confirmPassword && "border-b-red-600 "
            }px-4 pb-1  border-b-2 rounded-md`}
          >
            {/* <KeyIcon /> */}
            <input
              placeholder="confirm password"
              className="outline-none bg-transparent"
              {...register("confirmPassword", { required: true })}
            />
          </div>
          <input
            className=" py-2 px-4 bg-yellow-500 rounded-md cursor-pointer hover:opacity-85 duration-150"
            type="submit"
          />
        </form>
        <p className=" py-2">
          Do you have account?{" "}
          <Link href="/login" className=" underline">
            Click to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
