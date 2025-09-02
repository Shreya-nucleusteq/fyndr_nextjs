"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import {
  onCreateInvoice,
  onGetTaxDetails,
  onUpdateInvoice,
} from "@/actions/invoice.actions";
import Button from "@/components/global/buttons";
import CancelWarning from "@/components/global/cancel-warning";
import toast from "@/components/global/toast";
import { ImageUploaderOutput } from "@/components/global/uploader/image-uploader";
import { Form } from "@/components/ui/form";
import ROUTES from "@/constants/routes";
import { useUser } from "@/hooks/auth";
import { getDecimalNum } from "@/lib/utils/invoice";
import { fetchInvoice } from "@/types/api-response/transaction.response";
import {
  CancelInvoiceParams,
  InvoiceCreationParams,
} from "@/types/invoice/create-update-invoice/invoice.params";
import { CreateInvoiceDetails } from "@/types/invoice/create-update-invoice/invoice.types";

import ContactFields from "./_components/contact-fields";
import ContactType from "./_components/contact-type-selector";
import InvoiceDetailsFields from "./_components/invoice-details-fields";
import OptionsFields from "./_components/options-fields";
import { CreateInvoiceFormSchema, InvoiceFormSchema } from "./schema";

export type InvoiceFormValues = z.infer<typeof InvoiceFormSchema>;
export type CreateInvoiceFormValues = z.infer<typeof CreateInvoiceFormSchema>;

type InvoiceFormType = {
  edit?: boolean;
  inv?: fetchInvoice[] | null;
  onOpenChange?: () => void;
};

const InvoiceForm = ({ edit, inv, onOpenChange }: InvoiceFormType) => {
  const { user } = useUser();
  const bizName = user?.bizName;
  const postalCode = user?.address.postalCode;
  const country = user?.address.country;
  const bizid = user!.bizid!;
  const merchantId = user?.merchantId;
  const invoice = inv?.[0];
  const defaultValues: InvoiceFormValues = {
    type: "email",
    email: "",
    mobile: "",
    title: `Invoice from ${bizName}`,
    firstName: "",
    lastName: "",
    serviceName: "",
    invoiceId:
      (invoice?.invoiceDetails &&
        (invoice?.invoiceDetails as CreateInvoiceDetails)?.invoice_nbr) ||
      "",

    serverName:
      (invoice?.invoiceDetails &&
        (invoice?.invoiceDetails as CreateInvoiceDetails)?.server_name) ||
      "",
    msg:
      (invoice?.invoiceDetails &&
        (invoice?.invoiceDetails as CreateInvoiceDetails)?.cust_message) ||
      "",
    baseAmount: (invoice && invoice?.baseAmount.toString()) || "",
    duedate: (invoice && invoice?.dueDate) || "",
    tipAllowed:
      (invoice?.invoiceDetails &&
        (invoice?.invoiceDetails as CreateInvoiceDetails)?.tip_allowed) ||
      false,
    isTaxIncluded: invoice ? invoice.includesTax : true,
  };
  const initialTaxAmount = invoice?.taxAmount ?? 0;
  const initialTotal =
    invoice && invoice.baseAmount
      ? invoice.baseAmount + (invoice.taxAmount ?? 0)
      : 0;

  const [type, setType] = useState<"email" | "mobile">("email");
  const [total, setTotal] = useState<number | null>(initialTotal);
  const [taxAmount, setTaxAmount] = useState<number | null>(initialTaxAmount);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    invoice?.dueDate ? new Date(invoice.dueDate) : undefined
  );
  const [uploadedFiles, setUploadedFiles] = useState<ImageUploaderOutput[]>([]);
  const [taxRate, setTaxRate] = useState<number | undefined | null>(null);
  const [objid] = useState<number>(invoice?.objid ?? 0);
  const [currency] = useState<string>(user?.currency || "");
  const [currencySymbol] = useState<string>(user?.currencySymbol || "");
  const [buyerQRId, setBuyerQRId] = useState<number | null | undefined>(null);
  const [editImage, setEditImage] = useState<string>(
    (invoice?.invoiceDetails as CreateInvoiceDetails)?.img_url || ""
  );
  const [loading, setLoading] = useState<boolean>(false);

  const schema = edit ? InvoiceFormSchema : CreateInvoiceFormSchema;
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const router = useRouter();

  const getTaxRate = async () => {
    if (taxRate) return taxRate;

    const payload = {
      country,
      postalCode,
    };

    const resp = await onGetTaxDetails(payload);

    setTaxRate(resp?.data?.taxRate);
    return resp?.data?.taxRate;
  };

  const handleChangeAmount = async (value?: string) => {
    const baseAmount = Number(value)
      ? Number(value)
      : Number(form.getValues("baseAmount"));

    let tax = 0;
    const taxIncluded = form.getValues("isTaxIncluded");

    if (!taxIncluded) {
      const rate = (await getTaxRate()) ?? 0;

      tax = baseAmount * rate;
      setTaxAmount(getDecimalNum(tax));
    } else {
      setTaxAmount(0);
    }

    if (baseAmount) {
      const tot = tax + baseAmount;
      setTotal(tot);
    }
  };

  const sendInvoice: SubmitHandler<z.infer<typeof InvoiceFormSchema>> = async (
    data
  ) => {
    setLoading(true);

    const email = data.email || invoice?.buyerEmail;

    const payload: InvoiceCreationParams["payload"] = {
      objid,
      bizid,
      merchantId,
      baseAmount: data.baseAmount,
      taxAmount,
      currency,
      currencySymbol,
      buyerEmail: email && email.length > 0 ? email : user?.email || "",
      invoiceDetails: {
        business_name: bizName ?? "",
        business_country: user?.address.country ?? "",
        title: data.title,
        invoice_nbr: data.invoiceId,
        server_name: data.serverName ?? "",
        cust_message: data.msg ?? "",
        item_or_service:
          data.serviceName ||
          (invoice?.invoiceDetails as CreateInvoiceDetails)?.item_or_service,
        tip_allowed: data.tipAllowed ?? false,
      },
      includesTax: data.isTaxIncluded ?? false,
      channel: "custom",
      dueDate: selectedDate || null,
    };
    if (buyerQRId) {
      payload.buyerQRId = buyerQRId;
    }
    if (uploadedFiles.length > 0) {
      (payload.invoiceDetails as CreateInvoiceDetails).img =
        uploadedFiles[0]?.base64;
      const trimmed = uploadedFiles[0]?.type.slice(
        0,
        uploadedFiles[0]?.type.indexOf("/")
      );
      (payload.invoiceDetails as CreateInvoiceDetails).invoiceFileExtn =
        trimmed;
    }
    const res = edit
      ? await onUpdateInvoice({ payload })
      : await onCreateInvoice({ payload });

    const action = edit ? "Updated" : "Created";

    if (res.success) {
      toast.success({
        message: `Invoice ${action} Successfully`,
      });

      if (edit) {
        onOpenChange?.();
      } else {
        router.push(ROUTES.BUSINESS_DASHBOARD);
      }
    } else {
      toast.error({
        message:
          res.error?.message || `Failed to ${action.toLowerCase()} invoice`,
      });
    }
    setLoading(false);
  };

  const cancelInvoice = async () => {
    if (!invoice) {
      toast.error({ message: "No invoice found to cancel" });
      return;
    }

    try {
      const cancelPayload: CancelInvoiceParams["payload"] = {
        ...invoice,
        bizid,
        status: "cancelled",
        totalAmount: total,
      };
      const res = await onUpdateInvoice({ payload: cancelPayload });

      if (res.success) {
        toast.success({ message: "Invoice Canceled Successfully" });
        onOpenChange?.();
      } else {
        toast.error({
          message: res.error?.message || "Failed to cancel invoice",
        });
      }
    } catch (error) {
      toast.error({
        message: `An error occurred while canceling the invoice ${error}`,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          (data) => {
            sendInvoice(data);
          },
          (errors) => {
            console.log("Form validation errors:", errors);
          }
        )}
        className=""
      >
        <div className="flex gap-4">
          {!edit && <ContactType setType={setType} form={form} />}

          <div className="w-full ">
            {!edit && (
              <ContactFields
                form={form}
                type={type}
                setBuyerQRId={setBuyerQRId}
              />
            )}

            <InvoiceDetailsFields
              form={form}
              edit={edit}
              handleChangeAmount={handleChangeAmount}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />

            <OptionsFields
              form={form}
              handleChangeAmount={handleChangeAmount}
              editImage={editImage}
              taxAmount={taxAmount}
              total={total}
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
              setEditImage={setEditImage}
              edit={edit}
            />

            <div className="my-10 flex w-full items-center justify-center gap-5">
              <Button
                type="submit"
                variant="primary"
                stdHeight
                stdWidth
                className="p-5"
                disabled={loading}
              >
                {loading
                  ? edit
                    ? "Updating Invoice..."
                    : "Creating Invoice..."
                  : edit
                    ? "Update Invoice"
                    : "Create Invoice"}
              </Button>

              {edit && (
                <CancelWarning
                  warningText="Are you sure you want to cancel this invoice?"
                  onCancel={cancelInvoice}
                >
                  <Button
                    type="button"
                    className="w-36 rounded-10 border border-[#ED0C10] bg-white p-5 text-[16px] text-[#ED0C10] hover:border-[#ED0C10] hover:bg-white hover:text-[#ED0C10]"
                  >
                    Cancel Invoice
                  </Button>
                </CancelWarning>
              )}
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default InvoiceForm;
