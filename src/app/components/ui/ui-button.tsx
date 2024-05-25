import { cn } from "@/app/utils/cn";
import { ButtonHTMLAttributes } from "react";

type UiButtonVariant = "primary" | "danger" | "outlined" | "secondary";

export type UiButtonProps = {
  variant: UiButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const UiButton = ({
  className,
  variant = "primary",
  ...props
}: UiButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        className,
        "px-4 h-10 rounded cursor-pointer flex gap-2 items-center justify-center duration-150",
        {
          primary:
            "text-white hover:bg-yellow-600 active:bg-yellow-800 disabled:opacity-50 shadow shadow-yellow-500/30  bg-yellow-500 ",
          danger:
            "text-white bg-rose-500 hover:bg-rose-600 disabled:opacity-50 shadow shadow-rose-500/30 ",
          outlined:
            "border border-yellow-300 hover:border-yellow-500 disabled:opacity-50",
          secondary:
            "text-black bg-yellow-500  hover:bg-yellow-600 disabled:opacity-50 shadow shadow-yellow-500/30"
        }[variant]
      )}
    />
  );
};
