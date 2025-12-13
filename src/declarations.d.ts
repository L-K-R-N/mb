// Для стандартных изображений
declare module "*.png" {
   const value: string;
   export default value;
}

declare module "*.jpg" {
   const value: string;
   export default value;
}

declare module "*.jpeg" {
   const value: string;
   export default value;
}

declare module "*.webp" {
   const value: string;
   export default value;
}

// Для SVG (как файлов)
declare module "*.svg" {
   const content: string;
   export default content;
}
