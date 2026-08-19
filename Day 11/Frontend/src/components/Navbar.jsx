import React from "react";

const Navbar = (props) => {
  return (
    <div className="navbar" style={{ backgroundColor: props.bgColor }}>
      <h1>Title</h1>
      <div className="navItems">
        {props.links.map(function (elem, idx) {
          return <a key={idx}>{elem}</a>;
        })}
      </div>
    </div>
  );
};

export default Navbar;
