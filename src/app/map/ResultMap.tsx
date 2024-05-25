"use client";
import React, { Dispatch, FC, SetStateAction } from "react";
import calculateDistance from "../utils/calculateDistance";
import { useRoundStore } from "../stores/zustand.store";
import { Map, Marker } from "@vis.gl/react-google-maps";
import { UiButton } from "../components/ui/ui-button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Api } from "../api/api";
import { useGameQuery } from "../hooks/useGameQuery";
import { useRouter } from "next/navigation";
import { ROUTES } from "../constants/routes";

type ResultMapProps = {
  isAnswered: boolean;
  setIsAnswered: Dispatch<SetStateAction<boolean>>;
  link: string;
};
export const ResultMap: FC<ResultMapProps> = ({
  isAnswered,
  setIsAnswered,
  link
}) => {
  const { marker, location, clearState } = useRoundStore();

  const queryClient = useQueryClient();
  const router = useRouter();
  const gameMutation = useMutation({
    mutationFn: () => Api.updateGameByLink(link),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["game"] });
      queryClient.invalidateQueries({ queryKey: ["userScore"] });
    }
  });

  const { data: game } = useGameQuery(link);

  if (isAnswered) {
    return (
      <div className="absolute top-0 w-full h-full left-0 z-20">
        <Map defaultCenter={location} defaultZoom={7} disableDefaultUI={true}>
          <Marker position={marker} />
          <Marker position={location} />
        </Map>
        <div className="absolute bottom-0 h-12  bg-white w-full flex items-center justify-center">
          <UiButton
            variant="secondary"
            onClick={() => {
              if (game.round === game.totalRounds) {
                router.push(ROUTES.HOME);
              } else {
                gameMutation.mutate();
              }
              setIsAnswered((prev: boolean) => !prev);
              clearState();
            }}
          >
            {game.round === game.totalRounds ? "Go main" : "Next"}
          </UiButton>
        </div>
      </div>
    );
  }
};
