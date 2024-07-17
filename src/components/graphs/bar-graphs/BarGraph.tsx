import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface BarGraphProps {
  data: { name: string; data: number[] }[];
  categories: string[];
  title: string;
  colors: string[];
}

const BarGraph: React.FC<BarGraphProps> = ({ data, categories, title, colors }) => {
  const options = {
    chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        stackType: '100%'
      },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
        categories: categories,
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      grid: {
        show: false,
      },
  
    colors: colors,
    title: {
      text: title,
      align: 'left',
    },
  };

  return (
    <div className="p-4">
      <ReactApexChart
      //@ts-ignore
      options={options} series={data} type="bar" height={350} />
    </div>
  );
};

export default BarGraph;
