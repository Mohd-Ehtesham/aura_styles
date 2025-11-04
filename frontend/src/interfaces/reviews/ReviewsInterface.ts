export interface ReviewInterface {
  _id?: string;
  user: string;
  product: string;
  reviewRating: number;
  comment: string;
  images: string[];
}

export interface ReviewImage {
  url: string;
  fileId: string;
}

export interface CreateReviewApiResponse {
  success: boolean;
  message: string;
  data: ReviewInterface;
}

interface User {
  _id: string;
  name: string;
}

export interface ReviewData {
  user: User;
  product: string;
  images: ReviewImage[];
  reviewRating: number;
  comment: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ReviewApiResponse {
  success: boolean;
  length: number;
  count: number;
  message: string;
  data: ReviewData[];
}
