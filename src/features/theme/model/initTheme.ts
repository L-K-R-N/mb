// model/initTheme.ts
import { readThemeFromStorage } from "./persistTheme";
import type { TThemeName } from "./types";

export const initializeTheme = (): TThemeName => {
   // Пытаемся прочитать из localStorage
   const savedTheme = readThemeFromStorage();
   
   if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
      return savedTheme as TThemeName;
   }
   
   // Если нет сохраненной темы, используем системную
   return "system";
};