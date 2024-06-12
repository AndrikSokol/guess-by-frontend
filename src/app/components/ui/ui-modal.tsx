"use client";

import { ROUTES } from "@/app/constants/routes";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

export function UiModal({
  content,
  left
}: {
  content?: ReactNode;
  left?: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isSignup = pathname.includes(ROUTES.SIGNUP);
  const isForgotPassword = pathname.includes(ROUTES.FORGOT_PASSWORD);

  const closeModal = () => {
    if (isSignup || isForgotPassword) {
      router.push(ROUTES.HOME);
      router.refresh();
    } else {
      router.back();
    }
  };

  return (
    <div
      onClick={closeModal}
      className="  z-20 text-black fixed  h-full w-full backdrop-blur-sm  shadow-sm bg-black  bg-opacity-5 flex justify-center items-center  "
    >
      <div
        className={`w-full ${
          left ? " max-w-[900px]" : "max-w-[550px]"
        } flex mx-[10px] max-sm:flex-col bg-white gap-2 rounded-md`}
        onClick={(e) => e.stopPropagation()}
      >
        {left}
        <div className="bg-white p-6 rounded-md w-full  ">{content}</div>
      </div>
    </div>
  );
}
