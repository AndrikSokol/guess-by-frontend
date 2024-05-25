"use client";

import { DefaultMap } from "../DefaultMap";
import { StreetView } from "../StreetView";
import { Timer } from "../Timer";
import { useQuery } from "@tanstack/react-query";
import { Api } from "../../api/api";
import { UiPageSpinner } from "../../components/ui/ui-page-spinner";
import { useEffect, useState } from "react";
import { ResultMap } from "../ResultMap";
import { useGameQuery } from "@/app/hooks/useGameQuery";
import { UiSpinner } from "@/app/components/ui/ui-spinner";

const Page = ({ params }: { params: { slug: string } }) => {
  const link = params.slug[0];

  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  const { data: game, isPending } = useGameQuery(link);

  const { data: scores, isPending: isScorePending } = useQuery({
    queryKey: ["userScore"],
    queryFn: () => Api.getScoreOfUser(link)
  });
  if (isPending) {
    return <UiPageSpinner />;
  }

  if (game)
    return (
      <div className="relative flex h-screen">
        <aside className="absolute w-32  z-10 bg-opacity-45 h-screen bg-black">
          <div>
            round: {game.round}/{game.totalRounds}
          </div>
          <h2 className="w-full  py-10 text-center">Score</h2>
          {isScorePending && (
            <UiSpinner className="w-12 h-12 text-yellow-300" />
          )}
          {scores &&
            scores.map((score, index: number) => {
              return (
                <div key={index} className="flex gap-2  text-sm ">
                  <div>round: {index + 1}</div> <div>{score.score}</div>
                </div>
              );
            })}
        </aside>
        <Timer />
        <div className=" w-full">
          <StreetView places={game.locations} link={link} />{" "}
        </div>

        <DefaultMap link={link} setIsAnswered={setIsAnswered} />
        <ResultMap
          isAnswered={isAnswered}
          setIsAnswered={setIsAnswered}
          link={link}
        />
      </div>
    );
};

export default Page;
