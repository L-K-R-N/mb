import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import styles from './BurgerMenu.module.scss';

interface BurgerMenuProps {
  onItemClick?: (path: string) => void;
}

const BurgerMenu = ({ onItemClick }: BurgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const burgerRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const menuItems = [
    { id: 1, label: 'ОБО МНЕ', path: '#about' },
    { id: 2, label: 'ПОРТФОЛИО', path: '#portfolio' },
    { id: 3, label: 'ОТЗЫВЫ', path: '#reviews' },
    { id: 4, label: 'СТОИМОСТЬ', path: '#cost' },
  ];

  useEffect(() => {
    const burger = burgerRef.current;
    if (!burger) return;

    const lines = burger.querySelectorAll(`.${styles.line}`);
    
    if (isOpen) {
      gsap.to(lines[0], { rotation: 45, y: 7, duration: 0.3 });
      gsap.to(lines[1], { opacity: 0, duration: 0.2 });
      gsap.to(lines[2], { rotation: -45, y: -7, duration: 0.3 });
    } else {
      gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3 });
      gsap.to(lines[1], { opacity: 1, duration: 0.2 });
      gsap.to(lines[2], { rotation: 0, y: 0, duration: 0.3 });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      menuItemsRef.current.forEach((item, index) => {
        if (!item) return;
        
        gsap.set(item, { display: 'block' });
        
        gsap.fromTo(item,
          {
            x: -50,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.1,
            ease: "power2.out"
          }
        );
      });
    } else {
      menuItemsRef.current.forEach((item, index) => {
        if (!item) return;
        
        gsap.to(item,
          {
            x: -50,
            opacity: 0,
            duration: 0.4,
            delay: index * 0.05,
            ease: "power2.in",
            onComplete: () => {
              if (index === menuItemsRef.current.length - 1) {
                menuItemsRef.current.forEach(el => {
                  if (el) gsap.set(el, { display: 'none' });
                });
              }
            }
          }
        );
      });
    }
  }, [isOpen]);

  const handleBurgerClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (path: string) => {
    if (onItemClick) {
      onItemClick(path);
    }
    setIsOpen(false);
  };

  return (
    <div className={styles.burgerMenu}>
      <div 
        ref={burgerRef} 
        className={styles.burger}
        onClick={handleBurgerClick}
      >
        <span className={styles.line} />
        <span className={styles.line} />
        <span className={styles.line} />
      </div>

      <div className={styles.menu}>
        {menuItems.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
            menuItemsRef.current[index] = el;
          }}
            className={styles.menuItem}
            onClick={() => handleItemClick(item.path)}
            style={{ display: 'none' }}
          >
            <a className={styles.text} href={item.path}>{item.label}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BurgerMenu;