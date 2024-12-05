import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5002",
  baseURL:"https://cravings-backend-o8sk.onrender.com",
  headers: {
    "Content-Type": "application/json",
    "Authorization": localStorage.getItem("token")
      ? `Bearer ${localStorage.getItem("token")}`
      : null,
  },
});

export default api;
