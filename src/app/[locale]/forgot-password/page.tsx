"use client";

import { ForgotPasswordForm } from "@/app/components/forgot-password-form";
import Image from "next/image";

const Page = () => {
  return (
    <div className="flex">
      <div className="flex flex-col w-full items-center">
        <Image
          src="/forgot-password.jpg"
          width={300}
          height={300}
          alt="forgot-password-icon"
        />
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default Page;
