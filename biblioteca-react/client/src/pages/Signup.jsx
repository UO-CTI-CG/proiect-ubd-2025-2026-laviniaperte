import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:5000/signup", { username, password });
      alert("Cont creat. Te poți loga.");
      navigate("/login");
    } catch {
      alert("Eroare la signup");
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Signup</h2>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Parolă" onChange={e => setPassword(e.target.value)} />
      <button>Signup</button>
    </form>
  );
}
