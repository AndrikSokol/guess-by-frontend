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
  const isSignup =
    pathname.split("/")[2] === "signup" || pathname.split("/")[1] === "signup";

  return (
    <div
      id="bg-modal"
      onClick={(event) => {
        if (event.target.id == "bg-modal") {
          if (isSignup) {
            router.push(ROUTES.HOME);
            router.refresh();
          } else {
            router.back();
          }
        }
      }}
      className="  z-20 text-black fixed  h-full w-full backdrop-blur-sm  shadow-sm bg-black  bg-opacity-5 flex justify-center items-center  "
    >
      <div
        className={`w-full ${
          left ? " max-w-[900px]" : "max-w-[550px]"
        } flex mx-[10px] max-sm:flex-col bg-white gap-2 rounded-md`}
      >
        {left}
        <div className="bg-white p-6 rounded-md w-full  ">{content}</div>
      </div>
    </div>
  );
}
