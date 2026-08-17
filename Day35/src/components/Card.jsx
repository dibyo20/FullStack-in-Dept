import React from "react";

const Card = ({ task, deleteTask }) => {
  return (
    <div className="card">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <button onClick={()=>deleteTask(task.id)}>delete</button>
    </div>
  );
};

export default Card;
