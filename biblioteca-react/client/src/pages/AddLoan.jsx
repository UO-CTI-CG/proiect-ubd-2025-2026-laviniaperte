import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddLoan() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [loan, setLoan] = useState({ user_id: "", book_id: "", loan_date: "", return_date: "" });

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/users")
      .then(res => setUsers(res.data))
      .catch(err => alert("Nu s-au putut încărca utilizatorii."));

    axios.get("http://127.0.0.1:5000/books")
      .then(res => setBooks(res.data))
      .catch(err => alert("Nu s-au putut încărca cărțile."));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:5000/loans", loan);
      navigate("/loans");
    } catch (error) {
      console.error("Eroare la adăugarea împrumutului:", error);
      alert("Nu s-a putut salva împrumutul. Verifică serverul.");
    }
  };

  return (
    <div>
      <h1>Adaugă Împrumut</h1>
      <form onSubmit={handleSubmit}>
        <label>Utilizator:</label>
        <select value={loan.user_id} onChange={e => setLoan({ ...loan, user_id: e.target.value })} required>
          <option value="">Selectează utilizator</option>
          {users.map(u => <option key={u.id} value={u.id}>{u.username}</option>)}
        </select>

        <label>Carte:</label>
        <select value={loan.book_id} onChange={e => setLoan({ ...loan, book_id: e.target.value })} required>
          <option value="">Selectează carte</option>
          {books.map(b => <option key={b.id} value={b.id}>{b.title}</option>)}
        </select>

        <label>Data împrumut:</label>
        <input type="date" value={loan.loan_date} onChange={e => setLoan({ ...loan, loan_date: e.target.value })} required />

        <label>Data returnării (opțional):</label>
        <input type="date" value={loan.return_date} onChange={e => setLoan({ ...loan, return_date: e.target.value })} />

        <button className="button" type="submit">Salvează</button>
      </form>
    </div>
  );
}
