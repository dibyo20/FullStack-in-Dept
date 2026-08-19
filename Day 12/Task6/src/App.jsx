import React, { useState } from "react";

const App = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  function addTodos() {
    if (task.trim() === "") return;
    const newTodos = {
      id: Date.now() + Math.random(),
      text: task,
    };
    setTodos([...todos, newTodos]);
    setTask("");
  }

  function delTodo(id) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  return (
    <>
      <div>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTodos();
          }}
        />
        <button onClick={addTodos}>Add Task</button>
      </div>
      <div className="listTodo">
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.text}{" "}
              <button className="del" onClick={() => delTodo(todo.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
