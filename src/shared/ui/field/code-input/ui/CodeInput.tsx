import clsx from "clsx";
import { use, useEffect, useRef } from "react";

import { Badge } from "@/shared/ui/badge";

import styles from "./CodeInput.module.scss";

export interface CodeInputProps {
   length?: number;
   type?: "numeric" | "alphanumeric";
   value?: string;
   onChange?: (v: string) => void;
   onComplete?: (v: string) => void;
   autoFocus?: boolean;
   disabled?: boolean;
}

export const CodeInput = ({
   length = 6,
   type = "numeric",
   value,
   onChange,
   onComplete,
   autoFocus = false,
   disabled = false,
}: CodeInputProps) => {
   const isControlled = typeof value === "string";
   const internalRef = useRef<HTMLInputElement[]>([]);
   const localValueRef = useRef<string>(value ?? "");
   const rootRef = useRef<HTMLDivElement | null>(null);
   useEffect(() => {
      if (isControlled) localValueRef.current = value ?? "";
   }, [value, isControlled]);

   // helpers
   const getChar = (s: string, i: number) => s[i] ?? "";
   const setValue = (newVal: string) => {
      if (!isControlled) localValueRef.current = newVal;
      onChange?.(newVal);
      if (newVal.length >= length) onComplete?.(newVal.slice(0, length));
   };

   useEffect(() => {
      if (autoFocus && internalRef.current[0]) internalRef.current[0].focus();
   }, [autoFocus]);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
      const ch = e.target.value;
      const allowed = type === "numeric" ? ch.replace(/\D/g, "") : ch;
      if (!allowed) return;

      const prev = isControlled ? (value ?? "") : localValueRef.current;
      const arr = prev.split("").slice(0, length);
      arr[idx] = allowed[allowed.length - 1]; // берем последний символ, если вставили
      const next = arr.join("").slice(0, length);
      setValue(next);

      // focus next empty
      const nextIdx = Math.min(idx + 1, length - 1);
      if (internalRef.current[nextIdx]) internalRef.current[nextIdx].focus();
   };

   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
      if (e.key === "Backspace") {
         const prev = isControlled ? (value ?? "") : localValueRef.current;
         if ((prev[idx] ?? "") === "") {
            // если текущ пустой, переходим назад и очищаем
            const prevIdx = Math.max(0, idx - 1);
            if (internalRef.current[prevIdx]) {
               internalRef.current[prevIdx].focus();
               const arr = prev.split("").slice(0, length);
               arr[prevIdx] = "";
               setValue(arr.join(""));
            }
         } else {
            const arr = (isControlled ? (value ?? "") : localValueRef.current).split("").slice(0, length);
            arr[idx] = "";
            setValue(arr.join(""));
         }
      } else if (e.key === "ArrowLeft") {
         internalRef.current[Math.max(0, idx - 1)]?.focus();
      } else if (e.key === "ArrowRight") {
         internalRef.current[Math.min(length - 1, idx + 1)]?.focus();
      }
   };

   const handleFocus = () => {
      if (internalRef.current[0]) {
         internalRef.current[0].focus();
      }
   };

   const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("Text");
      const filtered = type === "numeric" ? pasted.replace(/\D/g, "") : pasted;
      if (!filtered) return;
      const cut = filtered.slice(0, length);
      setValue(cut);
      // focus after last filled
      const last = Math.min(cut.length, length - 1);
      internalRef.current[last]?.focus();
   };

   const current = isControlled ? (value ?? "") : localValueRef.current;
   const arr = Array.from({ length }, (_, i) => getChar(current, i));

   return (
      <div ref={rootRef} onClick={handleFocus} className={styles.root} onPaste={handlePaste} aria-label="Код подтверждения">
         {arr.map((ch, i) => (
            <input
               key={i}
               ref={(el) => {
                  internalRef.current[i] = el!;
               }}
               placeholder="•"
               className={styles.input}
               value={ch}
               onChange={(e) => handleChange(e, i)}
               onKeyDown={(e) => handleKeyDown(e, i)}
               inputMode={type === "numeric" ? "numeric" : "text"}
               pattern={type === "numeric" ? "\\d*" : undefined}
               maxLength={1}
               disabled={disabled}
               aria-label={`Символ ${i + 1} из ${length}`}
               autoComplete="one-time-code"
            />
         ))}
      </div>
   );
};
