/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import {
  AgentUserBalance,
  DateRangePicker,
  Loader,
  PageHeader,
} from '@components';
import DashboardCard from '@components/DashboardCard';
import { getTotalSales, getTotalUsers } from '@utils/Endpoints';
import { reactIcons } from '@utils/icons';
import { numberWithCommas } from '@utils/numberWithCommas';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AgentHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [balanceType, setBalanceType] = useState('');
  const [balanceModal, setBalanceModal] = useState(false);
  const [updater, setUpdater] = useState(false);
  const Agent = useSelector((state) => state.agent.data);
  const [totalSales, setTotalSales] = useState({});
  const [totalUser, setTotalUsers] = useState();
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  const cards = [
    {
      title: 'Balance',
      icon: reactIcons.wallet,
      amount: numberWithCommas(Agent?.Wallet?.amount || '0'),
      // img: '/images/dashboard-card-1.png',
    },
    {
      title: 'Sales',
      icon: reactIcons.sales,
      amount: numberWithCommas(totalSales?.totalSales || '0'),
      // img: '/images/dashboard-card-2.png',
    },
    {
      title: 'Total User',
      icon: reactIcons.user,
      amount: totalUser,
      // img: '/images/dashboard-card-2.png',
    },
  ];

  // Get dashboard statistics
  const getStatData = async () => {
    try {
      setIsLoading(true);
      // Call API Here
      const res = await getTotalUsers(
        moment(startDate).startOf('day').toISOString(),
        moment(endDate).endOf('day').toISOString(),
      );
      const { status, data, error } = res;
      if (status) {
        setTotalUsers(data);
      } else if (error) {
        if (Array.isArray(error)) {
          toast.error(error[0], {
            toastId: 7,
          });
        } else {
          toast.error(error, { toastId: 79 });
        }
      }
    } catch (error) {
      console.log(error, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const getTotalSale = async () => {
    try {
      setIsLoading(true);
      // Call API Here
      const res = await getTotalSales(
        moment(startDate).startOf('day').toISOString(),
        moment(endDate).endOf('day').toISOString(),
      );
      const { status, data, error } = res;
      if (status) {
        setTotalSales(data);
      } else if (error) {
        if (Array.isArray(error)) {
          toast.error(error[0], {
            toastId: 7,
          });
        } else {
          toast.error(error, { toastId: 79 });
        }
      }
    } catch (error) {
      console.log(error, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTotalSale();
    getStatData();
  }, [updater, startDate, endDate]);

  const handleAddBalance = (type) => {
    setBalanceModal(true);
    setBalanceType(type);
  };

  const handleTodayButtonClick = () => {
    const today = new Date();
    const todayRange = [today, today];
    setDateRange(todayRange);
  };

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      <div>
        <div className="flex justify-between">
          <PageHeader title="Dashboard" />
          <div className="flex gap-4">
            {' '}
            <div className="input-group">
              <DateRangePicker
                changeDateRange={setDateRange}
                MydateRange={dateRange}
              />
            </div>
            <div className="input-group">
              <button
                onClick={() => {
                  handleTodayButtonClick();
                }}
                className="text-red-700 text-18 bg-primary-400 p-2 mt-1 rounded font-semibold flex"
              >
                {reactIcons.close}
              </button>
            </div>
          </div>
        </div>
        <div className="page-content mt-4">
          <div className="grid lg:grid-cols-3 gap-2 lg:gap-4">
            {cards.map((item, index) => (
              <DashboardCard
                key={index}
                icon={item.icon}
                title={item.title}
                amount={item.amount}
                // img={item.img}
              />
            ))}
          </div>
        </div>
        <div className="page-content">
          <div className="border border-primary-200 rounded-12 px-48 py-28">
            <div className="flex justify-around mb-3">
              <div className="flex mt-2 items-center  gap-3 justify-between mb-5">
                <button
                  onClick={() => navigate('/buy-ticket')}
                  className="common-btn w-[200px] justify-center items-center flex !py-3"
                >
                  Buy Ticket
                </button>{' '}
              </div>{' '}
              <div className="flex mt-2 items-center  gap-3 justify-between mb-5">
                <button
                  onClick={() => navigate('/agent-users/add-user/1')}
                  className="common-btn w-[200px] justify-center items-center flex !py-3"
                >
                  Add User
                </button>{' '}
              </div>
            </div>
            <div className="flex justify-around">
              <div className="flex mt-2 items-center  gap-3 justify-between mb-5">
                <button
                  onClick={() => handleAddBalance('Add')}
                  className="common-btn w-[200px] justify-center items-center flex !py-3"
                >
                  Add Balance
                </button>{' '}
              </div>{' '}
              <div className="flex mt-2 items-center  gap-3 justify-between mb-5">
                <button
                  onClick={() => handleAddBalance('Remove')}
                  className="common-btn w-[200px] justify-center items-center flex !py-3"
                >
                  Remove Balance
                </button>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
      {balanceModal && (
        <AgentUserBalance
          isOpen={balanceModal}
          closeModal={() => setBalanceModal(false)}
          updater={() => setUpdater((prev) => !prev)}
          type={balanceType}
        />
      )}
    </>
  );
};

export default AgentHome;
