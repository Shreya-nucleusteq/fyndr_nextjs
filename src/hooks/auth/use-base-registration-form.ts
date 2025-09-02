/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import {
  useForm,
  UseFormReturn,
  FieldPath,
  FieldValues,
  DefaultValues,
} from "react-hook-form";
import { ZodType } from "zod";

import { onVerifyCode } from "@/actions/auth.actions";
import { getPlaceDataWithZipcodeAndCountry } from "@/actions/maps.actions";
import { CountryData } from "@/components/global/input/select-country";
import toast from "@/components/global/toast";
import { useCountryList } from "@/hooks/location";
import { useFindUsOptions } from "@/hooks/others";
import { validatePostalAddress } from "@/lib/utils";
import { useRegistrationStore } from "@/zustand/stores/registration.store";

// Updated BaseFormData interface to match your schemas
export interface BaseFormData extends FieldValues {
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  ctryCode: string;
  phone: string;
  postalCode: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  referralCode: string | null;
  promoCode: string | null;
  findUsId: number;
  lat: number;
  lng: number;
}

interface UseBaseRegistrationFormConfig<T extends BaseFormData> {
  // Changed from ZodSchema to ZodType for better compatibility
  schema: ZodType<T, any, any>;
  defaultValues?: DefaultValues<T>;
  onSubmit: (data: T & { isBusiness: boolean }) => void;
  isBusiness: boolean;
}

interface UseBaseRegistrationFormReturn<T extends BaseFormData> {
  form: UseFormReturn<T, any>;
  states: {
    isBusiness: boolean;
    isVerifyingCode: boolean;
    isMobileVerified: boolean;
    isCodeVerified: boolean;
    agreeOnTerms: boolean;
    findUsOptionsLoading: boolean;
  };
  setters: {
    setIsMobileVerified: (value: boolean) => void;
    setIsCodeVerified: (value: boolean) => void;
    setAgreeOnTerms: (value: boolean) => void;
  };
  handlers: {
    handleSubmit: () => void;
    handleCountryChange: (country: CountryData) => Promise<void>;
    handleGetCityAndState: () => Promise<void>;
    handleVerifyCode: () => Promise<void>;
  };
  data: {
    findUsOptions: any[];
    email: string;
    regMode: string;
    isBusiness: boolean;
  };
}

export const useBaseRegistrationForm = <T extends BaseFormData>({
  schema,
  defaultValues,
  onSubmit,
  isBusiness,
}: UseBaseRegistrationFormConfig<T>): UseBaseRegistrationFormReturn<T> => {
  const { findUsOptions, isLoading: findUsOptionsLoading } = useFindUsOptions();
  const { countryList, isLoading: countryListLoading } = useCountryList();
  const registrationData = useRegistrationStore();
  const { email, regMode } = registrationData;
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryEmail = searchParams.get("email") || "";

  const [isVerifyingCode, startVerifyingCode] = useTransition();
  const [isMobileVerified, setIsMobileVerified] = useState<boolean>(false);
  const [isCodeVerified, setIsCodeVerified] = useState<boolean>(false);
  const [countryId, setCountryId] = useState<number | null>(null);
  const [agreeOnTerms, setAgreeOnTerms] = useState(false);

  // Updated baseDefaults to handle nullable fields properly
  const baseDefaults: DefaultValues<T> = {
    email: queryEmail || registrationData.email || "",
    firstName: registrationData.firstName || "",
    lastName: registrationData.lastName || "",
    country: registrationData.country || "US",
    ctryCode: registrationData.ctryCode || "+1",
    phone: registrationData.phone || "",
    postalCode: registrationData.postalCode || "",
    addressLine1: registrationData.addressLine1 || "",
    addressLine2: registrationData.addressLine2 || "",
    city: registrationData.city || "",
    state: registrationData.state || "",
    referralCode: registrationData.referralCode || null,
    promoCode: registrationData.promoCode || null,
    findUsId: registrationData.findUsId || 8,
    lat: registrationData.lat || 0,
    lng: registrationData.lng || 0,
    ...defaultValues,
  } as DefaultValues<T>;

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: baseDefaults,
  });

  const loadCountryId = () => {
    const country = form.getValues("country" as FieldPath<T>);
    const newObject = { isoCode: "Gl", name: "Global", objId: -1 };
    const resultCntry = [...countryList];
    resultCntry.unshift(newObject);

    const filterArray = resultCntry.filter((item) => item.isoCode === country);
    if (filterArray.length > 0) {
      setCountryId(filterArray[0].objId);
    }
  };

  const handleGetCityAndState = async () => {
    const country = form.getValues("country" as FieldPath<T>);
    const zipcode = form.getValues("postalCode" as FieldPath<T>);

    // Type guard to ensure zipcode is a string
    const zipcodeStr =
      typeof zipcode === "string" ? zipcode : String(zipcode || "");

    const isValid = await validatePostalAddress(zipcodeStr, country as string);

    if (!isValid) {
      form.setError("postalCode" as FieldPath<T>, {
        message:
          zipcodeStr.length < 1
            ? "Zip Code can not be blank"
            : "Zip code is Invalid",
      });
      form.setValue("city" as FieldPath<T>, "" as any);
      form.setValue("state" as FieldPath<T>, "" as any);
      return;
    }

    form.clearErrors("postalCode" as FieldPath<T>);
    const response = await getPlaceDataWithZipcodeAndCountry({
      country: country as string,
      zipcode: zipcodeStr,
    });
    const {
      data: { city, lat, lng, state },
    } = response;

    form.setValue("city" as FieldPath<T>, city as any);
    form.setValue("state" as FieldPath<T>, state as any);
    form.setValue("lat" as FieldPath<T>, lat as any);
    form.setValue("lng" as FieldPath<T>, lng as any);

    form.clearErrors("city" as FieldPath<T>);
    form.clearErrors("state" as FieldPath<T>);

    registrationData.setData({
      lat: lat || undefined,
      lng: lng || undefined,
    });
  };

  const handleCountryChange = async (country: CountryData) => {
    form.setValue("country" as FieldPath<T>, country.value as any);
    form.setValue("ctryCode" as FieldPath<T>, country.countryCode as any);

    const postalCode = form.getValues("postalCode" as FieldPath<T>);
    const postalCodeStr =
      typeof postalCode === "string" ? postalCode : String(postalCode || "");

    if (postalCodeStr.length > 0) {
      await handleGetCityAndState();
    }
    loadCountryId();
  };

  const handleVerifyCode = async () => {
    if (isVerifyingCode || isCodeVerified) return;
    const code = form.getValues("referralCode" as FieldPath<T>);

    if (!code) {
      toast.error({ message: "Please enter Referral/Promo code" });
      return;
    }

    startVerifyingCode(async () => {
      const { success, data, error } = await onVerifyCode({
        params: {
          code: String(code),
          isBusiness,
          codeType: "REGISTRATION",
          countryId: countryId || -1,
        },
      });

      if (!success) {
        toast.error({ message: error?.details?.message });
        setIsCodeVerified(false);
        return;
      }

      if (success && data) {
        toast.success({ message: data.message });
        setIsCodeVerified(true);
        const { promocode: isPromocode } = data;
        const referralCode = form.getValues("referralCode" as FieldPath<T>);

        if (isPromocode) {
          form.setValue("promoCode" as FieldPath<T>, referralCode as any);
        } else {
          form.setValue("referralCode" as FieldPath<T>, referralCode as any);
          form.setValue("promoCode" as FieldPath<T>, null as any);
        }
      }
    });
  };

  const handleSubmit = form.handleSubmit((values: T) => {
    const referralCode = form.getValues("referralCode" as FieldPath<T>);
    const referralCodeStr =
      typeof referralCode === "string"
        ? referralCode
        : String(referralCode || "");

    if (referralCodeStr.length && !isCodeVerified) {
      toast.error({
        message: "Either verify your Referral/Promo code or leave it empty!",
      });
      return;
    }

    if (!isMobileVerified) {
      toast.error({ message: "Please verify your mobile number." });
      return;
    }

    if (isBusiness && !values?.addressLine1) {
      toast.error({ message: "Please provide your business address." });
      return;
    }

    const processedValues = { ...values };
    if ("promoCode" in processedValues && processedValues.promoCode) {
      (processedValues as any).referralCode = null;
    }

    if (!agreeOnTerms) {
      toast.error({ message: "Please agree to the terms and conditions." });
      return;
    }

    const dataWithBusiness = { ...processedValues, isBusiness };
    onSubmit(dataWithBusiness);
  });

  useEffect(() => {
    loadCountryId();
  }, [countryListLoading]);

  useEffect(() => {
    if (!useRegistrationStore.persist.hasHydrated) return;
    registrationData.setData({
      email: queryEmail || email,
    });
    form.setValue("email" as FieldPath<T>, (email || queryEmail) as any);
  }, [
    useRegistrationStore?.persist?.hasHydrated,
    email,
    isBusiness,
    regMode,
    router,
    queryEmail,
  ]);

  return {
    form,
    states: {
      isVerifyingCode,
      isMobileVerified,
      isCodeVerified,
      agreeOnTerms,
      isBusiness,
      findUsOptionsLoading,
    },
    setters: {
      setIsMobileVerified,
      setIsCodeVerified,
      setAgreeOnTerms,
    },
    handlers: {
      handleSubmit,
      handleCountryChange,
      handleGetCityAndState,
      handleVerifyCode,
    },
    data: {
      findUsOptions,
      email: registrationData.email || "",
      regMode: registrationData.regMode || "",
      isBusiness: registrationData.isBusiness || false,
    },
  };
};
