import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import React from "react";

import { fetchPayables, fetchReceivables } from "@/actions/transaction.action";
import { RouteParams } from "@/types/global";

import InvoiceList from "./_components/invoice-list";
import CommonHeader from "./common-header";
import Orders from "../orders/page";

type Props = {
  bizid: number;
  months: string;
  status: string;
  channel: string;
  indvid: number;
  search: string;
  searchParams: RouteParams["searchParams"];
};

const Transaction = async ({
  bizid,
  months,
  status,
  channel,
  indvid,
  search,
  searchParams,
}: Props) => {
  const { success, data } = await fetchPayables({
    criteria: "individual",
    buyerId: indvid,
    days: Number(months) * 30,
    text: search,
  });
  if (!success || !data) return null;

  const { success: recvSuccess, data: recvData } = await fetchReceivables({
    criteria: "merchant",
    text: search,
    bizid,
    days: Number(months) * 30,
    channel,
    status,
  });

  if (!recvSuccess || !recvData) return null;

  return (
    <>
      <Tabs defaultValue="payable" className="mt-3">
        <TabsList className="flex-between">
          <TabsTrigger
            value="receivable"
            className="px-4 py-2 text-sm font-medium text-gray-600 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary"
          >
            Receivables
          </TabsTrigger>
          <TabsTrigger
            value="payable"
            className="px-4 py-2 text-sm font-medium text-gray-600 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary"
          >
            My Purchase
          </TabsTrigger>
          <TabsTrigger
            value="order"
            className="px-4 py-2 text-sm font-medium text-gray-600 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary"
          >
            Orders
          </TabsTrigger>
        </TabsList>
        <TabsContent value="receivable">
          <CommonHeader type="receivable" />
          {recvSuccess && recvData.invoices.length > 0 ? (
            <InvoiceList rcptlist={recvData?.invoices} type="receivable" />
          ) : (
            <p className="py-4 text-center text-gray-500">
              No purchases found.
            </p>
          )}
        </TabsContent>

        <TabsContent value="payable">
          <CommonHeader type="payable" />
          {success && data.invoices.length > 0 ? (
            <InvoiceList rcptlist={data?.invoices} type="payable" />
          ) : (
            <p className="py-4 text-center text-gray-500">
              No purchases found.
            </p>
          )}
        </TabsContent>
        <TabsContent value="order">
          <Orders searchParams={searchParams} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Transaction;
