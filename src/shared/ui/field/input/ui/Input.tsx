import clsx from "clsx";
import { type ChangeEvent, type InputHTMLAttributes, type ReactNode, useRef } from "react";

import { Badge } from "@/shared/ui/badge";

import type { TFieldSize, TFieldVariant } from "../../model/types";
import styles from "./Input.module.scss";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
   value: string;
   placeholder?: string;
   disabled?: boolean;
   rightIcon?: ReactNode;
   leftIcon?: ReactNode;
   className?: string;
   counter?: string | number;
   size?: TFieldSize;
   variant?: TFieldVariant;
   isError?: boolean;
}

export const Input = ({
   value,
   counter,
   rightIcon,
   leftIcon,
   size = "normal",
   variant = "primary",
   onChange,
   placeholder = "Введите запрос...",
   disabled,
   className,
   isError,
   width,
   ...props
}: InputProps) => {
   const inputRef = useRef<HTMLInputElement>(null);

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
         onChange(e);
      }
   };

   const inputFocus = () => {
      if (inputRef.current) {
         inputRef.current.focus();
      }
   };

   return (
      <div
         onClick={inputFocus}
         className={clsx(styles.container, styles[size], styles[variant], className, {
            [styles.disabled]: disabled,
            [styles.error]: isError,
         })}
         style={{ width }}
      >
         {leftIcon && <div className={styles.leftIcon}>{leftIcon}</div>}
         <input
            ref={inputRef}
            disabled={disabled}
            className={styles.input}
            value={value}
            placeholder={placeholder}
            title={placeholder}
            type="text"
            onChange={handleChange}
            {...props}
         />
         <div className={styles.control}>
            {counter && <Badge>{counter}</Badge>}
            {rightIcon && <div className={styles.rightIcon}>{rightIcon}</div>}
         </div>
      </div>
   );
};
