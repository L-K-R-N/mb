import INTRO_JPG from '@/shared/assets/intro.jpg';
import useDeviceType from '@/shared/hooks/useDeviceType';
import { Button } from "@/shared/ui/button";
import { Wrapper } from "@/shared/ui/wrapper";
import clsx from "clsx";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import styles from "./Intro.module.scss";

const Intro = () => {
  const overlay1Ref = useRef<HTMLDivElement>(null);
  const overlay2Ref = useRef<HTMLDivElement>(null);
  const overlay3Ref = useRef<HTMLDivElement>(null);
  const overlay4Ref = useRef<HTMLDivElement>(null);
  const deviceType = useDeviceType();

  useEffect(() => {
    const tl = gsap.timeline();
    if (deviceType === 'mobile' || deviceType === 'tablet') {
      tl.fromTo(overlay1Ref.current, 
        { y: '-100%' },
        { y: '0%', duration: 1, ease: "expo.inOut" },
        "=-0.1"
      )
      .fromTo(overlay2Ref.current,
        { y: '-100%' },
        { y: '0%', duration: 1, ease: "expo.inOut" },
        "=-0.85"
      )
      .fromTo(overlay3Ref.current,
        { y: '-100%' },
        { y: '0%', duration: 1, ease: "expo.inOut" },
        "=-0.85"
      )
      .fromTo(overlay4Ref.current,
        { y: '-100%' },
        { y: '0%', duration: 1, ease: "expo.inOut" },
        "=-0.85"
      );
    } else {
      tl.fromTo(overlay1Ref.current, 
        { x: '-100%' },
        { x: '0%', duration: 1, ease: "expo.inOut" },
        "=-0.1"
      )
      .fromTo(overlay2Ref.current,
        { x: '-100%' },
        { x: '0%', duration: 1, ease: "expo.inOut" },
        "=-0.85"
      )
      .fromTo(overlay3Ref.current,
        { x: '-100%' },
        { x: '0%', duration: 1, ease: "expo.inOut" },
        "=-0.85"
      )
      .fromTo(overlay4Ref.current,
        { x: '-100%' },
        { x: '0%', duration: 1, ease: "expo.inOut" },
        "=-0.85"
      );
    }

    return () => {
      tl.kill();
    };
  }, [deviceType]);

  return (
    <div className={styles.intro}>
      <div ref={overlay1Ref} className={clsx(styles.overlay, styles["overlay-1"])} />
      <div ref={overlay2Ref} className={clsx(styles.overlay, styles["overlay-2"])} />
      <div ref={overlay3Ref} className={clsx(styles.overlay, styles["overlay-3"])} />
      <div ref={overlay4Ref} className={clsx(styles.overlay, styles["overlay-4"])} />
      <img className={styles["bg-image"]} src={INTRO_JPG} alt="" />
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
