import { ReactLenis } from "lenis/react";
import { type ReactNode, useEffect } from "react";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  useEffect(() => {
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
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        orientation: "vertical", 
        gestureOrientation: "vertical", 
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2, 
        infinite: false, 
      }}
      autoRaf={true} 
    >
      {children}
    </ReactLenis>
  );
};

export default SmoothScrollProvider;