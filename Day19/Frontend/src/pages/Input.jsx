import React, { useState } from "react";

const Input = (props) => {
  const [value, setValue] = useState("");

  const changeValue = (e) => {
    e.preventDefault();
    props.setValue(value);
    setValue("");
  };

  return (
    <>
      <form onSubmit={changeValue}>
        <input
          type="text"
          placeholder="Enter Text"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Input;
