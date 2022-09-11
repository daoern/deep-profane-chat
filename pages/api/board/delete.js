import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  const { boardId } = req.body;

  if (!session) {
    res.status(500).send({
      content: "Not authenticated",
    });
    return;
  }

  await prisma.board.delete({
    where: {
      id: parseInt(boardId),
    },
  });

  res.status(200).json({});
}
