import { ConfigProvider, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../redux/hooks';

interface CustomTableProps {
  columns: any[];
  data: any[];
  totalDocuments: number;
  pageSize?: number;
  loading: boolean;
}

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  data,
  totalDocuments,
  pageSize = 8,
  loading
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const darkMode = useAppSelector((state) => state.theme.darkMode);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const responsiveColumns = columns.map(column => ({
    ...column,
    width: column.width || 100, // Set a default minimum width
  }));

  return (
    <ConfigProvider
      theme={{
        // algorithm: darkMode ? 'dark' : 'default',
        components: {
          Table: {
            // headerBg: darkMode ? '#1f1f1f' : '#E6EEFC',
            headerColor: darkMode ? '#ffffff' : '#000000',
            colorBgContainer: darkMode ? '#262633' : '#ffffff',
            colorText: darkMode ? '#ffffff' : '#000000',
            bodySortBg: darkMode ? '#ffffff' : '#000000',
            headerBorderRadius: 0
          },
          Pagination: {
            itemBg: darkMode ? '#ffffff' : '#000000',
          }
        },
      }}
    >
      <div className="h-full flex flex-col">
        <div className="flex-grow overflow-x-auto">
          <Table
            loading={loading}
            id="myTable"
            rowKey="Id"
            className={`no-wrap-table ${darkMode ? 'dark-mode' : ''}`}
            columns={responsiveColumns}
            dataSource={data}
            pagination={{
              pageSize: pageSize,
              total: totalDocuments,
              showSizeChanger: false,
              showQuickJumper: false,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              simple: isMobile
            }}
            scroll={{
              x: 'max-content',
              y: isMobile ? 'calc(100vh - 300px)' : 'calc(100vh - 250px)'
            }}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default CustomTable;
