"use client";

import { Api } from "@/app/api/api";

import { UiButton } from "@/app/components/ui/ui-button";
import { UiModal } from "@/app/components/ui/ui-modal";
import { UiSpinner } from "@/app/components/ui/ui-spinner";
import { UiTextField } from "@/app/components/ui/ui-text-field";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";

type Inputs = {
  email: string;
};

const Page = () => {
  const { register, handleSubmit, formState: errors } = useForm<Inputs>();
  const t = useIntl();
  const forgotPasswordMutation = useMutation({
    mutationFn: (data: any) => Api.forgotUserPassword(data)
  });
  return (
    <UiModal
      content={
        <div className="flex flex-col w-full items-center">
          <Image
            src="/forgot-password.jpg"
            width={300}
            height={300}
            alt="forgot-password-icon"
          />
          <form
            className="max-w-96 w-full"
            onSubmit={handleSubmit((data) => {
              forgotPasswordMutation.mutate(data);
            })}
          >
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
              disabled={forgotPasswordMutation.isPending}
              className="my-2 w-full"
              type="submit"
              variant="primary"
            >
              {forgotPasswordMutation.isPending ? (
                <UiSpinner className="w-8 h-8 text-white" />
              ) : (
                `${t.formatMessage({ id: "send" })}`
              )}
            </UiButton>
          </form>
          {forgotPasswordMutation.isSuccess && (
            <h2 className="text-black">
              {forgotPasswordMutation.data?.message}
            </h2>
          )}
        </div>
      }
    ></UiModal>
  );
};

export default Page;
