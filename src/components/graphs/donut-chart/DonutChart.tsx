import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface DonutChartProps {
  data: number[];
  labels: string[];
  title: string;
  colors: string[];
}

const DonutChart: React.FC<DonutChartProps> = ({ data, labels, title, colors }) => {
  const options = {
    chart: {
      type: 'donut',
    },
    labels: labels,
    colors: colors,
    title: {
      text: title,
      align: 'left',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: 'bottom',
    },
  };

  return (
    <div className="p-4">
      <ReactApexChart
      //@ts-ignore
      options={options} series={data} type="donut" height={350} />
    </div>
  );
};

export default DonutChart;
