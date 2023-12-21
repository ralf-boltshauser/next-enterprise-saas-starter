import { Todo } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/todos" }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => "/", // Lists all todos
      providesTags: ["Todos"],
    }),
    getTodoById: builder.query<Todo, number>({
      query: (id) => `/${id}`, // Gets a single todo by id
      providesTags: ["Todos"],
    }),
    addTodo: builder.mutation<Todo, Partial<Omit<Todo, "id">>>({
      query: (newTodo) => ({
        url: "/",
        method: "POST",
        body: newTodo,
      }),
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation<Todo, Partial<Todo>>({
      query: ({ id, ...updateData }) => ({
        url: `/${id}`, // Updates the todo by id
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: ["Todos"],
    }),
    removeTodo: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/${id}`, // Deletes the todo by id
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
  // Other configurations...
});

export const {
  useGetTodosQuery,
  useLazyGetTodosQuery,
  useGetTodoByIdQuery,
  useLazyGetTodoByIdQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useRemoveTodoMutation,
} = todosApi;
