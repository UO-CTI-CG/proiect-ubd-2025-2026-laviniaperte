import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditLoan() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [loan, setLoan] = useState({ user_id: "", book_id: "", date: "" });

  useEffect(() => {
    // Preluăm utilizatorii și cărțile pentru dropdown
    axios.get("http://127.0.0.1:5000/users")
      .then(res => setUsers(res.data))
      .catch(err => alert("Nu s-au putut încărca utilizatorii."));

    axios.get("http://127.0.0.1:5000/books")
      .then(res => setBooks(res.data))
      .catch(err => alert("Nu s-au putut încărca cărțile."));

    // Preluăm datele împrumutului existent
    axios.get(`http://127.0.0.1:5000/loans/${id}`)
      .then(res => setLoan({
        user_id: res.data.user_id,
        book_id: res.data.book_id,
        date: res.data.date
      }))
      .catch(err => alert("Nu s-a putut încărca împrumutul."));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:5000/loans/${id}`, loan);
      navigate("/loans");
    } catch (err) {
      console.error("Eroare la salvarea modificărilor:", err);
      alert("Nu s-au putut salva modificările. Verifică serverul.");
    }
  };

  return (
    <div>
      <h1>Modifică Împrumut</h1>
      <form onSubmit={handleSubmit}>
        <label>Utilizator:</label>
        <select 
          value={loan.user_id} 
          onChange={e => setLoan({ ...loan, user_id: e.target.value })} 
          required
        >
          <option value="">Selectează utilizator</option>
          {users.map(u => <option key={u.id} value={u.id}>{u.username}</option>)}
        </select>

        <label>Carte:</label>
        <select 
          value={loan.book_id} 
          onChange={e => setLoan({ ...loan, book_id: e.target.value })} 
          required
        >
          <option value="">Selectează carte</option>
          {books.map(b => <option key={b.id} value={b.id}>{b.title}</option>)}
        </select>

        <label>Data:</label>
        <input 
          type="date" 
          value={loan.date} 
          onChange={e => setLoan({ ...loan, date: e.target.value })} 
          required 
        />

        <button className="button" type="submit">Salvează modificările</button>
      </form>
    </div>
  );
}
