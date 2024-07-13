import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Tag } from 'antd'
import { CloudDownloadOutlined } from '@ant-design/icons'
import { User } from '../users-table/UsersTable'
import { Flex } from 'antd'
import UsersTable from '../users-table/UsersTable'

const BASE_URL = import.meta.env.VITE_BASE_URL

const UsersDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [totalUsers, setTotalUsers] = useState(0)
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios
      .get(`${BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }) // Adjust the API endpoint accordingly
      .then(response => {
        setUsers(response.data.data)
        setTotalUsers(response.data.data.length)
      })
      .catch(error => console.error('Error fetching users data:', error))
  }, [token])

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

      <UsersTable users={users} />
    </div>
  )
}

export default UsersDashboard
