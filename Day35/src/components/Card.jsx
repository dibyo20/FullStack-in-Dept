import React from "react";

const Card = ({ task, deleteTask, toggleTask }) => {
  return (
    <div className="taskCard">
      <div className="taskContent">
        <h2 className={task.completed ? "completed" : ""}>{task.title}</h2>
        <p className={task.completed ? "completed" : ""}>{task.description}</p>
        <label>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />
        </label>
      </div>

      <button onClick={() => deleteTask(task.id)}>delete</button>
    </div>
  );
};

export default Card;
