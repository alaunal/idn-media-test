export interface News {
  id: string;
  title: string;
  image: string;
  date: string;
  category: string;
}

export interface LiveStream {
  id: string;
  title: string;
  image: string;
  category: string;
}

export interface Quiz {
  id: string;
  title: string;
  image: string;
  views: number;
  category: string;
}

export type GlobalContextType = {
  news: News[];
  newsLoading: boolean;
  fetchNews: () => void;
  liveStream: LiveStream[];
  liveStreamLoading: boolean;
  fetchLiveStream: () => void;
  quiz: Quiz[];
  quizLoading: boolean;
  fetchQuiz: () => void;
  errorMsg: string;
  currentTab: string;
  tabs: any;
  handleTabNav: (tab: string) => void;
};
