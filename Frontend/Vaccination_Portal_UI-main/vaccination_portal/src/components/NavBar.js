import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './NavBar.css'; // Import the custom styles

const NavBar = ({ change, tab, children }) => {
  const navigate = useNavigate();

  const redirectLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/dashboard">Menu</Link>
          
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className={`nav-item ${tab === "Dashboard" ? "active-tab" : ""}`} onClick={() => change("Dashboard")}>
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li className={`nav-item ${tab === "Manage Students" ? "active-tab" : ""}`} onClick={() => change("Manage Students")}>
                <Link className="nav-link" to="/manage">Manage Students</Link>
              </li>
              <li className={`nav-item ${tab === "Vaccination Drives" ? "active-tab" : ""}`} onClick={() => change("Vaccination Drives")}>
                <Link className="nav-link" to="/drives">Vaccination Drives</Link>
              </li>
              <li className={`nav-item ${tab === "Reports" ? "active-tab" : ""}`} onClick={() => change("Reports")}>
                <Link className="nav-link" to="/reports">Reports</Link>
              </li>
            </ul>
          </div>
            <button
              className="btn"
              style={{ backgroundColor: '#800080', color: '#fff' }}
              onClick={redirectLogin}
            >
              Logout
            </button>
        </div>
      </nav>
      <div>{children}</div>
    </>
  );
};

export default NavBar;
