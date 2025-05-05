import { Link } from "react-router-dom";
import "../styles/Home.css"; // Import the new CSS file


const Home = () => {
  return (
    <div className="home-wrapper">
      <div className="home-content">
        <h1>
          Less stress when <br />
          tracking <span>personal expenses.</span>
        </h1>
        <p>Track your spending, set budgets, and stay financially healthy.</p>
        <div className="home-buttons">
          <Link to="/login" className="btn btn-login">Log in</Link>
          <Link to="/register" className="btn btn-signup">Sign up</Link>
        </div>
        <div className="home-graphic"></div>

      </div>
     
    </div>
  );
};

export default Home;
