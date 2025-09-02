export type ReviewOverviews =  {
  bizId: number;
  overallRating: number;
  ratingMap: Record<string, number>;
  totalRatings: number;
}