// import clsx from 'clsx';
// import gsap from 'gsap';
// import { useCallback, useEffect, useRef, useState } from 'react';
// import styles from './CustomCursor.module.scss';

// const CustomCursor = () => {
//   const cursorRef = useRef<HTMLDivElement>(null);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [isVisible, setIsVisible] = useState(false);
//   const [cursorColor, setCursorColor] = useState<'dark' | 'light'>('dark');
//   const debounceTimer = useRef<NodeJS.Timeout>();

//   // Плавное движение с GSAP
//   useEffect(() => {
//     if (!cursorRef.current) return;

//     gsap.to(cursorRef.current, {
//       x: position.x,
//       y: position.y,
//       duration: 0.1,
//       ease: "power2.out"
//     });
//   }, [position]);

//   // Функция для определения цвета курсора на основе фона
//   const getContrastColor = useCallback((x: number, y: number): 'dark' | 'light' => {
//     const element = document.elementFromPoint(x, y);
//     if (!element) return 'dark';

//     let currentElement: HTMLElement | null = element as HTMLElement;
//     let bgColor = '';
//     let maxDepth = 5; // Максимальная глубина поиска

//     // Ищем цвет фона элемента и его родителей
//     while (currentElement && maxDepth > 0) {
//       const computedStyle = window.getComputedStyle(currentElement);
//       bgColor = computedStyle.backgroundColor;
      
//       // Проверяем, не прозрачный ли цвет
//       if (bgColor && 
//           bgColor !== 'rgba(0, 0, 0, 0)' && 
//           bgColor !== 'transparent' && 
//           !bgColor.includes('rgba(0, 0, 0, 0)')) {
//         break;
//       }
      
//       currentElement = currentElement.parentElement;
//       maxDepth--;
//     }

//     if (!bgColor || bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
//       return 'dark';
//     }

//     // Парсим цвет
//     const rgb = bgColor.match(/\d+/g);
//     if (!rgb || rgb.length < 3) return 'dark';

//     const [r, g, b] = rgb.map(Number);
    
//     // Формула яркости (0-255)
//     const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
//     // Также учитываем прозрачность
//     let alpha = 1;
//     if (rgb.length === 4) {
//       alpha = parseFloat(rgb[3]);
//     }
    
//     // Если фон прозрачный или очень светлый - темный курсор
//     // Если фон темный - светлый курсор
//     const effectiveBrightness = brightness * alpha + (255 * (1 - alpha));
    
//     return effectiveBrightness > 128 ? 'dark' : 'light';
//   }, []);

//   // Обработчики мыши
//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       setPosition({ x: e.clientX, y: e.clientY });
      
//       // Дебаунс для производительности
//       if (debounceTimer.current) {
//         clearTimeout(debounceTimer.current);
//       }
      
//       debounceTimer.current = setTimeout(() => {
//         const color = getContrastColor(e.clientX, e.clientY);
//         setCursorColor(color);
//       }, 16); // ~60fps
//     };

//     const handleMouseEnter = () => setIsVisible(true);
//     const handleMouseLeave = () => setIsVisible(false);

//     window.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseenter', handleMouseEnter);
//     document.addEventListener('mouseleave', handleMouseLeave);

//     // Скрываем стандартный курсор только на десктопе
//     const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
//     if (isDesktop) {
//       document.body.style.cursor = 'none';
//     }

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseenter', handleMouseEnter);
//       document.removeEventListener('mouseleave', handleMouseLeave);
//       if (debounceTimer.current) {
//         clearTimeout(debounceTimer.current);
//       }
//       document.body.style.cursor = 'auto';
//     };
//   }, [getContrastColor]);

//   return (
//     <div 
//       ref={cursorRef}
//       className={clsx(
//         styles.cursor,
//         isVisible && styles.visible,
//         cursorColor === 'light' ? styles.light : styles.dark
//       )}
//     />
//   );
// };

// export default CustomCursor;

// shared/ui/custom-cursor/CustomCursor.module.tsx
import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './CustomCursor.module.scss';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [cursorColor, setCursorColor] = useState<'dark' | 'light'>('dark');
  const debounceTimer = useRef<NodeJS.Timeout>();

  // Обновляем позицию курсора напрямую
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${position.x}px`;
      cursorRef.current.style.top = `${position.y}px`;
    }
  }, [position]);

  // Функция для определения цвета курсора на основе фона
  const getContrastColor = useCallback((x: number, y: number): 'dark' | 'light' => {
    const element = document.elementFromPoint(x, y);
    if (!element) return 'dark';

    // Ищем элемент с реальным фоном
    let currentElement: HTMLElement | null = element as HTMLElement;
    let bgColor = '';
    let maxDepth = 5;

    while (currentElement && maxDepth > 0) {
      const computedStyle = window.getComputedStyle(currentElement);
      bgColor = computedStyle.backgroundColor;
      
      // Проверяем, не прозрачный ли цвет
      if (bgColor && 
          bgColor !== 'rgba(0, 0, 0, 0)' && 
          bgColor !== 'transparent') {
        
        // Проверяем альфа-канал
        const rgbaMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d+))?\)/);
        if (rgbaMatch) {
          const alpha = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1;
          if (alpha > 0.1) { // Если достаточно непрозрачный
            break;
          }
        }
      }
      
      currentElement = currentElement.parentElement;
      maxDepth--;
    }

    if (!bgColor || bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
      // Если не нашли фон, смотрим на цвет текста
      const style = window.getComputedStyle(element);
      const textColor = style.color;
      const textRgb = textColor.match(/\d+/g);
      
      if (textRgb && textRgb.length >= 3) {
        const [r, g, b] = textRgb.map(Number);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 160 ? 'light' : 'dark';
      }
      
      return 'dark'; // По умолчанию темный
    }

    // Парсим цвет
    const rgb = bgColor.match(/\d+/g);
    if (!rgb || rgb.length < 3) return 'dark';

    const [r, g, b] = rgb.map(Number);
    
    // Формула яркости (0-255)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    // Учитываем прозрачность
    let alpha = 1;
    if (rgb.length === 4) {
      alpha = parseFloat(rgb[3]);
    }
    
    // Если альфа низкая, считаем что фон светлый
    if (alpha < 0.3) {
      return 'dark';
    }
    
    // Корректируем порог для лучшей видимости
    return brightness > 160 ? 'dark' : 'light';
  }, []);

  // Обработчики мыши
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Дебаунс для производительности
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      
      debounceTimer.current = setTimeout(() => {
        const color = getContrastColor(e.clientX, e.clientY);
        setCursorColor(color);
      }, 10); // Быстрее
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Скрываем стандартный курсор
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (isDesktop) {
      document.body.style.cursor = 'none';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      document.body.style.cursor = 'auto';
    };
  }, [getContrastColor]);

  return (
    <div 
      ref={cursorRef}
      className={clsx(
        styles.cursor,
        isVisible && styles.visible,
        cursorColor === 'light' ? styles.light : styles.dark
      )}
    />
  );
};

export default CustomCursor;