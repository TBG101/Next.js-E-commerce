export interface CartItem {
  _id: string;
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
  whishlist?: boolean;
}

export interface CheckoutFields {
  name: string;
  email: string;
  address: string;
  phone: string;
  city: string;
  postalCode: string;
  country: string;
  paymentMethod: number; // 0 for cash on delivery, 1 for credit card
  cartItems: CartItem[];
}

export interface OrderItem {
  _id: string;
  name: string;
  quantity: number;
  image: string;
  price: number;
  product: string; // Assuming product is a reference to another model
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Order {
  _id: string;
  user: string;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: number; // 0 for cash on delivery, 1 for credit card
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  confirmedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface userType {
  _id: string;
  email: string;
  name: string;
  role: string;
  createdAt?: Date;
}
