import { ReactLenis } from "lenis/react";
import { type ReactNode, useEffect } from "react";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  useEffect(() => {
    // Опционально: можно отключить скроллбар
    const style = document.createElement('style');
    style.textContent = `
      .lenis.lenis-smooth [data-lenis-prevent] {
        overscroll-behavior: contain;
      }
      
      html.lenis,
      html.lenis body {
        height: auto;
      }
      
      .lenis.lenis-smooth {
        scroll-behavior: auto;
      }
      
      .lenis.lenis-stopped {
        overflow: hidden;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2, // Длительность анимации
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Кастомная easing функция
        orientation: "vertical", // Вертикальный скролл
        gestureOrientation: "vertical", // Для мобильных
        smoothWheel: true, // Плавный скролл колесиком
        wheelMultiplier: 1, // Чувствительность колесика
        touchMultiplier: 2, // Чувствительность тача
        infinite: false, // Бесконечный скролл
      }}
      autoRaf={true} // Автоматический requestAnimationFrame
    >
      {children}
    </ReactLenis>
  );
};

export default SmoothScrollProvider;