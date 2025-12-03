import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">Biblioteca Digitală</div>
      <div className="nav-links">
        <Link to="/">Cărți</Link>
        <Link to="/users">Utilizatori</Link>
        <Link to="/loans">Împrumuturi</Link>
      </div>
    </nav>
  );
}
