import { useState } from "react";
import Form from "./components/Form.jsx";
import Card from "./components/Card.jsx";
import Filter from "./components/Filter.jsx";

const App = () => {
  const [taskList, setTaskList] = useState([]);
  const [filter, setFilter] = useState("all");

  const addTask = (newTask) => {
    setTaskList((prevTask) => [...prevTask, { ...newTask, id: Date.now() }]);
  };

  const toggleTask = (id) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id) => {
    const newTask = taskList.filter((elem) => elem.id !== id);
    console.log(newTask);
    setTaskList(newTask);
  };

  const filterTask = taskList.filter((task) => {
    if (filter == "completed") {
      return task.completed;
    }

    if (filter == "pending") {
      return !task.completed;
    }

    return task;
  });

  return (
    <div>
      <h1>Add your Tasks</h1>
      <Form addTask={addTask} />
      <Filter filter={filter} setFilter={setFilter} />
      {filterTask.map((task) => (
        <Card
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
        />
      ))}
    </div>
  );
};

export default App;
