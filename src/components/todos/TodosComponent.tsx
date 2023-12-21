import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  List,
  ListItem,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { Todo } from "@prisma/client";
import {
  useAddTodoMutation,
  useGetTodosQuery,
  useRemoveTodoMutation,
  useUpdateTodoMutation,
} from "@/lib/features/todos/todos.api";

const TodosComponent = () => {
  const [input, setInput] = useState("");
  const { data: todos, isLoading, isError, error } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [removeTodo] = useRemoveTodoMutation();
  // update todo
  const [updateTodo] = useUpdateTodoMutation();

  const handleAddTodo = async () => {
    if (input.trim() !== "") {
      // Assuming you have a way to generate unique IDs for new todos
      await addTodo({
        title: input.trim(),
        completed: false,
      });
      setInput("");
    }
  };

  const handleDeleteTodo = async (id: number) => {
    // await removeTodo({ id });
    await updateTodo({
      id,
      completed: true,
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching todos</div>;

  return (
    <Box>
      <Box display="flex" mb={4}>
        <Input
          placeholder="Add a new todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
        />
        <Button ml={2} onClick={handleAddTodo}>
          Add
        </Button>
      </Box>
      <List>
        {todos?.map((todo: Todo) => (
          <ListItem key={todo.id} display="flex" alignItems="center" mb={2}>
            {todo.title}
            <IconButton
              aria-label="Delete todo"
              icon={<CloseIcon />}
              onClick={() => handleDeleteTodo(todo.id)}
              ml={2}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TodosComponent;
