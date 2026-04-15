import React from "react";
import "../../styles/HeroSection.scss";

const HeroSection = ({movie}) => {
  return (
    <div
      className="hero"
      style={{
        backgroundImage: `url("https://plus.unsplash.com/premium_photo-1686314012109-90e64a1fbba4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGRhcmslMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D")`,
      }}
    ></div>
  );
};

export default HeroSection;
