import { Biz, ParentLocation } from "../api-response/transaction.response"
import { BusinessWorkingHour } from "../store/store.types"

export type UpdateLocationResponse  =  {

    businessWorkingHours: BusinessWorkingHour
    biz : Biz
    catalogueAppointmentType  : string
    addressLine1 :  string
    addressLine2 : string
    bizid : number
    catalogueId : number | null
    city : string,
    country : string,
    createdDt : string,
    ctryCode: string;
    deliveryOptions: string;
    deliveryWithin: number | null | string;
    distance: number;
    isCampaignAppoinmtnetEnabled : boolean
    isCatalogueAppointmentEnabled :  boolean
    lat :  number
    lng : number
    locName : string
    locType :  string
    objid : number
    parentLocation : ParentLocation
    phone :  string
    postalCode : string
    qrid  : number,
    slotCapacity : number,
    slotDuration : null | string | number
    state :  string ,
    status : string,
    timeZone: string;
    updatedDt: string | null;
    workingHours: string | null


}