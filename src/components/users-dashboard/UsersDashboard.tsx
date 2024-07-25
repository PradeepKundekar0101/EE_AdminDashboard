import React, { useEffect, useState } from 'react'
import { Button, Tag } from 'antd'
import { CloudDownloadOutlined } from '@ant-design/icons'

import { Flex } from 'antd'

import useUserService from '../../hooks/useUserService'
import { IUser } from '../../types/data'
import { ColumnsType } from 'antd/es/table'
import CustomTable from '../common/table/CustomTable'
import { useAppSelector } from '../../redux/hooks'


const UsersDashboard: React.FC = () => {
  const {getAllUsers} = useUserService();
  const user = useAppSelector((state)=>state.auth.user)
  const [users, setUsers] = useState<IUser[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isLoading,setIsLoading] = useState(false);

  const fetchAllUser = async()=>{
    try {
      setIsLoading(true);
      const res= await getAllUsers();
      if(res.status===200){
        setUsers(res.data.data);
        setTotalUsers(res.data.data.length);
      }
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(()=>{
    fetchAllUser();
  },[])

  const columns: ColumnsType<IUser> = [
    {
      title: 'User',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (_:string, record:IUser) => `${record.firstName ?? "Not Available"} ${record.lastName ?? "Not Available"}`,
      sorter: (a:IUser, b:IUser) => (a.firstName ?? '').localeCompare(b.firstName ?? ''),
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
      title: 'Mentor',
      dataIndex: 'mentor',
      key: 'mentor',
      render: (_,record:any) => record.mentor?record.mentor.firstName+" "+record.mentor.lastName:`Not assigned`,
    },
    {
      title: 'Occupation',
      dataIndex: 'occupation',
      key: 'occupation',
      render: (_, record) => `${!record.occupation?"Couldn't fetch":record.occupation}`,
    },
    {
      title: 'Broker Connected',
      dataIndex: 'isBrokerConnected',
      key: 'isBrokerConnected',
      render: (isBrokerConnected:boolean) => (
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


  return (
    <div className='p-10'>
      <h1 className='text-2xl font-bold mb-4'>All USERS</h1>
      <div className='border border-[#EAECF0]'>
        <Flex justify='space-between' align='center' className='px-6 py-6'>
          <div>
            <p>
              <span className='text-lg font-bold mr-2'> Users</span>
              <Tag color='cyan'>Total Users: {totalUsers}</Tag>
            </p>
            <p className='text-light-grey'>List of all users </p>
          </div>
          <Button type='default' icon={<CloudDownloadOutlined />}>
            Export
          </Button>
        </Flex>
      </div>
      <CustomTable totalDocuments={users.length} loading={isLoading} data={users} columns={columns} pageSize={10} />
    </div>
  )
}

export default UsersDashboard
