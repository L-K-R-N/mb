import type { store } from "@/app/store"; // пришлось импортировать из app в shared, но по другому никак. Это лучший вариант, тк после компиляции типы удаляются

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
