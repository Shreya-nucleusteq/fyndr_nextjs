export type FaqQuestion = {
  id: number;
  question: string;
  answer: string;
  categoryId: number;
  active: boolean;
};

export type FaqCategory = {
  
    id: number;
    name: string;
    entityId: number;
  
};