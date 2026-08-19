import { useDispatch, useSelector } from "react-redux";
import {
  increament,
  decreament,
  reset,
  increamentBy5,
  decreamentBy5,
} from "./redux/slices/counterSlice";
import Navbar from "./components/Navbar.jsx";

const App = () => {
  const dispatch = useDispatch();
  const num = useSelector((state) => state.counter.value);

  return (
    <>
      <Navbar />
      <h1>{num}</h1>
      <button onClick={() => dispatch(increament())}>Increment</button>
      <button onClick={() => dispatch(decreament())}>Decrement</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
      <button onClick={() => dispatch(increamentBy5())}>Increment by 5</button>
      <button onClick={() => dispatch(decreamentBy5())}>Decrement by 5</button>
    </>
  );
};

export default App;
