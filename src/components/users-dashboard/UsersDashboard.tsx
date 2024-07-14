import React, { useEffect, useState } from 'react'
import { Button, Tag } from 'antd'
import { CloudDownloadOutlined } from '@ant-design/icons'

import { Flex } from 'antd'
import UsersTable from '../users-table/UsersTable'
import useUserService from '../../hooks/useUserService'
import { IUser } from '../../types/data'


const UsersDashboard: React.FC = () => {
  const {getAllUsers} = useUserService();
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


  return (
    <div className='p-4'>
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

      <UsersTable isLoading={isLoading} users={users} />
    </div>
  )
}

export default UsersDashboard
