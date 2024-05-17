"use client";

import { useStreetViewPanorama } from "@vis.gl/react-google-maps";
import { FC } from "react";

interface IPosition {
  lat: number;
  lng: number;
}

export const StreetViewPanorama: FC<{
  divContainer: HTMLDivElement | null;
  position: IPosition;
  pov: { heading: number; pitch: number };
}> = ({ divContainer, position, pov }) => {
  useStreetViewPanorama({
    divElement: divContainer,
    position,
    pov,
  });

  return null; // You can render additional components here if needed
};
