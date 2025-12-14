import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">Biblioteca Digitală</div>
      <div className="nav-links">
        <Link to="/">Cărți</Link>
        <Link to="/users">Utilizatori</Link>
        <Link to="/loans">Împrumuturi</Link>
        <button 
          onClick={logout} 
          style={{
            marginLeft: "15px",
            padding: "5px 10px",
            cursor: "pointer",
            backgroundColor: "#8b5e3c",
            color: "#fff",
            border: "none",
            borderRadius: "4px"
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
