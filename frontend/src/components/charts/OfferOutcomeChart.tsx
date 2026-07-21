import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  dropped: number;
  accepted: number;
  joined: number;
}

export default function OfferOutcomeChart({
  dropped,
  accepted,
  joined,
}: Props) {

  const data = [
    {
      name: "Offer Dropped",
      value: dropped,
    },
    {
      name: "Offer Accepted",
      value: accepted,
    },
    {
      name: "Joined",
      value: joined,
    },
  ];

  const COLORS = [
    "#DC2626",
    "#F59E0B",
    "#16A34A",
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-4">
        Offer Outcome Distribution
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