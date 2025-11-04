export interface Order {
  user: string;
  orderItems: OrderItems[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentStatus?: string;
  isDelivered?: boolean;
  deliveredAt?: string;
  orderPlacedLocation: OrderPlacedLocation;
  totalAmount: number;
}

interface OrderItems {
  product?: string;
  name?: string;
  quantity?: number;
  price?: number;
}

interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

interface OrderPlacedLocation {
  latitude: string;
  longitude: string;
}

export interface CreateOrderApiResponse {
  success: boolean;
  message: string;
  data: Order;
}
