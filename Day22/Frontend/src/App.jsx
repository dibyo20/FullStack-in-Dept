import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);

  async function createNote() {
    try {
      const res = await axios.post("http://localhost:2022/api/notes/create", {
        title: "New Note",
        content: "This note is from Frontend.",
      });
      console.log(res.data);
    } catch (error) {
      console.error("Error is:", error);
    }
  }

  async function getNotes() {
    try {
      const res = await axios.get("http://localhost:2022/api/notes/get");
      setNotes(res.data.notes);
      console.log(res.data.notes);
    } catch (error) {
      console.error("Error is:", error);
    }
  }

  return (
    <>
      <h1>Notes</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createNote();
        }}
      >
        <button type="submit">Create Note</button>
      </form>
      <button onClick={getNotes}>Get Data</button>
    </>
  );
};

export default App;
