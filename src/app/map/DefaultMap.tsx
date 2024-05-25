"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Map, Marker } from "@vis.gl/react-google-maps";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Api } from "../api/api";
import calculateDistance from "../utils/calculateDistance";
import { useRoundStore } from "../stores/zustand.store";
import { UiButton } from "../components/ui/ui-button";
import { calculateMapScoreFactor } from "../utils/calculateMapScoreFactor";
import { useGameQuery } from "../hooks/useGameQuery";

interface IMarker {
  lat: number;
  lng: number;
}

export const DefaultMap = ({
  link,
  setIsAnswered
}: {
  link: string;
  setIsAnswered: Dispatch<SetStateAction<boolean>>;
}) => {
  const positionMap = { lat: 23.797439, lng: 18.993509 };

  const [marker, setMarkers] = useState<IMarker>({} as IMarker);

  const { setLocation, setMarker } = useRoundStore();
  const { data: game, isPending } = useGameQuery(link);

  const addScoreMutation = useMutation({
    mutationFn: (dto: any) => Api.addScore(dto)
  });

  const handleSetMarker = (event: any) => {
    const { lat, lng } = event.detail?.latLng;
    setMarkers({ lat, lng });
  };

  const handleConfirmButton = (event: any) => {
    setIsAnswered(true);
    setMarker(marker);
    setLocation(game.locations[game.round - 1]);

    const scoreDto = {
      marker: marker,
      location: game.locations[game.round - 1],
      link: link
    };
    setMarkers({} as IMarker);
    addScoreMutation.mutate(scoreDto);
  };

  return (
    <div className=" absolute border-4  rounded-md z-10 w-60 h-60 bottom-0 right-0 hover:w-96 hover:h-96 ease-in duration-100">
      <Map
        defaultCenter={positionMap}
        defaultZoom={1}
        disableDefaultUI={true}
        onClick={(e) => handleSetMarker(e)}
      >
        <Marker position={marker} />
      </Map>
      <UiButton
        variant="primary"
        className=" absolute bottom-0 left-0"
        onClick={(e) => handleConfirmButton(e)}
      >
        Confirm
      </UiButton>
    </div>
  );
};
