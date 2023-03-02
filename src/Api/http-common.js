import axios from 'axios'
export default axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}/api`,
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  },
})
