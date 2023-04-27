import axios from 'axios';
import { getFiscalYearId, getLoggedInfo } from '@/utils/logged-info';
import router from '../router';
console.log(process.env);
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
	return config;
});

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error?.response?.status === 401) {
			router.push({ name: 'Login', replace: true }).catch(console.error);
		}
		return Promise.reject(error);
	},
);

export default axiosInstance;
