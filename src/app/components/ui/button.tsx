import { cn } from "@/app/utils/cn";
import { ButtonHTMLAttributes } from "react";

type UIButtonVariant = "primary" | "danger" | "outlined" | "secondary";

export type UIButtonProps = {
  variant?: UIButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const UIButton = ({
  className,
  variant = "primary",
  ...props
}: UIButtonProps) => {
  return (
    <button
      className={cn(
        "px-4 h-10 rounded cursor-pointer flex gap-2 items-center justify-center ",
        {
          primary:
            "text-white hover:bg-slate-800 disabled:opacity-50 shadow shadow-teal-500/30  bg-slate-600",
          danger:
            "text-white bg-rose-500 hover:bg-rose-600 disabled:opacity-50 shadow shadow-rose-500/30 ",
          outlined:
            "border border-slate-300 hover:border-slate-500 disabled:opacity-50",
          secondary:
            "text-white bg-slate-500  hover:bg-slate-600 disabled:opacity-50 shadow shadow-teal-500/30"
        }[variant],
        { ...props },
        className
      )}
    />
  );
};
