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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:5000/users/${id}`);
        setUsername(res.data.username);
        setEmail(res.data.email || "");
        setPhone(res.data.phone || "");
        setAddress(res.data.address || "");
      } catch (err) {
        console.error("Eroare la încărcarea utilizatorului:", err);
        alert("Nu s-a putut încărca utilizatorul. Verifică serverul.");
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:5000/users/${id}`, {
        username,
        email,
        phone,
        address,
      });
      alert("Modificările au fost salvate!");
      navigate("/users");
    } catch (err) {
      console.error("Eroare la salvarea modificărilor:", err);
      alert("Nu s-au putut salva modificările. Verifică serverul.");
    }
  };

  return (
    <div>
      <h2>Editează Utilizator</h2>
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
        <button type="submit" className="button">Salvează modificările</button>
      </form>
    </div>
  );
}
