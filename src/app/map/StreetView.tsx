"use client";

import React, { useEffect, useState, useCallback, FC } from "react";
import {
  APIProvider,
  useMap,
  useStreetViewPanorama,
  Map,
} from "@vis.gl/react-google-maps";
import { IPlace } from "../types/place.interface";
import { useRoundStore } from "../stores/zustand.store";
import { StreetViewPanorama } from "./StreetViewPanorama";

type StreetViewProps = {
  places: IPlace[];
};

interface IPosition {
  lat: number;
  lng: number;
}

export const StreetView: FC<StreetViewProps> = ({ places }) => {
  const [divContainer, setDivContainer] = useState<HTMLDivElement | null>(null);
  const [currentPlace, setCurrentPlace] = useState<IPlace>({} as IPlace);
  const { round, resetRound } = useRoundStore();

  const divRef = useCallback(
    (node: React.SetStateAction<HTMLDivElement | null>) => {
      node && setDivContainer(node);
    },
    []
  );

  useEffect(() => {
    setCurrentPlace(places[round]);
    if (round === 5 || round == places.length - 1) resetRound();
  }, [round]);

  return (
    <div className="h-screen" ref={divRef}>
      {divContainer && (
        <StreetViewPanorama
          key={`street-view-${round}`} // Change key when round changes
          divContainer={divContainer}
          position={{ lat: currentPlace.lat, lng: currentPlace.lng }}
          pov={{
            heading: currentPlace.heading,
            pitch: currentPlace.pitch,
          }}
        />
      )}
    </div>
  );
};
