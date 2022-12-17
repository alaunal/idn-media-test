// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { faker } from "@faker-js/faker";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {

  const profile = {
    title: faker.name.jobTitle(),
    name: faker.name.fullName(),
    image: faker.image.people(480, 480, true),
    follower: faker.datatype.number(9999),
    following: faker.datatype.number(9999),
    bio: faker.lorem.lines(),
  };

  res.status(200).json(profile);
};
