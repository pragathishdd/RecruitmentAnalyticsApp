import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  joined: number;
  offerAccepted: number;
  offerDropped: number;
  yetToOffer: number;
}

export default function StatusDistributionChart({
  joined,
  offerAccepted,
  offerDropped,
  yetToOffer,
}: Props) {

  const total =
    joined +
    offerAccepted +
    offerDropped +
    yetToOffer;

  const joinedPct =
    total > 0
      ? ((joined / total) * 100)
      : 0;

  const acceptedPct =
    total > 0
      ? ((offerAccepted / total) * 100)
      : 0;

  const droppedPct =
    total > 0
      ? ((offerDropped / total) * 100)
      : 0;

  const yetToOfferPct =
    total > 0
      ? ((yetToOffer / total) * 100)
      : 0;

  const getJoinedColor = (
    pct: number
  ) => {
    return pct > 50
      ? "text-green-600"
      : "text-red-600";
  };

  const getAcceptedColor = (
    pct: number
  ) => {
    return pct > 50
      ? "text-green-600"
      : "text-red-600";
  };

  const getDropColor = (
    pct: number
  ) => {
    if (pct > 40)
      return "text-red-600";

    if (pct >= 20)
      return "text-yellow-500";

    return "text-green-600";
  };

  const getYtoColor = (
    pct: number
  ) => {
    if (pct > 40)
      return "text-red-600";

    if (pct >= 20)
      return "text-yellow-500";

    return "text-green-600";
  };

  const chartData = [
    {
      name: "Joined",
      value: joined,
      color: "#22C55E",
    },
    {
      name: "Offer Accepted",
      value: offerAccepted,
      color: "#3B82F6",
    },
    {
      name: "Offer Dropped",
      value: offerDropped,
      color: "#EF4444",
    },
    {
      name: "Yet To Offer",
      value: yetToOffer,
      color: "#FACC15",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-4">
        Status Distribution
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <PieChart>

          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            label
          >
            {chartData.map(
              (entry, index) => (
                <Cell
                  key={index}
                  fill={entry.color}
                />
              )
            )}
          </Pie>

          <Tooltip />

        </PieChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 gap-4 mt-6">

        <div className="border rounded-lg p-3">

          <div>Joined</div>

          <div
            className={`text-xl font-bold ${getJoinedColor(
              joinedPct
            )}`}
          >
            {joined}
            {" "}
            (
            {joinedPct.toFixed(2)}
            %)
          </div>

        </div>

        <div className="border rounded-lg p-3">

          <div>Offer Accepted</div>

          <div
            className={`text-xl font-bold ${getAcceptedColor(
              acceptedPct
            )}`}
          >
            {offerAccepted}
            {" "}
            (
            {acceptedPct.toFixed(2)}
            %)
          </div>

        </div>

        <div className="border rounded-lg p-3">

          <div>Offer Dropped</div>

          <div
            className={`text-xl font-bold ${getDropColor(
              droppedPct
            )}`}
          >
            {offerDropped}
            {" "}
            (
            {droppedPct.toFixed(2)}
            %)
          </div>

        </div>

        <div className="border rounded-lg p-3">

          <div>Yet To Offer</div>

          <div
            className={`text-xl font-bold ${getYtoColor(
              yetToOfferPct
            )}`}
          >
            {yetToOffer}
            {" "}
            (
            {yetToOfferPct.toFixed(2)}
            %)
          </div>

        </div>

      </div>

    </div>
  );
}