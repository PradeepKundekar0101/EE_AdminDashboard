import { useEffect, useState } from 'react'
import { Modal, Collapse } from 'antd'
import useFetchData from '../../../hooks/useFetchData'

interface JournalModalProps {
  userId: string
  selectedValue: any
  isVisible: boolean
  onClose: () => void
}

interface Entry {
  _id: string
  type: string
  responses: {
    question: {
      title: string
    } | null
    answer: string
  }[]
}

// Function to check if a date string is already formatted
const isFormattedDate = (dateStr: string) => {
  // Regex to match the YYYY-MM-DD format
  const regex = /^\d{4}-\d{2}-\d{2}$/
  return regex.test(dateStr)
}

const JournalModal: React.FC<JournalModalProps> = ({
  userId,
  selectedValue,
  isVisible,
  onClose
}) => {
  const [entries, setEntries] = useState<Entry[]>([])

  // Check if selectedValue is already formatted
  let formattedDate

  try {
    formattedDate = isFormattedDate(selectedValue.format('YYYY-MM-DD'))
      ? selectedValue.format('YYYY-MM-DD')
      : selectedValue.toString()
  } catch (error) {
    console.error('Error formatting date:', error)
    formattedDate = selectedValue.toString()
  }

  const {
    data: apiResponse,
    loading,
    error
  } = useFetchData<{ status: string; data: Entry[] }>(
    `/journal/singleUser/${userId}?date=${formattedDate}`
  )

  useEffect(() => {
    if (apiResponse) {
      setEntries(apiResponse.data)
    }
  }, [apiResponse])

  return (
    <Modal
      title='Daily Journaling'
      visible={isVisible}
      onCancel={onClose}
      footer={null}
    >
      <div>
        <div className='text-lg font-bold'>
          {formattedDate} <span className='text-green-500'>P&L: 3000</span>
        </div>
        <div className='grid grid-cols-2 gap-4 mt-4'>
          <div className='p-4 border rounded-lg'>
            <div className='text-lg'>Total Trades</div>
            <div className='text-2xl font-bold'>3</div>
          </div>
          <div className='p-4 border rounded-lg'>
            <div className='text-lg'>Win rate Percentage</div>
            <div className='text-2xl font-bold'>100%</div>
          </div>
          <div className='p-4 border rounded-lg'>
            <div className='text-lg'>Losers</div>
            <div className='text-2xl font-bold'>0</div>
          </div>
          <div className='p-4 border rounded-lg'>
            <div className='text-lg'>Winners</div>
            <div className='text-2xl font-bold'>3</div>
          </div>
        </div>
        <h2 className='text-lg font-bold mt-2'>Journal Entries</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error loading data.</p>}
        {!loading && !error && entries.length === 0 && (
          <p>Not able to fetch any questions.</p>
        )}
        {!loading && !error && entries.length > 0 && (
          <div>
            {entries.map(entry => (
              <div key={entry._id} className='p-1 rounded-lg'>
                <div className='font-bold'>
                  {entry.type || 'Type not available'}
                </div>
                <Collapse accordion>
                  {entry.responses.map((response, index) => (
                    <Collapse.Panel
                      header={response.question?.title || 'Title not available'}
                      key={index}
                    >
                      <p>{response.answer || 'Answer not available'}</p>
                    </Collapse.Panel>
                  ))}
                </Collapse>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  )
}

export default JournalModal
