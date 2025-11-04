import { configureStore } from "@reduxjs/toolkit";

import productsInCarts from "./features/cart/cart";
import clearCart from "./features/cart/removeProductFromCart";
import addProductToCartReducer from "./features/cart/addProductToCart";
import updateCartProductQuantity from "./features/cart/updateProductQuantity";
import removeProductFromCartReducer from "./features/cart/removeProductFromCart";

import loggedUser from "../redux/features/user/loggedUserSlice";
import userLoginReducer from "../redux/features/user/userLoginSlice";
import userRegisterReducer from "../redux/features/user/userRegisterSlice";

import getProductsReducer from "../redux/features/product/fetchProductsSlice";
import getProductByIdReducer from "../redux/features/product/fetchProductByIdSlice";

import reviewsReducer from "../redux/features/review/fetchReviewsSlice";
import updateReviewReducer from "../redux/features/review/updateReviewSlice";
import deleteReviewReducer from "../redux/features/review/deleteReviewSlice";
import createReviewReducer from "..//redux/features/review/createReviewSlice";

import adminSettingReducer from "../redux/features/adminSetting/adminSettingSlice";

import fetchWishlistProductsReducer from "./features/myWishlistPage/getWishlistProducts";
import removeMyWishlistPageReducer from "./features/myWishlistPage/removeWishlistProduct";
import registerMyWishlistPageReducer from "./features/myWishlistPage/toggleWishlistProduct";

import makePaymentReducer from "./features/payment/makePaymentSlice";
import verifyPaymentReducer from "./features/payment/verifyPaymentSlice";

import createOrder from "./features/orders/createOrderSlice";
import fetchOrder from "./features/orders/fetchOrderByIdSlice";
import userOrders from "./features/orders/getUserOrdersSlice";

const store = configureStore({
  reducer: {
    loginUser: userLoginReducer,
    registerUser: userRegisterReducer,
    loggedUser: loggedUser,
    fetchReviews: reviewsReducer,
    createReview: createReviewReducer,
    updateReview: updateReviewReducer,
    deleteReview: deleteReviewReducer,
    carts: productsInCarts,
    clearCarts: clearCart,
    addToCartReducer: addProductToCartReducer,
    updateCartItemQuantity: updateCartProductQuantity,
    removeFromCartReducer: removeProductFromCartReducer,
    products: getProductsReducer,
    fetchProductById: getProductByIdReducer,
    adminSettings: adminSettingReducer,
    registerMyWishlistPage: registerMyWishlistPageReducer,
    fetchWishlistProducts: fetchWishlistProductsReducer,
    removeMyWishlistPage: removeMyWishlistPageReducer,
    createPayment: makePaymentReducer,
    verifyPayment: verifyPaymentReducer,
    makeOrder: createOrder,
    callOrder: fetchOrder,
    getUserOrders: userOrders,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
