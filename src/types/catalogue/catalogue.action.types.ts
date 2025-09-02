import { ActionResponse } from "../global";
import {
  AddEditCategoryPayload,
  AddEditItemPayload,
  AddEditModifierPayload,
  DeleteCategoryPayload,
  DeleteModifierPayload,
  GetCatalogueListParams,
  UpdateStoreURLPayload,
} from "./catalogue.params";
import {
  CatalogueListResponse,
  FetchLocationResponse,
  StoreCategoryResponse,
  StoreItemResponse,
  StoreModifierDelete,
  StoreModifierResponse,
  UpdateURLResponse,
} from "./catalogue.response";
import { StoreCategory, StoreItem, StoreModifier } from "./catalogue.types";

export type GetCatalogueList = (
  params: GetCatalogueListParams
) => Promise<ActionResponse<CatalogueListResponse>>;

export type UpdateStoreURL = (
  payload: UpdateStoreURLPayload
) => Promise<ActionResponse<UpdateURLResponse>>;

export type GetLocationsList = (params: {
  store_url: string;
}) => Promise<ActionResponse<FetchLocationResponse>>;

export type GetStoreCategoriesList = (
  params: GetCatalogueListParams
) => Promise<ActionResponse<StoreCategoryResponse>>;

export type GetStoreItemList = (
  params: GetCatalogueListParams
) => Promise<ActionResponse<StoreItemResponse>>;

export type GetStoreModifiersList = (
  params: GetCatalogueListParams
) => Promise<ActionResponse<StoreModifierResponse>>;

export type DeleteModifier = (
  payload: DeleteModifierPayload
) => Promise<ActionResponse<StoreModifierDelete>>;

export type DeleteCategory = (
  payload: DeleteCategoryPayload
) => Promise<ActionResponse<StoreModifierDelete>>;

export type AddCategory = (
  payload: Array<AddEditCategoryPayload>
) => Promise<ActionResponse<StoreCategory>>;

export type EditCategory = (
  payload: AddEditCategoryPayload
) => Promise<ActionResponse<StoreCategory>>;

export type AddItem = (
  payload: Array<AddEditItemPayload>
) => Promise<ActionResponse<StoreItem>>;

export type EditItem = (
  payload: AddEditItemPayload
) => Promise<ActionResponse<StoreItem>>;

export type AddModifier = (
  payload: Array<AddEditModifierPayload>
) => Promise<ActionResponse<StoreModifier>>;

export type EditModifier = (
  payload: AddEditModifierPayload
) => Promise<ActionResponse<StoreModifier>>;
