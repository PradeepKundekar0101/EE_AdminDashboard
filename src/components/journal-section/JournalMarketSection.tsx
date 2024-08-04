import { Button, List, Tag } from 'antd'

const JournalMarketSection = ({
  selectedJournal,
  setShowAddReviewDrawer,
  text
}: {
  selectedJournal: any
  setShowAddReviewDrawer: (s: boolean) => void
  text: string
}) => {
  return (
    <div className='border p-2 overflow-auto shadow-md dark:bg-gray-900 dark:text-white'>
      {selectedJournal && (
        <div className='border-b-[0.5px] border-slate-300 mb-3 dark:border-gray-700'>
          <div className='flex justify-between'>
            <h2 className='text-xl mb-2'>{text}</h2>
            {selectedJournal?.reviewId ? (
              <Tag
                color='green'
                className='flex items-center dark:bg-green-800'
              >
                {'Reviewed By ' + selectedJournal?.review.reviewerId}
              </Tag>
            ) : (
              <div className='flex flex-col'>
                <Button
                  onClick={() => {
                    setShowAddReviewDrawer(true)
                  }}
                  className='dark:bg-gray-800 dark:text-white'
                >
                  Add Review
                </Button>
                <span className='text-orange-500'>Review pending </span>
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
      )}
      {!selectedJournal && (
          <h2>No {text} Data Found</h2>
      )}
    </div>
  )
}

export default JournalMarketSection
