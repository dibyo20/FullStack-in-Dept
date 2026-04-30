import axios from "axios";

const App = () => {
  async function createNote() {
    try {
      const res = await axios.post("http://localhost:2023/api/notes/create", {
        title: "Notes",
        description: "This Note is from Frontend.",
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function getNotes() {
    try {
      const res = await axios.get("http://localhost:2023/api/notes/get");
      console.log(res.data.notes);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1>Notes</h1>
      <button onClick={createNote}>Create Note</button>
      <button onClick={getNotes}>Get Note</button>
    </>
  );
};

export default App;
