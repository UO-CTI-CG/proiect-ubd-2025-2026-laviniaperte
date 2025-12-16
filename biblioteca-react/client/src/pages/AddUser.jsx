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
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://127.0.0.1:5000/users",
        { username, email, phone, address },
        { headers: { "x-access-token": token } }
      );

      if (res.status === 201) {
        navigate("/users");
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        alert("Nu ești autentificat. Te rog să te loghezi.");
        navigate("/login");
      } else if (err.response?.data?.error) {
        setErrorMsg(err.response.data.error);
      } else {
        setErrorMsg("Nu s-a putut adăuga utilizatorul.");
      }
    }
  };

  return (
    <div className="page-container">
      <div className="card">

        <h1>Adaugă utilizator</h1>

        {errorMsg && <div className="error-box">{errorMsg}</div>}

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

          <button type="submit" className="button">
            Adaugă Utilizator
          </button>
        </form>

      </div>
    </div>
  );
}
