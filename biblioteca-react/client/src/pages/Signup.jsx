import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/library.css";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:5000/signup", {
        username,
        password,
      });
      alert("Cont creat cu succes. Te poți autentifica.");
      navigate("/login");
    } catch {
      alert("Eroare la crearea contului");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1>Creare cont</h1>

        <form onSubmit={handleSignup}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Alege un username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Parolă</label>
          <input
            type="password"
            placeholder="Alege o parolă"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="button auth-btn">
            Creează cont
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Ai deja cont?{" "}
          <Link to="/login" style={{ fontWeight: "bold", color: "#8b5e3c" }}>
            Autentifică-te
          </Link>
        </p>

      </div>
    </div>
  );
}
