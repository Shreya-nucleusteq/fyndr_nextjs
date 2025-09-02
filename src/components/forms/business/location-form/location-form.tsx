/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { getCoordinates } from "@/actions/maps.actions";
import { onAddLocation, onUpdateLocationn } from "@/actions/others.action";
import Button from "@/components/global/buttons";
import Select from "@/components/global/input/select/index";
import toast from "@/components/global/toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import ROUTES from "@/constants/routes";
import { useUser } from "@/hooks/auth";
import {
  AddLocationPayload,
  UpdateLocationPayload,
} from "@/types/api-params/others.params";
import { UpdateLocationResponse } from "@/types/location/location.response";

import { UseBusinessAddressCheckbox } from "./_components/business-address-checkbox";
import ParentLocation from "./_components/parent-location";
import PersonalInfo from "./_components/personal-address-info";
import { baseCreateLocationSchema, LocationFormData } from "./schema";


type CreateLocationFormParms = {
  objid?: string;
  locationInfo?: UpdateLocationResponse;
  edit?: boolean;
};

const CreateLocationForm = ({
  locationInfo,
  objid,
  edit,
}: CreateLocationFormParms) => {

  const form = useForm<LocationFormData>({
    resolver: zodResolver(baseCreateLocationSchema),
    defaultValues: {
      parentLocation: undefined,
      locName: "",
      phone: "",
      country: "US",
      postalCode: "",
      addressLine1: "",
      addressLine2: "",
      timeZone: "",
      city: "",
      state: "",
      ctryCode: "+1",
      useBusinessAddress: false,
    },
  });

  const router = useRouter();
  const { user, invalidateUser } = useUser();
  const queryClient = useQueryClient();

  const timeZones = [
    { label: "(GMT-10:00) Hawaii Time", value: "Pacific/Honolulu" },
    { label: "(GMT-08:00) Pacific Time", value: "America/Los_Angeles" },
    { label: "(GMT-07:00) Mountain Time", value: "America/Denver" },
    { label: "(GMT-07:00) Mountain Time - Arizona", value: "America/Phoenix" },
    { label: "(GMT-06:00) Central Time", value: "America/Chicago" },
    { label: "(GMT-05:00) Eastern Time", value: "America/New_York" },
  ];

  const useBusinessAddress = form.watch("useBusinessAddress");

  useEffect(() => {
    if (form.getValues("useBusinessAddress")) {
      form.setValue("addressLine1", user?.address.addressLine1 ?? "");
      form.setValue("postalCode", user?.address.postalCode ??"");
      form.setValue("city", user?.address.city ?? "");
      form.setValue("state", user?.address.state ??"");
    } else {
      form.setValue("addressLine1", "");
      form.setValue("postalCode", "");
      form.setValue("city", "");
      form.setValue("state", "");
    }
  }, [useBusinessAddress]);

  useEffect(() => {

    
    if (locationInfo) {
      form.reset({
        parentLocation: undefined,
        locName: locationInfo?.locName ?? "",
        phone: locationInfo?.phone ?? "",
        country: locationInfo?.country ?? "US",
        postalCode: locationInfo?.postalCode ?? "",
        addressLine1: locationInfo?.addressLine1 ?? "",
        addressLine2: locationInfo?.addressLine2 ?? "",
        timeZone: locationInfo?.timeZone ?? "",
        city: locationInfo?.city ?? "",
        state: locationInfo?.state ?? "",
        ctryCode: "+1",
        useBusinessAddress: false,
      });
    }
  }, [locationInfo]);

  const onSubmit: SubmitHandler<LocationFormData> = async (data) => {

    const coordinates = await getCoordinates({
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      city: data.city,
      state: data.state,
      country: data.country,
      postalCode: data.postalCode,
    });

    const payload: AddLocationPayload = {
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2 ??"",
      bizid: user?.bizid ?? 0,
      city: data.city,
      country: data.country ?? "US",
      ctryCode: data.ctryCode,
      deliveryOptions: "",
      deliveryWithin: null,
      lat: coordinates.data.lat ?? 0,
      lng: coordinates.data.lng ?? 0,
      locName: data.locName,
      parentLocation: Number(data.parentLocation) ?? null,
      phone: data.phone ?? "",
      postalCode: data.postalCode,
      state: data.state,
      timeZone: data.timeZone ?? null,
      workingHours: "",
      workingHoursAndSlots: {
        workingHours: {
          MONDAY: [],
          TUESDAY: [],
          WEDNESDAY: [],
          THURSDAY: [],
          FRIDAY: [],
          SATURDAY: [],
          SUNDAY: [],
        },
        slotDurationInMin: null,
        slotCapacity: 0,
        catalogueAppointmentType: null,
        isCampaignBookingEnabled: false,
      },
    };
    try {
      let response;

      if (edit) {
        const updatePayload: UpdateLocationPayload = {
          ...payload,
          objid: Number(objid),
        };
        response = await onUpdateLocationn(updatePayload);
      } else {
        response = await onAddLocation(payload);
      }

      if (response.success) {
        toast.success({
          message: edit
            ? "Location Updated Successfully"
            : "Location Created Successfully",
        });

        invalidateUser();
        await queryClient.refetchQueries({ queryKey: ["userData"] });
        router.push(ROUTES.BUSINESS_ACCOUNT_LOCATION);
      } else {
        toast.error({
          message:
            response.error?.message ||
            (edit ? "Failed to update location" : "Failed to create location"),
        });
      }
    } catch (error) {
      toast.error({ message: "Something went wrong" });
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {!edit && <UseBusinessAddressCheckbox form={form} />}
        <ParentLocation form={form} />
        <PersonalInfo form={form} />
        <FormField
          control={form.control}
          name="timeZone"
          render={({ field }) => (
            <FormItem className="mt-6 flex flex-col gap-[14px] sm:flex-row sm:items-center">
              <div className="flex w-full flex-col gap-1">
                <FormControl>
                  <Select
                    placeholder=""
                    options={timeZones}
                    label="Time Zone"
                    value={field.value}
                    onValueChange={field.onChange}
                    name={field.name}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div className="mt-6 flex justify-between">
          <div>
            <Button
              type="button"
              className="h-[46px]"
              variant="primary-outlined"
            >
              Reset Working Hours
            </Button>
          </div>
          <div className="flex gap-3">
            <Button className="h-[46px] w-24" type="submit" variant="primary">
              Save
            </Button>
            <Button
              type="button"
              className="h-[46px] w-24"
              variant="primary-outlined"
              onClick={() => {
                router.push(ROUTES.BUSINESS_ACCOUNT_LOCATION);
              }}
            >
              Go Back
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CreateLocationForm;
