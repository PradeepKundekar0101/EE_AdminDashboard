import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Tag } from 'antd'
import { CloudDownloadOutlined } from '@ant-design/icons'
import MentorsTable from '../mentors-table/MentorsTable'
import { Mentor } from '../mentors-table/MentorsTable'
import { Flex } from 'antd' // Assuming you have a Flex component from Ant Design

const BASE_URL = import.meta.env.VITE_BASE_URL

const MentorsDashboard: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [totalMentors, setTotalMentors] = useState(0)
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios
      .get(`${BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }) // Adjust the API endpoint accordingly
      .then(response => {
        console.log('response: ', response)
        setMentors(response.data.data)
        setTotalMentors(response.data.data.length)
      })
      .catch(error => console.error('Error fetching mentors data:', error))
  }, [token])

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>All MENTORS</h1>
      <div className='border border-[#EAECF0]'>
      <Flex justify='space-between' align='center' className='px-6 py-6'>
        <div>
          <p>
           <span className='text-lg font-bold mr-2'> Mentors</span>
            <Tag color='cyan'>Total Mentors: {totalMentors}</Tag>
          </p>
          <p className='text-light-grey'>List of all mentors </p>
        </div>
        <Button type='default' icon={<CloudDownloadOutlined />}>
          Export
        </Button>
      </Flex>
      </div>
     
      <MentorsTable mentors={mentors} />
    </div>
  )
}

export default MentorsDashboard
