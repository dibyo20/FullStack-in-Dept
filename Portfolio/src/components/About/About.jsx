import React from "react";
import "./About.css"

const About = () => {
  return (
    <div className="about">
      <h2>About Me</h2>
      <div className="about-content">
        <p>
          I am a Full Stack Developer currently pursuing my B.Tech in Computer
          Science. I enjoy building modern web applications and solving
          real-world problems through code.
          I have been working with the MERN stack and continuously improving my
          skills by building projects and exploring technologies like AI.
          I am passionate about learning, experimenting, and creating scalable,
          user-friendly applications.
        </p>
        <a href="/" className="know-more">Know more</a>
      </div>
    </div>
  );
};

export default About;
