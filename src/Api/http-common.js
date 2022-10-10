import axios from "axios";
export default axios.create({
<<<<<<< HEAD
  baseURL: "http://192.168.1.67:8080/",
=======
  baseURL: "http://192.168.1.51:8080/",
>>>>>>> laura/T-15
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});