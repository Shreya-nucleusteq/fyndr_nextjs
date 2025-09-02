/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React, { useEffect, useState } from "react";

import Buttons from "@/components/global/buttons/invoice-buttons";
import Bizcard from "@/components/global/invoice/biz-card";
import Overallreview from "@/components/global/invoice/overall-review";
import { useUser } from "@/hooks/auth";
import { useInvoiceDetails, useUserReviewOverViews } from "@/hooks/invoice";
import { getTotal, parseAddress } from "@/lib/utils";
import {
  Address,
  Biz,
  CatalogResponse,
  fetchInvoice,
  GiftDetails,
  InvoiceOffer,
  Offer,
  OfferResponse,
  PromoResponse,
} from "@/types/api-response/transaction.response";
import { ReviewOverviews } from "@/types/review/review.response";

import DisputeModal from "./dispute-modal";
import GifteeDetails from "../../invoice-view/gift-details";
import InvoiceBasicInfo from "../../invoice-view/invoice-basic-info";
import Invoicetotal from "../../invoice-view/invoice-total";
import Offersdetails from "../../invoice-view/offers-details";
import Renderlistitem from "../../invoice-view/render-list-item";

type InvoiceViewProps = {
  inv?: fetchInvoice[] | null;
  type: string | null;
};

dayjs.extend(utc);
dayjs.extend(timezone);
const Invoiceview: React.FC<InvoiceViewProps> = ({ inv, type }) => {
  const [biz, setBiz] = useState<Biz | null>(null);
  const [billingAddress, setBillingAddress] = useState<Address | null>(null);
  const [brand, setBrand] = useState<string>("");
  // const [last4, setLast4] = useState<string>("");
  const [billingEmail, setBillingEmail] = useState<string>("");
  const [purchaseLoc, setPurchaseLoc] = useState<Address | null>(null);
  const [disputeStatus, setDisputeStatus] = useState<string | null>(null);
  const [gifteeDetails, setGifteeDetails] = useState<GiftDetails | null>(null);
  const [vouchers, setVouchers] = useState<InvoiceOffer[] | null>(null);
  const [appointment, setAppointment] = useState<Offer[] | null>(null);
  const [fyndrCash, setFyndrCash] = useState<number>(0);
  const [businessId, setBusinessId] = useState<number | null>(null);
  const [promoImage, setPromoImage] = useState<string>("");
  const [invoiceId, setInvoiceId] = useState<number | null>(null);
  const [reviewOverviews, setReviewOverviews] = useState<ReviewOverviews>();
  const [disputeOpen, setDisputeOpen] = useState<boolean>(false);
  const firstInvoice = inv?.[0];

  const { user, isLoading: isUserLoading, error } = useUser();
  const bizid = user?.bizid ?? null;
  const indvid = user?.indvid ?? null;
  const userTimeZone = user?.userTimeZone;

  const {
    data: invoiceDetailsResp,
    isLoading: isInvoiceLoading,
    refetch,
  } = useInvoiceDetails(firstInvoice?.objid ?? 0, bizid, indvid, type);

  useEffect(() => {
    if (!invoiceDetailsResp) return;

    setBiz(invoiceDetailsResp.biz ?? null);
    setBillingEmail(invoiceDetailsResp.buyerEmail ?? "");
    setBillingAddress(invoiceDetailsResp.billingAddress ?? null);
    setPurchaseLoc(invoiceDetailsResp.businessLocationAddress ?? null);
    setDisputeStatus(invoiceDetailsResp.disputeStatus ?? null);
    setGifteeDetails(invoiceDetailsResp.gifteeDetails ?? null);
    setVouchers(invoiceDetailsResp.offers ?? null);
    setFyndrCash(invoiceDetailsResp.fyndrCash);
    setBusinessId(invoiceDetailsResp?.biz?.bizid ?? null);
    setPromoImage(invoiceDetailsResp?.fyndrLogo ?? "");
    setInvoiceId(invoiceDetailsResp?.invoiceId);
    setAppointment(
      (invoiceDetailsResp.invoiceDetails as OfferResponse)?.offers ?? null
    );

    if (invoiceDetailsResp.payments) {
      setBrand(invoiceDetailsResp.payments.cardBrand);
      // setLast4(invoiceDetailsResp.payments.cardLast4);
    }
  }, [invoiceDetailsResp]);

  const { data: reviewOverviewsresp } = useUserReviewOverViews(
    invoiceDetailsResp?.biz?.bizid
  );

  useEffect(() => {
    if (!reviewOverviews) return;

    setReviewOverviews(reviewOverviewsresp);
    setBusinessId(reviewOverviewsresp?.bizId ?? null);
  }, [reviewOverviews]);

  if (!firstInvoice) {
    return <div>No invoice found</div>; // or any fallback
  }
  const {
    objid,
    baseAmount,
    taxAmount,
    tipAmount,
    invoiceDt,
    fulfiled,
    currencySymbol,
    status,
    invoiceDetails,
    buyerFname,
    buyerLname,
    channel,
  } = firstInvoice;

  const startDate =
    (invoiceDetails as PromoResponse)?.featured_start_date &&
    new Date((invoiceDetails as PromoResponse).featured_start_date);
  const endDate =
    ((invoiceDetails as PromoResponse)?.featured_end_date ?? null)
      ? new Date((invoiceDetails as PromoResponse).featured_end_date!)
      : undefined;

  if (isUserLoading || isInvoiceLoading) return <div>Loading...</div>;
  if (error) return <div>Some error occurred</div>;
  if (!user) return <div>User not found</div>;
  if (!invoiceDetailsResp) return <div>No invoice data available</div>;

  const totalAmount = firstInvoice ? Number(getTotal(firstInvoice)) : 0.0;
  const date1 = new Date(invoiceDt);
  const date2 = new Date();

  const DifferenceInTime = date2.getTime() - date1.getTime();
  const DifferenceInDays = DifferenceInTime / (1000 * 3600 * 24);

  return (
    <>
      <div>
        {biz !== null && (
          <div>
            <Bizcard
              businessLogo={
                channel !== "cmpn_promo" ? biz?.mainLogo : promoImage
              }
              businessName={biz.bizName}
              businessWebsite={biz.website ?? ""}
              businessAddonUrl={biz.addonUrl ?? ""}
              businessAddress={parseAddress(biz)}
              businessPhone={biz.addonUrl ?? ""}
              channel={channel}
              invoiceId={invoiceId}
              giftDetails={gifteeDetails}
              vouchers={vouchers}
              reviewRatings={
                reviewOverviewsresp && (
                  <Overallreview
                    disable={true}
                    reviewsOverview={reviewOverviewsresp}
                    rating={reviewOverviewsresp?.overallRating ?? 0}
                    text=" out of 5"
                    totalRatings={`(${reviewOverviewsresp?.totalRatings} Reviews)`}
                  />
                )
              }
            />
          </div>
        )}

        <InvoiceBasicInfo
          buyerFname={buyerFname}
          buyerLname={buyerLname}
          channel={channel}
          gifteeDetails={gifteeDetails}
          fulfiled={fulfiled}
          status={status}
          endDate={endDate}
          startDate={startDate}
          invoiceDetails={invoiceDetails}
          userTimeZone={userTimeZone}
          invoiceDt={invoiceDt}
          brand={brand}
          billingEmail={billingEmail}
          billingAddress={billingAddress}
          purchaseLoc={purchaseLoc}
          type={type}
          disputeStatus={disputeStatus}
          objid={inv?.[0]?.objid ?? null}
        />

        {(channel === "catalog" || channel === "catalog_appointment") && (
          <Renderlistitem
            invoiceDetails={invoiceDetailsResp?.invoiceDetails}
            currencySymbol={currencySymbol}
            userTimeZone={userTimeZone}
          />
        )}

        {gifteeDetails !== null && (
          <GifteeDetails giftDetails={gifteeDetails} />
        )}

        {(invoiceDetails as OfferResponse).offers && (
          <Offersdetails
            offersDetails={(invoiceDetails as OfferResponse).offers}
            channel={channel}
            vouchers={vouchers}
            appointments={appointment}
            currencySymbol={currencySymbol}
            taxAmount={taxAmount}
            userTimeZone={userTimeZone ?? null}
            type={type}
            refetch={refetch}
          />
        )}

        <div className="mt-3 rounded-10 border border-secondary-20 p-3">
          <Invoicetotal
            channel={channel}
            invoiceDetails={invoiceDetails}
            currencySymbol={currencySymbol}
            baseAmount={baseAmount}
            taxAmount={taxAmount}
            fyndrCash={fyndrCash}
            tipAmount={tipAmount}
            totalAmount={totalAmount}
            isBusiness={user?.isBusiness}
            type={type}
            itemsDetails={
              (invoiceDetails as CatalogResponse)?.items ||
              (invoiceDetails as OfferResponse)?.offers
            }
            endDate={endDate}
          />
        </div>

        <Buttons
          btn1="Print"
          onClick1={() => window.print()}
          btn2={
            type === "payable" &&
            disputeStatus === null &&
            Math.round(DifferenceInDays) <= 30 &&
            "Raise a dispute"
          }
          onClick2={() => {
            setDisputeOpen(true);
          }}
          showPopover={
            Math.round(DifferenceInDays) > 30 ||
            disputeStatus !== null ||
            businessId === user?.bizid
          }
        />
      </div>
      <DisputeModal
        disputeOpen={disputeOpen}
        setDisputeOpen={setDisputeOpen}
        objid={objid}
        refetch={refetch}
      />
    </>
  );
};

export default Invoiceview;
