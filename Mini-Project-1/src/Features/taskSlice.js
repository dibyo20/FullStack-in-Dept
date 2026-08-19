import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    task: []
}

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.task.push(action.payload);
        },
        deleteTask: (state, action) => {
            state.task = state.task.filter((task) => task.id !== action.payload);
        },
        toggleTask: (state, action) => {
            const task = state.task.find((task) => task.id === action.payload);

            if (task) {
                task.completed = !task.completed;
            }
        }
    }
});

export const { addTask, deleteTask, toggleTask } = taskSlice.actions;

export default taskSlice.reducer;