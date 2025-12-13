import clsx from "clsx";
import type { ReactNode } from "react";

import styles from "./ChartSkeleton.module.scss";

interface ChartSkeletonProps {
   width?: number | string;
   height?: number | string;
   className?: string;
   isLoading?: boolean;
   children?: ReactNode;
}

export const ChartSkeleton = ({ className, isLoading = false, width = "100%", children, height = 300 }: ChartSkeletonProps) => {
   return isLoading ? (
      <div className={clsx(styles.chartSkeleton, className)}>
         <svg width={width} height={height} viewBox="0 0 400 300" className={styles.svg}>
            <line x1="50" y1="250" x2="350" y2="250" className={styles.axis} />

            {/* Ось Y */}
            <line x1="50" y1="50" x2="50" y2="250" className={styles.axis} />

            {/* Первая ломаная линия (толщина 3px) - сплошная */}
            {/* <polyline points="50,200 80,150 110,220 140,170 170,200 200,140 230,160" className={styles.line1} /> */}

            {/* Вторая ломаная линия (толщина 3px) - сплошная */}
            <polyline points="50,200 150,100 250,230 350,110" className={styles.line2} />
         </svg>
      </div>
   ) : (
      children
   );
};
