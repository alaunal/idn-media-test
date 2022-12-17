import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FiShare2, FiChevronLeft, FiSun, FiMoon } from "react-icons/fi";

const Navigation = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleShareButton = async () => {
    if (navigator.share) {
      try {
        await navigator
          .share({
            title: "IDN Test Frontend",
            text: "This just static text for web share with react & next js",
            url: "idn.media",
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

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 flex h-16 justify-center items-center z-50">
      <div className="max-w-md px-6 w-full flex justify-between items-center">
        <div>
          <button className="text-xl text-gray-800 dark:text-gray-50">
            <FiChevronLeft />
          </button>
        </div>
        <div className="flex items-center">
          {mounted && (
            <>
              {currentTheme === "dark" ? (
                <button
                  className="text-yellow-300 text-xl"
                  onClick={() => setTheme("light")}
                >
                  <FiSun />
                </button>
              ) : (
                <button
                  className="text-gray-800 text-xl"
                  onClick={() => setTheme("dark")}
                >
                  <FiMoon />
                </button>
              )}
            </>
          )}

          <button className="text-gray-800 dark:text-gray-50 ml-4" onClick={() => handleShareButton()}>
            <FiShare2 />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
