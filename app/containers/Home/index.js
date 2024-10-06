/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import {
  ApexChart,
  DateRangePicker,
  Donut,
  Loader,
  PageHeader,
  PieChart,
} from '@components';
import DashboardCard from '@components/DashboardCard';
import { getAgentStats, getCollection, getGameStats } from '@utils/Endpoints';
import { reactIcons } from '@utils/icons';
import { numberWithCommas } from '@utils/numberWithCommas';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Home = () => {
  const [statistics, setStatistics] = useState();
  const [gameStats, setGameStats] = useState();
  const [agentStats, setAgentStats] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  const cards = [
    {
      title: 'Direct Collection',
      icon: reactIcons.user,
      amount: numberWithCommas(statistics?.directCollection || '0'),
    },
    {
      title: 'Agent Collection',
      icon: reactIcons.user,
      amount: numberWithCommas(statistics?.agentCollection || '0'),
    },
    {
      title: 'Total Collection',
      icon: reactIcons.dollar,
      amount: numberWithCommas(statistics?.totalCollection || '0'),
    },
    {
      title: 'Total Users',
      icon: reactIcons.dollar,
      amount: Number(statistics?.total_users ?? 0),
    },
    {
      title: 'Total Agents',
      icon: reactIcons.dollar,
      amount: Number(statistics?.total_agents ?? 0),
    },
    {
      title: 'Agent Users',
      icon: reactIcons.dollar,
      amount: Number(statistics?.totalUserByAgents ?? 0),
    },
  ];

  // Get dashboard statistics
  const getStatData = async () => {
    try {
      setIsLoading(true);

      // Call API Here
      const res = await getCollection(
        moment(startDate).startOf('day').toISOString(),
        moment(endDate).endOf('day').toISOString(),
      );
      const { status, data, error } = res;
      if (status) {
        setStatistics(data);
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

  const getGamesStatData = async () => {
    try {
      setIsLoading(true);

      // Call API Here
      const res = await getGameStats(
        moment(startDate).startOf('day').toISOString(),
        moment(endDate).endOf('day').toISOString(),
      );
      const { status, data, error } = res;
      if (status) {
        setGameStats(data?.data);
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

  const getAgentDonutData = async () => {
    try {
      setIsLoading(true);

      // Call API Here
      const res = await getAgentStats(
        moment(startDate).startOf('day').toISOString(),
        moment(endDate).endOf('day').toISOString(),
      );
      const { status, data, error } = res;
      if (status) {
        setAgentStats(data?.data);
        console.log(data, 'data Agent stats');
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
    getStatData();
    getGamesStatData();
    getAgentDonutData();
  }, [startDate, endDate]);

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
              />
            ))}
          </div>
        </div>
        <div className="border border-primary-200 mt-2 rounded-12">
          <div className="bg-secondary/[0.2] rounded-12 px-3 py-3">
            <h5 className="capitalize text-white text-16 lg:text-18 xl:text-20 font-medium">
              Weekly Chart
            </h5>
            <ApexChart />
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-2 mt-8 mb-10 lg:gap-4">
          <div className="border border-primary-200 rounded-12">
            <div className="bg-secondary/[0.2] rounded-12 px-3 py-3">
              <h5 className="capitalize text-white text-16 lg:text-18 xl:text-20 font-medium">
                Games
              </h5>
              <PieChart data={gameStats} />
            </div>
          </div>
          <div className="border border-primary-200 rounded-12">
            <div className="bg-secondary/[0.2] rounded-12 px-3 py-3">
              <h5 className="capitalize text-white text-16 lg:text-18 xl:text-20 font-medium">
                Agents
              </h5>
              <Donut data={agentStats} />
            </div>
          </div>
        </div>
        <div className="mt-5"></div>
      </div>
    </>
  );
};

export default Home;
