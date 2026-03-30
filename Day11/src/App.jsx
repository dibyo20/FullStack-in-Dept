import Card from "./components/Card.jsx";

const App = () => {
  let color = ["red", "green", "orange"];
  return (
    <div className="app">
      {color.map(function (elem) {
        return <Card color={elem} />;
      })}
    </div>
  );
};

export default App;
