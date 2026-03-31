import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      <div className="navbar">
        <div className="nav-left">
          <h3>DB</h3>
        </div>

        <div className="divider" />

        <div className="nav-center">
          <a href="/">About</a>
          <a href="/">Projects</a>
          <a href="/">Contact</a>

          <button className="resume-btn">Resume</button>
        </div>

        <div className="divider" />

        <div className="nav-right">
          <span className="theme-icon">🌙</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
