import CustomLayout from "../../components/layout/custom-layout/CustomLayout";
import ProfileSection from "../../components/common/avatar-details/AvatarDetails";
import { Col, Flex, Row } from "antd";
import StatsBox from "../../components/common/profile-card/ProfileCard";
import NetPLBarGraph from "../../components/graphs/bar-graph/NetPLBarGraph";
import WinPercentageDonutChart from "../../components/graphs/donut-chart/DonutChart";
import RecentTradesTable from "../../components/common/table/RecentTrades";
import CustomCalendar from "../../components/common/calendar/Calendar";

const UserProfile = () => {
  const user = {
    avatar: "https://example.com/avatar.jpg",
    name: "PRADEEP KUNDEKAR",
    label: "Mentor: Naveen",
    clientId: "ABC123",
    contact: "7411420401",
    email: " pradeepkundekar@gmail.com",
    lastLogin: "40 mins ago",
  };
  const data = [
    { title: "Total holding value", value: "4,956", color: "#000" },
    { title: "Total innvalue", value: "956", color: "#000" },
    { title: "Total P&L", value: "4,956", color: "green" },
    { title: "P&L Percentage", value: "4.3%", color: "green" },
  ];
  return (
    <CustomLayout>
      <ProfileSection user={user} />
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
