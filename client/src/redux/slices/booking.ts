import { createSlice } from '@reduxjs/toolkit';
import { store } from '../store';
import axios from 'utils/axios';
import { Booking, BookingState } from '@types/bookings';

// ----------------------------------------------------------------------

const initialState: BookingState = {
  isLoading: false,
  error: false,
  bookings: [],
  booking: null,
  sortBy: null,
  filters: {
    gender: [],
    category: 'All',
    colors: [],
    priceRange: '',
    rating: ''
  },
};

const slice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET CARS
    getBookingsSuccess(state, action) {
      state.isLoading = false;
      state.bookings = action.payload;
    },

    // GET PRODUCT
    getBookingSuccess(state, action) {
      state.isLoading = false;
      state.booking = action.payload;
    },

    //  SORT & FILTER PRODUCTS
    sortByBookings(state, action) {
      state.sortBy = action.payload;
    },

    filterBookings(state, action) {
      state.filters.gender = action.payload.gender;
      state.filters.category = action.payload.category;
      state.filters.colors = action.payload.colors;
      state.filters.priceRange = action.payload.priceRange;
      state.filters.rating = action.payload.rating;
    },
  }
});

// Reducer
export default slice.reducer;

// Actions
export const {
  sortByBookings,
  filterBookings
} = slice.actions;

// ----------------------------------------------------------------------

export function getBookings() {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response: { data: Booking[] } = await axios.get('/booking/admin/all');
      dispatch(slice.actions.getBookingsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getBooking(id: string) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response: { data: Booking } = await axios.get('/api/v1/booking/admin/detail', {
        params: { id }
      });
      dispatch(slice.actions.getBookingSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
