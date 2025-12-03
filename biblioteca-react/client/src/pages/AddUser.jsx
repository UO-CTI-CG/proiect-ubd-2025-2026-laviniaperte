import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/library.css";

export default function AddUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!username) {
      setErrorMsg("Username este obligatoriu.");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:5000/users", {
        username,
        email,
        phone,
        address
      });

      if (res.status === 201) {
        navigate("/users");
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.error) {
        setErrorMsg(err.response.data.error);
      } else {
        setErrorMsg("Nu s-a putut adăuga utilizatorul.");
      }
    }
  };

  return (
    <div>
      <h2>Adaugă Utilizator</h2>
      {errorMsg && <div style={{ color: "red", marginBottom: "10px" }}>{errorMsg}</div>}
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Telefon:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label>Adresă:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button type="submit" className="button">Adaugă Utilizator</button>
      </form>
    </div>
  );
}
