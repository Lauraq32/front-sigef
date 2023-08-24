import axios from 'axios';
import { getFiscalYearId, getLoggedInfo } from '@/utils/logged-info';
import router from '../router';

let requestInterceptor = () => 0;

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
	config.headers['X-Fiscal-Year-Id'] = getFiscalYearId();
	requestInterceptor('request');
	return config;
});

axiosInstance.interceptors.response.use(
	(response) => (requestInterceptor('response'), response),
	(error) => {
		requestInterceptor('responseError');
		if (error?.response?.status === 401) {
			router.push({ name: 'Login', replace: true }).catch(console.error);
		}
		return Promise.reject(error);
	},
);

export default axiosInstance;

export function onRequestInterceptedCallback(callback) {
	requestInterceptor = callback;
}
