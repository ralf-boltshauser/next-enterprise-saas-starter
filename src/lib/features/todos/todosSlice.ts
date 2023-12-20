import { Todo } from "@prisma/client";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const todosAdapter = createEntityAdapter<Todo>();
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: todosAdapter.getInitialState(),
  reducers: {
    addTodo: todosAdapter.addOne,
    removeTodo: todosAdapter.removeOne,
    updateTodo: (state, action: PayloadAction<Todo>) => {
      todosAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      });
    },
    toggleTodo(state, action: PayloadAction<Todo>) {
      const todo = state.entities[action.payload.id];
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addTodo, removeTodo, updateTodo, toggleTodo } =
  todosSlice.actions;

export default todosSlice.reducer;
