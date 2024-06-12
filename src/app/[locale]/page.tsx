import { SplineScene } from "../components/SplineScene";

export default async function Home() {
  return (
    <main className="flex   bg-amber-200  bg-transparent w-screen  h-screen ">
      <div className=" flex-1">
        <SplineScene />
      </div>
    </main>
  );
}
