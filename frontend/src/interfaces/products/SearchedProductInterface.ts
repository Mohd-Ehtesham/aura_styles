export interface SearchedProduct {
  _id: string;
  name: string;
  brand: string;
  description: string;
  category: string;
  price: number;
  discountPrice: number;
  sizes: string[];
  stock: number;
  images: ProductImage[];
  isFeatured: boolean;
  rating: number;
  numReviews: number;
}

export interface SearchedProductResponse {
  success: boolean;
  message: string;
  data: SearchedProduct[];
  length: number;
}

export interface ProductImage {
  _id: string;
  url: string;
  fileId: string;
}
