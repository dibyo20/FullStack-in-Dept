import React from "react";
import Navbar from "./components/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import Product from "./components/pages/Product.jsx";
import About from "./components/pages/About.jsx";
import Men from "./components/pages/Men.jsx";
import Women from "./components/pages/Women.jsx";
import Course from "./components/pages/Course.jsx";
import AnyCourse from "./components/pages/AnyCourse.jsx";
import CourseDetails from "./components/pages/CourseDetails.jsx";
import NotFound from "./components/pages/NotFound.jsx";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Basic Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />

        {/* Nested Routes */}
        <Route path="/product/men" element={<Men />} />
        <Route path="/product/women" element={<Women />} />

        {/* Dynamic Routes */}
        <Route path="/courses" element={<Course />} />
        <Route path="/courses/:courseId" element={<AnyCourse />} />
        <Route path="/courses/:courseId/details" element={<CourseDetails />} />

        {/* Not Found Route */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
