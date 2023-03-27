import axios from 'axios';
const user = JSON.parse(localStorage.getItem( 'usuario', ));
export default axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}/api`,
  headers: {
    'Authorization':`ApiKey ${user?.token}`,
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'X-Fiscal-Year-Id': user?.currentFiscalYearId
  },
})
