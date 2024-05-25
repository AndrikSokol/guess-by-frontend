import { cn } from "@/app/utils/cn";
import Link from "next/link";
import { AnchorHTMLAttributes, FC } from "react";

type UiLinkProps = {
  href: string;
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const UiLink: FC<UiLinkProps> = ({ href, className, ...props }) => {
  return (
    <Link
      {...props}
      href={href}
      className={cn(
        " cursor-pointer hover:text-slate-100 ease-in duration-200",
        className
      )}
    />
  );
};
