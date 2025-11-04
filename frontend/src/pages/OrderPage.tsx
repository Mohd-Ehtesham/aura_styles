import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

import * as Yup from "yup";

import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";

import styles from "../styles/OrderPage.module.css";

import toast from "react-hot-toast";

import type { AppDispatch } from "../redux/store";
import { createOrderThunk } from "../redux/features/orders/createOrderSlice";

export default function OrderPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { source, product, cartProducts } = location.state || {};

  const formik = useFormik({
    initialValues: {
      user: "",
      orderItems: [],
      shippingAddress: {
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
      },
      paymentMethod: "",
      orderPlacedLocation: {
        latitude: "",
        longitude: "",
      },
      totalAmount: "",
    },
    validationSchema: Yup.object({
      shippingAddress: Yup.object({
        street: Yup.string().required("Street is required"),
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
        country: Yup.string().required("Country is required"),
        postalCode: Yup.string().required("Postal code is required"),
      }),
      paymentMethod: Yup.string().required("Payment method is required"),
    }),
    onSubmit: async (values) => {
      let orderItems = [];
      if (source === "single" && product?.data) {
        orderItems = [
          {
            product: product.data._id,
            name: product.data.name,
            quantity: product.data.quantity || 1,
            price: product.data.price,
          },
        ];
      } else if (source === "multiple" && cartProducts?.length > 0) {
        orderItems = cartProducts.map((cartProduct: any) => ({
          product: cartProduct.product._id,
          name: cartProduct.product.name,
          quantity: cartProduct.quantity,
          price: cartProduct.product.price,
        }));
      }

      const totalAmount = orderItems.reduce(
        (sum: number, orderItem: any) =>
          sum + orderItem.price * orderItem.quantity,
        0
      );

      const storedUser = localStorage.getItem("user");
      const userId = storedUser ? JSON.parse(storedUser)._id : null;

      try {
        const orderData = {
          user: userId,
          orderItems,
          shippingAddress: values.shippingAddress,
          paymentMethod: values.paymentMethod,
          orderPlacedLocation: values.orderPlacedLocation,
          totalAmount,
        };
        const resultAction = await dispatch(createOrderThunk(orderData));
        if (createOrderThunk.fulfilled.match(resultAction)) {
          const createdOrder = resultAction.payload;
          const orderId =
            (createdOrder as any)?.data?._id ??
            (createdOrder as any)?._id ??
            null;
          if (values.paymentMethod === "COD") {
            toast.success("Order Created Successfully.");
            navigate("/", { state: { orderId } });
          } else {
            toast.success("Order Created Successfully.");
            navigate("/payment", { state: { orderId } });
          }
        } else {
          console.error("Order creation failed:", resultAction.payload);
        }
      } catch (error) {
        console.error("Error placing order:", error);
      }
    },
  });

  return (
    <div className={styles.container}>
      <Button
        variant="back"
        onClick={() => {
          navigate(-1);
        }}
      >
        <IoMdArrowRoundBack size={25} />
      </Button>
      <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
        <h3 className={styles.heading}>Enter Shipping Address</h3>
        <div className={styles.innerFormContainer}>
          <div className={styles.individualFormContainer}>
            <Label htmlFor="street">Street</Label>
            <Input
              type="text"
              name="shippingAddress.street"
              id="shippingAddress.street"
              placeholder="Enter Street"
              value={formik.values.shippingAddress.street}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.shippingAddress?.street &&
              formik.errors.shippingAddress?.street && (
                <div className={styles.error}>
                  {formik.errors.shippingAddress?.street}
                </div>
              )}
          </div>
          <div className={styles.individualFormContainer}>
            <Label htmlFor="city">City</Label>
            <Input
              type="text"
              name="shippingAddress.city"
              id="shippingAddress.city"
              placeholder="Enter City"
              value={formik.values.shippingAddress.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.shippingAddress?.city &&
              formik.errors.shippingAddress?.city && (
                <div className={styles.error}>
                  {formik.errors.shippingAddress?.city}
                </div>
              )}
          </div>
          <div className={styles.individualFormContainer}>
            <Label htmlFor="state">State</Label>
            <Input
              type="text"
              name="shippingAddress.state"
              id="shippingAddress.state"
              placeholder="Enter State"
              value={formik.values.shippingAddress.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.shippingAddress?.state &&
              formik.errors.shippingAddress?.state && (
                <div className={styles.error}>
                  {formik.errors.shippingAddress?.state}
                </div>
              )}
          </div>
          <div className={styles.individualFormContainer}>
            <Label htmlFor="country">Country</Label>
            <Input
              type="text"
              name="shippingAddress.country"
              id="shippingAddress.country"
              placeholder="Enter Country"
              value={formik.values.shippingAddress.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.shippingAddress?.country &&
              formik.errors.shippingAddress?.country && (
                <div className={styles.error}>
                  {formik.errors.shippingAddress?.country}
                </div>
              )}
          </div>
          <div className={styles.individualFormContainer}>
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input
              type="text"
              name="shippingAddress.postalCode"
              id="shippingAddress.postalCode"
              placeholder="Enter Postal Code"
              value={formik.values.shippingAddress.postalCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.shippingAddress?.postalCode &&
              formik.errors.shippingAddress?.postalCode && (
                <div className={styles.error}>
                  {formik.errors.shippingAddress?.postalCode}
                </div>
              )}
          </div>
        </div>
        <h3 className={styles.heading}>Select Payment Method</h3>
        <div className={styles.selectContainer}>
          <Label htmlFor="paymentMethod">Payment Method</Label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formik.values.paymentMethod}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={styles.selectBox}
          >
            <option className={styles.optionBox} value="">
              --Chosse method--
            </option>
            <option className={styles.optionBox} value="COD">
              COD
            </option>
            <option className={styles.optionBox} value="Online">
              Online
            </option>
          </select>
          {formik.touched.paymentMethod && formik.errors.paymentMethod && (
            <div className={styles.error}>{formik.errors.paymentMethod}</div>
          )}
        </div>
        <div className={styles.buttonContainer}>
          <Button variant="secondary" type="submit">
            Place Order
          </Button>
        </div>
      </form>
    </div>
  );
}
