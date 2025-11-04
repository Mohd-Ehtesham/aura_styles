export interface UserOrdersApiResponse {
  success: boolean;
  length: number;
  message: string;
  data: UserOrderData[];
}

export interface UserOrderData {
  shippingAddress: ShippingAddress;
  orderPlacedLocation: OrderPlacedLocation;
  _id: string;
  user: string;
  orderItems: OrderItem[];
  paymentMethod: string;
  paymentStatus: string;
  isDelivered: boolean;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

interface OrderPlacedLocation {
  latitude: number;
  longitude: number;
}

interface OrderItem {
  product: string;
  name: string;
  quantity: number;
  price: number;
  _id: string;
}
