import { readThemeFromStorage } from "./persistTheme";
import type { TThemeName } from "./types";

export const initializeTheme = (): TThemeName => {
   const savedTheme = readThemeFromStorage();
   
   if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
      return savedTheme as TThemeName;
   }
   
   return "system";
};