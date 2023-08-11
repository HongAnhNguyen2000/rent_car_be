import { createSlice } from '@reduxjs/toolkit';
import { sum, map, filter, uniqBy } from 'lodash';
import { store } from '../store';
// utils
import axios from 'utils/axios';
import { CartItem, Car, CarState } from '@types/cars';

// ----------------------------------------------------------------------

const initialState: CarState = {
  isLoading: false,
  error: false,
  cars: [],
  car: null,
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
  name: 'car',
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
    getCarsSuccess(state, action) {
      state.isLoading = false;
      state.cars = action.payload;
    },

    // GET PRODUCT
    getCarSuccess(state, action) {
      state.isLoading = false;
      state.car = action.payload;
    },

    //  SORT & FILTER PRODUCTS
    sortByCars(state, action) {
      state.sortBy = action.payload;
    },

    filterCars(state, action) {
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
  sortByCars,
  filterCars
} = slice.actions;

// ----------------------------------------------------------------------

export function getCars() {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response: { data: { cars: Car[], maxPage: number } } = await axios.get('/car/admin/all');
      dispatch(slice.actions.getCarsSuccess(response.data.cars));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getCar(id: string) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response: { data: Car } = await axios.get('/car', {
        params: { id }
      });
      dispatch(slice.actions.getCarSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
