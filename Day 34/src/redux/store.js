import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice.js";
import themeReducer from "./slices/themeSlice.js";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        theme: themeReducer
    }
});