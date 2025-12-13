import "@/app/styles/fonts.css";
import "@/app/styles/index.css";
import "@/app/styles/reset.css";
import "@/app/styles/variables.css";
import 'react-datepicker/dist/react-datepicker.css';

import { ConfigProvider, type ThemeConfig } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { ReduxProvider } from "./providers/ReduxProvider";
import { ThemeProvider } from "./providers/ThemeProvider";

const antdConfig: ThemeConfig = {
   token: {
      colorPrimary: "#29b78f",
      fontFamily: `"Inter Tight"`,
   },
};

// if (process.env.NODE_ENV === "development") {
//    const { worker } = await import("@/app/mocks/browser");
//    worker.start();
// }

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
   <React.StrictMode>
      <ReduxProvider>
               <ThemeProvider>
               <ConfigProvider theme={antdConfig}>
                  <App />
               </ConfigProvider>
            </ThemeProvider>
      </ReduxProvider>
   </React.StrictMode>,
);
