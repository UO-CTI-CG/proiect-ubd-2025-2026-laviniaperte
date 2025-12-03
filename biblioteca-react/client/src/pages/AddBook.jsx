import { useState } from "react";
import axios from "axios";
import "../styles/library.css";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:5000/books", { title, author, year });
      navigate("/books");
    } catch (error) {
      console.error("Eroare la adăugarea cărții:", error);
      alert("Nu s-a putut adăuga cartea. Verifică dacă serverul este pornit.");
    }
  };

  return (
    <div>
      <h1>Adaugă o carte nouă</h1>
      <form onSubmit={handleSubmit}>
        <label>Titlu:</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        <label>Autor:</label>
        <input type="text" value={author} onChange={e => setAuthor(e.target.value)} required />
        <label>An:</label>
        <input type="text" value={year} onChange={e => setYear(e.target.value)} required />
        <button type="submit" className="button">Adaugă carte</button>
      </form>
    </div>
  );
}
