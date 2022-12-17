import Head from "next/head";

import Navigation from "../Navigation";

export type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Profile News - IDN test FE</title>
        <meta
          name="description"
          content="just a simple application of news with next.js and faker.js"
        />
      </Head>

      <div className="bg-gray-50 dark:bg-gray-700 w-full min-h-screen flex justify-center relative">
        <Navigation />
        <div className="max-w-md bg-white dark:bg-gray-800 w-full h-screen overflow-auto pt-16 pb-6">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
