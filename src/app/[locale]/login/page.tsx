import { LoginForm } from "@/app/components/loginForm";
import type { Metadata } from "next";
import Image from "next/image";
export const metadata: Metadata = {
  title: "Geo Game login",
  description: "login in system"
};

const Page = () => {
  return (
    <div className=" mx-auto text-black w-screen h-screen  flex justify-center items-center ">
      <div className="  flex gap-4">
        <Image
          src="/guess.jpg"
          alt="make today great"
          width={500}
          height={300}
          objectFit="cover"
        />
        <LoginForm />
      </div>
    </div>
  );
};

export default Page;
