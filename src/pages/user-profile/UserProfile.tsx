import CustomLayout from '../../components/layout/custom-layout/CustomLayout'
import ProfileSection from '../../components/common/avatar-details/AvatarDetails'
import { Col, Flex, Row } from 'antd'
import StatsBox from '../../components/common/profile-card/ProfileCard'
import RecentTradesTable from '../../components/common/table/RecentTrades'
import CustomCalendar from '../../components/common/calendar/Calendar'
import { useParams } from 'react-router-dom'
import useFetchData from '../../hooks/useFetchData'
import BarGraph from '../../components/graphs/bar-graph/NewBar'
import DonutChart from '../../components/graphs/donut-chart/DonutChart'
const donutChartData = [80.3, 19.7];
const donutChartLabels = ['Win', 'Loss'];

const data = [
  { title: 'Total holding value', value: '4,956', color: '#000' },
  { title: 'Total innvalue', value: '956', color: '#000' },
  { title: 'Total P&L', value: '4,956', color: 'green' },
  { title: 'P&L Percentage', value: '4.3%', color: 'green' }
]
const barGraphData = [
  {
    name: 'Net P&L',
    data: [10, -20, 15, 30, -25, 10, -15],
  },
];
const barGraphCategories = [
  '18 June 2024',
  '19 June 2024',
  '20 June 2024',
  '21 June 2024',
  '22 June 2024',
  'Yesterday',
  'Today',
];
const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>()
  const { data: userData, loading, error } = useFetchData(`/user/${userId}`)
  console.log('userData: ', userData)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <CustomLayout>
      <div className='p-10 bg-white'>
        <ProfileSection
          //@ts-ignore
          user={userData && userData?.data}
        />
        <Row gutter={16} className='mt-10 px-10'>
          {data.map((item, index) => (
            <Col span={6} key={index}>
              <StatsBox
                title={item.title}
                value={item.value}
                //@ts-ignore
                color={item.color}
              />
            </Col>
          ))}
        </Row>
        <Flex justify='space-between' className='mt-10 px-10'>
          <div className='w-[48%]'>
            <BarGraph
            data={barGraphData}
            categories={barGraphCategories}
            title=""
            colors={['#34D399', '#F87171']}
          />
          </div>
          <div className='w-[48%]'>
          <DonutChart
            data={donutChartData}
            labels={donutChartLabels}
            title="Win Percentage"
            colors={['#34D399', '#F87171']}
          />
          </div>
        </Flex>
        <div className='mt-10 px-10'>
          <RecentTradesTable />
        </div>
        <div className='mt-10 px-10'>
          <CustomCalendar />
        </div>
      </div>
    </CustomLayout>
  )
}

export default UserProfile
