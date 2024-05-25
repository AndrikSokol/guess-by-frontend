"use client";

import { LoginForm } from "@/app/components/loginForm";
import { UiModal } from "@/app/components/ui/ui-modal";
import Image from "next/image";

const Page = () => {
  return (
    <div className=" bg-white mx-auto text-black w-screen h-screen">
      <UiModal
        left={
          <Image
            src="/guess.jpg"
            alt="make today great"
            width={500}
            height={300}
            objectFit="cover"
          />
        }
        type="login"
        content={<LoginForm />}
      />
    </div>
  );
};

export default Page;
