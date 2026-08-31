import axios from "axios";

const API = axios.create({
  baseURL: "https://perfect-health-pharmacy.onrender.com/api",
});

export default API;