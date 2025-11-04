import { useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";

import { getUserOrdersThunk } from "../redux/features/orders/getUserOrdersSlice";

import styles from "../styles/UserOrders.style.module.css";

import type { AppDispatch, RootState } from "../redux/store";
import type { UserOrderData } from "../interfaces/Orders/UserOrdersInterface";

export default function UsersOrders() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, userOrders, error } = useSelector(
    (state: RootState) => state.getUserOrders
  );

  useEffect(() => {
    dispatch(getUserOrdersThunk());
  }, [dispatch]);

  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <ScaleLoader color="black" loading={loading} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorWrapper}>
        <p className={styles.errorText}>Error: {error}</p>
      </div>
    );
  }

  if (!userOrders?.length) {
    return (
      <div className={styles.emptyWrapper}>
        <p className={styles.emptyText}>No orders found</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Your Orders</h1>

      <div className={styles.ordersGrid}>
        {userOrders?.data?.map((order: UserOrderData) => (
          <div key={order._id} className={styles.orderCard}>
            {/* Header */}
            <div className={styles.orderHeader}>
              <p className={styles.orderId}>
                Order ID:{" "}
                <span className={styles.orderIdValue}>
                  {order._id.slice(-6).toUpperCase()}
                </span>
              </p>
              <p
                className={`${styles.status} ${
                  order.isDelivered ? styles.delivered : styles.pending
                }`}
              >
                {order.isDelivered ? "Delivered" : "Pending"}
              </p>
            </div>

            {/* Order Items */}
            <div className={styles.itemsSection}>
              {order.orderItems.map((item) => (
                <div key={item._id} className={styles.itemRow}>
                  <div>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemQuantity}>Qty: {item.quantity}</p>
                  </div>
                  <p className={styles.itemPrice}>₹{item.price}</p>
                </div>
              ))}
            </div>

            {/* Payment Info */}
            <div className={styles.paymentSection}>
              <p>
                <span className={styles.label}>Payment Method:</span>{" "}
                {order.paymentMethod}
              </p>
              <p>
                <span className={styles.label}>Payment Status:</span>{" "}
                {order.paymentStatus}
              </p>
            </div>

            {/* Shipping Info */}
            <div className={styles.shippingSection}>
              <p className={styles.shippingLabel}>Shipping Address:</p>
              <p>
                {order.shippingAddress.street}, {order.shippingAddress.city}
              </p>
              <p>
                {order.shippingAddress.state} -{" "}
                {order.shippingAddress.postalCode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>

            {/* Footer */}
            <div className={styles.footer}>
              <p className={styles.totalAmount}>₹{order.totalAmount}</p>
              <p className={styles.date}>
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
