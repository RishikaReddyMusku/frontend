import axios from "axios";

// Replace with your actual Render backend URL
const API = axios.create({ baseURL: "https://backend-4m1p.onrender.com/api" });

export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);
export const getExpenses = (token) =>
  API.get("/expenses", { headers: { "x-auth-token": token } });
export const addExpense = (data, token) =>
  API.post("/expenses/add", data, { headers: { "x-auth-token": token } });
