import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

import styles from "./Button.module.scss";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
   disabled?: boolean;
   onClick?: () => void;
   children?: string;
}

export const Button = ({
   children,
   className,
   disabled,
   onClick,
}: ButtonProps) => {
   return (
      <button
         disabled={disabled}
         onClick={onClick}
         className={clsx(styles.button, className)}
      >
         {children}
      </button>
   );
};
