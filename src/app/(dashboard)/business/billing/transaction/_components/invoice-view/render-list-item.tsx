import dayjs from "dayjs";
import React from "react";

import { getFormattedDtNew } from "@/lib/utils";
import {
  CatalogResponse,
  InvoiceDetails,
  OfferResponse,
} from "@/types/api-response/transaction.response";

type RenderCatalogItems = {
  invoiceDetails: CatalogResponse | OfferResponse | InvoiceDetails;
  currencySymbol: string;
  userTimeZone?: string | null;
};

const RenderCatalogItems = ({
  invoiceDetails,
  currencySymbol,
  userTimeZone,
}: RenderCatalogItems) => {
  const INVOICE_TO = "text-[#257CDB] text-[16px] font-semibold";
  const INVOICE_TEXT = "leading-5 text-[#4D4D4D] text-sm font-semibold";
  const INVOICE_VALUE = "text-[14px] leading-[20px] font-normal text-[#333333]";
  const appointmentCartLeveldate = Object.keys(
    (invoiceDetails as CatalogResponse)?.appointment_per_cart || ""
  );
  const appointmentCartLeveldateObj = Object.values(
    (invoiceDetails as CatalogResponse)?.appointment_per_cart || ""
  );
  return (
    <>
      {(invoiceDetails as CatalogResponse)?.appointment_per_cart !== null ? (
        <div className="flex  flex-col gap-2 rounded-10 border border-secondary-20 px-3 pt-2 ">
          <div className="mb-2">
            <span className={INVOICE_TO}>Appointment Details</span>
          </div>
          <div className="mb-2 flex justify-between">
            <span className={INVOICE_TEXT}>Appointment:</span>
            <span className={INVOICE_VALUE}>
              {userTimeZone &&
                getFormattedDtNew(appointmentCartLeveldate[0], userTimeZone)}
            </span>
          </div>
          <div className="mb-2 flex justify-between">
            <span className={INVOICE_TEXT}>Start time:</span>
            <span className={INVOICE_VALUE}>
              {dayjs(
                appointmentCartLeveldateObj[0]?.startTime?.slice(0, 5),
                "HH:mm"
              ).format("hh:mm A")}
            </span>
          </div>
          <div className="mb-2 flex justify-between">
            <span className={INVOICE_TEXT}>End time:</span>
            <span className={INVOICE_VALUE}>
              {dayjs(
                appointmentCartLeveldateObj[0]?.startTime?.slice(0, 5),
                "HH:mm"
              ).format("hh:mm A")}
            </span>
          </div>
          <div>
            {(invoiceDetails as CatalogResponse).items.map((item, index) => (
              <div className="mb-2 flex justify-between" key={index}>
                <span className={INVOICE_TEXT}>
                  {item.details.mitem.name}
                  {item.details.wholeDetails && item.details.wholeDetails.modName
                    ? `(${item.details.wholeDetails.modName})`
                    : ""}
                  {`${" "}(X ${Number(item.details.qty).toFixed(2)})`}
                </span>
                <span className={INVOICE_VALUE}>
                  {`${item.details.currencySymbol}${Number(
                    item.details.total
                  ).toFixed(2)}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-2 flex flex-col  gap-2 rounded-10 border border-secondary-20 px-3 pt-2 ">
          <div className="mb-2">
            <span className={INVOICE_TO}>Item Details:</span>
          </div>
          {(invoiceDetails as CatalogResponse).items.map((item, key) => {
            const appointments = item?.details?.mitem?.appointment || [];
            const scheduledQty = appointments.length;
            const remainingQty = item.details.qty - scheduledQty;
            return (
              <div key={key}>
                <div className="mb-2 flex justify-between">
                  <span className={INVOICE_TEXT}>
                    {item.details.mitem.name}
                    {item.details.wholeDetails && item.details.wholeDetails.modName
                      ? `(${item.details.wholeDetails.modName})`
                      : ""}
                    {` (X ${Number(item.details.qty).toFixed(2)})`}
                  </span>
                  <span className={INVOICE_VALUE}>
                    {`${item.details.currencySymbol}${Number(item.details.total).toFixed(2)}`}
                  </span>
                </div>

                {appointments?.map((appoinObj, index) => {
                  const date = Object.keys(appoinObj)[0];
                  const data = appoinObj[date];

                  return (
                    <div key={index}>
                      <div className="mb-2 flex justify-between">
                        <span className={INVOICE_TEXT}>Appointment:</span>
                        <span className={INVOICE_VALUE}>
                          {userTimeZone &&
                            getFormattedDtNew(date, userTimeZone)}
                        </span>
                      </div>

                      <div className="mb-2 flex justify-between">
                        <span className={INVOICE_TEXT}>Start time:</span>
                        <span className={INVOICE_VALUE}>
                          {dayjs(data?.startTime?.slice(0, 5), "HH:mm").format(
                            "hh:mm A"
                          )}
                        </span>
                      </div>

                      <div className="mb-2 flex justify-between">
                        <span className={INVOICE_TEXT}>End Time:</span>
                        <span className={INVOICE_VALUE}>
                          {dayjs(data.endTime?.slice(0, 5), "HH:mm").format(
                            "hh:mm A"
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })}
                {remainingQty > 0 && (
                  <div className="flex justify-between">
                    <span className={INVOICE_TO}>Scheduled Later</span>
                    <span className={INVOICE_TO}>{remainingQty}</span>
                  </div>
                )}

                {item.details.addon.length > 0 &&
                  item.details.addonDetails.map((addonItem, index) => {
                    return (
                      <div
                        key={index}
                        className="flex justify-between text-[#8c8b8b]"
                      >
                        <span className={INVOICE_TEXT}>
                          {addonItem.modName}
                        </span>
                        <span>
                          {" "}
                          +{currencySymbol}
                          {addonItem.price.toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                {item?.details?.instruction && (
                  <span className={`${INVOICE_TEXT} text-[]`}>
                    <span className={`${INVOICE_TEXT} text-[#8c8b8d]`}></span>
                    {item?.details?.instruction}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default RenderCatalogItems;
