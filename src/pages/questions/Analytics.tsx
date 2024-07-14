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
const responseData = [
  { name: "Apr 10", Entry1: 4000, Entry2: 2400 },
  { name: "Apr 17", Entry1: 3000, Entry2: 1398 },
  { name: "Apr 24", Entry1: 2000, Entry2: 9800 },
  { name: "May 01", Entry1: 2780, Entry2: 3908 },
  { name: "May 08", Entry1: 1890, Entry2: 4800 },
  { name: "May 15", Entry1: 2390, Entry2: 3800 },
  { name: "May 23", Entry1: 3490, Entry2: 4300 },
];

const performanceData = [
  { name: "Jan", uv: 4000 },
  { name: "Mar", uv: 3000 },
  { name: "May", uv: 2000 },
  { name: "Jul", uv: 2780 },
];

const Analytics = () => {
  return (
    <CustomLayout>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Response Count</h3>
            <LineChart
              width={500}
              height={300}
              data={responseData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Entry1"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="Entry2" stroke="#82ca9d" />
            </LineChart>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Journaling Performance
            </h3>
            <BarChart
              width={500}
              height={300}
              data={performanceData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="uv" fill="#8884d8" />
            </BarChart>
          </div>
        </div>
      </div>
    </CustomLayout>
  );
};

export default Analytics;
