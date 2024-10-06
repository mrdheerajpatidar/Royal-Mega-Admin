import React from 'react';
import { Outlet } from 'react-router-dom';

const OuterLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default OuterLayout;
