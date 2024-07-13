import React from 'react';
import { Table, Button, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  updatedAt: string;
  isEmailVerified: boolean;
  phoneNumber: number;
}

interface UsersTableProps {
    users: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const columns: ColumnsType<User> = [
    {
      title: 'User',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (text, record) => `${record.firstName} ${record.lastName}`,
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
        title: 'Contact Number',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        render: (text, record) => `${record.phoneNumber}`,
        // sorter: (a, b) => Number(a.phoneNumber) - Number(b.phoneNumber),
      },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    // {
    //   title: 'Students',
    //   dataIndex: 'students',
    //   key: 'students',
    //   sorter: (a, b) => a.students - b.students,
    // },
    {
      title: 'Login',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
    },
    {
      title: 'Account Status',
      dataIndex: 'isEmailVerified',
      key: 'isEmailVerified',
      render: (isEmailVerified) => (
        <Tag color={isEmailVerified ? 'green' : 'red'}>
          {isEmailVerified ? 'Active' : 'Inactive'}
        </Tag>
      ),
      sorter: (a, b) => Number(a.isEmailVerified) - Number(b.isEmailVerified),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button type="link" href={`/profile/${record._id}`}>
          View Profile
        </Button>
      ),
    },
  ];

  return <Table columns={columns} dataSource={users} rowKey="_id" />;
};

export default UsersTable;
