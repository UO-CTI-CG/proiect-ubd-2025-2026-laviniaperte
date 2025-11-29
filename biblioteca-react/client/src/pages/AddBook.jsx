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

    await axios.post("http://localhost:5000/books", {
      title,
      author,
      year,
    });

    navigate("/books");
  };

  return (
    <div>
      <h1>Adaugă o carte nouă</h1>

      <form onSubmit={handleSubmit}>
        <label>Titlu:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Autor:</label>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />

        <label>An:</label>
        <input type="text" value={year} onChange={(e) => setYear(e.target.value)} required />

        <button type="submit" className="button">Adaugă carte</button>
      </form>
    </div>
  );
}
