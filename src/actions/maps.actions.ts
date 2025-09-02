"use server";

import { AddressType, Client } from "@googlemaps/google-maps-services-js";

import handleError from "@/lib/handlers/error";
import { Coordinates } from "@/types/global";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

const client = new Client();

export const placeAutocomplete = async (input: string) => {
  if (!input) return [];

  try {
    const response = await client.placeAutocomplete({
      params: {
        input,
        key: GOOGLE_MAPS_API_KEY,
      },
    });

    return response.data.predictions;
  } catch (error) {
    handleError(error);
  }
};

export const placeDetails = async (placeId: string) => {
  try {
    if (!placeId) {
      throw new Error("Place id is required!");
    }
    const response = await client.placeDetails({
      params: {
        key: GOOGLE_MAPS_API_KEY,
        place_id: placeId,
      },
    });

    return response.data.result;
  } catch (error) {
    handleError(error);
  }
};

export const placeDetailsByCoordinates = async (location: Coordinates) => {
  const { lat, lng } = location;
  try {
    if (!lat || !lng) {
      throw new Error("Coordinated are required");
    }

    const response = await client.reverseGeocode({
      params: {
        key: GOOGLE_MAPS_API_KEY,
        latlng: `${lat},${lng}`,
      },
    });

    return response.data.results[0];
  } catch (error) {
    handleError(error);
  }
};

export async function getPlaceDetails(placeId: string) {
  try {
    const response = await fetch(`/api/places/details?placeId=${placeId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching place details:", error);
    return null;
  }
}

export async function getPlaceDataWithZipcodeAndCountry(params: {
  country: string;
  zipcode: string | number;
}) {
  const { country, zipcode } = params;

  const address = `${zipcode}%2C${country}`;

  try {
    const response = await client.geocode({
      params: {
        address,
        key: GOOGLE_MAPS_API_KEY,
        language: "en",
      },
    });

    if (response.data.status === "OK" && response.data.results.length > 0) {
      const addressList = response.data.results[0].address_components;
      let city: string = "";
      let state: string = "";

      addressList.forEach((row) => {
        if (row.types.includes("administrative_area_level_1" as AddressType))
          state = row.short_name;
        if (row.types.includes("locality" as AddressType))
          city = row.short_name;
        else if (row.types.includes("postal_town" as AddressType) && !city)
          city = row.short_name;
      });
      const { lat, lng } = response.data.results[0].geometry.location;

      return {
        success: true,
        status: response.status,
        data: {
          city,
          state,
          lat,
          lng,
        },
      };
    }

    console.warn(`Geocoding failed: ${response.data.status}`);
    return {
      success: false,
      status: response.status,
      data: {
        city: "",
        state: "",
        lat: null,
        lng: null,
      },
    };
  } catch (error) {
    console.error("Error fetching place details:", error);
    return {
      success: false,
      status: 500,
      data: {
        city: "",
        state: "",
        lat: null,
        lng: null,
      },
    };
  }
}

export async function getCoordinates(params: {
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}) {
  const { addressLine1, addressLine2, city, state, country, postalCode } =
    params;
 const fullAddress = [
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
  ]
    .map((part) => part?.trim())
    .filter(Boolean) 
    .join(", "); 


  try {
    const response = await client.geocode({
      params: {
        address: fullAddress,
        key: GOOGLE_MAPS_API_KEY,
        language: "en",
      },
    });

    if (response.data.status === "OK" && response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry.location;
      const addressList = response.data.results[0].address_components;

      let city: string = "";
      let state: string = "";

      addressList.forEach((component) => {
        if (
          component.types.includes("administrative_area_level_1" as AddressType)
        )
          state = component.short_name;
        if (component.types.includes("locality" as AddressType))
          city = component.short_name;
        else if (
          component.types.includes("postal_town" as AddressType) &&
          !city
        )
          city = component.short_name;
      });
      
      return {
        success: true,
        status: response.status,
        data: {
          city,
          state,
          lat,
          lng,
        },
      };
    }

    console.warn(`Geocoding failed: ${response.data.status}`);
    return {
      success: false,
      status: response.status,
      data: {
        city: "",
        state: "",
        lat: null,
        lng: null,
      },
    };
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return {
      success: false,
      status: 500,
      data: {
        city: "",
        state: "",
        lat: null,
        lng: null,
      },
    };
  }
}
