"use client";

import React, { useEffect, useState, useCallback, FC } from "react";
import { IPlace } from "@/app/types/place.interface";
import { StreetViewPanorama } from "./street-view-panorama";
import { useGameQuery } from "@/app/hooks/useGameQuery";
import { UiPageSpinner } from "@/app/components/ui/ui-page-spinner";

type StreetViewProps = {
  places: IPlace[];
  link: string;
};

export const StreetView: FC<StreetViewProps> = ({ places, link }) => {
  const [divContainer, setDivContainer] = useState<HTMLDivElement | null>(null);
  const [currentPlace, setCurrentPlace] = useState<IPlace>({} as IPlace);

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

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
       .gm-iv-address {
        display: none; /* Hide the address link */
      }
     
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (isPending) {
    return <UiPageSpinner />;
  }
  return (
    <div className="h-screen" ref={divRef}>
      {divContainer && (
        <StreetViewPanorama
          key={`street-view-${currentPlace.id}`}
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
