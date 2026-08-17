import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name: "theme",
    initialState: {
        value: "light"
    },
    reducers: {
        changeThemeToDark: (state) => {
            state.value = "dark";
        },
        changeThemeToLight: (state) => {
            state.value = "light";
        },
        changeThemeToRed: (state) => {
            state.value = "red";
        }
    }
});

export const { changeThemeToDark, changeThemeToLight, changeThemeToRed } = themeSlice.actions;

export default themeSlice.reducer;