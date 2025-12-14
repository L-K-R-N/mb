
import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './CustomCursor.module.scss';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [cursorColor, setCursorColor] = useState<'dark' | 'light'>('dark');
  const debounceTimer = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${position.x}px`;
      cursorRef.current.style.top = `${position.y}px`;
    }
  }, [position]);

  const getContrastColor = useCallback((x: number, y: number): 'dark' | 'light' => {
    const element = document.elementFromPoint(x, y);
    if (!element) return 'dark';

    let currentElement: HTMLElement | null = element as HTMLElement;
    let bgColor = '';
    let maxDepth = 5;

    while (currentElement && maxDepth > 0) {
      const computedStyle = window.getComputedStyle(currentElement);
      bgColor = computedStyle.backgroundColor;
      
      if (bgColor && 
          bgColor !== 'rgba(0, 0, 0, 0)' && 
          bgColor !== 'transparent') {
        
        const rgbaMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d+))?\)/);
        if (rgbaMatch) {
          const alpha = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1;
          if (alpha > 0.1) { 
            break;
          }
        }
      }
      
      currentElement = currentElement.parentElement;
      maxDepth--;
    }

    if (!bgColor || bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
      const style = window.getComputedStyle(element);
      const textColor = style.color;
      const textRgb = textColor.match(/\d+/g);
      
      if (textRgb && textRgb.length >= 3) {
        const [r, g, b] = textRgb.map(Number);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 160 ? 'light' : 'dark';
      }
      
      return 'dark';
    }

    const rgb = bgColor.match(/\d+/g);
    if (!rgb || rgb.length < 3) return 'dark';

    const [r, g, b] = rgb.map(Number);
    
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    let alpha = 1;
    if (rgb.length === 4) {
      alpha = parseFloat(rgb[3]);
    }
    
    if (alpha < 0.3) {
      return 'dark';
    }
    
    return brightness > 160 ? 'dark' : 'light';
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      
      debounceTimer.current = setTimeout(() => {
        const color = getContrastColor(e.clientX, e.clientY);
        setCursorColor(color);
      }, 10);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

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