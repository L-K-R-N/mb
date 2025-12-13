import { type DependencyList, useEffect, useState } from "react";

export const useFakeLoading = (delay: number = 1500, deps: DependencyList = []) => {
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      setIsLoading(true);
      const timer = setTimeout(() => {
         setIsLoading(false);
      }, delay);

      return () => clearTimeout(timer);
   }, [...deps]);

   return isLoading;
};
