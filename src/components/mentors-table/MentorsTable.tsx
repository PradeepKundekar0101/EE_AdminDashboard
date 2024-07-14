import React from 'react';
import { Table, Button, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useAppSelector } from '../../redux/hooks';

export interface Mentor {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  students: number;
  updatedAt: string;
  isEmailVerified: boolean;
}

interface MentorsTableProps {
  mentors: Mentor[];
}

const MentorsTable: React.FC<MentorsTableProps> = ({ mentors }) => {
  const {user} = useAppSelector((state)=>{return state.auth})
  const columns: ColumnsType<Mentor> = [
    {
      title: 'Mentor',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (_, record) => `${record.firstName} ${record.lastName}`,
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Students',
      dataIndex: 'students',
      key: 'students',
      sorter: (a, b) => a.students - b.students,
    },
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
      render: (_, record) => (
        <Button type="link" href={`/${user?.role}/user/${record._id}`}>
          View Profile
        </Button>
      ),
    },
  ];

  return <Table columns={columns} dataSource={mentors} rowKey="_id" />;
};

export default MentorsTable;
