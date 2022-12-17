import Image from "next/image";

const ProfilePanel: React.FC<any> = ({ data }) => {
  const intToString = (num: number) => {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + "rb";
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + "jt";
    } else if (num < 900) {
      return num;
    }
  };

  return (
    <div className="w-full px-6 py-4 border-b-2 border-gray-100 dark:border-gray-700">
      <div className="flex items-center">
        <div className="">
          <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-500 h-24 w-full rounded-full relative img-cover">
            <Image
              src={data.image}
              alt={data.name}
              width={500}
              height={500}
            />
          </div>
        </div>
        <div className="pl-4">
          <div className="block mb-2">
            <p className="text-gray-500 dark:text-gray-200 text-xs">{data.title}</p>
            <h1 className="text-gray-800 dark:text-white font-bold">{data.name}</h1>
          </div>
          <div className="flex">
            <div className="">
              <p className="text-gray-500 dark:text-gray-200 text-xs">Following</p>
              <p className="text-gray-800 dark:text-white font-bold">
                {intToString(data.following)}
              </p>
            </div>
            <div className="pl-10">
              <p className="text-gray-500 dark:text-gray-200 text-xs">Followers</p>
              <p className="text-gray-800 dark:text-white font-bold">
                {intToString(data.follower)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-gray-800 dark:text-gray-200 text-sm py-6">{data.bio}</div>
      <button className="h-12 w-full flex items-center justify-center bg-red-600 dark:bg-red-500 text-white rounded-lg shadow-rose-300 dark:shadow-gray-800 shadow-md font-semibold">
        Follow
      </button>
    </div>
  );
};

export default ProfilePanel;
