import React, { useContext } from "react";
import "../styles/Navbar.scss";
import { UserDataContext } from "../context/UserContext";

const Navbar = () => {
  const data = useContext(UserDataContext);
  return (
    <nav className="navbar">
      <div className="navbar__container">
        {/* Logo */}
        <div className="navbar__logo">⚡ ChatpataUI , Welcome back! {data}</div>

        {/* Links */}
        <ul className="navbar__links">
          <li>Home</li>
          <li>About</li>
          <li>Courses</li>
          <li>Contact</li>
        </ul>

        {/* Button */}
        <button className="navbar__btn">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
