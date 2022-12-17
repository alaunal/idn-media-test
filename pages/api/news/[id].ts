import { faker } from "@faker-js/faker";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  const news = {
    id: id,
    title: faker.lorem.lines(2),
    image: faker.image.business(640, 480, true),
    date: faker.date.past(),
    context: faker.lorem.paragraphs(5),
    category: faker.helpers.arrayElement([
      "free",
      "basic",
      "business",
      "music",
    ]),
  };

  res.status(200).json(news);
};
