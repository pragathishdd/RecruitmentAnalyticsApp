import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Props {
  data: any[];
}

export default function OfferDropTrendChart({
  data,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-4">
        Offer Drop Trend
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
            tickFormatter={(
              value
            ) => {

              const [
                year,
                month,
              ] =
                value.split("-");

              const months =
                [
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
                  Number(
                    month
                  ) - 1
                ]
              }'${year.slice(-2)}`;

            }}
          />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="offerDropped"
            name="Offer Dropped"
            stroke="#DC2626"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}