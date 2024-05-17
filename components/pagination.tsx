"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { classNames } from "@/libs";
import { useStore } from "@/hooks";
import { clash } from "@/fonts";

interface PaginationButtonProps {
  // currentPage: number;
  page: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  children?: ReactNode;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  page,
  setCurrentPage,
  children,
}) => {
  const { store } = useStore();

  const handleClick = () => {
    if (typeof page === "number") {
      setCurrentPage(page);
    }
  };

  return (
    <button
      className={classNames(
        clash.className,
        "flex items-center justify-center",
        "bg-[#E1E1E1] rounded-lg",
        "min-w-10 h-10",
        "px-2 py-1.5",
        "font-medium",
        store.page === page && "bg-primary text-white"
      )}
      onClick={handleClick}
    >
      {children || page}
    </button>
  );
};

interface PaginationProps {
  pages: number;
}

export const Pagination: React.FC<PaginationProps> = ({ pages }) => {
  const { store, setStore } = useStore();
  const [currentPage, setCurrentPage] = useState(store.page ?? 1);

  const updateFilters = (page: number) => {
    setCurrentPage(page);
    setStore({ ...store, page });
  };

  const getDisplayPages = () => {
    const displayedPages: (number | string)[] = [];

    if (pages <= 10) {
      for (let i = 1; i <= pages; i++) {
        displayedPages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          displayedPages.push(i);
        }
        displayedPages.push("...");
        displayedPages.push(pages);
      } else if (currentPage >= pages - 2) {
        displayedPages.push(1);
        displayedPages.push("...");
        for (let i = pages - 3; i <= pages; i++) {
          displayedPages.push(i);
        }
      } else {
        displayedPages.push(1);
        displayedPages.push("...");
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          displayedPages.push(i);
        }
        displayedPages.push("...");
        displayedPages.push(pages);
      }
    }

    return displayedPages;
  };

  const handleNextPage = () => {
    if (currentPage < pages) {
      updateFilters(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      updateFilters(currentPage - 1);
    }
  };

  return (
    <div className="flex gap-2.5">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        aria-label="Previous Page"
        className={classNames(
          "flex items-center justify-center",
          "bg-[#E1E1E1] rounded-lg",
          "min-w-10 h-10"
        )}
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>
      {getDisplayPages().map((page, index) =>
        typeof page === "number" ? (
          <PaginationButton
            key={index}
            page={page}
            // currentPage={currentPage}
            setCurrentPage={(page) => {
              updateFilters(page as number);
            }}
          />
        ) : (
          <div key={index} className="text-4xl font-medium">
            ...
          </div>
        )
      )}
      <button
        onClick={handleNextPage}
        disabled={currentPage === pages}
        aria-label="Next Page"
        className={classNames(
          "flex items-center justify-center",
          "bg-[#E1E1E1] rounded-lg",
          "min-w-10 h-10"
        )}
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
};
