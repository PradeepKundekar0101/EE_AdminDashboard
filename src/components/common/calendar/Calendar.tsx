import { useState } from 'react';
import { Calendar, Card, Modal, Collapse } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import './Calendar.css';

const CustomCalendar: React.FC = () => {
  const [value, setValue] = useState<Dayjs>(() => dayjs('2024-06-01'));
  const [selectedValue, setSelectedValue] = useState<Dayjs>(() => dayjs('2024-06-01'));
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found:a welcome guest in many households across the world.
  `;

  const items = [
    {
      key: '1',
      label: 'This is panel header 1',
      children: <p>{text}</p>,
    },
    {
      key: '2',
      label: 'This is panel header 2',
      children: <p>{text}</p>,
    },
    {
      key: '3',
      label: 'This is panel header 3',
      children: <p>{text}</p>,
    },
  ];

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
          <div className="mt-4">
            <div className="mb-4">
              <div className="font-bold">Journal Entries</div>
              <div className="mt-5">
                <Collapse accordion items={items} />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CustomCalendar;
