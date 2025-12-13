import type { PropsWithChildren } from "react";

import { NAVIGATION_ITEMS } from "@/app/layouts/public/model/constants";

import styles from "./NavigationMenu.module.scss";

export type NavigationMenuProps = PropsWithChildren;

export const NavigationMenu = () => {
   return (
      <nav className={styles.menu}>
         <ul className={styles.list}>
            {NAVIGATION_ITEMS.map((item) => (
               <li key={item.id} className={styles.item}>
                  <a className={styles.link} href={`#${item.id}`}>
                     {item.label}
                  </a>
               </li>
            ))}
         </ul>
      </nav>
   );
};
