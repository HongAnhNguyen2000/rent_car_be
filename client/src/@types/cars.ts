import { FormikProps } from 'formik';

// ----------------------------------------------------------------------

export type PaymentType = 'paypal' | 'credit_card' | 'cash';

export type CarStatus = 1 | 2 | 3 | 4;

export type ProductInventoryType = 'in_stock' | 'out_of_stock' | 'low_stock';

export type ProductCategory = 'Accessories' | 'Apparel' | 'Shoes';

export type ProductGender = 'Men' | 'Women' | 'Kids';

export type OnCreateBilling = (address: BillingAddress) => void;

export type FormikPropsShopView = FormikProps<ProductFilter>;

export type ProductRating = {
  name: string;
  starCount: number;
  reviewCount: number;
};

export type ProductReview = {
  id: string;
  name: string;
  avatarUrl: string;
  comment: string;
  rating: number;
  isPurchased: boolean;
  helpful: number;
  postedAt: Date;
};

export type Agent = {
  id: string;
  brandName: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Showroom = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  manager: string;
  contactPhone: string;
  contactEmail: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CarImage = {
  id: string;
  type: number;
  link: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Car = {
  id: string;
  title: string;
  capacity: number;
  policy: string;
  seat: number;
  chargingLevel: number;
  range: number;
  importedPrice: number;
  hourlyPrice: number;
  dailyPrice: number;
  monthlyPrice: number;
  discount: number;
  description: string;
  agent: Agent;
  showrooms: Showroom[];
  images: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CartItem = {
  id: string;
  name: string;
  cover: string;
  available: number;
  price: number;
  color: string;
  size: string;
  quantity: number;
  subtotal: number;
};

export type BillingAddress = {
  receiver: string;
  phone: string;
  fullAddress: string;
  addressType: string;
  isDefault: boolean;
};

export type CarState = {
  isLoading: boolean;
  error: boolean;
  cars: Car[];
  car: Car | null;
  sortBy: string | null;
  filters: {
    gender: string[];
    category: string;
    colors: string[];
    priceRange: string;
    rating: string;
  };
};

export type CarFilter = {
  gender: string[];
  category: string;
  colors: string[];
  priceRange: string;
  rating: string;
};

export type PaymentFormikProps = FormikProps<{
  delivery: number;
  payment: string;
}>;

export type DeliveryOption = {
  value: number;
  title: string;
  description: string;
};

export type PaymentOption = {
  value: PaymentType;
  title: string;
  description: string;
  icons: string[];
};

export type CardOption = {
  value: string;
  label: string;
};

export type Invoice = {
  id: string;
  taxes: number;
  discount: number;
  status: string;
  invoiceFrom: {
    name: string;
    address: string;
    company: string;
    email: string;
    phone: string;
  };
  invoiceTo: {
    name: string;
    address: string;
    company: string;
    email: string;
    phone: string;
  };
  items: {
    id: string;
    title: string;
    description: string;
    qty: number;
    price: number;
  }[];
};
