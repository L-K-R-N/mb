import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "@/features/theme/model/themeSlice";

export const store = configureStore({
   reducer: {
      theme: themeReducer,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
