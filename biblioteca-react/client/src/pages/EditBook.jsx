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
    axios.get(`http://localhost:5000/books/${id}`).then((res) => {
      setTitle(res.data.title);
      setAuthor(res.data.author);
      setYear(res.data.year);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.put(`http://localhost:5000/books/${id}`, {
      title,
      author,
      year,
    });

    navigate("/books");
  };

  return (
    <div>
      <h1>Editează cartea</h1>

      <form onSubmit={handleSubmit}>
        <label>Titlu:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Autor:</label>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />

        <label>An:</label>
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required />

        <button type="submit" className="button">Salvează modificările</button>
      </form>
    </div>
  );
}
