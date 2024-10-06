/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { isLoggedIn } from '@utils/apiHandlers';
import { Dashboard } from '@containers/pageListAsync';
import { LayoutContext } from '@contexts';

const DashboardLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const { pathname } = useLocation();

  if (!isLoggedIn()) {
    localStorage.setItem('lastUrl', pathname);
    return <Navigate to="/login" />;
  }

  return (
    <LayoutContext.Provider value={{ openSidebar, setOpenSidebar }}>
      <main>
        <Dashboard />
      </main>
    </LayoutContext.Provider>
  );
};

export default DashboardLayout;
