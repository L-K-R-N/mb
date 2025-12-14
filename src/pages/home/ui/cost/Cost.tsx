import COST_JPG from '@/shared/assets/cost.jpg';
import { Wrapper } from "@/shared/ui/wrapper";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { COST_LIST } from '../../model/constants';
import styles from "./Cost.module.scss";

gsap.registerPlugin(ScrollTrigger);

const Cost = () => {
  const overlay1Ref = useRef<HTMLDivElement>(null);
  const overlay2Ref = useRef<HTMLDivElement>(null);
  const overlay3Ref = useRef<HTMLDivElement>(null);
  const overlay4Ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (animationPlayed) return;

    const initAnimations = () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) {
        gsap.set([overlay1Ref.current, overlay2Ref.current, overlay3Ref.current, overlay4Ref.current], {
          x: '0%'
        });
        return;
      }

      const overlays = [overlay1Ref.current, overlay2Ref.current, overlay3Ref.current, overlay4Ref.current];
      const allOverlaysExist = overlays.every(overlay => overlay && overlay.isConnected);
      const sectionExists = sectionRef.current && sectionRef.current.isConnected;

      if (!allOverlaysExist || !sectionExists) {
        console.warn('Cost: Некоторые элементы не найдены в DOM');
        return;
      }

      gsap.set(overlays, { x: '-100%' });

      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        once: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        markers: false,
        onEnter: () => {
          const tl = gsap.timeline();
          
          tl.to(overlay1Ref.current, 
            { x: '0%', duration: 1, ease: "expo.inOut" }
          )
          .to(overlay2Ref.current,
            { x: '0%', duration: 1, ease: "expo.inOut" },
            "-=0.85"
          )
          .to(overlay3Ref.current,
            { x: '0%', duration: 1, ease: "expo.inOut" },
            "-=0.85"
          )
          .to(overlay4Ref.current,
            { x: '0%', duration: 1, ease: "expo.inOut" },
            "-=0.85"
          );

          setAnimationPlayed(true);
        }
      });

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    const timer = setTimeout(() => {
      initAnimations();
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [animationPlayed]);

  useEffect(() => {
    if (bgImageRef.current) {
      const handleLoad = () => {
        ScrollTrigger.refresh();
      };

      if (bgImageRef.current.complete) {
        handleLoad();
      } else {
        bgImageRef.current.addEventListener('load', handleLoad, { once: true });
        return () => {
          bgImageRef.current?.removeEventListener('load', handleLoad);
        };
      }
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      
      gsap.killTweensOf([
        overlay1Ref.current, 
        overlay2Ref.current, 
        overlay3Ref.current, 
        overlay4Ref.current
      ]);
    };
  }, []);

  return (
    <div className={styles.cost} ref={sectionRef} id='cost'>
      <div ref={overlay1Ref} className={clsx(styles.overlay, styles["overlay-1"])} />
      <div ref={overlay2Ref} className={clsx(styles.overlay, styles["overlay-2"])} />
      <div ref={overlay3Ref} className={clsx(styles.overlay, styles["overlay-3"])} />
      <div ref={overlay4Ref} className={clsx(styles.overlay, styles["overlay-4"])} />
      <img 
        ref={bgImageRef}
        className={styles["bg-image"]} 
        src={COST_JPG} 
        alt="Фон стоимости" 
        loading="lazy"
      />
      <Wrapper className={styles["cost-content"]}>
        <h2 className={styles["cost-title"]}>стоимость</h2>
        <p className={styles["cost-desc"]}>
          Стоимость может изменится из-за условий и пожеланий клиента. 
          Для уточнения деталей и финальной стоимости свяжитесь со мной, 
          уточнив в какие даты вам требуется съемка, а так же тип фотосъёмки.
        </p>
        <ul className={styles["cost-list"]}>
          {COST_LIST.map((item, index) =>
            <li className={styles["cost-card"]} key={index}>
              <span className={styles["cost-card-icon"]}>{item.icon}</span>
              <div className={styles["cost-card-info"]}>
                <span className={styles["cost-card-title"]}>{item.title}</span>
                <span className={styles["cost-card-price"]}>{item.cost}</span>
              </div>
            </li>
          )}
        </ul>
      </Wrapper>
    </div>
  );
};

export default Cost;