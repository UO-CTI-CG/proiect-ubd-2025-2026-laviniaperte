// src/components/Navbar.jsx
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
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}
