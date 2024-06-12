"use client";

import { Api } from "@/app/api/api";
import { protectedPage } from "@/app/components/ui/protected-page";
import { UiButton } from "@/app/components/ui/ui-button";
import { UiTextField } from "@/app/components/ui/ui-text-field";
import { useAuthQuery } from "@/app/hooks/useAuthQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useUserAvatarStore } from "@/app/stores/zustand.store";
import { UiSpinner } from "@/app/components/ui/ui-spinner";
import Image from "next/image";
import { useIntl } from "react-intl";
import { toastOptions } from "@/app/utils/toastOptions";
import { AxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Inputs = {
  firstName?: string;
  lastName?: string;
  email?: string;
  birthdate?: Date;
};

const Page = () => {
  const { data: user, isPending } = useAuthQuery();
  const t = useIntl();
  const { avatarPath, clearState } = useUserAvatarStore();

  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: (data) => Api.updateProfile(data),

    onSuccess: () => {
      toast.success("information was updated!", toastOptions);
    },
    onError: (error: AxiosError) => {
      toast.error(error.response?.data?.message, toastOptions);
    }
  });

  useEffect(() => {
    return () => {
      clearState();
    };
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<Inputs>();

  useEffect(() => {
    setValue("firstName", user?.firstName);
    setValue("lastName", user?.lastName);
    setValue("email", user?.email);
    if (user?.profile?.birthdate)
      setValue("birthdate", user?.profile?.birthdate);
  }, [user]);

  return (
    <>
      <div className=" px-8  w-full flex   text-black ">
        <ToastContainer />
        <div className="p-4 w-full ">
          <h1 className="text-black text-2xl py-4 ">
            {t.formatMessage({ id: "profile" })}
          </h1>
          {isPending && <UiSpinner className="w-9 h-8 text-yellow-300" />}
          <div className="absolute  -z-10 right-10 top-0">
            <Image
              className=" "
              width={600}
              height={600}
              quality={100}
              src="/people-with-earth.jpg"
              alt="people-with-earth-icon"
            />
          </div>
          <form
            className=" relative w-full  max-w-96"
            onSubmit={handleSubmit((data) => {
              const dto: any = {};

              if (data.firstName) dto.firstName = data.firstName;
              if (data.lastName) dto.lastName = data.lastName;

              if (data.birthdate) dto.birthdate = data.birthdate;
              if (avatarPath) dto.avatar = avatarPath;
              clearState();
              updateProfileMutation.mutate(dto);
              queryClient.invalidateQueries({ queryKey: ["auth"] });
            })}
          >
            <UiTextField
              className="mb-2"
              label={t.formatMessage({ id: "email" })}
              error={errors.email?.message}
              inputProps={{
                placeholder: "email",
                type: "email",
                disabled: true,
                ...register("email")
              }}
            />
            <UiTextField
              label={t.formatMessage({ id: "first_name" })}
              error={errors.firstName?.message}
              inputProps={{
                placeholder: `${t.formatMessage({ id: "first_name" })}`,
                type: "firstName",
                ...register("firstName", {
                  required: false,
                  minLength: {
                    value: 2,
                    message: `${t.formatMessage({
                      id: "first_name_length_error"
                    })}`
                  }
                })
              }}
            />
            <UiTextField
              label={t.formatMessage({ id: "last_name" })}
              error={errors.lastName?.message}
              inputProps={{
                placeholder: `${t.formatMessage({ id: "last_name" })}`,
                type: "lastName",
                ...register("lastName", {
                  required: false,
                  minLength: {
                    value: 2,
                    message: `${t.formatMessage({
                      id: "last_name_length_error"
                    })}`
                  }
                })
              }}
            />
            <UiTextField
              label={t.formatMessage({ id: "birthdate" })}
              error={errors.birthdate?.message}
              inputProps={{
                type: "date",
                placeholder: `${t.formatMessage({ id: "birthdate" })}`,
                ...register("birthdate", {
                  required: false
                })
              }}
            />
            <div className="py-2 flex w-full ">
              <UiButton className="w-full" type="submit" variant="primary">
                {updateProfileMutation.isPending ? (
                  <UiSpinner className="w-6 h-6 text-white" />
                ) : (
                  `${t.formatMessage({ id: "update" })}`
                )}
              </UiButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default protectedPage(Page);
