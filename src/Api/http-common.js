import axios from 'axios';
import { getFiscalYearId, getLoggedInfo } from '@/utils/logged-info';

export default axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}/api`,
  headers: {
    'Authorization':`ApiKey ${getLoggedInfo()?.token}`,
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'X-Fiscal-Year-Id': getFiscalYearId()
  },
})
