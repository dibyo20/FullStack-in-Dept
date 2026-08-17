import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value: 0
    },
    reducers: {
        increament: (state) => {
            state.value += 1;
        },
        decreament: (state) => {
            state.value -= 1;
        },
        reset: (state) => {
            state.value = 0;
        },
        increamentBy5: (state) => {
            state.value += 5;
        },
        decreamentBy5: (state) => {
            state.value -= 5;
        }
    }
});

export const { increament, decreament, reset, increamentBy5, decreamentBy5 } = counterSlice.actions;

export default counterSlice.reducer;