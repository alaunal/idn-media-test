// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { faker } from "@faker-js/faker";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const limit: number = parseInt(req.query.limit as string);

  const setLimit = limit ?? 10;

  const news = [...new Array(setLimit)].map(() => {
    return {
      id: faker.datatype.uuid(),
      title: faker.lorem.lines(),
      image: faker.image.business(640, 480, true),
      date: faker.date.past(),
      category: faker.helpers.arrayElement(["free", "basic", "business"]),
    };
  });

  res.status(200).json(news);
};
