export type TThemeName = "light" | "dark" | "system";

export interface IThemeState {
   current: TThemeName;
}

export type TEffectiveTheme = "light" | "dark";