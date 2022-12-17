import dayjs from "dayjs";
import { FiShare2 } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

import { useGlobal } from "@/hooks/GlobalContext";

interface SharedButton {
  title: string;
  text: string;
  url: string;
}

const CardNews: React.FC = () => {
  const { news, newsLoading } = useGlobal();

  const truncate = (str: string, n: number) => {
    return str.length > n ? str.slice(0, n - 1) + "&hellip;" : str;
  };

  const handleShareButton = async ({ title, text, url }: SharedButton) => {
    if (navigator.share) {
      try {
        await navigator
          .share({
            title: title,
            text: text,
            url: url,
          })
          .then(() =>
            console.log("Hooray! Your content was shared to tha world")
          );
      } catch (error) {
        console.log(`Oops! I couldn't share to the world because: ${error}`);
      }
    } else {
      console.log("Sorry! Your browser does not support Web Share API");
    }
  };

  return (
    <>
      {newsLoading ? (
        <div className="animate-pulse">
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <div className="pr-3">
                <span className="h-3 w-3/6 rounded-sm bg-slate-200 mb-2"></span>
                <span className="h-4 w-full rounded-sm bg-slate-200 mb-2"></span>
                <span className="h-4 w-3/6 rounded-sm bg-slate-200"></span>
              </div>
              <div>
                <div className="w-full aspect-[4/3] bg-slate-200 rounded-lg h-24"></div>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <div className="pr-3">
                <span className="h-3 w-3/6 rounded-sm bg-slate-200 mb-2"></span>
                <span className="h-4 w-full rounded-sm bg-slate-200 mb-2"></span>
                <span className="h-4 w-3/6 rounded-sm bg-slate-200"></span>
              </div>
              <div>
                <div className="w-full aspect-[4/3] bg-slate-200 rounded-lg h-24"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        news.length > 0 &&
        news.map((item, idx) => (
          <div className="mb-4" key={`cardNews-${idx}`}>
            <Link href={`/news/${item.id}`}>
              <div className="flex justify-between mb-2">
                <div className="pr-3">
                  <time className="text-xs text-gray-400 dark:text-gray-300">
                    {dayjs(item.date).format("DD MMMM YYYY, HH:mm")}
                  </time>
                  <h4
                    className="text-base font-bold text-gray-800 dark:text-gray-50"
                    dangerouslySetInnerHTML={{
                      __html: truncate(item.title, 50),
                    }}
                  />
                </div>
                <div>
                  <div className="w-full aspect-[4/3] relative overflow-hidden bg-gray-100 rounded-lg h-24 img-cover">
                    <Image
                      src={item.image}
                      alt={item.category}
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
                </div>
              </div>
            </Link>

            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-600 dark:text-gray-300">
                {item.category}
              </div>
              <div>
                <button
                  className="text-gray-800 dark:text-gray-200"
                  onClick={() =>
                    handleShareButton({
                      title: item.title,
                      text: item.category,
                      url: "https://idm.media",
                    })
                  }
                >
                  <FiShare2 />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default CardNews;
