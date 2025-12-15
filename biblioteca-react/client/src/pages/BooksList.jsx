import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/library.css";
import { useNavigate } from "react-router-dom";

export default function BooksList() {
  const [books, setBooks] = useState([]);
  const [loans, setLoans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooksAndLoans = async () => {
      try {
        const token = localStorage.getItem("token"); // preluare token

        // Preluare cărți
        const resBooks = await axios.get("http://127.0.0.1:5000/books", {
          headers: { "x-access-token": token }
        });
        setBooks(resBooks.data);

        // Preluare împrumuturi
        const resLoans = await axios.get("http://127.0.0.1:5000/loans", {
          headers: { "x-access-token": token }
        });
        setLoans(resLoans.data);

      } catch (err) {
        console.error("Eroare la preluarea cărților sau împrumuturilor:", err);
        if (err.response && err.response.status === 401) {
          alert("Nu ești autentificat. Te rog să te loghezi.");
          navigate("/login");
        } else {
          alert("Nu s-au putut încărca cărțile. Verifică serverul.");
        }
      }
    };
    fetchBooksAndLoans();
  }, [navigate]);

  const deleteBook = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://127.0.0.1:5000/books/${id}`, {
        headers: { "x-access-token": token }
      });
      setBooks(books.filter((book) => book.id !== id));
    } catch (err) {
      console.error("Eroare la ștergerea cărții:", err);
      if (err.response && err.response.status === 401) {
        alert("Nu ești autentificat. Te rog să te loghezi.");
        navigate("/login");
      } else {
        alert("Nu s-a putut șterge cartea. Verifică serverul.");
      }
    }
  };

  // Helper pentru a determina statusul unei cărți
  const getBookStatus = (bookId) => {
    const loan = loans.find(
      (l) => l.book_id === bookId && (!l.return_date || new Date(l.return_date) > new Date())
    );
    return loan ? "Împrumutată" : "Disponibilă";
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
            <th>ID</th>
            <th>Titlu</th>
            <th>Autor</th>
            <th>An</th>
            <th>Status</th> {/* coloana nouă */}
            <th>Acțiuni</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.year}</td>
              <td>{getBookStatus(book.id)}</td> {/* afișare status */}
              <td>
                <button
                  className="button"
                  onClick={() => navigate(`/edit-book/${book.id}`)}
                >
                  Editare
                </button>
                <button
                  className="button"
                  style={{ backgroundColor: "#433939ff" }}
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
