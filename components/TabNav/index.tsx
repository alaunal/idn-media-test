import { useGlobal } from "@/hooks/GlobalContext";

interface Props {
  loading?: boolean;
}

const NabNav: React.FC<Props> = ({ loading }) => {
  const { tabs, currentTab, handleTabNav } = useGlobal();

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return loading ? (
    <div className="px-6 py-4 w-full">
      <nav className="grid gap-2 grid-cols-3 animate-pulse">
        <span className="h-8 w-full rounded-full bg-slate-200"></span>
        <span className="h-8 w-full rounded-full bg-slate-200"></span>
        <span className="h-8 w-full rounded-full bg-slate-200"></span>
      </nav>
    </div>
  ) : (
    <div className="px-6 py-4 w-full">
      <nav className="grid gap-2 grid-cols-3">
        {tabs.map((tab: string, idx: number) => (
          <div key={`nav-${idx}`}>
            <button
              className={`text-xs font-bold w-full flex rounded-full ${
                tab === currentTab
                  ? "bg-rose-200 text-red-700 border-rose-200"
                  : "bg-white text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-700"
              } h-8 items-center justify-center px-2 border`}
              onClick={() => handleTabNav(tab)}
            >
              {capitalizeFirstLetter(tab)}
            </button>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default NabNav;
