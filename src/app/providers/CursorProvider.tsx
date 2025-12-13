import CustomCursor from '@/shared/ui/custom-cursor/CustomCursor.module';
import { type ReactNode, useEffect, useState } from 'react';

interface CursorProviderProps {
  children: ReactNode;
  enabled?: boolean;
}

const CursorProvider = ({ children, enabled = true }: CursorProviderProps) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Проверяем, тач-ли устройство
    const checkTouchDevice = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      );
    };

    setIsTouchDevice(checkTouchDevice());
  }, []);

  // Не показываем кастомный курсор на тач-устройствах
  if (!enabled || isTouchDevice) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <CustomCursor />
      {/* <PixelPerfectCursor /> */}
    </>
  );
};

export default CursorProvider;