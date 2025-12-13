import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { initializeTheme } from "./initTheme";
import { saveThemeToStorage } from "./persistTheme";
import type { IThemeState, TThemeName } from "./types";

const initialState: IThemeState = { current: initializeTheme() };

const slice = createSlice({
   name: "theme",
   initialState,
   reducers: {
      setTheme: (s, action: PayloadAction<TThemeName>) => {
         s.current = action.payload;
         saveThemeToStorage(action.payload);
      },
   },
});

export const { setTheme } = slice.actions;
export default slice.reducer;
