import CustomLayout from "../../components/layout/custom-layout/CustomLayout";
import ProfileSection from "../../components/common/avatar-details/AvatarDetails";
import { Col, Flex, Row } from "antd";
import StatsBox from "../../components/common/profile-card/ProfileCard";
import NetPLBarGraph from "../../components/graphs/bar-graph/NetPLBarGraph";
import WinPercentageDonutChart from "../../components/graphs/donut-chart/DonutChart";
import RecentTradesTable from "../../components/common/table/RecentTrades";
import CustomCalendar from "../../components/common/calendar/Calendar";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";

const data = [
  { title: "Total holding value", value: "4,956", color: "#000" },
  { title: "Total innvalue", value: "956", color: "#000" },
  { title: "Total P&L", value: "4,956", color: "green" },
  { title: "P&L Percentage", value: "4.3%", color: "green" },
];

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data:userData, loading, error } = useFetchData(`/user/${userId}`);
  console.log('userData: ', userData);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <CustomLayout>
        
      <ProfileSection 
      //@ts-ignore
      user={userData?.data[0]} />
      <Row gutter={16} className="mt-10 px-10">
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
      <Flex justify="space-between" className="mt-10 px-10">
        <div className="w-[48%]">
          <NetPLBarGraph />
        </div>
        <div className="w-[48%]">
          <WinPercentageDonutChart />
        </div>
      </Flex>
      <div className="mt-10 px-10">
        <RecentTradesTable />
      </div>
      <div className="mt-10 px-10">
        <CustomCalendar />
      </div>
    </CustomLayout>
  );
};

export default UserProfile;
