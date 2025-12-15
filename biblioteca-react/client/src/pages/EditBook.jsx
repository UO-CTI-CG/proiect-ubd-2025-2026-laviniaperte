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
        const token = localStorage.getItem("token"); // preluare token
        const res = await axios.get(`http://127.0.0.1:5000/books/${id}`, {
          headers: { "x-access-token": token }
        });
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setYear(res.data.year);
      } catch (err) {
        console.error("Eroare la preluarea cărții:", err);
        if (err.response && err.response.status === 401) {
          alert("Nu ești autentificat. Te rog să te loghezi.");
          navigate("/login");
        } else {
          alert("Nu s-a putut încărca cartea. Verifică serverul.");
        }
      }
    };
    fetchBook();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://127.0.0.1:5000/books/${id}`,
        { title, author, year },
        { headers: { "x-access-token": token } }
      );
      navigate("/books");
    } catch (err) {
      console.error("Eroare la salvarea modificărilor:", err);
      if (err.response && err.response.status === 401) {
        alert("Nu ești autentificat. Te rog să te loghezi.");
        navigate("/login");
      } else {
        alert("Nu s-au putut salva modificările. Verifică serverul.");
      }
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
