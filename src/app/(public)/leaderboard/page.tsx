"use client";

import { Aside, AsideBar } from "@/app/components/aside";
import UiPagination from "@/app/components/ui/ui-pagination";
import { UiSpinner } from "@/app/components/ui/ui-spinner";
import { useLeaderboardQuery } from "@/app/hooks/useLeaderboardQuery";
import { Leaderboard } from "@/app/types/leaderboard.type";
import { QueryLeaderboard } from "@/app/types/query-leaderboard.type";
import { cn } from "@/app/utils/cn";
import { Order } from "@/enums/Order.enum";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";

const tableHeaders = [
  {
    id: 1,
    name: "#",
    key: "order"
  },
  {
    id: 2,
    name: "Username",
    key: "orderUsername"
  },
  {
    id: 3,
    name: "Total Games",
    key: "orderTotalGame"
  },
  {
    id: 4,
    name: "Total Rounds",
    key: "orderTotalRounds"
  },
  {
    id: 5,
    name: "Total Time (Minutes)",
    key: "orderTotalTime"
  }
];

const Page = () => {
  const [query, setQuery] = useState<QueryLeaderboard>({
    take: 9,
    orderTotalRounds: Order.DESC
  } as QueryLeaderboard);
  const [page, setPage] = useState<number>(1);

  const rowRef = useRef<HTMLElement>(null);
  const [windowSize, setWindowSize] = useState<number>();

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerHeight);
    });

    return () => {
      window.removeEventListener("resize", () => {});
    };
  });

  useEffect(() => {
    windowSize &&
      setQuery((prev) => ({
        ...prev,
        take: Math.round((windowSize - 160) / 60)
      }));
  }, [windowSize]);

  const handleSort = (key: string) => {
    if (!key) return;

    setQuery((prevQuery: any) => {
      let newOrder;
      if (prevQuery[key] === Order.ASC) {
        newOrder = Order.DESC;
      } else if (prevQuery[key] === Order.DESC) {
        const { [key]: omit, ...rest } = prevQuery;
        return rest;
      } else {
        newOrder = Order.ASC;
      }

      return { ...prevQuery, [key]: newOrder };
    });
  };

  const { data: leaderbord, isPending, isSuccess } = useLeaderboardQuery(query);

  return (
    <div className="flex">
      <AsideBar />
      <div className="flex sm:pl-[176px]  w-screen justify-between mx-auto pt-4 flex-col">
        <table className=" mx-auto min-w-[80%]  divide-y divide-gray-200 text-black rounded-md">
          <thead>
            <tr>
              {tableHeaders.map(
                (header: { key: string; name: string; id: number }) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort(header.key)}
                  >
                    {header.name}
                    {header.key && query[header.key]
                      ? query[header.key] === Order.ASC
                        ? " ▲"
                        : " ▼"
                      : " "}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isPending && (
              <tr>
                <td colSpan={5} className="py-4">
                  <div className="flex justify-center items-center">
                    <UiSpinner className="w-24 h-24 text-yellow-300" />
                  </div>
                </td>
              </tr>
            )}

            {isSuccess &&
              (leaderbord.data.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-4">
                    <div className="flex flex-col justify-center items-center rounded-md ">
                      <Image
                        src="/empty.jpg"
                        width={400}
                        height={400}
                        alt="No data"
                      />
                      <h2 className="text-black text-xl">
                        Ooops! Nothing to show
                      </h2>
                    </div>
                  </td>
                </tr>
              ) : (
                leaderbord?.data?.map((user: Leaderboard, index: number) => (
                  <tr
                    ref={rowRef}
                    key={user.userId}
                    className={cn(
                      "h-14",
                      page === 1
                        ? cn(
                            index == 0 &&
                              "bg-gradient-to-r from-yellow-200    to-transparent",
                            index == 1 &&
                              " bg-gradient-to-r from-gray-300  to-transparent ",
                            index == 2 &&
                              "bg-gradient-to-r from-yellow-500 to-transparent "
                          )
                        : ""
                    )}
                  >
                    <td className=" text-xl px-6 py-4 whitespace-nowrap">
                      {(page - 1) * query.take + index + 1}
                    </td>
                    <td className=" text-xl px-6 py-4 whitespace-nowrap">
                      {user.username}
                    </td>
                    <td className=" text-xl px-6 py-4 whitespace-nowrap">
                      {user.totalGames}
                    </td>
                    <td className=" text-xl px-6 py-4 whitespace-nowrap">
                      {user.totalRounds}
                    </td>
                    <td className="text-xl px-6 py-4 whitespace-nowrap">
                      {Number(user.totalTimeMinutes).toFixed(0)}
                    </td>
                  </tr>
                ))
              ))}
          </tbody>
        </table>

        {isSuccess && (
          <UiPagination
            setPage={setPage}
            setQuery={setQuery}
            page={page}
            meta={leaderbord.meta}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
