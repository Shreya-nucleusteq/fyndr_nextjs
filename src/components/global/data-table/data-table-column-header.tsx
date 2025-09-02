"use client";

import type { Column } from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  EyeOff,
  X,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.ComponentProps<typeof DropdownMenuTrigger> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  ...props
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort() && !column.getCanHide()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            "-ml-1.5 flex h-8 items-center gap-1.5 rounded-md px-2 py-1.5 bg-primary hover:bg-primary focus:outline-none focus:ring-1 focus:ring-secondary data-[state=open]:bg-primary [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-white",
            className
          )}
          {...props}
        >
          {title}
          {column.getCanSort() &&
            (column.getIsSorted() === "desc" ? (
              <ChevronDown />
            ) : column.getIsSorted() === "asc" ? (
              <ChevronUp />
            ) : (
              <ChevronsUpDown />
            ))}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-28">
          {column.getCanSort() && (
            <>
              <DropdownMenuCheckboxItem
                className="relative pl-2 pr-8 [&>span:first-child]:left-auto [&>span:first-child]:right-2 [&_svg]:text-slate-500 dark:[&_svg]:text-slate-400"
                checked={column.getIsSorted() === "asc"}
                onClick={() => column.toggleSorting(false)}
              >
                <ChevronUp />
                Asc
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className="relative pl-2 pr-8 [&>span:first-child]:left-auto [&>span:first-child]:right-2 [&_svg]:text-slate-500 dark:[&_svg]:text-slate-400"
                checked={column.getIsSorted() === "desc"}
                onClick={() => column.toggleSorting(true)}
              >
                <ChevronDown />
                Desc
              </DropdownMenuCheckboxItem>
              {column.getIsSorted() && (
                <DropdownMenuItem
                  className="pl-2 [&_svg]:text-slate-500 dark:[&_svg]:text-slate-400"
                  onClick={() => column.clearSorting()}
                >
                  <X />
                  Reset
                </DropdownMenuItem>
              )}
            </>
          )}
          {column.getCanHide() && (
            <DropdownMenuCheckboxItem
              className="relative pl-2 pr-8 [&>span:first-child]:left-auto [&>span:first-child]:right-2 [&_svg]:text-slate-500 dark:[&_svg]:text-slate-400"
              checked={!column.getIsVisible()}
              onClick={() => column.toggleVisibility(false)}
            >
              <EyeOff />
              Hide
            </DropdownMenuCheckboxItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

  );
}
