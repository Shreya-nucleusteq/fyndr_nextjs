/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

import { onGetOfferSummary } from "@/actions/offer-summary.actions";
import { DataTable } from "@/components/global/data-table/data-table";
import { useUser } from "@/hooks/auth";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTableRowAction } from "@/types/data-table";
import { OfferPurchaseProps } from "@/types/offer-summary/offer-summary.types";

import { getOfferSummaryDetailsColoumn } from "./offer-summary-details-coloumn";
import ActionsDialog from "../../../../_components/redeemption-modal/actions-dialog";

type Props = {
  promises: Promise<[Awaited<ReturnType<typeof onGetOfferSummary>>]>;
};

const OfferSummaryTable = ({ promises }: Props) => {
  const searchParams = useSearchParams();
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  const [{ data, success }] = React.use(promises);

  const { user } = useUser();
  const userTimeZone = user?.userTimeZone;
  const merchantId = user?.merchantId;
  const fristName = user?.firstName;
  const lastName = user?.lastName;
  const indvid = user?.indvid;

  const [rowAction, setRowAction] =
    React.useState<DataTableRowAction<OfferPurchaseProps> | null>(null);

  const columns = React.useMemo(
    () => getOfferSummaryDetailsColoumn({ setRowAction, userTimeZone }),
    [userTimeZone]
  );

  if (!success || !data) return <div>Error</div>;

  const { count, listOfferPurchasedOutDTO } = data.data;

  const { table } = useDataTable({
    data: listOfferPurchasedOutDTO || [],
    columns,
    pageCount: Math.ceil(count / pageSize),
    getRowId: (row) => `${row.objid}`,
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <>
      <DataTable table={table} />
      <ActionsDialog
        open={rowAction?.variant === "update"}
        onOpenChange={() => setRowAction(null)}
        type={"receivable"}
        row={rowAction?.row.original ?? null}
        merchantId={merchantId as string}
        fname={fristName as string}
        lname={lastName as string}
        indvid={indvid}
        title="Voucher"
      />
    </>
  );
};

export default OfferSummaryTable;
