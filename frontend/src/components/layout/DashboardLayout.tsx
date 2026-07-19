import Sidebar from "./Sidebar";
import Header from "./Header";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: Props) {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1">

        <Header />

        <div className="p-6">
          {children}
        </div>

      </div>

    </div>
  );
}