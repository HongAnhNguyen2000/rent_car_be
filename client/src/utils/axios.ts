import axios from 'axios';
import { BASE_URL } from 'src/config';

const axiosInstance = axios.create({
    baseURL: 'https://rent-car.huutuananh.com//api/v1'
    // baseURL: 'https://rent.car.test/api/v1'
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
