import axios from "axios";

const api = axios.create({
  baseURL: "https://asset-management-backend-api.onrender.com"
});

export default api;