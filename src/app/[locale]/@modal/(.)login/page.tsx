import React from "react";
import { UiModal } from "@/app/components/ui/ui-modal";
import { LoginForm } from "@/app/components/login-form";
import Image from "next/image";

const page = () => {
  return (
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
      content={<LoginForm />}
    />
  );
};

export default page;
