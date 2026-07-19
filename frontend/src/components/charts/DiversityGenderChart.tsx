import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  male: number;
  female: number;
}

export default function DiversityGenderChart({
  male,
  female,
}: Props) {
  const data = [
    {
      name: "Male",
      value: male,
    },
    {
      name: "Female",
      value: female,
    },
  ];

  const COLORS = [
    "#3B82F6",
    "#EC4899",
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-4">
        Gender Distribution
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={110}
            label
          >
            {data.map(
              (_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              )
            )}
          </Pie>

          <Tooltip />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}