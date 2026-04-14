import React from "react";
import "../../styles/Navbar.scss";
import Left from "./Left.jsx";
import Right from "./Right.jsx";

const Navbar = () => {
  return (
    <div className="navbar">
      <Left />
      <Right />
    </div>
  );
};

export default Navbar;
