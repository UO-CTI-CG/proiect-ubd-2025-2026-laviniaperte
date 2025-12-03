import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import BooksList from "./pages/BooksList";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";

import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";


import Loans from "./pages/Loans";
import AddLoan from "./pages/AddLoan";

import "./styles/library.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* CĂRȚI */}
        <Route path="/" element={<BooksList />} />
        <Route path="/books" element={<BooksList />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit-book/:id" element={<EditBook />} />

        {/* UTILIZATORI */}
        <Route path="/users" element={<Users />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />


        {/* ÎMPRUMUTURI */}
        <Route path="/loans" element={<Loans />} />
        <Route path="/add-loan" element={<AddLoan />} />

        {/* fallback */}
        <Route path="*" element={<BooksList />} />
      </Routes>
    </BrowserRouter>
  );
}
