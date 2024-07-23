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
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',
            colors: {
              ranges: [
                {
                  from: -1000,
                  to: 0,
                  color: '#F87171',
                },
                {
                  from: 0,
                  to: 1000,
                  color: '#34D399',
                },
              ],
            },
        }
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: categories,
    },
    colors: colors,
    title: {
      text: title,
      align: 'left',
    },
    grid: {
      show: false,
    },
    yaxis: {
      show: false,
    },
  };

  const series = data.map((serie) => ({
    ...serie,
    data: serie.data.map((value) => (value >= 0 ? value : -value)),
  }));
  // console.log(series)

  return (
    <div className="p-4">
      <ReactApexChart 
      //@ts-ignore
      options={options} series={data} type="bar" height={350} />
    </div>
  );
};

export default BarGraph;
