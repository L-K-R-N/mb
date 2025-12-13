import clsx from "clsx";

import type { TDividerOrientation } from "../model/types";
import styles from "./Divider.module.scss";

export interface DividerProps {
   className?: string;
   orientation?: TDividerOrientation;
   height?: number;
   width?: number;
}

export const Divider = ({ orientation = "horizontal", height, width, className }: DividerProps) => {
   return <div className={clsx(styles.divider, styles[orientation], className)} style={{ height, width }}></div>;
};
