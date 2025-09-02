"use server";
import { revalidatePath } from "next/cache";

import ROUTES from "@/constants/routes";
import { API_BASE_URL } from "@/environment";
import { _delete, _get, _post, _put } from "@/lib/handlers/fetch";
import {
  AddCategory,
  AddItem,
  AddModifier,
  DeleteCategory,
  DeleteModifier,
  EditCategory,
  EditItem,
  EditModifier,
  GetCatalogueList,
  GetLocationsList,
  GetStoreCategoriesList,
  GetStoreItemList,
  GetStoreModifiersList,
  UpdateStoreURL,
} from "@/types/catalogue/catalogue.action.types";
import {
  CatalogueListResponse,
  FetchLocationResponse,
  StoreCategoryResponse,
  StoreItemResponse,
  StoreModifierDelete,
  StoreModifierResponse,
  UpdateURLResponse,
} from "@/types/catalogue/catalogue.response";
import {
  StoreCategory,
  StoreItem,
  StoreModifier,
} from "@/types/catalogue/catalogue.types";

export const onGetCatalogueList: GetCatalogueList = async (params) => {
  const endpoint = `${API_BASE_URL}/catalogue/catalogues/fetch/${params.bizid}?pgStart=${params.pgStart || 0}&pgSize=${params.pgSize || 1000}`;

  return _get<CatalogueListResponse>(endpoint, {
    requireAuth: true,
  });
};

export const onUpdateStoreURL: UpdateStoreURL = async (payload) => {
  const endpoint = `${API_BASE_URL}/catalogue/store_url`;

  return _put<UpdateURLResponse>(endpoint, payload, {
    requireAuth: true,
  });
};

export const onGetStoreLocations: GetLocationsList = async (params) => {
  const endpoint = `${API_BASE_URL}/catalogue/fetch_location/${params.store_url}`;

  return _get<FetchLocationResponse>(endpoint, {
    requireAuth: true,
  });
};

export const onGetStoreCategory: GetStoreCategoriesList = async (params) => {
  const endpoint = `${API_BASE_URL}/catalogue/categories/fetch/${params.bizid}?pgStart=${params.pgStart || 0}&pgSize=${params.pgSize || 1000}`;

  return _get<StoreCategoryResponse>(endpoint, {
    requireAuth: true,
    cache: "force-cache",
  });
};

export const onGetStoreItem: GetStoreItemList = async (params) => {
  const endpoint = `${API_BASE_URL}/catalogue/items/fetch/${params.bizid}?pgStart=${params.pgStart || 0}&pgSize=${params.pgSize || 1000}`;

  return _get<StoreItemResponse>(endpoint, {
    requireAuth: true,
    cache: "force-cache",
  });
};

export const onGetStoreModifier: GetStoreModifiersList = async (params) => {
  const endpoint = `${API_BASE_URL}/catalogue/modifiers/fetch/${params.bizid}?pgStart=${params.pgStart || 0}&pgSize=${params.pgSize || 1000}`;

  return _get<StoreModifierResponse>(endpoint, {
    requireAuth: true,
    cache: "force-cache",
  });
};

export const onDeleteModifier: DeleteModifier = async (payload) => {
  const endpoint = `${API_BASE_URL}/catalogue/modifier`;

  revalidatePath(ROUTES.BUSINESS_STORE_MODIFIER);
  return _delete<StoreModifierDelete>(endpoint, payload, {
    requireAuth: true,
  });
};

export const onDeleteItem: DeleteModifier = async (payload) => {
  const endpoint = `${API_BASE_URL}/catalogue/item`;

  revalidatePath(ROUTES.BUSINESS_STORE_ITEM);
  return _delete<StoreModifierDelete>(endpoint, payload, {
    requireAuth: true,
  });
};

export const onDeleteCategory: DeleteCategory = async (payload) => {
  const endpoint = `${API_BASE_URL}/catalogue/category`;

  revalidatePath(ROUTES.BUSINESS_STORE_CATEGORY);
  return _delete<StoreModifierDelete>(endpoint, payload, {
    requireAuth: true,
  });
};

export const onAddCategories: AddCategory = async (payload) => {
  const endpoint = `${API_BASE_URL}/catalogue/categories`;

  revalidatePath(ROUTES.BUSINESS_STORE_CATEGORY);
  return _post<StoreCategory, typeof payload>(endpoint, payload, {
    requireAuth: true,
  });
};

export const onEditCategories: EditCategory = async (payload) => {
  const endpoint = `${API_BASE_URL}/catalogue/category`;

  revalidatePath(ROUTES.BUSINESS_STORE_CATEGORY);
  return _put<StoreCategory>(endpoint, payload, {
    requireAuth: true,
  });
};

export const onAddItems: AddItem = async (payload) => {
  const endpoint = `${API_BASE_URL}/catalogue/items`;

  revalidatePath(ROUTES.BUSINESS_STORE_ITEM);
  return _post<StoreItem, typeof payload>(endpoint, payload, {
    requireAuth: true,
  });
};

export const onEditItems: EditItem = async (payload) => {
  const endpoint = `${API_BASE_URL}/catalogue/item`;

  revalidatePath(ROUTES.BUSINESS_STORE_ITEM);
  return _put<StoreItem>(endpoint, payload, {
    requireAuth: true,
  });
};

export const onAddModifiers: AddModifier = async (payload) => {
  const endpoint = `${API_BASE_URL}/catalogue/modifiers`;

  revalidatePath(ROUTES.BUSINESS_STORE_MODIFIER);
  return _post<StoreModifier, typeof payload>(endpoint, payload, {
    requireAuth: true,
  });
};

export const onEditModifiers: EditModifier = async (payload) => {
  const endpoint = `${API_BASE_URL}/catalogue/modifier`;

  revalidatePath(ROUTES.BUSINESS_STORE_MODIFIER);
  return _put<StoreModifier>(endpoint, payload, {
    requireAuth: true,
  });
};
