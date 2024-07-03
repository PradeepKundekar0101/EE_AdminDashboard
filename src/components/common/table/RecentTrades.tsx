import { Table, Card, Button } from 'antd';

import type { ColumnsType } from 'antd/es/table';

interface TradeData {
  key: string;
  symbol: string;
  netPL: number;
  quantity: number;
  closed: string;
}

const data: TradeData[] = [
  { key: '1', symbol: 'ABC', netPL: 4534.23, quantity: 12, closed: '19/2/2023' },
  { key: '2', symbol: 'DEF', netPL: 453.23, quantity: 72, closed: '19/2/2023' },
  { key: '3', symbol: 'XYZ', netPL: 1453.12, quantity: 2, closed: '19/2/2023' },
  { key: '4', symbol: 'ABC', netPL: 1453.43, quantity: 90, closed: '19/2/2023' },
  { key: '5', symbol: 'DEF', netPL: 1453.43, quantity: 90, closed: '19/2/2023' },
  { key: '6', symbol: 'ABC', netPL: 1453.43, quantity: 90, closed: '19/2/2023' },
  { key: '7', symbol: 'DEF', netPL: 1453.43, quantity: 90, closed: '19/2/2023' },
  { key: '8', symbol: 'XYZ', netPL: 1453.43, quantity: 90, closed: '19/2/2023' },
  { key: '9', symbol: 'PQR', netPL: 1453.43, quantity: 90, closed: '19/2/2023' },
  { key: '10', symbol: 'XYZ', netPL: 1453.43, quantity: 90, closed: '19/2/2023' },
];

const columns: ColumnsType<TradeData> = [
    {
      title: 'SYMBOL',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: 'Net P&L',
      dataIndex: 'netPL',
      key: 'netPL',
      sorter: (a, b) => a.netPL - b.netPL,
      render: (text: number) => (
        <span style={{ color: text > 0 ? '#00b894' : '#ff5252' }}>{text}</span>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: 'Closed',
      dataIndex: 'closed',
      key: 'closed',
      sorter: (a, b) => new Date(a.closed).getTime() - new Date(b.closed).getTime(),
    },
  ];

const RecentTradesTable = () => {


  return (
    <Card title="Recent Trades" extra={<span>Last update 12/06/2024</span>}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 5,
          position: ['bottomCenter'],
          showQuickJumper: true,
        }}
      />
      <div style={{ textAlign: 'right', marginTop: 16 }}>
        <Button type="primary" style={{ marginRight: 8 }}>Prev</Button>
        <Button type="primary">Next</Button>
      </div>
    </Card>
  );
};

export default RecentTradesTable;
