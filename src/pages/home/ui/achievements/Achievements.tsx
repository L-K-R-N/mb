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

  // Инициализируем рефы для элементов списка
  useEffect(() => {
    achievementItemsRefs.current = achievementItemsRefs.current.slice(0, ACHIEVEMENTS_LIST.length);
  }, [ACHIEVEMENTS_LIST.length]);

  useEffect(() => {
    // Проверяем, не отключены ли анимации
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Если анимации отключены, сразу показываем все элементы
      gsap.set([descRef.current, imageRef.current, ...achievementItemsRefs.current], {
        y: 0,
        opacity: 1
      });
      return;
    }

    // 1. Анимация для описания (выезжает снизу)
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
        scrollTrigger: {
          trigger: descRef.current,
          start: "top 85%",
          end: "top 60%",
          toggleActions: "play none none none",
          once: true,
        }
      }
    );

    // 2. Анимация для фотографии (выезжает снизу с задержкой)
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
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 85%",
          end: "top 50%",
          toggleActions: "play none none none",
          once: true,
        }
      }
    );

    // 3. Анимация для списка достижений (каждый элемент по очереди)
    achievementItemsRefs.current.forEach((ref, index) => {
      if (!ref) return;

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
          delay: index * 0.15, // Задержка для каждого следующего элемента
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 80%",
            end: "top 40%",
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
    <div className={styles.achievements} ref={sectionRef}>
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
          />
          <ul ref={listRef} className={styles.achievements__list}>
            {ACHIEVEMENTS_LIST.map((achievement, index) => (
              <li 
                ref={el => achievementItemsRefs.current[index] = el}
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