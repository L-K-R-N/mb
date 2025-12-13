import clsx from "clsx";
import { type PropsWithChildren } from "react";

import styles from "./FormItem.module.scss";

export interface FormItemProps extends PropsWithChildren {
   label?: string;
   error?: string;
   hint?: string;
   link?: {
      text: string;
      onClick: () => void;
   };
}

export const FormItem = ({ children, error, label, hint, link }: FormItemProps) => {
   return (
      <div className={styles.container}>
         {label && <label className={styles.label}>{label}</label>}
         {children}
         <div className={clsx(styles.bottom, { [styles.hidden]: !error && !hint && !link })}>
            {error && !hint && <p className={styles.error}>{error}</p>}
            {hint && <p className={styles.hint}>{hint}</p>}
            {link && (
               <p onClick={link.onClick} className={styles.link}>
                  {link.text}
               </p>
            )}
         </div>
      </div>
   );
};
