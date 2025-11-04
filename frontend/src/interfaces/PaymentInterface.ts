export interface Payment {
  _id: string;
  user: string;
  order: string;
  provider: "Razorpay" | "Stripe" | "PayPal" | "Cash";
  amount: number | undefined;
  status: "Pending" | "Success" | "Failed";
  paymentDate?: string;
  razorpayOrderId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MakePaymentApiResponse {
  success: boolean;
  message: string;
  payment: Payment;
  order?: any; // Razorpay order object if provider is Razorpay
  error?: string; // present only if error occurs
}

export interface PaymentVerificationData {
  razorpay_order_id: string; // Razorpay order ID
  razorpay_payment_id: string; // Razorpay payment ID
  razorpay_signature: string; // Signature to verify payment
}

export interface PaymentVerificationResponse {
  success: boolean;
  message: string;
  data: Payment; // updated payment document
  error?: string; // optional error
}
