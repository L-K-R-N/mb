import clsx from "clsx";
import { type ChangeEvent, type TextareaHTMLAttributes, useRef } from "react";

import type { TFieldVariant } from "../../model/types";
import styles from "./Textarea.module.scss";

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
   value: string;
   placeholder?: string;
   disabled?: boolean;
   className?: string;
   variant?: TFieldVariant;
   isError?: boolean;
   width?: number | string;
   height?: number | string;
}

export const Textarea = ({
   value,
   variant = "primary",
   onChange,
   placeholder = "Введите запрос...",
   disabled,
   className,
   isError,
   width,
   height,
   ...props
}: TextareaProps) => {
   const textareaRef = useRef<HTMLTextAreaElement>(null);

   const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange) {
         onChange(e);
      }
   };

   const textareaFocus = () => {
      if (textareaRef.current) {
         textareaRef.current.focus();
      }
   };

   return (
      <div
         onClick={textareaFocus}
         className={clsx(styles.container, styles[variant], className, {
            [styles.disabled]: disabled,
            [styles.error]: isError,
         })}
         style={{ width, height }}
      >
         <textarea
            ref={textareaRef}
            disabled={disabled}
            className={styles.textarea}
            value={value}
            placeholder={placeholder}
            title={placeholder}
            onChange={handleChange}
            {...props}
         />
      </div>
   );
};
