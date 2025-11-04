import toast from "react-hot-toast";

import type { OrderedProduct } from "../interfaces/products/ProductInterface";

import type { AppDispatch } from "../redux/store";
import { addToCartPageThunk } from "../redux/features/cart/addProductToCart";

export const handleAddToCart = async (
  product: OrderedProduct,
  dispatch: AppDispatch,
  options?: {
    size?: string;
    quantity?: number;
  }
) => {
  const finalSize = options?.size || product.selectedSize || "M";
  const finalQuantity = options?.quantity || product.quantity || 1;
  try {
    await dispatch(
      addToCartPageThunk({
        productId: product._id,
        size: finalSize,
        quantity: finalQuantity,
      })
    ).unwrap();
    toast.success(
      `${product.name} (${finalSize}, x${finalQuantity}) added to your cart!`
    );
  } catch (error: unknown) {
    toast.error("Failed to add to cart. Please try again.");
    console.error("Add to cart failed:", error);
  }
};
