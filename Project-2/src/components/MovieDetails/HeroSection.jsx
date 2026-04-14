import React from "react";
import "../../styles/HeroSection.scss";

const HeroSection = () => {
  return (
    <div
      className="hero"
      style={{
        backgroundImage: `url("https://plus.unsplash.com/premium_photo-1701027112340-ab8623ebb5d4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW91bmF0aW5zJTIwbGFuZHNjYXBlJTIwbGFyZ2UlMjBzY2FsZSUyMGRhcmt8ZW58MHx8MHx8fDA%3D")`,
      }}
    ></div>
  );
};

export default HeroSection;
