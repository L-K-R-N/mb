import Achievements from "./achievements/Achievements";
import Cost from "./cost/Cost";
import styles from "./HomePage.module.scss";
import Intro from "./intro/Intro";
import Portfolio from "./portfolio/Portfolio";
import Reviews from "./reviews/Reviews";

const HomePage = () => {
   return (
      <div className={styles.page}>
         <Intro />
         <Achievements />
         <Portfolio />
         <Reviews />
         <Cost />
      </div>
   );
};
export default HomePage;
