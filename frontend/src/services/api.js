import axios from "axios";

const API = axios.create({
  baseURL: "https://fullstackproj-7p2b.onrender.com/api",
  withCredentials: true,
});

export default API;