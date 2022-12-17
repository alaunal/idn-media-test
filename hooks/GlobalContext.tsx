import React, { createContext, useContext, useMemo, useState } from "react";

import { GlobalContextType, News, LiveStream, Quiz } from "@/types/global";

interface Props {
  children: React.ReactNode;
}

export const GlobalContext = createContext<GlobalContextType | null>(null);

const GlobalProvider: React.FC<Props> = ({ children }) => {
  const tabs = ["news", "liveStream", "quiz"];

  const [news, setNews] = useState<News[]>([]);
  const [newsLoading, setNewsLoading] = useState<boolean>(true);

  const [liveStream, setLiveStream] = useState<LiveStream[]>([]);
  const [liveStreamLoading, setLiveStreamLoading] = useState<boolean>(true);

  const [quiz, setQuiz] = useState<Quiz[]>([]);
  const [quizLoading, setQuizLoading] = useState<boolean>(true);

  const [errorMsg, setErrorMsg] = useState<string>("");

  const [currentTab, setCurrentTab] = useState<string>("news");

  const errorHandlers = (error: any) => {
    setErrorMsg(error.message);

    setTimeout(() => {
      setErrorMsg("");
    }, 500);
  };

  const fetchNews = async () => {
    setNewsLoading(true);
    try {
      const response = await fetch(`/api/news?limit=10`, {
        method: "GET",
      });

      const data = await response.json();

      setNews(data ?? []);
      setNewsLoading(false);
    } catch (error: any) {
      errorHandlers(error);
      setNewsLoading(false);
    }
  };

  const fetchLiveStream = async () => {
    setLiveStreamLoading(true);
    try {
      const response = await fetch(`/api/livestream?limit=10`, {
        method: "GET",
      });

      const data = await response.json();

      setLiveStream(data ?? []);
      setLiveStreamLoading(false);
    } catch (error: any) {
      errorHandlers(error);
      setLiveStreamLoading(false);
    }
  };

  const fetchQuiz = async () => {
    setQuizLoading(true);
    try {
      const response = await fetch(`/api/quiz?limit=10`, {
        method: "GET",
      });

      const data = await response.json();

      setQuiz(data ?? []);
      setQuizLoading(false);
    } catch (error: any) {
      errorHandlers(error);
      setQuizLoading(false);
    }
  };

  const handleTabNav = (tab: string) => {
    switch (tab) {
      case "news":
        news.length < 1 && fetchNews();
        break;
      case "liveStream":
        liveStream.length < 1 && fetchLiveStream();
        break;
      case "quiz":
        quiz.length < 1 && fetchQuiz();
        break;
      default:
        break;
    }

    setCurrentTab(tab);
  };

  const value = useMemo(
    () => ({
      news,
      newsLoading,
      fetchNews,
      liveStream,
      liveStreamLoading,
      fetchLiveStream,
      quiz,
      quizLoading,
      fetchQuiz,
      errorMsg,
      currentTab,
      tabs,
      handleTabNav
    }),
    [
      news,
      newsLoading,
      liveStream,
      liveStreamLoading,
      quiz,
      quizLoading,
      errorMsg,
      currentTab,
    ]
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  return useContext(GlobalContext) as GlobalContextType;
};

export default GlobalProvider;
