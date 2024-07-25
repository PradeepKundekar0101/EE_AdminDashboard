import { Col, Dropdown, Flex, Menu, MenuProps, Row } from 'antd'
import StatsBox from '../../components/common/profile-card/ProfileCard'
import CustomLayout from '../../components/layout/custom-layout/CustomLayout'
import DonutChart from '../../components/graphs/donut-chart/DonutChart'
import BarGraph from '../../components/graphs/bar-graph/NewBar'
import useFetchData from '../../hooks/useFetchData'
import { useState } from 'react'
import moment from 'moment'
import AreaChart from '../../components/graphs/area-chart/AreaChart'
import ReactApexChart from 'react-apexcharts'
import { useAppSelector } from '../../redux/hooks'

const dummyProfileData = [
  { title: 'Total holding value', value: '0', color: '#000' },
  { title: 'Total holdings quantity', value: '0', color: '#000' },
  { title: "Today's Total P&L ", value: '0', color: 'green' },
  { title: 'P&L Percentage', value: '0%', color: 'green' }
]

const barGraphData = [
  {
    name: 'Net P&L',
    data: [10, -20, 15, 30, -25, 10, -15]
  }
]
const barGraphCategories = [
  '18 June 2024',
  '19 June 2024',
  '20 June 2024',
  '21 June 2024',
  '22 June 2024',
  'Yesterday',
  'Today'
]

const donutChartData = [80.3, 19.7]
const donutChartLabels = ['Win', 'Loss']

// const timeRangeItems: MenuProps["items"] = [
//   { key: "7days", label: "Last 7 Days" },
//   { key: "1month", label: "Last Month" },
//   { key: "1year", label: "Last Year" },
// ];

// const menu = <Menu  items={timeRangeItems} />;

interface Entry {
  date: string
  entry: number
  exit: number
}



// Dummy data for AreaChart
const dummyAreaChartData = [
  {
    name: 'Entry',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
  },
  {
    name: 'Exit',
    data: [20, 35, 40, 45, 55, 65, 75, 80, 100]
  }
]

const dummyAreaChartCategories = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep'
]

const AdminDashboard = () => {
  const getFormattedDate = (date: Date): string =>
    date.toISOString().split('T')[0]
  const yesterday = moment().subtract(1, 'days').toDate()
  const defaultFromDate = getFormattedDate(yesterday)
  const defaultToDate = getFormattedDate(new Date())

  const [dateRange, setDateRange] = useState<[string, string]>([
    defaultFromDate,
    defaultToDate
  ])

  const {
    data: apiResponse,
    loading,
    error
  } = useFetchData<{ status: string; data: Entry[] }>(
    `/analytics/journalTypeTrend?fromDate=${dateRange[0]}&toDate=${dateRange[1]}`
  )
  console.log(' journalTypeTrend', apiResponse)

  const responseCountData =
    apiResponse?.status === 'success' && apiResponse?.data?.length > 0
      ? [
          { name: 'Entry', data: apiResponse.data.map(entry => entry.entry) },
          { name: 'Exit', data: apiResponse.data.map(entry => entry.exit) }
        ]
      : []
  console.log('responseCountData: ', responseCountData)

  const responseCountCategories =
    apiResponse?.status === 'success'
      ? apiResponse.data.map(entry => entry.date)
      : []

  const darkMode = useAppSelector(state => state.theme.darkMode)

  console.log('responseCountData:', responseCountData)
  console.log('responseCountCategories:', responseCountCategories)
  const state = {
    series: [76],
    options: {
      chart: {
        type: 'radialBar',
        offsetY: -20
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: '#e7e7e7',
            strokeWidth: '97%',
            margin: 5,
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              color: '#999',
              opacity: 1,
              blur: 2
            }
          },
          dataLabels: {
            name: {
              show: true,
              color: darkMode ? '#fff' : '#000',
              fontSize: '15px',
              offsetY: -25
            },
            value: {
              show: true,
              color: darkMode ? '#fff' : '#000',
              fontSize: '30px',
              offsetY: -5,
              formatter: function (val: number) {
                return val + '%'
              }
            }
          },
          hollow: {
            margin: 15,
            size: '70%'
          },
          cornerRadius: 30,
          lineCap: 'round'
        }
      },
      fill: {
        type: 'solid',
        colors: ['#34D399']
      },
      labels: ['Connected Users']
    }
  }

  return (
    <CustomLayout>
      <div className='p-10'>
        <h1 className='text-3xl font-semibold'>Hello Admin 👋</h1>
        <Row gutter={16} className='mt-10 px-10'>
          {dummyProfileData.map((item, index) => (
            <Col span={6} key={index}>
              <StatsBox
                title={item.title}
                value={item.value}
                // color={dark ? 'white' : 'black'}
                //@ts-ignore
                // color={item.color}
              />
            </Col>
          ))}
        </Row>
        <Flex>
          <div className='w-[48%] flex flex-col'>
            {/* {responseCountData.length > 0 ? ( */}
            <AreaChart
              data={dummyAreaChartData}
              categories={dummyAreaChartCategories}
              title='Response Count'
              colors={['#6366F1', '#34D399']}
              style={{ width: '100%', height: '300px' }}
              darkMode={darkMode}
            />
            {/* ) : (
              <p className="p-4">No data available</p>
            )} */}
          </div>
          <div className='w-[48%] flex flex-col items-center justify-center'>
            {/* {responseCountData.length > 0 ? ( */}
            <div className='w-full mt-16'>
              <ReactApexChart
                options={state.options}
                series={state.series}
                type='radialBar'
              />
            </div>
            {/* ) : (
              <p className="p-4">No data available</p>
            )} */}
          </div>
        </Flex>
        <Flex justify='space-between' className='mt-10 px-10'>
          <div className='w-[48%] flex flex-col'>
            <div className='flex justify-end'>
              {/* <Dropdown overlay={menu} placement="bottomRight" arrow> */}
              {/* <Button>
                {timeRange === "7days"
                  ? "Last 7 Days"
                  : timeRange === "1month"
                  ? "Last Month"
                  : "Last Year"}
              </Button> */}
              {/* </Dropdown> */}
            </div>
            <BarGraph
              data={barGraphData}
              categories={barGraphCategories}
              title='Net P&L Graph'
              colors={['#34D399', '#F87171']}
              darkMode={darkMode}
            />
          </div>
          <div className='w-[48%]'>
            <DonutChart
              data={donutChartData}
              labels={donutChartLabels}
              title='Overall Win Percentage'
              colors={['#34D399', '#F87171']}
              darkMode={darkMode}
            />
          </div>
        </Flex>
      </div>
    </CustomLayout>
  )
}

export default AdminDashboard
