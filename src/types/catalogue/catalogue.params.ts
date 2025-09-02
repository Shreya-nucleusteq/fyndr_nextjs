export type GetCatalogueListParams = {
  bizid: number;
  pgStart?: number;
  pgSize?: number;
};

export type UpdateStoreURLPayload = {
  catalogueId: number;
  newUrl: string;
};

export type DeleteModifierPayload = {
  bizid: number;
  objid: number;
};

export type DeleteCategoryPayload = {
  bizid: number;
  objid: number;
  description: string;
  name: string;
};

export type AddEditCategoryPayload = {
  bizid: number;
  description: string;
  name: string;
  images: string[];
  objid?: number;
};

export type AddEditItemPayload = {
  bizid: number;
  description: string;
  name: string;
  images: string[];
  sku: string;
  stdTax: boolean;
  taxPercent: string;
  unit: string;
  objid?: number;
};

export type AddEditModifierPayload = {
  bizid: number;
  description: string;
  modName: string;
  images: string[];
  modType: string;
  objid?: number;
};
