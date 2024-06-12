import { LeftArrowIcon } from "@/app/assets/left-arrow-icon";
import { RightArrowIcon } from "@/app/assets/right-arrow-icon";
import { PageMeta } from "@/app/types/page-meta.type";
import { QueryLeaderboard } from "@/app/types/query-leaderboard.type";
import { cn } from "@/app/utils/cn";
import React, { FC, ReactElement } from "react";

type UiPaginationProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  setQuery: React.Dispatch<React.SetStateAction<QueryLeaderboard>>;
  meta: PageMeta;
};

const UiPagination: FC<UiPaginationProps> = ({
  setPage,
  page,
  setQuery,
  meta
}) => {
  const handlePageClick = (index: number) => {
    setPage(index);
    setQuery((prev) => {
      return { ...prev, page: index };
    });
  };

  const renderPageButtons = () => {
    const pageCount = meta.pageCount;
    const buttons = [] as ReactElement[];
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
    const startPage = Math.max(2, page - 2);
    const endPage = Math.min(pageCount - 1, page + 2);

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
    <div className="flex p-4 align-bottom justify-center items-center gap-4">
      <button
        disabled={!meta.hasPreviousPage}
        onClick={() => handlePageClick(page - 1)}
      >
        <LeftArrowIcon
          className={cn(
            `w-12 h-12 text-yellow-400 cursor-pointer hover:text-yellow-500 duration-200`,
            !meta.hasPreviousPage &&
              "opacity-50  hover:text-yellow-400 cursor-not-allowed"
          )}
        />
      </button>
      {renderPageButtons()}
      <button
        disabled={!meta.hasNextPage}
        onClick={() => handlePageClick(page + 1)}
      >
        <RightArrowIcon
          className={cn(
            `w-12 h-12 text-yellow-400 cursor-pointer hover:text-yellow-500 duration-200`,
            !meta.hasNextPage &&
              "opacity-50  hover:text-yellow-400 cursor-not-allowed"
          )}
        />
      </button>
    </div>
  );
};

export default UiPagination;
