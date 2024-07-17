import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import CustomLayout from "../../components/layout/custom-layout/CustomLayout";
import AreaChart from "../../components/graphs/area-chart/AreaChart";
import BarGraph from "../../components/graphs/bar-graphs/BarGraph";

const responseCountData = [
  {
    name: 'Entry 1',
    data: [40, 46,56, 41, 47, 54, 43, 47,54, 43],
  },
  {
    name: 'Entry 2',
    data: [20, 26, 36, 21, 27, 34, 23, 27, 34, 23],
  },
];
const responseCountCategories = [
  '2023-04-30T00:00:00.000Z',
  '2023-05-01T00:00:00.000Z',
  '2023-05-02T00:00:00.000Z',
  '2023-05-03T00:00:00.000Z',
  // Add more dates here
];

const journalingPerformanceData = [
  {
    name: 'Completed',
    data: [49, 41, 35, 51, 49, 62],
  },
  {
    name: 'Remaining',
    data: [51, 59, 65, 49, 51, 38],
  },
];
const journalingPerformanceCategories = ['Jan', 'Mar', 'May', 'Jul'];


const Analytics = () => {
  return (
    <CustomLayout>
      <div className="mt-8 mx-4 p-6">
        <h2 className="text-xl font-bold mb-4">Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
          <div className="border rounded-xl border-slate-200 bg-white">

          <AreaChart 
            data={responseCountData} 
            categories={responseCountCategories} 
            title="Response Count" 
            colors={['#6366F1', '#34D399']} 
          />
          </div>
          <div className="border rounded-xl border-slate-200 bg-white">
            <BarGraph 
            data={journalingPerformanceData} 
            categories={journalingPerformanceCategories} 
            title="Journaling Performance" 
            colors={['#3B82F6', '#D1D5DB']} 
          />
          </div>
        </div>
      </div>
    </CustomLayout>
  );
};

export default Analytics;
