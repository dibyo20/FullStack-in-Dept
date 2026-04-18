import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <div className="logo">NavbarUI</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/course">Courses</Link>
      </div>

      <button className="nav-btn">Login</button>
    </nav>
  );
};

export default Navbar;
