"use client";

import { Position } from "@/app/types/position.type";
import { useStreetViewPanorama } from "@vis.gl/react-google-maps";
import { FC } from "react";

export const StreetViewPanorama: FC<{
  divContainer: HTMLDivElement | null;
  position: Position;
  pov: { heading: number; pitch: number };
  containerClassName?: string;
}> = ({ divContainer, position, pov }) => {
  useStreetViewPanorama({
    divElement: divContainer,
    position,
    pov
  });

  return null;
};
