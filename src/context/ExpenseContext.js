import { createContext, useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

export const ExpenseContext = createContext();

const API_BASE = "http://localhost:5000"; // ✅ Ensure it matches your backend port

const ExpenseProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/expenses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(res.data);
    } catch (err) {
      console.error("Fetch failed", err);
    }
  }, [token]);

  const addExpense = async (expense) => {
    console.log("Token used in addExpense:", token);

    try {
      await axios.post(`${API_BASE}/api/expenses`, expense, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Expense added!");
      await fetchExpenses();
    } catch (err) {
      toast.error("Failed to add expense");
      console.error("Add failed", err.response?.data || err.message);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(expenses.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const updateExpense = async (id, updated) => {
    try {
      const res = await axios.put(`${API_BASE}/api/expenses/${id}`, updated, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(expenses.map((e) => (e._id === id ? res.data : e)));
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  useEffect(() => {
    if (token) {
      console.log("Token present, fetching expenses...");
      fetchExpenses();
    } else {
      console.warn("No token yet, skipping fetch.");
    }
  }, [token, fetchExpenses]);
  

  return (
    <ExpenseContext.Provider
      value={{ expenses, addExpense, deleteExpense, updateExpense, fetchExpenses }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
