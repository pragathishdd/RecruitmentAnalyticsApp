import { getDashboardData } from "../../utils/storage";

export default function Header() {
  const data = getDashboardData();

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-[#0B1F41]">
        Recruitment Analytics Dashboard
      </h1>

      <div className="text-right">
        <div>
          Total Records: {data?.total_records ?? 0}
        </div>

        <div>
          Last Upload: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}