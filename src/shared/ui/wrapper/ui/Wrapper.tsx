import clsx from "clsx";

import type { WrapperProps } from "../model/types";
import styles from "./Wrapper.module.scss";

export const Wrapper = ({ className, children }: WrapperProps) => {
   return <div className={clsx(styles.wrapper, className)}>{children}</div>;
};
