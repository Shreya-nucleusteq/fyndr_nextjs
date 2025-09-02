import { ActionResponse } from "../global";
import { GetReviewOverviewsParams } from "./review.params";
import { ReviewOverviews } from "./review.response";

export type GetReviewOverviews = (
  params: GetReviewOverviewsParams
) => Promise<ActionResponse<ReviewOverviews>>;
