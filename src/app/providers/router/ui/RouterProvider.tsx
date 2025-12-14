import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { PublicLayout } from "@/app/layouts/public";
import HomePage from "@/pages/home/ui/HomePage";
import { Loader } from "@/shared/ui/loader";


export const AppRouter = () => {
   return (
      <BrowserRouter>
         <Suspense fallback={<Loader />}>
            <Routes>
               <Route element={<PublicLayout />}>
                  <Route element={<HomePage />} path={"/"} />
               </Route>
               <Route path="*" element={<HomePage />} />
            </Routes>
         </Suspense>
      </BrowserRouter>
   );
};
