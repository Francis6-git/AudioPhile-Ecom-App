export type OrderItem = {
  id: string;
  name: string;
  price: number; // in cents
  quantity: number;
  image: string;
};

export type PaymentMethod = "e-money" | "cash-on-delivery";

export type Order = {
  id: string;
  customer: {
    firstName: string;
    lastName?: string;
    email: string;
    phone?: string;
  };
  shipping: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: PaymentMethod;
  paymentDetails?: {
    eMoneyNumber: string;
    eMoneyPin: string;
  };
  items: OrderItem[];
  shippingFee: number;
  taxes: number;
  subtotal: number;
  total: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: string;
};

export type CreateOrderPayload = Omit<Order, "id" | "createdAt" | "status">;

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  categoryImage: string;
  new: boolean;
  price: number; // in cents
  description: string;
  features: string;
  includes: Array<{
    quantity: number;
    item: string;
  }>;
  gallery: {
    first: string;
    second: string;
    third: string;
  };
  others: Array<{
    slug: string;
    name: string;
    image: string;
  }>;
  image: string;
  cartImage: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};
