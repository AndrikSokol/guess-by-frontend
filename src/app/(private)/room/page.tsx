// "use client";
// import { Api } from "@/app/api/api";
// import { protectedPage } from "@/app/components/ui/protected-page";
// import { UiButton } from "@/app/components/ui/ui-button";
// import { UiSpinner } from "@/app/components/ui/ui-spinner";
// import { ROUTES } from "@/app/constants/routes";
// import { useAuthQuery } from "@/app/hooks/useAuthQuery";
// import { useMutation } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import { useEffect, useRef, useState } from "react";
// import Slider from "rc-slider";
// import "rc-slider/assets/index.css";
// import Image from "next/image";
// import { cn } from "@/app/utils/cn";

// export enum Level {
//   Easy = "easy",
//   Medium = "medium",
//   Hard = "hard",
//   Landmark = "landmark"
// }

// type GameSettings = {
//   level: Level;
//   totalRounds: number;
// };

// type ActiveCard = {
//   randomGame: boolean;
//   landmarkGame: boolean;
// };

// const Page = () => {
//   const router = useRouter();
//   const { data: user, isPending } = useAuthQuery();
//   const [activeCard, setActiveCard] = useState<ActiveCard>({
//     randomGame: false,
//     landmarkGame: false
//   });
//   const [gameSettings, setGameSettings] = useState<GameSettings>({
//     level: Level.Easy,
//     totalRounds: 5
//   });
//   const [room, setRoom] = useState();

//   const createRoomMutation = useMutation({
//     mutationFn: () => Api.createRoom(),
//     onSuccess: (data) => {
//       setRoom(data);
//     }
//   });

//   const updateRoomMutation = useMutation({
//     mutationFn: (data: any) => Api.updateRoom(data),
//     onSuccess: (data) => {
//       setRoom(data);
//     }
//   });
//   const createGameMutation = useMutation({
//     mutationFn: (data: any) => Api.createGame(data),
//     onSuccess: (data) => {
//       router.push(`${ROUTES.MAP}/${data.link}`);
//     }
//   });

//   useEffect(() => {
//     createRoomMutation.mutate();
//   }, []);

//   const handleButton = () => {
//     createGameMutation.mutate({
//       roomId: room.id,
//       totalRounds: gameSettings.totalRounds
//     });
//   };

//   if (isPending) {
//     return (
//       <div className="w-full  flex justify-center items-center">
//         <UiSpinner className="w-24 h-24 text-yellow-300" />
//       </div>
//     );
//   }

//   return (
//     <div className="w-full  text-black ">
//       <div className="p-4 border-2 flex justify-center items-center flex-col ">
//         <h1 className="text-2xl yellow-300 p-4">Room {room?.link}</h1>
//         <h2 className="text-2xl p-2">
//           Are you ready{" "}
//           <span className="text-yellow-500">{user?.username}</span>?
//         </h2>

//         <div className="grid grid-cols-2 gap-5   ">
//           <div
//             className={cn(
//               "relative h-96 w-48",
//               activeCard.randomGame &&
//                 "  bg-opacity-5  border-2 border-yellow-300 "
//             )}
//             onClick={() =>
//               setActiveCard({ randomGame: true, landmarkGame: false })
//             }
//           >
//             <Image
//               src={"/random.jpg"}
//               fill={true}
//               objectFit="cover"
//               alt="castle"
//               className=""
//             />
//             <h2 className="text-black text-xl  flex w-full justify-center">
//               Random place
//             </h2>

//             {activeCard.randomGame && (
//               <div className="flex absolute z-10 bottom-1/4 left-1/4 bg-white flex-col rounded-md p-2  gap-16 ">
//                 <ul>
//                   <li className=" text-white">
//                     <div
//                       className=" text-center p-4 bg-green-500 cursor-pointer rounded-md"
//                       onClick={() => {
//                         setGameSettings((prev) => ({
//                           ...prev,
//                           level: Level.Easy
//                         }));
//                         updateRoomMutation.mutate({
//                           link: room?.link,
//                           level: gameSettings.level
//                         });
//                       }}
//                     >
//                       <span className="text-xl"> {Level.Easy}</span>
//                     </div>
//                   </li>
//                   {/* <li className="p-4 border border-yellow-300">
//           <div ref={refMedium}>{Level.Medium}</div>
//         </li> */}
//                   <li className=" text-white">
//                     <div
//                       className="p-4  bg-red-500 cursor-pointer text-center rounded-md"
//                       onClick={() => {
//                         setGameSettings((prev) => ({
//                           ...prev,
//                           level: Level.Hard
//                         }));
//                         updateRoomMutation.mutate({
//                           link: room?.link,
//                           level: gameSettings.level
//                         });
//                       }}
//                     >
//                       <span className="text-xl"> {Level.Hard}</span>
//                     </div>
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>
//           <div
//             onClick={() => {
//               setGameSettings((prev) => ({ ...prev, level: Level.Landmark }));
//               setActiveCard({ randomGame: false, landmarkGame: true });
//               updateRoomMutation.mutate({
//                 link: room?.link,
//                 level: gameSettings.level
//               });
//             }}
//             className={cn(
//               "relative  h-96 w-48 ",
//               activeCard.landmarkGame &&
//                 "border-2 bg-yellow-300  backdrop-blur-sm  shadow-sm"
//             )}
//           >
//             <Image
//               src={"/castle.jpg"}
//               fill={true}
//               objectFit="cover"
//               alt="castle"
//             />
//             <h2 className="text-yellow-500  text-xl  flex w-full justify-center">
//               Landmarks{" "}
//             </h2>
//           </div>
//         </div>

//         <div className="p-4 flex justify-center items-center gap-4">
//           <div className=" w-screen max-w-64">
//             <h2 className="text-lg">Count of rounds</h2>
//             <Slider
//               min={1}
//               max={10}
//               dots
//               dotStyle={{ backgroundColor: "black" }}
//               // styles={}
//               defaultValue={gameSettings.totalRounds}
//               step={1}
//               onChange={(e) =>
//                 setGameSettings((prev) => ({
//                   ...prev,
//                   totalRounds: Number(e.toLocaleString())
//                 }))
//               }
//             ></Slider>
//           </div>

//           <p className="text-xl"> {gameSettings.totalRounds}</p>
//         </div>

//         <div className="text-black text-xl p-4">
//           Level: {gameSettings.level}
//         </div>
//         <UiButton
//           disabled={createGameMutation.isPending}
//           onClick={handleButton}
//           variant="primary"
//         >
//           {createGameMutation.isPending ? (
//             <UiSpinner className="w-8 h-8 text-white" />
//           ) : (
//             "play"
//           )}
//         </UiButton>
//       </div>
//     </div>
//   );
// };

// export default protectedPage(Page);

"use client";
import { Api } from "@/app/api/api";
import { protectedPage } from "@/app/components/ui/protected-page";
import { UiButton } from "@/app/components/ui/ui-button";
import { UiSpinner } from "@/app/components/ui/ui-spinner";
import { ROUTES } from "@/app/constants/routes";
import { useAuthQuery } from "@/app/hooks/useAuthQuery";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Image from "next/image";
import { cn } from "@/app/utils/cn";

export enum Level {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
  Landmark = "landmark"
}

type GameSettings = {
  level: Level;
  totalRounds: number;
};

type ActiveCard = {
  randomGame: boolean;
  landmarkGame: boolean;
};

const Page = () => {
  const router = useRouter();
  // const { data: user, isPending } = useAuthQuery();
  // const [activeCard, setActiveCard] = useState<ActiveCard>({
  //   randomGame: false,
  //   landmarkGame: false
  // });
  // const [gameSettings, setGameSettings] = useState<GameSettings>({
  //   level: Level.Easy,
  //   totalRounds: 5
  // });
  // const [room, setRoom] = useState();

  const createRoomMutation = useMutation({
    mutationFn: () => Api.createRoom(),
    onSuccess: (data) => {
      router.push(`${ROUTES.ROOM}/${data.link}`);
    }
  });

  // const updateRoomMutation = useMutation({
  //   mutationFn: (data: any) => Api.updateRoom(data),
  //   onSuccess: (data) => {
  //     setRoom(data);
  //   }
  // });
  // const createGameMutation = useMutation({
  //   mutationFn: (data: any) => Api.createGame(data),
  //   onSuccess: (data) => {
  //     router.push(`${ROUTES.MAP}/${data.link}`);
  //   }
  // });

  useEffect(() => {
    createRoomMutation.mutate();
  }, []);

  // const handleButton = () => {
  //   createGameMutation.mutate({
  //     roomId: room.id,
  //     totalRounds: gameSettings.totalRounds
  //   });
  // };

  // if (isPending) {
  //   return (
  //     <div className="w-full  flex justify-center items-center">
  //       <UiSpinner className="w-24 h-24 text-yellow-300" />
  //     </div>
  //   );
  // }

  return <div className="w-full  text-black "></div>;
};

export default protectedPage(Page);
