import React from "react";
import "../styles/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          FooterUI
          <p>Spice up your learning journey 🌶️</p>
        </div>
        <div className="footer-right">
          <Link to="/course">
            <button className="explore-btn">Explore Courses</button>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
