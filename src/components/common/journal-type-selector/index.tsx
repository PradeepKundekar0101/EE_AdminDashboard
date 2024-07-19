import { Segmented } from 'antd'


export const JournalTypeSelector = ({handleFilterChange}:{handleFilterChange:any}) => {
  return (
    <Segmented<string>
    options={[
      {
        label: (
          <span className="flex items-center">
            <span className="w-2 h-2 bg-slate-600 rounded-full mr-2"></span>
            All
          </span>
        ),
        value: 'All',
      },
      {
        label: (
          <span className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Entry
          </span>
        ),
        value: 'Entry',
      },
      {
        label: (
          <span className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Exit
          </span>
        ),
        value: 'Exit',
      },
    ]}
    onChange={(value) =>
      handleFilterChange("journalType", value.toLowerCase())
    }
  />
  )
}

