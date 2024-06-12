import { About } from "@/app/components/about";

import type { Metadata } from "next";
import Image from "next/image";
export const metadata: Metadata = {
  title: "Geo Game about",
  description: "about game"
};

const Page = () => {
  return (
    <div className=" mx-auto text-black w-screen h-screen  flex justify-center items-center ">
      <div className=" min-w-[300px] flex">
        <Image
          src="/about.jpg"
          alt="belarussian people"
          width={500}
          height={300}
          objectFit="cover"
        />
        <About />
      </div>
    </div>
  );
};

export default Page;
