import INTRO_JPG from '@/shared/assets/intro.jpg';
import { Button } from "@/shared/ui/button";
import { Wrapper } from "@/shared/ui/wrapper";
import clsx from "clsx";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import styles from "./Intro.module.scss";

const Intro = () => {
  const overlay1Ref = useRef<HTMLDivElement>(null);
  const overlay2Ref = useRef<HTMLDivElement>(null);
  const overlay3Ref = useRef<HTMLDivElement>(null);
  const overlay4Ref = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const [animationPlayed, setAnimationPlayed] = useState(false);

  useEffect(() => {
    if (animationPlayed) return;

    const initAnimations = () => {
      const overlays = [overlay1Ref.current, overlay2Ref.current, overlay3Ref.current, overlay4Ref.current];
      const allOverlaysExist = overlays.every(overlay => overlay && overlay.isConnected);

      if (!allOverlaysExist) {
        console.warn('Intro: Некоторые overlay элементы не найдены в DOM');
        return;
      }

      gsap.set(overlays, { x: '-100%' });
      
      const tl = gsap.timeline();
      
      tl.to(overlay1Ref.current, 
        { x: '0%', duration: 1, ease: "expo.inOut" },
        "=-0.1"
      )
      .to(overlay2Ref.current,
        { x: '0%', duration: 1, ease: "expo.inOut" },
        "=-0.85"
      )
      .to(overlay3Ref.current,
        { x: '0%', duration: 1, ease: "expo.inOut" },
        "=-0.85"
      )
      .to(overlay4Ref.current,
        { x: '0%', duration: 1, ease: "expo.inOut" },
        "=-0.85"
      );

      setAnimationPlayed(true);
      
      return tl;
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
        console.log('Intro image loaded');
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
    return () => {
      gsap.killTweensOf([
        overlay1Ref.current, 
        overlay2Ref.current, 
        overlay3Ref.current, 
        overlay4Ref.current
      ]);
    };
  }, []);

  return (
    <div className={styles.intro}>
      <div ref={overlay1Ref} className={clsx(styles.overlay, styles["overlay-1"])} />
      <div ref={overlay2Ref} className={clsx(styles.overlay, styles["overlay-2"])} />
      <div ref={overlay3Ref} className={clsx(styles.overlay, styles["overlay-3"])} />
      <div ref={overlay4Ref} className={clsx(styles.overlay, styles["overlay-4"])} />
      <img 
        ref={bgImageRef}
        className={styles["bg-image"]} 
        src={INTRO_JPG} 
        alt="Фон интро" 
        loading="eager"
      />
      <Wrapper className={styles["intro-content"]}>
        <h2 className={styles.intro__subtitle}>максим браун</h2>
        <h1 className={styles.intro__title}>фотограф<span><span>в</span>москве</span></h1>
        <p className={styles.intro__slogan}>Нестандартные фотографии, которые помогут вам выделиться из толпы</p>
        <Button>записаться</Button>
      </Wrapper>
    </div>
  );
};

export default Intro;