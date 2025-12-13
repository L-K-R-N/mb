import type { TBaseIconProps } from "../model/types";

export const BurgerIcon = ({ color = "#222222", width = 24, height = 24, className }: TBaseIconProps) => {
   return (
      <svg className={className} width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 5C0 4.44772 0.467181 4 1.04348 4H22.9565C23.5328 4 24 4.44772 24 5C24 5.55228 23.5328 6 22.9565 6H1.04348C0.467181 6 0 5.55228 0 5Z" fill={color}/>
        <path d="M0 12C0 11.4477 0.467181 11 1.04348 11H22.9565C23.5328 11 24 11.4477 24 12C24 12.5523 23.5328 13 22.9565 13H1.04348C0.467181 13 0 12.5523 0 12Z" fill={color}/>
        <path d="M0 19C0 18.4477 0.467181 18 1.04348 18H22.9565C23.5328 18 24 18.4477 24 19C24 19.5523 23.5328 20 22.9565 20H1.04348C0.467181 20 0 19.5523 0 19Z" fill={color}/>
      </svg>
   );
};
