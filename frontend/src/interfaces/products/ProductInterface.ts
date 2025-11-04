export interface ProductImage {
  url: string;
  fileId: string;
}

export interface Product {
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

export interface FetchProductResponse {
  success: boolean;
  length: number;
  total: number;
  message: string;
  data: Product[];
}

export interface FetchProductResponsebyId {
  success: boolean;
  message: string;
  data: Product;
}

export interface OrderedProduct extends Product {
  selectedSize: string;
  quantity: number;
}
