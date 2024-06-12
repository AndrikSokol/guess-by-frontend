"use client";

import { DefaultMap } from "../../../../components/default-map";
import { StreetView } from "../../../../components/street-view";
import { Timer } from "../../../../components/timer";
import { useQuery } from "@tanstack/react-query";
import { Api } from "@/app//api/api";
import { UiPageSpinner } from "@/app/components/ui/ui-page-spinner";
import { useState } from "react";
import { ResultMap } from "../../../../components/result-map";
import { useGameQuery } from "@/app/hooks/useGameQuery";
import { UiSpinner } from "@/app/components/ui/ui-spinner";
import { useIntl } from "react-intl";

const Game = ({ params }: { params: { slug: string } }) => {
  const link = params.slug[0];

  const t = useIntl();
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
      <div className="relative z-20 flex h-screen">
        <aside className="absolute w-32  z-10 bg-opacity-45 h-screen bg-black">
          <div className="text-xl text-center py-4">
            {t.formatMessage({ id: "round" }).split(" ")[1]} {game.round}/
            {game.totalRounds}
          </div>
          <h2 className="w-full  py-10 text-xl text-center">
            {" "}
            {t.formatMessage({ id: "score" })}
          </h2>
          {isScorePending && (
            <UiSpinner className="w-12 h-12 text-yellow-300" />
          )}
          {scores &&
            scores.map((score, index: number) => {
              return (
                <div key={index} className="flex gap-2  text-sm ">
                  <div>
                    {t.formatMessage({ id: "round" }).split(" ")[1]} {index + 1}
                  </div>{" "}
                  <div>{score.score}</div>
                </div>
              );
            })}
        </aside>

        <div className=" w-full">
          <StreetView places={game.locations} link={link} />{" "}
        </div>

        {!isAnswered && (
          <DefaultMap link={link} setIsAnswered={setIsAnswered} />
        )}
        <ResultMap
          isAnswered={isAnswered}
          setIsAnswered={setIsAnswered}
          link={link}
        />
      </div>
    );
};

export default Game;
