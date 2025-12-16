import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/library.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchUsers(token);
    }
  }, [navigate]);

  const fetchUsers = async (token) => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setErrorMsg("Nu s-au putut încărca utilizatorii. Verifică serverul.");
    }
  };

  const deleteUser = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:5000/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
      setErrorMsg("Nu s-a putut șterge utilizatorul. Verifică serverul.");
    }
  };

  return (
    <div className="page-container dark-bg">
      <div className="card light-bg">
        {/* HEADER */}
        <div className="page-header">
          <h1>Utilizatori</h1>
          <button
            className="btn-primary"
            onClick={() => navigate("/add-user")}
          >
            Adaugă utilizator
          </button>
        </div>

        {errorMsg && <div className="error-box">{errorMsg}</div>}

        {/* TABEL */}
        <div className="table-wrapper">
          <table className="styled-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Telefon</th>
                <th>Adresă</th>
                <th>Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr key={u.id}>
                  <td>{index + 1}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>{u.address}</td>
                  <td className="actions-cell">
                    <button
                      className="btn-edit"
                      onClick={() => navigate(`/edit-user/${u.id}`)}
                    >
                      Editează
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => deleteUser(u.id)}
                    >
                      Șterge
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
