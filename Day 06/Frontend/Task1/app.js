import box from "./box.js";
import circle from "./circle.js";

const App = () => {
    return React.createElement("div", { className: "app" }, [box(), circle()]);
}   

export default App;