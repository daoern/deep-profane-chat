import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  const { boardName, boardDomain } = req.body;

  if (!session) {
    res.status(500).send({
      content: "Not authenticated",
    });
    return;
  }

  const newBoard = await prisma.board.create({
    data: {
      name: boardName,
      ownerEmail: session.user.email,
    },
  });

  res.status(200).json(newBoard);
}
