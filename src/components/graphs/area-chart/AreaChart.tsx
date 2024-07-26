import React from 'react'
import ReactApexChart from 'react-apexcharts'

interface AreaChartProps {
  data: { name: string; data: number[] }[]
  categories: string[]
  title: string
  colors: string[]
  darkMode?:boolean,
  style?:any
}

const AreaChart: React.FC<AreaChartProps> = ({
  data,
  categories,
  title,
  colors,
  darkMode
}) => {
  const options = {
    chart: {
      type: 'area',
      height: 350
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: categories,
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    grid: {
      show: false
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy'
      }
    },
    // fill: {
    //     type: "gradient",
    //     gradient: {
    //       shadeIntensity: 1,
    //       opacityFrom: 0.9,
    //       opacityTo: 0.9,
    //       stops: [0, 60, 100]
    //     }
    //   },
    colors: colors,
    title: {
      text: title,
      align: 'left',
      style: {
        color: darkMode ? '#fff' : '#000',
      }
    },
    legend: {
      labels: {
        colors: darkMode ? '#ffffff' : '#000000'
      }
    }
  }

  return (
    <div className='p-4'>
      <ReactApexChart
        //@ts-ignore
        options={options}
        series={data}
        type='area'
        height={350}
      />
    </div>
  )
}

export default AreaChart
