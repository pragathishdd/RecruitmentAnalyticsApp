import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Props {
  data: any[];
}

export default function VerticalChart({
  data,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">
        Vertical Analysis
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <BarChart data={data}>
          <XAxis dataKey="vertical" />
          <YAxis />
          <Tooltip />

          <Bar
            dataKey="joined"
            fill="#0B1F41"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}