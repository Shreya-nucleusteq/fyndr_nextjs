import {
  AddLocation,
  BackgroundImageResponse,
  BusinessLogo,
  ContactUsResponse,
  BusinessTypesResponse,
  CountryListParams,
  FindUsOptionsResponse,
} from "../api-response/others.response";
import { ActionResponse, Coordinates } from "../global";

export type GetBackgroundImageProps = (
  params: Coordinates
) => Promise<ActionResponse<BackgroundImageResponse>>;

export type ContactUsParams = (payload: {
  name: string;
  phone: string;
  subject: string;
  message: string;
  from: string;
}) => Promise<ActionResponse<ContactUsResponse>>;

export type BusinessLogoParams = (payload: {
  bizName: string;
  bizid: number;
  extension: string;
  mainLogo: string;
}) => Promise<ActionResponse<BusinessLogo>>;

export type QrLogoUploadParams = (payload: {
  bizName: string;
  bizid: number;
  extension: string;
  qrLogo: string;
}) => Promise<ActionResponse<BusinessLogo>>;

export type AddLocationParams = (payload: {
  locName: string;
  objid?: number;
  ctryCode: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  country: string;
  bizid: number;
  postalCode: string;
  parentLocation: number | null;
  timeZone: string | null;
  workingHours: string;
  deliveryOptions: string;
  deliveryWithin: number | null;
  workingHoursAndSlots: {
    workingHours: {
      MONDAY: [];
      TUESDAY: [];
      WEDNESDAY: [];
      THURSDAY: [];
      FRIDAY: [];
      SATURDAY: [];
      SUNDAY: [];
    };
    slotDurationInMin: number | null;
    slotCapacity: number;
    catalogueAppointmentType: string | null;
    isCampaignBookingEnabled: boolean;
  };
}) => Promise<ActionResponse<AddLocation>>;

export type AddLocationPayload = Parameters<AddLocationParams>[0];

export type UpdateLocationPayload = AddLocationPayload & {
  objid: number | string;
};

export type DeleteLocationParams = (payload: {
  objid: number;
  bizid: number;
}) => Promise<ActionResponse<DeleteLocationParams>>;
export type GetFindUsOptionsProps = () => Promise<
  ActionResponse<FindUsOptionsResponse>
>;

export type GetCountryListParams = () => Promise<
  ActionResponse<CountryListParams>
>;

export type GetBusinessTypesProps = () => Promise<
  ActionResponse<BusinessTypesResponse>
>;
