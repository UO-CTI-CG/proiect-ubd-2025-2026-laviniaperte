import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BooksList from "./pages/BooksList";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import "./styles/library.css"; // dacă nu e deja în index.js

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/books" element={<BooksList />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit-book/:id" element={<EditBook />} />
        <Route path="*" element={<BooksList />} /> {/* fallback */}
      </Routes>
    </BrowserRouter>
  );
}
