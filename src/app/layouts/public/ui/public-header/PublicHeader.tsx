import BurgerMenu from "@/shared/ui/burger-menu/BurgerMenu";
import { LogoIcon } from "@/shared/ui/icon";
import { Wrapper } from "@/shared/ui/wrapper";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { SOCIAL_LINKS } from "../../model/constants";
import styles from "./PublicHeader.module.scss";

interface PublicHeaderProps {
}

export const PublicHeader = ({}: PublicHeaderProps) => {
   const navigate = useNavigate();

   const handleMenuItemClick = (path: string) => {
      navigate(path);
   };

   return (
      <header className={clsx(styles.header)}>
         <BurgerMenu onItemClick={handleMenuItemClick} />
         <Wrapper className={styles["header-content"]}>
            <LogoIcon className={styles.logo}/>
            <div className={styles.socials}>
               {SOCIAL_LINKS.map((link, index) => 
                  <a key={index} href={link.href}>
                     {link.icon}
                  </a>
               )}
            </div>
         </Wrapper>
      </header>
   );
};