import React from "react";
import { useState } from "react";

const Form = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Please enter task");
      return;
    }

    const newTask = {
      title: title,
      description: description,
      completed: false,
    };

    addTask(newTask);
    setTitle("");
    setDescription("");
  };
  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Enter Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        type="text"
        placeholder="Enter Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default Form;
