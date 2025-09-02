"use client";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React, { useState } from "react";

import ActionsDialog from "@/app/(dashboard)/_components/redeemption-modal/actions-dialog";
import Button from "@/components/global/buttons";
import { useUser } from "@/hooks/auth";
import {
  capitalize,
  ChannelOffer,
  getChannelName,
  getDisplayStatus,
  getFormattedDtNew,
  getStatusColor,
  Status,
} from "@/lib/utils";
import {
  Appointment,
  InvoiceOffer,
  Offer,
} from "@/types/api-response/transaction.response";

dayjs.extend(customParseFormat);

type OffersDetails = {
  offersDetails: Offer[];
  channel: ChannelOffer | string;
  vouchers: InvoiceOffer[] | null;
  appointments: Offer[] | null;
  currencySymbol: string;
  taxAmount: number;
  userTimeZone: string | null;
  type: string | null;
  refetch: () => void;
};

const Offersdetails: React.FC<OffersDetails> = ({
  offersDetails,
  channel,
  vouchers,
  appointments,
  currencySymbol,
  taxAmount,
  userTimeZone,
  type,
  refetch,
}) => {
  const { user } = useUser();

  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const indvid = user?.indvid;

  const [redeemOpen, setRedeemOpen] = useState<boolean>(false);
  const [selectedVoucher, setSelectedVoucher] = useState<InvoiceOffer | null>(
    null
  );

  return (
    <>
      {offersDetails &&
        offersDetails.map((row) => {
          const {
            offer_id: offerId,
            retail_price: retailPrice,
            offer_price: offerPrice,
          } = row;
          type FilteredOffer = Offer | InvoiceOffer;

          const vhrs: FilteredOffer[] =
            channel === "events"
              ? offersDetails.filter((offer) => offer.offer_id === offerId)
              : vouchers?.filter((voucher) => voucher.offerId === offerId) ||
                [];

          return (
            vhrs &&
            vhrs.map((vhrRaw, index) => {
              const vhr: FilteredOffer & {
                appointment?: Appointment[];
                qty?: number;
                index?: number;
                currencySymbol?: string;
              } = { ...vhrRaw };

              let redeemptionStatus: string | undefined;
              let validTill: string = "";

              const res =
                appointments && appointments.length > 0
                  ? appointments.filter((item) => item.offer_id === offerId)
                  : [];

              vhr.appointment = res[0]?.appointment;
              vhr.index = index;
              if (channel !== "events") {
                vhr.qty = res[0]?.qty ?? 0;
              }
              vhr.currencySymbol = currencySymbol;

              if ("offerId" in vhr) {
                redeemptionStatus = vhr.redeemptionStatus;
                validTill = vhr.validTill;
              }

              return (
                <div
                  key={`${offerId}-${index}`}
                  className="my-4 w-full rounded-lg border border-secondary-20 p-4"
                >
                  <div className="mb-3 flex justify-between">
                    <span className="text-[16px] font-semibold text-primary">
                      {capitalize(getChannelName(channel))}
                    </span>
                  </div>
                  {/* Channel Name */}
                  <div className="mb-2 flex justify-between">
                    <span className="text-[14px] font-semibold text-black-70">
                      {capitalize(getChannelName(channel))} Name:
                    </span>
                    <span className="body-3 text-black-80">{row?.title}</span>
                  </div>
                  {"appointment" in vhr &&
                    vhr?.appointment &&
                    vhr?.appointment[index] &&
                    Object.entries(vhr?.appointment[index]).map(
                      (
                        [appointmentDate, timeObj]: [
                          string,
                          Appointment[string],
                        ],
                        i
                      ) => {
                        return (
                          <div key={`appointment-${i}`} className="w-full">
                            <div className="mb-2 flex justify-between">
                              <span className="text-[14px] font-semibold text-black-70">
                                Appointment:
                              </span>
                              <span className="body-3 text-black-80">
                                {dayjs(appointmentDate).format("MMM DD, YYYY")}
                              </span>
                            </div>
                            <div className="mb-2 flex justify-between">
                              <span className="text-[14px] font-semibold text-black-70">
                                Start Time:
                              </span>
                              <span className="body-3 text-black-80">
                                {dayjs(timeObj?.startTime, "HH:mm:ss").format(
                                  "hh:mm A"
                                )}
                              </span>
                            </div>
                            <div className="mb-2 flex justify-between">
                              <span className="text-[14px] font-semibold text-black-70">
                                End Time:
                              </span>
                              <span className="text-[14px] text-black-80">
                                {dayjs(timeObj?.endTime, "HH:mm:ss").format(
                                  "hh:mm A"
                                )}
                              </span>
                            </div>
                          </div>
                        );
                      }
                    )}

                  <div className="mb-2 flex justify-between">
                    <span className="text-[14px] font-semibold text-black-70">
                      Retail Price:
                    </span>
                    <span className="body-3 text-black-80">
                      {currencySymbol}
                      {retailPrice}
                    </span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-[14px] font-semibold text-black-70">
                      Offer Price:
                    </span>
                    <span className="body-3 text-black-80">
                      {currencySymbol}
                      {offerPrice}
                    </span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-[14px] font-semibold text-black-70">
                      Tax:
                    </span>
                    <span className="body-3 text-black-80">
                      {currencySymbol}
                      {taxAmount}
                    </span>
                  </div>
                  {channel !== "events" && (
                    <>
                      <div className="mb-2 flex justify-between">
                        <span className="text-[14px] font-semibold text-black-70">
                          Status:
                        </span>
                        <span
                          className="text-[14px] font-semibold"
                          style={{
                            color: getStatusColor(redeemptionStatus as Status),
                          }}
                        >
                          {getDisplayStatus(redeemptionStatus as Status)}
                        </span>
                      </div>

                      <div className="mb-2 flex justify-between">
                        <span className="text-[14px] font-semibold text-black-70">
                          Valid Till:
                        </span>
                        <span className="body-3 text-[#ED0C10]">
                          {getFormattedDtNew(validTill, userTimeZone ?? "UTC")}
                        </span>
                      </div>

                      {"isVoucher" in vhr && vhr.isVoucher && (
                        <div className="mb-2 flex justify-between">
                          <span className="text-[14px] font-semibold text-black-70">
                            Business Generated Voucher ID:
                          </span>
                          <span className="body-3 text-black-80">
                            {vhr?.customVoucherCode}
                          </span>
                        </div>
                      )}

                      <div className="mb-2 flex justify-between">
                        <span className="text-[14px] font-semibold text-black-70">
                          Fyndr Generated Voucher ID:
                        </span>
                        <Button
                          className="h-[46px] rounded-10 border border-primary bg-primary-0.5 text-primary hover:bg-primary-0.5"
                          onClick={() => {
                            if ("objid" in vhr) {
                              setSelectedVoucher(vhr);
                            }
                            setRedeemOpen(true);
                          }}
                        >
                          <div className="body-3 text-primary">
                            {"objid" in vhr && vhr
                              ? `VHR-${(vhr.objid + "").padStart(10, "0")}`
                              : ""}
                          </div>
                        </Button>
                      </div>
                      {"offer_id" in vhr &&
                        vhr.appointment &&
                        vhr.appointment.length > 0 &&
                        vhr.appointment[index] === undefined && (
                          <div className="mb-8 justify-between">
                            <div>
                              <span className="size-[16px] font-semibold text-primary">
                                Scheduled Later
                              </span>
                            </div>
                          </div>
                        )}
                    </>
                  )}
                </div>
              );
            })
          );
        })}

      <ActionsDialog
        open={redeemOpen}
        onOpenChange={() => setRedeemOpen(false)}
        type={type ?? undefined}
        row={selectedVoucher}
        title="Redeem Voucher"
        currencySymbol={currencySymbol}
        fname={firstName}
        lname={lastName}
        indvid={indvid}
        refetch={refetch}
      />
    </>
  );
};

export default Offersdetails;
