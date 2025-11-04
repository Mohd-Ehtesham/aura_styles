import { useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useRazorpay, type RazorpayOrderOptions } from "react-razorpay";

import type { AppDispatch, RootState } from "../redux/store";
import { getOrderThunk } from "../redux/features/orders/fetchOrderByIdSlice";

import type { Payment } from "../interfaces/PaymentInterface";

import { makePayment, verifyPayment } from "../services/paymentService";

import Button from "../components/Button";

import { IoMdArrowRoundBack } from "react-icons/io";

import toast from "react-hot-toast";
import styles from "../styles/Payment.style.module.css";

const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

export default function PaymentPage() {
  const { isLoading, Razorpay } = useRazorpay();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId;

  const order = useSelector((state: RootState) => state.callOrder.order?.data);

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderThunk({ orderId }));
    }
  }, [dispatch, orderId]);

  async function handlePay() {
    const paymentData: Payment = {
      _id: "",
      user: "",
      order: "",
      provider: "Razorpay",
      amount: order?.totalAmount,
      status: "Pending",
    };
    const paymentResponse = await makePayment(orderId, paymentData);
    const razorpayOrder = paymentResponse.order;
    const options: RazorpayOrderOptions = {
      key: razorpayKey,
      amount: totalAmount * 100,
      currency: "INR",
      name: "Aura Styles",
      description: "Order Payment",
      order_id: razorpayOrder.id,
      image: "/logo.png",
      handler: async function (response: any) {
        const verificationData = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };
        const verifyResponse = await verifyPayment(verificationData);
        console.log("Payment Verified:", verifyResponse);
        toast.success("Payment Success!");
        navigate("/");
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  }

  if (isLoading)
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
        }}
      >
        <ScaleLoader
          loading={isLoading}
          color="black"
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );

  if (!order)
    return (
      <div className={styles.outerContainer}>
        <Button
          variant="back"
          onClick={() => {
            navigate(-1);
          }}
        >
          <IoMdArrowRoundBack size={25} />
        </Button>
        <div className={styles.flexContainer}>There is no orders found...</div>
      </div>
    );

  const {
    orderItems,
    shippingAddress,
    totalAmount,
    paymentMethod,
    paymentStatus,
    isDelivered,
    createdAt,
  } = order;

  return (
    <div className={styles.outerContainer}>
      <Button
        variant="back"
        onClick={() => {
          navigate(-1);
        }}
      >
        <IoMdArrowRoundBack size={25} />
      </Button>
      <div className={styles.innerContainer}>
        <div className={styles.container}>
          <h1 className={styles.heading}>Order Summary</h1>
          <div>
            <h2 className={styles.subHeading}>Items in your Order</h2>
            <div className={styles.card}>
              {orderItems?.map((item) => (
                <div key={item._id}>
                  <div className={styles.flexContainer}>
                    <p className={styles.paragraphContent}>Name: {item.name}</p>
                    <p className={styles.paragraphContent}>
                      Quantity: {item.quantity}
                    </p>
                    <p className={styles.paragraphContent}>
                      Price: ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.flexContainer}>
              <p className={styles.paragraphContent}>
                Placed on: {new Date(createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <h2 className={styles.subHeading}>Shipping Address</h2>
          <div className={styles.card}>
            <div className={styles.flexContainer}>
              <p className={styles.paragraphContent}>
                {shippingAddress.street}
              </p>
              <p className={styles.paragraphContent}>
                {shippingAddress.city}, {shippingAddress.state},{" "}
                {shippingAddress.postalCode}
              </p>
              <p className={styles.paragraphContent}>
                {shippingAddress.country}
              </p>
            </div>
          </div>
          <h2 className={styles.subHeading}>Payment Details</h2>
          <div className={styles.card}>
            <div className={styles.flexContainer}>
              <p className={styles.paragraphContent}>Method: {paymentMethod}</p>
              <p className={styles.paragraphContent}>Status: {paymentStatus}</p>
            </div>
          </div>
          <h2 className={styles.subHeading}>Delivery Status</h2>
          <div className={styles.card}>
            <div className={styles.flexContainer}>
              <p className={styles.paragraphContent}>
                Status: {isDelivered ? "Delivered" : "Not Delivered"}
              </p>
            </div>
          </div>
          <div className={styles.flexContainer}>
            <Button variant="primary" onClick={handlePay}>
              Buy at Rs | {totalAmount}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
