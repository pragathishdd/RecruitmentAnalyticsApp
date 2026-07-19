import { useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

interface Props {
  data: {
    monthly: any[];
    quarterly: any[];
    yearly: any[];
  };
}

export default function HiringTrendChart({
  data,
}: Props) {

  const [trendType, setTrendType] =
    useState("monthly");

  const chartData =
    trendType === "monthly"
      ? data?.monthly || []
      : trendType === "quarterly"
      ? data?.quarterly || []
      : data?.yearly || [];

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-xl font-bold">
          Hiring Trend Analysis
        </h2>

        <select
          value={trendType}
          onChange={(e) =>
            setTrendType(
              e.target.value
            )
          }
          className="border rounded px-3 py-2"
        >
          <option value="monthly">
            Monthly
          </option>

          <option value="quarterly">
            Quarterly
          </option>

          <option value="yearly">
            Yearly
          </option>

        </select>

      </div>

      <ResponsiveContainer
        width="100%"
        height={400}
      >

        <LineChart data={chartData}>

          <CartesianGrid
            strokeDasharray="3 3"
          />

         <XAxis
          dataKey="period"
            tickFormatter={(value) => {

              if (
                  typeof value === "string" &&
                    value.includes("-")
                    ) {
                    const [year, month] =
                    value.split("-");

                    const monthNames = [
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
        monthNames[
          Number(month) - 1
        ]
      }'${year.slice(-2)}`;
    }

    return value;
  }}
  />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="joined"
            stroke="#22C55E"
            strokeWidth={3}
            name="Joined"
          />

          <Line
            type="monotone"
            dataKey="offer_dropped"
            stroke="#EF4444"
            strokeWidth={3}
            name="Offer Dropped"
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}