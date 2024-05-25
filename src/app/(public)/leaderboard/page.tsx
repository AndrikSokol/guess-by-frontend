// "use client";

// import { Api } from "@/app/api/api";
// import { LeftArrowIcon } from "@/app/assets/left-arrow-icon";
// import { RightArrowIcon } from "@/app/assets/right-arrow-icon";
// import { Aside } from "@/app/components/aside";
// import { UiButton } from "@/app/components/ui/ui-button";
// import { UiSpinner } from "@/app/components/ui/ui-spinner";
// import { cn } from "@/app/utils/cn";
// import { useQuery } from "@tanstack/react-query";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";

// type Leaderboard = {
//   userId: number;
//   username: string;
//   totalGames: number;
//   totalRounds: number;
//   totalTimeMinutes: number;
// };

// enum Order {
//   ASC = "ASC",
//   DESC = "DESC"
// }

// type QueryLeader = {
//   order?: Order;
//   page?: number;
//   take?: number;
//   orderTotalGame?: Order;
//   orderTotalRounds?: Order;
//   orderTotalTime?: Order;
//   orderUsername?: Order;
// };

// const tableHeaders = [
//   {
//     id: 1,
//     name: "#",
//     key: "order"
//   },
//   {
//     id: 2,
//     name: "Username",
//     key: "orderUsername"
//   },
//   {
//     id: 3,
//     name: "Total Games",
//     key: "orderTotalGame"
//   },
//   {
//     id: 4,
//     name: "Total Rounds",
//     key: "orderTotalRounds"
//   },
//   {
//     id: 5,
//     name: "Total Time (Minutes)",
//     key: "orderTotalTime"
//   }
// ];

// type Data = {
//   data: Leaderboard[];
//   meta: Meta;
// };

// type Meta = {
//   page: number;
//   take: number;
//   itemCount: number;
//   pageCount: number;
//   hasPreviousPage: boolean;
//   hasNextPage: boolean;
// };

// const Page = () => {
//   const [query, setQuery] = useState<QueryLeader>({ take: 2 } as QueryLeader);

//   const [page, setPage] = useState<number>(1);

//   const handleSort = (key: keyof QueryLeader) => {
//     if (!key) return;

//     setQuery((prevQuery) => {
//       let newOrder;

//       // If current order is ASC, change it to DESC
//       // If current order is DESC, remove the key from state
//       if (prevQuery[key] === Order.ASC) {
//         newOrder = Order.DESC;
//       } else if (prevQuery[key] === Order.DESC) {
//         // Remove the property from state if already set to DESC
//         const { [key]: omit, ...rest } = prevQuery;
//         return rest;
//       } else {
//         // If no order set yet, set it to ASC
//         newOrder = Order.ASC;
//       }

//       return { ...prevQuery, [key]: newOrder };
//     });
//   };

//   const { data, isPending, isFetching, isSuccess } = useQuery({
//     queryKey: ["leaderboard", query],
//     queryFn: () => Api.getUsersGames(query),
//     retry: 0
//   });

//   const handlePageClick = (index: number) => {
//     setPage(index);
//     setQuery((prev) => {
//       return { ...prev, page: index };
//     });
//   };

//   console.log(data?.meta);
//   return (
//     <div className="flex">
//       <Aside />
//       <div className="w-full">
//         <div className="pt-4">
//           <table className="mx-auto min-w-[80%] h-full divide-y divide-gray-200 text-black">
//             <thead>
//               <tr>
//                 {tableHeaders.map(
//                   (header: { key: string; name: string; id: number }) => (
//                     <th
//                       key={header.id}
//                       className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                       onClick={() => handleSort(header.key)}
//                     >
//                       {header.name}
//                       {header.key && query[header.key]
//                         ? query[header.key] === Order.ASC
//                           ? " ▲"
//                           : " ▼"
//                         : " "}
//                     </th>
//                   )
//                 )}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {isPending && (
//                 <tr>
//                   <td colSpan={5} className="py-4">
//                     <div className="flex justify-center items-center">
//                       <UiSpinner className="w-24 h-24 text-yellow-300" />
//                     </div>
//                   </td>
//                 </tr>
//               )}

//               {isSuccess &&
//                 (data.length === 0 ? (
//                   <tr>
//                     <td colSpan={5} className="py-4">
//                       <div className="flex flex-col justify-center items-center rounded-md ">
//                         <Image
//                           src="/empty.jpg"
//                           width={400}
//                           height={400}
//                           alt="No data"
//                         />
//                         <h2 className="text-black text-xl">
//                           Ooops! Nothing to show
//                         </h2>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   data?.data?.map((user: Leaderboard, index: number) => (
//                     <tr key={user.userId} className="">
//                       <td className=" text-xl px-6 py-4 whitespace-nowrap">
//                         {index + 1}
//                       </td>
//                       <td className=" text-xl px-6 py-4 whitespace-nowrap">
//                         {user.username}
//                       </td>
//                       <td className=" text-xl px-6 py-4 whitespace-nowrap">
//                         {user.totalGames}
//                       </td>
//                       <td className=" text-xl px-6 py-4 whitespace-nowrap">
//                         {user.totalRounds}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {Number(user.totalTimeMinutes).toFixed(0)}
//                       </td>
//                     </tr>
//                   ))
//                 ))}
//             </tbody>
//           </table>

//           {isSuccess && (
//             <div className="flex justify-center items-center gap-4">
//               <button
//                 disabled={!data.meta.hasPreviousPage}
//                 onClick={() => handlePageClick(page - 1)}
//               >
//                 <LeftArrowIcon
//                   className={cn(
//                     `w-12 h-12 text-yellow-400 cursor-pointer hover:text-yellow-500 duration-200`,
//                     !data.meta.hasPreviousPage &&
//                       "opacity-50  hover:text-yellow-400 cursor-not-allowed"
//                   )}
//                 />
//               </button>
//               {data.meta.pageCount < 10 &&
//                 Array.from({ length: data.meta.pageCount }).map((_, index) => (
//                   <div
//                     key={index + 1}
//                     className={cn(
//                       "border text-black w-10 h-10 flex items-center justify-center border-yellow-300 rounded-full p-2 text-lg hover:border-yellow-500 cursor-pointer duration-150",
//                       index + 1 === page && "border-yellow-500 border-2"
//                     )}
//                     onClick={() => handlePageClick(index + 1)}
//                   >
//                     <div>{index + 1}</div>
//                   </div>
//                 ))}

//               <button
//                 disabled={!data.meta.hasNextPage}
//                 onClick={() => handlePageClick(page + 1)}
//               >
//                 <RightArrowIcon
//                   className={cn(
//                     `w-12 h-12 text-yellow-400 cursor-pointer hover:text-yellow-500 duration-200`,
//                     !data.meta.hasNextPage &&
//                       "opacity-50  hover:text-yellow-400 cursor-not-allowed"
//                   )}
//                 />
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;

"use client";

import { Api } from "@/app/api/api";
import { LeftArrowIcon } from "@/app/assets/left-arrow-icon";
import { RightArrowIcon } from "@/app/assets/right-arrow-icon";
import { Aside } from "@/app/components/aside";
import { UiButton } from "@/app/components/ui/ui-button";
import { UiSpinner } from "@/app/components/ui/ui-spinner";
import { cn } from "@/app/utils/cn";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { ReactNode, useState } from "react";

type Leaderboard = {
  userId: number;
  username: string;
  totalGames: number;
  totalRounds: number;
  totalTimeMinutes: number;
};

enum Order {
  ASC = "ASC",
  DESC = "DESC"
}

type QueryLeader = {
  order?: Order;
  page: number;
  take: number;
  orderTotalGame?: Order;
  orderTotalRounds?: Order;
  orderTotalTime?: Order;
  orderUsername?: Order;
};

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

type Data = {
  data: Leaderboard[];
  meta: Meta;
};

type Meta = {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

const Page = () => {
  const [query, setQuery] = useState<QueryLeader>({
    take: 9,
    orderTotalRounds: Order.DESC
  } as QueryLeader);
  const [page, setPage] = useState<number>(1);

  const handleSort = (key: keyof QueryLeader) => {
    if (!key) return;

    setQuery((prevQuery) => {
      let newOrder;

      // If current order is ASC, change it to DESC
      // If current order is DESC, remove the key from state
      if (prevQuery[key] === Order.ASC) {
        newOrder = Order.DESC;
      } else if (prevQuery[key] === Order.DESC) {
        // Remove the property from state if already set to DESC
        const { [key]: omit, ...rest } = prevQuery;
        return rest;
      } else {
        // If no order set yet, set it to ASC
        newOrder = Order.ASC;
      }

      return { ...prevQuery, [key]: newOrder };
    });
  };

  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["leaderboard", query],
    queryFn: () => Api.getUsersGames(query),
    retry: 0
  });

  const handlePageClick = (index: number) => {
    setPage(index);
    setQuery((prev) => {
      return { ...prev, page: index };
    });
  };

  const renderPageButtons = () => {
    const pageCount = data?.meta.pageCount;
    const buttons = [];
    if (!pageCount) return buttons;

    // Always show the first page button
    buttons.push(
      <div
        key={1}
        className={cn(
          "border text-black w-10 h-10 flex items-center justify-center border-yellow-300 rounded-full p-2 text-lg hover:border-yellow-500 cursor-pointer duration-150",
          1 === page && "border-yellow-500 border-2"
        )}
        onClick={() => handlePageClick(1)}
      >
        <div>1</div>
      </div>
    );

    // Calculate the range of page numbers to display around the current page
    const startPage = Math.max(2, page - 3);
    const endPage = Math.min(pageCount - 1, page + 3);

    // Add the ellipsis before the first set of pages if needed
    if (startPage > 2) {
      buttons.push(
        <div
          key="start-ellipsis"
          className="w-10 h-10 flex items-center  text-black  justify-center"
        >
          ...
        </div>
      );
    }

    // Add page buttons around the current page
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <div
          key={i}
          className={cn(
            "border text-black w-10 h-10 flex items-center justify-center border-yellow-300 rounded-full p-2 text-lg hover:border-yellow-500 cursor-pointer duration-150",
            i === page && "border-yellow-500 border-2"
          )}
          onClick={() => handlePageClick(i)}
        >
          <div>{i}</div>
        </div>
      );
    }

    // Add the ellipsis after the last set of pages if needed
    if (endPage < pageCount - 1) {
      buttons.push(
        <div
          key="end-ellipsis"
          className="w-10 h-10 flex items-center text-black  justify-center"
        >
          ...
        </div>
      );
    }

    // Always show the last page button
    if (pageCount > 1) {
      buttons.push(
        <div
          key={pageCount}
          className={cn(
            "border text-black w-10 h-10 flex items-center justify-center border-yellow-300 rounded-full p-2 text-lg hover:border-yellow-500 cursor-pointer duration-150",
            pageCount === page && "border-yellow-500 border-2"
          )}
          onClick={() => handlePageClick(pageCount)}
        >
          <div>{pageCount}</div>
        </div>
      );
    }

    return buttons;
  };

  return (
    <div className="flex">
      <Aside />
      <div className="flex  w-screen justify-between mx-auto pt-4 flex-col">
        <table className="mx-auto min-w-[80%]  divide-y divide-gray-200 text-black rounded-md">
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
              (data.length === 0 ? (
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
                data?.data?.map((user: Leaderboard, index: number) => (
                  <tr
                    key={user.userId}
                    className={
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
                    }
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
          <div className="flex p-4 align-bottom justify-center items-center gap-4">
            <button
              disabled={!data.meta.hasPreviousPage}
              onClick={() => handlePageClick(page - 1)}
            >
              <LeftArrowIcon
                className={cn(
                  `w-12 h-12 text-yellow-400 cursor-pointer hover:text-yellow-500 duration-200`,
                  !data.meta.hasPreviousPage &&
                    "opacity-50  hover:text-yellow-400 cursor-not-allowed"
                )}
              />
            </button>
            {renderPageButtons()}
            <button
              disabled={!data.meta.hasNextPage}
              onClick={() => handlePageClick(page + 1)}
            >
              <RightArrowIcon
                className={cn(
                  `w-12 h-12 text-yellow-400 cursor-pointer hover:text-yellow-500 duration-200`,
                  !data.meta.hasNextPage &&
                    "opacity-50  hover:text-yellow-400 cursor-not-allowed"
                )}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
