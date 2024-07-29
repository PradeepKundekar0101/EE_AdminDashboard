import { useState, useEffect } from "react";
import { Calendar, Card, Modal, Collapse } from "antd";
import dayjs, { Dayjs } from "dayjs";
import "./Calendar.css";
import useFetchData from "../../../hooks/useFetchData";

interface CalendarProps {
  userId: string;
  dailyEntries: { date: string; _id: string }[];
  onMonthYearChange: (date: Dayjs) => void;
}

interface Entry {
  _id: string;
  type: string;
  responses: {
    question: {
      title: string;
    } | null;
    answer: string;
  }[];
}

const CustomCalendar: React.FC<CalendarProps> = ({ userId, dailyEntries ,onMonthYearChange}) => {
  const [value, setValue] = useState<Dayjs>(() => dayjs("2024-06-01"));
  const [selectedValue, setSelectedValue] = useState<Dayjs>(() =>
    dayjs("2024-06-01")
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);


  const {
    data: apiResponse,
    loading,
    error,
  } = useFetchData<{ status: string; data: Entry[] }>(
    `/journal/singleUser/${userId}?date=${selectedValue.format("YYYY-MM-DD")}`
  );
  const {
    data: summaryData,
    // loading: isSummaryLoading,
    // error: summaryError,
  } = useFetchData<{
    status: string;
    data: {
      data: { lossCnt: number; totalPnL: number; totalTradesQuantity: number; winCnt: number };
    };
  }>(
    `/analytics/getSummaryForADay/${userId}?date=${selectedValue.format(
      "YYYY-MM-DD"
    )}`
  );

  useEffect(() => {
    if (apiResponse) {
      setEntries(apiResponse.data);
    }
  }, [apiResponse]);

  const handleDateClick = (value: Dayjs) => {
    setSelectedValue(value);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const dateCellRender = (value: Dayjs) => {
    const date = value.date();
    const month = value.month() + 1; // months are 0 indexed
    const year = value.year();

    const key = `${year}-${String(month).padStart(2, "0")}-${String(
      date
    ).padStart(2, "0")}`;
    const isDatePresent = dailyEntries.some((entry) => entry.date === key);

    return (
      <div
        key={key}
        className={`custom-calendar-cell grid place-content-center border-black px-8 py-4 ${
          isDatePresent
            ? "bg-[#007f5f] text-white rounded-lg border-[0.7px] border-[#2d6a4f] m-1"
            : "  rounded-lg cursor-not-allowed"
        }`}
        onClick={() => {
          if (isDatePresent) {
            handleDateClick(value);
          }
        }}
      >
        <div className="custom-calendar-inner">{date}</div>
      </div>
    );
  };

  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue);
    onMonthYearChange(newValue);
  };

  return (
    <div>
      <Card>
        <Calendar
          value={value}
          onSelect={onSelect}
          onPanelChange={onPanelChange}
          dateFullCellRender={dateCellRender}
        />
      </Card>
      <Modal
        title="Daily Journaling"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <div className="text-lg font-bold">
            {selectedValue.format("ddd, DD MMMM YYYY")}{" "}
            {/* <span className={summaryData?.data?.data?.totalPnL || 0 >=0?"text-green-600":"text-red-600"} >P&L: </span> */}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-4 border rounded-lg">
              <div className="text-lg">Profit and Loss</div>
              <div className= {summaryData?.data?.data?.totalPnL || 0 >=0?"text-green-600 text-2xl font-bold":"text-red-600 text-2xl font-bold"}>{summaryData?.data.data.totalPnL}</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-lg">Total Trades</div>
              <div className="text-2xl font-bold">{summaryData?.data.data.totalTradesQuantity}</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-lg">Profitable trades count</div>
              <div className="text-2xl font-bold">{summaryData?.data?.data?.winCnt}</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-lg">Loss trades</div>
              <div className="text-2xl font-bold">{summaryData?.data?.data?.lossCnt}</div>
            </div>
          </div>
          <h2 className="text-lg font-bold mt-2">Journal Entries</h2>
          {loading && <p>Loading...</p>}
          {error && <p>Error loading data.</p>}
          {!loading && !error && entries.length === 0 && (
            <p>Not able to fetch any questions.</p>
          )}
          {!loading && !error && entries.length > 0 && (
            <div>
              {entries.map((entry) => (
                <div key={entry._id} className="p-1 rounded-lg">
                  <div className="font-bold">
                    {entry.type || "Type not available"}
                  </div>
                  <Collapse accordion>
                    {entry.responses.map((response, index) => (
                      <Collapse.Panel
                        header={
                          response.question?.title || "Title not available"
                        }
                        key={index}
                      >
                        <p>{response.answer || "Answer not available"}</p>
                      </Collapse.Panel>
                    ))}
                  </Collapse>
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default CustomCalendar;
