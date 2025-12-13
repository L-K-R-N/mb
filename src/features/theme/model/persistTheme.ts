const THEME_KEY = "app:theme";

export const saveThemeToStorage = (theme: string) => {
   try {
      localStorage.setItem(THEME_KEY, theme);
   } catch (e) {
      console.log(e);
   }
};

export const readThemeFromStorage = (): string | null => {
   try {
      return localStorage.getItem(THEME_KEY);
   } catch {
      return null;
   }
};
