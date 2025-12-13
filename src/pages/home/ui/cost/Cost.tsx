import COST_JPG from '@/shared/assets/cost.jpg';
import { Wrapper } from "@/shared/ui/wrapper";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { COST_LIST } from '../../model/constants';
import styles from "./Cost.module.scss";
;

gsap.registerPlugin(ScrollTrigger);

const Cost = () => {
  const overlay1Ref = useRef<HTMLDivElement>(null);
  const overlay2Ref = useRef<HTMLDivElement>(null);
  const overlay3Ref = useRef<HTMLDivElement>(null);
  const overlay4Ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Проверяем, не отключены ли анимации у пользователя
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Если анимации отключены, сразу показываем оверлеи
      gsap.set([overlay1Ref.current, overlay2Ref.current, overlay3Ref.current, overlay4Ref.current], {
        x: '0%'
      });
      return;
    }

    // Создаем таймлайн с ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current, // Блок, который триггерит анимацию
        start: "top 80%", // Начинать анимацию когда верх блока на 80% от верха окна
        end: "bottom 20%", // Можно настроить по желанию
        once: true, // Анимация сработает только один раз
        toggleActions: "play none none none", // Только play при входе
        // markers: true, // Раскомментируй для отладки (покажет маркеры на странице)
      }
    });
    
    // Последовательная анимация оверлеев
    tl.fromTo(overlay1Ref.current, 
      { x: '-100%' },
      { x: '0%', duration: 1, ease: "expo.inOut" }
    )
    .fromTo(overlay2Ref.current,
      { x: '-100%' },
      { x: '0%', duration: 1, ease: "expo.inOut" },
      "-=0.85" // Начинать раньше окончания предыдущей
    )
    .fromTo(overlay3Ref.current,
      { x: '-100%' },
      { x: '0%', duration: 1, ease: "expo.inOut" },
      "-=0.85"
    )
    .fromTo(overlay4Ref.current,
      { x: '-100%' },
      { x: '0%', duration: 1, ease: "expo.inOut" },
      "-=0.85"
    );

    return () => {
      // Очищаем все ScrollTrigger'ы при размонтировании
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
    };
  }, []);

  return (
    <div className={styles.cost} ref={sectionRef}>
      <div ref={overlay1Ref} className={clsx(styles.overlay, styles["overlay-1"])} />
      <div ref={overlay2Ref} className={clsx(styles.overlay, styles["overlay-2"])} />
      <div ref={overlay3Ref} className={clsx(styles.overlay, styles["overlay-3"])} />
      <div ref={overlay4Ref} className={clsx(styles.overlay, styles["overlay-4"])} />
      <img className={styles["bg-image"]} src={COST_JPG} alt="" />
      <Wrapper className={styles["cost-content"]}>
        <h2 className={styles["cost-title"]}>стоимость</h2>
        <p className={styles["cost-desc"]}>Стоимость может изменится из-за условий и пожеланий клиента. Для уточнения деталей и финальной стоимости свяжитесь со мной, уточнив в какие даты вам требуется съемка, а так же тип фотосъёмки.</p>
        <ul className={styles["cost-list"]}>
          {COST_LIST.map((item) =>
            <li className={styles["cost-card"]}>
              <span className={styles["cost-card-icon"]}>{item.icon}</span>
              <span className={styles["cost-card-title"]}>{item.title}</span>
              <span className={styles["cost-card-price"]}>{item.cost}</span>
            </li>
          )}
        </ul>
      </Wrapper>
    </div>
  );
};
export default Cost;
