import CustomLayout from "../../components/layout/custom-layout/CustomLayout";
import ProfileSection from "../../components/common/avatar-details/AvatarDetails";
import {
  Card,
  Col,
  DatePicker,
  Dropdown,
  Flex,
  Menu,
  MenuProps,
  Row,
} from "antd";
import StatsBox from "../../components/common/profile-card/ProfileCard";
import RecentTradesTable from "../../components/common/table/RecentTrades";
import CustomCalendar from "../../components/common/calendar/Calendar";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import BarGraph from "../../components/graphs/bar-graph/NewBar";
import DonutChart from "../../components/graphs/donut-chart/DonutChart";

// import ReactApexChart from "react-apexcharts";
import AreaChart from "../../components/graphs/area-chart/AreaChart";
import moment from "moment";
// import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "antd/es/radio";

const dummyProfileData = [
  { title: "Total holding value", value: "0", color: "#000" },
  { title: "Total holdings quantity", value: "0", color: "#000" },
  { title: "Today's Total P&L", value: "0", color: "green" },
  { title: "Today's total trade quantity", value: "0%", color: "green" },
];
// const barGraphData = [
//   {
//     name: "Net P&L",
//     data: [10, -20, 15, 30, -25, 10, -15],
//   },
// ];
// const barGraphCategories = [
//   "18 June 2024",
//   "19 June 2024",
//   "20 June 2024",
//   "21 June 2024",
//   "22 June 2024",
//   "Yesterday",
//   "Today",
// ];

interface RatingResponse {
  status: string;
  data: {
    _id: string;
    averageRating: number;
  }[];
}

// const testdata = [{ name: "Rating", data: [2, 3, 3, 5, 1, 0] }];
const { RangePicker } = DatePicker;

const UserProfile = () => {
  const [filters, setFilters] = useState<[string, string]>(["", ""]);
  const { userId } = useParams<{ userId: string }>();
  const {
    data: userData,
    loading,
    error,
    fetchData,
  } = useFetchData(`/user/${userId}`);
  // console.log("userData: ", userData);

  // ?fromDate=${filters[0]}&toDate=${filters[1]}
  // /review/analytics/ratingsTrend/:userId
  const { data: ratingData } = useFetchData<RatingResponse>(
    `/analytics/ratingsTrend/${userId}?fromDate=${filters[0]}&toDate=${filters[1]}`
  );
  // console.log("Rating data: ",ratingData)
  // /analytics/dashboard/:userId
  const { data: profileData } = useFetchData(`/analytics/dashboard/${userId}`);

  const transformDataToArray = (data: any) => {
    if (!data || !data.data) return dummyProfileData;

    return Object.entries(data.data).map(([key, value]) => ({
      key: key,
      value: value,
      title: key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase()), // This converts camelCase to Title Case
    }));
  };

  const dataArray = React.useMemo(
    () => transformDataToArray(profileData),
    [profileData]
  );

  // console.log("profile data: ", profileData);

  const ratings = ratingData?.data.map((item) => ({
    name: item._id,
    data: [item.averageRating], // Wrap in an array
  }));
  // console.log("Ratings : ",ratings);
  const fallbackData = [{ name: "No Rating", data: [0] }];

  const handleFilterChange = (dateStrings: [string, string]) => {
    setFilters(dateStrings);
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  const { data: pnlData } = useFetchData(`/analytics/pnl/single/${userId}`);

  const transformPnlDataToBarGraphFormat = (
    data: any,
    timeRange: "7days" | "1month" | "1year"
  ) => {
    if (!data || !data.data || !Array.isArray(data.data)) {
      return {
        data: [{ name: "Net P&L", data: [] }],
        categories: [],
      };
    }

    // Sort the data by date
    const sortedData = [...data.data].sort(
      (a, b) => new Date(a._id).getTime() - new Date(b._id).getTime()
    );

    const endDate = new Date(); // Today
    let startDate: Date;

    switch (timeRange) {
      case "7days":
        startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - 6); // Last 7 days including today
        break;
      case "1month":
        startDate = new Date(endDate);
        startDate.setMonth(endDate.getMonth() - 1);
        break;
      case "1year":
        startDate = new Date(endDate);
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
      default:
        startDate = new Date(sortedData[0]._id);
    }

    const pnlValues: number[] = [];
    const categories: string[] = [];

    // Function to aggregate monthly data
    const aggregateMonthlyData = () => {
      const monthlyData: { [key: string]: number } = {};
      for (const item of sortedData) {
        const date = new Date(item._id);
        const monthYear = date.toLocaleString("default", {
          month: "short",
          year: "numeric",
        });
        monthlyData[monthYear] = (monthlyData[monthYear] || 0) + item.totalPnL;
      }
      return monthlyData;
    };

    if (timeRange === "1year") {
      const monthlyData = aggregateMonthlyData();
      for (
        let d = new Date(startDate);
        d <= endDate;
        d.setMonth(d.getMonth() + 1)
      ) {
        const monthYear = d.toLocaleString("default", {
          month: "short",
          year: "numeric",
        });
        pnlValues.push(monthlyData[monthYear] || 0);
        categories.push(monthYear);
      }
    } else {
      for (
        let d = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + 1)
      ) {
        const dateString = d.toISOString().split("T")[0];
        const dataPoint = sortedData.find((item) => item._id === dateString);

        pnlValues.push(dataPoint ? dataPoint.totalPnL : 0);

        // Format the date for categories
        let formattedDate;
        if (timeRange === "7days") {
          formattedDate = d.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          });
        } else {
          formattedDate = d.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });
        }
        categories.push(formattedDate);
      }

      // Replace the last two categories with "Yesterday" and "Today" for 7 days and 1 month
      if (categories.length >= 2 && timeRange !== "1year") {
        categories[categories.length - 2] = "Yesterday";
        categories[categories.length - 1] = "Today";
      }
    }

    return {
      data: [{ name: "Net P&L", data: pnlValues }],
      categories: categories,
    };
  };

  const [timeRange, setTimeRange] = useState<"7days" | "1month" | "1year">(
    "7days"
  );
  const timeRangeItems: MenuProps["items"] = [
    { key: "7days", label: "Last 7 Days" },
    { key: "1month", label: "Last Month" },
    { key: "1year", label: "Last Year" },
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setTimeRange(e.key as "7days" | "1month" | "1year");
  };

  const menu = <Menu onClick={handleMenuClick} items={timeRangeItems} />;

  const { data: barGraphData, categories: barGraphCategories } = useMemo(
    () => transformPnlDataToBarGraphFormat(pnlData, timeRange),
    [pnlData, timeRange]
  );

  const formatValue = (value: string | number): string => {
    const numValue = typeof value === "string" ? parseFloat(value) : value;

    if (isNaN(numValue)) {
      return value.toString();
    }

    if (Number.isInteger(numValue)) {
      return numValue.toString();
    }

    return numValue.toFixed(2);
  };


  const { data: winLossData } = useFetchData(`/analytics/getWinLossRatio/${userId}`);
  console.log("winLossData", winLossData)
  const donutChartData = [winLossData?.data.winPercentage, winLossData?.data.lossPercentage];
  const donutChartLabels = ["Win", "Loss"];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <CustomLayout>
      <div className="p-10 bg-white">
        <ProfileSection
          //@ts-ignore
          user={userData && userData?.data}
        />
        <Row gutter={16} className="mt-10 px-10">
          {dataArray.map((item, index) => (
            <Col span={6} key={index}>
              <StatsBox
                title={item.title}
                value={formatValue(item.value)}
                //@ts-ignore
                // color={item.color}
              />
            </Col>
          ))}
        </Row>
        <Flex justify="space-between" className="mt-10 px-10">
          <div className="w-[48%] flex flex-col ">
            <div className="flex justify-end">
              <Dropdown overlay={menu} placement="bottomRight" arrow>
                <Button>
                  {timeRange === "7days"
                    ? "Last 7 Days"
                    : timeRange === "1month"
                    ? "Last Month"
                    : "Last Year"}
                </Button>
              </Dropdown>
            </div>
            <div className="border rounded-xl border-slate-200 bg-white">

            <BarGraph
              data={barGraphData}
              categories={barGraphCategories}
              title="P&L Graph"
              colors={["#34D399", "#F87171"]}
              />
              </div>
          </div>
          <div className="w-[48%] border rounded-xl border-slate-200 bg-white">
            <DonutChart
              data={donutChartData}
              labels={donutChartLabels}
              title="Win Percentage"
              colors={["#34D399", "#F87171"]}
            />
          </div>
        </Flex>
        <div className="w-full flex flex-col">
          <div className="w-full flex justify-end">
            <RangePicker
              disabledDate={(current) =>
                current && current > moment().endOf("day")
              }
              onChange={(_, dateStrings) => handleFilterChange(dateStrings)}
              // ranges={{
              //   Today: [dayjs(), dayjs()],
              //   Yesterday: [
              //     dayjs().subtract(1, "days"),
              //     dayjs().subtract(1, "days"),
              //   ],
              //   "Last 7 Days": [dayjs().subtract(7, "days"), dayjs()],
              //   "Last 30 Days": [dayjs().subtract(30, "days"), dayjs()],
              // }}
            />
          </div>
          <Card>
            <AreaChart
              title={"Ratings"}
              data={ratings?.length ? ratings : fallbackData}
              categories={
                ratings?.map((item) => item.name) ||
                fallbackData.map((item) => item.name)
              }
              colors={["cyan"]}
            />
          </Card>
        </div>
        <div className="mt-10 px-10">
          <RecentTradesTable userId={userId!} />
        </div>
        <div className="mt-10 px-10">
          <CustomCalendar userId={userId || ""} />
        </div>
      </div>
    </CustomLayout>
  );
};

export default UserProfile;
