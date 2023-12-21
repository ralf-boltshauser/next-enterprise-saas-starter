import { PrismaClient, Todo } from "@prisma/client";

const prisma = new PrismaClient();

export const TodoService = {
  async createTodo(todoData: Omit<Todo, "id">) {
    return await prisma.todo.create({
      data: {
        ...todoData,
      },
    });
  },

  async getTodosByUser(userId: number) {
    return await prisma.todo.findMany({
      where: {
        userId,
      },
    });
  },

  async getTodoById(id: number) {
    return await prisma.todo.findUnique({
      where: { id },
    });
  },

  async updateTodo(id: number, todoData: Partial<Omit<Todo, "id">>) {
    return await prisma.todo.update({
      where: {
        id,
      },
      data: {
        ...todoData,
      },
    });
  },

  async deleteTodo(id: number) {
    return await prisma.todo.delete({
      where: {
        id,
      },
    });
  },
};
