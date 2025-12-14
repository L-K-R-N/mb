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
    const initAnimations = () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(imageRefs.current.filter(Boolean), {
          x: 0,
          opacity: 1,
          scale: 1
        });
        return;
      }

      const createSafeScrollTrigger = (trigger: HTMLElement | null, options: any) => {
        if (!trigger || !trigger.isConnected) return null;
        
        return ScrollTrigger.create({
          trigger,
          start: "top 85%",
          end: "bottom top",
          toggleActions: "play none none none",
          once: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          markers: false,
          ...options
        });
      };

      imageRefs.current.forEach((ref, index) => {
        if (!ref || !ref.isConnected) return;

        const direction = index % 2 === 0 ? -1 : 1;
        const startX = direction * 100;

        const imgElement = ref.querySelector('img');
        if (imgElement) {
          const animateImageDiv = () => {
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
                scrollTrigger: createSafeScrollTrigger(ref, {
                  start: "top 85%",
                  end: "top 50%",
                })
              }
            );
          };

          if (imgElement.complete && imgElement.naturalHeight !== 0) {
            animateImageDiv();
          } else {
            imgElement.addEventListener('load', animateImageDiv, { once: true });
            setTimeout(animateImageDiv, 1500);
          }
        } else {
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
              scrollTrigger: createSafeScrollTrigger(ref, {
                start: "top 85%",
                end: "top 50%",
              })
            }
          );
        }
      });

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
    };

    const timer = setTimeout(initAnimations, 100);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
    });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', () => ScrollTrigger.refresh());
      
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      imageRefs.current.forEach(ref => {
        if (ref) {
          const img = ref.querySelector('img');
          if (img) {
            img.removeEventListener('load', () => {});
          }
        }
      });
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
              ref={(el) => { imageRefs.current[index] = el; }}
              className={styles["gallery-item"]}
            >
              <img 
                src={img} 
                alt={`portfolio img ${index}`}
                loading="lazy"
                onLoad={() => ScrollTrigger.refresh()}
              />
            </div>
          ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default Portfolio;