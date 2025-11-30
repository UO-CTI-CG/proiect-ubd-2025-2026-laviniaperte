import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/library.css";
import { useNavigate } from "react-router-dom";

export default function BooksList() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  // Preia cărțile de la backend
  useEffect(() => {
    axios.get("http://localhost:5000/books")
      .then((res) => {
        console.log("Cărți primite:", res.data); // verificare în consolă
        setBooks(res.data);
      })
      .catch((err) => {
        console.error("Eroare la preluarea cărților:", err);
      });
  }, []);

  // Șterge o carte
  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (err) {
      console.error("Eroare la ștergerea cărții:", err);
    }
  };

  return (
    <div>
      <h1>Lista cărților</h1>

      <div style={{ textAlign: "center", marginBottom: 25 }}>
        <button className="button" onClick={() => navigate("/add-book")}>
          Adaugă o carte nouă
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th> {/* coloana cu numărul rândului */}
            <th>Titlu</th>
            <th>Autor</th>
            <th>An</th>
            <th>Acțiuni</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td> {/* afișează 1, 2, 3… */}
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.year}</td>
              <td>
                <button
                  className="button"
                  onClick={() => navigate(`/edit-book/${book.id}`)}
                >
                  Editare
                </button>
                <button
                  className="button"
                  style={{ backgroundColor: "#d670ff" }}
                  onClick={() => deleteBook(book.id)}
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
