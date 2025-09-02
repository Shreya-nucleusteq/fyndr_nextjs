"use server";

import { API_BASE_URL } from "@/environment";
import { _get } from "@/lib/handlers/fetch";
import {
  GetFaqCategories,
  GetFaqQuestions,
} from "@/types/about-us/about-us.action.types";

export const onGetFaqCategories: GetFaqCategories = async ({ params }) => {
  const { entityId } = params;
  const endpoint = `${API_BASE_URL}/identity/faq_category/${entityId}`;

  return _get(endpoint, {
    cache: "force-cache",
  });
};

export const onGetFaqQuestions: GetFaqQuestions = async ({ params }) => {
  const { searchStr, categoryId } = params;
  let endpoint = `${API_BASE_URL}/identity/frequentlyAskedQuestions/category/${categoryId}`;

  if (searchStr) {
    endpoint += `?text=${encodeURIComponent(searchStr)}`;
  }

  return _get(endpoint, {
    cache: "force-cache",
  });
};
