// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { faker } from "@faker-js/faker";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const limit: number = parseInt(req.query.limit as string);

  const setLimit = limit ?? 10;

  const quiz = [...new Array(setLimit)].map(() => {
    return {
      id: faker.datatype.uuid(),
      title: faker.lorem.sentence(4),
      image: faker.image.business(500, 500, true),
      views: faker.datatype.number(9999),
      category: faker.helpers.arrayElement(["education", "live", "comedy", "fun"]),
    };
  });

  res.status(200).json(quiz);
};
