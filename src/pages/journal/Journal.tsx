import {
  Button,
  Carousel,
  CarouselProps,
  Drawer,
  List,
  Tag,
  Rate,
  Form as AntdForm,
  Input,
  message,
  Upload,
  DatePicker,
  ConfigProvider
} from 'antd'

import CustomTable from '../../components/common/table/CustomTable'
import CustomLayout from '../../components/layout/custom-layout/CustomLayout'
import useFetchData from '../../hooks/useFetchData'
import { useAppSelector } from '../../redux/hooks'
import { Navigate } from 'react-router-dom'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import CustomButton from '../../components/ui/button/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import usePostData from '../../hooks/usePostData'
import TextArea from 'antd/es/input/TextArea'
import { UploadOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { JournalTypeSelector } from '../../components/common/journal-type-selector'
import { ReviewTypeSelector } from '../../components/common/journal-review-selector'

interface IFormInput {
  review: string
  rating: number
}
const schema = yup
  .object({
    review: yup.string().required('Review is required').min(4).max(1000),
    rating: yup.number().required('Rating is required')
    // .min(0, 'Minumum rating is 0')
    // .max(0, 'Max rating is 5'),
  })
  .required()

const lightTheme = {
  token: {
    colorBgBase: '#ffffff',
    colorText: '#000000',
    // Add more tokens as needed
  }
}

const darkTheme = {
  token: {
    colorBgBase: '#262633',
    colorText: '#ffffff',
    colorTextPlaceholder: '#ffffff',
    colorBorder: '#ffffff',
    fill: '#ffffff',
    itemActiveBg: '#ffffff',
    itemColor: '#ffffff',
    itemHoverBg: '#ffffff',
    
    // Add more tokens as needed
  }
}
const Journal = () => {
  const user = useAppSelector(state => state.auth.user)
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>({
    resolver: yupResolver(schema)
  })
  const settings: CarouselProps = {
    dots: true,
    infinite: true,
    draggable: true,
    arrows: true,
    speed: 500,
    slidesToShow: 1,

    slidesToScroll: 1
  }
  const [showSideDrawer, setShowSideDrawer] = useState(false)
  const [showAddReviewDrawer, setShowAddReviewDrawer] = useState(false)
  const [selectedJournal, setSelectedJournal] = useState<null | any>(null)

  const [fileList, setFileList] = useState<any[]>([])
  const { RangePicker } = DatePicker

  const [filters, setFilters] = useState({
    searchTerm: '',
    journalType: '',
    reviewStatus: '',
    dateRange: ['', '']
  })

  const {
    // data,
    loading: isReviewAdding,
    error: addReviewError,
    postData
  } = usePostData<any, any>(`/review/add/${user?.role}/${selectedJournal?._id}`)
  if (!user) {
    return <Navigate to={'/login'} />
  }
  const {
    data: journalData,
    loading,
    // error,
    fetchData
  } = useFetchData<any>(
    `journal/all/${user.role}?searchTerm=${filters.searchTerm}&type=${filters.journalType}&reviewStatus=${filters.reviewStatus}&fromDate=${filters.dateRange[0]}&toDate=${filters.dateRange[1]}`
  )

  useEffect(() => {
    fetchData()
  }, [filters])
  const handleFilterChange = (filterName: string, value: string | string[]) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }))
  }
  const {
    // data: uploadData,
    loading: isUploading,
    error: uploadError,
    postData: uploadFiles
  } = usePostData<any, any>(`/review/upload/${selectedJournal?.reviewId}`)

  const handleUpload = async () => {
    const formData = new FormData()
    fileList.forEach(file => {
      formData.append('files', file)
    })
    formData.append('user', selectedJournal?.reviewId)
    try {
      await uploadFiles(formData)
      if (uploadError) {
        message.error(uploadError.message)
      } else {
        message.success('Upload successful')
        setFileList([])
      }
    } catch (error: any) {
      message.error(error?.message || 'Upload failed')
    }
  }

  const uploadProps = {
    onRemove: (file: any) => {
      setFileList(fileList.filter(f => f.uid !== file.uid))
    },
    beforeUpload: (file: any) => {
      setFileList([...fileList, file])
      return false
    },
    fileList
  }

  const columns = [
    {
      title: 'Trader',
      dataIndex: 'userId',
      key: 'userId',
      render: (_: string, record: any) => {
        return (
          <div>
            <h1>
              {record?.userId?.firstName
                ? record?.userId?.firstName
                : "Couldn't fetch name"}
            </h1>
          </div>
        )
      }
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => {
        return (
          <Tag color={text == 'exit' ? 'blue' : 'green'}>
            {!text ? "Couldn't get" : text.toUpperCase()}
          </Tag>
        )
      }
    },
    {
      title: 'Submitted',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => {
        return <h1>{moment(text || '').fromNow()}</h1>
      }
    },
    {
      title: 'Status',
      key: 'reviewId',
      dataIndex: 'reviewId',
      render: (status: string | null) => (
        <Tag color={status ? 'green' : 'red'}>
          {status ? 'Reviewed' : 'Pending'}
        </Tag>
      )
    },
    {
      title: 'Action',
      key: 'view',
      dataIndex: 'view',
      render: (_: any, record: any) => (
        <Button
          onClick={() => {
            setShowSideDrawer(true)
            setSelectedJournal(record)
          }}
        >
          View
        </Button>
      )
    }
  ]
  const onSubmit: SubmitHandler<IFormInput> = async formData => {
    try {
      await postData({ value: formData.review, rating: formData.rating })
      if (addReviewError) {
        message.error(addReviewError.message)
      } else message.success('Review Added')
    } catch (error: any) {
      message.error(error?.message || 'Failed to add')
    }
  }

  const darkMode = useAppSelector(state => state.theme.darkMode)

  return (
    <CustomLayout>
      <div className='px-10'>
        <ConfigProvider theme={darkMode ? darkTheme : lightTheme}>
          <div className='flex w-full justify-between py-7'>
            <Input.Search
              placeholder='Search...'
              value={filters.searchTerm}
              allowClear
              onChange={e => handleFilterChange('searchTerm', e.target.value)}
              style={{ width: 200 }}
            />

            <div className='flex space-x-3'>
              <JournalTypeSelector handleFilterChange={handleFilterChange} />
              <ReviewTypeSelector handleFilterChange={handleFilterChange} />
              <RangePicker
                disabledDate={current =>
                  current && current > moment().endOf('day')
                }
                onChange={(_, dateStrings) =>
                  handleFilterChange('dateRange', dateStrings)
                }
                ranges={{
                  Today: [dayjs(), dayjs()],
                  Yesterday: [
                    dayjs().subtract(1, 'days'),
                    dayjs().subtract(1, 'days')
                  ],
                  'Last 7 Days': [dayjs().subtract(7, 'days'), dayjs()],
                  'Last 30 Days': [dayjs().subtract(30, 'days'), dayjs()]
                }}
                className='dark:bg-gray-800 dark:text-white'
              />
            </div>
          </div>

          <Drawer
            open={showSideDrawer}
            onClose={() => {
              setShowSideDrawer(false)
              setSelectedJournal(null)
            }}
            width={'50%'}
            className='dark:bg-gray-900 dark:text-white'
          >
            <div className='border-b-[0.5px] border-slate-300 mb-3 dark:border-gray-700'>
              <div className='flex justify-between'>
                <h1 className='text-xl dark:text-white'>Journal</h1>
                {selectedJournal?.reviewId ? (
                  <Tag
                    color='green'
                    className='flex items-center dark:bg-green-800'
                  >
                    {'Reviewed By ' + selectedJournal?.review.userId}
                  </Tag>
                ) : (
                  <div>
                    <span className='text-orange-500'>Review pending </span>
                    <Button
                      onClick={() => {
                        setShowAddReviewDrawer(true)
                      }}
                      className='dark:bg-gray-800 dark:text-white'
                    >
                      Add Review
                    </Button>
                  </div>
                )}
              </div>
              {selectedJournal && (
                <List
                  dataSource={selectedJournal.responses}
                  renderItem={(item: any, index: number) => (
                    <List.Item key={index}>
                      <List.Item.Meta
                        title={
                          <div>
                            <h1 className='dark:text-white'>Question:</h1>
                            <h1 className='w-full px-3 py-2 rounded-md border-[0.5px] border-slate-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white'>
                              {item?.question?.title}
                            </h1>
                          </div>
                        }
                        description={
                          <div>
                            <h1 className='dark:text-white'>Response:</h1>
                            <h1 className='w-full px-3 py-2 rounded-md border-[0.5px] border-slate-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white'>
                              {item?.answer}
                            </h1>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              )}
            </div>

            <div className='border-b-[0.5px] border-slate-300 pb-3 mb-3 dark:border-gray-700'>
              <h1 className='text-xl dark:text-white'>Emotions:</h1>
              <h1 className='w-full text-sm text-gray-400 px-3 py-2 rounded-md bg-slate-100 border-[0.5px] border-slate-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400'>
                {selectedJournal?.emotion?.value || 'Not recorded'}
              </h1>
            </div>

            <div>
              <div className='border-b-[0.5px] border-slate-300 pb-3 mb-3 dark:border-gray-700'>
                <h1 className='text-xl mb-2 dark:text-white'>
                  Uploads by user:
                </h1>
                {selectedJournal?.uploads?.length === 0 ? (
                  <h1 className='dark:text-white'>No Uploads Found</h1>
                ) : (
                  <Carousel {...settings}>
                    {selectedJournal?.uploads?.map(
                      (upload: any, ind: number) => (
                        <div
                          className='border-slate-200 border rounded-md dark:border-gray-700'
                          key={ind}
                        >
                          <img
                            src={upload.fileUrl}
                            alt={`Upload ${ind + 1}`}
                            style={{
                              width: '100%',
                              height: 'auto',
                              maxHeight: '150px',
                              objectFit: 'contain'
                            }}
                          />
                        </div>
                      )
                    )}
                  </Carousel>
                )}
              </div>

              <div>
                <h1 className='text-xl mb-2 dark:text-white'>
                  Review By Mentor/Admin:
                </h1>
                {!selectedJournal?.reviewId ? (
                  <h1 className='dark:text-white'>No Reviews yet</h1>
                ) : (
                  <div>
                    <h1 className='w-full px-3 py-2 rounded-md bg-slate-100 border-[0.5px] border-slate-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white'>
                      {selectedJournal?.review?.value}
                    </h1>
                    {selectedJournal?.review && (
                      <div className='flex items-center my-3 space-x-2'>
                        <Rate
                          disabled
                          value={selectedJournal?.review?.rating}
                        />
                        <Tag>{selectedJournal?.review?.rating + ' stars'}</Tag>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {selectedJournal && selectedJournal?.review && (
              <div>
                <Upload {...uploadProps}>
                  <Button
                    icon={<UploadOutlined />}
                    className='dark:bg-gray-800 dark:text-white'
                  >
                    Select Files
                  </Button>
                </Upload>
                <Button
                  onClick={handleUpload}
                  disabled={fileList.length === 0 || isUploading}
                  className='dark:bg-gray-800 dark:text-white'
                >
                  {isUploading ? 'Uploading...' : 'Upload'}
                </Button>
              </div>
            )}
            <Drawer
              width={'60%'}
              onClose={() => {
                setShowAddReviewDrawer(false)
              }}
              open={showAddReviewDrawer}
              className='dark:bg-gray-900 dark:text-white'
            >
              <h1 className='text-xl border-b-[0.4px] border-slate-300 pb-2 mb-2 dark:text-white dark:border-gray-700'>
                Add Review
              </h1>
              <AntdForm onFinish={handleSubmit(onSubmit)} layout='vertical'>
                <AntdForm.Item
                  label={
                    <span className='dark:text-white text-base'>Review</span>
                  }
                  validateStatus={errors.review ? 'error' : ''}
                  help={errors.review?.message}
                >
                  <Controller
                    name='review'
                    control={control}
                    render={({ field }) => (
                      <TextArea
                        {...field}
                        className='dark:text-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500'
                      />
                    )}
                  />
                </AntdForm.Item>

                <AntdForm.Item
                  label={
                    <span className='dark:text-white text-base'>
                      Add Rating
                    </span>
                  }
                  validateStatus={errors.rating ? 'error' : ''}
                  help={errors.rating?.message}
                >
                  <Controller
                    name='rating'
                    control={control}
                    render={({ field }) => <Rate {...field} />}
                  />
                </AntdForm.Item>

                <AntdForm.Item>
                  <CustomButton
                    type='primary'
                    htmlType='submit'
                    className='text-xl py-5 bg-dark-teal rounded-md dark:bg-teal-700'
                    isLoading={isReviewAdding}
                    disabled={isReviewAdding}
                  >
                    {loading ? '' : 'Add Review'}
                  </CustomButton>
                </AntdForm.Item>
              </AntdForm>
            </Drawer>
          </Drawer>
        </ConfigProvider>
        <CustomTable
          data={journalData && journalData?.data}
          loading={loading}
          totalDocuments={0}
          columns={columns}
        />
      </div>
    </CustomLayout>
  )
}

export default Journal
