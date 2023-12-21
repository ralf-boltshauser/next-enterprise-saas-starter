// pages/api/todos/[id].ts

import { TodoService } from "@/services/todo.service";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const todoId = parseInt(req.query.id as string, 10);
  if (isNaN(todoId)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    if (req.method === "GET") {
      const todo = await TodoService.getTodoById(todoId);
      return todo
        ? res.status(200).json(todo)
        : res.status(404).json({ message: "Todo not found" });
    } else if (req.method === "PUT") {
      const updateData = req.body;
      const updatedTodo = await TodoService.updateTodo(todoId, updateData);
      return res.status(200).json(updatedTodo);
    } else if (req.method === "DELETE") {
      await TodoService.deleteTodo(todoId);
      return res.status(204).end();
    } else {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
