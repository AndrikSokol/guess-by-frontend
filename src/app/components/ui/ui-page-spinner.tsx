import { cn } from "@/app/utils/cn";
import React from "react";
import { UiSpinner } from "./ui-spinner";

export const UiPageSpinner = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "fixed left-0 top-0 right-0 bottom-0 flex justify-center items-center bg-slate-100",
        className
      )}
    >
      <UiSpinner className="text-yellow-300 w-24 h-24 " />
    </div>
  );
};
