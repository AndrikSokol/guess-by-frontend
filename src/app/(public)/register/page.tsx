"use client";

import { RegisterForm } from "@/app/components/registerForm";
import { UiModal } from "@/app/components/ui/ui-modal";

const Page = () => {
  return (
    <div className=" bg-white mx-auto text-black w-screen h-screen">
      <UiModal type="register" content={<RegisterForm />} />
    </div>
  );
};

export default Page;
