import { useLayoutEffect, useState } from 'react';

export type DeviceType = 'desktop' | 'tablet' | 'mobile';

interface UseDeviceTypeOptions {
  tabletBreakpoint?: number;
  mobileBreakpoint?: number;
}

const useDeviceType = ({
  tabletBreakpoint = 800,
  mobileBreakpoint = 400
}: UseDeviceTypeOptions = {}): DeviceType => {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  useLayoutEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      
      if (width <= mobileBreakpoint) {
        setDeviceType('mobile');
      } else if (width <= tabletBreakpoint) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    checkDeviceType();

    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkDeviceType, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [tabletBreakpoint, mobileBreakpoint]);

  return deviceType;
};

export default useDeviceType;