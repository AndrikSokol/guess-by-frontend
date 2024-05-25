import { RequiredIcon } from "@/app/assets/required-icon";
import { cn } from "@/app/utils/cn";
import clsx from "clsx";
import { InputHTMLAttributes, PropsWithRef, ReactNode, useId } from "react";

export type UiTextFieldProps = {
  className?: string;
  label?: string;
  error?: string;
  inputProps?: PropsWithRef<InputHTMLAttributes<HTMLInputElement>>;
  left?: ReactNode;
  isRequired?: boolean;
};

export function UiTextField({
  className,
  error,
  label,
  inputProps,
  left,
  isRequired
}: UiTextFieldProps) {
  const id = useId();
  return (
    <>
      {label && (
        <label htmlFor={id} className="block">
          {label}
        </label>
      )}
      <div>
        <div
          className={cn(
            className,
            error && "border-b-rose-400",
            " relative  border-2 rounded-md flex  items-center gap-4  w-full focus-within:border-yellow-600 hover:border-yellow-600 border-yellow-300 focus:border-yellow-600 active:border-yellow-600 duration-300  outline-none "
          )}
        >
          {isRequired && (
            <RequiredIcon className=" absolute right-[-8px] top-[-8px]   text-rose-500 h-5 w-5 " />
          )}
          {left}
          <input
            {...inputProps}
            id={id}
            className={cn(
              "flex grow p-2 h-10 outline-none bg-transparent text-black ",
              inputProps?.className
            )}
          />
        </div>
        {error && (
          <div className="text-rose-400 text-md px-1 pt-2">{error}</div>
        )}
      </div>
    </>
  );
}
