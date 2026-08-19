import React from "react";
import { NavLink } from "react-router-dom";
import "../style/Navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__logo">App</div>

        <div className="navbar__links">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
          <NavLink to="/product" className="nav-link">
            Product
          </NavLink>
          <NavLink to="/courses" className="nav-link">
            Courses
          </NavLink>
        </div>

        <NavLink to="/login" className="navbar__btn">
          Login
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
