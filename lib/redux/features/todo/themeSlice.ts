import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export const bgOptions = ["bg-1","bg-2","bg-3"];

export interface IThemeState {
  background: typeof bgOptions[number];
}
// let local=false;
// if (typeof window !== 'undefined' && window.localStorage) {local=true}
const savedBackground = bgOptions[0]; // local ?  localStorage.getItem("themeBackground") : bgOptions[0];
const initialState: IThemeState = {
  background:  savedBackground || bgOptions[0], // Initial background class
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeBackground: (state, action: PayloadAction<string>) => {
      state.background = action.payload;
      // local && localStorage.setItem("themeBackground", action.payload)
    },
  },
});

export const { changeBackground } = themeSlice.actions;
export default themeSlice.reducer;