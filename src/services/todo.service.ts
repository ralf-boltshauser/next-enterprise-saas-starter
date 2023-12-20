import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const TodoService = {
  async createTodo(userId: number, title: string) {
    return await prisma.todo.create({
      data: {
        userId,
        title,
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

  async updateTodo(id: number, title: string, completed: boolean) {
    return await prisma.todo.update({
      where: {
        id,
      },
      data: {
        title,
        completed,
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
