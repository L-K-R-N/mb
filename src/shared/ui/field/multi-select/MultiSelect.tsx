import { animated, useSpring, useTransition } from "@react-spring/web";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

import arrow from "@/shared/assets/old/icons/arrow.svg";
import { Badge } from "@/shared/ui/badge";
import { Skeleton } from "@/shared/ui/skeleton";

import type { TFieldSize, TFieldVariant } from "../model/types";
import styles from "./MultiSelect.module.scss";

export interface ISelectOption {
   value: string;
   label: string;
   disabled?: boolean;
}

export interface MultiSelectProps {
   options: ISelectOption[];
   value: string[];
   onChange: (value: string[]) => void;
   placeholder?: string;
   disabled?: boolean;
   className?: string;
   width?: number;
   size?: TFieldSize;
   isLoading?: boolean;
   variant?: TFieldVariant;
   isError?: boolean;
}

export const MultiSelect = ({
   options,
   value,
   size = "normal",
   isLoading,
   onChange,
   placeholder,
   width,
   disabled,
   className,
   variant = "primary",
   isError,
}: MultiSelectProps) => {
   const [isOpen, setIsOpen] = useState(false);
   const selectRef = useRef<HTMLDivElement>(null);

   const transitions = useTransition(isOpen, {
      from: { opacity: 0, transform: "translateY(-4px)" },
      enter: { opacity: 1, transform: "translateY(0px)" },
      leave: { opacity: 0, transform: "translateY(-4px)" },
      config: { friction: 20, duration: 100 }, // плавно и сдержанно
   });

   const handleSelect = (optionValue: string) => {
      if (value.includes(optionValue)) {
         onChange(value.filter((v) => v !== optionValue));
      } else {
         onChange([...value, optionValue]);
      }
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
      <div ref={selectRef} className={clsx(styles.select__container, className, { [styles.disabled]: disabled })} style={{ width }}>
         <Skeleton variant="field" isLoading={isLoading} height="100%">
            <div
               className={clsx(styles.select__header, styles[variant], styles[size], { [styles.open]: isOpen, [styles.error]: isError })}
               onClick={() => !disabled && setIsOpen(!isOpen)}
            >
               <span className={styles.select__placeholder}>{placeholder}</span>
               {value?.length > 0 && <Badge children={value.length} className={styles.counter} />}
               <img className={styles.select__arrow} src={arrow} alt={placeholder} />
            </div>
         </Skeleton>
         {transitions((style, item) =>
            item ? (
               <animated.ul style={style} className={clsx(styles.select__dropdown, styles[variant])}>
                  <div className={styles.select__options}>
                     {options.map((option) => (
                        <div
                           key={option.value}
                           className={clsx(
                              styles.select__option,
                              styles[size],
                              value.includes(option.value) ? styles.selected : "",
                              option.disabled ? styles.disabled : "",
                           )}
                           onClick={() => !option.disabled && handleSelect(option.value)}
                        >
                           <input
                              title={placeholder}
                              type="checkbox"
                              checked={value.includes(option.value)}
                              readOnly
                              className={styles.select__checkbox}
                           />
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
