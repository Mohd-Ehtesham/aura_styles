import { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import store from "./redux/store";

import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import CartPage from "./pages/CartPage";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import OrderPage from "./pages/OrderPage";
import PaymentPage from "./pages/PaymentPage";
import UsersOrders from "./pages/UsersOrders";
import UserProfile from "./pages/UserProfile";
import RegisterPage from "./pages/RegisterPage";
import MyWishlistPage from "./pages/WishlistPage";
import ProductDetails from "./pages/ProductDetails";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <Suspense
          fallback={<div className="loader">Loading...</div>}
        ></Suspense>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="/*" element={<NotFound />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order"
              element={
                <ProtectedRoute>
                  <OrderPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <UsersOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/myProfile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route path="/productDetails/:_id" element={<ProductDetails />} />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <MyWishlistPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
