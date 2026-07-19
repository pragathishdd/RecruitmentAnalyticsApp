import DashboardLayout from "../../components/layout/DashboardLayout";
import { getDashboardData } from "../../utils/storage";

export default function OfferDropped() {
  const data = getDashboardData();

  const dropData = data?.offer_drop;

  if (!dropData) {
    return (
      <DashboardLayout>
        <h2>No Offer Drop Data Available</h2>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-2 gap-4">

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold">
            Total Offer Drops
          </h2>

          <div className="text-4xl font-bold text-red-600">
            {dropData.offer_dropped}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold">
            Offer Drop %
          </h2>

          <div className="text-4xl font-bold text-orange-600">
            {dropData.drop_percentage}%
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}