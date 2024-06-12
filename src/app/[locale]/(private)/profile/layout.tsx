"use client";

import { UiLink } from "@/app/components/ui/ui-link";
import { ROUTES } from "@/app/constants/routes";
import { useAuthQuery } from "@/app/hooks/useAuthQuery";
import { cn } from "@/app/utils/cn";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { AccountIcon } from "@/app/assets/account-icon";
import { UploadIcon } from "@/app/assets/upload-icon";
import { Api } from "@/app/api/api";
import { ChangeEvent, useState } from "react";
import { useUserAvatarStore } from "@/app/stores/zustand.store";
import { useIntl } from "react-intl";

type Pathname = {
  url: string;
  name: string;
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const segments = pathname.split("/");

  const t = useIntl();
  const PROFILE_LINK = [
    {
      id: 1,
      name: `${t.formatMessage({ id: "profile" }).toLowerCase()}`,
      href: ROUTES.PROFILE
    },
    {
      id: 2,
      name: `${t.formatMessage({ id: "statistics" }).toLowerCase()}`,
      href: ROUTES.PROFILE_STATISTICS
    },
    {
      id: 3,
      name: `${t
        .formatMessage({ id: "change_password" })
        .toLowerCase()
        .split(" ")
        .join("-")}`,
      href: ROUTES.PROFILE_CHANGE_PASSWORD
    }
  ];

  const { setAvatarPath } = useUserAvatarStore();

  const [path, setPath] = useState<Pathname>();

  const { data: user, isPending: isUserPending } = useAuthQuery();

  async function uploadPhoto(ev: ChangeEvent<HTMLInputElement>) {
    const files = ev.target.files;
    if (files === null) {
      return;
    }
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("file", files[i]);
    }
    try {
      const photo = await Api.uploadByDevice(data);
      setPath(photo[0]);
      setAvatarPath(photo[0].url);
    } catch (error) {}
  }

  return (
    <div className="sm:pl-[176px] flex w-full flex-col md:flex-row">
      <div className=" md:border-r-2 border-yellow-300">
        <div className="relative flex justify-center items-center flex-col p-4 ">
          <h1 className="text-black text-3xl text-center">{user?.username}</h1>
          {user?.profile.avatar || path?.url ? (
            <Image
              className=" rounded-full border-2 relative border-yellow-300"
              width={350}
              height={350}
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/static/${
                user?.profile.avatar || path?.url
              }`}
              alt="profile-icon"
            />
          ) : (
            <AccountIcon className=" w-60 h-60 sm:w-72 sm:h-72 text-black bg-white rounded-full" />
          )}
          {segments[1] == "profile" && segments.length == 2 && (
            <label className="absolute bottom-2 right-2 rounded-full p-2 cursor-pointer flex items-center justify-center border-2 border-yellow-300 hover:border-yellow-600 duration-150">
              <input type="file" className="hidden" onChange={uploadPhoto} />
              <UploadIcon className="w-8 h-8 text-black" />
            </label>
          )}
        </div>

        <div className="p-4    border-t-2 border-yellow-300">
          {PROFILE_LINK.map((link) => {
            const isActive =
              (link.name === "profile" && segments.length == 2) ||
              segments[2] === link.name;
            return (
              <UiLink
                key={link.id}
                href={link.href}
                className={cn(
                  `text-yellow-500 hover:text-yellow-700 text-2xl  block mb-2`,
                  isActive && "text-black"
                )}
              >
                {link.name}
              </UiLink>
            );
          })}
        </div>
      </div>

      {children}
    </div>
  );
}
