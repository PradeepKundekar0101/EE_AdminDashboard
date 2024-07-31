import { useState } from 'react';
import { Calendar, Card } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import JournalModal from '../journal-modal/JournalModal'; // Import the new modal component

interface CalendarProps {
  userId: string;
}

const CustomCalendar: React.FC<CalendarProps> = ({ userId }) => {
  const [value, setValue] = useState<Dayjs>(dayjs); // Default to current date
  const [selectedValue, setSelectedValue] = useState<Dayjs>(dayjs); // Default to current date
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDateClick = (value: Dayjs) => {
    console.log('value: ', value.format('YYYY-MM-DD'));
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
      <JournalModal
        userId={userId}
        selectedValue={selectedValue}
        isVisible={isModalVisible}
        onClose={handleCancel}
      />
    </div>
  );
};

export default CustomCalendar;
