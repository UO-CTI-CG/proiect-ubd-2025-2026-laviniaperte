import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Loans() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/loans")
      .then(res => setLoans(res.data))
      .catch(err => alert("Nu s-au putut încărca împrumuturile."));
  }, []);

  const deleteLoan = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/loans/${id}`);
      setLoans(loans.filter(l => l.id !== id));
    } catch (err) {
      console.error("Eroare la ștergerea împrumutului:", err);
      alert("Nu s-a putut șterge împrumutul.");
    }
  };

  return (
    <div>
      <h1>Împrumuturi</h1>
      <Link to="/add-loan"><button className="button">Adaugă Împrumut</button></Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Utilizator</th>
            <th>Carte</th>
            <th>Data împrumut</th>
            <th>Data returnării</th>
            <th>Acțiuni</th>
          </tr>
        </thead>
        <tbody>
          {loans.map(l => (
            <tr key={l.id}>
              <td>{l.id}</td>
              <td>{l.user}</td>
              <td>{l.book}</td>
              <td>{l.loan_date}</td>
              <td>{l.return_date || "-"}</td>
              <td>
                <button className="delete-btn" onClick={() => deleteLoan(l.id)}>Șterge</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
