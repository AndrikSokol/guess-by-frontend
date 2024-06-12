"use client";
import { Api } from "@/app/api/api";
import { protectedPage } from "@/app/components/ui/protected-page";
import { UiButton } from "@/app/components/ui/ui-button";
import { UiSpinner } from "@/app/components/ui/ui-spinner";
import { ROUTES } from "@/app/constants/routes";
import { useAuthQuery } from "@/app/hooks/useAuthQuery";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Image from "next/image";
import { cn } from "@/app/utils/cn";
import { useIntl } from "react-intl";

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

const Page = ({ params }: { params: { slug: string } }) => {
  const link = params.slug;

  const t = useIntl();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: user, isPending } = useAuthQuery();
  const [activeCard, setActiveCard] = useState<ActiveCard>({
    randomGame: false,
    landmarkGame: false
  });
  const [opacity, setOpacity] = useState(true);
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    level: Level.Easy,
    totalRounds: 5
  });

  useEffect(() => {
    setOpacity((prev) => !prev);
  }, [activeCard.randomGame]);

  const updateRoomMutation = useMutation({
    mutationFn: (data: any) => Api.updateRoom(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["room"] });
    }
  });
  const createGameMutation = useMutation({
    mutationFn: (data: any) => Api.createGame(data),
    onSuccess: (data) => {
      router.push(`${ROUTES.MAP}/${data.link}`);
    }
  });

  const { data: room } = useQuery({
    queryKey: ["room"],
    queryFn: () => Api.getRoom(link)
  });

  const handleButton = () => {
    createGameMutation.mutate({
      roomId: room.id,
      totalRounds: gameSettings.totalRounds,
      level: room.level.name
    });
  };

  if (isPending) {
    return (
      <div className="w-full  flex justify-center items-center">
        <UiSpinner className="w-24 h-24 text-yellow-300" />
      </div>
    );
  }

  return (
    <div className="w-full  text-black md:pl-[176px] ">
      <div className="pb-4 flex justify-center items-center flex-col ">
        <h1 className="text-2xl yellow-300 p-4">
          {t.formatMessage({ id: "room" })}{" "}
        </h1>
        <h2 className="text-2xl p-2">
          {t.formatMessage({ id: "are_you_ready" })}{" "}
          <span className="text-yellow-500">{user?.username}</span>?
        </h2>

        <div className="grid grid-cols-2 gap-5 ">
          <div
            className={cn(
              "relative h-96 w-48 overflow-hidden duration-300",
              activeCard.randomGame &&
                "  bg-opacity-5  border-2 border-yellow-300 ",
              activeCard.randomGame && " overflow-visible   scale-x-[-100%] "
            )}
            onClick={() =>
              setActiveCard({ randomGame: true, landmarkGame: false })
            }
          >
            <Image
              src={"/random.jpg"}
              fill={true}
              objectFit="cover"
              alt="castle"
              className={cn(
                "cursor-default duration-300 transition-all  ",
                !activeCard.randomGame && "hover:scale-[103%] cursor-pointer",
                activeCard.randomGame && "opacity-50    blur-sm"
              )}
            />

            {activeCard.randomGame && (
              <div
                className={cn(
                  "absolute z-30 top-4  left-1 right-1   delay-200 duration-300  scale-x-[-100%] rounded-md ",
                  opacity ? "opacity-0" : "opacity-100"
                )}
              >
                <h3 className="text-center py-2 text-lg">
                  {" "}
                  {t.formatMessage({ id: "level" }).slice(0, 1).toUpperCase() +
                    t.formatMessage({ id: "level" }).slice(1)}
                </h3>
                <ul className="flex flex-col gap-4">
                  <li className=" text-white">
                    <div
                      className=" text-center py-[6px]   hover:bg-green-700 duration-200   bg-green-500 cursor-pointer rounded-md"
                      onClick={() => {
                        setGameSettings((prev) => ({
                          ...prev,
                          level: Level.Easy
                        }));
                        updateRoomMutation.mutate({
                          link: room?.link,
                          level: Level.Easy
                        });
                      }}
                    >
                      <span className="text-xl">
                        {t.formatMessage({ id: "easy" })}
                      </span>
                    </div>
                  </li>

                  <li className=" text-white">
                    <div
                      className="py-[6px]  bg-red-500  duration-200   hover:bg-red-700 cursor-pointer text-center rounded-md"
                      onClick={() => {
                        updateRoomMutation.mutate({
                          link: room?.link,
                          level: Level.Hard
                        });
                      }}
                    >
                      <span className="text-xl">
                        {" "}
                        {t.formatMessage({ id: "hard" })}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div
            onClick={() => {
              setGameSettings((prev) => ({ ...prev, level: Level.Landmark }));
              setActiveCard({ randomGame: false, landmarkGame: true });
              updateRoomMutation.mutate({
                link: room?.link,
                level: Level.Landmark
              });
            }}
            className={cn(
              "relative  h-96 w-48  overflow-hidden",
              activeCard.landmarkGame &&
                "border-2 border-yellow-300  backdrop-blur-sm  shadow-sm"
            )}
          >
            <Image
              src={"/castle.jpg"}
              fill={true}
              objectFit="cover"
              alt="castle"
              className={cn(
                " cursor-default duration-300 transition-all",
                !activeCard.landmarkGame && "hover:scale-[103%] cursor-pointer"
              )}
            />
            <h2 className="text-yellow-500  text-xl  flex w-full justify-center">
              Landmarks{" "}
            </h2>
          </div>
        </div>

        <div className="p-4 flex justify-center items-center gap-4">
          <div className=" w-screen max-w-64">
            <h2 className="text-lg">
              {t.formatMessage({ id: "count_of_rounds" })}
            </h2>
            <Slider
              min={1}
              max={10}
              dots
              dotStyle={{ backgroundColor: "black" }}
              defaultValue={gameSettings.totalRounds}
              step={1}
              onChange={(e) =>
                setGameSettings((prev) => ({
                  ...prev,
                  totalRounds: Number(e.toLocaleString())
                }))
              }
            ></Slider>
          </div>

          <p className="text-xl"> {gameSettings.totalRounds}</p>
        </div>

        <div className="text-black text-xl p-4">
          {!room?.level?.name && t.formatMessage({ id: "choose_a" })}{" "}
          {t.formatMessage({ id: "level" })} {room?.level?.name}
        </div>
        <UiButton
          disabled={createGameMutation.isPending}
          onClick={handleButton}
          variant="primary"
        >
          {createGameMutation.isPending ? (
            <UiSpinner className="w-8 h-8 text-white" />
          ) : (
            `${t.formatMessage({ id: "play" })}`
          )}
        </UiButton>
      </div>
    </div>
  );
};

export default protectedPage(Page);
