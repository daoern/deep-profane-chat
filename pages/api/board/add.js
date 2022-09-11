import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default async function handler(req, res) {
  const session = await getSession({ req });

  const { boardName, boardTitle, boardDomain } = req.body;

  if (!session) {
    res.status(500).send({
      content: "Not authenticated",
    });
    return;
  }

  const generateKey = (length) => {
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  };

  const newBoard = await prisma.board.create({
    data: {
      name: boardName,
      title: boardTitle,
      domain: boardDomain,
      ownerEmail: session.user.email,
      key: generateKey(32),
    },
  });

  res.status(200).json(newBoard);
}
