import { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import ExpenseForm from "./ExpenseForm";

const ExpenseList = () => {
  const { expenses, deleteExpense } = useContext(ExpenseContext);
  const [editExpense, setEditExpense] = useState(null);

  return (
    <>
      <ExpenseForm editableExpense={editExpense} clearEdit={() => setEditExpense(null)} />
      <h2>My Expenses</h2>
      {expenses.length === 0 && <p>No expenses yet.</p>}
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            {expense.title} - ₹{expense.amount} - {expense.category} -{" "}
            {new Date(expense.date).toLocaleDateString()}
            <button onClick={() => setEditExpense(expense)}>Edit</button>
            <button onClick={() => deleteExpense(expense._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ExpenseList;
