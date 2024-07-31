import { useState } from "react";
import {
  Table,
  Card,
  Button,
  Segmented,
  Spin,
  message,
  ConfigProvider,
} from "antd";

import useFetchData from "../../../hooks/useFetchData";
import { ReloadOutlined } from "@ant-design/icons";

const holdingsColumns = [
  {
    title: "Symbol",
    dataIndex: "tradingSymbol",
    key: "tradingSymbol",
  },
  {
    title: "Quantity",
    dataIndex: "totalQty",
    key: "totalQty",
  },
  {
    title: "Average Cost",
    dataIndex: "avgCostPrice",
    key: "avgCostPrice",
    render: (text: number) => text?.toFixed(2),
  },
];

const positionsColumns = [
  {
    title: "Symbol",
    dataIndex: "tradingSymbol",
    key: "tradingSymbol",
  },
  {
    title: "Type",
    dataIndex: "positionType",
    key: "positionType",
  },
  {
    title: "Net Quantity",
    dataIndex: "netQty",
    key: "netQty",
  },
  {
    title: "Unrealized P&L",
    dataIndex: "unrealizedProfit",
    key: "unrealizedProfit",
    render: (text: number) => (
      <span style={{ color: text > 0 ? "#00b894" : "#ff5252" }}>
        {text?.toFixed(2)}
      </span>
    ),
  },
];

const RecentTradesTable = ({ userId }: { userId: string }) => {
  const [activeTab, setActiveTab] = useState<"Holdings" | "Positions">(
    "Holdings"
  );

  const {
    data: holdings,
    error: holdingsError,
    loading: holdingsLoading,
    fetchData: reloadHoldingData,
  } = useFetchData<any>(`/broker/getHoldingsAdmin/${userId}`);

  const {
    data: positions,
    error: positionsError,
    loading: positionsLoading,
    fetchData: reloadPositionData,
  } = useFetchData<any>(`/broker/getPositionsAdmin/${userId}`);

  const handleTabChange = (value: "Holdings" | "Positions") => {
    setActiveTab(value);
  };

  const isLoading =
    activeTab === "Holdings" ? holdingsLoading : positionsLoading;
  const error = activeTab === "Holdings" ? holdingsError : positionsError;

  if (error) {
    message.error("Failed to fetch data");
  }

  const tableData =
    activeTab === "Holdings"
      ? holdings?.data?.data?.data
      : positions?.data?.data?.data;
  const columns = activeTab === "Holdings" ? holdingsColumns : positionsColumns;

  return (
    <ConfigProvider>
      <div className="w-full">
        <div className="w-full flex justify-start space-x-2 items-center mb-4">
          <Segmented
            value={activeTab}
            onChange={(value) =>
              handleTabChange(value as "Holdings" | "Positions")
            }
            options={["Holdings", "Positions"]}
          />

          <Button
            onClick={() => {
              activeTab === "Holdings"
                ? reloadHoldingData()
                : reloadPositionData();
            }}
            icon={<ReloadOutlined />}
          >
            Refresh
          </Button>
        </div>

        <Card title={activeTab}>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Spin size="large" />
            </div>
          ) : (
            <Table
            
              columns={columns}
              dataSource={tableData}
              pagination={{
                pageSize: 5,
                position: ["bottomCenter"],
                showQuickJumper: true,
              }}
            />
          )}
        </Card>
      </div>
    </ConfigProvider>
  );
};

export default RecentTradesTable;
