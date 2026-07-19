import DashboardLayout from "../../components/layout/DashboardLayout";
import { getDashboardData } from "../../utils/storage";

export default function TAT() {
  const data = getDashboardData();

  const tat = data?.tat_metrics;

  if (!tat) {
    return (
      <DashboardLayout>
        <h2>No TAT data available</h2>
      </DashboardLayout>
    );
  }

  const cards = [
    {
      title: "Screening TAT",
      value: tat.screening_tat,
    },
    {
      title: "Technical TAT",
      value: tat.technical_tat,
    },
    {
      title: "Offer TAT",
      value: tat.offer_tat,
    },
    {
      title: "Joining TAT",
      value: tat.joining_tat,
    },
    {
      title: "Total TAT",
      value: tat.total_tat,
    },
  ];

  return (
    <DashboardLayout>
      <div className="grid grid-cols-5 gap-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow p-4"
          >
            <div>{card.title}</div>

            <div className="text-3xl font-bold">
              {card.value} Days
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}