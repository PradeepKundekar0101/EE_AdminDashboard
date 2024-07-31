import { Segmented } from 'antd'


export const ReviewTypeSelector = ({handleFilterChange}:{handleFilterChange:any}) => {
  return (
    <Segmented<string>
    options={[
      {
        label: (
          <span className="flex items-center">
            {/* <span className="w-2 h-2 bg-slate-600 rounded-full mr-2"></span> */}
            All
          </span>
        ),
        value: 'All',
      },
      {
        label: (
          <span className="flex items-center">
            {/* <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> */}
            Reviewed
          </span>
        ),
        value: 'reviewed',
      },
      {
        label: (
          <span className="flex items-center">
            {/* <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span> */}
            Pending
          </span>
        ),
        value: 'pending',
      },
    ]}
    onChange={(value) =>
      handleFilterChange("reviewStatus", value.toLowerCase())
    }
    className='dark:bg-gray-600 dark:text-black'
  />
  )
}

