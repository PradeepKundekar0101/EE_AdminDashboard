import React from 'react'
import ReactApexChart from 'react-apexcharts'

interface AreaChartProps {
  data: { name: string; data: number[] }[]
  categories: string[]
  title: string
  colors: string[]
}

const AreaChart: React.FC<AreaChartProps> = ({
  data,
  categories,
  title,
  colors
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
    series: [
      {
        name: 'Series 1',
        data: [45, 52, 38, 45, 19, 23, 2]
      }
    ],
    xaxis: {
      categories: [
        '01 Jan',
        '02 Jan',
        '03 Jan',
        '04 Jan',
        '05 Jan',
        '06 Jan',
        '07 Jan',
        '08 Jan',
        '09 Jan',
        '10 Jan'
      ],
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
        format: 'dd/MM/yy HH:mm'
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
      align: 'left'
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
