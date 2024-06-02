"use client";

import { UserInfo } from "./userInfo";
import { LogoutButton } from "./logout-button";
import { UiLink } from "./ui/ui-link";
import { useEffect, useState } from "react";
import { RightArrowIcon } from "../assets/right-arrow-icon";
import { cn } from "../utils/cn";
import { LeftArrowIcon } from "../assets/left-arrow-icon";

export const AsideBar = () => {
  const [windowSize, setWindowSize] = useState<number>(0);

  const [isShowAside, setIsShowAside] = useState<boolean>(true);
  useEffect(() => {
    if (windowSize > 768) {
      setIsShowAside(true);
    }
  }, [windowSize]);

  useEffect(() => {
    setWindowSize(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  return (
    <aside
      className={cn(
        "w-44 h-screen absolute top-0 bottom-0 bg-opacity-25 bg-black duration-300",
        !isShowAside && "translate-x-[-180px]"
      )}
    >
      {!isShowAside && (
        <div
          className="absolute top-2/3 right-[-28px] flex sm:hidden cursor-pointer "
          onClick={() => setIsShowAside(true)}
        >
          <RightArrowIcon className="w-16 h-16 text-yellow-500 " />
        </div>
      )}{" "}
      {isShowAside && (
        <div
          className="absolute top-2/3 right-[-28px] flex sm:hidden cursor-pointer "
          onClick={() => setIsShowAside(false)}
        >
          <LeftArrowIcon className="w-16 h-16 text-yellow-500 " />
        </div>
      )}
      <ul className="  py-2 text-center font-medium font flex flex-col gap-7 text-2xl">
        <div className="pb-10">
          <UserInfo />
        </div>
        <li>
          <UiLink href="/room">Single game</UiLink>
        </li>

        <li>
          <UiLink href="/leaderboard">Leaderboard</UiLink>
        </li>

        <li>
          <UiLink href="/?modal=about">About game</UiLink>
        </li>
      </ul>
      <div className="flex w-full justify-center pt-10">
        <LogoutButton />
      </div>
      {/* <div className="flex   items-center justify-center">
        <PlanetIcon className="w-8 h-8 cursor-pointer " />
        <div className="cursor-pointer">EN</div>
      </div> */}
    </aside>
  );
};
