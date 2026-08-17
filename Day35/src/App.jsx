import { useState } from "react";
import Form from "./components/Form.jsx";
import Card from "./components/Card.jsx";

const App = () => {
  const [taskList, setTaskList] = useState([]);
  const addTask = (newTask) => {
    setTaskList((prevTaskList) => [
      ...prevTaskList,
      { ...newTask, id: Date.now() },
    ]);
  };

  const deleteTask = (id) => {
    const newTask = taskList.filter((elem) => elem.id !== id);
    console.log(newTask);
    setTaskList(newTask);
  };

  return (
    <div>
      <h1>Add your Tasks</h1>
      <Form addTask={addTask} />
      {taskList.map((elem) => (
        <Card key={elem.id} task={elem} deleteTask={deleteTask} />
      ))}
    </div>
  );
};

export default App;
