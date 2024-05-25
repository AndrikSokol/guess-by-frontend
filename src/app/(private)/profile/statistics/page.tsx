"use client";
import { Api } from "@/app/api/api";
import { IGame } from "@/app/types/game.interface";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Image from "next/image";

const Page = () => {
  const { data: games, isPending: isGamesPending } = useQuery({
    queryKey: ["userStatistics"],
    queryFn: () => Api.getUserStatistics(),
    retry: 0
  });

  const totalRounds = games?.reduce((acc, curr: IGame) => acc + curr.round, 0);

  const totalTimes = games?.reduce(
    (acc, curr: IGame) =>
      acc +
      (new Date(curr.updatedAt).getMinutes() -
        new Date(curr.createdAt).getMinutes()),
    0
  );

  return (
    <div className=" p-4 w-full mx-auto max-w-[700px]">
      <div className="relative w-full h-80 border-2">
        <Image
          loading="lazy"
          fill={true}
          src="/profile.jpg"
          alt="profile-icon"
        />
      </div>
      {games && (
        <div className="flex justify-center self-start p-4 text-black border-b-2 border-yellow-300">
          <div className="flex flex-col justify-center items-center ">
            <h2 className="p-2 bg-yellow-500 text-white text-lg">
              Total games
            </h2>
            <div className="text-xl ">{games.length}</div>
          </div>
          <div className="flex flex-col justify-center items-center ">
            <h2 className="p-2 bg-yellow-500 text-white text-lg">
              Total rounds
            </h2>
            <div className="text-xl ">{totalRounds}</div>
          </div>
          <div className="flex flex-col justify-center items-center ">
            <h2 className="p-2 bg-yellow-500 text-white text-lg">
              Times in game (minutes)
            </h2>
            <div className="text-xl">{totalTimes}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
