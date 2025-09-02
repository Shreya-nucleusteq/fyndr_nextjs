"use client";

import Image from "next/image";

import { InvoiceSummary } from "@/types/api-response/transaction.response";
const offerIcon = "/icons/offerIcon.svg";
const paidInvoiceIcon = "/icons/paidInvoice.svg";
const pendingInvoiceIcon = "/icons/pendingInvoice.svg";
const storeIcon = "/icons/storeIcon.svg";

const getDecimalNum = (num: number): string => {
  return num.toFixed(2);
};

const getDateNew = (date: string, timezone: string): string => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US", { timeZone: timezone });
};

type Props = {
  summarydata: InvoiceSummary;
};

const SummaryCard = ({ summarydata }: Props) => {
  return (
    <>
      {summarydata?.totalAmountByInvoiceStatuses.paid !== 0 ? (
        <div className="mt-4 flex space-x-4">
          {summarydata &&
            Number(summarydata.totalAmountByInvoiceStatuses.paid) > 0 && (
              <div
                className="h-[190px] w-1/4 cursor-pointer rounded-lg bg-white p-4 shadow-md"
                onClick={() => {}}
              >
                <div className="flex-between">
                  <div>
                    <Image
                      src={paidInvoiceIcon}
                      alt="Paid"
                      height={48}
                      width={48}
                    />
                  </div>
                  <div className="text-right">
                    <span className="block text-sm text-gray-500">
                      From {getDateNew(summarydata.userRegistrationDt, "UTC")}
                      <span className="block">till present</span>
                    </span>
                  </div>
                </div>
                <div className="mt-10 text-xl font-medium">
                  {summarydata.currencySymbol}
                  {getDecimalNum(summarydata.totalAmountByInvoiceStatuses.paid)}
                </div>
                <div className="text-sm text-gray-500">Paid Invoices</div>
              </div>
            )}

          {summarydata &&
            Number(summarydata.totalAmountByInvoiceStatuses.pending) > 0 && (
              <div
                className="h-[190px] w-1/4 cursor-pointer rounded-lg bg-white p-4 shadow-md"
                onClick={() => {}}
              >
                <div className="flex-between">
                  <div>
                    <Image
                      src={pendingInvoiceIcon}
                      alt="Pending"
                      height={48}
                      width={48}
                    />
                  </div>
                  <div className="text-right">
                    <span className="block text-sm text-gray-500">
                      From {getDateNew(summarydata.userRegistrationDt, "UTC")}
                      <span className="block">till present</span>
                    </span>
                  </div>
                </div>
                <div className="mt-10 text-xl font-medium">
                  {summarydata.currencySymbol}
                  {getDecimalNum(
                    summarydata.totalAmountByInvoiceStatuses.pending
                  )}
                </div>
                <div className="text-sm text-gray-500">Pending Invoices</div>
              </div>
            )}

          {summarydata &&
            Number(
              summarydata.totalAmountByInvoiceChannels.offers +
                summarydata.totalAmountByInvoiceChannels.events
            ) > 0 && (
              <div
                className="h-[190px] w-1/4 cursor-pointer rounded-lg bg-white p-4 shadow-md"
                onClick={() => {}}
              >
                <div className="flex-between">
                  <div>
                    <Image src={offerIcon} alt="Offer" height={48} width={48} />
                  </div>
                  <div className="text-right">
                    <span className="block text-sm text-gray-500">
                      From {getDateNew(summarydata.userRegistrationDt, "UTC")}
                      <span className="block">till present</span>
                    </span>
                  </div>
                </div>
                <div className="mt-10 text-xl font-medium">
                  {summarydata.currencySymbol}
                  {getDecimalNum(
                    summarydata.totalAmountByInvoiceChannels.offers +
                      summarydata.totalAmountByInvoiceChannels.events
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  Paid Offers & Events
                </div>
              </div>
            )}

          {summarydata &&
            Number(summarydata.totalAmountByInvoiceChannels.catalog) > 0 && (
              <div
                className="h-[190px] w-1/4 cursor-pointer rounded-lg bg-white p-4 shadow-md"
                onClick={() => {}}
              >
                <div className="flex-between">
                  <div>
                    <Image
                      src={storeIcon}
                      alt="Catalog"
                      height={48}
                      width={48}
                    />
                  </div>
                  <div className="text-right">
                    <span className="block text-sm text-gray-500">
                      From {getDateNew(summarydata.userRegistrationDt, "UTC")}
                      <span className="block">till present</span>
                    </span>
                  </div>
                </div>
                <div className="mt-10 text-xl font-medium">
                  {summarydata.currencySymbol}
                  {getDecimalNum(
                    summarydata.totalAmountByInvoiceChannels.catalog
                  )}
                </div>
                <div className="text-sm text-gray-500">Total Store Sales</div>
              </div>
            )}
        </div>
      ) : (
        <div className="flex h-12 items-center justify-center">
          <span>{`No data available for the past months`}</span>
        </div>
      )}
    </>
  );
};

export default SummaryCard;
