// let h1 = React.createElement("h1", { id: "h1" }, "This is H1");

// root.render(h1); // At a time only one element can be rendered in the root. 

// function h2() {
//     return (React.createElement("h2", { id: "h1" }, "This is H2"));
// }

import App from "./app.js";
const root = ReactDOM.createRoot(document.querySelector(".root"));
root.render(App());