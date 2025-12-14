import "@/app/styles/fonts.css";
import "@/app/styles/index.css";
import "@/app/styles/reset.css";
import "@/app/styles/variables.css";
import 'react-datepicker/dist/react-datepicker.css';

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { ReduxProvider } from "./providers/ReduxProvider";
import { ThemeProvider } from "./providers/ThemeProvider";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
   <React.StrictMode>
      <ReduxProvider>
               <ThemeProvider>
                  <App />
            </ThemeProvider>
      </ReduxProvider>
   </React.StrictMode>,
);
