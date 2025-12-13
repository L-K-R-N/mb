import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import { Button } from "@/shared/ui/button";
import { Wrapper } from "@/shared/ui/wrapper/ui/Wrapper";

import { NavigationMenu } from "./navigation-menu/ui/NavigationMenu";
import styles from "./PublicHeader.module.scss";

interface PublicHeaderProps {
   isHome?: boolean;
}

export const PublicHeader = ({ isHome }: PublicHeaderProps) => {
   const navigate = useNavigate();

   return (
      <header className={clsx(styles.header)}>
         <Wrapper className={styles.header__content}>
            {isHome && <NavigationMenu />}
            <Button onClick={() => navigate("/login")}>{isHome ? "Войти в кабинет" : "Регистрация"}</Button>
         </Wrapper>
      </header>
   );
};
