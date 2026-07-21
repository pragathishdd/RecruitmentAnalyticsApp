import { Link } from "react-router-dom";

const menuItems = [
  {
    label: "Summary",
    path: "/summary",
  },
  {
    label: "Diversity",
    path: "/diversity",
  },
  {
    label: "TAT Analysis",
    path: "/tat",
  },
  {
  label: "Joined Analysis",
  path: "/joined",
  },
 {
    label: "Dropped Analysis",
    path: "/offer-dropped",
  },

{
    label: "Decision Intelligence",
    path: "/decision-intelligence",
  },

];

export default function Sidebar() {
  return (
    <div className="w-64 bg-[#0B1F41] text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-8">
        Recruitment Analytics
      </h2>

      {menuItems.map((item) => (
        <Link
          key={item.label}
          to={item.path}
          className="block p-3 rounded hover:bg-white/10"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}