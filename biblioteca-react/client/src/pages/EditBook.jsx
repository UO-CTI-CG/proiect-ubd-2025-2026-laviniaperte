import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/library.css";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:5000/books/${id}`);
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setYear(res.data.year);
      } catch (err) {
        console.error("Eroare la preluarea cărții:", err);
        alert("Nu s-a putut încărca cartea. Verifică serverul.");
      }
    };
    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:5000/books/${id}`, {
        title,
        author,
        year,
      });
      navigate("/books");
    } catch (err) {
      console.error("Eroare la salvarea modificărilor:", err);
      alert("Nu s-au putut salva modificările. Verifică serverul.");
    }
  };

  return (
    <div>
      <h1>Editează cartea</h1>

      <form onSubmit={handleSubmit}>
        <label>Titlu:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Autor:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <label>An:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />

        <button type="submit" className="button">
          Salvează modificările
        </button>
      </form>
    </div>
  );
}
