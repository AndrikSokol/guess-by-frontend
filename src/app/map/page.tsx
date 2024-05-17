import { IPlace } from "../types/place.interface";
import { DefaultMap } from "./DefaultMap";
import { StreetView } from "./StreetView";
import { Timer } from "./Timer";
import { promises as fs } from "fs";

export default async function Page() {
  const file = await fs.readFile(
    process.cwd() + "/src/app/easyLevel.json",
    "utf8"
  );
  const locations = JSON.parse(file);

  const getRandomPlaces = () => {
    const places = [] as IPlace[];
    for (let i = 0; i < locations.length; i++) {
      const randomIndexes = Math.floor(Math.random() * locations.length);
      const randomPlace: IPlace = locations[randomIndexes];
      places.push(randomPlace);
    }
    return places;
  };

  const places: IPlace[] = getRandomPlaces();
  return (
    <div className="relative flex h-screen">
      <aside className="absolute w-32  z-10 bg-opacity-45 h-screen bg-black">
        <h2 className="w-full  py-10 text-center">Score</h2>
      </aside>
      <Timer />
      <div className=" w-full">
        <StreetView places={places} />
      </div>

      <DefaultMap />
    </div>
  );
}
