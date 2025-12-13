import { type ReactNode, useLayoutEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
   children: ReactNode;
   container?: Element | null;
}

export const Portal = ({ children, container }: PortalProps) => {
   const [mounted, setMounted] = useState(false);
   const el = useMemo(() => (typeof document !== "undefined" ? document.createElement("div") : null), []);

   useLayoutEffect(() => {
      if (!el) return;
      const target = container ?? document.body;
      el.style.position = "fixed";
      el.style.inset = "0";
      el.style.pointerEvents = "none";
      el.style.zIndex = "100000";
      target.appendChild(el);
      setMounted(true);
      return () => {
         setMounted(false);
         target.removeChild(el);
      };
   }, [el, container]);

   if (!el || !mounted) return null;
   return createPortal(children, el);
};
