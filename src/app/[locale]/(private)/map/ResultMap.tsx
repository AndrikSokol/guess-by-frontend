"use client";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState
} from "react";
import { calculateDistance } from "@/app/utils/calculateDistance";
import { useRoundStore } from "@/app/stores/zustand.store";
import { Map, Marker } from "@vis.gl/react-google-maps";
import { UiButton } from "@/app/components/ui/ui-button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Api } from "@/app/api/api";
import { useGameQuery } from "@/app/hooks/useGameQuery";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/constants/routes";

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
  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    if (marker && location) {
      const dist = calculateDistance(marker, location);
      setDistance(dist);
    }
  }, [marker, location]);

  if (isAnswered) {
    return (
      <div className="absolute top-0 w-full h-full left-0 z-20">
        <Map
          defaultCenter={{
            lat: (location.lat + marker.lat) / 2.0,
            lng: (location.lng + marker.lng) / 2.0
          }}
          defaultZoom={7}
          disableDefaultUI={true}
        >
          <Marker position={marker} />
          <Marker position={location} />
        </Map>
        <div className="absolute bottom-0 h-24  bg-white w-full flex  gap-8 items-center justify-center">
          <div className=" text-black">
            <h2>
              distance:{" "}
              {distance !== null
                ? `${distance.toFixed(4)} km`
                : "Calculating..."}
            </h2>
          </div>
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
