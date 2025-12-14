import { Wrapper } from "@/shared/ui/wrapper";

import clsx from "clsx";
import styles from "./PublicFooter.module.scss";

export const PublicFooter = () => (
   <footer className={styles.footer}>
      <Wrapper className={styles["footer-content"]}>
            <div className={styles.left}>
               <small className={styles.text}>© Фотограф Максим Браун 2022</small>
               <a className={clsx(styles.text, styles.privacy)} href="#!">Политика конфиденциальности</a>
            </div>
            <p className={styles.text}>Разработка и маркетинг WebCanape</p>
      </Wrapper>
   </footer>
);