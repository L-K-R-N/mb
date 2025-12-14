import ACHIEVEMENTS_JPG from '@/shared/assets/achievements.jpg';
import { Wrapper } from "@/shared/ui/wrapper";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { ACHIEVEMENTS_LIST } from '../../model/constants';
import styles from "./Achievements.module.scss";

gsap.registerPlugin(ScrollTrigger);

const Achievements = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const achievementItemsRefs = useRef<Array<HTMLLIElement | null>>([]);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    achievementItemsRefs.current = achievementItemsRefs.current.slice(0, ACHIEVEMENTS_LIST.length);
  }, [ACHIEVEMENTS_LIST.length]);

  useEffect(() => {
    const initAnimations = () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) {
        gsap.set([descRef.current, imageRef.current, ...achievementItemsRefs.current], {
          y: 0,
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

      if (descRef.current && descRef.current.isConnected) {
        gsap.fromTo(descRef.current,
          {
            y: 80,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: createSafeScrollTrigger(descRef.current, {
              start: "top 85%",
              end: "top 60%",
            })
          }
        );
      }

      if (imageRef.current && imageRef.current.isConnected) {
        const imgElement = imageRef.current as HTMLImageElement;
        
        const animateImage = () => {
          gsap.fromTo(imageRef.current,
            {
              y: 100,
              opacity: 0,
              scale: 0.95
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
              delay: 0.2,
              scrollTrigger: createSafeScrollTrigger(imageRef.current, {
                start: "top 85%",
                end: "top 50%",
              })
            }
          );
        };

        if (imgElement.complete && imgElement.naturalHeight !== 0) {
          animateImage();
        } else {
          imgElement.addEventListener('load', animateImage, { once: true });
          setTimeout(animateImage, 1000);
        }
      }

      achievementItemsRefs.current.forEach((ref, index) => {
        if (!ref || !ref.isConnected) return;

        gsap.fromTo(ref,
          {
            y: 60,
            opacity: 0,
            scale: 0.9
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "back.out(1.4)",
            delay: index * 0.15,
            scrollTrigger: createSafeScrollTrigger(listRef.current, {
              start: "top 80%",
              end: "top 40%",
            })
          }
        );
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
      
      if (imageRef.current) {
        const img = imageRef.current as HTMLImageElement;
        img.removeEventListener('load', () => {});
      }
    };
  }, []);

  return (
    <div className={styles.achievements} ref={sectionRef} id='about'>
      <Wrapper className={styles["achievements-content"]}>
        <p ref={descRef} className={styles.achievements__desc}>
          Услуги профессионального фотографа, привлечение к съемкам лучших специалистов. 
          Решение творческих и организационных задач любой сложности. Создание рекламных 
          фотографий и выразительных портретов. Профессиональная работа в студии и на выезде.
        </p>
        <div className={styles["achievements-info"]}>
          <img 
            ref={imageRef} 
            className={styles.achievements__image} 
            src={ACHIEVEMENTS_JPG} 
            alt="Достижения" 
            loading="lazy" 
            onLoad={() => ScrollTrigger.refresh()}
          />
          <ul ref={listRef} className={styles.achievements__list}>
            {ACHIEVEMENTS_LIST.map((achievement, index) => (
              <li 
                ref={(el) => {
                  achievementItemsRefs.current[index] = el;
                }}
                className={styles.achievement} 
                key={index}
              >
                <span className={styles.achievement__count}>{achievement.count}</span>
                <p className={styles.achievement__title}>{achievement.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </Wrapper>
    </div>
  );
};

export default Achievements;