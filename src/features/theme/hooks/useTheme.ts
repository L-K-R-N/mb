import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/shared/model/types";

import { setTheme } from "../model/themeSlice";
import type { TThemeName } from "../model/types";

export const useTheme = () => {
   const dispatch = useDispatch();
   const current = useSelector((s: RootState) => s.theme.current);

   // Функция для получения реальной темы (с учетом системных настроек)
   const getEffectiveTheme = useCallback((): "light" | "dark" => {
      if (current === "system") {
         return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches 
            ? "dark" 
            : "light";
      }
      return current;
   }, [current]);

   // Функция для применения темы к документу
   const applyTheme = useCallback((theme: "light" | "dark") => {
      document.documentElement.setAttribute("data-theme", theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
      document.documentElement.classList.toggle("light", theme === "light");
   }, []);

   // Обработчик изменения системной темы
   const handleSystemThemeChange = useCallback((e: MediaQueryListEvent) => {
      if (current === "system") {
         applyTheme(e.matches ? "dark" : "light");
      }
   }, [current, applyTheme]);

   // Эффект для отслеживания системной темы
   useEffect(() => {
      // Применяем тему при монтировании и изменении
      const effectiveTheme = getEffectiveTheme();
      applyTheme(effectiveTheme);

      // Настраиваем отслеживание системной темы
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Современный подход с addEventListener
      mediaQuery.addEventListener('change', handleSystemThemeChange);

      return () => {
         mediaQuery.removeEventListener('change', handleSystemThemeChange);
      };
   }, [current, getEffectiveTheme, applyTheme, handleSystemThemeChange]);

   const toggle = useCallback(() => {
      if (current === "system") {
         // Если текущая системная, переключаем на противоположную системной
         const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
         dispatch(setTheme(systemTheme === "dark" ? "light" : "dark"));
      } else {
         dispatch(setTheme(current === "dark" ? "light" : "dark"));
      }
   }, [current, dispatch]);

   const set = useCallback((t: TThemeName) => dispatch(setTheme(t)), [dispatch]);

   return { 
      current, 
      effective: getEffectiveTheme(),
      toggle, 
      set 
   };
};