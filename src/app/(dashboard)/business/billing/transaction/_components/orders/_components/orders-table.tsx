"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

import { onGetOrdersDetails } from "@/actions/transaction.action";
import { DataTable } from "@/components/global/data-table/data-table";
import { useUser } from "@/hooks/auth";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTableRowAction } from "@/types/data-table";

import EditAction from "./actions-orders/edit-action";
import PrintAction from "./actions-orders/print-action";
import { getOrdersDetailsColoumn } from "./orders-table-coloumn";

type Props = {
  promises: Promise<[Awaited<ReturnType<typeof onGetOrdersDetails>>]>;
};

const OrdersTable = ({ promises }: Props) => {
  const searchParams = useSearchParams();
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const [{ data, success }] = React.use(promises);

  const { user } = useUser();
  const userTimeZone = user?.userTimeZone;
  const [rowAction, setRowAction] =
    React.useState<DataTableRowAction<OrdersResponse> | null>(null);

  const columns = React.useMemo(
    () => getOrdersDetailsColoumn({ setRowAction, userTimeZone }),
    [userTimeZone]
  );

  const orderDetails = data?.orderDetails || [];
  const count = data?.count || 0;

  const { table } = useDataTable({
    data: orderDetails || [],
    columns,
    pageCount: Math.ceil(count / pageSize),
    getRowId: (row) => `${row.invoiceId}`,
    shallow: false,
    clearOnDefault: true,
  });

  if (!success || !data) return <div>Error</div>;
  return (
    <div>
      <DataTable table={table} />
      <PrintAction
        open={rowAction?.variant === "print"}
        onOpenChange={() => setRowAction(null)}
        row={rowAction?.row.original ?? null}
        title="Invoice Details"
        type={"receivable"}
      />

      <EditAction />
    </div>
  );
};

export default OrdersTable;
