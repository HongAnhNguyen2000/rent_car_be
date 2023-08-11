import { FormikProps } from 'formik';

// ----------------------------------------------------------------------

export type PaymentType = 'paypal' | 'credit_bookingd' | 'cash';

export type BookingStatus = 1 | 2 | 3 | 4;

export type ProductInventoryType = 'in_stock' | 'out_of_stock' | 'low_stock';

export type ProductCategory = 'Accessories' | 'Apparel' | 'Shoes';

export type ProductGender = 'Men' | 'Women' | 'Kids';

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

export type Booking = {
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

export type BookingtItem = {
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

export type BookingState = {
  isLoading: boolean;
  error: boolean;
  bookings: Booking[];
  booking: Booking | null;
  sortBy: string | null;
  filters: {
    gender: string[];
    category: string;
    colors: string[];
    priceRange: string;
    rating: string;
  };
};

export type BookingFilter = {
  gender: string[];
  category: string;
  colors: string[];
  priceRange: string;
  rating: string;
};

export type PaymentOption = {
  value: PaymentType;
  title: string;
  description: string;
  icons: string[];
};
