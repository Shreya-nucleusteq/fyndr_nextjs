
import { ActionResponse } from "../global";
import {
  GetFaqCategoriesParams,
  GetFaqQuestionsParams,
} from "./about-us.params";
import { FaqCategoriesResponse, FaqQuestionResponse } from "./about-us.response";

export type GetFaqCategories = ({
  params,
}: GetFaqCategoriesParams) => Promise<ActionResponse<FaqCategoriesResponse>>;

export type GetFaqQuestions = ({
  params,
}: GetFaqQuestionsParams) => Promise<ActionResponse<FaqQuestionResponse>>;
