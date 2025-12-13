import { Wrapper } from "@/shared/ui/wrapper";

import styles from "./PublicFooter.module.scss";

export const PublicFooter = () => (
   <footer className={styles.footer}>
      <Wrapper className={styles.content}>
         <div className={styles.left}>
            <small className={styles.disclamer}>© 2025. Все права защищены.</small>
         </div>
      </Wrapper>
   </footer>
);
// montserat 300 400 500 700 600 prata 400