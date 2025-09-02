"use client ";

import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

import Button from "@/components/global/buttons";
import { DataTableColumnHeader } from "@/components/global/data-table/data-table-column-header";
import { DataTableRowAction } from "@/types/data-table";

import SelectDeliveryTable from "./select-orders/select-delivery-table";
import SelectPaymentTable from "./select-orders/select-payment-table";
type Props = {
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<OrdersResponse> | null>
  >;
  userTimeZone?: string;
};

export function getOrdersDetailsColoumn({
  setRowAction,
  userTimeZone,
}: Props): ColumnDef<OrdersResponse>[] {
  return [
    {
      accessorKey: "invoiceId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Invoice ID" />
      ),
      cell: ({ row }) => <div>{row.original.invoiceId}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "invoicedTo",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Invoice To" />
      ),
      cell: ({ row }) => <div>{row.original.invoicedTo}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "deliveryType",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
      cell: ({ row }) => {
        const type = row.original.deliveryType;
        return (
          <p>{type ? type.charAt(0).toUpperCase() + type.slice(1) : "-"}</p>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "orderDeliveryTime",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Order Prep Time" />
      ),
      cell: ({ row }) => {
        const data = row.original.orderDeliveryTime;
        return data
          ? data.slice(0, 12) +
              " " +
              data.charAt(13).toUpperCase() +
              data.charAt(14).toUpperCase()
          : "-";
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "location",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Location" />
      ),
      cell: ({ row }) => <p>{row.original.location || "-"}</p>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "deliveryStatus",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Delivery Type" />
      ),
      cell: ({ row }) => {
        const record = row.original;
        const data = record.deliveryStatus;
        const invoiceId = row.original.invoiceId;
        return <SelectDeliveryTable data={data} invoiceId={invoiceId} />;
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "orderTime",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ordered Time" />
      ),
      cell: ({ row }) => {
        const data = row.original.orderTime;
        return data
          ? dayjs
              .tz(data, userTimeZone || dayjs.tz.guess())
              .format("MM-DD-YYYY , h:mm A")
          : "-";
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "paymentStatus",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Payment" />
      ),
      cell: ({ row }) => {
        const item = row.original.paymentStatus;
        const value = item.charAt(0).toUpperCase() + item.slice(1);
        const record = row.original;

        return item === "pending" ? (
          <SelectPaymentTable
            invoiceId={record.invoiceId}
            paymentStat={value}
          />
        ) : (
          <SelectPaymentTable paymentStat={value} disabled={true} />
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "disputeStatus",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Dispute Status" />
      ),
      cell: ({ row }) => {
        const data = row.original.disputeStatus;
        return (
          <p>{data ? data.charAt(0) + data.slice(1).toLowerCase() : "-"}</p>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Actions" />
      ),
      cell: ({ row }) => {
        const record = row.original;
        return (
          <>
            <div className="flex gap-2">
              <Button
                variant="primary"
                onClick={() => setRowAction({ row, variant: "print" })}
                className="w-24"
              >
                Print
              </Button>
              {record.paymentStatus !== "paid" && (
                <Button
                  onClick={() => setRowAction({ row, variant: "update" })}
                  variant="primary-outlined"
                  className="w-24"
                >
                  Edit
                </Button>
              )}
            </div>
          </>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];
}
