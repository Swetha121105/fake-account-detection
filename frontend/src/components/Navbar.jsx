import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        🛡️ DeepScan AI
      </div>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/detect">Detect</Link>

        <Link to="/dashboard">Dashboard</Link>

        <Link to="/analytics">Analytics</Link>

        <Link to="/history">History</Link>

        

      </div>

    </nav>
  );
}

export default Navbar;