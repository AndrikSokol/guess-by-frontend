"use client";

import { Api } from "@/app/api/api";
import { Aside } from "@/app/components/aside";
import { UiButton } from "@/app/components/ui/ui-button";
import { UiModal } from "@/app/components/ui/ui-modal";
import { UiSpinner } from "@/app/components/ui/ui-spinner";
import { UiTextField } from "@/app/components/ui/ui-text-field";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  email: string;
};

const Page = () => {
  const { register, handleSubmit, formState: errors } = useForm<Inputs>();

  const router = useRouter();

  // useEffect(() => {
  //   router.replace({
  //     query: { ...router.query, modal: "forgot-password" }
  //   });
  // }, []);
  const forgotPasswordMutation = useMutation({
    mutationFn: (data: any) => Api.forgotUserPassword(data)
  });
  return (
    <div className="flex">
      <Aside></Aside>
      <UiModal
        type="forgot-password"
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
                Forgot password? Don`t worry just write a email
              </h1>
              <UiTextField
                error={errors?.email?.message}
                inputProps={{
                  placeholder: "email",
                  type: "email",
                  ...register("email", { required: true })
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
                  "Send"
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
    </div>
  );
};

export default Page;
