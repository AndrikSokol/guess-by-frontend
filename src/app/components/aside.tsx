"use client";

import { UserInfo } from "./userInfo";
import { LogoutButton } from "./logout-button";
import { useEffect, useRef, useState } from "react";
import { RightArrowIcon } from "../assets/right-arrow-icon";
import { cn } from "../utils/cn";
import LanguageChanger from "./language-changer";
import { UiLink } from "./ui/ui-link";
import { useIntl } from "react-intl";
import { ROUTES } from "../constants/routes";

export const AsideBar = () => {
  const intl = useIntl();
  const [windowSize, setWindowSize] = useState<number>(0);
  const [isShowAside, setIsShowAside] = useState<boolean>(false);
  const [startX, setStartX] = useState<number | null>(null);
  const asideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (windowSize > 768) {
      setIsShowAside(true);
    }
  }, [windowSize]);

  useEffect(() => {
    setWindowSize(window.innerWidth);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX !== null && asideRef.current) {
      const moveX = e.touches[0].clientX;
      const distance = moveX - startX;
      asideRef.current.style.transition = "none";

      asideRef.current.style.transform = `translateX(${
        distance > 0 ? 0 : distance
      }px)`;
    }
  };

  const handleTouchEnd = () => {
    if (startX !== null && asideRef.current) {
      const distance = asideRef.current.getBoundingClientRect().left;
      const asideWidth = asideRef.current.offsetWidth;

      if (Math.abs(distance) > asideWidth * 0.4) {
        setIsShowAside(false);
      }
      asideRef.current.style.transform = "";
      asideRef.current.style.transition = "200ms";
    }

    setStartX(null);
  };

  return (
    <aside
      ref={asideRef}
      className={cn(
        "w-44 h-screen absolute z-20 top-0 bottom-0 bg-opacity-25 bg-black duration-200 ",
        !isShowAside && "translate-x-[-180px] "
      )}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={cn(
          "absolute top-2/3 right-[-28px] flex sm:hidden bg-white delay-300 duration-200 translate-x-0 rounded-full cursor-pointer ",
          !isShowAside && "translate-x-4"
        )}
        onClick={() => setIsShowAside((prev) => !prev)}
      >
        <RightArrowIcon
          className={cn(
            "w-16 h-16 text-yellow-500  duration-300 ",
            isShowAside && "rotate-180"
          )}
        />
      </div>
      <ul className="py-2 text-center font-medium flex flex-col gap-7 text-2xl">
        <div className="pb-10">
          <UserInfo />
        </div>
        <li>
          <UiLink href={ROUTES.ROOM}>
            {intl.formatMessage({ id: "single_game" })}
          </UiLink>
        </li>
        <li>
          <UiLink href={ROUTES.LEADERBOARD}>
            {intl.formatMessage({ id: "leaderboard" })}
          </UiLink>
        </li>
        <li>
          <UiLink href={ROUTES.ABOUT}>
            {intl.formatMessage({ id: "about_game" })}
          </UiLink>
        </li>
      </ul>
      <div className="flex w-full justify-center pt-10">
        <LogoutButton />
      </div>
      <div className="pt-8">
        <LanguageChanger />
      </div>
    </aside>
  );
};
