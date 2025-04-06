import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      setError(""); // context login sets token/user
      toast.success("Login successful!");
      navigate("/dashboard"); // redirect to dashboard
    } catch (err) {
      setError("Invalid email or password.");
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary w-100" type="submit">
          Login
        </button>
      </form>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default Login;
