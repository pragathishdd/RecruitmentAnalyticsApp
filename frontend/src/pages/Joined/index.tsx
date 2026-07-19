import DashboardLayout from "../../components/layout/DashboardLayout";
import { getDashboardData } from "../../utils/storage";

export default function Joined() {
  const data = getDashboardData();

  const joinedData =
    data?.joined_analysis;

  if (!joinedData) {
    return (
      <DashboardLayout>
        <h2>No Joined Data Available</h2>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold">
          Total Joined
        </h2>

        <div className="text-5xl font-bold text-green-600 mt-4">
          {joinedData.total_joined}
        </div>

      </div>

    </DashboardLayout>
  );
}