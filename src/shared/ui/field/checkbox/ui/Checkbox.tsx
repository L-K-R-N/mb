import { animated, useSpring } from "@react-spring/web";
import clsx from "clsx";
import { type InputHTMLAttributes, useState } from "react";

import styles from "./Checkbox.module.scss";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
   onChange?: () => void;
   title?: string;
}

export const Checkbox = ({ className, onChange, title }: CheckboxProps) => {
   const [isChecked, setIsChecked] = useState(false);

   const handleChange = () => {
      if (onChange) {
         onChange();
      }
      setIsChecked((value) => !value);
   };

   const indicatorAnimation = useSpring({
      transform: isChecked ? "scale(1)" : "scale(0)", // увеличение
      opacity: isChecked ? 1 : 0, // плавная прозрачность
      config: { tension: 250, friction: 20 }, // скорость анимации
   });

   return (
      <div className={clsx(styles.checkbox, { [styles.checked]: isChecked }, className)}>
         <input className={styles.input} type="checkbox" onChange={handleChange} checked={isChecked} title={title} />
         <animated.div
            className={styles.indicator}
            style={{
               ...indicatorAnimation,
            }}
         />
      </div>
   );
};
