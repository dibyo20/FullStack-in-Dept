import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero-content">
      <img src="" alt="img" />
      <h1>
        Hi, I'm Dibyo Banerjee <br />
        Full Stack Software Developer
      </h1>
      <p>Transforming ideas into real-world web products</p>

      <div className="hero-actions">
        <a href="/" className="hero-btn">
          Explore Work
        </a>
        <a href="/" className="hero-btn">
          Contact Me
        </a>
        <div className="hero-icons">
          <a href="/" className="hero-icon">
            <i className="fab fa-linkedin-in"></i>
          </a>

          <a href="/" className="hero-icon">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
