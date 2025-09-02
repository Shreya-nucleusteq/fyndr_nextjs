"use server";

import { API_BASE_URL } from "@/environment";
import { _get } from "@/lib/handlers/fetch";
import { GetReviewOverviews } from "@/types/review/review.action.types";
import { ReviewOverviews } from "@/types/review/review.response";

export const fetchReviewsOverview: GetReviewOverviews = async (params) => {
  const { bizId } = params;
  const endpoint = `${API_BASE_URL}/analytics/business/ratingSummary/${bizId}`;

  return _get<ReviewOverviews>(endpoint, {
    requireAuth: true,
    cache: "force-cache",
  });
};
