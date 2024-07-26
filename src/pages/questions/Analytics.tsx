import React, { useState } from "react";
import { DatePicker, message } from "antd";
import moment from "moment";
import CustomLayout from "../../components/layout/custom-layout/CustomLayout";
import AreaChart from "../../components/graphs/area-chart/AreaChart";
import BarGraph from "../../components/graphs/bar-graphs/BarGraph";
import useFetchData from "../../hooks/useFetchData";
import { useAppSelector } from "../../redux/hooks";

const { RangePicker } = DatePicker;

interface Entry {
  date: string;
  entry: number;
  exit: number;
}

const Analytics: React.FC = () => {
  const getFormattedDate = (date: Date): string => date.toISOString().split("T")[0];

  const yesterday = moment().subtract(1, "days").toDate();
  const defaultFromDate = getFormattedDate(yesterday);
  const defaultToDate = getFormattedDate(new Date());

  const [dateRange, setDateRange] = useState<[string, string]>([defaultFromDate, defaultToDate]);

  const { data: apiResponse, loading, error } = useFetchData<{ status: string; data: Entry[] }>(
    `/analytics/journalTypeTrend?fromDate=${dateRange[0]}&toDate=${dateRange[1]}`
  );

  const responseCountData = ( apiResponse?.status === "success" && apiResponse?.data?.length > 0)
  ? [
    { name: "Entry", data: apiResponse.data.map(entry => entry.entry) },
    { name: "Exit", data: apiResponse.data.map(entry => entry.exit) },
  ]
  : [];
  const darkMode = useAppSelector((state) => state.theme.darkMode);

  const responseCountCategories =apiResponse?.status === "success" 
    ? apiResponse.data.map(entry => entry.date)
    : [];

  const journalingPerformanceData = [
    { name: "Completed", data: [49, 41, 35, 51, 49, 62] },
    { name: "Remaining", data: [51, 59, 65, 49, 51, 38] },
  ];

  const journalingPerformanceCategories = ["Jan", "Mar", "May", "Jul"];

  const handleDateChange = (dates: any, dateStrings: [string, string]) => {
    if (dates) {
      setDateRange(dateStrings);
    } else {
      message.error("Please select both start and end dates.");
    }
  };

  return (
    <CustomLayout>
      <div className="mt-8 mx-4 p-6">
        <h2 className="text-xl font-bold mb-4">Analytics</h2>
        <div className="flex mb-4">
          <RangePicker
            onChange={handleDateChange}
            format="YYYY-MM-DD"
            disabledDate={current => current && current > moment().endOf("day")}
          />
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border rounded-xl border-slate-200 ">
              {responseCountData.length > 0 ? (
                <AreaChart
                  data={responseCountData}
                  categories={responseCountCategories}
                  title="Response Count"
                  colors={["#6366F1", "#34D399"]}
                  darkMode={darkMode}
                />
              ) : (
                <p className="p-4">No data available</p>
              )}
            </div>
            <div className="border rounded-xl border-slate-200 ">
              <BarGraph
                data={journalingPerformanceData}
                categories={journalingPerformanceCategories}
                title="Journaling Performance"
                colors={["#3B82F6", "#D1D5DB"]}
                darkMode={darkMode}
              />
            </div>
          </div>
        )}
      </div>
    </CustomLayout>
  );
};

export default Analytics;
