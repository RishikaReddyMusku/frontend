import { useState, useContext, useEffect } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

const categories = ["Food", "Shopping", "Entertainment", "Education", "Other"];

const ExpenseForm = ({ editableExpense, clearEdit }) => {
  const { addExpense, updateExpense } = useContext(ExpenseContext);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: "",
  });

  useEffect(() => {
    if (editableExpense) {
      setForm(editableExpense);
    }
  }, [editableExpense]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editableExpense) {
      await updateExpense(editableExpense._id, form);
      clearEdit();
    } else {
      await addExpense(form);
    }
    setForm({ title: "", amount: "", category: "Food", date: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        required
      />
      <select name="category" value={form.category} onChange={handleChange}>
        {categories.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
      />
      <button type="submit">{editableExpense ? "Update" : "Add"} Expense</button>
      {editableExpense && (
        <button type="button" onClick={clearEdit}>Cancel</button>
      )}
    </form>
  );
};

export default ExpenseForm;
