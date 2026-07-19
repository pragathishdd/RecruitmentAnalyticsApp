import * as XLSX from "xlsx";

export default function ExportButton({
  data,
}: {
  data: any[];
}) {
  const exportExcel = () => {
    const worksheet =
      XLSX.utils.json_to_sheet(data);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "RecruitmentData"
    );

    XLSX.writeFile(
      workbook,
      "RecruitmentAnalytics.xlsx"
    );
  };

  return (
    <button
      onClick={exportExcel}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Export Excel
    </button>
  );
}