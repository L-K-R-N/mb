import { Wrapper } from "@/shared/ui/wrapper";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { REVIEWS_LIST } from "../../model/constants";
import styles from "./Reviews.module.scss";

gsap.registerPlugin(ScrollTrigger);

const Reviews = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const reviewRefs = useRef<Array<HTMLDivElement | null>>([]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    reviewRefs.current = reviewRefs.current.slice(0, REVIEWS_LIST.length);
  }, [REVIEWS_LIST.length]);

  useEffect(() => {
    const initAnimations = () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) {
        gsap.set([titleRef.current, ...reviewRefs.current], {
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

      if (titleRef.current && titleRef.current.isConnected) {
        gsap.fromTo(titleRef.current,
          {
            y: 50,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: createSafeScrollTrigger(titleRef.current, {
              start: "top 85%",
              end: "top 60%",
            })
          }
        );
      }

      reviewRefs.current.forEach((ref, index) => {
        if (!ref || !ref.isConnected) return;

        const avatarImg = ref.querySelector(`.${styles["review-avatar"]}`) as HTMLImageElement | null;
        
        const animateReview = () => {
          gsap.fromTo(ref,
            {
              y: 80,
              opacity: 0,
              scale: 0.95
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.7,
              ease: "power3.out",
              delay: index * 0.15,
              scrollTrigger: createSafeScrollTrigger(listRef.current, {
                start: "top 80%",
                end: "top 30%",
              })
            }
          );
        };

        if (avatarImg) {
          if (avatarImg.complete && avatarImg.naturalHeight !== 0) {
            animateReview();
          } else {
            avatarImg.addEventListener('load', animateReview, { once: true });
            setTimeout(animateReview, 1000);
          }
        } else {
          animateReview();
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

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleLoad);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleLoad);
      
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      reviewRefs.current.forEach((ref) => {
        if (!ref) return;
        const avatarImg = ref.querySelector(`.${styles["review-avatar"]}`) as HTMLImageElement | null;
        if (avatarImg) {
          avatarImg.removeEventListener('load', () => {});
        }
      });
    };
  }, []);

  return (
    <div className={styles.reviews} ref={sectionRef} id="reviews">
      <Wrapper className={styles["reviews-content"]}>
        <h2 ref={titleRef} className={styles["reviews-title"]}>
          отзывы
        </h2>
        <div ref={listRef} className={styles["reviews-list"]}>
          {REVIEWS_LIST.map((review, index) => (
            <div 
              ref={(el) => {
                reviewRefs.current[index] = el;
              }}
              className={styles.review} 
              key={index}
            >
              <div className={styles["review-header"]}>
                <img 
                  className={styles["review-avatar"]} 
                  src={review.avatar} 
                  alt={`Аватар ${review.name}`}
                  loading="lazy"
                  onLoad={() => ScrollTrigger.refresh()}
                />
                <div className={styles["review-header-info"]}>
                  <span className={styles["review-name"]}>{review.name}</span>
                  <span className={styles["review-age"]}>{review.age}</span>
                </div>
              </div>
              <p className={styles["review-text"]}>{review.text}</p>
            </div>
          ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default Reviews;