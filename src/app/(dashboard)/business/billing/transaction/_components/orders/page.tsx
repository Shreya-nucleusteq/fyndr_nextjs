import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";
import { Suspense } from "react";

import { onGetOrdersDetails } from "@/actions/transaction.action";
import { auth } from "@/auth";
import DefaultCard from "@/components/global/cards/default-card";
import LocalSearch from "@/components/global/search/local-search";
import ROUTES from "@/constants/routes";
import { RouteParams } from "@/types/global";

import OrdersTable from "./_components/orders-table";
import SelectDelivery from "./_components/select-orders/select-delivery";
import SelectDeliveryDate from "./_components/select-orders/select-delivery-date";
import SelectPayment from "./_components/select-orders/select-payment";

const Orders = async ({ searchParams }: Pick<RouteParams, "searchParams">) => {
  const session = await auth();
  const bizid = session?.user.bizid;
  const params = await searchParams;
  const query = typeof params?.query === "string" ? params.query : "";

  console.log("🔍 Raw params received:", params);

  const searchParamsCache = createSearchParamsCache({
    page: parseAsInteger.withDefault(1),
    pageSize: parseAsInteger.withDefault(10),
    paymentstatus: parseAsArrayOf(parseAsString).withDefault([]),
    deliverystatus: parseAsArrayOf(parseAsString).withDefault([]),
  });

  const search = searchParamsCache.parse(params);
  const selectedPyamentStatus = search.paymentstatus;
  const selectedDeliveryStatus = search.deliverystatus;

const orderStartDt = typeof params?.orderStartDt === "string" ? params.orderStartDt : "";
const orderEndDt = typeof params?.orderEndDt === "string" ? params.orderEndDt : "";
  const promises = Promise.all([
    onGetOrdersDetails(
      {
        page: search?.page || 1,
        pageSize: search?.pageSize || 10,
        businessId: bizid,
      },
      {
        deliveryStatus: selectedDeliveryStatus,
        invoicedTo: query,
        orderEndDt,
        orderStartDt,
        paymentStatus: selectedPyamentStatus,
      }
    ),
  ]);

  return (
    <div className="min-h-screen ">
      <DefaultCard>
        <div className="flex gap-4">
          <div>
            <LocalSearch
              placeholder="Search by name"
              route={ROUTES.BUSINESS_DASHBOARD}
              icon={"/images/aboutus/home-search-icon.svg"}
              className="mr-6 w-60"
            />
          </div>

          <div>
            <SelectPayment />
          </div>
          <div>
            <SelectDelivery />
          </div>
          <div>
            <SelectDeliveryDate />
          </div>
        </div>
        <section className="mt-10">
          <Suspense fallback={<div>Loading orders...</div>}>
            <OrdersTable promises={promises} />
          </Suspense>
        </section>
      </DefaultCard>
    </div>
  );
};

export default Orders;
