import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/library.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/login", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/"); // redirect la pagina principală după login
    } catch {
      alert("Login eșuat");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1>Autentificare</h1>

        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Introdu username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Parolă</label>
          <input
            type="password"
            placeholder="Introdu parola"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="button auth-btn">
            Login
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Nu ai cont?{" "}
          <Link to="/signup" style={{ fontWeight: "bold", color: "#8b5e3c" }}>
            Creează cont
          </Link>
        </p>

      </div>
    </div>
  );
}
