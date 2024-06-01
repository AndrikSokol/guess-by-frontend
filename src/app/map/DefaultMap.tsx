"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Map, Marker } from "@vis.gl/react-google-maps";
import { useMutation } from "@tanstack/react-query";
import { Api } from "../api/api";

import { useRoundStore } from "../stores/zustand.store";
import { UiButton } from "../components/ui/ui-button";

import { useGameQuery } from "../hooks/useGameQuery";

interface IMarker {
  lat: number;
  lng: number;
}

const mapStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [{ visibility: "off" }]
  }
];

const positionMap = { lat: 53.8625801, lng: 28.166626 };

export const DefaultMap = ({
  link,
  setIsAnswered
}: {
  link: string;
  setIsAnswered: Dispatch<SetStateAction<boolean>>;
}) => {
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
    addScoreMutation.mutate(scoreDto);
  };

  return (
    <div className=" absolute border-4  rounded-md z-10 w-60 h-60 bottom-0 right-0 hover:w-96 hover:h-96 ease-in duration-100">
      <Map
        defaultCenter={positionMap}
        defaultZoom={5}
        disableDefaultUI={true}
        styles={mapStyles}
        onClick={(e) => handleSetMarker(e)}
      >
        {marker && <Marker position={marker} />}
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
