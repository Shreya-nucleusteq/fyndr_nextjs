"use client";

import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React from "react";

import Button from "@/components/global/buttons";
import { DataTableColumnHeader } from "@/components/global/data-table/data-table-column-header";
import { DataTableRowAction } from "@/types/data-table";
import { OfferPurchaseProps } from "@/types/offer-summary/offer-summary.types";

dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<OfferPurchaseProps> | null>
  >;
  userTimeZone?: string;
};

export function getOfferSummaryDetailsColoumn({
  setRowAction,
  userTimeZone,
}: Props): ColumnDef<OfferPurchaseProps>[] {
  return [
    {
      accessorKey: "buyerName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => <div>{row.original.buyerName}</div>,
      enableSorting: false,
    },
    {
      accessorKey: "offerTitle",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Offers Purchased" />
      ),
      cell: ({ row }) => <div>{row.original.offerTitle}</div>,
      enableSorting: false,
    },
    {
      accessorKey: "redeemptionStatus",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.original.redeemptionStatus;
        const formatted =
          status === "partially-redeemed"
            ? "Partially Redeemed"
            : status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
        return <div>{formatted}</div>;
      },
      enableSorting: false,
    },
    {
      accessorKey: "buyerPhone",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Phone Number" />
      ),
      cell: ({ row }) => <div>{row.original.buyerPhone || "NA"}</div>,
      enableSorting: false,
    },
    {
      accessorKey: "redemptionDt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date Redeemed" />
      ),
      cell: ({ row }) => {
        const redemptionDate = row.original.redemptionDt;

        return (
          <div>
            {redemptionDate
              ? dayjs(redemptionDate).format("MMMM D, YYYY")
              : "N/A"}
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "invoiceDt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Purchase Date" />
      ),
      cell: ({ row }) => (
        <>
          <div>
            {row.original.invoiceDt
              ? dayjs(row.original.invoiceDt).format("MMMM D, YYYY")
              : "N/A"}
          </div>
        </>
      ),
      enableHiding: false,
    },
    {
      accessorKey: "validTill",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Valid Till" />
      ),
      cell: ({ row }) => (
        <div>
          {row.original.validTill
            ? dayjs(row.original.validTill).format("MMMM D, YYYY")
            : "N/A"}
        </div>
      ),
      enableHiding: false,
    },
    {
      accessorKey: "redemptionTime",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Time of Redemption" />
      ),
      cell: ({ row }) => {
        const time = row.original.redemptionTime;
        const formattedTime = time
          ? dayjs
              .utc(`1970-01-01T${time}`)
              .tz(userTimeZone || dayjs.tz.guess())
              .format("hh:mm A")
          : "N/A";

        return <div suppressHydrationWarning>{formattedTime}</div>;
      },
      enableSorting: false,
    },
    {
      accessorKey: "voucherCode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Voucher Code" />
      ),
      cell: ({ row }) => <div>{row.original.voucherCode}</div>,
      enableSorting: false,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Actions" />
      ),
      cell: ({ row }) => (
        <Button
          onClick={() => setRowAction({ row, variant: "update" })}
          variant="primary"
        >
          Actions
        </Button>
      ),
      enableSorting: false,
    },
  ];
}
