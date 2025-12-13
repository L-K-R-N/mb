import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

import type { TIconButtonSize, TIconButtonVariant } from "../../model/types";
import styles from "./IconButton.module.scss";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   size?: TIconButtonSize;
   variant?: TIconButtonVariant;
   disabled?: boolean;
   isNotice?: boolean;
   onClick?: () => void;
}

export const IconButton = ({
   children,
   className,
   disabled,
   size = "large",
   variant = "secondary",
   isNotice,
   onClick,
}: IconButtonProps) => {
   return (
      <button
         disabled={disabled}
         onClick={onClick}
         className={clsx(styles.button, styles[size], styles[variant], isNotice ? styles.isNotice : "", className)}
      >
         {children}
      </button>
   );
};
