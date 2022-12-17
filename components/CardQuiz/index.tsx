import Image from "next/image";

import { useGlobal } from "@/hooks/GlobalContext";

const CardQuiz: React.FC = () => {
  const { quiz, quizLoading } = useGlobal();

  return (
    <>
      {quizLoading ? (
        <div className="grid grid-cols-2 gap-3">
          <div className="relative aspect-square w-full rounded-lg bg-slate-200"></div>
          <div className="relative aspect-square w-full rounded-lg bg-slate-200"></div>
        </div>
      ) : (
        quiz.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {quiz.map((item, idx) => (
              <div key={`cardquiz-${idx}`}>
                <div className="relative aspect-square w-full rounded-lg bg-gray-100 overflow-hidden mb-3 img-cover">
                  <Image
                    src={item.image}
                    alt={item.category}
                    width={500}
                    height={500}
                  />
                </div>
                <p className="mb-2 text-xs text-gray-400 dark:text-gray-300">{item.category}</p>
                <h4 className="font-bold text-gray-800 dark:text-gray-50 text-base mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-400 dark:text-gray-300">
                  <span className="font-semibold">{item.views}</span> plays
                </p>
              </div>
            ))}
          </div>
        )
      )}
    </>
  );
};

export default CardQuiz;
