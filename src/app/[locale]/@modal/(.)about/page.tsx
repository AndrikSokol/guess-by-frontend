import { UiModal } from "@/app/components/ui/ui-modal";
import Image from "next/image";
import { About } from "@/app/components/about";
const page = () => {
  return (
    <UiModal
      left={
        <div className="relative w-72 h-72 mx-auto md:w-[500px]  md:h-[300px]">
          <Image
            src="/about.jpg"
            alt="belarussian people"
            fill
            objectFit="cover"
          />
        </div>
      }
      content={<About />}
    />
  );
};

export default page;
