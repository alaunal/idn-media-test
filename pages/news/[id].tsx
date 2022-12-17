import dayjs from "dayjs";
import Layout from "@/components/Layout";

import { InferGetServerSidePropsType } from "next";
import Image from "next/image";

export async function getServerSideProps(ctx: any) {
  let { params } = ctx;

  const response = await fetch(
    `${process.env.API_HOST}/api/news/${params.id}`,
    {
      method: "GET",
    }
  );

  const data = await response.json();

  return {
    props: {
      news: data,
    },
  };
}

const News = ({
  news,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout>
      <div className="px-6 py-4">
        <h1 className="mb-6 font-semibold text-gray-800 dark:text-gray-50 text-lg">
          {news.title}
        </h1>
        <div className="w-full aspect-video relative overflow-hidden bg-gray-100 rounded-lg img-cover mb-4">
          <Image
            src={news.image}
            alt={news.category}
            width={500}
            height={500}
          />
          <div className="absolute bg-white bottom-0 right-0 h-6 rounded-tl-md flex items-center px-4">
            <img
              src="/logo_idntimes.svg"
              alt="logo"
              className="h-4 inline-block relative img-mark"
            />
          </div>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-300 mb-8">
          {news.category} | {dayjs(news.date).format("DD MMMM YYYY, HH:mm")}
        </p>

        <div className="text-sm text-gray-700 dark:text-gray-50">
          {news.context}
        </div>
      </div>
    </Layout>
  );
};

export default News;
