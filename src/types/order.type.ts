import { Role } from "../enum/role";

export interface Order {
  _id: string;
  user: User;
  shippingAddress: string;
  receiverName: string;
  orderCode: string;
  phoneNumber: string;
  orderItems: OrderItem[];
  totalPrice: number;
  shippingFee: number;
  shippingFeePercentage: number;
  totalAmount: number;
  orderStatus: string[];
  payment: Payment;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  variation: Variation;
  price: number;
  quantity: number;
  _id: string;
  product: Product;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  isHot: boolean;
  avatar: string;
  images: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Variation {
  _id: string;
  size: string;
  unitPrice: number;
  salePrice: number;
  availableQuantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  paymentMethod: string;
  paymentStatus: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: Role[];
  createdAt: string;
  updatedAt: string;
  phoneNumber: string;
  address: string;
}
