// pages/api/todos/index.ts

import { TodoService } from "@/services/todo.service";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Todo } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = session.user.id;

  try {
    if (req.method === "GET") {
      const todos = await TodoService.getTodosByUser(userId);
      return res.status(200).json(todos);
    } else if (req.method === "POST") {
      const todoData: Omit<Todo, "id"> = { ...req.body, userId };
      const newTodo = await TodoService.createTodo(todoData);
      return res.status(201).json(newTodo);
    } else {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
