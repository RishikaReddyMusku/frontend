import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">Welcome to Personal Budget Tracker 💰</h1>
      <Link to="/login" className="btn btn-primary me-3">Login</Link>
      <Link to="/register" className="btn btn-success">Register</Link>
    </div>
  );
};

export default Home;
