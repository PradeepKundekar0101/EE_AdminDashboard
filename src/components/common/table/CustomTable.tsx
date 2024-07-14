import { ConfigProvider, Table } from 'antd';
import { useEffect, useState } from 'react';
interface CustomTableProps{
    columns:any[];
    data:any[];
    totalDocuments:number;
    // handlePageChange:any;
    pageSize?:number,
    loading:boolean;

}
const CustomTable :React.FC<CustomTableProps> = ({ columns, data, totalDocuments, pageSize=8, loading }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
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
        components: {
          Table: {
            headerBg: '#E6EEFC',
            headerBorderRadius: 0
          },
        },
      }}
    >
      <div className="h-full flex flex-col">
        <div className="flex-grow overflow-x-auto"> {/* Add horizontal scroll */}
          <Table
            loading={loading}
            id="myTable"
            rowKey="Id"
            className="no-wrap-table"
            columns={responsiveColumns}
            dataSource={data}
            pagination={{
              pageSize: pageSize,
              total: totalDocuments,
              showSizeChanger: false,
              showQuickJumper: false,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
            //   onChange: handlePageChange,
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