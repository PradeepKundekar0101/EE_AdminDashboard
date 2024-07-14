import React from 'react';
import { Table, Button, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useAppSelector } from '../../redux/hooks';
import { IUser } from '../../types/data';



interface UsersTableProps {
    users: IUser[];
    isLoading:boolean
}

const UsersTable: React.FC<UsersTableProps> = ({ users,isLoading }) => {
  const {user} = useAppSelector((state)=>{
    return state.auth
  })
  const columns: ColumnsType<IUser> = [
    {
      title: 'User',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (_, record) => `${record.firstName} ${record.lastName}`,
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
        title: 'Contact Number',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        render: (_, record) => `${record.phoneNumber}`,
      },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Occupation',
      dataIndex: 'occupation',
      key: 'occupation',
      sorter: (a, b) => a.occupation!.localeCompare(b.occupation!),
    },
    {
      title: 'Broker Connected',
      dataIndex: 'isBrokerConnected',
      key: 'isBrokerConnected',
      render: (isBrokerConnected) => (
        <Tag color={isBrokerConnected ? 'green' : 'red'}>
          {isBrokerConnected ? 'Connected' : 'Not Connected'}
        </Tag>
      ),
      sorter: (a, b) => Number(a.isBrokerConnected) - Number(b.isBrokerConnected),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="link" href={`/${user?.role}/user/${record._id}`}>
          View Profile
        </Button>
      ),
    },
  ];

  return <Table loading={isLoading} columns={columns} dataSource={users} rowKey="_id" />;
};

export default UsersTable;
