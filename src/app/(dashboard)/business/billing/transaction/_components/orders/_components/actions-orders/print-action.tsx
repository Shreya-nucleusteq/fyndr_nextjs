/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import Buttons from "@/components/global/buttons/invoice-buttons";
import Bizcard from "@/components/global/invoice/biz-card";
import Invoicefooter from "@/components/global/invoice/invoice-footer";
import Overallreview from "@/components/global/invoice/overall-review";
import { Modal } from "@/components/global/modal";
import { useUser } from "@/hooks/auth";
import { useInvoiceDetails, useUserReviewOverViews } from "@/hooks/invoice";
import { parseAddress } from "@/lib/utils";
import {
  Address,
  Biz,
  CatalogResponse,
  GiftDetails,
  InvoiceOffer,
} from "@/types/api-response/transaction.response";
import { ReviewOverviews } from "@/types/review/review.response";

import InvoiceBasicInfo from "../../../invoice-view/invoice-basic-info";
import Invoicetotal from "../../../invoice-view/invoice-total";
import RenderCatalogItems from "../../../invoice-view/render-list-item";

type PrintActionProps = {
  row: OrdersResponse | null;
  onOpenChange: () => void;
  open: boolean;
  title: string;
  type: string;
};

const PrintAction = ({
  row,
  onOpenChange,
  open,
  title,
  type,
}: PrintActionProps) => {
  const [biz, setBiz] = useState<Biz | null>(null);
  const [billingAddress, setBillingAddress] = useState<Address | null>(null);
  const [brand, setBrand] = useState<string>("");
  // const [last4, setLast4] = useState<string>("");
  const [billingEmail, setBillingEmail] = useState<string>("");
  const [purchaseLoc, setPurchaseLoc] = useState<Address | null>(null);
  const [disputeStatus, setDisputeStatus] = useState<string | null>(null);
  const [gifteeDetails, setGifteeDetails] = useState<GiftDetails | null>(null);
  const [vouchers, setVouchers] = useState<InvoiceOffer[] | null>(null);
  const [fyndrCash, setFyndrCash] = useState<number>(0);
  const [businessId, setBusinessId] = useState<number | null>(null);
  const [promoImage, setPromoImage] = useState<string>("");
  const [invoiceId, setInvoiceId] = useState<number | null>(null);
  const [reviewOverviews, setReviewOverviews] = useState<ReviewOverviews>();
  const [channel, setChannel] = useState<string>("");
  const [buyerFname, setBuyerFname] = useState<string>("");
  const [buyerLname, setBuyerLname] = useState<string>("");
  const [invoiceDt, setInvoiceDt] = useState<string>("");
  const [invoiceDetails, setInvoiceDetails] = useState<CatalogResponse | null>(
    null
  );

  const [currencySymbol, setCurrencySymbol] = useState<string>("");
  const { user, isLoading: isUserLoading } = useUser();

  const bizid = user?.bizid ?? null;
  const indvid = user?.indvid ?? null;
  const userTimeZone = user?.userTimeZone;

  const objid = row ? row.invoiceId : 0;

  const { data: invoiceDetailsResp, isLoading: isInvoiceLoading } =
    useInvoiceDetails(objid, bizid, indvid, "receivable");

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
    setChannel(invoiceDetailsResp?.channel);
    setBuyerFname(invoiceDetailsResp?.buyerFname);
    setBuyerLname(invoiceDetailsResp?.buyerLname);
    setInvoiceDt(invoiceDetailsResp?.invoiceDt);
    setInvoiceDetails(invoiceDetailsResp?.invoiceDetails as CatalogResponse);
    setCurrencySymbol(invoiceDetailsResp?.currencySymbol);
    if (invoiceDetailsResp.payments) {
      setBrand(invoiceDetailsResp.payments.cardBrand);
      // setLast4(invoiceDetailsResp.payments.cardLast4);
    }
  }, [invoiceDetailsResp]);

  useEffect(() => {
    if (!reviewOverviews) return;

    setReviewOverviews(reviewOverviewsresp);
    setBusinessId(reviewOverviewsresp?.bizId ?? null);
  }, [reviewOverviews]);

  const { data: reviewOverviewsresp } = useUserReviewOverViews(
    invoiceDetailsResp?.biz?.bizid
  );

  if (!open) return null;

  const status = invoiceDetailsResp?.status ?? "";
  const baseAmount = invoiceDetailsResp?.baseAmount ?? 0;
  const taxAmount = invoiceDetailsResp?.taxAmount ?? 0;
  const tipAmount = invoiceDetailsResp?.tipAmount ?? 0;

  const itemsDetails =
    (invoiceDetailsResp?.invoiceDetails as CatalogResponse)?.items ?? [];
  const date1 = new Date(invoiceDt);
  const date2 = new Date();

  const DifferenceInTime = date2.getTime() - date1.getTime();
  const DifferenceInDays = DifferenceInTime / (1000 * 3600 * 24);

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      footerContent={<Invoicefooter />}
      footerClassName="p-0"
      showFooter={true}
      bodyClassName="max-h-[80vh] overflow-y-scroll no-scrollbar"
    >
      {isUserLoading || isInvoiceLoading ? (
        <div>Loading invoice details...</div>
      ) : (
        <>
          {biz && (
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
          )}

          <InvoiceBasicInfo
            buyerFname={buyerFname}
            buyerLname={buyerLname}
            channel={channel}
            gifteeDetails={gifteeDetails}
            status={status}
            invoiceDetails={invoiceDetails as CatalogResponse}
            userTimeZone={userTimeZone}
            invoiceDt={invoiceDt}
            brand={brand}
            billingEmail={billingEmail}
            billingAddress={billingAddress}
            purchaseLoc={purchaseLoc}
            disputeStatus={disputeStatus}
            objid={objid}
          />

          {invoiceDetailsResp?.invoiceDetails && (
            <RenderCatalogItems
              invoiceDetails={invoiceDetailsResp.invoiceDetails}
              currencySymbol={currencySymbol}
              userTimeZone={userTimeZone}
            />
          )}

          <div className="mt-3 rounded-10 border border-secondary-20 p-3">
            <Invoicetotal
              channel={channel}
              invoiceDetails={invoiceDetails as CatalogResponse}
              currencySymbol={invoiceDetailsResp?.currencySymbol ?? ""}
              baseAmount={baseAmount}
              taxAmount={taxAmount}
              fyndrCash={fyndrCash}
              tipAmount={tipAmount}
              totalAmount={0}
              isBusiness={user?.isBusiness ?? false}
              type={type}
              itemsDetails={itemsDetails}
            />
          </div>

          <Buttons
            btn1="Print"
            onClick1={() => window.print()}
            showPopover={
              Math.round(DifferenceInDays) > 30 ||
              disputeStatus !== null ||
              businessId === user?.bizid
            }
          />
        </>
      )}
    </Modal>
  );
};

export default PrintAction;
