"use client";

import React from "react";
import { AccountIcon } from "../assets/account-icon";
import { UiLink } from "./ui/ui-link";
import { useAuthQuery } from "../hooks/useAuthQuery";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES } from "../constants/routes";

export const UserInfo = () => {
  const { data: user, isError } = useAuthQuery();

  const pathname = usePathname();

  const isProfile = pathname.split("/")[1] === "profile";
  const router = useRouter();

  if (isProfile) return;

  if (user && !isError) {
    return (
      <>
        <div className=" flex flex-col justify-center items-center">
          <div
            className="cursor-pointer rounded-full"
            onClick={() => router.push(ROUTES.PROFILE)}
          >
            {user?.profile?.avatar ? (
              <Image
                className=" rounded-full border-2 border-yellow-300 "
                width={128}
                height={128}
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/static/${user?.profile.avatar}`}
                alt="profile-icon"
              />
            ) : (
              <AccountIcon className="w-32 h-32" />
            )}
          </div>

          <UiLink href="profile" className="text-2xl underline">
            {user?.username}
          </UiLink>
        </div>
      </>
    );
  }
  return;
};
