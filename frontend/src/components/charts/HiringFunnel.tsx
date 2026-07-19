interface Props {
  total: number;
  accepted: number;
  joined: number;
}

export default function HiringFunnel({
  total,
  accepted,
  joined,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">
        Hiring Funnel
      </h2>

      <div className="space-y-4">

        <div className="bg-blue-500 text-white p-4 rounded">
          Total Profiles: {total}
        </div>

        <div className="bg-orange-500 text-white p-4 rounded">
          Offer Accepted: {accepted}
        </div>

        <div className="bg-green-500 text-white p-4 rounded">
          Joined: {joined}
        </div>

      </div>
    </div>
  );
}