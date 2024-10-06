/* eslint-disable react-hooks/exhaustive-deps */
import { getChartStats } from '@utils/Endpoints';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { toast } from 'react-toastify';

const ApexChart = () => {
  const [dates, setDates] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    getChartData();
  }, []);

  const processData = (data) => {
    const groupedData = {};
    data.forEach((item) => {
      const date = new Date(item.created_date).toLocaleDateString('en-GB');
      if (!groupedData[date]) {
        groupedData[date] = { lottery: 0, powerball: 0 };
      }
      groupedData[date][item.type] = Number(item.user_count);
    });
    const dates = Object.keys(groupedData);
    const lottery_User = dates.map((date) => groupedData[date].lottery);
    // const powerball_User = dates.map((date) => groupedData[date].powerball);
    return { dates, lottery_User };
    // return { dates, lottery_User, powerball_User };
  };

  const getChartData = async () => {
    try {
      const res = await getChartStats();
      const { status, data, error } = res;
      if (status) {
        // const { dates, lottery_User, powerball_User } = processData(data);
        const { dates, lottery_User } = processData(data);
        setDates(dates);
        setSeries([
          // { name: 'Powerball', data: powerball_User, color: '#e9bc66' }, // Custom color for Powerball
          { name: 'Lottery', data: lottery_User, color: '#9c9b98' },
        ]);
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
    }
  };

  const options = {
    chart: {
      type: 'bar',
      height: 430,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: '12px',
        colors: ['#fff'], // Labels color set to white
      },
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['#fff'],
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    xaxis: {
      categories: dates,
      labels: {
        style: {
          colors: '#fff', // Dates text color set to white
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#fff', // Y-axis labels color set to white
        },
      },
    },
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={430}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
