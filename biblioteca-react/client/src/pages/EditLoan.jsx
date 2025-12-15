import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditLoan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loan, setLoan] = useState({ user_id: "", book_id: "", loan_date: "", return_date: "" });
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Preluare utilizatori
    axios.get("http://127.0.0.1:5000/users", { headers: { "x-access-token": token } })
      .then(res => setUsers(res.data))
      .catch(err => {
        console.error(err);
        alert("Nu s-au putut încărca utilizatorii.");
      });

    // Preluare cărți
    axios.get("http://127.0.0.1:5000/books", { headers: { "x-access-token": token } })
      .then(res => setBooks(res.data))
      .catch(err => {
        console.error(err);
        alert("Nu s-au putut încărca cărțile.");
      });

    // Preluare împrumut după id
    axios.get(`http://127.0.0.1:5000/loans/${id}`, { headers: { "x-access-token": token } })
      .then(res => {
        setLoan(res.data);
      })
      .catch(err => {
        console.error(err);
        alert("Nu s-a putut încărca împrumutul.");
        navigate("/loans");
      });
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(`http://127.0.0.1:5000/loans/${id}`, loan, { headers: { "x-access-token": token } });
      navigate("/loans");
    } catch (err) {
      console.error(err);
      alert("Nu s-a putut salva modificările. Verifică serverul.");
    }
  };

  return (
    <div>
      <h1>Editează Împrumut</h1>
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
        <input
          type="date"
          value={loan.loan_date || ""}
          onChange={e => setLoan({ ...loan, loan_date: e.target.value })}
          required
        />

        <label>Data returnării:</label>
        <input
          type="date"
          value={loan.return_date || ""}
          onChange={e => setLoan({ ...loan, return_date: e.target.value })}
        />

        <button className="button" type="submit">Salvează</button>
      </form>
    </div>
  );
}
