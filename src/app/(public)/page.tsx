"use client";
import { SplineScene } from "../components/SplineScene";
import Image from "next/image";
import { LoginForm } from "../components/loginForm";
import { UiModal } from "../components/ui/ui-modal";
import { RegisterForm } from "../components/registerForm";

import { About } from "../components/about";
import ForgotPasswordModal from "./forgot-password/forgot-password";
import { AsideBar } from "../components/aside";

export default function Home() {
  return (
    <main className="flex   bg-amber-200  bg-transparent w-screen  h-screen ">
      <AsideBar />
      <ForgotPasswordModal />
      <UiModal
        left={
          <Image
            src="/guess.jpg"
            alt="make today great"
            width={500}
            height={300}
            objectFit="cover"
          />
        }
        type="login"
        content={<LoginForm />}
      />
      <UiModal type="register" content={<RegisterForm />} />
      <UiModal
        left={
          <Image
            src="/about.jpg"
            alt="belarussian people"
            width={500}
            height={300}
            objectFit="cover"
          />
        }
        type="about"
        content={<About />}
      />
      <div className=" flex-1">
        <SplineScene />
      </div>
    </main>
  );
}
