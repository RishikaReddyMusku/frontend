import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);
export const getExpenses = (token) =>
  API.get("/expenses", { headers: { "x-auth-token": token } });
export const addExpense = (data, token) =>
  API.post("/expenses/add", data, { headers: { "x-auth-token": token } });
