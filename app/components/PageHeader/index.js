/* eslint-disable react/prop-types */
import React from 'react';

const PageHeader = ({ title }) => {
  return (
    <header>
      <h1 className="page-title mb-5">{title}</h1>
    </header>
  );
};

export default PageHeader;
