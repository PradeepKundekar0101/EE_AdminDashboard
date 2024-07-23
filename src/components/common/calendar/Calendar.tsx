import { useState, useEffect } from 'react';
import { Calendar, Card, Modal, Collapse } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import './Calendar.css';
import useFetchData from '../../../hooks/useFetchData';

interface CalendarProps {
  userId: string;
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

const CustomCalendar: React.FC<CalendarProps> = ({ userId }) => {
  const [value, setValue] = useState<Dayjs>(() => dayjs('2024-06-01'));
  const [selectedValue, setSelectedValue] = useState<Dayjs>(() => dayjs('2024-06-01'));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);

  const { data: apiResponse, loading, error } = useFetchData<{ status: string; data: Entry[] }>(
    `/journal/singleUser/669174fcd1b67cec4e72596d?date=${selectedValue.format('YYYY-MM-DD')}`
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

    const key = `${year}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}`;

    return (
      <div
        key={key}
        className="custom-calendar-cell grid place-content-center border-black px-8 py-4"
        onClick={() => handleDateClick(value)}
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
            {selectedValue.format('ddd, DD MMMM YYYY')}{' '}
            <span className="text-green-500">P&L: 3000</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-4 border rounded-lg">
              <div className="text-lg">Total Trades</div>
              <div className="text-2xl font-bold">3</div>
            </div>
          <div className="p-4 border rounded-lg">
              <div className="text-lg">Win rate Percentage</div>
              <div className="text-2xl font-bold">100%</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-lg">Losers</div>
              <div className="text-2xl font-bold">0</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-lg">Winners</div>
              <div className="text-2xl font-bold">3</div>
            </div>
            </div>
          <h2 className="text-lg font-bold mt-2">Journal Enteries</h2>
          {loading && <p>Loading...</p>}
          {error && <p>Error loading data.</p>}
          {!loading && !error && entries.length === 0 && (
            <p>Not able to fetch any questions.</p>
          )}
          {!loading && !error && entries.length > 0 && (
            <div>
              {entries.map((entry) => (
                <div key={entry._id} className="p-1 rounded-lg">
                  <div className="font-bold">{entry.type || 'Type not available'}</div>
                  <Collapse accordion>
                    {entry.responses.map((response, index) => (
                      <Collapse.Panel
                        header={response.question?.title || 'Title not available'}
                        key={index}
                      >
                        <p>{response.answer || 'Answer not available'}</p>
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
