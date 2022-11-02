import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://lws-redux-api-server.herokuapp.com',
});

export default axiosInstance;