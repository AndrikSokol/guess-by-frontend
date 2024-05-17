"use client";
import { useEffect, useState } from "react";
import { Map, Marker } from "@vis.gl/react-google-maps";
import { useRoundStore } from "../stores/zustand.store";

interface IMarker {
  lat: number;
  lng: number;
}

export const DefaultMap = () => {
  const positionMap = { lat: 23.797439, lng: 18.993509 };

  const [marker, setMarker] = useState<IMarker>({} as IMarker);

  const { isEnded, setEndedRound } = useRoundStore();

  const handleSetMarker = (event: any) => {
    const { lat, lng } = event.detail?.latLng;
    setMarker({ lat, lng });
  };

  const handleConfirmButton = (event: any) => {
    setEndedRound();
  };

  console.log(marker);
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
      <button
        className=" absolute bottom-0 left-0 bg-emerald-500  rounded-tr-md p-2"
        onClick={(e) => handleConfirmButton(e)}
      >
        Confirm
      </button>
    </div>
  );
};
