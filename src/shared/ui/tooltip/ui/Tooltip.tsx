import { animated, useTransition } from "@react-spring/web";
import clsx from "clsx";
import { type ReactNode, useCallback, useLayoutEffect, useRef, useState } from "react";

import { Portal } from "@/shared/lib/portal/Portal";

import s from "./Tooltip.module.scss";

type Placement = "top" | "bottom" | "left" | "right";

interface TooltipProps {
   content: ReactNode;
   children: ReactNode;
   placement?: Placement;
   offset?: number;
   openDelay?: number;
   closeDelay?: number;
   className?: string;
}

export const Tooltip = ({
   content,
   children,
   placement = "top",
   offset = 8,
   openDelay = 100,
   closeDelay = 80,
   className,
}: TooltipProps) => {
   const anchorRef = useRef<HTMLSpanElement | null>(null);
   const bubbleRef = useRef<HTMLDivElement | null>(null);
   const [open, setOpen] = useState(false);
   const openTimer = useRef<number | null>(null);
   const closeTimer = useRef<number | null>(null);

   const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);

   const clearTimers = () => {
      if (openTimer.current) {
         window.clearTimeout(openTimer.current);
         openTimer.current = null;
      }
      if (closeTimer.current) {
         window.clearTimeout(closeTimer.current);
         closeTimer.current = null;
      }
   };

   const show = () => {
      clearTimers();
      openTimer.current = window.setTimeout(() => setOpen(true), openDelay);
   };
   const hide = () => {
      clearTimers();
      closeTimer.current = window.setTimeout(() => setOpen(false), closeDelay);
   };

   const updatePosition = useCallback(() => {
      const anchor = anchorRef.current;
      const bubble = bubbleRef.current;
      if (!anchor || !bubble) return;

      const a = anchor.getBoundingClientRect();
      const b = bubble.getBoundingClientRect();

      let top = 0;
      let left = 0;

      switch (placement) {
         case "top":
            top = a.top - b.height - offset;
            left = a.left + a.width / 2 - b.width / 2;
            break;
         case "bottom":
            top = a.bottom + offset;
            left = a.left + a.width / 2 - b.width / 2;
            break;
         case "left":
            top = a.top + a.height / 2 - b.height / 2;
            left = a.left - b.width - offset;
            break;
         case "right":
            top = a.top + a.height / 2 - b.height / 2;
            left = a.right + offset;
            break;
      }

      const pad = 8;
      const maxLeft = window.innerWidth - b.width - pad;
      setCoords({
         top: Math.max(pad, Math.min(top, window.innerHeight - b.height - pad)),
         left: Math.max(pad, Math.min(left, maxLeft)),
      });
   }, [placement, offset]);

   useLayoutEffect(() => {
      if (!open) return;
      // Первый кадр: дождаться монтажа пузыря, затем посчитать позицию
      requestAnimationFrame(updatePosition);

      const onScroll = () => updatePosition();
      const onResize = () => updatePosition();
      window.addEventListener("scroll", onScroll, true); // true — ловим скролл в дочерних контейнерах
      window.addEventListener("resize", onResize);

      return () => {
         window.removeEventListener("scroll", onScroll, true);
         window.removeEventListener("resize", onResize);
      };
   }, [open, updatePosition]);

   const transitions = useTransition(open, {
      from: { opacity: 0, transform: "scale(0.98)" },
      enter: { opacity: 1, transform: "scale(1)" },
      leave: { opacity: 0, transform: "scale(0.98)" },
      config: { duration: 120 }, // сдержанная анимация в духе AntD
   });

   return (
      <span ref={anchorRef} className={clsx(s.anchor, className)} onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
         {children}

         <Portal>
            {transitions(
               (style, item) =>
                  item &&
                  content && (
                     <animated.div
                        ref={bubbleRef}
                        style={{
                           ...style,
                           position: "fixed",
                           top: coords?.top ?? -9999,
                           left: coords?.left ?? -9999,
                           pointerEvents: "auto",
                        }}
                        className={clsx(s.tooltip, s[placement])}
                        role="tooltip"
                     >
                        <div className={s.content}>{content}</div>
                        <span className={s.arrow} />
                     </animated.div>
                  ),
            )}
         </Portal>
      </span>
   );
};
