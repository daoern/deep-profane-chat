import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req });

  const { boardId, comment } = req.body;

  if (!session) {
    res.status(500).send({
      content: "Not authenticated",
    });
    return;
  }
  const newComment = await prisma.comment.create({
    data: {
      boardId: parseInt(boardId),
      userEmail: session.user.email,
      content: comment,
    },
    include: {
      user: {
        select: { name: true },
      },
    },
  });

  res.status(200).json(newComment);
}
