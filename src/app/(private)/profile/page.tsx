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

type Inputs = {
  firstName?: string;
  lastName?: string;
  email?: string;
  birthdate?: Date;
};

const Page = () => {
  const { data: user, isPending } = useAuthQuery();

  const { avatarPath, clearState } = useUserAvatarStore();

  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: (data) => Api.updateProfile(data)
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
    setValue("birthdate", user?.profile?.birthdate);
  }, [user]);

  return (
    <>
      <div className=" px-8  w-full flex   text-black ">
        <div className="p-4 w-full ">
          <h1 className="text-black text-2xl py-4 ">Profile settings</h1>
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
              label="email"
              error={errors.email?.message}
              inputProps={{
                placeholder: "email",
                type: "email",
                disabled: true,
                ...register("email")
              }}
            />
            <UiTextField
              label="first name"
              error={errors.firstName?.message}
              inputProps={{
                placeholder: "firstName",
                type: "firstName",
                ...register("firstName", {
                  required: false,
                  minLength: {
                    value: 2,
                    message: "first name must be more than 2 char"
                  }
                })
              }}
            />
            <UiTextField
              label="last name"
              error={errors.lastName?.message}
              inputProps={{
                placeholder: "lastName",
                type: "lastName",
                ...register("lastName", {
                  required: false,
                  minLength: {
                    value: 2,
                    message: "last name must be more than 2 char"
                  }
                })
              }}
            />
            <UiTextField
              label="birthdate"
              error={errors.birthdate?.message}
              inputProps={{
                type: "date",
                placeholder: "birthdate",
                ...register("birthdate", {
                  required: false
                })
              }}
            />
            <div className="py-2 flex w-full ">
              <UiButton className="w-full" type="submit" variant="primary">
                Update
              </UiButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default protectedPage(Page);
