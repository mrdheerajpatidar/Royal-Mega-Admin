/* eslint-disable react/prop-types */
import React from 'react';

const DashboardCard = ({ icon, title, amount, img }) => {
  console.log(img);
  return (
    <div className="border border-primary-200 rounded-12">
      <div className="bg-secondary/[0.2] rounded-12 px-3">
        <div className="flex gap-2 lg:gap-3 justify-between">
          <div className="card-text w-[calc(100%-0px)] py-3">
            <div className="flex gap-1 lg:gap-2 items-center mb-3">
              <div className="min-w-[27px] lg:min-w-[32px] h-[27px] lg:h-[32px] rounded-full bg-primary-100 grid place-content-center">
                <span className="text-white">{icon}</span>
              </div>
              <h5 className="capitalize text-white text-14 lg:text-18 xl:text-18 font-medium">
                {title}
              </h5>
            </div>
            <h4 className="font-medium text-white text-24 lg:text-30 xl:text-42">
              {amount}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
