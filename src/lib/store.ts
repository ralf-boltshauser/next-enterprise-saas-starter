import { configureStore } from "@reduxjs/toolkit";
import { todosApi } from "./features/todos/todos.api";

export const store = configureStore({
  reducer: {
    [todosApi.reducerPath]: todosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
