import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req });

  const { commentId } = req.body;

  if (!session) {
    res.status(500).send({
      content: "Not authenticated",
    });
    return;
  }

  const newComment = await prisma.comment.update({
    where: {
      id: parseInt(commentId),
    },
    data: {
      deleted: true,
    },
  });

  res.status(200).json(newComment);
}
