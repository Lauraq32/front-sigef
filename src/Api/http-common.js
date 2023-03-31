import axios from 'axios';
import { getFiscalYearId, getLoggedInfo } from '@/utils/logged-info';


const axiosInstance = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}/api`,
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE, PUT, POST, GET, OPTIONS',
    'Accept-Language': 'es-ES',
    'Content-Language': 'es-ES',
  },
});

axiosInstance.interceptors.request.use((config) => {
  config.headers['Authorization'] = `ApiKey ${getLoggedInfo()?.token}`;
  config.headers['X-Fiscal-Year-Id'] =  getFiscalYearId();
  config.timeout = 15_000;
  return config;
});

export default axiosInstance;
