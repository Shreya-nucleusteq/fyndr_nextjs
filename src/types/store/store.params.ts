import { Coordinates } from "../global";

// Store --------------------------------------------------------------------

export type GetStoreParams = {
  params: {
    locationId: number;
  };
};

export type GetStoreDetailsParams = {
  params: {
    bizId: number;
    categoryId: number;
    catalogueId: number;
  };
};

export type GetStoreCategoriesParams = {
  params: {
    bizId: number;
    catalogueId: number;
  };
};

export type GetStoreLocationsParams = {
  params: {
    storeUrl: string;
  };
};

// --------------------------------------------------------------------

export type GetBusinessDirectoryParams = {
  params: {
    search?: string;
    page: number;
    pageSize: number;
  };
  payload: {
    indvId: number | null;
    distance: number;
    isCategory: boolean;
    location: Coordinates;
  };
};

export type GetLocationOffersParams = {
  params: {
    locationIds: number[];
  };
};

export type GetLocationOfferReviewsParams = {
  payload: {
    bizId: number[];
  };
};

export type LikeBusinessParams = {
  payload: {
    bizid: number;
    indvid: number;
  };
};
