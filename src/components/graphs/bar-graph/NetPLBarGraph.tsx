import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, Select } from 'antd';

const { Option } = Select;

const data = [
  { date: '18 June 2024', value: -500 },
  { date: '19 June 2024', value: 1000 },
  { date: '20 June 2024', value: 700 },
  { date: '21 June 2024', value: 1200 },
  { date: '22 June 2024', value: -800 },
  { date: 'Yesterday', value: 500 },
  { date: 'Today', value: -300 },
];

const NetPLBarGraph = () => {
  const handleChange = (value:string) => {
    console.log(`selected ${value}`);
  };

  return (
    <Card style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Net P&L</h3>
        <Select defaultValue="Last 7 days" style={{ width: 120 }} onChange={handleChange}>
          <Option value="7days">Last 7 days</Option>
          <Option value="14days">Last 14 days</Option>
          <Option value="1month">Last 1 month</Option>
        </Select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" radius={5}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.value >= 0 ? '#00b894' : '#ff5252'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default NetPLBarGraph;
