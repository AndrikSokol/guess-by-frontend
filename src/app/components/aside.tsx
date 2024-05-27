import { UserInfo } from "./userInfo";
import { LogoutButton } from "./logout-button";
import { UiLink } from "./ui/ui-link";
import { PlanetIcon } from "../assets/planet-icon";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "../constants/routes";

export const Aside = () => {
  return (
    <aside className="w-44 h-screen  bg-opacity-25 bg-black">
      {/* <Link href={ROUTES.HOME}>
        <Image src="/earth2.jpg" width={120} height={120} alt="earth-logo" />
      </Link> */}

      <ul className="  py-2 text-center font-medium font flex flex-col gap-7 text-2xl">
        <div className="pb-10">
          <UserInfo />
        </div>
        <li>
          <UiLink href="/room">Single game</UiLink>
        </li>
        <li>
          <UiLink href="/">Multiplayer</UiLink>
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
