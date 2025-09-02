import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsArrayOf,
  parseAsString,
} from "nuqs/server";
import React from "react";

import { onGetOfferSummary } from "@/actions/offer-summary.actions";
import { auth } from "@/auth";
import ContainerWrapper from "@/components/global/container-wrapper";
import { MultiSelect } from "@/components/global/multiselect-dropdown/multi-select-dropdown";
import PieChartSection from "@/components/global/piechart/piechart";
import LocalSearch from "@/components/global/search/local-search";
import ROUTES from "@/constants/routes";
import { getSortingStateParser } from "@/lib/utils/table/parsers";
import { RouteParams } from "@/types/global";
import { OfferPurchaseProps } from "@/types/offer-summary/offer-summary.types";

import OfferSummaryTable from "./_components/offer-summary-table";

const OfferSummary = async ({
  searchParams,
}: Pick<RouteParams, "searchParams">) => {
  const session = await auth();
  const bizid = session?.user?.bizid;

  const params = await searchParams;
  const query = typeof params?.query === "string" ? params.query : "";

  const searchParamsCache = createSearchParamsCache({
    page: parseAsInteger.withDefault(1),
    pageSize: parseAsInteger.withDefault(10),
    sort: getSortingStateParser<OfferPurchaseProps>().withDefault([
      { id: "invoiceDt", desc: true },
      { id: "validTill", desc: true },
    ]),
    status: parseAsArrayOf(parseAsString).withDefault([]),
  });

  const search = searchParamsCache.parse(params);
  const selectedStatuses = search.status;
  const orderBy = search.sort.map((item) => (item.desc ? "DESC" : "ASC"));
  const { data } = await onGetOfferSummary({
    bizid,
    pgSize: search.pageSize,
    pgStart: search.page,
    text: query,
    redemptionStatusList: selectedStatuses,
  });

  const chartData = [
    { name: "Unused", visitors: data?.data.unredeemedOffersCount || 0 },
    { name: "Redeemed", visitors: data?.data?.redeemedOffersCount || 0 },
    {
      name: "Partially Redeemed",
      visitors: data?.data.partiallyRedeemedOffersCount || 0,
    },
  ];
  const promises = Promise.all([
    onGetOfferSummary({
      bizid,
      pgSize: search.pageSize,
      pgStart: search.page,
      text: query,
      orderBy: params?.sort ? orderBy[0] : undefined,
      redemptionStatusList: selectedStatuses,
    }),
  ]);

  return (
    <ContainerWrapper title="Offer Summary">
      <div className="flex justify-between gap-4 pb-6 pt-1 text-[14px] font-normal md:flex-row ">
        <div className="flex">
          <div className="mr-6 flex items-center justify-center rounded-10 bg-primary-0.5 p-6 shadow-[0px_4px_4px_0px_#0000001A]">
            <PieChartSection chartData={chartData} />
          </div>

          <div className=" flex flex-col justify-end gap-2 text-[16px] leading-5 text-[#878787]">
            <p>Total Offers Sold: {data?.data.purchasedOffersCount} </p>
            <p>Total Unused Offers: {data?.data.unredeemedOffersCount} </p>
            <p>Total Redeemed Offers: {data?.data?.redeemedOffersCount} </p>
            <p>
              Total Partially Redeemed Offers:{" "}
              {data?.data.partiallyRedeemedOffersCount}{" "}
            </p>
          </div>
        </div>

        <div className="body-3 flex flex-col justify-end gap-2 pr-20">
          <div className="flex items-center">
            <span className="mr-2 inline-block size-4 rounded-full bg-current text-primary-80"></span>
            <span>Offers Unused</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2 inline-block size-4 rounded-full bg-current text-black-40"></span>
            <span>Offers Redeemed</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2 inline-block size-4 rounded-full bg-current text-primary-10"></span>
            <span>Offers Partially Redeemed</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <div>
          <MultiSelect
            placeholder="Redemption Status"
            options={[
              { label: "Redeemed", value: "redeemed" },
              { label: "Unused", value: "unused" },
              { label: "Partially Redeemed", value: "partially-redeemed" },
            ]}
            paramKey="status"
            className="h-[40px] w-[250px] border  border-secondary-20 bg-white "
          />
        </div>
        <div>
          <LocalSearch
            placeholder="Search by voucher code, name & phone no."
            route={ROUTES.BUSINESS_ACCOUNT_OFFER_SUMMARY}
            icon={"/images/aboutus/home-search-icon.svg"}
          />
        </div>
      </div>

      <section className="mt-10">
        <OfferSummaryTable promises={promises} />
      </section>
    </ContainerWrapper>
  );
};

export default OfferSummary;
