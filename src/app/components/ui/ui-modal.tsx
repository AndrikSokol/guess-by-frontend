"use client";

import { ROUTES } from "@/app/constants/routes";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export function UiModal({
  content,
  left,
  type
}: {
  content?: ReactNode;
  left?: ReactNode;
  type?: "login" | "register" | "about" | "forgot-password";
}) {
  const searchParams = useSearchParams();
  const [active, setActive] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("modal") === type) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [searchParams]);

  if (active) {
    return (
      <div
        id="bg-modal"
        onClick={(event) => {
          console.log();
          if (event.target.id == "bg-modal") {
            setActive(false);
            router.replace(ROUTES.HOME);
          }
        }}
        className="  text-black fixed  h-full w-full backdrop-blur-sm  shadow-sm bg-black  bg-opacity-5 flex justify-center items-center  "
      >
        <div
          className={`w-full ${
            left ? " max-w-[900px]" : "max-w-[550px]"
          } flex max-sm:flex-col bg-white gap-2 rounded-md`}
        >
          {left}
          <div className="bg-white p-6 rounded-md w-full  ">{content}</div>
        </div>
      </div>
    );
  }

  return null;
}
