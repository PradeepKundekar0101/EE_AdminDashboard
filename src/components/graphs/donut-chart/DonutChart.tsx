import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card } from 'antd';

const data = [
  { name: 'Win', value: 80.3 },
  { name: 'Loss', value: 19.7 },
];

const COLORS = ['#00b894', '#ff5252'];

const WinPercentageDonutChart = () => {
  return (
    <Card style={{ padding: '20px' }}>
      <h3 style={{ textAlign: 'center' }}>Win Percentage</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default WinPercentageDonutChart;
