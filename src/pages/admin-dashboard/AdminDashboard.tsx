import {
  Button,
  Col,
  DatePicker,
  Dropdown,
  Flex,
  Menu,
  MenuProps,
  Row,
} from "antd";
import StatsBox from "../../components/common/profile-card/ProfileCard";
import CustomLayout from "../../components/layout/custom-layout/CustomLayout";
import DonutChart from "../../components/graphs/donut-chart/DonutChart";
import BarGraph from "../../components/graphs/bar-graph/NewBar";
import useFetchData from "../../hooks/useFetchData";
import { useState } from "react";
import moment from "moment";
import AreaChart from "../../components/graphs/area-chart/AreaChart";
import ReactApexChart from "react-apexcharts";

const { RangePicker } = DatePicker;

const dummyProfileData = [
  { title: "Total holding value", value: "0", color: "#000" },
  { title: "Total holdings quantity", value: "0", color: "#000" },
  { title: "Today's Total P&L ", value: "0", color: "green" },
  { title: "P&L Percentage", value: "0%", color: "green" },
];

const barGraphCategories = [
  "18 June 2024",
  "19 June 2024",
  "20 June 2024",
  "21 June 2024",
  "22 June 2024",
  "Yesterday",
  "Today",
];

const donutChartData = [80.3, 19.7];
const donutChartLabels = ["Win", "Loss"];

// const timeRangeItems: MenuProps["items"] = [
//   { key: "7days", label: "Last 7 Days" },
//   { key: "1month", label: "Last Month" },
//   { key: "1year", label: "Last Year" },
// ];

// const menu = <Menu  items={timeRangeItems} />;

interface Entry {
  date: string;
  entry: number;
  exit: number;
}

let state = {
  series: [76],
  options: {
    chart: {
      type: "radialBar",
      offsetY: -20,
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e7e7e7",
          strokeWidth: "97%",
          margin: 5,
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: "#999",
            opacity: 1,
            blur: 2,
          },
        },
        dataLabels: {
          name: {
            show: true,
            color: "#888",
            fontSize: "15px",
            offsetY: -25,
          },
          value: {
            show: true,
            color: "#111",
            fontSize: "30px",
            offsetY: -5,
            formatter: function (val: number) {
              return val + "%";
            },
          },
        },
        hollow: {
          margin: 15,
          size: "70%",
        },
        cornerRadius: 30,
        lineCap: "round",
      },
    },
    fill: {
      type: "solid",
      colors: ["#34D399"],
    },
    labels: ["Connected Users"],
  },
};

const AdminDashboard = () => {
  const getFormattedDate = (date: Date): string =>
    date.toISOString().split("T")[0];
  const yesterday = moment().subtract(1, "days").toDate();
  const defaultFromDate = getFormattedDate(yesterday);
  const defaultToDate = getFormattedDate(new Date());
  const [filters, setFilters] = useState<[string, string]>(["", ""]);

  const [dateRange, setDateRange] = useState<[string, string]>([
    defaultFromDate,
    defaultToDate,
  ]);

  const { data: apiResponse } = useFetchData<{ status: string; data: Entry[] }>(
    `/analytics/journalTypeTrend?fromDate=${dateRange[0]}&toDate=${dateRange[1]}`
  );

  const responseCountData =
    apiResponse?.status === "success" && apiResponse?.data?.length > 0
      ? [
          { name: "Entry", data: apiResponse.data.map((entry) => entry.entry) },
          { name: "Exit", data: apiResponse.data.map((entry) => entry.exit) },
        ]
      : [];
  console.log("responseCountData: ", responseCountData);

  const responseCountCategories =
    apiResponse?.status === "success"
      ? apiResponse.data.map((entry) => entry.date)
      : [];

  const { data: userCountData } = useFetchData<{
    status: string;
    data: Entry[];
  }>(`/analytics/getConnectedUsersRatio`);
  state.series = [Math.round(userCountData?.data?.connected * 100) / 100];

  const { data: overallPnl } = useFetchData<{
    status: string;
    data: Entry[];
  }>(`/analytics/pnl/overall?fromDate=${filters[0]}&toDate=${filters[1]}`);
  console.log("OPNL = ", overallPnl);

  const pnlCategories = overallPnl?.data.data.map((item) => item._id);
  const pnlData = overallPnl?.data.data.map(
    (item) => Math.round(item.totalPnL * 100) / 100
  );
  console.log(pnlData);

  const barGraphData = [
    {
      name: "Net P&L",
      data: pnlData ? pnlData : [],
    },
  ];

  const handleFilterChange = (dateStrings: [string, string]) => {
    setFilters(dateStrings);
  };

  return (
    <CustomLayout>
      <div className="p-10 bg-white">
        <h1 className="text-3xl font-semibold">Hello Admin 👋</h1>
        <Row gutter={16} className="mt-10 px-10">
          {dummyProfileData.map((item, index) => (
            <Col span={6} key={index}>
              <StatsBox
                title={item.title}
                value={item.value}
                // @ts-ignore
                color={item.color}
              />
            </Col>
          ))}
        </Row>
        <Flex>
          <div className="w-[48%] flex flex-col border rounded-xl border-slate-200 bg-white m-5">
            {responseCountData.length > 0 ? (
              <AreaChart
                data={responseCountData}
                categories={responseCountCategories}
                title="Response Count"
                colors={["#6366F1", "#34D399"]}
                style={{ width: "100%", height: "300px" }}
              />
            ) : (
              <p className="p-4">No data available</p>
            )}
          </div>
          <div className="w-[48%] flex flex-col border rounded-xl border-slate-200 bg-white m-5">
            {/* {responseCountData.length > 0 ? ( */}
            <div className="w-full mt-16">
              <ReactApexChart
                options={state.options}
                series={state.series}
                type="radialBar"
              />
            </div>
            {/* ) : (
              <p className="p-4">No data available</p>
            )} */}
          </div>
        </Flex>
        <Flex justify="space-between" className="mt-10 px-10">
          <div className="w-[48%] flex flex-col m-5">
            <div className="flex justify-end">
              <RangePicker
                disabledDate={(current) =>
                  current && current > moment().endOf("day")
                }
                onChange={(_, dateStrings) => handleFilterChange(dateStrings)}
              />
            </div>
            <div className="border rounded-xl border-slate-200 bg-white">
              <BarGraph
                data={barGraphData}
                categories={pnlCategories}
                title="Net P&L Graph"
                colors={["#34D399", "#F87171"]}
              />
            </div>
          </div>
          <div className="w-[48%] flex flex-col border rounded-xl border-slate-200 bg-white m-5">
            <DonutChart
              data={donutChartData}
              labels={donutChartLabels}
              title="Overall Win Percentage"
              colors={["#34D399", "#F87171"]}
            />
          </div>
        </Flex>
      </div>
    </CustomLayout>
  );
};

export default AdminDashboard;
