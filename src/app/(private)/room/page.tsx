"use client";
import { Api } from "@/app/api/api";
import { protectedPage } from "@/app/components/ui/protected-page";

import { ROUTES } from "@/app/constants/routes";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import "rc-slider/assets/index.css";
import { UiSpinner } from "@/app/components/ui/ui-spinner";

const Page = () => {
  const router = useRouter();

  const createRoomMutation = useMutation({
    mutationFn: () => Api.createRoom(),
    onSuccess: (data) => {
      router.push(`${ROUTES.ROOM}/${data.link}`);
    }
  });

  useEffect(() => {
    createRoomMutation.mutate();
  }, []);

  return (
    <div>
      {createRoomMutation.isPending && (
        <UiSpinner className="text-yellow-500 w-14 h14" />
      )}
    </div>
  );
};

export default protectedPage(Page);
