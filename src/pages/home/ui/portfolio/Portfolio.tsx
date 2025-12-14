import { Wrapper } from "@/shared/ui/wrapper";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { PORTFOLIO_IMAGES } from "../../model/constants";
import styles from "./Portfolio.module.scss";

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    imageRefs.current = imageRefs.current.slice(0, PORTFOLIO_IMAGES.length);
  }, [PORTFOLIO_IMAGES.length]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(imageRefs.current, {
        x: 0,
        opacity: 1
      });
      return;
    }

    imageRefs.current.forEach((ref, index) => {
      if (!ref) return;

      
      const direction = index % 2 === 0 ? -1 : 1; 
      const startX = direction * 100;

      gsap.fromTo(ref,
        {
          x: startX,
          opacity: 0,
          scale: 0.9
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref,
            start: "top 85%", 
            end: "top 50%",
            toggleActions: "play none none none",
            once: true,
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className={styles.portfolio} ref={sectionRef} id="portfolio">
      <Wrapper className={styles["portfolio-content"]}>
        <h2 className={styles["portfolio-title"]}>портфолио</h2>
        <div className={styles["portfolio-gallery"]}>
          {PORTFOLIO_IMAGES.map((img, index) => (
            <div 
              key={index}
              ref={(el) => {imageRefs.current[index] = el}}
              className={styles["gallery-item"]}
            >
              <img src={img} alt={`portfolio img ${index}`}/>
            </div>
          ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default Portfolio;