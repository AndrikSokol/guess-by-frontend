"use client";
import { Button } from "@/app/components/ui/button";
import { useUserStore } from "@/app/stores/zustand.store";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
// import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
// import KeyIcon from "@mui/icons-material/Key";

type Inputs = {
  email: string;
  password: string;
};

const Page = () => {
  const { setUser } = useUserStore();
  const [error, setError] = useState<boolean>(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,

    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post<Promise<IUser>>(
        "http://localhost:3001/api/auth/login",
        {
          email: data.email,
          password: data.password
        }
      );
      const user: any = response.data;
      console.log(user);
      setUser(user);
      router.push("/");
    } catch (error) {
      console.log("error" + error);
    }
  };

  return (
    <div className="   bg-cover bg-white mx-auto text-black w-screen h-screen  flex pt-20  px-32">
      <div className="">
        <form className="flex gap-4 flex-col" onSubmit={handleSubmit(onSubmit)}>
          <h1 className=" text-center text-3xl">Login</h1>
          <div
            className={`${
              errors.email && "border-b-red-600 "
            } px-2 p-2  border-2 rounded-md`}
          >
            {/* <AlternateEmailIcon /> */}
            <input
              placeholder="email"
              className="outline-none bg-transparent"
              {...register("email", { required: true })}
            />
          </div>
          <div
            className={`${
              errors.password && "border-b-red-600 "
            }px-2 p-2  border-2 rounded-md`}
          >
            {/* <KeyIcon /> */}

            <input
              placeholder="password"
              type="password"
              className="outline-none bg-transparent"
              {...register("password", { required: true })}
            />
          </div>
          <Link href={"/"}> Forgot a password?</Link>
          <Button type="submit" />
        </form>
        <p className=" py-2">
          Don`t have account?{" "}
          <Link href="/register" className=" underline">
            Sign up
          </Link>
        </p>
        <div className="flex relative  border-b-2 border-gray-600 w-full">
          <div className="p-4 absolute">Or</div>
        </div>
      </div>
    </div>
  );
};

export default Page;
