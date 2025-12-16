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
        const token = localStorage.getItem("token");

        const resBooks = await axios.get("http://127.0.0.1:5000/books", {
          headers: { "x-access-token": token }
        });
        setBooks(resBooks.data);

        const resLoans = await axios.get("http://127.0.0.1:5000/loans", {
          headers: { "x-access-token": token }
        });
        setLoans(resLoans.data);

      } catch (err) {
        console.error(err);
        alert("Nu s-au putut încărca datele.");
        navigate("/login");
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
      console.error(err);
      alert("Nu s-a putut șterge cartea.");
    }
  };

  const getBookStatus = (bookId) => {
    const loan = loans.find(
      (l) => l.book_id === bookId && (!l.return_date || new Date(l.return_date) > new Date())
    );
    return loan ? "Împrumutată" : "Disponibilă";
  };

  return (
    <div className="page-container">
      <div className="card">
        <div className="page-header">
          <h1>📚 Lista cărților</h1>
          <button className="btn-primary" onClick={() => navigate("/add-book")}>
            + Adaugă carte
          </button>
        </div>

        <div className="table-wrapper">
          <table className="styled-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Titlu</th>
                <th>Autor</th>
                <th>An</th>
                <th>Status</th>
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
                  <td>
                    <span
                      className={
                        getBookStatus(book.id) === "Disponibilă"
                          ? "status available"
                          : "status borrowed"
                      }
                    >
                      {getBookStatus(book.id)}
                    </span>
                  </td>
                  <td className="actions">
                    <button
                      className="btn-edit"
                      onClick={() => navigate(`/edit-book/${book.id}`)}
                    >
                      Editare
                    </button>
                    <button
                      className="btn-delete"
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

      </div>
    </div>
  );
}
