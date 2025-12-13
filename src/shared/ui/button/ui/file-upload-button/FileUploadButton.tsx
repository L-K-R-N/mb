import clsx from "clsx";
import { useRef } from "react";

import { Button, type ButtonProps } from "../button/Button";
import styles from "./FileUploadButton.module.scss";

export interface FileUploadButtonProps extends ButtonProps {
   accept?: string;
   onFileUpload?: (file: File | null) => void;
}

export const FileUploadButton = ({ accept = "image/*", onFileUpload, onClick, ...props }: FileUploadButtonProps) => {
   const fileInputRef = useRef<HTMLInputElement | null>(null);

   const handleButtonClick = () => {
      fileInputRef.current?.click();
      onClick?.();
   };

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      onFileUpload?.(file);
   };

   return (
      <>
         <Button onClick={handleButtonClick} {...props} />
         <input
            placeholder="Загрузите файл"
            className={styles.input}
            type="file"
            accept={accept}
            ref={fileInputRef}
            onChange={handleFileChange}
         />
      </>
   );
};
