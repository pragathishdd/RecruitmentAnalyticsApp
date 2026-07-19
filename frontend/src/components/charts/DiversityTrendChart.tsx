import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Props {
  data: any[];
}

export default function DiversityTrendChart({
  data,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-4">
        Diversity Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="period"
            tickFormatter={(value) => {

              const [year, month] =
                value.split("-");

              const months = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ];

              return `${
                months[
                  Number(month) - 1
                ]
              }'${year.slice(-2)}`;
            }}
          />

          
<YAxis
  domain={[0, 100]}
/>


          <Tooltip />

          <Line
  type="monotone"
  dataKey="malePercentage"
  stroke="#2563EB"
  strokeWidth={3}
  name="Male %"
/>

<Line
  type="monotone"
  dataKey="femalePercentage"
  stroke="#EC4899"
  strokeWidth={3}
  name="Female %"
/>

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}