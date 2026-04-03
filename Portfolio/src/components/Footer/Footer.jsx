import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <h2 className="footer-title">Let's Work Together</h2>

      <p className="footer-subtext">
        Feel free to reach out for collaboration or just a friendly hello!
      </p>

      <div className="footer-buttons">
        <button className="btn contact-btn">Contact</button>
        <a href="">
          <button className="btn resume-btn">Resume</button>
        </a>
      </div>

      <div className="footer-line"></div>

      <div className="footer-links">
        <a href="www.linkedin.com/in/dibyo-banerjee-6a2428270">LinkedIn</a>
        <a href="https://github.com/dibyo20">GitHub</a>
        <a href="/">Instagram</a>
      </div>
    </footer>
  );
};

export default Footer;
