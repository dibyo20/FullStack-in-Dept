import React from "react";
import "../styles/Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Logo + About */}
        <div className="footer__section">
          <h2 className="footer__logo">⚡ ChatpataUI</h2>
          <p className="footer__text">
            Build modern UI components with clean design and smooth user
            experience.
          </p>
        </div>

        {/* Links */}
        <div className="footer__section">
          <h3 className="footer__heading">Quick Links</h3>
          <ul className="footer__links">
            <li>Home</li>
            <li>About</li>
            <li>Courses</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Social */}
        <div className="footer__section">
          <h3 className="footer__heading">Connect</h3>
          <div className="footer__socials">
            <div>🌐</div>
            <div>🐦</div>
            <div>💼</div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer__bottom">
        © {new Date().getFullYear()} ChatpataUI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
