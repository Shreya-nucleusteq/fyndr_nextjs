// Store -----------------------------------------------

import { CountryCode } from "../global";

export type StoreImageProps = {
  img_url: string;
  index: number;
};

export type CatelogueCategoryImageProps = StoreImageProps & {
  thumbnail_url: string;
};

export type StoreCategory = {
  objid: number;
  images: StoreImageProps[];
  name: string;
  description: string;
  createDt: string;
  updateDt: string;
};

export type CatalogueModifier = {
  objid: number;
  catitemId: null | unknown;
  modifier: {
    objid: number;
    images: null | StoreImageProps[];
    modType: "addon" | "whole";
    modName: string;
    description: string;
    createDt: string;
    updateDt: string;
  };
  price: number;
};

export type StoreItem = {
  objid: number;
  categoryId: number;
  item: {
    objid: number;
    images: StoreImageProps[];
    sku: string;
    name: string;
    unit: "kg" | string;
    description: string;
    stdTax: boolean;
    taxPercent: number;
    createDt: string;
    updateDt: string;
  };
  price: number;
  slno: number;
  status: "active" | string;
  availableFrom: string;
  catalogueModifiers: CatalogueModifier[];
};

export type StoreCategory2 = {
  objid: number;
  bizid: number;
  images: CatelogueCategoryImageProps[];
  name: string;
  description: string;
  totalItems: number;
};

export type StoreLocation = {
  objid: number;
  qrid: number;
  bizid: number;
  locName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  lat: number;
  lng: number;
  createdDt: null | string;
  updatedDt: null | string;
  ctryCode: CountryCode;
  status: "active" | string;
  locType: null | unknown;
  parentLocation: null | unknown;
  deliveryWithin: null | unknown;
  deliveryOptions: string;
  timeZone: string;
  workingHours: string;
  distance?: null | number;
  catalogueId: null | unknown;
  biz: null | unknown;
  workingHoursAndSlots: null | unknown;
};

// ------------------------------------------------------

export type BusinessWorkingHour = {
  Sunday?: string[];
  Monday?: string[];
  Tuesday?: string[];
  Wednesday?: string[];
  Thursday?: string[];
  Friday?: string[];
  Saturday?: string[];
};

export type LocationOffer = {
  locid: number;
  activeCampaignCount: number;
  cmpnImg: string;
  title: string;
  count: number;
  objid: number;
  cmpnQrCode: string;
};

export type BusinessDirectory = {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  ctryCode: string;
  lat: number;
  lng: number;
  phone: string;
  postalCode: string;
  timeZone: string;

  bizName: string;
  bizid: number;
  website: string;
  mainLogo: string;
  objid: number;
  qrid: number;

  businessWorkingHours: BusinessWorkingHour;

  catImg: null | string;
  catalogueId: null | unknown;
  deliveryOptions: string;
  deliveryWithin: string;
  distance: number;
  liked: "yes" | "no";
  likes: null | unknown;
  workingHours: string;
};

export type EnhancedBusinessDirectory = BusinessDirectory & {
  bizDirLikes: number;
  locationOfferData: LocationOffer | null;
};
