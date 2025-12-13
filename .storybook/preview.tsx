import "../src/app/styles/variables.css";
import "../src/app/styles/fonts.css";
import "../src/app/styles/index.css";

import type { Preview } from "@storybook/react-vite";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import { store } from "../src/app/store";

export const globalTypes = {
   theme: {
      name: "Theme",
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
         icon: "circlehollow",
         items: [
            { value: "light", title: "Light" },
            { value: "dark", title: "Dark" },
         ],
      },
   },
};

const preview: Preview = {
   parameters: {
      controls: {
         matchers: {
            color: /(background|color)$/i,
            date: /Date$/i,
         },
      },
   },
   decorators: [
      (Story, context) => {
         const theme = context.globals.theme || "light";
         if (typeof document !== "undefined") {
            document.documentElement.setAttribute("data-theme", theme);
         }

         return (
            <Provider store={store}>
               <MemoryRouter initialEntries={["/"]}>
                  <Story />
               </MemoryRouter>
            </Provider>
         );
      },
   ],
};

export default preview;
