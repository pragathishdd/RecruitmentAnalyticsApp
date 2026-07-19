import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

interface Props {
  data: any[];
}

export default function RecruiterPerformanceChart({
  data,
}: Props) {
  const chartData = data.map(
    (item: any) => ({
      recruiter: item.recruiter,
      conversion:
        Number(
          item.conversion_ratio || 0
        ),
    })
  );

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-4">
        Recruiter Performance
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <BarChart data={chartData}>
          <XAxis dataKey="recruiter" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="conversion">
            {chartData.map(
              (entry, index) => (
                <Cell
                  key={index}
                  fill={
                    entry.conversion >= 50
                      ? "#22C55E"
                      : "#EF4444"
                  }
                />
              )
            )}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-2 gap-3">

        {chartData.map(
          (item, index) => (
            <div
              key={index}
              className="border rounded-lg p-3 flex justify-between"
            >
              <span>
                {item.recruiter}
              </span>

              <span
                className={
                  item.conversion >= 50
                    ? "text-green-600 font-bold"
                    : "text-red-600 font-bold"
                }
              >
                {item.conversion}%
              </span>
            </div>
          )
        )}

      </div>

    </div>
  );
}