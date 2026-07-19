import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

interface Props {
  data: any[];
}

export default function SourcePerformanceChart({
  data,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">
        Source Performance
      </h2>

      <ResponsiveContainer
        width="100%"
        height={400}
      >
        <BarChart data={data}>
          <XAxis dataKey="source" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar
            dataKey="joined"
            fill="#0B1F41"
            name="Joined"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}