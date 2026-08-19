import React, { useState } from "react";
import FormField from "./components/FormField";
import Card from "./components/Card";

const App = () => {
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [desc, setDesc] = useState("");
  const [role, setRole] = useState("");

  const localData = JSON.parse(localStorage.getItem("users")) || [];
  console.log(localData);

  const [users, setUsers] = useState(localData);

  const submitHandler = (e) => {
    e.preventDefault();
    const oldUsers = [...users, { name, imageURL, desc, role }];
    setUsers(oldUsers);
    localStorage.setItem("users", JSON.stringify(oldUsers));
    setName("");
    setImageURL("");
    setDesc("");
    setRole("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "imageURL") {
      setImageURL(value);
    } else if (name === "desc") {
      setDesc(value);
    } else if (name === "role") {
      setRole(value);
    }
  };

  const removeUser = (idx) => {
    const copyUsers = [...users];
    copyUsers.splice(idx, 1);
    setUsers(copyUsers);
    localStorage.setItem("users", JSON.stringify(copyUsers));
  };

  return (
    <div>
      <div className="container">
        <form
          className="form"
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h2>Generate Your Card</h2>
          <FormField
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Enter Name"
          />

          <FormField
            name="imageURL"
            value={imageURL}
            onChange={handleChange}
            placeholder="Enter Image URL"
          />

          <FormField
            name="desc"
            value={desc}
            onChange={handleChange}
            placeholder="Enter Description"
          />

          <FormField
            name="role"
            value={role}
            onChange={handleChange}
            placeholder="Enter Role"
          />
          <button type="submit">Create Card</button>
        </form>
      </div>

      <div className="card-container">
        {users.map(function ({ name, imageURL, desc, role }, idx) {
          return (
            <Card
              key={idx}
              name={name}
              imageURL={imageURL}
              desc={desc}
              role={role}
              onRemove={() => removeUser(idx)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
