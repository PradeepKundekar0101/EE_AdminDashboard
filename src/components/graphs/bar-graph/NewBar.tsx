import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface BarGraphProps {
  data: number[];
  categories: string[];
  title: string;
  colors: string[];
  darkMode?: boolean;
  type: 'bar' | 'line';
}

const BarGraph: React.FC<BarGraphProps> = ({ data, categories, title, colors, darkMode, type }) => {
  const options: ApexOptions = {
    chart: {
      type: type,
      height: 300,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        colors: {
          ranges: [
            {
              from: -Infinity,
              to: 0,
              color: colors[1]
            },
            {
              from: 0,
              to: Infinity,
              color: colors[0]
            }
          ]
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: darkMode ? '#ffffff' : '#000000',
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => value.toFixed(2),
        style: {
          colors: darkMode ? '#ffffff' : '#000000',
        },
      },
    },
    colors: colors,
    title: {
      text: title,
      align: 'left',
      style: {
        color: darkMode ? '#fff' : '#000',
      },
    },
    grid: {
      borderColor: darkMode ? '#ffffff20' : '#00000020',
    },
    tooltip: {
      theme: darkMode ? 'dark' : 'light'
    },
    stroke: {
      width: type === 'line' ? 4 : 0,
      colors: [type === 'line' ? colors[0] : '']
    },
    fill: {
      type: type === 'line' ? 'gradient' : 'solid',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100]
      }
    },
  };

  const series = [{
    name: 'Net P&L',
    data: data
  }];

  return (
    <div className="w-full h-full">
      <ReactApexChart 
        options={options} 
        series={series} 
        type={type} 
        height="100%" 
      />
    </div>
  );
};

export default BarGraph;