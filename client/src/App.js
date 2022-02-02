import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/core/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopMovies from "./components/movies/TopMovies";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import AllMovies from "./components/movies/AllMovies";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<TopMovies />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/all" element={<AllMovies />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
