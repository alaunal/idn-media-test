import Image from "next/image";

import { useGlobal } from "@/hooks/GlobalContext";

const CardLiveStream: React.FC = () => {
  const { liveStream, liveStreamLoading } = useGlobal();

  return (
    <>
      {liveStreamLoading ? (
        <div className="grid grid-cols-2 gap-3">
          <div className="relative aspect-3/5 w-full rounded-lg bg-slate-200"></div>
          <div className="relative aspect-3/5 w-full rounded-lg bg-slate-200"></div>
        </div>
      ) : (
        liveStream.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {liveStream.map((item, idx) => (
              <div key={`cardls-${idx}`}>
                <div className="relative aspect-3/5 w-full rounded-lg bg-gray-100 flex items-end overflow-hidden img-cover">
                  <Image
                    src={item.image}
                    alt={item.category}
                    width={500}
                    height={500}
                  />
                  <div className="absolute h-full w-full top-0 bottom-0 bg-gray-800 opacity-25"></div>
                  <div className="px-3 pb-3 relative">
                    <h4 className="text-white text-sm font-semibold mb-1">{item.title}</h4>
                    <p className="text-white text-xs">{item.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </>
  );
};

export default CardLiveStream;
