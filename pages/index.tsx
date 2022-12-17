import dynamic from "next/dynamic";
import { useState, Suspense, useEffect } from "react";
import { useGlobal } from "@/hooks/GlobalContext";

import Layout from "@/components/Layout";
import ProfilePanel from "@/components/ProfilePanel";

import { InferGetServerSidePropsType  } from 'next'

const TabNav = dynamic(() => import("@/components/TabNav"), {
  suspense: true,
});

const CardNews = dynamic<{}>(() => import("@/components/CardNews"), {
  suspense: true,
});

const CardLiveStream = dynamic(() => import("@/components/CardLiveStream"), {
  suspense: true,
});

const CardQuiz = dynamic(() => import("@/components/CardQuiz"), {
  suspense: true,
});

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/profile", {
    method: "GET",
  });

  const data = await response.json();

  return {
    props: {
      profile: data,
    }, // will be passed to the page component as props
  };
}

export default function Home({ profile }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { currentTab, newsLoading, fetchNews } = useGlobal();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetchNews();
    
  }, []);

  useEffect(() => {
    if (!newsLoading) {
      setLoading(false);
    }
  }, [newsLoading]);

  return (
    <Layout>
      <ProfilePanel data={profile} />
      <Suspense fallback={<></>}>
        <TabNav loading={loading} />
      </Suspense>

      <section className="pt-4 px-6">
        {currentTab === "news" && (
          <Suspense fallback={<></>}>
            <CardNews />
          </Suspense>
        )}

        {currentTab === "liveStream" && (
          <Suspense fallback={<></>}>
            <CardLiveStream />
          </Suspense>
        )}

        {currentTab === "quiz" && (
          <Suspense fallback={<></>}>
            <CardQuiz />
          </Suspense>
        )}
      </section>
    </Layout>
  );
}
