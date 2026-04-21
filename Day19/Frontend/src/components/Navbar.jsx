import React, { useState } from "react";

const Navbar = (props) => {
  const [newTheme, setNewTheme] = useState("");

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.changeTheme(newTheme);
          setNewTheme("");
        }}
      >
        <input
          type="text"
          placeholder="Enter Theme"
          onChange={(e) => {
            setNewTheme(e.target.value);
          }}
        />
        <button>Change</button>
      </form>
    </>
  );
};

export default Navbar;
