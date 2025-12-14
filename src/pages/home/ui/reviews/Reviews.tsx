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
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      gsap.set([titleRef.current, ...reviewRefs.current], {
        y: 0,
        opacity: 1
      });
      return;
    }

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
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          end: "top 60%",
          toggleActions: "play none none none",
          once: true,
        }
      }
    );

    reviewRefs.current.forEach((ref, index) => {
      if (!ref) return;

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
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 80%",
            end: "top 30%",
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
    <div className={styles.reviews} ref={sectionRef} id="reviews">
      <Wrapper className={styles["reviews-content"]}>
        <h2 ref={titleRef} className={styles["reviews-title"]}>
          отзывы
        </h2>
        <div ref={listRef} className={styles["reviews-list"]}>
          {REVIEWS_LIST.map((review, index) => (
            <div 
              ref={(el) => {
                reviewRefs.current[index] = el
              }}
              className={styles.review} 
              key={index}
            >
              <div className={styles["review-header"]}>
                <img 
                  className={styles["review-avatar"]} 
                  src={review.avatar} 
                  alt={`review avatar ${index}`} 
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