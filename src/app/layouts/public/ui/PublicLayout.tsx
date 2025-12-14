import type { PropsWithChildren } from "react";
import { Outlet, useLocation } from "react-router-dom";

import styles from "./PublicLayout.module.scss";
import { PublicFooter } from "./public-footer/PublicFooter";
import { PublicHeader } from "./public-header/PublicHeader";

export interface PublicLayoutProps extends PropsWithChildren {
   isHome?: boolean;
}

export const PublicLayout = () => {
   const location = useLocation();
   return (
      <div className={styles.layout}>
         <PublicHeader/>
         <div className={styles.content}>{<Outlet />}</div>
         <PublicFooter />
      </div>
   );
};
