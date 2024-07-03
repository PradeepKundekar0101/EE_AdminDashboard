import { Card } from 'antd';
import classNames from 'classnames';

interface StatsProps {
  title: string;
  value: string;
  color: keyof typeof colorClassMapping;
}

const colorClassMapping = {
  black: 'text-black',
  green: 'text-green-500',
} as const;

const StatsBox = ({ title, value, color }: StatsProps) => {
  const colorClass = colorClassMapping[color] || 'text-black';
  return (
    <Card
      style={{
        textAlign: 'left',
        backgroundColor: '#fff',
        borderColor: '#d9d9d9',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)',
      }}
    >
      <p className='text-sm'>{title}</p>
      <p className={classNames('text-2xl font-bold', colorClass)}>{value}</p>
    </Card>
  );
};

export default StatsBox;
