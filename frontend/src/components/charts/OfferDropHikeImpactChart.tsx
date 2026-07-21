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

export default function OfferDropHikeImpactChart({
  data,
}: Props) {

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-4">
        Compensation Impact Analysis
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <BarChart data={data}>

          <XAxis
            dataKey="bucket"
          />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="count"
            fill="#DC2626"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}