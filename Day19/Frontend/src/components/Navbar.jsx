import React, { useState } from "react";
import Input from "../pages/Input";

const Navbar = () => {
  const [text, setText] = useState("");

  return (
    <>
      <h1>{text} </h1>
      <Input setValue={setText} />
    </>
  );
};

export default Navbar;
