"use client";

import React, { useEffect, useState, useCallback, FC } from "react";
import {
  APIProvider,
  useMap,
  useStreetViewPanorama,
  Map
} from "@vis.gl/react-google-maps";
import { IPlace } from "../types/place.interface";
import { useRoundStore } from "../stores/zustand.store";
import { StreetViewPanorama } from "./StreetViewPanorama";
import { useQuery } from "@tanstack/react-query";
import { Api } from "../api/api";
import { useGameQuery } from "../hooks/useGameQuery";
import { UiPageSpinner } from "../components/ui/ui-page-spinner";

type StreetViewProps = {
  places: IPlace[];
  link: string;
};

interface IPosition {
  lat: number;
  lng: number;
}

export const StreetView: FC<StreetViewProps> = ({ places, link }) => {
  const [divContainer, setDivContainer] = useState<HTMLDivElement | null>(null);
  const [currentPlace, setCurrentPlace] = useState<IPlace>({} as IPlace);
  // const { round, resetRound } = useRoundStore();

  const { data: game, isPending } = useGameQuery(link);

  const divRef = useCallback(
    (node: React.SetStateAction<HTMLDivElement | null>) => {
      node && setDivContainer(node);
    },
    []
  );

  useEffect(() => {
    setCurrentPlace(places[game.round - 1]);
  }, [game.round]);

  if (isPending) {
    return <UiPageSpinner />;
  }
  return (
    <div className="h-screen" ref={divRef}>
      {divContainer && (
        <StreetViewPanorama
          key={`street-view-${currentPlace.id}`} // Change key when round changes
          divContainer={divContainer}
          position={{ lat: currentPlace.lat, lng: currentPlace.lng }}
          pov={{
            heading: currentPlace.heading,
            pitch: currentPlace.pitch
          }}
        />
      )}
    </div>
  );
};
