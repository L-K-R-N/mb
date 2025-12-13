import clsx from "clsx";
import type { ReactNode } from "react";

import type { TSkeletonVariant } from "../model/types";
import styles from "./Skeleton.module.scss";

interface SkeletonProps {
   width?: number | string;
   height?: number | string;
   className?: string;
   isLoading?: boolean;
   variant?: TSkeletonVariant;
   children?: ReactNode;
}

export const Skeleton = ({ className, isLoading = false, width = "100%", variant = "text", children, height = 16 }: SkeletonProps) => {
   return isLoading ? <div className={clsx(styles.skeleton, styles[variant], className)} style={{ width, height }} /> : children;
};
