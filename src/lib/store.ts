import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./features/todos/todosSlice";
import { todosApi } from "./features/todos/todos.api";

export const store = configureStore({
  reducer: {
    [todosApi.reducerPath]: todosApi.reducer,
    todos: todosSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
