import React from 'react';
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';

const PieChart = ({ data }) => {
  const types = data?.map((item) => item.username) || [];
  const series = data?.map((item) => Number(item.total_collection)) || [];

  const options = {
    chart: {
      width: '100%',
      height: '100%',
      type: 'donut',
    },
    labels: types,
    colors: ['#e9bc66', '#9c9b98'], // Custom colors for Powerball and Lottery
    theme: {
      monochrome: {
        enabled: false, // Disable monochrome to use custom colors
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -5,
        },
      },
    },
    grid: {
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
    dataLabels: {
      formatter: (val, opts) => {
        const name = opts.w.globals.labels[opts.seriesIndex];
        return [name, val.toFixed(1) + '%'];
      },
    },
    legend: {
      show: false,
    },
  };

  return (
    <div id="chart" className="h-[300px]">
      {series.length > 0 ? (
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          width="100%"
          height="100%"
        />
      ) : (
        <div className="w-full h-[300px] flex justify-center items-center">
          <p className="text-primary-100">No data is available for today.</p>
        </div>
      )}
    </div>
  );
};

PieChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default PieChart;
