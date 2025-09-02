export type GetFaqCategoriesParams = {
  params: {
    entityId: number;
  };
};
export type GetFaqQuestionsParams = {
  params: {
    searchStr?: string;
    categoryId: number;
  };
};
