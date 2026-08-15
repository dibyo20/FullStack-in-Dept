import React from "react";
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

      <button
        onClick={() => {
          dispatch(increament());
        }}
      >
        increament
      </button>
      <button
        onClick={() => {
          dispatch(decreament());
        }}
      >
        decreament
      </button>
      <button
        onClick={() => {
          dispatch(reset());
        }}
      >
        reset
      </button>
      <button
        onClick={() => {
          dispatch(increamentBy5());
        }}
      >
        increament by 5
      </button>
      <button
        onClick={() => {
          dispatch(decreamentBy5());
        }}
      >
        decreament by 5
      </button>
    </>
  );
};

export default App;
