import { useContext, useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ExpenseContext } from "../context/ExpenseContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { expenses, addExpense, deleteExpense, updateExpense } = useContext(ExpenseContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const categories = ["Food", "Shopping", "Entertainment", "Education", "Other"];
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.amount || !form.date || !form.category) return;
    const formattedExpense = {
      ...form,
      amount: Number(form.amount),
    };
    if (editingId) {
      await updateExpense(editingId, form);
      setEditingId(null);
    } else {
      await addExpense(formattedExpense);
    }
    setForm({ title: "", amount: "", category: "", date: "" });
  };

  const handleEdit = (exp) => {
    setForm(exp);
    setEditingId(exp._id);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const filteredExpenses = expenses.filter((exp) => {
    const date = new Date(exp.date);
    const afterFrom = fromDate ? date >= new Date(fromDate) : true;
    const beforeTo = toDate ? date <= new Date(toDate) : true;
    const matchesCategory = filterCategory ? exp.category === filterCategory : true;
    return afterFrom && beforeTo && matchesCategory;
  });

  const chartData = useMemo(() => {
    const totals = {};
    filteredExpenses.forEach((exp) => {
      if (!totals[exp.category]) totals[exp.category] = 0;
      totals[exp.category] += Number(exp.amount);
    });
    return Object.entries(totals).map(([category, amount]) => ({ name: category, value: amount }));
  }, [filteredExpenses]);

  return (
    <div className="dashboard-container container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Welcome to Your Budget Tracker!</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Add Expense */}
      <div className="card p-3 mb-4">
        <h5>Add New Expense</h5>
        <form className="expense-form" onSubmit={handleSubmit}>
          <div className="col-md-3">
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="form-control"
              placeholder="Title"
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="form-control"
              placeholder="Amount (₹)"
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-2">
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">
              {editingId ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>

      {/* Filters */}
      <div className="row g-2 mb-4">
        <div className="col-md-3">
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="form-control" />
        </div>
        <div className="col-md-3">
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="form-control" />
        </div>
        <div className="col-md-3">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="form-control"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Pie Chart */}
      <div style={{ width: "100%", height: 350 }} className="mb-4 border rounded">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Expense Table */}
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Title</th>
            <th>Amount (₹)</th>
            <th>Date</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.length > 0 ? (
            filteredExpenses.map((exp) => (
              <tr key={exp._id}>
                <td>{exp.title}</td>
                <td>{exp.amount}</td>
                <td>{new Date(exp.date).toLocaleDateString()}</td>
                <td>{exp.category}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(exp)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteExpense(exp._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No expenses found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
