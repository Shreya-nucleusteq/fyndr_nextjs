"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

import DownArrow from "@/components/icons/down-arrow";
import { Button } from "@/components/ui/button";
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { formUrlQuery } from "@/lib/utils/url";

type Props = {
  className?: string;
  containerClassName?: string;
  buttonClassName?: string;
  showRowSelector?: boolean;
  scroll?: boolean;
  page: number;
  pageSize: number;
  count: number;
  isLast: boolean;
};

const Pagination = ({
  scroll = false,
  className = "",
  page = 1,
  pageSize = 10,
  containerClassName,
  count = 0,
  buttonClassName,
  showRowSelector = true,
  isLast,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageSizeOptions = [10, 20, 50, 100];

  const totalPages = count ? Math.ceil(count / pageSize) : 0;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: `${newPage}`,
    });

    router.replace(newUrl, { scroll });
  };

  const handleNext = () => {
    if (isLast) return;
    handlePageChange(page + 1);
  };

  const handlePrevious = () => {
    if (page === 1) return;
    handlePageChange(page - 1);
  };

  const handleSizeChange = (newSize = "10") => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "size",
      value: newSize,
    });

    router.replace(newUrl, { scroll });
  };

  const getPageButtons = () => {
    // Always show page 1 button, even if it's the only page
    if (!count || totalPages <= 1) {
      return [1];
    }

    const pageButtons = [];
    const maxDirectButtons = 3;

    // For small number of pages (3 or less), show all pages
    if (totalPages <= maxDirectButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(i);
      }
      return pageButtons;
    }

    // For more than 3 pages, always show exactly 3 direct buttons with single ellipsis
    if (page <= 2) {
      // Show first 3 pages: 1, 2, 3, ..., last
      pageButtons.push(1, 2, 3);
      pageButtons.push("next-ellipsis");
      pageButtons.push(totalPages);
    } else if (page >= totalPages - 1) {
      // Show first, ..., last 3 pages: 1, ..., (n-2), (n-1), n
      pageButtons.push(1);
      pageButtons.push("prev-ellipsis");
      pageButtons.push(totalPages - 2, totalPages - 1, totalPages);
    } else {
      // Show first, current-1, current, current+1, ..., last
      // But limit to 3 direct buttons: first, ..., current, current+1, last
      pageButtons.push(1);
      pageButtons.push("prev-ellipsis");
      pageButtons.push(page, page + 1, totalPages);
    }

    return pageButtons;
  };

  const btnClassName = `size-10 rounded-lg border border-primary bg-white p-4 text-primary shadow-none hover:bg-white text-base font-medium`;
  const pageButtons = getPageButtons();

  return (
    <ShadcnPagination className={`relative w-full ${className}`}>
      <PaginationContent
        className={`flex-center relative w-full ${containerClassName} gap-[10px]`}
      >
        <PaginationItem>
          <Button
            onClick={handlePrevious}
            disabled={page === 1}
            className={cn(
              btnClassName,
              "rotate-90",
              buttonClassName,
              page === 1 ? "opacity-50 cursor-not-allowed" : ""
            )}
          >
            <DownArrow />
          </Button>
        </PaginationItem>

        {/* Direct page buttons */}
        {pageButtons.map((btn, index) => (
          <PaginationItem key={`page-btn-${index}`}>
            {btn === "prev-ellipsis" || btn === "next-ellipsis" ? (
              <div
                className="flex size-10 cursor-pointer items-center justify-center"
                onClick={() => {
                  // Jump 5 pages on ellipsis click (matching Ant Design's behavior)
                  if (btn === "prev-ellipsis") {
                    handlePageChange(Math.max(1, page - 5));
                  } else {
                    handlePageChange(Math.min(totalPages, page + 5));
                  }
                }}
              >
                ...
              </div>
            ) : (
              <Button
                onClick={() => handlePageChange(btn as number)}
                className={cn(
                  btnClassName,
                  buttonClassName,
                  page === btn
                    ? "bg-primary text-white hover:bg-primary hover:text-white"
                    : ""
                )}
              >
                {btn}
              </Button>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <Button
            onClick={handleNext}
            disabled={isLast}
            className={cn(
              btnClassName,
              "-rotate-90",
              buttonClassName,
              isLast ? "opacity-50 cursor-not-allowed" : ""
            )}
          >
            <DownArrow />
          </Button>
        </PaginationItem>

        {showRowSelector ? (
          <PaginationItem className="">
            <Select
              onValueChange={handleSizeChange}
              defaultValue={pageSize.toString()}
            >
              <SelectTrigger className="h-10 w-[114px] rounded-lg border-primary text-base font-medium text-primary shadow-none focus:ring-0">
                <SelectValue placeholder="Size">{pageSize}/Page</SelectValue>
              </SelectTrigger>
              <SelectContent className="text-base font-medium text-primary hover:text-primary">
                {pageSizeOptions.map((size) => (
                  <SelectItem
                    key={size}
                    value={size.toString()}
                    className="data-[highlighted]:bg-primary-10 data-[highlighted]:text-primary"
                  >
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </PaginationItem>
        ) : (
          <></>
        )}
      </PaginationContent>
    </ShadcnPagination>
  );
};

export default Pagination;
