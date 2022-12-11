import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://json-server-apis.onrender.com',
});

export default axiosInstance;