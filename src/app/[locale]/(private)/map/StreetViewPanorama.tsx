"use client";

import { useStreetViewPanorama } from "@vis.gl/react-google-maps";
import { FC, useEffect } from "react";

interface IPosition {
  lat: number;
  lng: number;
}

export const StreetViewPanorama: FC<{
  divContainer: HTMLDivElement | null;
  position: IPosition;
  pov: { heading: number; pitch: number };
  containerClassName?: string;
}> = ({ divContainer, position, pov, containerClassName }) => {
  // Include options in destructuring
  useStreetViewPanorama({
    divElement: divContainer,
    position,
    pov
  });

  return null;
};
