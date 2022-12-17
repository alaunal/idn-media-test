// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { faker } from "@faker-js/faker";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const limit: number = parseInt(req.query.limit as string);

  const setLimit = limit ?? 10;

  const liveStream = [...new Array(setLimit)].map(() => {
    return {
      id: faker.datatype.uuid(),
      title: faker.lorem.sentence(4),
      image: faker.image.technics(400, 640, true),
      category: faker.helpers.arrayElement(["music", "live", "comedy", "artists"]),
    };
  });

  res.status(200).json(liveStream);
};
