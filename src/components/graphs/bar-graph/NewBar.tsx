import React from 'react';
// import ReactApexChart from 'react-apexcharts';

interface BarGraphProps {
  data: { name: string; data: number[] }[];
  categories: string[];
  title: string;
  colors: string[];
  darkMode?: boolean;
}

const BarGraph: React.FC<BarGraphProps> = ({ data, categories, title, colors, darkMode }) => {
  console.log(data)
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
      labels: {
        show: true,
        style: {
          colors: darkMode ? '#ffffff' : '#000000'
        }
      },
    },
    colors: colors,
    title: {
      text: title,
      align: 'left',
      style: {
        color: darkMode ? '#fff' : '#000'
      }
    },
    grid: {
      show: false,
    },
    yaxis: {
      show: false,
    },
  };
  console.log(options)

  // const series = data.map((serie) => ({
  //   ...serie,
  //   data: serie.data.map((value) => (value >= 0 ? value : -value)),
  // }));
  // console.log(series)

  return (
    <div className="p-4 h-[350px] flex flex-col items-center justify-center border rounded-xl border-slate-200 bg-white m-5">
      <h1>No Data</h1>
      {/* <ReactApexChart 
      //@ts-ignore
      options={options} series={data} type="bar" height={350} /> */}
    </div>
  );
};

export default BarGraph;
