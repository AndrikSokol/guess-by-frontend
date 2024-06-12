"use client";
import { APIProvider } from "@vis.gl/react-google-maps";
import { ReactNode } from "react";
import { protectedPage } from "@/app/components/ui/protected-page";

interface MapLayoutProps {
  children: ReactNode;
}

const MapLayout = ({ children }: MapLayoutProps) => {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
      {children}
    </APIProvider>
  );
};

export default protectedPage(MapLayout);
