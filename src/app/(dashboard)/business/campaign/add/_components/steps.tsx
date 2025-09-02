"use client";
import DescriptionForm from "./description-component";
import ImagesVidoesComponent from "./images-video-component";
import LocationList from "./location-list";
import ObjectiveCategory from "./objective-category";
import OfferComponent from "./offer-component";
import TermsAndConditions from "./terms-conditions";
import TypeComponent from "./type-component";

export const steps = [
  { step: "1", title: "Type", component: <TypeComponent /> },
  {
    step: "2",
    title: "Objective & Category",
    component: <ObjectiveCategory />,
  },
  { step: "3", title: "Description", component: <DescriptionForm /> },
  { step: "4", title: "Images & Videos", component: <ImagesVidoesComponent /> },
  { step: "5", title: "Offers", component: <OfferComponent /> },
  { step: "6", title: "Terms & Conditions", component: <TermsAndConditions /> },
  { step: "7", title: "Locations", component: <LocationList /> },
];
