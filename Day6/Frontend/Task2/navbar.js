import Div1 from "./Div1.js";
import Div2 from "./Div2.js";
import Div3 from "./Div3.js";

const Navbar = () => {
    return React.createElement("div", { id: "Nav" }, [Div1(), Div2(), Div3()]);
}

export default Navbar;