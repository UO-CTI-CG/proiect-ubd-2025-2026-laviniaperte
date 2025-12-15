import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Loans() {
  const [loans, setLoans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://127.0.0.1:5000/loans", { headers: { "x-access-token": token } })
      .then(res => setLoans(res.data))
      .catch(err => {
        console.error(err);
        if (err.response && err.response.status === 401) navigate("/login");
      });
  }, [navigate]);

  const deleteLoan = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://127.0.0.1:5000/loans/${id}`, { headers: { "x-access-token": token } });
      setLoans(loans.filter(l => l.id !== id));
    } catch (err) {
      console.error(err);
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
                <Link to={`/edit-loan/${l.id}`}><button className="button">Edit</button></Link>
                <button className="delete-btn" onClick={() => deleteLoan(l.id)}>Șterge</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
