import Link from "next/link";
import { SplineScene } from "./SplineScene";
import UserInfo from "@/UserInfo";
import { Modal } from "./components/ui/modal";

export default function Home() {
  return (
    <main className="flex  bg-amber-100  w-screen  h-screen">
      <aside className="w-44 h-screen  bg-opacity-25 bg-black">
        <ul className=" py-40 text-center font-medium font flex flex-col gap-7 text-2xl">
          <UserInfo />
          <li>
            <Link
              href="/map"
              className=" cursor-pointer hover:text-slate-100 ease-in duration-200"
            >
              Single game
            </Link>
          </li>
          <li>
            <a className=" cursor-pointer hover:text-slate-100 ease-in duration-200">
              Multiplayer
            </a>
          </li>
          <li>
            <a className=" cursor-pointer hover:text-slate-100 ease-in duration-200">
              About game
            </a>
          </li>
        </ul>
      </aside>
      <Modal></Modal>
      <div className=" flex-1">
        <SplineScene />
      </div>
    </main>
  );
}
