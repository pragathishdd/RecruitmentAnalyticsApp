import { useState } from "react";
import axios from "axios";
import { saveDashboardData } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);

  const navigate = useNavigate();

  const uploadExcel = async () => {
    try {
      if (!file) {
        alert("Please select an Excel file");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/upload/excel",
        formData
      );

      saveDashboardData(response.data);

      alert("Validation completed successfully");

      navigate("/summary");
    } catch (error) {
      console.error(error);
      alert("Error uploading file");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-[#0B1F41] mb-6">
          Recruitment Analytics Portal
        </h1>

        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Recruitment Excel File
          </label>

          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setFile(e.target.files[0]);
              }
            }}
          />
        </div>

        <button
          onClick={uploadExcel}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg"
        >
          Validate Excel
        </button>

      </div>
    </div>
  );
}