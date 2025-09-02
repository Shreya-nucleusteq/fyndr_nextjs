import {
  CatalogueItem,
  StoreBiz,
  StoreCategory,
  StoreItem,
  StoreLocations,
  StoreModifier,
} from "./catalogue.types";

export type CatalogueListResponse = {
  last: boolean;
  catalogues: CatalogueItem[];
};

export type UpdateURLResponse = {
  message: string;
};

export type FetchLocationResponse = {
  biz: StoreBiz;
  locations: StoreLocations[];
};

export type StoreCategoryResponse = {
  categories: StoreCategory[];
  last: boolean;
};

export type StoreItemResponse = {
  items: StoreItem[];
  last: boolean;
};

export type StoreModifierResponse = {
  modifiers: StoreModifier[];
  last: boolean;
};

export type StoreModifierDelete = {
  success: boolean;
};
