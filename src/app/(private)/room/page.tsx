"use client";
import { Api } from "@/app/api/api";
import { protectedPage } from "@/app/components/ui/protected-page";
import { UiButton } from "@/app/components/ui/ui-button";
import { UiSpinner } from "@/app/components/ui/ui-spinner";
import { ROUTES } from "@/app/constants/routes";
import { useAuthQuery } from "@/app/hooks/useAuthQuery";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export enum Level {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard"
}

const Page = () => {
  const router = useRouter();
  const { data: user, isPending } = useAuthQuery();

  const [room, setRoom] = useState();

  const createRoomMutation = useMutation({
    mutationFn: (data) => Api.createRoom(data),
    onSuccess: (data) => {
      setRoom(data);
    }
  });

  const createGameMutation = useMutation({
    mutationFn: (data) => Api.createGame(data),
    onSuccess: (data) => {
      router.push(`${ROUTES.MAP}/${data.link}`);
    }
  });

  useEffect(() => {
    createRoomMutation.mutate({ level: Level.Easy });
  }, []);

  const handleButton = () => {
    createGameMutation.mutate({ roomId: room.id, totalRounds: 5 });
  };

  const [level, setLevel] = useState();

  if (isPending) {
    return (
      <div className="w-full  flex justify-center items-center">
        <UiSpinner className="w-24 h-24 text-yellow-300" />
      </div>
    );
  }

  const refEasy = useRef<HTMLDivElement>(null);
  const refMedium = useRef<HTMLDivElement>(null);
  const refHard = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full  text-black">
      <div className="p-4 border-2 flex justify-center items-center flex-col max-w-96">
        <h2 className="text-2xl">
          Are you ready{" "}
          <span className="text-yellow-500">{user?.username}</span>?
        </h2>
        <h2 className="pt-4 text-xl">Choose a Level</h2>

        <ul className="flex gap-2 py-4">
          <li className="">
            <div
              ref={refEasy}
              className="p-4 border border-yellow-300 cursor-pointer"
              onClick={() => {}}
            >
              {Level.Easy}
            </div>
          </li>
          <li className="p-4 border border-yellow-300">
            <div ref={refMedium}>{Level.Medium}</div>
          </li>
          <li className="p-4 border border-yellow-300">
            <div>{Level.Hard}</div>
          </li>
        </ul>
        <div>
          <h2 className="text-xl">Count of rounds</h2>
          <input type="range" min="1" max="10" value="5"></input>
          <Slider min={1} max={10} defaultValue={5} step={1}></Slider>
        </div>
        <UiButton
          disabled={createGameMutation.isPending}
          onClick={handleButton}
          variant="primary"
        >
          {createGameMutation.isPending ? (
            <UiSpinner className="w-8 h-8 text-white" />
          ) : (
            "start"
          )}
        </UiButton>
      </div>
    </div>
  );
};

export default protectedPage(Page);
