import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setErrorMsg("Nu s-au putut încărca utilizatorii. Verifică serverul.");
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
      setErrorMsg("Nu s-a putut șterge utilizatorul. Verifică serverul.");
    }
  };

  return (
    <div>
      <h1>Utilizatori</h1>
      {errorMsg && <div style={{ color: "red", marginBottom: "10px" }}>{errorMsg}</div>}

      <Link to="/add-user">
        <button className="button">Adaugă Utilizator</button>
      </Link>

      <table>
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
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>{u.address}</td>
              <td>
                <Link to={`/edit-user/${u.id}`}>
                  <button className="button">Editează</button>
                </Link>
                <button
                  className="button delete-btn"
                  onClick={() => deleteUser(u.id)}
                  style={{ marginLeft: "5px", backgroundColor: "#4c2323ff", color: "#fff" }}
                >
                  Șterge
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
