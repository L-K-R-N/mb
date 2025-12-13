import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { readThemeFromStorage, saveThemeToStorage } from "@/features/theme/model/persistTheme";
import { setTheme } from "@/features/theme/model/themeSlice";
import { useAppSelector } from "@/shared/hooks";
import type { RootState } from "@/shared/model/types";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const theme = useAppSelector((s: RootState) => s.theme.current);
   const dispatch = useDispatch();

   // init — если есть сохранённая в localStorage, подгрузи
   useEffect(() => {
      const saved = readThemeFromStorage();
      if (saved) {
         dispatch(setTheme(saved as any));
      }
   }, [dispatch]);

   // apply theme to document.documentElement
   useEffect(() => {
      const doc = document.documentElement;

      // resolve actual theme name if 'system' selected
      const resolve = (t: string) => {
         if (t === "system") {
            return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
         }
         return t;
      };

      const actual = resolve(theme);

      doc.setAttribute("data-theme", actual);

      // persist
      saveThemeToStorage(theme);

      // if system — listen for system changes
      let mql: MediaQueryList | null = null;
      const handleChange = () => {
         if (theme === "system") {
            doc.setAttribute("data-theme", resolve("system"));
         }
      };
      if (window.matchMedia) {
         mql = window.matchMedia("(prefers-color-scheme: dark)");
         mql.addEventListener?.("change", handleChange);
      }
      return () => {
         mql?.removeEventListener?.("change", handleChange);
      };
   }, [theme]);

   return <>{children}</>;
};
