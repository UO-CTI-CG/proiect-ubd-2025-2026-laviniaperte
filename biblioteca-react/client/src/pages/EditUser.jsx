// src/pages/EditUser.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); // mesajul de eroare

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://127.0.0.1:5000/users/${id}`, {
          headers: { "Authorization": `Bearer ${token}` },
        });
        setUsername(res.data.username);
        setEmail(res.data.email || "");
        setPhone(res.data.phone || "");
        setAddress(res.data.address || "");
      } catch (err) {
        console.error("Eroare la încărcarea utilizatorului:", err);
        if (err.response && err.response.status === 401) {
          setErrorMsg("Nu ești autentificat. Te rog să te loghezi.");
        } else {
          setErrorMsg("Nu s-a putut încărca utilizatorul. Verifică serverul.");
        }
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(""); // reset mesaj anterior
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://127.0.0.1:5000/users/${id}`,
        { username, email, phone, address },
        { headers: { "Authorization": `Bearer ${token}` } }
      );
      navigate("/users");
    } catch (err) {
      console.error("Eroare la salvarea modificărilor:", err);
      if (err.response && err.response.data && err.response.data.error) {
        setErrorMsg(err.response.data.error); // mesaj de la backend
      } else {
        setErrorMsg("Nu s-au putut salva modificările. Verifică serverul.");
      }
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h1>Editează utilizator</h1>

        {/* Mesajul de eroare, afișat sub titlu */}
        {errorMsg && <div className="error-box" style={{ marginBottom: "15px" }}>{errorMsg}</div>}

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
            required
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
            Salvează modificările
          </button>
        </form>
      </div>
    </div>
  );
}
