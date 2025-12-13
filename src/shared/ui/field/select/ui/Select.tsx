import { animated, useTransition } from "@react-spring/web";
import clsx from "clsx";
import { type ReactNode, useEffect, useRef, useState } from "react";

import arrow from "@/shared/assets/old/icons/arrow.svg";
import { Skeleton } from "@/shared/ui/skeleton";

import type { TFieldSize, TFieldVariant } from "../../model/types";
import styles from "./Select.module.scss";

export interface ISelectOption<T> {
   value: T;
   label: ReactNode;
   disabled?: boolean;
}

export interface SelectProps<T> {
   options: ISelectOption<T>[];
   value: T;
   onChange: (value: T) => void;
   placeholder?: string;
   disabled?: boolean;
   className?: string;
   isLoading?: boolean;
   width?: number;
   size?: TFieldSize;
   variant?: TFieldVariant;
   isError?: string;
}

export const Select = <T,>({
   options,
   size = "normal",
   value = options[0].value,
   onChange,
   placeholder,
   disabled,
   className,
   variant = "primary",
   isLoading,
   isError,
   width,
}: SelectProps<T>) => {
   const [isOpen, setIsOpen] = useState(false);
   const selectRef = useRef<HTMLDivElement>(null);

   const transitions = useTransition(isOpen, {
      from: { opacity: 0, transform: "translateY(-4px)" },
      enter: { opacity: 1, transform: "translateY(0px)" },
      leave: { opacity: 0, transform: "translateY(-4px)" },
      config: { friction: 20, duration: 100 }, // плавно и сдержанно
   });

   const handleSelect = (optionValue: T) => {
      onChange(optionValue);
      setIsOpen(false);
   };

   const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
         setIsOpen(false);
      }
   };

   useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   return (
      <div
         ref={selectRef}
         className={clsx(styles.select__container, styles[variant], { [styles.disabled]: disabled }, className)}
         style={{ width }}
      >
         <Skeleton variant="field" isLoading={isLoading} height="100%">
            <div
               className={clsx(styles.select__header, styles[size], styles[variant], { [styles.open]: isOpen, [styles.error]: isError })}
               onClick={() => !disabled && setIsOpen(!isOpen)}
            >
               <span className={styles.select__placeholder}>{options.find((option) => option.value === value)!.label}</span>
               <img className={styles.select__arrow} src={arrow} alt={placeholder} />
            </div>
         </Skeleton>
         {transitions((style, item) =>
            item ? (
               <animated.ul style={style} className={clsx(styles.select__dropdown, styles[variant])}>
                  <div className={styles.select__options}>
                     {options.map((option, index) => (
                        <div
                           key={index}
                           className={clsx(
                              styles.select__option,
                              styles[size],
                              value === option.value ? styles.selected : "",
                              option.disabled ? styles.disabled : "",
                           )}
                           onClick={() => !option.disabled && handleSelect(option.value)}
                        >
                           {/* <input
                              title={placeholder}
                              type="checkbox"
                              checked={value.includes(option.value)}
                              readOnly
                              className={styles.select__checkbox}
                           /> */}
                           <span>{option.label}</span>
                        </div>
                     ))}
                  </div>
               </animated.ul>
            ) : null,
         )}
      </div>
   );
};
