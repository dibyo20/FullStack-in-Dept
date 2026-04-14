import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetails from "./components/MovieDetails/MovieDetails.jsx";
import HomePage from "./Pages/HomePage.jsx";

const app = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default app;
