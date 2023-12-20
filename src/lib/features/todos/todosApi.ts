// services/todoApi.ts

import { Todo } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/todos" }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => "/",
      providesTags: ["Todos"],
    }),
    addTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (initialTodo) => ({
        url: "/",
        method: "POST",
        body: initialTodo,
      }),
      // Optimistic update
      invalidatesTags: ["Todos"],
    }),
    removeTodo: builder.mutation<void, { todoId: number }>({
      query: ({ todoId }) => ({
        url: "/",
        method: "DELETE",
        body: { todoId },
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
  // Other configurations...
});

export const { useGetTodosQuery, useAddTodoMutation, useRemoveTodoMutation } =
  todosApi;
