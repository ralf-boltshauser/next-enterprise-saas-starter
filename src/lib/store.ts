import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./features/todos/todosSlice";
import { todosApi } from "./features/todos/todosApi";

// export const makeStore = () => {
//   return configureStore({
//     reducer: {},
//   });
// };

// // Infer the type of makeStore
// export type AppStore = ReturnType<typeof makeStore>;
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<AppStore["getState"]>;
// export type AppDispatch = AppStore["dispatch"];

export const store = configureStore({
  reducer: {
    [todosApi.reducerPath]: todosApi.reducer,
    todos: todosSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
