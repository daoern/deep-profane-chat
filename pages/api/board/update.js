import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  const { boardId, boardName, boardTitle, boardDomain } = req.body;

  if (!session) {
    res.status(500).send({
      content: "Not authenticated",
    });
    return;
  }

  const newBoard = await prisma.board.update({
    where: {
      id: parseInt(boardId),
    },
    data: {
      name: boardName,
      title: boardTitle,
      domain: boardDomain,
    },
  });

  res.status(200).json(newBoard);
}
