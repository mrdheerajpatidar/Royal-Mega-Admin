import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center p-5 pt-0 bg-white w-full">
      <div className="text-center">
        <div className="inline-flex">
          <div className="">
            <img
              src="/images/notFound.gif"
              className="max-w-[300px] md:max-w-[500px]"
              alt="not-found"
            />
          </div>
        </div>
        <h1 className="text-28 md:text-[36px] font-bold text-slate-800 lg:text-[50px]">
          404 - Page not found
        </h1>
        <p className="text-slate-600 mt-5 lg:text-lg">
          The page you are looking for doesn&apos;t exist or <br />
          has been removed.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="my-10 w-full btn-primary-100"
        >
          Back to home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
