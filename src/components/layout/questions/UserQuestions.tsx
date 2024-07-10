import React, { useState } from 'react'
import {
  Table,
  Tag,
  Button,
  Space,
  Drawer,
  Form,
  Input,
  Select,
  Checkbox,
  Modal
} from 'antd'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar
} from 'recharts'
import EditIcon from '../../../assets/images/edit.svg'
import DeleteIcon from '../../../assets/images/trash.svg'

const { Option } = Select

interface Question {
  key: string
  question: string
  type: string
  responses: number
  created: string
  status: string
}

const data: Question[] = [
  {
    key: '1',
    question: 'Sample Question 1',
    type: 'Text',
    responses: 4,
    created: '7 days ago',
    status: 'Active'
  },
  {
    key: '2',
    question: 'Sample Question 2',
    type: 'Number',
    responses: 5,
    created: '7 days ago',
    status: 'Active'
  },
  {
    key: '3',
    question: 'Sample Question 3',
    type: 'Selection',
    responses: 4,
    created: '7 days ago',
    status: 'Inactive'
  },
  {
    key: '4',
    question: 'Sample Question 4',
    type: 'Text',
    responses: 4,
    created: '7 days ago',
    status: 'Active'
  }
]

const responseData = [
  { name: 'Apr 10', Entry1: 4000, Entry2: 2400 },
  { name: 'Apr 17', Entry1: 3000, Entry2: 1398 },
  { name: 'Apr 24', Entry1: 2000, Entry2: 9800 },
  { name: 'May 01', Entry1: 2780, Entry2: 3908 },
  { name: 'May 08', Entry1: 1890, Entry2: 4800 },
  { name: 'May 15', Entry1: 2390, Entry2: 3800 },
  { name: 'May 23', Entry1: 3490, Entry2: 4300 }
]

const performanceData = [
  { name: 'Jan', uv: 4000 },
  { name: 'Mar', uv: 3000 },
  { name: 'May', uv: 2000 },
  { name: 'Jul', uv: 2780 }
]

const JournalManagement: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [drawerType, setDrawerType] = useState<'add' | 'edit'>('add')
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)

  const [form] = Form.useForm()

  const showDrawer = (
    type: 'add' | 'edit',
    question: Question | null = null
  ) => {
    setDrawerType(type)
    setCurrentQuestion(question)
    setDrawerVisible(true)
    if (question) {
      form.setFieldsValue(question)
    } else {
      form.resetFields()
    }
  }

  const closeDrawer = () => {
    setDrawerVisible(false)
    setCurrentQuestion(null)
  }

  const showDeleteConfirm = (question: Question) => {
    setCurrentQuestion(question)
    setDeleteModalVisible(true)
  }

  const handleDelete = () => {
    // Call delete API
    setDeleteModalVisible(false)
    setCurrentQuestion(null)
  }

  const handleEdit = (record: Question) => {
    showDrawer('edit', record)
  }

  const handleFormSubmit = (values: any) => {
    if (drawerType === 'add') {
      // Call API to add question
    } else {
      // Call API to update question
    }
    closeDrawer()
  }

  const columns = [
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Responses',
      dataIndex: 'responses',
      key: 'responses'
    },
    {
      title: 'Created',
      dataIndex: 'created',
      key: 'created'
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status: string) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Question) => (
        <Space size='middle'>
          <img
            src={EditIcon}
            alt='Edit'
            onClick={() => handleEdit(record)}
            className='cursor-pointer'
          />
          <img
            src={DeleteIcon}
            alt='Delete'
            className='cursor-pointer'
            onClick={() => showDeleteConfirm(record)}
          />
        </Space>
      )
    }
  ]

  return (
    <div className='p-6'>
      <h2 className='text-xl font-bold mb-4'>Manage Journal Questions</h2>
      <Button type='primary' onClick={() => showDrawer('add')}>
        Add Question
      </Button>
      <Table
        className='mt-4'
        columns={columns}
        dataSource={data}
        pagination={false}
      />

      <Drawer
        title={drawerType === 'add' ? 'Add Question' : 'Edit Question'}
        width={360}
        onClose={closeDrawer}
        visible={drawerVisible}
      >
        <Form form={form} layout='vertical' onFinish={handleFormSubmit}>
          <Form.Item
            name='question'
            label='Question Title'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='type'
            label='Question Type'
            rules={[{ required: true }]}
          >
            <Select>
              <Option value='Text'>Text</Option>
              <Option value='Number'>Number</Option>
              <Option value='Selection'>Selection</Option>
            </Select>
          </Form.Item>
          <Form.Item name='required' valuePropName='checked'>
            <Checkbox>Required</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              {drawerType === 'add' ? 'Submit' : 'Update'}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>

      <Modal
        title='Confirm Deletion'
        visible={deleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
        okText='Confirm'
        cancelText='Cancel'
      >
        <p>Are you sure you want to delete this question?</p>
      </Modal>

      <div className='mt-8'>
        <h2 className='text-xl font-bold mb-4'>Analytics</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div>
            <h3 className='text-lg font-semibold mb-2'>Response Count</h3>
            <LineChart
              width={500}
              height={300}
              data={responseData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type='monotone'
                dataKey='Entry1'
                stroke='#8884d8'
                activeDot={{ r: 8 }}
              />
              <Line type='monotone' dataKey='Entry2' stroke='#82ca9d' />
            </LineChart>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-2'>
              Journaling Performance
            </h3>
            <BarChart
              width={500}
              height={300}
              data={performanceData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey='uv' fill='#8884d8' />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JournalManagement