export interface ReviewInterface {
  _id?: string;
  user: string;
  product: string;
  reviewRating: number;
  comment: string;
  images: string[];
}

export interface DeleteReviewApiResponse {
  success: boolean;
  message: string;
  data: ReviewInterface;
}
