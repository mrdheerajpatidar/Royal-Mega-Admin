/* eslint-disable react-hooks/rules-of-hooks */
import { Navbar } from '@components';
import Sidebar from '@components/Sidebar';
import { LayoutContext } from '@contexts';
import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  const { openSidebar } = useContext(LayoutContext);

  return (
    <>
      <div>
        <Navbar />
        <div className="flex h-[calc(100vh_-_63px)] lg:h-[calc(100vh_-_67px)] mt-[63px] lg:mt-[67px]">
          <div
            className={`transition-width duration-300 relative z-10 ${
              openSidebar
                ? 'min-w-[60px] sm:min-w-[250px]'
                : 'min-w-[60px] sm:min-w-[60px]'
            }`}
          >
            <Sidebar />
          </div>
          <div
            // style={{ background: 'url(/images/background.png)' }}
            className={`relative transition-width duration-300 bg-black overflow-y-auto !bg-cover  ${
              openSidebar
                ? 'min-w-[calc(100%-60px)] sm:min-w-[calc(100%-250px)]'
                : 'min-w-[calc(100%-60px)] sm:min-w-[calc(100%-60px)]'
            }`}
          >
            <div className="py-5 px-3 md:p-5 h-full">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
