// pages/api/todos.ts

import { TodoService } from "@/services/todo.service";
import type { NextApiRequest, NextApiResponse } from "next";
import { Session, getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the session from NextAuth.js
  const session = (await getServerSession(req, res, authOptions)) as Session;
  if (!session || !session.user) {
    // Not signed in
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Assuming TodoService uses the email to find the associated userId
  const userId = session.user.id; // Or however you have your user ID stored

  try {
    switch (req.method) {
      case "GET":
        // Handle GET request, e.g., get all todos for the user
        const todos = await TodoService.getTodosByUser(userId);
        return res.status(200).json(todos);

      case "POST":
        // Handle POST request, e.g., create a new todo
        const { title } = req.body;
        const newTodo = await TodoService.createTodo(userId, title);
        return res.status(201).json(newTodo);

      case "DELETE":
        // Handle DELETE request, e.g., delete a todo
        const { todoId } = req.body;
        await TodoService.deleteTodo(todoId);
        return res.status(204).end();

      default:
        // Method Not Allowed
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
}
