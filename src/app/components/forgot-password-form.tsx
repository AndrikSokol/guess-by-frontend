import { UiButton } from "@/app/components/ui/ui-button";
import { UiSpinner } from "@/app/components/ui/ui-spinner";
import { UiTextField } from "@/app/components/ui/ui-text-field";
import { useForgotPasswordForm } from "../hooks/useForgotPasswordForm";
import Image from "next/image";

export const ForgotPasswordForm = () => {
  const { register, errors, handleSubmit, t, isPending, isSuccess, message } =
    useForgotPasswordForm();

  return (
    <div className="flex flex-col items-center">
      <Image
        src="/forgot-password.jpg"
        width={300}
        height={300}
        alt="forgot-password-icon"
      />
      <form className="max-w-96 w-full" onSubmit={handleSubmit}>
        <h1 className="text-black py-2">
          {t.formatMessage({ id: "forgot_password" })}
        </h1>
        <UiTextField
          error={errors?.email?.message}
          inputProps={{
            placeholder: `${t.formatMessage({ id: "email" })}`,
            type: "email",
            ...register("email", {
              required: {
                value: true,
                message: `${t.formatMessage({ id: "required_error" })}`
              }
            })
          }}
        />
        <UiButton
          disabled={isPending}
          className="my-2 w-full"
          type="submit"
          variant="primary"
        >
          {isPending ? (
            <UiSpinner className="w-8 h-8 text-white" />
          ) : (
            `${t.formatMessage({ id: "send" })}`
          )}
        </UiButton>
        {isSuccess && <h2 className="text-black">{message}</h2>}
      </form>
    </div>
  );
};
