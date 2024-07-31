import { Card, Skeleton } from 'antd';
import classNames from 'classnames';

interface StatsProps {
  title: string;
  value: string;
  color: keyof typeof colorClassMapping;
  loading?: boolean;
}

const colorClassMapping = {
  black: 'text-black',
  green: 'text-green-500',
  white: 'text-white'
} as const;

const StatsBox = ({ title, value, color, loading = false }: StatsProps) => {
  const colorClass = colorClassMapping[color] || 'dark:text-white text-black';
  
  return (
    <Card
      style={{
        textAlign: 'left',
        borderColor: '#d9d9d9',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)',
        height: '100%', // Set a fixed height for all cards
        display: 'flex',
        flexDirection: 'column',
      }}
      className='dark:bg-dark-blue'
      bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
    >
      {loading ? (
        <Skeleton active paragraph={{ rows: 1 }} />
      ) : (
        <>
          <p className='text-sm dark:text-white'>{title}</p>
          <p className={classNames('text-2xl font-bold', colorClass)}>{value}</p>
        </>
      )}
    </Card>
  );
};

export default StatsBox;