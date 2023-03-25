// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const array = [
    {
      data: {
        releaseId: 1,
        s3Key: "Totally Captivated/0001 - Episode 1/001.webp",
        width: 720,
        number: 1,
        height: 1029,
      },
    },
    {
      data: {
        releaseId: 1,
        s3Key: "Totally Captivated/0001 - Episode 1/004.webp",
        width: 720,
        number: 4,
        height: 1029,
      },
    },
  ];
  array.forEach(async (page) => {
    await prisma.page.create({
      data: {
        release: { connect: { id: page.data.releaseId } },
        s3Key: page.data.s3Key,
        weidth: page.data.width,
        number: page.data.number,
        height: page.data.height,
      },
    });
  });
  res.status(200).json({ name: "John Doe" });
}
