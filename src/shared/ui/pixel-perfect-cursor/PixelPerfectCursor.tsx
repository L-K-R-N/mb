// shared/ui/custom-cursor/PixelPerfectCursor.tsx
import clsx from 'clsx';
import gsap from 'gsap';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './PixelPerfectCursor.module.scss';

const PixelPerfectCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [cursorStyle, setCursorStyle] = useState<'dark' | 'light'>('dark');
  const requestRef = useRef<number>();

  // Создаем канвас для анализа цвета пикселей
  const initCanvas = useCallback(() => {
    if (!canvasRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      canvas.style.display = 'none';
      canvasRef.current = canvas;
      document.body.appendChild(canvas);
    }
  }, []);

  // Функция определения цвета через канвас
  const getPixelColor = useCallback((x: number, y: number): 'dark' | 'light' => {
    if (!canvasRef.current) return 'dark';

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return 'dark';

    // Сохраняем текущий канвас
    ctx.save();
    
    // Устанавливаем размеры
    canvasRef.current.width = 3;
    canvasRef.current.height = 3;
    
    // Позиционируем
    ctx.translate(-x + 1, -y + 1);
    
    // Рисуем всю страницу в маленьком канвасе
    const html = document.documentElement;
    ctx.drawWindow(window, x - 1, y - 1, 3, 3, 'rgb(255,255,255)');
    
    // Получаем цвет центрального пикселя
    const imageData = ctx.getImageData(1, 1, 1, 1);
    const [r, g, b] = imageData.data;
    
    // Восстанавливаем контекст
    ctx.restore();
    
    // Вычисляем яркость
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    return brightness > 128 ? 'dark' : 'light';
  }, []);

  // Анимация курсора
  useEffect(() => {
    if (!cursorRef.current) return;

    gsap.to(cursorRef.current, {
      x: position.x,
      y: position.y,
      duration: 0.08,
      ease: "power2.out"
    });
  }, [position]);

  // Основной цикл
  useEffect(() => {
    initCanvas();
    
    const animate = () => {
      // Обновляем цвет курсора
      const color = getPixelColor(position.x, position.y);
      setCursorStyle(color);
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (canvasRef.current && canvasRef.current.parentNode) {
        canvasRef.current.parentNode.removeChild(canvasRef.current);
      }
    };
  }, [position, initCanvas, getPixelColor]);

  // Обработчики событий
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Проверяем, десктоп ли это
    const isDesktop = !('ontouchstart' in window) && window.matchMedia('(hover: hover)').matches;
    
    if (isDesktop) {
      const style = document.createElement('style');
      style.textContent = `
        * {
          cursor: none !important;
        }
        
        input, textarea, select, button {
          cursor: auto !important;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  return (
    <div 
      ref={cursorRef}
      className={clsx(
        styles.cursor,
        isVisible && styles.visible,
        cursorStyle === 'light' ? styles.light : styles.dark
      )}
    />
  );
};

export default PixelPerfectCursor;